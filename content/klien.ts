/**
 * Logo klien, studi kasus, dan testimoni.
 * MENUNGGU KEPUTUSAN TIM: izin memakai nama/logo klien dan angka durasi.
 */

/** false = baris logo klien disembunyikan di semua halaman. */
export const tampilLogoKlien = true;

/** false = lencana "Selesai … hari" disembunyikan di studi kasus. */
export const tampilDurasi = true;

export type Klien = { nama: string; logo?: string; tinggi?: number };

// Klien tanpa file logo ditampilkan sebagai teks. Taruh file di public/images/klien/.
// Catatan: studi kasus menyebut "PT Sumitomo Electric", jadi logonya Sumitomo Electric,
// bukan Sumitomo Corporation (perusahaan berbeda). TODO tim: pastikan klien yang benar.
export const klien: Klien[] = [
  { nama: "Waskita Karya", logo: "/images/klien/waskita.png", tinggi: 64 },
  { nama: "Korindo", logo: "/images/klien/korindo.webp", tinggi: 36 },
  { nama: "Sumitomo Electric", logo: "/images/klien/sumitomo-electric.svg", tinggi: 30 },
  { nama: "Sanggar Sarana Baja", logo: "/images/klien/sanggar-sarana-baja.webp", tinggi: 30 },
  { nama: "Synkrona Enjiniring Nusantara", logo: "/images/klien/synkrona.webp", tinggi: 46 },
  { nama: "Elsewedy Electric", logo: "/images/klien/elsewedy.webp", tinggi: 52 },
];

export const studiKasus = [
  {
    klien: "PT Waskita Karya",
    ringkas: "Perpanjangan SBU B dan KTA untuk proyek infrastruktur pemerintah.",
    durasi: "Selesai 28 hari",
  },
  {
    klien: "PT Korindo Group",
    ringkas: "Naik kualifikasi K ke M untuk tender BUMN. Audit awal menemukan gap KBLI.",
    durasi: "Selesai 15 hari",
  },
  {
    klien: "PT Sumitomo Electric",
    ringkas: "SBU dan Serkom J7 untuk tender perluasan pabrik.",
    durasi: "Selesai 18 hari",
  },
];

export const testimoni = {
  // Kutipan asli klien menulis "Mas Nicky". TODO tim: samakan dengan ejaan di site.ts?
  kutipan:
    "Mas Nicky tidak hanya membawa solusi perizinan inovatif ke industri konstruksi, tetapi juga membantu klien menavigasi regulasi yang kompleks secara mulus dan efisien!",
  nama: "Dimas",
  jabatan: "Direktur, PT. Harapan Nusantara Djaya",
  foto: "", // TODO: foto belum ada di repo; kosong = inisial
};
