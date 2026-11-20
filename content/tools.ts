/**
 * Tools gratis /tools/<slug>: parity URL dengan web Astro lama (atrahdis.id/tools/...).
 * Ditaut dari footer, tidak dari menu utama.
 *
 * Harga TIDAK ditampilkan (KEPUTUSAN-FINAL). Kalkulator memakai estimasi waktu bertingkat
 * dan daftar dokumen; angka biaya baru boleh muncul kalau sudah diambil dari catalog_core.py.
 * TODO tim: isi teknis (kode masalah OSS, jenjang SKK) perlu dicek ulang oleh Mba Rika.
 */
export type Tool = {
  slug: string;
  nama: string;
  ringkas: string;
  judul: string;
  pengantar: string;
  metaJudul: string;
  metaDeskripsi: string;
};

export const tools: Tool[] = [
  {
    slug: "cek-sbu",
    nama: "Cek Kesiapan SBU",
    ringkas: "Masukkan nama perusahaan atau NIB, kami cek kesiapan awalnya lewat WhatsApp.",
    judul: "Cek Kesiapan SBU",
    pengantar:
      "Masukkan nama perusahaan atau NIB. Tim kami mengecek kesiapan awal SBU Anda dan membalas lewat WhatsApp, gratis dan tanpa komitmen.",
    metaJudul: "Cek Kesiapan SBU Konstruksi Gratis | Atrahdis",
    metaDeskripsi:
      "Cek kesiapan awal SBU konstruksi dari nama perusahaan atau NIB. Gratis, dibalas lewat WhatsApp. Bukan pengecekan resmi LPJK.",
  },
  {
    slug: "kalkulator-sbu",
    nama: "Kalkulator Kebutuhan SBU",
    ringkas: "Pilih jenis badan usaha dan kualifikasi, lihat estimasi waktu dan dokumen wajibnya.",
    judul: "Kalkulator Kebutuhan SBU",
    pengantar:
      "Pilih jenis badan usaha, kualifikasi, dan kebutuhan SKK. Anda langsung melihat estimasi waktu dan dokumen yang wajib disiapkan. Biaya kami hitung setelah audit dokumen gratis.",
    metaJudul: "Kalkulator Kebutuhan SBU Konstruksi | Atrahdis",
    metaDeskripsi:
      "Estimasi waktu dan dokumen wajib SBU konstruksi per jenis badan usaha dan kualifikasi Kecil, Menengah, Besar. Biaya dihitung setelah audit gratis.",
  },
  {
    slug: "nib-audit",
    nama: "Audit Kesiapan NIB",
    ringkas: "Masukkan NIB 13 digit dan centang kondisi berkas Anda, lihat skor kesiapannya.",
    judul: "Audit Kesiapan NIB untuk SBU",
    pengantar:
      "Masukkan NIB 13 digit, lalu centang kondisi berkas perusahaan Anda. Anda langsung melihat skor kesiapan dan daftar yang masih kurang sebelum proses SBU.",
    metaJudul: "Audit Kesiapan NIB untuk SBU Konstruksi | Atrahdis",
    metaDeskripsi:
      "Cek kesiapan NIB dan berkas perusahaan sebelum mengurus SBU konstruksi: KBLI, akta, KSWP, SKK, dan laporan keuangan. Gratis.",
  },
  {
    slug: "oss-error",
    nama: "Pembaca Masalah OSS",
    ringkas: "Pilih masalah yang muncul saat pengajuan, lihat penyebab dan langkah perbaikannya.",
    judul: "Pembaca Masalah OSS dan LPJK",
    pengantar:
      "Pilih masalah yang muncul saat pengajuan SBU lewat OSS. Anda mendapat penjelasan singkat dan langkah perbaikannya.",
    metaJudul: "Masalah OSS Saat Pengajuan SBU dan Cara Mengatasinya | Atrahdis",
    metaDeskripsi:
      "Penjelasan 20 masalah yang sering muncul saat pengajuan SBU lewat OSS dan LPJK, dari NIB tidak ditemukan sampai KSWP tidak valid, lengkap dengan langkah perbaikan.",
  },
  {
    slug: "skk-selector",
    nama: "Pemilih Jenjang SKK",
    ringkas: "Pilih bidang pekerjaan dan kualifikasi SBU, lihat perkiraan jenjang SKK yang dibutuhkan.",
    judul: "Pemilih Jenjang SKK",
    pengantar:
      "Pilih bidang pekerjaan dan kualifikasi SBU yang dituju. Anda melihat perkiraan jenjang SKK tenaga ahli yang dibutuhkan. Jenjang pastinya kami pastikan saat audit.",
    metaJudul: "Pemilih Jenjang SKK Konstruksi | Atrahdis",
    metaDeskripsi:
      "Perkiraan jenjang SKK tenaga ahli per bidang pekerjaan dan kualifikasi SBU Kecil, Menengah, Besar. Gratis, dipastikan saat audit.",
  },
  {
    slug: "bujka-playbook",
    nama: "Checklist Pengurusan SBU",
    ringkas: "Checklist 4 tahap dari persyaratan awal sampai SBU terbit. Progres tersimpan di browser.",
    judul: "Checklist Pengurusan SBU",
    pengantar:
      "Empat tahap pengurusan SBU dari persyaratan awal sampai sertifikat terbit. Centang yang sudah selesai, progresnya tersimpan di browser Anda.",
    metaJudul: "Checklist Pengurusan SBU Konstruksi 4 Tahap | Atrahdis",
    metaDeskripsi:
      "Checklist pengurusan SBU konstruksi: persyaratan awal, OSS-RBA, LPJK dan asosiasi, sampai SBU terbit dan pengingat masa berlaku.",
  },
];

