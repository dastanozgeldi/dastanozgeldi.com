"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/components/socials";

const links = ["/projects", "/blog"];

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="py-10 px-6 max-w-2xl m-auto min-h-screen flex flex-col gap-10">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="home">
          <Image
            src="/avatar.png"
            alt="Dastan Ozgeldi"
            width={36}
            height={36}
            className="rounded-full shadow-[0_0_0_2px_#fff,0_0_0_3px_#2f6fed]"
          />
        </Link>
        <div className="flex items-center gap-5">
          {links.map((link) => {
            const active = pathname === link || pathname.startsWith(`${link}/`);
            return (
              <Link
                key={link}
                href={link}
                className={cn(
                  "font-mono text-sm tracking-tight transition-colors",
                  active
                    ? "text-foreground underline underline-offset-4 decoration-blue"
                    : "text-muted-foreground hover:text-blue"
                )}
              >
                {link.replace("/", "")}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="flex-1">{children}</div>

      <footer className="flex items-center justify-between gap-4 pt-6 border-t border-line-soft">
        <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-faint">
          elsewhere
        </span>
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex items-center justify-center w-9 h-9 rounded-[9px] border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground hover:bg-[#fafafa] [&_svg]:w-[18px] [&_svg]:h-[18px]"
            >
              <s.Icon />
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
