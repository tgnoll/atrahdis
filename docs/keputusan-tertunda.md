# Keputusan yang menunggu tim

Setiap butir punya satu tempat untuk diubah. Setelah diputuskan, ubah baris itu saja.

| # | Keputusan | Kondisi di preview | Ubah di |
|---|---|---|---|
| 1 | Harga tampil publik atau tidak | **Tampil** (angka dari atrahdis.id/biaya) | `content/layanan.ts` → `tampilHarga` |
| 2 | Izin memakai nama dan logo klien | **Tampil** | `content/klien.ts` → `tampilLogoKlien` |
| 3 | Angka "Selesai 28/15/18 hari" di studi kasus | **Tampil** | `content/klien.ts` → `tampilDurasi` |
| 4 | Ejaan founder: "Nicx" atau "Nicky" | Halaman memakai "Nicx"; kutipan Dimas menulis "Mas Nicky" | `content/site.ts` → `founder.name`, `content/klien.ts` → `testimoni.kutipan` |
| 5 | Estimasi waktu SBU baru (web lama: 3 hari kerja vs 4–8 minggu) | Tidak disebut angka; ditulis "di kontrak setelah audit" | `app/jasa-sbu/page.tsx` (FAQ) |
| 6 | Skema pembayaran (DP/pelunasan) | FAQ-nya belum ditampilkan | `app/jasa-sbu/page.tsx` (FAQ) |
| 7 | Biaya KTA & LSBU termasuk atau terpisah | Tidak disebut | `content/layanan.ts` → `paketSbu` |
| 8 | Harga SKK Jenjang 9 | "Hubungi kami" | `content/layanan.ts` → `hargaSkk` |
| 9 | Biaya perpanjangan SBU | "Ditulis setelah audit" | `app/perpanjangan-sbu/page.tsx` |
| 10 | Jumlah klien: "80+ lainnya" vs "118+ perusahaan" | Dua-duanya dipakai seperti di rancangan | `content/site.ts` → `stats` |
| 11 | Tahun berdiri: 2016 (mulai) / 2017 (PT) | Keduanya ditulis dengan keterangan | `app/tentang/page.tsx`, `app/page.tsx` |
| 12 | Email kantor | Tidak ditampilkan | `content/site.ts` → `email` |
| 13 | Peta: embed resmi dari profil Google Business | Sementara peta hasil pencarian nama + alamat | `content/site.ts` → `mapsEmbedUrl` |
| 14 | Studi kasus: set dari atrahdis.id atau sbu.atrahdis.id | Set dari rancangan canvas | `content/klien.ts` → `studiKasus` |

## Perlu dipastikan isinya oleh tim

- Deskripsi jenjang SKK dan syarat dokumen SKK (`app/jasa-skk/page.tsx`) ditulis dari aturan umum.
- Deskripsi dokumen pendukung tender (`app/layanan/page.tsx`) ditulis singkat dari daftar layanan.
- Isi tonggak perjalanan 2020 dan 2024–26 (`app/tentang/page.tsx`).
