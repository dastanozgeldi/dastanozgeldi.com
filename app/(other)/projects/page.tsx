import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { site } from "@/config/site";
import data from "@/config/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of what I can do.",
};

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-medium tracking-tighter mb-6">projects</h1>
      <ProjectList />
    </>
  );
}

function ProjectList() {
  return (
    <ul className="space-y-4">
      {data.projects.map((project) => {
        const isExternal = project.href.startsWith("https");
        const LinkComponent = isExternal ? "a" : Link;

        return (
          <li key={project.name} className="border rounded-lg p-3">
            <LinkComponent
              className="flex flex-col space-y-1.5 mb-3"
              href={project.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium underline underline-offset-4 ">
                    {project.name}
                  </span>

                  {project.tag && (
                    <Badge className="ml-2 font-mono font-normal">
                      {project.tag}
                    </Badge>
                  )}
                </div>
                {isExternal && <ExternalLinkIcon size={16} />}
              </div>

              <span className="text-muted-foreground">
                {project.description}
              </span>
            </LinkComponent>

            <Image
              className="rounded-lg shadow-lg aspect-video object-cover"
              alt={project.name}
              src={`${site.cdn}/${project.bannerId}`}
              width={800}
              height={400}
            />
          </li>
        );
      })}
    </ul>
  );
}
