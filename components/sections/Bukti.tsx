import Image from "next/image";
import { klien, studiKasus, tampilDurasi, tampilLogoKlien, testimoni } from "@/content/klien";
import { site } from "@/content/site";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";

/** Baris logo klien. Hilang seluruhnya kalau tampilLogoKlien = false. */
export function LogoKlien({ judul }: { judul: string }) {
  if (!tampilLogoKlien) return null;
  return (
    <section className="border-b border-garis bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 px-6 pb-[52px] pt-12">
        <h2 className="text-center text-2xl font-extrabold leading-snug">{judul}</h2>
        <ul className="flex w-full flex-wrap items-center gap-3">
          {klien.map((k) => (
            <li key={k.nama} className="flex h-[72px] min-w-0 flex-[1_1_150px] items-center justify-center">
              {k.logo ? (
                <Image
                  src={k.logo}
                  alt={k.nama}
                  width={170}
                  height={k.tinggi ?? 48}
                  unoptimized={k.logo.endsWith(".svg")}
                  style={{ maxHeight: k.tinggi ?? 48 }}
                  className="w-auto max-w-full object-contain"
                />
              ) : (
                <span className="text-center text-[15px] font-extrabold leading-tight text-teks-muted">
                  {k.nama}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="text-[15px] text-teks-muted">
          dan {site.stats.klienLainnya} perusahaan kontraktor lainnya sejak {site.stats.sejak}
        </p>
      </div>
    </section>
  );
}

function Bintang() {
  return (
    <div role="img" aria-label="Rating 5 dari 5" className="flex gap-1 text-oranye">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

/** Testimoni + 3 studi kasus. Dipakai di beranda dan /jasa-sbu. */
export function StudiKasus({ latar = "putih" }: { latar?: "putih" | "muda" }) {
  return (
    <Bagian id="studi-kasus" latar={latar}>
      <JudulBagian
        eyebrow="Studi kasus & testimoni"
        judul="Studi Kasus dan Testimoni Klien Jasa SBU Atrahdis"
      />
      <div className="flex w-full flex-wrap items-stretch gap-6">
        <figure className="relative flex min-w-0 flex-[1_1_440px] flex-col gap-5 overflow-hidden rounded-[18px] bg-navy p-7 md:p-9">
          <span aria-hidden="true" className="absolute right-6 top-1.5 text-[140px] font-extrabold leading-none text-oranye/25">
            ”
          </span>
          <Bintang />
          <blockquote className="relative flex-1 text-lg font-semibold italic leading-relaxed text-white md:text-[21px]">
            “{testimoni.kutipan}”
          </blockquote>
          <figcaption className="flex items-center gap-3.5 border-t border-white/15 pt-[18px]">
            {testimoni.foto ? (
              <Image
                src={testimoni.foto}
                alt={`${testimoni.nama}, ${testimoni.jabatan}`}
                width={60}
                height={60}
                className="h-[60px] w-[60px] flex-none rounded-full border-[3px] border-oranye object-cover object-[center_25%]"
              />
            ) : (
              <span aria-hidden="true" className="flex h-[60px] w-[60px] flex-none items-center justify-center rounded-full border-[3px] border-oranye bg-navy-terang text-xl font-extrabold text-white">
                {testimoni.nama.charAt(0)}
              </span>
            )}
            <span className="flex flex-col gap-0.5">
              <strong className="text-[17px] text-white">{testimoni.nama}</strong>
              <span className="text-sm text-teks-redup">{testimoni.jabatan}</span>
            </span>
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-3.5">
          {studiKasus.map((s) => (
            <article key={s.klien} className="flex flex-wrap items-center gap-x-[18px] gap-y-3 rounded-[14px] border border-garis bg-white px-6 py-5">
              <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1.5">
                <h3 className="text-[17px] font-extrabold">{s.klien}</h3>
                <p className="text-sm leading-relaxed text-teks-muted">{s.ringkas}</p>
              </div>
              {tampilDurasi && (
                <span className="flex-none rounded-full bg-[#E7F5EC] px-3 py-1.5 text-[13px] font-extrabold text-[#146C3A]">
                  {s.durasi}
                </span>
              )}
            </article>
          ))}
          <span className="text-[13px] text-teks-muted">
            Dan {site.stats.klienLainnya} perusahaan kontraktor lain di seluruh Indonesia.
          </span>
        </div>
      </div>
    </Bagian>
  );
}
