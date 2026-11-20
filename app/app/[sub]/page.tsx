import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { halamanPortal } from "@/content/portal";
import { HalamanPortal } from "@/components/portal/HalamanPortal";
import { meta } from "@/lib/seo";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return Object.keys(halamanPortal).map((sub) => ({ sub }));
}

export async function generateMetadata({ params }: PageProps<"/app/[sub]">): Promise<Metadata> {
  const { sub } = await params;
  const h = halamanPortal[sub];
  if (!h) return {};
  return { ...meta(`${h.judul} | Portal Klien Atrahdis`, h.isi, `/app/${sub}`), robots: { index: false, follow: true } };
}

export default async function SubPortal({ params }: PageProps<"/app/[sub]">) {
  const { sub } = await params;
  const h = halamanPortal[sub];
  if (!h) notFound();
  return <HalamanPortal judul={h.judul} isi={h.isi} />;
}
