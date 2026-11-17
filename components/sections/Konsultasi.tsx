import Image from "next/image";
import type { ComponentProps } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { FormKonsultasi } from "./FormKonsultasi";

/**
 * Section penawaran + form 2 langkah di tengah. Dipakai di hampir semua halaman;
 * judul dan pertanyaan form disesuaikan per halaman.
 * Latar: putih di atas (menyambung section sebelumnya), gradasi ke abu muda mulai setengah ke bawah.
 */
export function Konsultasi({
  eyebrow = "FORMULIR AUDIT BERKAS GRATIS",
  judul,
  sorot,
  pengantar,
  form,
}: {
  eyebrow?: string;
  judul: string;
  /** Bagian akhir judul yang diberi warna oranye. */
  sorot?: string;
  pengantar: string;
  form?: ComponentProps<typeof FormKonsultasi>;
}) {
  return (
    <section
      id="konsultasi"
      className="scroll-mt-24 border-b border-garis bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#f1f5fa_100%)]"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-7 px-5 pb-14 pt-6 md:gap-9 md:px-6 md:pb-20 md:pt-8">
        <div className="flex max-w-[800px] flex-col items-center gap-4 text-center">
          <span className="text-[13px] font-extrabold tracking-[2px] text-biru md:text-sm">
            {eyebrow}
          </span>
          <h2 className="text-[28px] font-extrabold leading-tight text-navy md:text-[34px]">
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
