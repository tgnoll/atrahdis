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

export type Kelompok = "Sertifikasi utama" | "Pendukung SBU" | "Maintenance compliance" | "Tender dan compliance";

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
        { judul: "SKK Jenjang 7 dan 8", isi: "Sertifikat kompetensi kerja jenjang ahli muda dan madya.", href: "/layanan/SKK-J7" },
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
];

export const cariDetailLayanan = (slug: string) => detailLayanan.find((d) => d.slug === slug);
