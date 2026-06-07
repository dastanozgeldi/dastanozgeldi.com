import Image from "next/image";
import Link from "next/link";
import { GH_COLORS, getContributionLevels } from "@/lib/github";
import { SOCIALS } from "@/components/socials";
import styles from "./home.module.css";

// Statically generated, refreshed hourly so the contributions graph stays in
// sync with GitHub (the GraphQL POST isn't cached at the fetch layer).
export const revalidate = 3600;

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
                <i
                  key={i}
                  style={{
                    background: lvl < 0 ? "transparent" : GH_COLORS[lvl] ?? GH_COLORS[0],
                  }}
                />
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
