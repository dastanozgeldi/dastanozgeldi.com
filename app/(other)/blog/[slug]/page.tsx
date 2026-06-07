import { Metadata } from "next";
import { getPost, incrementViewCount } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { site } from "@/config/site";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
    <article>
      <header className="mb-8 pb-6 border-b border-line-soft flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] leading-tight lowercase">
          {metadata.title}
        </h1>
        <div className="flex items-center gap-2 font-mono text-[13px] text-faint">
          <span>{formatDate(metadata.date)}</span>
          <span>·</span>
          <Suspense fallback={<Skeleton className="w-16 h-4" />}>
            <ViewCount slug={slug} />
          </Suspense>
        </div>
        {metadata.description && (
          <p className="text-muted-foreground">{metadata.description}</p>
        )}
      </header>

      <div className="prose prose-neutral max-w-none prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-a:text-blue prose-a:underline prose-a:underline-offset-2 prose-a:decoration-blue/30 hover:prose-a:decoration-blue prose-img:rounded-lg prose-img:border prose-img:border-line-soft prose-pre:rounded-lg">
        <Post />
      </div>
    </article>
  );
}

async function ViewCount({ slug }: { slug: string }) {
  const updatedViews = await incrementViewCount(slug);

  return <span>{updatedViews.toLocaleString()} views</span>;
}
