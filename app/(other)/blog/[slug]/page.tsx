import { Metadata } from "next";
import PostHeader from "../../../../components/post-header";
import { getPost } from "@/lib/blog";
import { formatDate } from "@/lib/formatters";
import { site } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);
  if (!post) {
    return;
  }

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
      <PostHeader slug={slug} metadata={metadata} />

      <div className="prose">
        <Post />
      </div>
    </>
  );
}
