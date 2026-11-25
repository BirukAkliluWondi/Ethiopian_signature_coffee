import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ethiopiansignature.com";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
