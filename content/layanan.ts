/**
 * Layanan yang tampil di situs.
 *
 * Harga TIDAK ditampilkan di halaman mana pun (KEPUTUSAN-FINAL butir 1, Nicx 19 Nov 2026).
 * Angka harga hanya boleh muncul di kalkulator dan wajib diambil dari catalog_core.py,
 * jadi file ini sengaja tidak menyimpan angka harga apa pun.
 */
import type { IconName } from "@/components/ui/Icon";

export const HARGA_DISEMBUNYIKAN = "Biaya setelah audit";

export type Layanan = {
  href: string;
  ikon: IconName;
  nama: string;
  judulKartu: string;
  ringkas: string;
  deskripsi: string;
};

export const layanan: Layanan[] = [
  {
    href: "/jasa-sbu",
    ikon: "dokumen",
    nama: "SBU baru",
    judulKartu: "Jasa Pembuatan SBU Konstruksi",
    ringkas: "Kualifikasi Kecil, Menengah, Besar",
    deskripsi:
      "SBU baru kualifikasi Kecil, Menengah, dan Besar, termasuk pemilihan subklasifikasi dan KBLI yang tepat.",
  },
  {
    href: "/perpanjangan-sbu",
    ikon: "perpanjang",
    nama: "Perpanjangan SBU",
    judulKartu: "Perpanjangan SBU",
    ringkas: "Sebelum masa berlaku habis",
    deskripsi:
      "Perpanjangan dan naik kualifikasi SBU, plus surveilans, update OSS, dan KSWP supaya SBU tetap aktif.",
  },
  {
    href: "/jasa-skk",
    ikon: "orang",
    nama: "SKK tenaga ahli",
    judulKartu: "Jasa Pembuatan SKK Konstruksi",
    ringkas: "Jenjang 4–9, syarat wajib SBU",
    deskripsi: "SKK tenaga ahli jenjang 4–9 untuk PJBU, PJTBU, dan PJSKBU, serta KTA asosiasi.",
  },
  {
    href: "/layanan",
    ikon: "koper",
    nama: "Dokumen pendukung tender",
    judulKartu: "Dokumen Pendukung Tender",
    ringkas: "KAP, ISO 37001, SMK3, Bank Garansi",
    deskripsi: "Laporan KAP, ISO 37001, SMK3, Bank Garansi, NIB, PKKPR, dan PBG untuk syarat tender.",
  },
];

/** Paket SBU per kualifikasi (beranda + /jasa-sbu). */
export const paketSbu = [
  {
    nama: "SBU Kecil",
    untuk: "Penjualan tahunan sampai Rp15 miliar",
    unggulan: false,
    termasuk: [
      "Audit berkas sebelum pembayaran",
      "Pengajuan ke LPJK",
      "Pemantauan sampai terbit",
      "Garansi tertulis di kontrak",
    ],
  },
  {
    nama: "SBU Menengah",
    untuk: "Untuk proyek Rp15–50 miliar",
    unggulan: true,
    termasuk: [
      "Cek syarat keuangan dan tenaga ahli",
      "Pengajuan ke LPJK",
      "Pemantauan sampai terbit",
      "Garansi tertulis di kontrak",
    ],
  },
  {
    nama: "SBU Besar",
    untuk: "Untuk proyek di atas Rp50 miliar",
    unggulan: false,
    termasuk: [
      "Pemetaan syarat sebelum pengajuan",
      "Pengajuan ke LPJK",
      "Pemantauan sampai terbit",
      "Garansi tertulis di kontrak",
    ],
  },
];

/** Jenjang SKK yang diurus (/jasa-skk). Biaya dihitung per orang, per jenjang, per subklasifikasi. */
export const jenjangSkk = ["Jenjang 4", "Jenjang 5 dan 6", "Jenjang 7", "Jenjang 8", "Jenjang 9"];

/** Empat langkah kerja yang sama di beranda dan /jasa-sbu. */
export const langkahSbu = [
  {
    judul: "Konsultasi gratis",
    isi: `Audit dokumen lewat WhatsApp. Nicx langsung mengecek kekurangan dan risikonya.`,
  },
  {
    judul: "Proposal & kontrak",
    isi: "Timeline, biaya, dan garansi ditulis di kontrak. Tidak ada biaya di luar kesepakatan.",
  },
  {
    judul: "Kami kerjakan penuh",
    isi: "Kami ajukan, pantau, dan tindak lanjuti ke LPJK. Progres dikabari di tiap milestone.",
  },
  {
    judul: "Sertifikat di tangan",
    isi: "SBU terbit sesuai kontrak. Jika terlambat karena kelalaian kami, garansi berlaku.",
  },
];
