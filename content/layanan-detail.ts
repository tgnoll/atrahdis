/**
 * Halaman detail /layanan/<slug>: parity URL dengan web Astro lama (atrahdis.id/layanan/...).
 * Slug ditulis persis seperti URL lama, termasuk huruf besar (SBU-K, SKK-J7, dst.).
 *
 * Isi dipindah dari web lama dengan aturan KEPUTUSAN-FINAL:
 * - tidak ada angka harga (biaya selalu "setelah audit"),
 * - estimasi waktu bertingkat (sama dengan FAQ beranda dan /jasa-sbu),
 * - tidak menjanjikan hasil di luar kewenangan Atrahdis.
 *
 * TODO tim: isi teknis (syarat, jumlah alat, masa berlaku) perlu dicek ulang oleh Mba Rika.
 */
import { paketSbu } from "@/content/layanan";

export type Kelompok =
  | "Sertifikasi utama"
  | "Pendukung SBU"
  | "Maintenance compliance"
  | "Tender dan compliance"
  | "PMA dan badan usaha asing";

export type Poin = { judul: string; isi: string; href?: string };

export type DetailLayanan = {
  slug: string;
  kelompok: Kelompok;
  /** Nama pendek untuk breadcrumb dan daftar. */
  nama: string;
  /** H1. */
  judul: string;
  metaJudul: string;
  metaDeskripsi: string;
  pengantar: string;
  /** Ringkasan layanan: [label, isi]. */
  gambaran?: [string, string][];
  /** Kartu poin (layanan dalam kelompok, hal penting, dsb.). */
  poin?: { judul: string; items: Poin[] };
  /** Langkah bernomor. */
  langkah?: { judul: string; items: { judul: string; isi: string }[] };
  siapkan?: string[];
  /** Titik gagal: [masalah, cara menutup]. */
  titikGagal?: [string, string][];
  faq?: { q: string; a: string }[];
  /** Slug detail layanan lain, atau href halaman utama (diawali "/"). */
  terkait?: string[];
};

const ESTIMASI_BERTINGKAT =
  "Bertingkat sesuai kondisi perusahaan. Tercepat 3 hari kerja untuk SBU Kecil jika berkas lengkap dan SKK sudah ada. Kualifikasi Kecil umumnya 2–4 minggu, sedangkan kualifikasi Besar atau PMA 4–8 minggu. Estimasi pasti ditulis di kontrak setelah audit.";

const FAQ_BIAYA = {
  q: "Berapa biayanya?",
  a: "Biaya bergantung pada subklasifikasi, kualifikasi, dan kelengkapan dokumen, jadi baru kami hitung setelah audit dokumen gratis. Kami tidak menjanjikan hasil di luar kewenangan kami.",
};

const SIAPKAN_DASAR = [
  "NIB dengan KBLI jasa konstruksi yang sesuai subklasifikasi",
  "Akta pendirian dan perubahan, serta SK Kemenkumham",
  "NPWP badan usaha dengan status KSWP valid",
  "SKK tenaga ahli untuk PJBU, PJTBU, dan PJSKBU",
];

