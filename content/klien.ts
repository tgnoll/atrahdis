/**
 * Logo klien, studi kasus, dan testimoni.
 *
 * KEPUTUSAN-FINAL (Nicx 19 Nov 2026):
 * - butir 2: nama klien TAMPIL tapi DISENSOR, logo yang menunjukkan identitas diblur.
 * - butir 3: angka durasi per proyek TIDAK tampil.
 * - butir 4: kutipan testimoni klien dibiarkan verbatim.
 * - butir 14: studi kasus mengikuti atrahdis.id (produksi).
 */

/** Menyamarkan nama klien: "PT Waskita Karya" -> "PT W****** K****". Badan usaha (PT/CV) tetap terbaca. */
export const samarkan = (nama: string) =>
  nama
    .split(" ")
    .map((kata) =>
      /^(PT|CV|PT\.|CV\.)$/i.test(kata) ? kata : kata.charAt(0) + "*".repeat(Math.max(kata.length - 1, 2)),
    )
    .join(" ");

export type Klien = { nama: string; logo?: string; tinggi?: number };

// Logo ditampilkan diblur (lihat components/sections/Bukti.tsx). Nama hanya dipakai dalam bentuk tersamar.
export const klien: Klien[] = [
  { nama: "Waskita Karya", logo: "/images/klien/klien-1.png", tinggi: 64 },
  { nama: "Korindo", logo: "/images/klien/klien-2.webp", tinggi: 36 },
  { nama: "Sumitomo Electric", logo: "/images/klien/klien-3.svg", tinggi: 30 },
  { nama: "Sanggar Sarana Baja", logo: "/images/klien/klien-4.webp", tinggi: 30 },
  { nama: "Synkrona Enjiniring Nusantara", logo: "/images/klien/klien-5.webp", tinggi: 46 },
  { nama: "Elsewedy Electric", logo: "/images/klien/klien-6.webp", tinggi: 52 },
];

/** Studi kasus dari atrahdis.id. Label menunjukkan jenis sertifikat dan kualifikasi, bukan durasi. */
export const studiKasus = [
  {
    klien: "PT Waskita Karya",
    ringkas: "Perpanjangan SBU kualifikasi Besar dan KTA untuk proyek infrastruktur pemerintah.",
    label: "Perpanjangan SBU B + KTA",
  },
  {
    klien: "PT Korindo Group",
    ringkas: "Naik kualifikasi Kecil ke Menengah untuk tender BUMN. Audit awal menemukan gap KBLI yang diselesaikan sebelum pengajuan.",
    label: "Naik kualifikasi K ke M",
  },
  {
    klien: "PT Sumitomo Electric",
    ringkas: "SBU dan SKK Jenjang 7 untuk tender perluasan pabrik.",
    label: "SBU + SKK J7",
  },
];

export const testimoni = {
  // Kutipan klien dibiarkan verbatim (KEPUTUSAN-FINAL butir 4).
  kutipan:
    "Mas Nicky tidak hanya membawa solusi perizinan inovatif ke industri konstruksi, tetapi juga membantu klien menavigasi regulasi yang kompleks secara mulus dan efisien!",
  nama: "Dimas",
  jabatan: `Direktur, ${samarkan("PT Harapan Nusantara Djaya")}`,
  foto: "/images/dimas.webp",
};
