import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cariKota, daftarKota } from "@/content/kota";
import { HalamanKota, deskripsiKota, judulKota } from "@/components/kota/HalamanKota";
import { meta } from "@/lib/seo";

export function generateStaticParams() {
  return daftarKota.map((k) => ({ kota: k.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jasa-skk/[kota]">): Promise<Metadata> {
  const k = cariKota((await params).kota);
  if (!k) return {};
  return meta(`${judulKota("skk", k)} | Atrahdis`, deskripsiKota("skk", k), `/jasa-skk/${k.slug}`);
}

export default async function JasaKota({ params }: PageProps<"/jasa-skk/[kota]">) {
  const k = cariKota((await params).kota);
  if (!k) notFound();
  return <HalamanKota jenis="skk" kota={k} />;
}
