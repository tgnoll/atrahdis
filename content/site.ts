/**
 * Data identitas usaha (NAP: Name, Address, Phone) — SATU-SATUNYA sumber.
 *
 * Header, footer, halaman /kontak, schema LocalBusiness, dan peta wajib
 * mengambil dari file ini. Jangan menulis ulang alamat atau nomor WA di
 * komponen. Nama dan alamat harus sama persis dengan profil Google Business
 * Atrahdis (penting untuk SEO lokal).
 */
export const site = {
  brand: "Atrahdis",
  legalName: "PT Atrahdis Idea Nusantara",
  nib: "9120006530734",
  url: "https://atrahdis.id",
  tagline: "Pengurusan SBU & SKK konstruksi sejak 2016",

  address: {
    building: "Beltway Office Park",
    street: "Jl. TB Simatupang Kav. 41",
    area: "Ragunan, Pasar Minggu",
    city: "Jakarta Selatan",
    postalCode: "12550",
    region: "DKI Jakarta",
    country: "ID",
  },

  whatsapp: {
    display: "0896-9921-7161",
    number: "6289699217161", // format wa.me, tanpa "+" dan tanpa "0" di depan
  },

  hours: {
    display: "Sen–Jum 08.00–17.00 WIB",
    panjang: "Senin–Jumat, 08.00–17.00 WIB",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },

  // TODO tim: email kantor belum ada di web lama. Kosong = tidak ditampilkan.
  email: "",

  /**
   * Peta. Sementara memakai pencarian nama + alamat.
   * TODO tim: ganti dengan URL embed dari profil Google Business Atrahdis.
   */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=PT+Atrahdis+Idea+Nusantara+Beltway+Office+Park+Jakarta&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=PT+Atrahdis+Idea+Nusantara+Beltway+Office+Park+Jakarta",

  founder: {
    // TODO tim: ejaan dipakai konsisten di seluruh situs ("Nicx" atau "Nicky").
    name: "Nicx",
    role: "Founder & Principal Consultant",
  },

  // Angka yang dikutip di beberapa halaman. Ubah di sini saja.
  stats: {
    sejak: "2016",
    sertifikat: "280+",
    perusahaan: "118+",
    klienLainnya: "118+", // dipakai di kalimat "dan 118+ perusahaan lainnya"; sama dengan jumlah perusahaan
  },

  sisterSite: { label: "VerityX: KITAS & IMTA", href: "https://verityx.id" },
} as const;

export const fullAddress = [
  site.address.building,
  site.address.street,
  site.address.area,
  `${site.address.city} ${site.address.postalCode}`,
].join(", ");

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Selama masih preview, seluruh situs diberi noindex. Set SITE_LIVE=1 saat pindah ke atrahdis.id. */
export const siteLive = process.env.SITE_LIVE === "1";
