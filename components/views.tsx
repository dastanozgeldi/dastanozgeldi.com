import redis from "@/lib/redis";

export default async function Views({ slug }: { slug: string }) {
  const viewsData = (await redis.get("views")) as {
    slug: string;
    views: number;
  }[];

  const postViews = viewsData.find((view) => view.slug === slug);
  if (postViews) {
    postViews.views += 1;
  } else {
    viewsData.push({ slug, views: 1 });
  }

  await redis.set("views", JSON.stringify(viewsData));

  return <>{postViews?.views.toLocaleString()} views</>;
}
