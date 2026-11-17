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
const KOLOM = [
  'Waktu (WIB)', 'Nama', 'WhatsApp', 'Perusahaan', 'Jawaban', 'Halaman', 'Sumber',
  'gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'Halaman masuk', 'Kualitas Lead', 'Dihubungi',
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
      aman(d.sumber), aman(gclid), aman(d.fbclid), aman(d.utm_source), aman(d.utm_medium),
      aman(d.utm_campaign), aman(d.utm_content), aman(d.utm_term), aman(d.halaman_masuk), '', '',
    ]);
    return balas({ ok: true });
  } catch (err) {
    return balas({ ok: false, galat: String(err) });
  } finally {
    kunci.releaseLock();
  }
}

/** Cegah isian dibaca sebagai rumus (mis. diawali "=") dan potong yang terlalu panjang. */
function aman(nilai) {
  const s = String(nilai || '').slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function balas(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
