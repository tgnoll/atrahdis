import Link from "next/link";
import { artikel } from "@/content/blog";
import { langkahSbu, layanan, tampilHarga } from "@/content/layanan";
import { site } from "@/content/site";
import { Bagian, Eyebrow, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { Icon, IconBox, type IconName } from "@/components/ui/Icon";
import { LogoKlien, StudiKasus } from "@/components/sections/Bukti";
import { FAQ } from "@/components/sections/FAQ";
import { PaketSbu } from "@/components/sections/Harga";
import { KenapaAtrahdis } from "@/components/sections/KenapaAtrahdis";
import { KartuArtikel, Langkah } from "@/components/sections/Kartu";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { Founder, Kutipan, PetaLokasi } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Jasa Pengurusan SBU dan SKK Konstruksi | Atrahdis",
  "Jasa pembuatan SBU konstruksi K, M, B, perpanjangan SBU, dan SKK tenaga ahli. Berkas diaudit sebelum diajukan ke LPJK. Konsultasi gratis.",
  "/",
);

const keunggulan: { ikon: IconName; judul: string; isi: string }[] = [
  {
    ikon: "cari",
    judul: "Audit berkas sebelum pengajuan",
    isi: "NIB, KBLI, akta, SKK, dan keuangan dicocokkan dulu, supaya pengajuan SBU ke LPJK tidak bolak-balik.",
  },
  { ikon: "garansi", judul: "Garansi tertulis", isi: "Biaya, timeline, dan garansi ada di kontrak sebelum pekerjaan dimulai." },
  { ikon: "jam", judul: "Respons 5 menit", isi: "Pertanyaan di WhatsApp dibalas dalam 5 menit selama jam kerja." },
  { ikon: "bendera", judul: "Update tiap milestone", isi: "Progres pengurusan dikabari rutin, tanpa perlu Anda menanyakan." },
  {
    ikon: "orang",
    judul: "Bisa langsung ke founder",
    isi: `Kalau ada kendala, Anda bisa eskalasi langsung ke ${site.founder.name} kapan saja.`,
  },
  { ikon: "layar", judul: "Proses online", isi: "Kirim dokumen dan pantau progres dari kota mana pun di Indonesia." },
];

const linimasa = [
  { tahun: "2016", ket: "mulai menangani SBU" },
  { tahun: "2017", ket: "PT berdiri" },
  { tahun: "2020", ket: "100+ sertifikat" },
  { tahun: "2024–26", ket: "digitalisasi" },
];

const faq = [
  {
    q: "Berapa biaya pembuatan SBU konstruksi?",
    a: tampilHarga
      ? "SBU Kecil mulai sekitar Rp4,8 juta, SBU Menengah mulai Rp18 juta, dan SBU Besar mulai Rp50 juta. Biaya final mengikuti jumlah subklasifikasi dan kondisi berkas, ditulis di kontrak setelah audit."
      : "Biaya mengikuti kualifikasi, jumlah subklasifikasi, dan kondisi berkas. Rinciannya ditulis di kontrak setelah audit berkas gratis.",
  },
  {
    q: "Berapa lama proses pembuatan SBU konstruksi?",
    a: "Tergantung kualifikasi, jumlah subklasifikasi, dan kelengkapan berkas. Estimasi waktunya kami tulis di kontrak setelah audit.",
  },
  {
    q: "Apa saja syarat pembuatan SBU konstruksi?",
    a: "NIB aktif dengan KBLI jasa konstruksi, akta perusahaan, NPWP badan, KTP dan NPWP direksi, SKK tenaga ahli, laporan keuangan, dan KTA asosiasi.",
  },
  {
    q: "Apa beda SBU Kecil, Menengah, dan Besar?",
    a: "Perbedaannya ada di kemampuan keuangan, tenaga ahli, dan nilai proyek yang boleh diikuti. Kami bantu petakan kualifikasi yang tepat untuk tender Anda.",
  },
  {
    q: "Kapan SBU harus diperpanjang?",
    a: "Masa berlaku SBU 3 tahun. Perpanjangan sebaiknya diurus sebelum habis supaya tidak ada jeda saat ikut tender.",
  },
  {
    q: "Apakah Atrahdis juga mengurus SKK konstruksi?",
    a: "Ya. Kami membantu pembuatan SKK tenaga ahli jenjang 4–9 yang dibutuhkan sebagai syarat SBU, termasuk KTA asosiasi.",
  },
];

