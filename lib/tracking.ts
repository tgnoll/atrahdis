/**
 * Menyimpan sumber kunjungan (gclid, fbclid, UTM) saat pertama mendarat,
 * supaya ikut terkirim bersama form walau pengunjung pindah halaman dulu.
 */
const KUNCI = "atrahdis_sumber";
const PARAM = ["gclid", "gbraid", "wbraid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export type Sumber = Record<string, string>;

export function simpanSumber() {
  try {
    const q = new URLSearchParams(window.location.search);
    const baru: Sumber = {};
    for (const p of PARAM) {
      const v = q.get(p);
      if (v) baru[p] = v;
    }
    if (Object.keys(baru).length === 0) return;
    baru.halaman_masuk = window.location.pathname;
    window.sessionStorage.setItem(KUNCI, JSON.stringify(baru));
  } catch {
    // sessionStorage bisa diblokir; form tetap jalan tanpa data sumber.
  }
}

export function bacaSumber(): Sumber {
  try {
    return JSON.parse(window.sessionStorage.getItem(KUNCI) ?? "{}");
  } catch {
    return {};
  }
}

/** Ringkas sumber jadi satu baris pendek untuk pesan WhatsApp. */
export function labelSumber(s: Sumber): string {
  if (s.gclid || s.gbraid || s.wbraid) return `Google Ads${s.utm_campaign ? ` (${s.utm_campaign})` : ""}`;
  if (s.fbclid) return `Meta Ads${s.utm_campaign ? ` (${s.utm_campaign})` : ""}`;
  if (s.utm_source) return [s.utm_source, s.utm_medium, s.utm_campaign].filter(Boolean).join(" / ");
  return "";
}

type Pelacak = {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

/**
 * Kirim event form ke Meta Pixel / Google tag kalau sudah terpasang. Tanpa pixel, tidak melakukan apa-apa.
 * `lead = true` juga mengirim event standar "Lead" (Meta) dan "generate_lead" (Google).
 */
export function kirimEvent(nama: string, data: Record<string, string> = {}, lead = false) {
  try {
    const w = window as unknown as Pelacak;
    w.fbq?.("trackCustom", nama, data);
    w.gtag?.("event", nama, data);
    w.dataLayer?.push({ event: nama, ...data });
    if (lead) {
      w.fbq?.("track", "Lead", data);
      w.gtag?.("event", "generate_lead", data);
    }
  } catch {
    // Pelacakan tidak boleh menghentikan form.
  }
}
