import { site } from "@/content/site";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { StudiKasus } from "@/components/sections/Bukti";
import { PageHero } from "@/components/sections/PageHero";
import { CtaStrip } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Sertifikat Klien Atrahdis: Portofolio SBU dan SKK",
  `${site.stats.sertifikat} sertifikat SBU, SKK, dan pendukungnya diproses Atrahdis sejak ${site.stats.sejak}. Nama klien disamarkan untuk menjaga kerahasiaan.`,
  "/sertifikat-klien",
);

// KEPUTUSAN-FINAL butir 2: nama klien disamarkan; yang tampil hanya jenis sertifikat.
const jenis = ["SBU Kecil", "SBU Menengah", "SBU Besar", "SKK Jenjang 5", "SKK Jenjang 6", "SKK Jenjang 7", "KTA Asosiasi", "Sertifikat Kompetensi", "ISO 9001"];

export default function SertifikatKlien() {
  return (
    <>
      <PageHero
        breadcrumb="Sertifikat Klien"
        path="/sertifikat-klien"
        eyebrow="Portofolio"
        judul="Sertifikat Klien Atrahdis"
        pengantar={`${site.stats.sertifikat} sertifikat diproses sejak ${site.stats.sejak} untuk ${site.stats.perusahaan} perusahaan di berbagai kota di Indonesia. Nama klien kami samarkan untuk menjaga kerahasiaan.`}
        cta={{ href: "/kontak#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "/kenapa-kami", label: "KENAPA ATRAHDIS" }}
      />

      <Bagian>
        <JudulBagian eyebrow="Jenis sertifikat" judul="Yang Sudah Kami Proses" pengantar="Dari SBU semua kualifikasi sampai SKK, KTA, dan sertifikasi pendukung." />
        <ul className="flex w-full flex-wrap justify-center gap-3">
          {jenis.map((j) => (
            <li key={j} className="rounded-full border border-garis bg-latar-muda px-5 py-2.5 text-[15px] font-bold text-navy">
              {j}
            </li>
          ))}
        </ul>
        <dl className="flex w-full flex-wrap justify-center gap-4">
          {[
            [site.stats.sertifikat, "sertifikat diproses"],
            [site.stats.perusahaan, "perusahaan didampingi"],
            [site.stats.klienKembali, "klien kembali"],
          ].map(([angka, ket]) => (
            <div key={ket} className="flex min-w-[200px] flex-col-reverse gap-1 rounded-[14px] border border-garis bg-white px-6 py-5 text-center">
              <dt className="text-sm text-teks-muted">{ket}</dt>
              <dd className="text-[32px] font-extrabold leading-none text-navy">{angka}</dd>
            </div>
          ))}
        </dl>
      </Bagian>

      <StudiKasus latar="muda" />

      <CtaStrip
        judul="Jadilah klien berikutnya"
        isi="Konsultasi gratis untuk audit dokumen SBU Anda. Tanpa biaya, tanpa komitmen."
        tombol="KONSULTASI GRATIS"
      />
    </>
  );
}
