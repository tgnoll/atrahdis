import type { MetadataRoute } from "next";
import { artikel } from "@/content/blog";
import { site } from "@/content/site";

const halaman = ["", "/jasa-sbu", "/perpanjangan-sbu", "/jasa-skk", "/layanan", "/tentang", "/blog", "/kontak"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...halaman.map((p) => ({ url: `${site.url}${p}` })),
    ...artikel.map((a) => ({ url: `${site.url}/blog/${a.slug}` })),
  ];
}
