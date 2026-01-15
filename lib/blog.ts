import postsData from "@/config/posts.json";
import redis from "./redis";

export type Views = {
  slug: string;
  views: number;
}[];

function findViewsBySlug(allViews: Views | null, slug: string) {
  return allViews?.find((view) => view.slug === slug)?.views ?? 0;
}

export async function getPosts() {
  const allViews = await redis.get<Views>("views");
  const posts = postsData.posts.map((post) => {
    const views = findViewsBySlug(allViews, post.slug);
    return {
      ...post,
      views,
    };
  });
  return posts;
}

export async function getPost(slug: string) {
  const allViews = await redis.get<Views>("views");
  const post = postsData.posts.find((post) => post.slug === slug);
  if (!post) return;

  const views = findViewsBySlug(allViews, post.slug);
  return {
    ...post,
    views,
  };
}