export const cariTool = (slug: string) => tools.find((t) => t.slug === slug);

/* ───────── Data per tool ───────── */

export const ESTIMASI_WAKTU: Record<string, string> = {
  Kecil: "Tercepat 3 hari kerja jika berkas lengkap dan SKK sudah ada. Umumnya 2–4 minggu.",
  Menengah: "Bertingkat sesuai kondisi berkas. Estimasi pasti ditulis di kontrak setelah audit.",
  Besar: "Umumnya 4–8 minggu. Estimasi pasti ditulis di kontrak setelah audit.",
};

export const DOKUMEN_DASAR = [
  "NIB dengan KBLI jasa konstruksi",
  "Akta pendirian dan perubahan, serta SK Kemenkumham",
  "NPWP badan usaha dengan status KSWP valid",
  "KTP dan NPWP pengurus",
];

export const DOKUMEN_TAMBAHAN: Record<string, string[]> = {
  Kecil: ["Laporan keuangan sederhana"],
  Menengah: ["Laporan keuangan audit KAP", "Kontrak, BAST, dan faktur pajak pengalaman proyek", "Bukti kepemilikan atau sewa peralatan"],
  Besar: ["Laporan keuangan audit KAP", "Kontrak, BAST, dan faktur pajak pengalaman proyek", "Bukti kepemilikan atau sewa peralatan"],
};

export const CEK_NIB = [
  { id: "aktif", label: "NIB aktif dan bisa dibuka di OSS" },
  { id: "kbli", label: "KBLI jasa konstruksi sesuai subklasifikasi yang dituju" },
  { id: "akta", label: "Akta dan SK Kemenkumham sama dengan data di OSS" },
  { id: "kswp", label: "Status KSWP valid (NPWP aktif, SPT dilaporkan)" },
  { id: "pengurus", label: "Data pengurus di OSS lengkap dan tidak ganda" },
  { id: "skk", label: "Tenaga ahli sudah punya SKK aktif" },
  { id: "keuangan", label: "Laporan keuangan tahun terakhir tersedia" },
  { id: "kantor", label: "Alamat dan foto kantor jelas" },
];

