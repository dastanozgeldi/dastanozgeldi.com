import Image from "next/image";
import Link from "next/link";
import { GH_COLORS, getContributionLevels } from "@/lib/github";
import styles from "./home.module.css";

/* ---- brand-logo glyphs (currentColor) ---- */
function Github() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}
function XLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
function Linkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "github", href: "https://github.com/dastanozgeldi", Icon: Github },
  { label: "x", href: "https://x.com/dastanozgeldi", Icon: XLogo },
  {
    label: "linkedin",
    href: "https://linkedin.com/in/dastanozgeldi",
    Icon: Linkedin,
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dastan Ozgeldi",
  alternateName: ["Дастан Өзгелді", "Дастан Озгелди"],
  url: "https://dastanozgeldi.com",
  image: "https://dastanozgeldi.com/avatar.png",
  jobTitle: "Software Engineer",
  description:
    "Software engineer from Almaty, Kazakhstan, building rette.ai — AI for healthcare revenue cycle.",
  worksFor: { "@type": "Organization", name: "Rette", url: "https://rette.ai" },
  homeLocation: { "@type": "Place", name: "Almaty, Kazakhstan" },
  sameAs: [
    "https://github.com/dastanozgeldi",
    "https://x.com/dastanozgeldi",
    "https://linkedin.com/in/dastanozgeldi",
  ],
};

export default async function Page() {
  const levels = await getContributionLevels();

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className={styles.wrap}>
        {/* masthead */}
        <header className={styles.top}>
          <div className={styles.intro}>
            <h1 className={styles.h1}>dastan ozgeldi</h1>
            <p className={styles.bio}>
              software engineer from almaty, kazakhstan. programming since 13,
              shipping products ever since.
            </p>
            <div className={styles.socrow}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className={styles.soc}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>
          <Image
            className={`${styles.pfp} ${styles.ring}`}
            src="/avatar.png"
            width={84}
            height={84}
            alt="Dastan Ozgeldi"
            priority
            style={{ flex: "none" }}
          />
        </header>

        {/* now */}
        <section className={styles.sec}>
          <span className={styles.lbl}>now</span>
          <p className={styles.now}>
            building <a href="https://rette.ai">rette.ai</a>, ai for healthcare
            revenue cycle — and taking a gap year after high school.
          </p>
        </section>

        {/* github contributions */}
        <section className={styles.sec}>
          <div className={styles.ghHead}>
            <span className={styles.lbl}>github</span>
            <a
              className={styles.ghLink}
              href="https://github.com/dastanozgeldi"
              target="_blank"
              rel="noopener noreferrer"
            >
              @dastanozgeldi →
            </a>
          </div>
          <div className={styles.ghScroll}>
            <div
              className={styles.ghGrid}
              role="img"
              aria-label="GitHub contributions over the last year"
            >
              {levels.map((lvl, i) => (
                <i key={i} style={{ background: GH_COLORS[lvl] ?? GH_COLORS[0] }} />
              ))}
            </div>
          </div>
          <div className={styles.ghLegend}>
            <span>less</span>
            {GH_COLORS.map((c, i) => (
              <i key={i} style={{ background: c }} />
            ))}
            <span>more</span>
          </div>
        </section>

        {/* explore */}
        <section className={styles.sec}>
          <span className={styles.lbl}>explore</span>
          <Link className={styles.row} href="/projects">
            <span>
              <span className={styles.t}>projects</span>{" "}
              <span className={styles.d}>things i&apos;ve built</span>
            </span>
            <span className={styles.arr}>→</span>
          </Link>
          <Link className={styles.row} href="/blog">
            <span>
              <span className={styles.t}>blog</span>{" "}
              <span className={styles.d}>things i&apos;ve written</span>
            </span>
            <span className={styles.arr}>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
