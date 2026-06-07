import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import data from "@/config/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built — products, tools, and experiments.",
};

export default function Page() {
  return (
    <section>
      <header className="mb-8">
        <h1 className="text-[30px] font-semibold tracking-[-0.035em] lowercase leading-tight">
          projects
        </h1>
        <p className="mt-1 text-muted-foreground">things i&apos;ve built.</p>
      </header>

      <ul className="flex flex-col gap-6">
        {data.projects.map((project) => {
          const isExternal = project.href.startsWith("https");
          const LinkComponent = isExternal ? "a" : Link;

          return (
            <li
              key={project.name}
              className="group rounded-xl border border-border p-4 transition-colors hover:border-blue/40"
            >
              <LinkComponent
                className="flex flex-col gap-1.5 mb-3"
                href={project.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-medium tracking-[-0.01em] truncate transition-colors group-hover:text-blue">
                      {project.name}
                    </span>
                    {project.tag && (
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                        {project.tag}
                      </span>
                    )}
                  </div>
                  {isExternal && (
                    <ArrowUpRight className="size-4 shrink-0 text-faint transition-all group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </div>

                <span className="text-[15px] text-muted-foreground">
                  {project.description}
                </span>
              </LinkComponent>

              <Image
                className="w-full rounded-lg aspect-video object-cover border border-line-soft"
                alt={project.name}
                src={`${site.cdn}/${project.bannerId}`}
                width={800}
                height={400}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
