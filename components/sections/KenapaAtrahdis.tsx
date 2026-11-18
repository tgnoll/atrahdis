import Image from "next/image";
import { site } from "@/content/site";
import { Tombol } from "@/components/ui/Bagian";

/**
 * Blok "Kenapa kontraktor mengurus SBU di Atrahdis".
 * Dipakai di beranda, /jasa-sbu, dan /perpanjangan-sbu. Diletakkan tepat setelah bagian berlatar putih
 * (padding atas 0, menempel ke bagian sebelumnya).
 */
export function KenapaAtrahdis() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3.5 px-6 pb-16 pt-0">
        <div className="flex flex-wrap items-center gap-8 rounded-[18px] bg-latar-muda p-7 md:gap-10 md:p-10">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
            <h2 className="text-2xl font-extrabold leading-tight md:text-[28px]">
              Kenapa kontraktor mengurus SBU di Atrahdis
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              <p className="min-w-0 flex-[1_1_380px] text-base leading-relaxed text-teks-muted">
                Pengajuan SBU sering tertahan karena KBLI atau SKK tidak cocok dengan subklasifikasi.
                Karena itu setiap berkas kami audit sebelum diajukan.
              </p>
              <p className="min-w-0 flex-[1_1_380px] text-base leading-relaxed text-teks-muted">
                Biaya ditulis di penawaran, tanpa tagihan di luar kesepakatan. Kalau pengajuan ditolak
                karena kelalaian kami, perbaikannya kami tanggung sesuai kontrak.
              </p>
            </div>
            <div className="mt-1 flex flex-wrap items-end gap-x-10 gap-y-4">
              {[
                [site.stats.sertifikat, "sertifikat diproses"],
                [site.stats.perusahaan, "perusahaan"],
                [site.stats.sejak, "mulai beroperasi"],
              ].map(([angka, ket]) => (
                <span key={ket} className="flex flex-col">
                  <strong className="text-[26px] font-extrabold">{angka}</strong>
                  <span className="text-[13px] text-teks-muted">{ket}</span>
                </span>
              ))}
              <Tombol href="/tentang" varian="navy" kecil>
                TENTANG KAMI
              </Tombol>
            </div>
          </div>
          <figure className="m-0 flex min-w-0 flex-[1_1_440px] flex-col gap-2">
            <Image
              src="/images/kolase-sertifikat-klien.webp"
              alt="Kolase klien Atrahdis bersama SBU, SKK, dan kartu anggota yang sudah terbit"
              width={1400}
              height={1120}
              sizes="(min-width: 1024px) 540px, 100vw"
              className="h-auto w-full rounded-[14px] border border-garis shadow-[0_12px_32px_rgba(13,34,66,0.10)]"
            />
            <figcaption className="text-[13px] text-teks-muted">
              Sebagian SBU, SKK, dan kartu anggota klien yang kami urus. Data pribadi disamarkan.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
