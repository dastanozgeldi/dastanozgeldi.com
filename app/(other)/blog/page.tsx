import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import redis from "@/lib/redis";
import { formatDate } from "@/lib/formatters";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on programming, lifestyle, and more.",
};

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-medium tracking-tighter mb-6">blog</h1>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="flex sm:items-center sm:justify-between w-full flex-col sm:flex-row gap-y-1">
              <span className="text-lg font-medium group-hover:underline group-hover:decoration-neutral-400 group-hover:underline-offset-4">
                {post.title.toLowerCase()}
              </span>
              <div className="text-sm text-muted-foreground">
                {formatDate(post.date, {
                  short: true,
                }).toLowerCase()}
                {" / "}
                <Suspense fallback={<>... views</>}>
                  <AllViews slug={post.slug} />
                </Suspense>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function AllViews({ slug }: { slug: string }) {
  const allViews = (await redis.get("views")) as {
    slug: string;
    views: number;
  }[];

  const views = allViews.find((view) => view.slug === slug)?.views ?? 0;

  return <>{views.toLocaleString()} views</>;
}
