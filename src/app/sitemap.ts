import { getSortedPostsData } from "@/lib/posts";
import { links, services } from "@/statics/links";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://geekpie.club/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...links.map((nav) => ({
        url: `https://geekpie.club${nav.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    })),
    ...getSortedPostsData("event").slice(0, 2).map((post) => ({
        url: `https://geekpie.club/posts/${post.type}/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
    })),
    ...getSortedPostsData("blog").slice(0, 2).map((post) => ({
        url: `https://geekpie.club/posts/${post.type}/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
    })),
    ...services.filter((item) => (item.internal !== true)).map((nav) => ({
        url: `${nav.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    })),
  ];
}
