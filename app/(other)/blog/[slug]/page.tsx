import { Metadata } from "next";
import { getPost, type Views } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { site } from "@/config/site";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import redis from "@/lib/redis";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return;

  const publishedTime = formatDate(post.date);

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      publishedTime,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
    },
    twitter: {
      title: post.title,
      card: "summary_large_image",
      creator: "@dastanozgeldi",
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`@/posts/${slug}.mdx`);

  return (
    <>
      <header className="space-y-2.5">
        <h1 className="text-2xl font-bold">{metadata.title}</h1>
        <div className="text-sm text-muted-foreground flex items-center justify-between">
          <span>{formatDate(metadata.date)}</span>

          <Suspense fallback={<Skeleton className="w-20 h-5" />}>
            <ViewCount slug={slug} />
          </Suspense>
        </div>
        <p className="text-sm text-muted-foreground">{metadata.description}</p>
      </header>

      <div className="prose">
        <Post />
      </div>
    </>
  );
}

async function ViewCount({ slug }: { slug: string }) {
  const viewsData = (await redis.get("views")) as Views;

  const postViews = viewsData.find((view) => view.slug === slug);
  if (postViews) {
    postViews.views += 1;
  } else {
    viewsData.push({ slug, views: 1 });
  }

  await redis.set("views", JSON.stringify(viewsData));

  return <span>{postViews?.views.toLocaleString()} views</span>;
}
