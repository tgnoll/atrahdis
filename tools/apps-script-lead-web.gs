/**
 * Apps Script untuk Sheet "Leads Atrahdis": menerima lead dari form web atrahdis
 * (lewat /api/lead) dan menulisnya ke tab "Lead Web". Tab dibuat otomatis kalau belum ada.
 *
 * Cara pasang: Ekstensi → Apps Script → tempel file ini → ganti TOKEN →
 * Deploy → Deployment baru → Aplikasi web (Jalankan sebagai: Saya, Akses: Siapa saja) → salin URL /exec.
 * Token dan URL yang sama diisi di Vercel: LEAD_WEBHOOK_TOKEN dan LEAD_WEBHOOK_URL.
 */
const TOKEN = 'GANTI_DENGAN_TOKEN_RAHASIA';
const NAMA_TAB = 'Lead Web';
// Urutan kolom sama dengan tab "Lead Web" di Sheet. Kolom kerja tim (Kualitas Lead s.d. Tanggal Follow-up)
// dibiarkan kosong untuk diisi Mba Rika, sama seperti tab Data Leads.
const KOLOM = [
  'Waktu (WIB)', 'Nama', 'WhatsApp', 'Perusahaan', 'Jawaban', 'Halaman', 'Sumber', 'Link WA',
  'Kualitas Lead', 'Catatan', 'PIC', 'Tanggal Follow-up',
  'gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'Halaman masuk',
];

function doPost(e) {
  const kunci = LockService.getScriptLock();
  kunci.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.token !== TOKEN) return balas({ ok: false, galat: 'token salah' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let tab = ss.getSheetByName(NAMA_TAB);
    if (!tab) {
      tab = ss.insertSheet(NAMA_TAB);
      tab.appendRow(KOLOM);
      tab.setFrozenRows(1);
      tab.getRange(1, 1, 1, KOLOM.length).setFontWeight('bold');
    }

    const waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');
    const gclid = d.gclid || d.gbraid || d.wbraid || '';
    tab.appendRow([
      waktu, aman(d.nama), "'" + aman(d.wa), aman(d.perusahaan), aman(d.jawaban), aman(d.halaman),
      aman(d.sumber), '', '', '', '', '',
      aman(gclid), aman(d.fbclid), aman(d.utm_source), aman(d.utm_medium),
      aman(d.utm_campaign), aman(d.utm_content), aman(d.utm_term), aman(d.halaman_masuk),
    ]);

    // Link WA siap klik untuk sales, dengan sapaan yang sudah terisi.
    const baris = tab.getLastRow();
    const sapaan = 'Halo ' + String(d.nama || '') + ', saya dari Atrahdis. Terima kasih sudah mengisi form konsultasi di website kami' +
      (d.jawaban ? ' (' + String(d.jawaban) + ')' : '') + '.';
    const url = 'https://wa.me/' + nomorWa(d.wa) + '?text=' + encodeURIComponent(sapaan);
    const label = ('Chat ' + String(d.nama || '')).replace(/"/g, '""');
    tab.getRange(baris, 8).setFormula('=HYPERLINK("' + url + '","' + label + '")');
    return balas({ ok: true });
  } catch (err) {
    return balas({ ok: false, galat: String(err) });
  } finally {
    kunci.releaseLock();
  }
}

/** 0812... atau +62812... menjadi 62812... untuk link wa.me. */
function nomorWa(nilai) {
  const angka = String(nilai || '').replace(/\D/g, '');
  if (angka.indexOf('0') === 0) return '62' + angka.slice(1);
  if (angka.indexOf('8') === 0) return '62' + angka;
  return angka;
}

/** Cegah isian dibaca sebagai rumus (mis. diawali "=") dan potong yang terlalu panjang. */
function aman(nilai) {
  const s = String(nilai || '').slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function balas(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
