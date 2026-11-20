import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cariKota, daftarKota } from "@/content/kota";
import { HalamanKota, deskripsiKota, judulKota } from "@/components/kota/HalamanKota";
import { meta } from "@/lib/seo";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return daftarKota.map((k) => ({ kota: k.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jasa-sbu/[kota]">): Promise<Metadata> {
  const k = cariKota((await params).kota);
  if (!k) return {};
  return meta(`${judulKota("sbu", k)} | Atrahdis`, deskripsiKota("sbu", k), `/jasa-sbu/${k.slug}`);
}

export default async function JasaKota({ params }: PageProps<"/jasa-sbu/[kota]">) {
  const k = cariKota((await params).kota);
  if (!k) notFound();
  return <HalamanKota jenis="sbu" kota={k} />;
}
