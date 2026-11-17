import Image from "next/image";
import type { ComponentProps } from "react";
import { site } from "@/content/site";
import { Icon, IconBox, type IconName } from "@/components/ui/Icon";
import { FormKonsultasi } from "./FormKonsultasi";

export type PoinPenawaran = { ikon: IconName; judul: string; isi: string };

export const POIN_UMUM: PoinPenawaran[] = [
  { ikon: "cari", judul: "Audit berkas", isi: "Kecocokan NIB, KBLI, akta, dan SKK dicek satu per satu" },
  { ikon: "daftar", judul: "Checklist SBU 2026", isi: "Daftar dokumen sesuai kualifikasi K, M, atau B Anda" },
  { ikon: "jam", judul: "Estimasi tertulis", isi: "Biaya dan timeline dikirim lewat WhatsApp" },
];

/**
 * Section penawaran + form 2 langkah di tengah. Dipakai di hampir semua halaman;
 * judul, poin, dan pertanyaan form disesuaikan per halaman.
 * Latar sengaja polos (tanpa kisi/ornamen) supaya pengunjung fokus ke form.
 */
export function Konsultasi({
  eyebrow = "AUDIT BERKAS GRATIS · TANPA KEWAJIBAN LANJUT",
  judul,
  sorot,
  pengantar,
  poin = POIN_UMUM,
  form,
}: {
  eyebrow?: string;
  judul: string;
  /** Bagian akhir judul yang diberi warna oranye. */
  sorot?: string;
  pengantar: string;
  poin?: PoinPenawaran[];
  form?: ComponentProps<typeof FormKonsultasi>;
}) {
  return (
    <section id="konsultasi" className="scroll-mt-24 border-y border-garis bg-latar-muda">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-7 px-5 py-14 md:gap-9 md:px-6 md:py-20">
        <div className="flex max-w-[800px] flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-oranye px-3.5 py-1.5 text-[11px] font-extrabold tracking-[1.5px] text-navy md:text-xs">
            {eyebrow}
          </span>
          <h2 className="text-[27px] font-extrabold leading-[1.2] text-navy md:text-[40px]">
            {judul}
            {sorot && (
              <>
                {" "}
                <span className="text-oranye-teks">{sorot}</span>
              </>
            )}
          </h2>
          <p className="max-w-[660px] text-base leading-relaxed text-teks-muted md:text-lg">{pengantar}</p>
        </div>

        {/* HP: baris centang ringkas supaya form cepat terlihat. Desktop: tiga kartu. */}
        <ul className="flex w-full max-w-[940px] flex-wrap justify-center gap-x-5 gap-y-2 md:gap-3">
          {poin.map((p) => (
            <li
              key={p.judul}
              className="flex items-center gap-2 md:min-w-0 md:flex-[1_1_260px] md:items-start md:gap-3.5 md:rounded-[14px] md:border md:border-garis md:bg-white md:px-[18px] md:py-4"
            >
              <span className="hidden md:block">
                <IconBox name={p.ikon} size={40} />
              </span>
              <Icon name="centang" size={16} stroke={2.6} className="text-oranye-teks md:hidden" />
              <span className="flex flex-col gap-0.5">
                <strong className="text-sm text-navy md:text-base">{p.judul}</strong>
                <span className="hidden text-sm leading-snug text-teks-muted md:block">{p.isi}</span>
              </span>
            </li>
          ))}
        </ul>

        <FormKonsultasi {...form} />

        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5 text-sm text-teks-muted">
          <span className="flex items-center gap-2.5">
            <Image
              src="/images/nicx.webp"
              alt={`${site.founder.name}, founder Atrahdis`}
              width={80}
              height={80}
              className="h-10 w-10 flex-none rounded-full border-2 border-oranye object-cover"
            />
            <span>
              Setiap berkas diperiksa langsung oleh <strong className="text-navy">{site.founder.name}</strong>, founder Atrahdis
            </span>
          </span>
          <span className="flex items-center gap-2">
            <Icon name="jam" size={18} stroke={1.8} className="text-oranye-teks" />
            Dibalas dalam 5 menit di jam kerja
          </span>
          <span className="flex items-center gap-2">
            <Icon name="tim" size={18} stroke={1.8} className="text-oranye-teks" />
            {site.stats.perusahaan} perusahaan didampingi sejak {site.stats.sejak}
          </span>
        </div>
      </div>
    </section>
  );
}
