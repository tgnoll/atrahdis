/**
 * Daftar artikel blog (judul + slug mengikuti situs lama supaya URL tidak berubah).
 * Isi artikel belum dipindahkan: lihat README, tahap 6.
 */
export type Artikel = {
  slug: string;
  judul: string;
  kategori: string;
  tanggal: string;
  ringkas?: string;
};

export const artikel: Artikel[] = [
  {
    slug: "apa-itu-sbu-konstruksi",
    judul: "Apa Itu SBU Konstruksi? Panduan Lengkap 2026",
    kategori: "Panduan SBU",
    tanggal: "26 Apr 2026",
    ringkas:
      "Pengertian SBU konstruksi, fungsinya untuk tender, kualifikasi K, M, B, dan langkah mengurusnya dari awal.",
  },
  {
    slug: "syarat-sbu-konstruksi-2026",
    judul: "Syarat SBU Konstruksi 2026: Checklist Dokumen Lengkap per Jenis",
    kategori: "Syarat SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "biaya-sbu-konstruksi-2026",
    judul: "Berapa Biaya SBU Konstruksi 2026? Panduan Lengkap",
    kategori: "Biaya SBU",
    tanggal: "22 Apr 2026",
  },
  {
    slug: "perpanjangan-sbu-sebelum-expired",
    judul: "Perpanjangan SBU Konstruksi Sebelum Expired: Kapan dan Caranya",
    kategori: "Perpanjangan SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "kenapa-sbu-ditolak-solusi",
    judul: "8 Alasan SBU Ditolak LPJK dan Cara Mengatasinya",
    kategori: "Pengajuan SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "perbedaan-sbu-kecil-menengah-besar-2026",
    judul: "Perbedaan SBU Kecil, Menengah, Besar: Panduan 2026",
    kategori: "Kualifikasi SBU",
    tanggal: "22 Apr 2026",
  },
  {
    slug: "cara-daftar-sbu-baru-2026",
    judul: "Cara Daftar SBU Baru 2026: Step-by-Step Lengkap",
    kategori: "Pengajuan SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "kbli-untuk-sbu-konstruksi",
    judul: "Panduan Pilih KBLI yang Benar untuk SBU Konstruksi 2026",
    kategori: "Syarat SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "syarat-tender-konstruksi-sbu",
    judul: "Syarat Tender Konstruksi 2026: Kualifikasi SBU K, M, dan B",
    kategori: "Tender",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "upgrade-sbu-kecil-ke-menengah",
    judul: "Upgrade SBU Kecil ke Menengah: Syarat, Biaya, dan Timeline 2026",
    kategori: "Kualifikasi SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "cara-cek-kswp-untuk-sbu",
    judul: "Cara Cek KSWP untuk SBU Konstruksi: Panduan Step-by-Step",
    kategori: "Pengajuan SBU",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "sbu-untuk-proyek-pemerintah",
    judul: "SBU untuk Proyek Pemerintah: Syarat e-Procurement 2026",
    kategori: "Tender",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "sbu-expired-tender",
    judul: "SBU Expired Bisa Ikut Tender? Ini Risiko dan Solusinya",
    kategori: "Tender",
    tanggal: "26 Apr 2026",
  },
  {
    slug: "dokumen-sbu-konstruksi-checklist",
    judul: "Checklist Dokumen SBU Konstruksi 2026: K, M, dan B",
    kategori: "Syarat SBU",
    tanggal: "26 Apr 2026",
  },
];

export const kategoriBlog = [
  "Panduan SBU",
  "Syarat SBU",
  "Biaya SBU",
  "Pengajuan SBU",
  "Perpanjangan SBU",
  "Kualifikasi SBU",
  "Tender",
];

export const cariArtikel = (slug: string) => artikel.find((a) => a.slug === slug);
export const ambilArtikel = (slugs: string[]) =>
  slugs.map(cariArtikel).filter((a): a is Artikel => Boolean(a));
