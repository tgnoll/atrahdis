import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cariDetailLayanan, detailLayanan } from "@/content/layanan-detail";
import { HalamanLayanan } from "@/components/layanan/HalamanLayanan";
import { meta } from "@/lib/seo";

export function generateStaticParams() {
  return detailLayanan.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/layanan/[slug]">): Promise<Metadata> {
  const d = cariDetailLayanan((await params).slug);
  if (!d) return {};
  return meta(d.metaJudul, d.metaDeskripsi, `/layanan/${d.slug}`);
}

export default async function DetailLayanan({ params }: PageProps<"/layanan/[slug]">) {
  const d = cariDetailLayanan((await params).slug);
  if (!d) notFound();
  return <HalamanLayanan d={d} />;
}
