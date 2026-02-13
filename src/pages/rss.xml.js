import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const resources = await getCollection("insights", ({ data }) => !data.draft);
  const sorted = [...resources].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Rudi Jantos Resources",
    description:
      "Practical B2B resources on GA4, GTM, attribution, and CRM-aligned decision-making.",
    site: context.site,
    items: sorted.map((resource) => ({
      title: resource.data.title,
      description: resource.data.description,
      link: `/resources/${resource.slug}/`,
      pubDate: resource.data.pubDate,
    })),
  });
}
