import type { MetadataRoute } from "next";
import { site, siteLive } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Preview: larang semua crawler. Live (SITE_LIVE=1): izinkan + sitemap.
  if (!siteLive) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
