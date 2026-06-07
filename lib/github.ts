import { unstable_cache } from "next/cache";

const GH_USER = "dastanozgeldi";

// 53 weeks x 7 days — matches the prototype grid footprint.
const WEEKS = 53;
const DAYS = WEEKS * 7;

// Five blue contribution levels (0 → 4). Recolored from GitHub's default green
// to the site's blue accent so the heatmap reads as a deliberate brand element.
// Index -1 is reserved for leading padding cells (rendered transparent) so the
// first column aligns to the correct weekday, exactly like GitHub's own graph.
export const GH_COLORS = [
  "#eceef2",
  "rgba(47,111,237,0.22)",
  "rgba(47,111,237,0.45)",
  "rgba(47,111,237,0.72)",
  "#2f6fed",
];

// Deterministic mock identical to the design prototype. Used as a last-resort
// fallback when neither the GitHub API nor the public API is reachable.
function mockLevels(): number[] {
  const cells: number[] = [];
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const r = rnd();
      let lvl = r < 0.46 ? 0 : r < 0.69 ? 1 : r < 0.86 ? 2 : r < 0.95 ? 3 : 4;
      if ((d === 0 || d === 6) && lvl > 0 && rnd() < 0.5) lvl -= 1; // quieter weekends
      cells.push(lvl);
    }
  }
  return cells;
}

function countToLevel(count: number): number {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/* ---------- 1. GitHub GraphQL (authoritative, includes private) ---------- */

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

// contributionLevel enum → our 0–4 scale.
const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type GqlDay = { weekday: number; contributionLevel: string };
type GqlWeek = { contributionDays: GqlDay[] };

// Querying `viewer` with the user's own token returns their full calendar,
// including private/restricted contributions the token can see.
const CALENDAR_QUERY = `
  query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              weekday
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function fetchFromGitHub(token: string): Promise<number[]> {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": GH_USER,
    },
    body: JSON.stringify({ query: CALENDAR_QUERY }),
  });
  if (!res.ok) throw new Error(`github graphql ${res.status}`);

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "github graphql error");
  }

  const weeks: GqlWeek[] =
    json.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks) || !weeks.length) {
    throw new Error("no contribution calendar returned");
  }

  const cells: number[] = [];
  // Pad the first (partial) week so the top of the first column lands on the
  // right weekday row — mirrors GitHub's own layout.
  const firstWeekday = weeks[0]?.contributionDays?.[0]?.weekday ?? 0;
  for (let i = 0; i < firstWeekday; i++) cells.push(-1);
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      cells.push(LEVEL_MAP[day.contributionLevel] ?? 0);
    }
  }
  return cells;
}

/* ---------- 2. Public API fallback (no token, public only) ---------- */

type ContribDay = { date: string; count: number; level?: number };
type ContribResponse = { contributions: ContribDay[] };

async function fetchFromPublicApi(): Promise<number[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`
  );
  if (!res.ok) throw new Error(`public api ${res.status}`);

  const data = (await res.json()) as ContribResponse;
  const levels = (data.contributions ?? []).map((d) =>
    typeof d.level === "number" ? d.level : countToLevel(d.count)
  );
  if (!levels.length) throw new Error("no contributions returned");

  return levels.slice(-DAYS);
}

/**
 * Contribution levels (0–4, plus -1 for alignment padding) for the heatmap.
 * Prefers GitHub's official GraphQL API (real, includes private contributions)
 * when GITHUB_TOKEN is set, falls back to the free public API, then to a
 * deterministic mock so the page always renders.
 */
async function loadContributionLevels(): Promise<number[]> {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    try {
      return await fetchFromGitHub(token);
    } catch {
      // fall through to the public API
    }
  }
  try {
    return await fetchFromPublicApi();
  } catch {
    return mockLevels();
  }
}

// Cached for an hour so the homepage stays statically rendered (ISR) and we
// call GitHub at most once per hour regardless of traffic.
export const getContributionLevels = unstable_cache(
  loadContributionLevels,
  ["github-contributions"],
  { revalidate: 3600 }
);
