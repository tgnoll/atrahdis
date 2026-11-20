import type { MetadataRoute } from "next";
import { artikel } from "@/content/blog";
import { daftarKota } from "@/content/kota";
import { detailLayanan } from "@/content/layanan-detail";
import { tools } from "@/content/tools";
import { site } from "@/content/site";

const halaman = ["", "/jasa-sbu", "/perpanjangan-sbu", "/jasa-skk", "/layanan", "/tentang", "/blog", "/kontak"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...halaman.map((p) => ({ url: `${site.url}${p}` })),
    ...detailLayanan.map((d) => ({ url: `${site.url}/layanan/${d.slug}` })),
    { url: `${site.url}/tools` },
    ...tools.map((t) => ({ url: `${site.url}/tools/${t.slug}` })),
    ...artikel.map((a) => ({ url: `${site.url}/blog/${a.slug}` })),
    ...daftarKota.flatMap((k) => [
      { url: `${site.url}/jasa-sbu/${k.slug}` },
      { url: `${site.url}/jasa-skk/${k.slug}` },
    ]),
  ];
}
