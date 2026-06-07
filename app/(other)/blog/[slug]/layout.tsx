import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const pill =
  "group inline-flex items-center gap-2 font-mono text-[13px] border border-border rounded-full px-4 py-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground hover:bg-[#fafafa]";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <nav className="mt-12 pt-6 border-t border-line-soft flex items-center justify-between">
        <Link href="/blog" className={pill}>
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          all posts
        </Link>
        <Link href="/projects" className={pill}>
          projects
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </>
  );
}
