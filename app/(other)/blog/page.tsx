import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Things I've written — on programming, building, and life.",
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-[30px] font-semibold tracking-[-0.035em] lowercase leading-tight">
          blog
        </h1>
        <p className="mt-1 text-muted-foreground">things i&apos;ve written.</p>
      </header>

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-0.5 py-3.5 border-b border-line-soft last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span className="text-lg font-medium tracking-[-0.01em] transition-colors group-hover:text-blue">
              {post.title.toLowerCase()}
            </span>
            <span className="shrink-0 font-mono text-[13px] text-faint whitespace-nowrap">
              {formatDate(post.date)} · {post.views.toLocaleString()} views
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
