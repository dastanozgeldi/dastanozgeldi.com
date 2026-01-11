import { ProjectList } from "../../../components/project-list";
import { Metadata } from "next";

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
