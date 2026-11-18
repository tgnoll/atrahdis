/**
 * Layanan + harga yang tampil di situs.
 *
 * Keputusan tim yang belum final disimpan sebagai flag di sini, supaya cukup
 * mengubah satu baris tanpa menyentuh komponen. Lihat docs/keputusan-tertunda.md.
 */
import type { IconName } from "@/components/ui/Icon";

/**
 * Tampilkan harga ke publik?
 * true  = angka dari atrahdis.id/biaya tampil.
 * false = semua harga diganti "Biaya setelah audit".
 * MENUNGGU KEPUTUSAN TIM.
 */
export const tampilHarga = true;

export const HARGA_DISEMBUNYIKAN = "Setelah audit";

export type Layanan = {
  href: string;
  ikon: IconName;
  nama: string;
  judulKartu: string;
  ringkas: string;
  deskripsi: string;
  labelHarga: "mulai" | "biaya";
  harga?: string;
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
    labelHarga: "mulai",
    harga: "Rp4,5 jt",
  },
  {
    href: "/perpanjangan-sbu",
    ikon: "perpanjang",
    nama: "Perpanjangan SBU",
    judulKartu: "Perpanjangan SBU",
    ringkas: "Sebelum masa berlaku habis",
    deskripsi:
      "Perpanjangan dan naik kualifikasi SBU, plus surveilans, update OSS, dan KSWP supaya SBU tetap aktif.",
    labelHarga: "biaya",
  },
  {
    href: "/jasa-skk",
    ikon: "orang",
    nama: "SKK tenaga ahli",
    judulKartu: "Jasa Pembuatan SKK Konstruksi",
    ringkas: "Jenjang 4–9, syarat wajib SBU",
    deskripsi: "SKK tenaga ahli jenjang 4–9 untuk PJBU, PJTBU, dan PJSKBU, serta KTA asosiasi.",
    labelHarga: "mulai",
    harga: "Rp5,97 jt",
  },
  {
    href: "/layanan",
    ikon: "koper",
    nama: "Dokumen pendukung tender",
    judulKartu: "Dokumen Pendukung Tender",
    ringkas: "KAP, ISO 37001, SMK3, Bank Garansi",
    deskripsi: "Laporan KAP, ISO 37001, SMK3, Bank Garansi, NIB, PKKPR, dan PBG untuk syarat tender.",
    labelHarga: "biaya",
  },
];

export const hargaTampil = (l: Pick<Layanan, "harga">) =>
  tampilHarga && l.harga ? l.harga : HARGA_DISEMBUNYIKAN;

/** Paket SBU per kualifikasi (beranda + /jasa-sbu). */
export const paketSbu = [
  {
    nama: "SBU Kecil",
    harga: "Mulai Rp4,5 jt",
    untuk: "Untuk kontraktor kualifikasi kecil",
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
    harga: "Rp18 jt",
    untuk: "Untuk tender Rp2–5 miliar",
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
    harga: "Rp50 jt+",
    untuk: "Untuk tender Rp10–50 miliar",
    unggulan: false,
    termasuk: [
      "Pemetaan syarat sebelum pengajuan",
      "Pengajuan ke LPJK",
      "Pemantauan sampai terbit",
      "Garansi tertulis di kontrak",
    ],
  },
];

/** Harga SKK per jenjang (/jasa-skk). Per orang, per jenjang, per subklasifikasi. */
export const hargaSkk = [
  { jenjang: "Jenjang 4", harga: "Hubungi kami" }, // TODO tim: harga J4 belum ada
  { jenjang: "Jenjang 5 dan 6", harga: "Rp5.970.000" },
  { jenjang: "Jenjang 7", harga: "Rp7.470.000" },
  { jenjang: "Jenjang 8", harga: "Rp8.970.000" },
  { jenjang: "Jenjang 9", harga: "Hubungi kami" }, // TODO tim: harga J9 belum ada
];

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
