import type { ComponentProps } from "react";
import { CheckList } from "@/components/ui/Icon";
import { FormKonsultasi } from "./FormKonsultasi";

/** Section navy berisi penawaran konsultasi + form penyaring. Dipakai di hampir semua halaman. */
export function Konsultasi({
  judul,
  pengantar,
  penawaran,
  poin,
  form,
}: {
  judul: string;
  pengantar: string;
  penawaran: string;
  poin: string[];
  form?: ComponentProps<typeof FormKonsultasi>;
}) {
  return (
    <section id="konsultasi" className="latar-kisi relative scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="absolute -right-36 -top-40 h-[460px] w-[460px] rounded-full border-2 border-oranye/35" />
      <div aria-hidden="true" className="absolute -right-16 -top-20 h-[300px] w-[300px] rounded-full border-2 border-dashed border-oranye/25" />
      <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center gap-12 px-6 pb-[72px] pt-[60px]">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <h2 className="text-[28px] font-extrabold leading-tight text-white md:text-[34px]">{judul}</h2>
          <p className="text-[17px] leading-relaxed text-teks-terang">{pengantar}</p>
          <div className="flex flex-col gap-3 rounded-[14px] border-[1.5px] border-oranye bg-white/[0.08] px-[22px] py-5">
            <span className="self-start rounded-full bg-oranye px-3 py-1 text-xs font-extrabold tracking-[1px] text-navy">
              PENAWARAN KONSULTASI
            </span>
            <strong className="text-xl font-extrabold leading-snug text-white">{penawaran}</strong>
            <CheckList items={poin} warna="text-oranye" className="text-[15px] font-semibold text-white" />
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_420px] justify-center">
          <FormKonsultasi {...form} />
        </div>
      </div>
    </section>
  );
}
