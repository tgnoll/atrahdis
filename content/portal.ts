/** Rute portal klien lama (/app/*). Isinya placeholder: portal belum dipindah, klien diarahkan ke WhatsApp. */
export const halamanPortal: Record<string, { judul: string; isi: string }> = {
  login: { judul: "Masuk Portal Klien", isi: "Halaman masuk untuk klien yang sedang dalam proses pengurusan bersama Atrahdis." },
  callback: { judul: "Memproses Masuk", isi: "Halaman ini dipakai untuk menyelesaikan proses masuk ke portal klien." },
  logout: { judul: "Keluar dari Portal", isi: "Anda sudah keluar dari portal klien Atrahdis." },
  deals: { judul: "Status Pengurusan", isi: "Pantau status pengurusan SBU, SKK, dan layanan lain yang sedang berjalan." },
  dokumen: { judul: "Dokumen Klien", isi: "Kirim dan pantau kelengkapan dokumen yang dibutuhkan untuk pengurusan Anda." },
  pembayaran: { judul: "Pembayaran", isi: "Lihat tagihan dan status pembayaran pengurusan Anda." },
};
