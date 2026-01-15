"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = ["/blog", "/projects"];
const socials = [
  {
    href: "https://x.com/dastanozgeldi",
    label: "x",
  },
  {
    href: "https://linkedin.com/in/dastanozgeldi",
    label: "linkedin",
  },
  {
    href: "https://github.com/dastanozgeldi",
    label: "github",
  },
];

export default function OtherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="py-3 px-6 max-w-2xl m-auto min-h-screen flex flex-col space-y-6">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/pfp.jpg"
            alt="brand"
            width={32}
            height={32}
            className="rounded-full border border-blue-500"
          />
        </Link>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link}
              href={link}
              className={cn(
                "font-mono tracking-tighter",
                pathname === link && "underline underline-offset-1.5"
              )}
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
      {children}
      <footer className="flex items-center justify-center">
        <span className="text-sm text-muted-foreground font-mono">
          find me on:{" "}
          {socials.map((social, index) => (
            <Fragment key={index}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono whitespace-nowrap underline"
              >
                {social.label}
              </a>
              {index < socials.length - 1 ? ", " : "."}
            </Fragment>
          ))}
        </span>
      </footer>
    </main>
  );
}
