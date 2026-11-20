import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cariTool, tools } from "@/content/tools";
import { Bagian } from "@/components/ui/Bagian";
import { PageHero } from "@/components/sections/PageHero";
import { FormKonsultasi } from "@/components/sections/FormKonsultasi";
import { AlatKalkulator, AlatNib, AlatOss, AlatPlaybook, AlatSkk } from "@/components/tools/Alat";
import { meta } from "@/lib/seo";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const t = cariTool((await params).slug);
  if (!t) return {};
  return meta(t.metaJudul, t.metaDeskripsi, `/tools/${t.slug}`);
}

function CekSbu() {
  return (
    <>
      <FormKonsultasi
        judul="Data perusahaan"
        pertanyaan={[
          { label: "Target kualifikasi", ringkas: "Kualifikasi", opsi: ["Belum tahu", "SBU Kecil (K)", "SBU Menengah (M)", "SBU Besar (B)"] },
          { label: "Kebutuhan", ringkas: "Kebutuhan", opsi: ["SBU baru", "Perpanjangan SBU", "Naik kualifikasi"] },
        ]}
        judulKontak="Ke mana hasil cek dikirim?"
        tombolKirim="LANJUT CEK VIA WHATSAPP"
        pesanPembuka="Halo Atrahdis, saya ingin cek kesiapan SBU perusahaan saya."
      />
      <p className="max-w-[620px] text-center text-sm text-teks-muted">
        Ini bukan pengecekan resmi LPJK. Untuk status SBU yang sudah terbit, cek di portal OSS atau LPJK.
      </p>
    </>
  );
}

const alat: Record<string, () => React.ReactNode> = {
  "cek-sbu": CekSbu,
  "kalkulator-sbu": AlatKalkulator,
  "nib-audit": AlatNib,
  "oss-error": AlatOss,
  "skk-selector": AlatSkk,
  "bujka-playbook": AlatPlaybook,
};

export default async function HalamanTool({ params }: PageProps<"/tools/[slug]">) {
  const t = cariTool((await params).slug);
  if (!t) notFound();
  const Alat = alat[t.slug];
  const lain = tools.filter((x) => x.slug !== t.slug);
  return (
    <>
      <PageHero breadcrumb={t.nama} path={`/tools/${t.slug}`} eyebrow="Tools gratis" judul={t.judul} pengantar={t.pengantar} />
      <Bagian latar="muda">
        <Alat />
      </Bagian>
      <Bagian>
        <p className="text-center text-sm text-teks-muted">
          Tools lain:{" "}
          {lain.map((x, i) => (
            <span key={x.slug}>
              {i > 0 && " · "}
              <Link href={`/tools/${x.slug}`}>{x.nama}</Link>
            </span>
          ))}{" "}
          · <Link href="/tools">Semua tools</Link>
        </p>
      </Bagian>
    </>
  );
}
