import Link from "next/link";
import { tools } from "@/content/tools";
import { Bagian } from "@/components/ui/Bagian";
import { PageHero } from "@/components/sections/PageHero";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Tools SBU Konstruksi Gratis | Atrahdis",
  "Enam tools gratis untuk kontraktor: cek kesiapan SBU, kalkulator kebutuhan SBU, audit NIB, pembaca masalah OSS, pemilih jenjang SKK, dan checklist pengurusan SBU.",
  "/tools",
);

export default function Tools() {
  return (
    <>
      <PageHero
        breadcrumb="Tools"
        path="/tools"
        eyebrow="Tools gratis"
        judul="Tools SBU Konstruksi"
        pengantar="Enam alat gratis untuk mengecek kesiapan SBU, memperkirakan kebutuhan dokumen, dan memandu proses pengajuan."
      />
      <Bagian latar="muda">
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6 no-underline hover:border-biru"
            >
              <h2 className="text-lg font-extrabold text-navy">{t.nama}</h2>
              <p className="flex-1 text-[15px] leading-relaxed text-teks-muted">{t.ringkas}</p>
              <span className="text-[15px] font-extrabold text-oranye-teks">Buka tool →</span>
            </Link>
          ))}
        </div>
      </Bagian>
    </>
  );
}
