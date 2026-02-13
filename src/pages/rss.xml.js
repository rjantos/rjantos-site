import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  const sorted = [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Rudi Jantos",
    description:
      "Strategic marketing partner helping B2B teams fix tracking, attribution, and decision-making across ads, analytics, and CRM.",
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/posts/${post.slug}`,
      pubDate: post.data.pubDate,
    })),
  });
}