export const detailLayanan: DetailLayanan[] = [
  // ───────────── Sertifikasi utama ─────────────
  {
    slug: "sertifikasi-utama",
    kelompok: "Sertifikasi utama",
    nama: "Sertifikasi Utama",
    judul: "Sertifikasi Utama: SBU, SKK, Serkom, dan KTA",
    metaJudul: "Sertifikasi Utama SBU, SKK, dan KTA Konstruksi | Atrahdis",
    metaDeskripsi:
      "Pengurusan SBU kualifikasi Kecil, Menengah, Besar, SKK tenaga ahli, dan KTA asosiasi. Dokumen diaudit gratis sebelum pengajuan.",
    pengantar:
      "SBU, SKK, Serkom, dan KTA untuk kualifikasi Kecil, Menengah, dan Besar. Dokumen Anda kami audit gratis sebelum pengajuan, supaya hambatan ketahuan di awal.",
    poin: {
      judul: "Layanan sertifikasi",
      items: [
        { judul: "SBU Kecil (K)", isi: paketSbu[0].untuk, href: "/layanan/SBU-K" },
        { judul: "SBU Menengah (M)", isi: paketSbu[1].untuk, href: "/layanan/SBU-M" },
        { judul: "SBU Besar (B)", isi: paketSbu[2].untuk, href: "/layanan/SBU-B" },
        { judul: "SKK Jenjang 5 dan 6", isi: "Sertifikat kompetensi kerja jenjang teknisi dan analis.", href: "/layanan/SKK-J5J6" },
        { judul: "SKK Jenjang 7", isi: "Sertifikat kompetensi kerja jenjang ahli muda.", href: "/layanan/SKK-J7" },
        { judul: "SKK Jenjang 8", isi: "Sertifikat kompetensi kerja jenjang ahli madya.", href: "/layanan/SKK-J8" },
        { judul: "Perpanjangan SBU", isi: "Sebaiknya diurus sebelum masa berlaku habis.", href: "/perpanjangan-sbu" },
      ],
    },
    faq: [
      { q: "Berapa lama SBU terbit?", a: ESTIMASI_BERTINGKAT },
      FAQ_BIAYA,
    ],
    terkait: ["proses-sbu", "pendukung-sbu", "tender-dan-sbu"],
  },
  {
    slug: "SBU-K",
    kelompok: "Sertifikasi utama",
    nama: "SBU Kecil (K)",
    judul: "SBU Kecil (K)",
    metaJudul: "Jasa SBU Kecil (K) Konstruksi | Atrahdis",
    metaDeskripsi:
      "Pengurusan SBU kualifikasi Kecil: audit berkas sebelum pembayaran, pengajuan ke LPJK, dan pemantauan sampai terbit. Estimasi biaya setelah konsultasi.",
    pengantar:
      "SBU kualifikasi Kecil untuk badan usaha yang baru masuk tender atau menggarap proyek bernilai kecil. Estimasi biaya per subklasifikasi kami berikan setelah konsultasi.",
    gambaran: [
      ["Untuk", paketSbu[0].untuk],
      ["Estimasi waktu", "Tercepat 3 hari kerja jika berkas lengkap dan SKK sudah ada, umumnya 2–4 minggu"],
      ["Laporan keuangan", "Laporan keuangan sederhana sudah cukup"],
      ["Termasuk", paketSbu[0].termasuk.join(", ")],
    ],
    siapkan: SIAPKAN_DASAR,
    faq: [{ q: "Berapa lama SBU Kecil terbit?", a: ESTIMASI_BERTINGKAT }, FAQ_BIAYA],
    terkait: ["SBU-M", "SBU-B", "proses-sbu", "/jasa-sbu"],
  },
  {
    slug: "SBU-M",
    kelompok: "Sertifikasi utama",
    nama: "SBU Menengah (M)",
    judul: "SBU Menengah (M)",
    metaJudul: "Jasa SBU Menengah (M) Konstruksi | Atrahdis",
    metaDeskripsi:
      "Pengurusan SBU kualifikasi Menengah: cek syarat keuangan dan tenaga ahli, pengajuan ke LPJK, dan pemantauan sampai terbit. Estimasi biaya setelah konsultasi.",
    pengantar:
      "SBU kualifikasi Menengah untuk proyek bernilai lebih besar. Syarat keuangan, tenaga ahli, dan pengalaman proyek kami cek dulu sebelum pengajuan. Estimasi biaya per subklasifikasi diberikan setelah konsultasi.",
    gambaran: [
      ["Untuk", paketSbu[1].untuk],
      ["Estimasi waktu", "Bertingkat sesuai kondisi berkas, ditulis di kontrak setelah audit"],
      ["Laporan keuangan", "Wajib laporan keuangan yang diaudit Kantor Akuntan Publik (KAP)"],
      ["Termasuk", paketSbu[1].termasuk.join(", ")],
    ],
    siapkan: [
      ...SIAPKAN_DASAR,
      "Laporan keuangan audit KAP",
      "Kontrak, BAST, dan faktur pajak pengalaman proyek",
    ],
    faq: [{ q: "Berapa lama SBU Menengah terbit?", a: ESTIMASI_BERTINGKAT }, FAQ_BIAYA],
    terkait: ["SBU-K", "SBU-B", "pendukung-sbu", "/jasa-sbu"],
  },
  {
    slug: "SBU-B",
    kelompok: "Sertifikasi utama",
    nama: "SBU Besar (B)",
    judul: "SBU Besar (B)",
    metaJudul: "Jasa SBU Besar (B) Konstruksi | Atrahdis",
    metaDeskripsi:
      "Pengurusan SBU kualifikasi Besar: pemetaan syarat sebelum pengajuan, pengajuan ke LPJK, dan pemantauan sampai terbit. Estimasi biaya setelah konsultasi.",
    pengantar:
      "SBU kualifikasi Besar untuk proyek bernilai tinggi. Syarat modal, tenaga ahli, peralatan, dan referensi proyek kami petakan dulu sebelum berkas diajukan. Estimasi biaya diberikan setelah konsultasi.",
    gambaran: [
      ["Untuk", paketSbu[2].untuk],
      ["Estimasi waktu", "Umumnya 4–8 minggu, estimasi pasti ditulis di kontrak setelah audit"],
      ["Laporan keuangan", "Wajib laporan keuangan yang diaudit Kantor Akuntan Publik (KAP)"],
      ["Termasuk", paketSbu[2].termasuk.join(", ")],
    ],
    siapkan: [
      ...SIAPKAN_DASAR,
      "Laporan keuangan audit KAP",
      "Kontrak, BAST, dan faktur pajak pengalaman proyek",
      "Bukti kepemilikan atau sewa jangka panjang peralatan",
    ],
    faq: [{ q: "Berapa lama SBU Besar terbit?", a: ESTIMASI_BERTINGKAT }, FAQ_BIAYA],
    terkait: ["SBU-M", "pengalaman-proyek", "peralatan-konstruksi", "/jasa-sbu"],
  },
  {
    slug: "proses-sbu",
    kelompok: "Sertifikasi utama",
    nama: "Proses Pengurusan SBU",
    judul: "Proses Pengurusan SBU",
    metaJudul: "Proses Pengurusan SBU dari Audit sampai Terbit | Atrahdis",
    metaDeskripsi:
      "Alur pengurusan SBU dari audit dokumen sampai sertifikat terbit, estimasi waktu per kualifikasi, dan dokumen yang perlu disiapkan supaya tidak dikoreksi LPJK.",
    pengantar:
      "Alur, estimasi waktu, dan checklist dokumen untuk tiap kualifikasi SBU, dari persiapan berkas sampai sertifikat terbit.",
    langkah: {
      judul: "5 langkah pengurusan SBU",
      items: [
        { judul: "Audit dokumen", isi: "NIB, KBLI, SKK, akta, NPWP, dan KSWP diperiksa. Hambatan dicari sebelum pengajuan." },
        { judul: "Perbaikan dan sinkronisasi", isi: "Data yang tidak sinkron di OSS diperbaiki, KBLI diperbarui, dan SKK dipastikan aktif." },
        { judul: "Pengajuan ke LPJK", isi: "Berkas diajukan online. Verifikasinya otomatis dan manual." },
        { judul: "Verifikasi dan koreksi", isi: "Kalau ada koreksi, berkas diperbaiki lalu diajukan ulang. Bisa terjadi lebih dari sekali." },
        { judul: "Sertifikat terbit", isi: "SBU aktif, tercatat di LPJK, dan siap dipakai untuk tender dan kontrak." },
      ],
    },
    gambaran: [
      ["SBU Kecil (K)", "Tercepat 3 hari kerja jika berkas lengkap, umumnya 2–4 minggu. Dokumen utama: NIB, KBLI, SKK aktif."],
      ["SBU Menengah (M)", "Bertingkat sesuai kondisi berkas. Ditambah laporan keuangan KAP dan pengalaman proyek."],
      ["SBU Besar (B)", "Umumnya 4–8 minggu. Ditambah tenaga ahli lengkap, peralatan, dan referensi proyek."],
    ],
    faq: [{ q: "Berapa lama SBU terbit?", a: ESTIMASI_BERTINGKAT }, FAQ_BIAYA],
    terkait: ["sertifikasi-utama", "pendukung-sbu", "/jasa-sbu"],
  },

  // ───────────── Pendukung SBU ─────────────
  {
    slug: "pendukung-sbu",
    kelompok: "Pendukung SBU",
    nama: "Pendukung Pemenuhan SBU",
    judul: "Pendukung Pemenuhan SBU",
    metaJudul: "Pendukung SBU: KTA, Laporan KAP, ISO 37001, Peralatan | Atrahdis",
    metaDeskripsi:
      "Lima syarat pendukung yang sering menghambat SBU: KTA asosiasi, laporan keuangan KAP, ISO 37001, peralatan, dan dokumen pengalaman proyek.",
    pengantar:
      "Pengajuan SBU tidak cukup dengan NIB dan SKK. Lima syarat pendukung ini paling sering jadi penghambat. Kebutuhan Anda kami audit dulu sebelum ada biaya.",
    poin: {
      judul: "5 layanan pendukung SBU",
      items: [
        { judul: "KTA asosiasi", isi: "Pendaftaran, pembaruan iuran, dan perubahan pengurus. Sekitar 3–10 hari kerja.", href: "/layanan/kta-asosiasi" },
        { judul: "Laporan keuangan KAP", isi: "Wajib untuk SBU Menengah dan Besar. Sekitar 3–6 minggu.", href: "/layanan/keu-audit-kap" },
        { judul: "ISO 37001 (SMAP)", isi: "Gap analysis, dokumentasi sistem, dan pendampingan audit. Sekitar 2–6 bulan.", href: "/layanan/iso-37001" },
        { judul: "Peralatan teknis", isi: "Bukti kepemilikan atau sewa alat sesuai subklasifikasi. Sekitar 1–2 minggu.", href: "/layanan/peralatan-konstruksi" },
        { judul: "Pengalaman proyek", isi: "Review kontrak, nilai, lingkup, dan BAST. Sekitar 2–4 minggu.", href: "/layanan/pengalaman-proyek" },
      ],
    },
    faq: [
      {
        q: "Apakah KTA masih wajib untuk SBU?",
        a: "Bergantung pada jalur pengajuan. Kami cek dulu apakah jalur Anda memang mensyaratkan KTA, supaya Anda tidak membayar layanan yang tidak diperlukan.",
      },
      {
        q: "Kapan laporan keuangan KAP diwajibkan?",
        a: "Untuk SBU Menengah dan Besar. SBU Kecil cukup laporan keuangan sederhana. Audit KAP umumnya 3–6 minggu, jadi sebaiknya dimulai jauh sebelum tenggat.",
      },
      FAQ_BIAYA,
    ],
    terkait: ["sertifikasi-utama", "maintenance-compliance", "tender-dan-sbu"],
  },
  {
    slug: "pengalaman-proyek",
    kelompok: "Pendukung SBU",
    nama: "Pengalaman Proyek",
    judul: "Pengalaman Proyek (Kontrak Referensi)",
    metaJudul: "Dokumen Pengalaman Proyek untuk SBU | Atrahdis",
    metaDeskripsi:
      "Review kontrak referensi untuk SBU Menengah, Besar, PMA, dan BUJKA: kesesuaian subklasifikasi, nilai kontrak, BAST, dan faktur pajak.",
    pengantar:
      "Yang dinilai bukan jumlah proyek, tapi kesesuaian subklasifikasi dan nilai kontraknya. Kontrak referensi Anda kami review sebelum diajukan.",
    gambaran: [
      ["Dipakai untuk", "Pengajuan dan naik kualifikasi"],
      ["Kualifikasi", "Menengah, Besar, PMA, BUJKA"],
      ["Dokumen inti", "Kontrak atau SPK, BAST, faktur pajak"],
      ["Masa berlaku SKU", "36 bulan"],
    ],
    siapkan: [
      "Daftar proyek: nama, tahun, nilai, subklasifikasi, dan peran",
      "Kontrak atau SPK asli, atau salinan yang dilegalisasi",
      "Berita acara serah terima (BAST)",
      "Bukti pembayaran atau faktur pajak",
      "Referensi pemberi kerja (opsional, memperkuat berkas)",
    ],
    titikGagal: [
      ["Kontrak tanpa BAST", "Lengkapi BAST"],
      ["Nilai kontrak di bawah ambang", "Tambahkan proyek lain yang relevan"],
      ["Subklasifikasi tidak sesuai", "Jangan mengandalkan proyek dari subklasifikasi lain"],
      ["Proyek atas nama pribadi", "Proyek harus atas nama badan usaha"],
    ],
    faq: [
      {
        q: "Kami punya banyak proyek, kenapa masih kurang?",
        a: "Yang diperiksa adalah kelengkapan dokumen (kontrak, BAST, faktur pajak) dan kesesuaian subklasifikasi, bukan jumlah proyek.",
      },
      { q: "Proyek lama bisa dipakai?", a: "Bisa, selama dokumennya lengkap dan atas nama badan usaha." },
      { q: "Proyek swasta dihitung?", a: "Yang dinilai kontrak dan BAST-nya, bukan jenis pemilik proyek." },
      FAQ_BIAYA,
    ],
    terkait: ["peralatan-konstruksi", "SBU-M", "SBU-B", "pendukung-sbu"],
  },
  {
    slug: "peralatan-konstruksi",
    kelompok: "Pendukung SBU",
    nama: "Peralatan dan Berkas SIMPK",
    judul: "Peralatan dan Berkas SIMPK",
    metaJudul: "Peralatan Konstruksi dan Berkas SIMPK untuk SBU | Atrahdis",
    metaDeskripsi:
      "Bukti kepemilikan atau sewa alat yang diterima sistem, jumlah unit per kualifikasi, dan titik gagal yang sering membuat peralatan ditolak.",
    pengantar:
      "Bukti kepemilikan alat yang diterima sistem, dengan jumlah unit berbeda untuk tiap kualifikasi. Kecukupan alat kami petakan sebelum berkas masuk.",
    gambaran: [
      ["Jumlah unit", "Kecil 1, Menengah 2, Spesialis 2, Besar 3, BUJKA 5"],
      ["Bukti", "Faktur atau kwitansi, atau perjanjian sewa jangka panjang"],
      ["Aturan khusus", "Alat yang merangkap, peralatan tambahan 2025, gerinda dan bor hanya untuk kualifikasi Kecil"],
      ["Masa berlaku SKU", "36 bulan"],
    ],
    siapkan: [
      "Daftar alat: nama, merek atau tipe, tahun, dan jumlah unit",
      "Bukti kepemilikan atau perjanjian sewa jangka panjang",
      "Foto fisik unit dan lokasi penyimpanannya",
      "NIB, KBLI, dan subklasifikasi yang dituju",
      "Surat pernyataan untuk alat yang merangkap",
    ],
    titikGagal: [
      ["Jumlah unit kurang dari syarat kualifikasi", "Hitung sebelum pengajuan"],
      ["Bukti sewa tanpa jangka waktu", "Buat perjanjian sewa tertulis"],
      ["Alat dipakai pengajuan perusahaan lain", "Cek statusnya dan buat pernyataan"],
      ["Kondisi alat tidak sesuai saat asesmen", "Ajukan bukti yang sesuai kondisi sebenarnya"],
    ],
    faq: [
      { q: "Alat saya sewa, boleh?", a: "Boleh, asalkan dengan perjanjian sewa jangka panjang yang jelas, bukan sewa harian." },
      {
        q: "Kenapa alat saya ditolak padahal ada?",
        a: "Yang dinilai bukti kepemilikan dan kesesuaiannya dengan subklasifikasi, bukan sekadar keberadaan alat.",
      },
      FAQ_BIAYA,
    ],
    terkait: ["pengalaman-proyek", "SBU-B", "pendukung-sbu"],
  },
  {
    slug: "iso-37001",
    kelompok: "Pendukung SBU",
    nama: "ISO 37001 (SMAP)",
    judul: "ISO 37001 (SMAP)",
    metaJudul: "Pendampingan ISO 37001 SMAP untuk Kontraktor | Atrahdis",
    metaDeskripsi:
      "Pendampingan sistem manajemen anti penyuapan ISO 37001 untuk syarat tender dan rekanan BUMN: gap assessment, penyusunan sistem, dan pendampingan audit.",
    pengantar:
      "Sistem manajemen anti penyuapan untuk memenuhi syarat tender dan rekanan BUMN. Yang diaudit adalah sistem dan buktinya, bukan hanya dokumen.",
    gambaran: [
      ["Opsi", "Pemenuhan sistem, sertifikasi IAF, atau sertifikasi KAN"],
      ["Masa berlaku", "3 tahun"],
      ["Biasanya diminta untuk", "Syarat tender, rekanan BUMN, dan SBU tertentu"],
      ["Pendampingan", "Gap assessment, penyusunan sistem, dan pendampingan audit"],
    ],
    siapkan: [
      "Struktur organisasi dan job desk fungsi kepatuhan",
      "Kebijakan anti penyuapan yang ditandatangani manajemen",
      "Prosedur due diligence mitra, gift dan hospitality, serta whistleblowing",
      "Bukti sosialisasi atau pelatihan",
      "Catatan risiko penyuapan per aktivitas",
      "Bukti audit internal dan tinjauan manajemen",
    ],
    titikGagal: [
      ["Membeli sertifikat tanpa sistem", "Lakukan pemenuhan dulu, baru audit"],
      ["Salah memilih IAF atau KAN", "Baca dokumen tender terlebih dahulu"],
      ["Dokumen ada, bukti implementasi tidak ada", "Siapkan bukti audit internal"],
      ["Menganggap ISO 37001 wajib untuk semua SBU", "Cek per subklasifikasi dan paket"],
    ],
    faq: [
      {
        q: "Apa bedanya IAF dan KAN?",
        a: "IAF adalah akreditasi internasional dan umumnya lebih cepat. KAN adalah akreditasi nasional. Pilih sesuai syarat paket tender Anda.",
      },
      { q: "Apakah cukup membeli sertifikat saja?", a: "Tidak. Yang diaudit adalah sistem dan buktinya, bukan hanya dokumen." },
      {
        q: "Berapa lama sampai sertifikat terbit?",
        a: "Umumnya 2–6 bulan, bergantung pada kesiapan perusahaan dan jadwal badan sertifikasi. Kami bantu menyiapkan dokumen supaya audit tidak perlu diulang.",
      },
      FAQ_BIAYA,
    ],
    terkait: ["pendukung-sbu", "ims-iso", "smk3"],
  },

  // ───────────── Tender dan compliance ─────────────
  {
    slug: "tender-dan-sbu",
    kelompok: "Tender dan compliance",
    nama: "Tender dan SBU",
    judul: "Tender dan SBU",
    metaJudul: "Syarat SBU untuk Tender Konstruksi | Atrahdis",
    metaDeskripsi:
      "Syarat SBU untuk tender konstruksi: SBU harus aktif, subklasifikasi harus cocok, dan kualifikasi harus sesuai nilai paket.",
    pengantar:
      "Syarat tender konstruksi, risiko SBU yang tidak valid, dan cara memastikan SBU Anda siap sebelum paket berikutnya dibuka.",
    poin: {
      judul: "Yang harus Anda ketahui",
      items: [
        { judul: "SBU wajib aktif", isi: "LPSE memverifikasi SBU secara otomatis. Peserta dengan SBU tidak aktif gugur di tahap kualifikasi." },
        { judul: "Subklasifikasi harus cocok", isi: "SBU yang dimiliki harus sesuai dengan lingkup pekerjaan paket tender." },
        { judul: "Risiko daftar hitam", isi: "Memakai SBU yang tidak valid bisa berujung sanksi daftar hitam." },
      ],
    },
    gambaran: [
      ["Kualifikasi Kecil", `${paketSbu[0].untuk}, minimal SBU Kecil aktif`],
      ["Kualifikasi Menengah", `${paketSbu[1].untuk}, minimal SBU Menengah aktif`],
      ["Kualifikasi Besar", `${paketSbu[2].untuk}, minimal SBU Besar aktif`],
    ],
    faq: [
      {
        q: "Kalau SBU belum ada, bisa langsung ikut tender?",
        a: "Tidak. SBU aktif adalah syarat kualifikasi. Urutannya: audit dokumen, rapikan SBU, lalu masuk ke paket tender.",
      },
      FAQ_BIAYA,
    ],
    terkait: ["tender-desk", "dok-tender", "/perpanjangan-sbu"],
  },
  {
    slug: "tender-desk",
    kelompok: "Tender dan compliance",
    nama: "Tender Desk",
    judul: "Tender Desk: Audit Dokumen dan Pendampingan Tender",
    metaJudul: "Tender Desk: Audit Dokumen dan Pendampingan Tender | Atrahdis",
    metaDeskripsi:
      "Audit 12 dokumen wajib tender sebelum penawaran dikirim, pendampingan satu paket tender, atau pendampingan rutin. Harga dan strategi penawaran tetap keputusan Anda.",
    pengantar:
      "Tender bisa gugur karena berkas, bukan karena harga. Kami audit 12 dokumen wajib sebelum penawaran Anda dikirim, lalu bisa mendampingi penyusunan berkas untuk satu paket. Harga dan strategi penawaran tetap keputusan Anda.",
    poin: {
      judul: "Tiga cara kami membantu",
      items: [
        { judul: "Audit dokumen tender", isi: "12 dokumen wajib diperiksa, hasilnya daftar kekurangan per dokumen." },
        { judul: "Pendampingan satu paket", isi: "Penyusunan dokumen penawaran administratif, pengiriman, dan pendampingan klarifikasi." },
        { judul: "Pendampingan rutin", isi: "Untuk klien berulang: beberapa paket per bulan, termasuk pemantauan jadwal tender." },
      ],
    },
    gambaran: [
      ["NIB dan KBLI", "Legalitas usaha (OSS)"],
      ["SBU aktif", "Kualifikasi dan subklasifikasi sesuai paket (LPJK)"],
      ["SKK PJT dan PJSK", "Tenaga ahli aktif dan tidak tumpang tindih"],
      ["KSWP", "Status wajib pajak valid (DJP)"],
      ["Laporan keuangan atau audit KAP", "Sesuai kualifikasi"],
      ["Pengalaman proyek", "Kontrak, BAST, dan faktur pajak"],
      ["Dokumen lain", "KTA asosiasi, BPJS, PKKPR, PBG atau SLF, Bank Garansi, dan surat pernyataan, sesuai syarat paket"],
    ],
    faq: [
      {
        q: "Apakah Atrahdis menjamin tender menang?",
        a: "Tidak. Kami memastikan kelengkapan dan kepatuhan dokumen, bukan hasil penilaian panitia.",
      },
      {
        q: "Apa bedanya audit dan pendampingan?",
        a: "Audit memeriksa dokumen mana yang ada, kedaluwarsa, atau belum ada. Pendampingan mencakup penyusunan, pengiriman, dan klarifikasi untuk satu paket.",
      },
      {
        q: "Kalau SBU belum ada, bisa langsung tender?",
        a: "Tidak. SBU aktif adalah syarat kualifikasi. Urutannya: audit dokumen, rapikan SBU, lalu masuk ke paket tender.",
      },
      FAQ_BIAYA,
    ],
    terkait: ["tender-dan-sbu", "dok-tender", "pendukung-sbu"],
  },

  // ───────── Sertifikasi utama: SKK dan kelistrikan ─────────
  {
    slug: "skk",
    kelompok: "Sertifikasi utama",
    nama: "SKK Konstruksi",
    judul: "SKK Konstruksi Jenjang 5–9",
    metaJudul: "Jasa SKK Konstruksi Jenjang 5–9 untuk SBU | Atrahdis",
    metaDeskripsi:
      "Pengurusan SKK tenaga ahli konstruksi jenjang 5 sampai 9: pemilihan jenjang sesuai kualifikasi SBU, syarat dokumen, dan estimasi waktu.",
    pengantar:
      "SKK wajib dimiliki tenaga ahli sebelum didaftarkan dalam pengajuan SBU. Jenjangnya harus cocok dengan kualifikasi SBU yang dituju, jadi kami tentukan lewat audit, bukan ditebak.",
    poin: {
      judul: "Jenjang SKK dan kecocokannya dengan SBU",
      items: [
        { judul: "Jenjang 5 dan 6", isi: "Untuk SBU Kecil dan sebagian subklasifikasi Menengah.", href: "/layanan/SKK-J5J6" },
        { judul: "Jenjang 7", isi: "Untuk SBU Menengah dan sebagian Besar.", href: "/layanan/SKK-J7" },
        { judul: "Jenjang 8", isi: "Untuk SBU Besar.", href: "/layanan/SKK-J8" },
        { judul: "Jenjang 9", isi: "Tenaga ahli utama untuk subklasifikasi SBU Besar tertentu dan BUJKA." },
      ],
    },
    gambaran: [
      ["Dokumen lengkap dan valid", "Sekitar 7–14 hari kerja"],
      ["Dokumen perlu diperbaiki", "Tambahan 7–14 hari kerja"],
      ["Jenjang tidak sesuai kualifikasi", "Perlu audit ulang dan penentuan jenjang"],
    ],
    siapkan: [
      "Ijazah sesuai bidang",
      "Sertifikat pelatihan, bila ada",
      "Bukti pengalaman proyek",
      "KTP dan NPWP tenaga ahli",
    ],
    titikGagal: [
      ["Subklasifikasi SKK beda dengan SBU", "Samakan subklasifikasi sebelum mendaftar"],
      ["SKK kedaluwarsa saat SBU diajukan", "Perpanjang jika masa berlaku tinggal kurang dari 3 bulan"],
      ["Jenjang terlalu rendah", "Tentukan jenjang dari kualifikasi SBU yang dituju"],
      ["Dokumen pendukung tidak lengkap", "Lengkapi ijazah dan bukti pengalaman di awal"],
    ],
    faq: [
      { q: "Apa itu SKK konstruksi?", a: "Sertifikat wajib bagi tenaga ahli yang didaftarkan dalam pengajuan SBU. Tanpa SKK aktif, pengajuan SBU tertolak." },
      {
        q: "Berapa SKK yang dibutuhkan untuk SBU?",
        a: "Bergantung pada kualifikasi dan jumlah subklasifikasi. Sebagai gambaran, SBU Kecil minimal 1 SKK, Menengah sekitar 2–3 SKK jenjang 7, dan Besar sekitar 3–5 SKK.",
      },
      { q: "SKK yang sudah kedaluwarsa bisa diperpanjang?", a: "Bisa. Sebaiknya sebelum masa berlaku habis. Kalau sudah lewat, prosesnya sama dengan pengajuan baru." },
      FAQ_BIAYA,
    ],
    terkait: ["SKK-J5J6", "SKK-J7", "SKK-J8", "/jasa-skk"],
  },
  ...(
    [
      ["SKK-J5J6", "SKK Jenjang 5 dan 6", "J5/J6", "Kecil, dan sebagian subklasifikasi Menengah", "Tenaga ahli tingkat teknisi dan analis.", "SBU-K"],
      ["SKK-J7", "SKK Jenjang 7", "J7", "Menengah, dan sebagian subklasifikasi Besar", "Tenaga ahli tingkat ahli muda.", "SBU-M"],
      ["SKK-J8", "SKK Jenjang 8", "J8", "Besar", "Tenaga ahli tingkat ahli madya.", "SBU-B"],
    ] as const
  ).map(
    ([slug, nama, kode, untuk, tingkat, sbu]): DetailLayanan => ({
      slug,
      kelompok: "Sertifikasi utama",
      nama,
      judul: `SKK ${kode}`,
      metaJudul: `Jasa ${nama} Konstruksi | Atrahdis`,
      metaDeskripsi: `Pengurusan ${nama} untuk tenaga ahli SBU ${untuk.split(",")[0]}. Biaya bergantung pada jenjang dan subklasifikasi, dihitung setelah konsultasi.`,
      pengantar: `${tingkat} Biasanya dipakai untuk SBU ${untuk}. Biaya bergantung pada jenjang dan subklasifikasi, rinciannya kami berikan lewat konsultasi.`,
      gambaran: [
        ["Cocok untuk", `SBU ${untuk}`],
        ["Estimasi waktu", "Sekitar 7–14 hari kerja jika dokumen lengkap"],
        ["Syarat utama", "Kombinasi pendidikan dan pengalaman sesuai jenjang"],
        ["Subklasifikasi", "Harus sama dengan subklasifikasi SBU"],
      ],
      siapkan: ["Ijazah sesuai bidang", "Bukti pengalaman proyek", "Sertifikat pelatihan, bila ada", "KTP dan NPWP tenaga ahli"],
      faq: [
        { q: "Bagaimana memastikan jenjang ini yang tepat?", a: "Jenjang ditentukan dari kualifikasi dan subklasifikasi SBU yang dituju. Kami petakan saat audit supaya tidak terlalu rendah (SBU ditolak) atau terlalu tinggi (biaya tidak efisien)." },
        FAQ_BIAYA,
      ],
      terkait: ["skk", sbu, "/jasa-skk"],
    }),
  ),
  {
    slug: "skttk",
    kelompok: "Sertifikasi utama",
    nama: "SKTTK Ketenagalistrikan",
    judul: "SKTTK: Sertifikat Tenaga Teknik Ketenagalistrikan",
    metaJudul: "Jasa SKTTK Tenaga Teknik Ketenagalistrikan | Atrahdis",
    metaDeskripsi:
      "Pengurusan SKTTK untuk PJT dan Tenaga Teknik ketenagalistrikan, syarat SBUJPTL. Pemetaan personil, asesmen di LSP terakreditasi DJK ESDM.",
    pengantar:
      "SKTTK adalah sertifikat milik personil, bukan perusahaan. Peran dan jumlah personil kami petakan lebih dulu, supaya asesmen tidak diulang dan pengajuan SBUJPTL tidak menunggu.",
    gambaran: [
      ["Masa berlaku", "3 tahun"],
      ["Penerbit", "LSP terakreditasi DJK ESDM"],
      ["Peran", "PJT (penanggung jawab teknik) atau Tenaga Teknik"],
      ["Kebutuhan", "2–5 orang per badan usaha, tergantung bidang"],
      ["Kedudukan", "Milik personil, ikut orangnya bila pindah"],
    ],
    langkah: {
      judul: "Alur pengurusan",
      items: [
        { judul: "Petakan kebutuhan", isi: "Jumlah personil dan jenjang dihitung per bidang." },
        { judul: "Cek ijazah dan pengalaman", isi: "Kesesuaian latar belakang personil diperiksa." },
        { judul: "Daftar asesmen", isi: "Personil didaftarkan ke LSP." },
        { judul: "Asesmen dan terbit", isi: "LSP menguji kompetensi lalu menerbitkan SKTTK." },
      ],
    },
    siapkan: [
      "KTP, NPWP, dan pas foto",
      "Ijazah teknik (elektro, mesin, atau sipil) sesuai penugasan",
      "CV dan pengalaman kerja di bidang kelistrikan",
      "Surat penugasan dari perusahaan",
      "Bukti pelatihan atau portofolio, bila diminta LSP",
    ],
    titikGagal: [
      ["Ijazah tidak sesuai bidang", "Petakan kesesuaian sebelum mendaftar"],
      ["Personil sudah dipakai perusahaan lain", "Cek penugasan ganda sebelum asesmen"],
      ["Jumlah personil kurang", "Hitung dari awal, jangan menambah di tengah proses"],
      ["SKTTK kedaluwarsa saat SBUJPTL diajukan", "Catat tanggal berakhir dan perpanjang lebih awal"],
    ],
    faq: [
      { q: "Bisa pakai SKK konstruksi saja?", a: "Tidak. SKK untuk konstruksi di bawah LPJK, sedangkan SKTTK untuk ketenagalistrikan di bawah DJK ESDM." },
      { q: "Bisa pinjam personil dari perusahaan lain?", a: "Harus tertulis dan tidak boleh tumpang tindih dengan penugasan di perusahaan lain." },
      FAQ_BIAYA,
    ],
    terkait: ["sbujptl", "skk"],
  },
  {
    slug: "sbujptl",
    kelompok: "Sertifikasi utama",
    nama: "SBUJPTL Ketenagalistrikan",
    judul: "SBUJPTL: SBU Jasa Penunjang Tenaga Listrik",
    metaJudul: "Jasa SBUJPTL Ketenagalistrikan DJK ESDM | Atrahdis",
    metaDeskripsi:
      "Pengurusan SBUJPTL untuk pekerjaan instalasi tenaga listrik dari Ditjen Ketenagalistrikan ESDM. Personil SKTTK disiapkan lebih dulu.",
    pengantar:
      "SBUJPTL tidak bisa diajukan tanpa SKTTK, dan urutannya tidak boleh dibalik. Personil bersertifikat kami siapkan lebih dulu supaya pengajuan badan usaha tidak terhenti.",
    gambaran: [
      ["Penerbit", "Ditjen Ketenagalistrikan, Kementerian ESDM"],
      ["Estimasi waktu", "Sekitar 20–30 hari kerja"],
      ["Masa berlaku", "5 tahun"],
      ["Kualifikasi", "Besar, atau Menengah sesuai neraca audit KAP"],
      ["Personil", "PJT dan Tenaga Teknik ber-SKTTK, 2–5 orang tergantung bidang"],
    ],
    siapkan: [
      "Akta, SK Kemenkumham, dan NIB dengan KBLI ketenagalistrikan",
      "NPWP dengan status KSWP valid",
      "Laporan keuangan audit KAP",
      "SKTTK untuk PJT dan Tenaga Teknik",
      "Daftar peralatan dan bukti kepemilikannya",
      "Struktur organisasi dengan fungsi teknik",
    ],
    titikGagal: [
      ["SKTTK kurang atau jenjangnya tidak sesuai", "Hitung kebutuhan personil sejak awal"],
      ["KBLI ketenagalistrikan tidak aktif di NIB", "Perbaiki NIB lebih dulu"],
      ["Kualifikasi tidak sesuai neraca", "Lakukan audit KAP, jangan menebak"],
      ["Menyamakan SBUJPTL dengan SBU LPJK", "Pisahkan rezim ESDM dan PU"],
    ],
    faq: [
      { q: "SBU konstruksi LPJK bisa dipakai untuk pekerjaan listrik?", a: "Tidak. Instalasi tenaga listrik berada di rezim ESDM dan butuh sertifikat badan usaha sendiri." },
      { q: "SKTTK bisa menyusul setelah pengajuan?", a: "Tidak. SKTTK adalah prasyarat, jadi berkas baru bisa diajukan setelah personil memenuhi syarat." },
      FAQ_BIAYA,
    ],
    terkait: ["skttk", "keu-audit-kap"],
  },

  // ───────── Pendukung SBU ─────────
  {
    slug: "kta-asosiasi",
    kelompok: "Pendukung SBU",
    nama: "KTA Asosiasi",
    judul: "KTA Asosiasi Konstruksi",
    metaJudul: "Pengurusan KTA Asosiasi Konstruksi untuk SBU | Atrahdis",
    metaDeskripsi:
      "Pengurusan KTA asosiasi konstruksi baru dan perpanjangan, tenor 1 atau 3 tahun, dipetakan sesuai subklasifikasi SBU.",
    pengantar:
      "Keanggotaan asosiasi yang diterima sistem LPJK. Berkasnya kecil, tapi sering menahan seluruh pengajuan SBU.",
    gambaran: [
      ["Dipakai untuk", "Pengajuan baru dan perpanjangan"],
      ["Tenor", "1 tahun atau 3 tahun"],
      ["Kesesuaian", "Asosiasi harus cocok dengan subklasifikasi"],
    ],
    siapkan: [
      "Akta pendirian dan SK Kemenkumham",
      "NIB dengan KBLI jasa konstruksi",
      "NPWP badan usaha",
      "Daftar subklasifikasi yang dimohonkan",
      "SKK PJT dan PJSK sebagai lampiran",
    ],
    titikGagal: [
      ["Asosiasi tidak cocok dengan subklasifikasi", "Petakan subklasifikasi sebelum mendaftar"],
      ["KTA habis tanpa diingat", "Pasang pengingat 90 hari sebelum jatuh tempo"],
      ["Nama atau alamat beda dengan akta", "Samakan data perusahaan lebih dulu"],
      ["Kelistrikan memakai KTA konstruksi", "Subklasifikasi kelistrikan punya jalur sendiri"],
    ],
    faq: [
      { q: "Kenapa KTA penting kalau SBU sudah ada?", a: "KTA syarat administratif di pengajuan SBU. Tanpa KTA aktif, perpanjangan bisa tertahan." },
      { q: "Asosiasi mana yang cocok?", a: "Tergantung subklasifikasi yang dimohonkan. Itu yang kami petakan dulu sebelum Anda mendaftar." },
      FAQ_BIAYA,
    ],
    terkait: ["pendukung-sbu", "maintenance-compliance"],
  },
  {
    slug: "keu-audit-kap",
    kelompok: "Pendukung SBU",
    nama: "Laporan Keuangan dan Audit KAP",
    judul: "Neraca dan Laporan Keuangan (Audit KAP)",
    metaJudul: "Laporan Keuangan dan Audit KAP untuk SBU | Atrahdis",
    metaDeskripsi:
      "Dua jalur laporan keuangan untuk SBU: memenuhi syarat kualifikasi, atau audit KAP formal dengan opini. Untuk Menengah, Spesialis, Besar, PMA, dan BUJKA.",
    pengantar:
      "Ada dua jalur: cukup memenuhi syarat kualifikasi, atau audit KAP formal dengan opini. Bedanya besar, jadi kami cek dulu mana yang Anda butuhkan.",
    gambaran: [
      ["Jalur", "KAP compliance (neraca) atau audit KAP formal (opini)"],
      ["Wajib untuk", "Menengah, Spesialis, Besar, PMA, BUJKA"],
      ["Kualifikasi Kecil", "Tidak wajib audit"],
      ["Masa berlaku SKU", "36 bulan"],
    ],
    siapkan: [
      "Neraca dan laba rugi 1–2 tahun terakhir",
      "Buku besar atau laporan pembukuan",
      "Rekening koran atau bukti aset",
      "Akta, NIB, dan NPWP",
      "Daftar proyek dan kontrak",
    ],
    titikGagal: [
      ["Neraca tidak memenuhi ambang kualifikasi", "Hitung sebelum mengajukan, bukan sesudah ditolak"],
      ["Menengah atau Besar tanpa opini WTP", "Jadwalkan audit lebih awal"],
      ["Laporan tidak sinkron dengan SPT", "Rekonsiliasi pajak dulu"],
    ],
    faq: [
      { q: "Kami sudah punya laporan keuangan, apa yang kurang?", a: "Yang dinilai apakah laporan memenuhi ambang kualifikasi, dan untuk Menengah atau Besar, beropini WTP dari KAP terdaftar." },
      { q: "Berapa lama audit KAP?", a: "Umumnya 3–6 minggu, tergantung KAP dan kesiapan pembukuan. Karena itu dokumen Anda kami audit dulu." },
      FAQ_BIAYA,
    ],
    terkait: ["pendukung-sbu", "SBU-M", "SBU-B"],
  },

  // ───────── Maintenance compliance ─────────
  {
    slug: "maintenance-compliance",
    kelompok: "Maintenance compliance",
    nama: "Maintenance Compliance",
    judul: "Maintenance Compliance",
    metaJudul: "Maintenance Compliance: LKPM, Surveilans, OSS | Atrahdis",
    metaDeskripsi:
      "Layanan berkala untuk menjaga kepatuhan setelah SBU dan NIB terbit: LKPM, surveilans LSBU, perubahan data SBU, dan perawatan OSS.",
    pengantar:
      "SBU yang sudah terbit belum berarti urusan selesai. Empat kewajiban berkala ini perlu dijaga supaya tidak berujung teguran, pembekuan OSS, atau sanksi.",
    poin: {
      judul: "Empat layanan maintenance",
      items: [
        { judul: "LKPM", isi: "Pelaporan ke OSS 4 kali setahun, termasuk saat tidak ada kegiatan.", href: "/layanan/lkpm" },
        { judul: "Surveilans LSBU", isi: "Pemeriksaan berkala 1–2 kali setahun apakah SBU masih memenuhi syarat." },
        { judul: "Perubahan data SBU", isi: "Saat direksi, alamat, subklasifikasi, atau kualifikasi berubah. Sekitar 3–7 hari kerja." },
        { judul: "Perawatan OSS", isi: "Pemantauan status NIB, sinkronisasi KBLI, dan penanganan teguran.", href: "/layanan/oss-rba" },
      ],
    },
    faq: [
      { q: "Apa yang diperiksa saat surveilans LSBU?", a: "Legalitas perusahaan, SKK tenaga ahli yang masih berlaku, peralatan, dan kegiatan usaha. Ketidaksesuaian bisa membuat SBU dibekukan." },
      { q: "Kenapa lebih baik dikontrak rutin?", a: "Pengingat, pengumpulan data, dan arsip bukti berjalan teratur. Biayanya lebih ringan dibanding membereskan masalah setelah terjadi." },
      FAQ_BIAYA,
    ],
    terkait: ["lkpm", "oss-rba", "kta-asosiasi"],
  },
  {
    slug: "lkpm",
    kelompok: "Maintenance compliance",
    nama: "Pelaporan LKPM",
    judul: "Pelaporan LKPM Setiap Kuartal",
    metaJudul: "Jasa Pelaporan LKPM Kuartalan di OSS | Atrahdis",
    metaDeskripsi:
      "Pelaporan LKPM kuartalan ke BKPM lewat OSS. Kami jaga kalendernya dan susun laporannya, Anda cukup kirim angka realisasi.",
    pengantar:
      "Izin bisa bermasalah bukan karena ditolak, tapi karena LKPM tidak pernah dilaporkan. Kami jaga kalender kuartalannya dan menyusun laporannya, Anda cukup mengirim angka realisasi.",
    gambaran: [
      ["Frekuensi", "4 kali setahun, selama izin berjalan"],
      ["Periode lapor", "Tanggal 1–15 di bulan April, Juli, Oktober, dan Januari"],
      ["Otoritas", "BKPM lewat OSS"],
      ["Tetap wajib", "Walaupun tidak ada kegiatan di kuartal itu"],
    ],
    siapkan: [
      "Akses OSS-RBA yang aktif",
      "Nilai realisasi investasi kuartal berjalan",
      "Jumlah tenaga kerja lokal dan asing",
      "Status kegiatan usaha",
      "Bukti pendukung seperti invoice, kontrak, atau foto progres",
    ],
    titikGagal: [
      ["Akses OSS tidak bisa dibuka", "Pulihkan akses dulu sebelum menyusun laporan"],
      ["Angka tidak sesuai laporan pajak", "Rekonsiliasi sebelum diajukan"],
      ["Terlambat lapor", "Pasang pengingat dua minggu sebelum tenggat"],
      ["Tahap usaha keliru", "Cek status izin sebelum menyusun"],
    ],
    faq: [
      { q: "Belum ada kegiatan, tetap wajib lapor?", a: "Ya. Justru laporan yang tidak disampaikan yang memicu surat klarifikasi." },
      { q: "Akses OSS mati, bisa langsung lapor?", a: "Belum. Akses harus dipulihkan dulu, biasanya dalam hitungan hari kerja." },
      FAQ_BIAYA,
    ],
    terkait: ["oss-rba", "maintenance-compliance"],
  },
  {
    slug: "oss-rba",
    kelompok: "Maintenance compliance",
    nama: "Pemulihan Akses OSS-RBA",
    judul: "Pemulihan Akses OSS-RBA",
    metaJudul: "Pemulihan Akses OSS-RBA, NIB Ada tapi Akun Terkunci | Atrahdis",
    metaDeskripsi:
      "NIB ada tapi akun OSS tidak bisa dibuka? Akses dipulihkan lewat perubahan penanggung jawab dan bukti kepemilikan, tanpa mendirikan PT baru.",
    pengantar:
      "NIB ada tapi tidak bisa login adalah masalah akses, bukan izin. Akses OSS dipulihkan lewat perubahan penanggung jawab dan bukti kepemilikan badan usaha, bukan dengan mendirikan PT baru.",
    gambaran: [
      ["Estimasi waktu", "Sekitar 3–5 hari kerja"],
      ["Otoritas", "OSS / BKPM"],
      ["Sifat pekerjaan", "Administratif, tidak mengubah KBLI kecuali diminta"],
      ["Penentu kecepatan", "Kelengkapan bukti kepemilikan badan usaha"],
    ],
    siapkan: [
      "NIB atau nomor akun OSS lama, bila ada",
      "Akta dan SK Kemenkumham terbaru",
      "KTP dan NPWP penanggung jawab baru",
      "Surat penunjukan penanggung jawab dari direksi",
      "Email aktif yang akan dipakai",
    ],
    titikGagal: [
      ["Email pemulihan milik orang yang sudah tidak ada", "Siapkan perubahan penanggung jawab lebih dulu"],
      ["Data OSS berbeda dengan akta", "Sinkronkan data sebelum mengajukan"],
      ["Akun masih dipegang konsultan lama", "Ajukan pencabutan akses pihak lain"],
    ],
    faq: [
      { q: "Kenapa tidak daftar ulang saja?", a: "NIB ganda berisiko. Satu badan usaha seharusnya punya satu rekam jejak perizinan." },
      { q: "Apakah KBLI berubah saat pemulihan akses?", a: "Tidak, kecuali Anda memintanya." },
      FAQ_BIAYA,
    ],
    terkait: ["lkpm", "maintenance-compliance"],
  },

  // ───────── Tender dan compliance ─────────
  {
    slug: "dok-tender",
    kelompok: "Tender dan compliance",
    nama: "Dokumen Prasyarat Tender",
    judul: "Dokumen Prasyarat Tender",
    metaJudul: "Dokumen Prasyarat Tender: PKKPR, PBG, BPJS, KSWP | Atrahdis",
    metaDeskripsi:
      "Audit dan pengurusan dokumen prasyarat tender di luar SBU: PKKPR, PBG/SLF, NIB/KBLI, BPJS, KSWP, dan Bank Garansi, sesuai RKS tiap paket.",
    pengantar:
      "Satu dokumen kedaluwarsa sudah cukup menggugurkan penawaran. Kami audit dokumen prasyarat di luar SBU sesuai RKS paket Anda, lalu bantu menuntaskan yang kurang.",
    poin: {
      judul: "Enam dokumen yang sering menentukan",
      items: [
        { judul: "PKKPR", isi: "Kesesuaian kegiatan pemanfaatan ruang." },
        { judul: "PBG dan SLF", isi: "Termasuk untuk proyek yang dijadikan pengalaman." },
        { judul: "NIB dan KBLI", isi: "KBLI harus sesuai syarat kualifikasi paket." },
        { judul: "BPJS", isi: "Kepesertaan seluruh pekerja, tanpa tunggakan." },
        { judul: "KSWP", isi: "Status pajak dibaca langsung dari sistem DJP." },
        { judul: "Bank Garansi", isi: "Ajukan ke bank sejak awal, paling sering tertunda." },
      ],
    },
    titikGagal: [
      ["KSWP tidak valid karena tunggakan pajak", "Tuntaskan sebelum penawaran disusun"],
      ["Peserta BPJS kurang atau ada tunggakan", "Cek kepesertaan seluruh pekerja"],
      ["PBG belum terbit untuk proyek pengalaman", "Lengkapi legalitas proyek dulu"],
      ["Dokumen lama dipakai tanpa dicek", "Cek masa berlaku pada tanggal penutupan"],
    ],
    faq: [
      { q: "Dokumen sudah lengkap, perlu audit?", a: "Ya. Lengkap menurut perusahaan bisa berbeda dengan lengkap menurut RKS, dan daftar wajib berbeda di tiap tender." },
      { q: "Dokumen yang kurang bisa menyusul?", a: "Tidak. Berkas dinilai saat pemasukan penawaran." },
      { q: "Apa bedanya dengan Tender Desk?", a: "Layanan ini menangani dokumen prasyarat. Penyusunan penawaran ditangani Tender Desk." },
      FAQ_BIAYA,
    ],
    terkait: ["tender-desk", "tender-dan-sbu", "smk3"],
  },
  {
    slug: "ims-iso",
    kelompok: "Tender dan compliance",
    nama: "ISO 9001, 14001, 45001 (IMS)",
    judul: "Sertifikasi ISO 9001, 14001, dan 45001 Terpadu",
    metaJudul: "Sertifikasi ISO 9001, 14001, 45001 Terpadu (IMS) | Atrahdis",
    metaDeskripsi:
      "Pendampingan sertifikasi ISO 9001, 14001, dan 45001 sebagai satu sistem terpadu untuk tender BUMN dan pemerintah. Akreditasi KAN atau IAF.",
    pengantar:
      "Satu audit untuk tiga standar. ISO 9001 (mutu), 14001 (lingkungan), dan 45001 (K3) dikerjakan sebagai satu sistem terpadu, bukan tiga proyek terpisah.",
    gambaran: [
      ["Paket", "ISO 9001, 14001, dan 45001 terpadu"],
      ["Masa berlaku", "3 tahun, dengan surveillance tiap tahun"],
      ["Akreditasi", "KAN atau IAF, sesuai syarat tender"],
      ["Ruang lingkup", "Harus mencakup pekerjaan yang ditawarkan"],
    ],
    siapkan: [
      "Struktur organisasi dan uraian tugas",
      "Kebijakan mutu, lingkungan, dan K3 yang ditandatangani manajemen",
      "Prosedur dan instruksi kerja inti",
      "Bukti implementasi: catatan rapat, inspeksi, pelatihan",
      "Hasil audit internal dan tinjauan manajemen",
    ],
    titikGagal: [
      ["Membeli sertifikat tanpa membangun sistem", "Penuhi standar dulu, sertifikat menyusul"],
      ["Salah pilih KAN atau IAF", "Baca RKS sebelum memilih badan sertifikasi"],
      ["Surveillance terlewat", "Pasang pengingat tahunan sejak sertifikat terbit"],
      ["Ruang lingkup tidak mencakup pekerjaan", "Tetapkan ruang lingkup sesuai pekerjaan"],
    ],
    faq: [
      { q: "KAN atau IAF, mana yang dibutuhkan?", a: "Bergantung syarat paket. KAN berbobot lebih tinggi di banyak tender, IAF prosesnya lebih cepat." },
      { q: "Cukup ISO 9001 saja?", a: "Bergantung syarat paket. Sebagian tender hanya meminta 9001, sebagian meminta ketiganya." },
      FAQ_BIAYA,
    ],
    terkait: ["iso-37001", "smk3", "dok-tender"],
  },
  {
    slug: "smk3",
    kelompok: "Tender dan compliance",
    nama: "SMK3 Kemnaker",
    judul: "SMK3 Kemnaker (PP 50/2012)",
    metaJudul: "Pendampingan Sertifikasi SMK3 Kemnaker | Atrahdis",
    metaDeskripsi:
      "Pendampingan SMK3 berdasarkan PP 50/2012: gap assessment 64 kriteria, penyiapan AK3U dan P2K3, sampai audit eksternal Kemnaker.",
    pengantar:
      "SMK3 adalah sertifikasi sistem manajemen K3 berdasarkan PP 50/2012, diaudit lembaga yang ditunjuk Kemnaker. Rezimnya berbeda dari ISO 45001.",
    gambaran: [
      ["Dasar", "PP 50/2012 dan ketentuan Kemnaker"],
      ["Kriteria", "64 kriteria di tingkat awal, lebih banyak di tingkat lanjut"],
      ["Masa berlaku", "3 tahun, dengan bendera Kemnaker"],
      ["Pilihan paket", "Pendampingan berkas saja, atau lengkap dengan pelatihan AK3U dan pengesahan P2K3"],
    ],
    siapkan: [
      "Struktur organisasi dan bagan P2K3",
      "Kebijakan K3 yang ditandatangani direksi",
      "Identifikasi bahaya dan penilaian risiko (IBPR)",
      "Program K3 beserta anggarannya",
      "Bukti pelatihan AK3U",
      "Catatan inspeksi, audit internal, dan kecelakaan atau near miss",
    ],
    titikGagal: [
      ["Tidak ada personil AK3U", "Jadwalkan pelatihan lebih awal"],
      ["P2K3 belum disahkan", "Urus pengesahan sebelum audit eksternal"],
      ["IBPR disalin dari perusahaan lain", "Susun sesuai pekerjaan yang benar-benar dilakukan"],
      ["ISO 45001 dianggap sama dengan SMK3", "Pisahkan keduanya"],
    ],
    faq: [
      { q: "Sudah punya ISO 45001, perlu SMK3?", a: "Tergantung syarat paket. Banyak tender pemerintah menyebut SMK3 secara spesifik." },
      { q: "Kalau dokumen lengkap, sudah cukup?", a: "Belum. Auditor meminta bukti lapangan, jadi catatan implementasi perlu disiapkan." },
      FAQ_BIAYA,
    ],
    terkait: ["ims-iso", "dok-tender"],
  },
  {
    slug: "sni",
    kelompok: "Tender dan compliance",
    nama: "Sertifikasi SNI (SPPT)",
    judul: "Sertifikasi SNI (SPPT SNI)",
    metaJudul: "Pendampingan Sertifikasi SPPT SNI Produk | Atrahdis",
    metaDeskripsi:
      "Pendampingan SPPT SNI untuk produk pabrik dalam dan luar negeri: penentuan standar, uji pendahuluan, uji laboratorium, dan audit pabrik.",
    pengantar:
      "Gagal uji laboratorium bisa dicegah kalau sampel diuji dulu sebelum diajukan. Kami jalankan uji pendahuluan dan perbaikan SOP produksi sebelum sampel dikirim.",
    gambaran: [
      ["Masa berlaku SPPT", "3–4 tahun, dengan surveillance"],
      ["Cakupan", "Audit SOP produksi dan uji sampel di laboratorium terakreditasi"],
      ["Otoritas", "BSN, laboratorium terakreditasi KAN, dan lembaga sertifikasi produk"],
      ["Lokasi pabrik", "Dalam atau luar negeri, tahapannya berbeda"],
    ],
    siapkan: [
      "Profil perusahaan dan legalitas pabrik",
      "Spesifikasi produk dan nomor SNI yang dituju",
      "SOP produksi dan bagan alir proses",
      "Hasil uji internal, bila ada",
      "Daftar mesin dan kapasitas produksi",
    ],
    titikGagal: [
      ["Salah memilih standar SNI", "Verifikasi nomor SNI, jangan hanya dari kategori produk"],
      ["Sampel tidak lolos uji", "Lakukan uji pendahuluan sebelum pengajuan"],
      ["SOP tidak sesuai praktik produksi", "Audit internal sebelum audit sertifikasi"],
      ["Pabrik luar negeri tanpa legalisasi", "Siapkan legalisasi sejak awal"],
    ],
    faq: [
      { q: "Produk sudah diekspor, masih perlu SNI?", a: "Tetap perlu. Standar ekspor berbeda dengan skema SPPT SNI." },
      { q: "Pabrik di luar negeri bisa?", a: "Bisa, dengan tahapan berbeda dan dokumen legalisasi yang disiapkan lebih awal." },
      FAQ_BIAYA,
    ],
    terkait: ["ims-iso", "dok-tender"],
  },

  // ───────── PMA dan badan usaha asing ─────────
  {
    slug: "pt-pma",
    kelompok: "PMA dan badan usaha asing",
    nama: "Pendirian PT PMA",
    judul: "Pendirian PT PMA",
    metaJudul: "Pendirian PT PMA Siap SBU dan Izin Teknis | Atrahdis",
    metaDeskripsi:
      "Pendirian PT PMA dengan maksud dan tujuan akta sesuai KBLI, supaya SBU dan izin teknis tidak tertahan di dokumen pendirian.",
    pengantar:
      "Yang menentukan bukan aktanya, tapi apakah izin teknisnya bisa terbit. Maksud dan tujuan akta kami susun sesuai KBLI, supaya pengajuan SBU berikutnya tidak tertahan.",
    gambaran: [
      ["Estimasi waktu", "Sekitar 7–14 hari kerja untuk paket standar, setelah dokumen lengkap"],
      ["Otoritas", "Kemenkumham, BKPM/OSS, dan DJP"],
      ["Kualifikasi SBU", "PT PMA masuk kualifikasi Besar"],
      ["Paket", "Standar, atau siap konstruksi dan tender dengan pemetaan kesiapan SBU"],
    ],
    siapkan: [
      "KTP atau paspor seluruh pemegang saham",
      "Struktur kepemilikan dan komposisi saham",
      "Tiga alternatif nama PT dan KBLI yang dituju",
      "Alamat domisili dan bukti sewa",
      "Susunan direksi dan komisaris",
    ],
    titikGagal: [
      ["Akta memakai template umum", "Rumuskan maksud dan tujuan sesuai KBLI konstruksi"],
      ["Nama PT ditolak", "Siapkan tiga alternatif sejak awal"],
      ["Modal disetor tidak sesuai ketentuan KBLI", "Konfirmasi per KBLI sebelum akta dibuat"],
      ["LKPM terlewat", "Pasang pengingat kuartalan sejak serah terima"],
    ],
    faq: [
      { q: "Sudah punya perusahaan di luar negeri, bisa dipakai?", a: "Tidak. Izin teknis hanya bisa diajukan badan hukum Indonesia." },
      { q: "Apa bedanya dengan BUJKA?", a: "PT PMA adalah badan hukum Indonesia dengan modal asing. BUJKA adalah badan usaha asing yang beroperasi lewat kantor perwakilan." },
      FAQ_BIAYA,
    ],
    terkait: ["bujka", "lkpm", "SBU-B"],
  },
  {
    slug: "bujka",
    kelompok: "PMA dan badan usaha asing",
    nama: "BUJKA",
    judul: "BUJKA (Badan Usaha Jasa Konstruksi Asing)",
    metaJudul: "Pengurusan SBU BUJKA untuk Kontraktor Asing | Atrahdis",
    metaDeskripsi:
      "Pengurusan BUJKA untuk badan usaha konstruksi asing lewat kantor perwakilan: SKK jenjang 9, peralatan, dan laporan keuangan audit.",
    pengantar:
      "Untuk badan usaha asing yang ingin mengerjakan konstruksi di Indonesia lewat kantor perwakilan. Struktur dan syaratnya berbeda dari PT PMA.",
    gambaran: [
      ["Dipakai untuk", "Pengajuan baru dan perpanjangan"],
      ["Personil", "SKK jenjang 9 untuk PJT dan PJSK per subklasifikasi"],
      ["Peralatan", "5 unit"],
      ["Entitas", "Wajib punya kantor perwakilan (KPPA)"],
    ],
    siapkan: [
      "Akta pendirian perusahaan asing dan terjemahannya",
      "Bukti registrasi atau legalisasi dari negara asal",
      "Laporan keuangan audit",
      "SKK jenjang 9 untuk PJT dan PJSK",
      "Bukti kantor perwakilan (KPPA)",
      "Pengalaman proyek di Indonesia (untuk perpanjangan)",
    ],
    titikGagal: [
      ["SKK bukan jenjang 9", "Petakan personil sejak awal"],
      ["Tidak punya KPPA yang sah", "Siapkan kantor perwakilan"],
      ["Perpanjangan tanpa pengalaman di Indonesia", "Kumpulkan bukti proyek"],
      ["Menganggap BUJKA sama dengan PT PMA", "Pisahkan struktur dan syaratnya"],
    ],
    faq: [
      { q: "Bisa mulai tanpa SKK jenjang 9?", a: "Tidak. SKK jenjang 9 adalah prasyarat pengajuan." },
      { q: "Apa yang dibutuhkan untuk perpanjangan?", a: "Pengalaman proyek di Indonesia. Ini yang paling sering jadi kendala." },
      FAQ_BIAYA,
    ],
    terkait: ["pt-pma", "peralatan-konstruksi", "keu-audit-kap"],
  },
];

export const cariDetailLayanan = (slug: string) => detailLayanan.find((d) => d.slug === slug);
