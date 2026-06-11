import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { POSTS } from "@/data/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.9 },
    ...projects,
    ...posts,
  ];
}
