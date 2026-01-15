import postsData from "@/config/posts.json";
import { Redis } from "@upstash/redis";

if (!process.env.REDIS_TOKEN) {
  throw new Error("REDIS_TOKEN is not defined");
}

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

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

export async function incrementViewCount(slug: string) {
  const viewsData = (await redis.get("views")) as Views;

  const postViews = viewsData.find((view) => view.slug === slug);
  if (postViews) {
    postViews.views++;
  } else {
    viewsData.push({ slug, views: 1 });
  }

  await redis.set("views", JSON.stringify(viewsData));

  return postViews?.views ?? 0;
}
