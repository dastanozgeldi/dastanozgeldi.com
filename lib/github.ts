const GH_USER = "dastanozgeldi";

// 53 weeks x 7 days — matches the prototype grid footprint.
const WEEKS = 53;
const DAYS = WEEKS * 7;

// Five blue contribution levels (0 → 4). Recolored from GitHub's default green
// to the site's blue accent so the heatmap reads as a deliberate brand element.
export const GH_COLORS = [
  "#eceef2",
  "rgba(47,111,237,0.22)",
  "rgba(47,111,237,0.45)",
  "rgba(47,111,237,0.72)",
  "#2f6fed",
];

// Deterministic mock identical to the design prototype. Used as a graceful
// fallback when the live contributions API is unavailable.
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

type ContribDay = { date: string; count: number; level?: number };
type ContribResponse = { contributions: ContribDay[] };

/**
 * Real GitHub contribution levels for the last year, mapped to 0–4.
 * Sourced from the free, unauthenticated jogruber contributions API and cached
 * for an hour. Falls back to the deterministic prototype mock on any failure.
 */
export async function getContributionLevels(): Promise<number[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`status ${res.status}`);

    const data = (await res.json()) as ContribResponse;
    const levels = (data.contributions ?? []).map((d) =>
      typeof d.level === "number" ? d.level : countToLevel(d.count)
    );
    if (!levels.length) throw new Error("no contributions returned");

    // Keep the most recent 53 weeks so the grid width stays consistent.
    return levels.slice(-DAYS);
  } catch {
    return mockLevels();
  }
}