export const MASALAH_OSS: { kode: string; nama: string; sebab: string; langkah: string[] }[] = [
  { kode: "E001", nama: "NIB tidak ditemukan", sebab: "NIB salah ketik, belum terbit, atau terdaftar atas badan usaha lain.", langkah: ["Cocokkan 13 digit NIB dengan dokumen NIB terbaru", "Login OSS dengan akun badan usaha, bukan akun pribadi", "Kalau NIB belum terbit, selesaikan pendaftaran NIB lebih dulu"] },
  { kode: "E002", nama: "KBLI tidak sesuai", sebab: "KBLI di NIB tidak mencakup subklasifikasi SBU yang diajukan.", langkah: ["Petakan subklasifikasi SBU ke KBLI yang benar", "Tambah atau ubah KBLI di OSS", "Pastikan KBLI juga tercantum di akta bila diperlukan"] },
  { kode: "E003", nama: "KSWP tidak valid", sebab: "NPWP tidak aktif, SPT belum dilaporkan, atau data wajib pajak tidak sinkron.", langkah: ["Cek status KSWP di layanan DJP", "Laporkan SPT yang tertunggak", "Ajukan ulang setelah status valid"] },
  { kode: "E004", nama: "Dokumen pengurus tidak lengkap", sebab: "KTP atau NPWP pengurus belum diunggah atau tidak terbaca.", langkah: ["Siapkan KTP dan NPWP semua pengurus", "Unggah ulang dengan hasil pindai yang jelas", "Samakan susunan pengurus dengan akta terakhir"] },
  { kode: "E005", nama: "SK Kemenkumham tidak ditemukan", sebab: "SK pengesahan atau perubahan belum terhubung dengan data badan usaha.", langkah: ["Siapkan SK pendirian dan SK perubahan terakhir", "Pastikan nomor SK sama dengan di AHU", "Perbarui data di OSS bila ada perubahan akta"] },
  { kode: "E006", nama: "Laporan keuangan tidak memenuhi", sebab: "Laporan keuangan tidak sesuai syarat kualifikasi, misalnya Menengah atau Besar tanpa audit KAP.", langkah: ["Cek syarat laporan keuangan untuk kualifikasi yang dituju", "Siapkan audit KAP untuk Menengah dan Besar", "Samakan angka kekayaan bersih dengan data pengajuan"] },
  { kode: "E007", nama: "SKK tidak ditemukan", sebab: "SKK tenaga ahli belum terbit, kedaluwarsa, atau nomornya salah.", langkah: ["Cek masa berlaku SKK tiap tenaga ahli", "Pastikan subklasifikasi SKK sesuai SBU", "Urus SKK baru bila belum ada"] },
  { kode: "E008", nama: "KTA tidak ditemukan", sebab: "Keanggotaan asosiasi belum aktif atau iurannya belum diperbarui.", langkah: ["Cek apakah jalur pengajuan Anda memang mensyaratkan KTA", "Perbarui iuran atau daftar ke asosiasi", "Samakan nama perusahaan dan pengurus dengan akta"] },
  { kode: "E009", nama: "Serkom tidak sesuai", sebab: "Sertifikat kompetensi tidak cocok dengan subklasifikasi atau jabatan.", langkah: ["Cocokkan Serkom dengan subklasifikasi yang diajukan", "Ganti tenaga ahli atau urus Serkom yang sesuai"] },
  { kode: "E010", nama: "Sertifikat ISO tidak valid", sebab: "Sertifikat ISO kedaluwarsa atau badan sertifikasinya tidak sesuai syarat.", langkah: ["Cek masa berlaku dan akreditasi sertifikat", "Perpanjang atau ulang sertifikasi bila perlu"] },
  { kode: "E011", nama: "Foto kantor tidak jelas", sebab: "Foto kantor buram, tidak menunjukkan papan nama, atau alamat tidak cocok.", langkah: ["Foto ulang tampak depan dengan papan nama terlihat", "Samakan alamat dengan data NIB"] },
  { kode: "E012", nama: "NPWP badan tidak aktif", sebab: "NPWP badan usaha berstatus non-efektif atau datanya berubah.", langkah: ["Aktifkan kembali NPWP di kantor pajak", "Cek ulang status KSWP setelahnya"] },
  { kode: "E013", nama: "Akta perusahaan tidak berlaku", sebab: "Akta belum memuat perubahan terakhir, misalnya pengurus atau modal.", langkah: ["Buat akta perubahan bila ada perubahan data", "Daftarkan perubahan ke Kemenkumham", "Perbarui data di OSS"] },
  { kode: "E014", nama: "NIB non-aktif", sebab: "NIB dibekukan atau dicabut, misalnya karena laporan yang tertunggak.", langkah: ["Cek status NIB di OSS", "Selesaikan kewajiban laporan yang tertunda", "Ajukan aktivasi ulang"] },
  { kode: "E015", nama: "Data pengurus ganda", sebab: "Satu orang tercatat ganda atau merangkap di badan usaha lain yang tidak diperbolehkan.", langkah: ["Cek data pengurus di OSS dan AHU", "Rapikan data yang ganda", "Ganti tenaga ahli yang merangkap"] },
  { kode: "E016", nama: "Peralatan tidak memenuhi", sebab: "Jumlah atau bukti kepemilikan alat kurang dari syarat kualifikasi.", langkah: ["Hitung jumlah unit sesuai kualifikasi", "Lengkapi faktur atau perjanjian sewa jangka panjang", "Buat surat pernyataan untuk alat yang merangkap"] },
  { kode: "E017", nama: "Tenaga ahli tidak sesuai", sebab: "Jenjang atau subklasifikasi SKK tenaga ahli tidak cocok dengan kualifikasi SBU.", langkah: ["Cek jenjang minimal untuk kualifikasi Anda", "Ganti atau tambah tenaga ahli yang sesuai"] },
  { kode: "E018", nama: "Integrasi OSS gagal", sebab: "Data dari OSS tidak terkirim ke sistem LPJK, sering karena gangguan sistem atau data tidak sinkron.", langkah: ["Tunggu beberapa saat lalu coba lagi", "Pastikan semua data di OSS sudah tersimpan", "Hubungi helpdesk bila berulang"] },
  { kode: "E019", nama: "Batasan BUJKA atau PMA", sebab: "Badan usaha asing atau PMA punya syarat kualifikasi dan kemitraan khusus.", langkah: ["Cek syarat khusus BUJKA atau PMA", "Siapkan dokumen kemitraan dan perizinan terkait"] },
  { kode: "E020", nama: "Masalah lain", sebab: "Masalah yang tidak ada di daftar ini.", langkah: ["Kirim tangkapan layar pesan error ke kami lewat WhatsApp", "Kami bantu cek penyebabnya"] },
];

