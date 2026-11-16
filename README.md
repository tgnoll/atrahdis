# Atrahdis Web (redesign)

Situs baru PT Atrahdis Idea Nusantara: beranda, landing SEO Jasa SBU, Perpanjangan SBU, Jasa SKK,
Layanan, Tentang, Blog, Kontak. Dibangun dengan Next.js (App Router) + Tailwind CSS.

> **Status: PREVIEW.** Branch `redesign` hanya untuk ditinjau lewat link preview Vercel.
> Semua halaman diberi `noindex` sampai variabel `SITE_LIVE=1` dipasang (lihat "Saat mau live").

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # cek sebelum push
```

## Struktur

```
app/                 1 folder = 1 URL
  page.tsx           Beranda
  jasa-sbu/ perpanjangan-sbu/ jasa-skk/ layanan/ tentang/ kontak/
  blog/              daftar artikel + blog/[slug]
  layout.tsx         font, TopBar, Header, Footer, tombol WA, schema usaha
  robots.ts sitemap.ts
components/
  layout/            TopBar, Header, NavLinks, Footer, TombolWA
  sections/          bagian halaman yang dipakai ulang (hero, harga, FAQ, form, peta, ...)
  ui/                Tombol, JudulBagian, Icon, CheckList
  seo/               JsonLd (schema.org)
content/             SEMUA teks, angka, dan flag keputusan. Ubah di sini, bukan di komponen.
  site.ts            nama PT, alamat, WA, jam kerja, peta (satu sumber untuk seluruh situs)
  layanan.ts         layanan, harga, paket SBU, harga SKK  -> flag `tampilHarga`
  klien.ts           logo klien, studi kasus, testimoni    -> flag `tampilLogoKlien`, `tampilDurasi`
  blog.ts            daftar artikel
lib/                 tracking.ts (gclid/UTM), seo.ts
public/images/       hero, logo, foto, logo klien
arsip/               landing page tes Oktober 2026 (tidak ditayangkan)
docs/                keputusan-tertunda.md
```

## Aturan kerja

- **Konten dipisah dari tampilan.** Teks/angka yang muncul di lebih dari satu tempat ada di `content/`.
- **Alamat & nomor WA hanya di `content/site.ts`.** Footer, /kontak, peta, dan schema mengambil dari sana.
- **Warna lewat token** di `app/globals.css` (`bg-navy`, `text-oranye-teks`, ...), bukan kode hex di komponen.
- **Git:** `main` = yang tayang. Kerjakan di branch (`redesign`, `feat/...`), gabung lewat Pull Request.
  Awali commit dengan `feat:`, `content:`, `fix:`, atau `seo:`.

## Tahap pengerjaan

| Tahap | Isi | Status |
|---|---|---|
| 0 | Setup repo, token warna, font | selesai |
| 1 | Layout: header, footer, tombol WA | selesai |
| 2 | Komponen section yang dipakai ulang | selesai |
| 3 | /jasa-sbu | selesai |
| 4 | Beranda | selesai |
| 5 | /perpanjangan-sbu, /jasa-skk, /layanan, /tentang, /kontak | selesai |
| 6 | Blog: daftar artikel selesai. **Isi 26 artikel + gambar belum dipindahkan** | sebagian |
| 7 | Form ke Google Sheet, GTM/Meta Pixel, redirect URL lama, cek Lighthouse, launch | belum |

## Yang belum ada (jujur soal isi preview)

- **Form** membuka WhatsApp dengan pesan terisi (termasuk sumber iklan). Belum menyimpan ke Google Sheet "Leads Atrahdis".
- **GTM dan Meta Pixel belum dipasang**, jadi preview ini jangan dipakai sebagai tujuan iklan.
- **Artikel blog** baru judul; halaman artikel menaut ke artikel asli di atrahdis.id.
- **Gambar yang belum ada di repo:** logo Sanggar Sarana Baja, Synkrona, Elsewedy (tampil sebagai teks),
  foto Dimas (tampil inisial), foto Nicx resolusi tinggi, gambar sampul artikel.
- **Foto hero adalah gambar buatan AI**, bukan foto kantor. Ganti dengan foto asli bila sudah ada.
- **Checklist PDF** (SBU, SKK, perpanjangan) yang dijanjikan di form belum dibuat.
- Keputusan tim yang masih menggantung: lihat `docs/keputusan-tertunda.md`.

## Saat mau live di atrahdis.id

1. Selesaikan tahap 6–7 dan semua butir di `docs/keputusan-tertunda.md`.
2. Di Vercel, tambahkan Environment Variable `SITE_LIVE=1` (Production) supaya `noindex` lepas.
3. Pasang redirect 301 dari URL lama yang berubah.
4. Gabungkan ke `main` lewat Pull Request, lalu arahkan domain.