export default function Beranda() {
  return (
    <>
      <section className="hero-foto">
        <div className="mx-auto flex min-h-[420px] max-w-[1180px] items-center px-6 py-20 md:py-24">
          <div className="flex max-w-[560px] flex-col gap-5">
            <span className="self-start border-b-2 border-oranye pb-1.5 text-[13px] font-extrabold tracking-[2px] text-white">
              KONSULTAN SBU &amp; SKK KONSTRUKSI SEJAK {site.stats.sejak}
            </span>
            <h1 className="text-[34px] font-extrabold leading-[1.14] text-white md:text-[46px]">
              Jasa Pengurusan SBU dan SKK Konstruksi untuk Kontraktor di Seluruh Indonesia
            </h1>
            <p className="text-lg leading-relaxed text-teks-terang">
              Atrahdis membantu <strong className="text-white">pembuatan SBU konstruksi</strong>,
              perpanjangan SBU, dan SKK tenaga ahli sampai terbit. Setiap berkas diaudit dulu, supaya
              NIB, KBLI, akta, dan SKK sesuai syarat LPJK.
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Tombol href="#konsultasi">KONSULTASI GRATIS</Tombol>
              <Tombol href="#cara-kerja" varian="garis-putih">
                LIHAT CARA KERJA
              </Tombol>
            </div>
          </div>
        </div>
      </section>

      <LogoKlien judul="Dipercaya Kontraktor Nasional untuk Pengurusan SBU Konstruksi" />

      <Bagian latar="muda">
        <JudulBagian
          eyebrow="Layanan utama"
          judul="Layanan Pengurusan SBU, SKK, dan Dokumen Tender Konstruksi"
          pengantar="Dari SBU konstruksi dan SKK tenaga ahli sampai dokumen pendukung tender, diurus dalam satu alur dengan satu penanggung jawab."
        />
        <div className="flex w-full flex-wrap items-stretch gap-4">
          {layanan.map((l) => (
            <article key={l.href} className="flex min-w-0 flex-[1_1_240px] flex-col gap-3 rounded-[14px] border border-garis bg-white px-6 py-7">
              <Icon name={l.ikon} size={42} />
              <h3 className="mt-1 text-lg font-extrabold">{l.judulKartu}</h3>
              <p className="flex-1 text-sm leading-relaxed text-teks-muted">{l.deskripsi}</p>
              <Link href={l.href} className="text-sm font-bold">
                Lihat detail →
              </Link>
            </article>
          ))}
        </div>
      </Bagian>

      <Founder eyebrow="Tentang Atrahdis" judul="Konsultan SBU Konstruksi yang Menangani Berkas Langsung Sejak 2016">
        <p className="text-base leading-relaxed text-teks-muted">
          Atrahdis berawal dari pengurusan SBU konstruksi yang {site.founder.name} tangani sendiri
          pada 2016, lalu berdiri sebagai {site.legalName} pada 2017. Hingga kini, setiap pengajuan tetap melalui pemeriksaan akhir dan persetujuan langsung
          dari {site.founder.name} sebelum disampaikan ke LPJK.
        </p>
        <div className="flex flex-wrap gap-3.5 self-stretch">
          {linimasa.map((t) => (
            <div key={t.tahun} className="flex min-w-0 flex-[1_1_120px] flex-col gap-0.5 border-l-[3px] border-oranye py-0.5 pl-3">
              <strong className="text-lg font-extrabold">{t.tahun}</strong>
              <span className="text-[13px] text-teks-muted">{t.ket}</span>
            </div>
          ))}
        </div>
        <Kutipan>Regulasi punya aturan main yang jelas. Kalau dokumennya benar, hasilnya pasti.</Kutipan>
        <Tombol href="/tentang" varian="navy" kecil>
          TENTANG KAMI
        </Tombol>
      </Founder>

      <Bagian id="cara-kerja" latar="muda">
        <JudulBagian eyebrow="Cara kerja" judul="Cara Mengurus SBU Konstruksi di Atrahdis" />
        <Langkah items={langkahSbu} />
      </Bagian>

      <Bagian>
        <JudulBagian eyebrow="Keunggulan kami" judul="Keunggulan Jasa Pengurusan SBU dan SKK di Atrahdis" />
        <div className="flex w-full flex-wrap gap-x-8 gap-y-7">
          {keunggulan.map((k) => (
            <div key={k.judul} className="flex min-w-0 flex-[1_1_320px] items-start gap-4">
              <IconBox name={k.ikon} size={56} />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-extrabold">{k.judul}</h3>
                <p className="text-[15px] leading-relaxed text-teks-muted">{k.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </Bagian>

      <KenapaAtrahdis />

      <PaketSbu
        eyebrow="Biaya transparan"
        judul="Biaya Pembuatan SBU Konstruksi 2026"
        pengantar="Biaya final mengikuti jumlah subklasifikasi dan kondisi berkas, ditulis di kontrak setelah audit. Tender di atas Rp50 miliar: hubungi kami langsung."
      />

      <Konsultasi
        judul="Cek Gratis Kebutuhan SBU dan SKK Perusahaan Anda,"
        sorot="Sebelum Keluar Biaya Sepeser Pun"
        pengantar="Jawab 3 pertanyaan singkat. Kami cek kesiapan NIB, KBLI, akta, dan SKK perusahaan Anda, lalu kirim hasilnya lewat WhatsApp. Kami bantu tanpa biaya!"
      />

      <StudiKasus />

      <section id="blog" className="latar-kisi relative overflow-hidden">
        <div aria-hidden="true" className="absolute -left-40 -top-44 h-[420px] w-[420px] rounded-full border-2 border-oranye/30" />
        <div className="relative mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-[60px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col items-start gap-3">
              <Eyebrow terang>Blog</Eyebrow>
              <h2 className="text-[26px] font-extrabold leading-tight text-white md:text-[32px]">
                Panduan SBU dan SKK Konstruksi
              </h2>
            </div>
            <Tombol href="/blog" kecil>
              Semua artikel →
            </Tombol>
          </div>
          <div className="flex w-full flex-wrap gap-4">
            {artikel.slice(0, 6).map((a) => (
              <KartuArtikel key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      <FAQ judul="Pertanyaan Seputar SBU dan SKK Konstruksi" items={faq} />

      <PetaLokasi />
    </>
  );
}
