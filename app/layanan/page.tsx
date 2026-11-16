import Link from "next/link";
import { hargaTampil, layanan, tampilHarga } from "@/content/layanan";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { CheckList, IconBox } from "@/components/ui/Icon";
import { LogoKlien } from "@/components/sections/Bukti";
import { KartuIkon, type ItemIkon } from "@/components/sections/Kartu";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { PageHero } from "@/components/sections/PageHero";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Layanan SBU, SKK, dan Dokumen Tender Konstruksi | Atrahdis",
  "Semua layanan Atrahdis: pembuatan SBU konstruksi, perpanjangan SBU, SKK tenaga ahli, dan dokumen pendukung tender dalam satu alur.",
  "/layanan",
);

/** Rincian tiap layanan utama. Urutan mengikuti content/layanan.ts. */
const rincian: string[][] = [
  [
    "SBU baru kualifikasi Kecil, Menengah, dan Besar",
    "Pemilihan subklasifikasi dan KBLI yang tepat",
    "Audit NIB, akta, SKK, dan keuangan sebelum pengajuan",
  ],
  [
    "Perpanjangan SBU sebelum masa berlaku habis",
    "Naik kualifikasi, misalnya Kecil ke Menengah",
    "Surveilans, update OSS, dan pengecekan KSWP",
  ],
  [
    "SKK tenaga ahli jenjang 5–9",
    "Untuk PJBU, PJTBU, dan PJSKBU",
    "KTA asosiasi bila belum ada",
  ],
  [
    "Laporan keuangan audit KAP",
    "ISO 37001 dan SMK3",
    "Bank Garansi, NIB, PKKPR, dan PBG",
  ],
];

// Dokumen pendukung tender: belum punya halaman sendiri, jadi dijabarkan di sini.
// TODO tim: lengkapi deskripsi dan syarat tiap dokumen.
const pendukung: ItemIkon[] = [
  { ikon: "uang", judul: "Laporan KAP", isi: "Laporan keuangan audit Kantor Akuntan Publik untuk syarat kualifikasi." },
  { ikon: "perisai", judul: "ISO 37001", isi: "Sertifikat sistem manajemen anti-penyuapan yang diminta di sejumlah tender." },
  { ikon: "garansi", judul: "SMK3", isi: "Sertifikat sistem manajemen keselamatan dan kesehatan kerja." },
  { ikon: "koper", judul: "Bank Garansi", isi: "Jaminan penawaran dan pelaksanaan untuk kebutuhan tender." },
  { ikon: "kartuId", judul: "NIB", isi: "Pembuatan dan penyesuaian NIB dengan KBLI jasa konstruksi." },
  { ikon: "dokumen", judul: "PKKPR dan PBG", isi: "Dokumen kesesuaian ruang dan persetujuan bangunan gedung." },
];

export default function Layanan() {
  return (
    <>
      <PageHero
        breadcrumb="Layanan"
        path="/layanan"
        eyebrow="Semua layanan Atrahdis"
        judul="Layanan Pengurusan SBU, SKK, dan Dokumen Tender Konstruksi"
        pengantar="Dari SBU konstruksi dan SKK tenaga ahli sampai dokumen pendukung tender, diurus dalam satu alur dengan satu penanggung jawab. Setiap berkas diaudit dulu sebelum diajukan."
        cta={{ href: "#form-konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "#pendukung", label: "DOKUMEN TENDER" }}
      />

      <Bagian>
        <JudulBagian
          eyebrow="Layanan utama"
          judul="Empat Layanan untuk Kontraktor"
          pengantar="Pilih yang sesuai kebutuhan perusahaan Anda. Belum yakin? Ceritakan rencana tender Anda, kami bantu petakan."
        />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {layanan.map((l, i) => {
            const adaHalaman = l.href !== "/layanan";
            return (
              <article key={l.href} className="flex min-w-0 flex-[1_1_480px] flex-col gap-4 rounded-[14px] border border-garis bg-white p-7">
                <div className="flex items-start gap-4">
                  <IconBox name={l.ikon} size={56} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h3 className="text-xl font-extrabold">{l.judulKartu}</h3>
                    <span className="text-sm text-teks-muted">{l.ringkas}</span>
                  </div>
                  <span className="flex flex-none flex-col items-end">
                    <span className="text-[11px] text-teks-muted">{tampilHarga && l.harga ? l.labelHarga : "biaya"}</span>
                    <span className="font-extrabold text-oranye-teks">{hargaTampil(l)}</span>
                  </span>
                </div>
                <CheckList items={rincian[i]} className="flex-1 text-[15px] leading-snug" />
                {adaHalaman ? (
                  <Link href={l.href} className="text-[15px] font-extrabold text-oranye-teks">
                    Lihat detail {l.nama} →
                  </Link>
                ) : (
                  <a href="#pendukung" className="text-[15px] font-extrabold text-oranye-teks">
                    Lihat daftar dokumen →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </Bagian>

      <Bagian id="pendukung" latar="muda">
        <JudulBagian
          eyebrow="Dokumen pendukung tender"
          judul="Dokumen Pendukung Tender Konstruksi"
          pengantar="Selain SBU dan SKK, tender sering meminta dokumen tambahan. Biayanya kami tulis di penawaran setelah audit kebutuhan."
        />
        <KartuIkon items={pendukung} latar="putih" />
      </Bagian>

      <Bagian>
        <JudulBagian
          eyebrow="Satu alur"
          judul="Kenapa Mengurus Semuanya di Satu Tempat"
          pengantar="SBU, SKK, dan dokumen tender saling bergantung. Kalau diurus terpisah, satu dokumen yang terlambat bisa menahan yang lain."
        />
        <div className="flex w-full flex-wrap gap-5">
          {[
            ["Data saling cocok", "NIB, KBLI, akta, SKK, dan keuangan diperiksa bersama, jadi tidak ada data yang bertabrakan saat pengajuan."],
            ["Urutan yang benar", "SKK disiapkan lebih dulu atau bersamaan dengan SBU, supaya pengajuan tidak tertahan di tengah proses."],
            ["Satu penanggung jawab", "Anda cukup berhubungan dengan satu tim, dari audit awal sampai sertifikat terbit."],
          ].map(([judul, isi]) => (
            <div key={judul} className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 border-l-[3px] border-oranye py-1 pl-4">
              <h3 className="text-lg font-extrabold">{judul}</h3>
              <p className="text-[15px] leading-relaxed text-teks-muted">{isi}</p>
            </div>
          ))}
        </div>
        <Tombol href="/tentang" varian="garis-navy" kecil>
          Kenali cara kerja kami
        </Tombol>
      </Bagian>

      <LogoKlien judul="Dipercaya Kontraktor Nasional dan Multinasional" />

      <Konsultasi
        judul="Belum Yakin Layanan Mana yang Dibutuhkan?"
        pengantar="Isi data singkat dan ceritakan rencana tender Anda. Kami petakan dokumen apa saja yang perlu disiapkan, lalu menghubungi lewat WhatsApp."
        penawaran="Gratis audit berkas + Checklist Dokumen SBU 2026"
        poin={[
          "Pemetaan SBU, SKK, dan dokumen tender yang Anda butuhkan",
          "Checklist dokumen dikirim lewat WhatsApp",
          "Estimasi biaya dan timeline tertulis, dibalas dalam 15 menit di jam kerja",
        ]}
      />
    </>
  );
}