export const BIDANG_SKK = [
  "Pekerjaan jalan",
  "Pekerjaan gedung",
  "Pekerjaan sumber daya air",
  "Pekerjaan ketenagalistrikan",
  "Pekerjaan mekanikal",
  "Pekerjaan elektronika",
  "Pekerjaan lingkungan",
  "Bidang lainnya",
];

/** Perkiraan jenjang minimal per kualifikasi, mengikuti pengelompokan layanan SKK lama (J5–J6, J7, J8). */
export const JENJANG_PER_KUALIFIKASI: Record<string, { jenjang: string; ket: string; href: string }> = {
  Kecil: { jenjang: "Jenjang 5 atau 6", ket: "Tingkat teknisi atau analis.", href: "/layanan/SKK-J5J6" },
  Menengah: { jenjang: "Jenjang 7", ket: "Tingkat ahli muda.", href: "/layanan/SKK-J7" },
  Besar: { jenjang: "Jenjang 8", ket: "Tingkat ahli madya.", href: "/layanan/SKK-J8" },
};

export const PLAYBOOK = [
  {
    tahap: "Persyaratan awal",
    items: ["NIB aktif (13 digit)", "KBLI jasa konstruksi tercantum", "NPWP badan usaha valid", "Akta perusahaan dan SK Kemenkumham", "KTP dan NPWP pengurus", "Foto kantor"],
  },
  {
    tahap: "OSS-RBA",
    items: ["Login ke OSS dengan akun badan usaha", "Lengkapi profil badan usaha", "Unggah dokumen legalitas", "Verifikasi email dan nomor telepon", "Cek status KSWP (valid)"],
  },
  {
    tahap: "LPJK dan asosiasi",
    items: ["Daftar ke asosiasi badan usaha konstruksi bila jalur Anda mensyaratkan", "Unggah SKK tenaga ahli", "Unggah sertifikat kompetensi (Serkom)", "Unggah KTA aktif bila diperlukan", "Unggah laporan keuangan (audit KAP untuk Menengah dan Besar)", "Unggah daftar peralatan konstruksi"],
  },
  {
    tahap: "Pengajuan dan pemantauan",
    items: ["Ajukan SBU ke LPJK lewat OSS", "Bayar biaya sertifikasi", "Pantau verifikasi dan tindak lanjuti koreksi", "Unduh SBU elektronik", "Cetak sertifikat (opsional)", "Pasang pengingat masa berlaku SBU"],
  },
];
