/**
 * Kota untuk halaman /jasa-sbu/<kota> dan /jasa-skk/<kota>.
 * Daftar slug sama persis dengan atrahdis.id (gate/baseline_prod_urls.json), supaya URL lama tetap hidup.
 */
export type Kota = { slug: string; nama: string; provinsi: string };

export const daftarKota: Kota[] = [
  { slug: "balikpapan", nama: "Balikpapan", provinsi: "Kalimantan Timur" },
  { slug: "bandar-lampung", nama: "Bandar Lampung", provinsi: "Lampung" },
  { slug: "bandung", nama: "Bandung", provinsi: "Jawa Barat" },
  { slug: "banjarmasin", nama: "Banjarmasin", provinsi: "Kalimantan Selatan" },
  { slug: "batam", nama: "Batam", provinsi: "Kepulauan Riau" },
  { slug: "bekasi", nama: "Bekasi", provinsi: "Jawa Barat" },
  { slug: "bogor", nama: "Bogor", provinsi: "Jawa Barat" },
  { slug: "cirebon", nama: "Cirebon", provinsi: "Jawa Barat" },
  { slug: "denpasar", nama: "Denpasar", provinsi: "Bali" },
  { slug: "depok", nama: "Depok", provinsi: "Jawa Barat" },
  { slug: "jakarta", nama: "Jakarta", provinsi: "DKI Jakarta" },
  { slug: "makassar", nama: "Makassar", provinsi: "Sulawesi Selatan" },
  { slug: "malang", nama: "Malang", provinsi: "Jawa Timur" },
  { slug: "manado", nama: "Manado", provinsi: "Sulawesi Utara" },
  { slug: "medan", nama: "Medan", provinsi: "Sumatera Utara" },
  { slug: "padang", nama: "Padang", provinsi: "Sumatera Barat" },
  { slug: "palembang", nama: "Palembang", provinsi: "Sumatera Selatan" },
  { slug: "pekanbaru", nama: "Pekanbaru", provinsi: "Riau" },
  { slug: "pontianak", nama: "Pontianak", provinsi: "Kalimantan Barat" },
  { slug: "samarinda", nama: "Samarinda", provinsi: "Kalimantan Timur" },
  { slug: "semarang", nama: "Semarang", provinsi: "Jawa Tengah" },
  { slug: "surabaya", nama: "Surabaya", provinsi: "Jawa Timur" },
  { slug: "surakarta", nama: "Surakarta", provinsi: "Jawa Tengah" },
  { slug: "tangerang", nama: "Tangerang", provinsi: "Banten" },
  { slug: "yogyakarta", nama: "Yogyakarta", provinsi: "DI Yogyakarta" },
];

export const cariKota = (slug: string) => daftarKota.find((k) => k.slug === slug);
