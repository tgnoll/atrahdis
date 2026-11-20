import { site, waLink } from "@/content/site";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { LogoKlien, StudiKasus } from "@/components/sections/Bukti";
import { KenapaAtrahdis } from "@/components/sections/KenapaAtrahdis";
import { PageHero } from "@/components/sections/PageHero";
import { CtaStrip, Founder, Kutipan } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  `Kenapa Atrahdis: ${site.stats.perusahaan} Perusahaan Didampingi Sejak ${site.stats.sejak}`,
  `Rekam jejak Atrahdis mengurus SBU dan SKK konstruksi: ${site.stats.sertifikat} sertifikat diproses, ${site.stats.perusahaan} perusahaan didampingi, setiap berkas diperiksa founder.`,
  "/kenapa-kami",
);

// Estimasi bertingkat (KEPUTUSAN-FINAL); angka per proyek tidak ditampilkan (butir 3).
const estimasi = [
  ["SBU Kecil", "Tercepat 3 hari kerja jika berkas lengkap dan SKK sudah ada, umumnya 2–4 minggu"],
  ["SBU Menengah", "Bertingkat sesuai kondisi berkas, ditulis di kontrak setelah audit"],
  ["SBU Besar atau PMA", "Umumnya 4–8 minggu"],
  ["Perpanjangan", "Lebih cepat dari pengajuan baru bila data tidak berubah, sebaiknya dimulai sebelum masa berlaku habis"],
];

export default function KenapaKami() {
  return (
    <>
      <PageHero
        breadcrumb="Kenapa Kami"
        path="/kenapa-kami"
        eyebrow="Kenapa Atrahdis"
        judul={`${site.stats.perusahaan} Perusahaan Didampingi Sejak ${site.stats.sejak}`}
        pengantar="Rekam jejak kami mengurus SBU dan SKK konstruksi, dari kontraktor besar sampai usaha kecil yang baru pertama kali mengurus SBU."
        cta={{ href: "/kontak#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "/layanan", label: "LIHAT LAYANAN" }}
        bawah={
          <dl className="flex w-full flex-wrap gap-4">
            {[
              [site.stats.sertifikat, "sertifikat diproses"],
              [site.stats.perusahaan, "perusahaan didampingi"],
              [site.stats.klaimGaransi, "klaim garansi dicairkan"],
              [site.stats.klienKembali, "klien kembali di tahun berikutnya"],
            ].map(([angka, ket]) => (
              <div key={ket} className="flex min-w-0 flex-[1_1_200px] flex-col-reverse gap-1 rounded-[14px] border border-white/20 bg-white/[0.08] px-6 py-5">
                <dt className="text-sm text-teks-redup">{ket}</dt>
                <dd className="text-[32px] font-extrabold leading-none text-white">{angka}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <KenapaAtrahdis />

      <Founder eyebrow="Founder" judul={`Setiap berkas diperiksa langsung oleh ${site.founder.name}`}>
        <p className="text-base leading-relaxed text-teks-muted">
          Sejak {site.stats.sejak}, setiap pengajuan SBU melalui pemeriksaan akhir dan persetujuan langsung dari{" "}
          {site.founder.name}, {site.founder.role}. Dokumen diperiksa dari awal sampai disetujui LPJK, tidak dilepas
          ke staf junior.
        </p>
        <Kutipan>Regulasi punya aturan main yang jelas. Kalau dokumennya benar, hasilnya pasti.</Kutipan>
        <Tombol href={waLink(`Halo ${site.founder.name}, saya ingin konsultasi SBU/SKK.`)} kecil>
          Hubungi {site.founder.name}
        </Tombol>
      </Founder>

      <StudiKasus latar="muda" />

      <Bagian sempit>
        <JudulBagian
          eyebrow="Estimasi waktu"
          judul="Berapa Lama Prosesnya"
          pengantar="Estimasi pasti kami tulis di kontrak setelah audit berkas, karena bergantung pada kelengkapan dokumen dan kualifikasi."
        />
        <dl className="w-full divide-y divide-garis overflow-hidden rounded-[14px] border border-garis bg-white">
          {estimasi.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 px-6 py-4 md:flex-row md:gap-6">
              <dt className="font-extrabold text-navy md:w-[220px] md:flex-none">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-teks-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Bagian>

      <LogoKlien judul="Perusahaan yang Pernah Kami Dampingi" />

      <Bagian sempit>
        <JudulBagian eyebrow="Legalitas" judul="Data Perusahaan" />
        <dl className="w-full divide-y divide-garis overflow-hidden rounded-[14px] border border-garis bg-white">
          {[
            ["Nama badan usaha", site.legalName],
            ["NIB", site.nib],
            ["Founder", `${site.founder.name}, ${site.founder.role}`],
            ["Berdiri sejak", site.stats.sejak],
            ["Kualifikasi yang ditangani", "Kecil, Menengah, Besar"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 px-6 py-4 md:flex-row md:gap-6">
              <dt className="font-extrabold text-navy md:w-[220px] md:flex-none">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-teks-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Bagian>

      <CtaStrip
        judul={`Siap bergabung dengan ${site.stats.perusahaan} perusahaan lainnya?`}
        isi="Konsultasi dan audit berkas awal gratis, tanpa komitmen. Keputusan tetap di tangan Anda."
        tombol="KONSULTASI GRATIS"
      />
    </>
  );
}
