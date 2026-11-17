/**
 * Menyimpan lead dari form konsultasi web ke Google Sheet "Leads Atrahdis" (tab "Lead Web").
 *
 * Alurnya: form → POST /api/lead → Google Apps Script (web app di Sheet) → baris baru di tab "Lead Web".
 * Butuh dua environment variable di Vercel:
 *   LEAD_WEBHOOK_URL   = URL web app Apps Script (berakhiran /exec)
 *   LEAD_WEBHOOK_TOKEN = token rahasia yang sama dengan konstanta TOKEN di Apps Script
 * Kalau belum diisi, form tetap jalan (WhatsApp tetap terbuka), hanya datanya belum tersimpan.
 */

const PANJANG_MAKS = 300;
const KOLOM_SUMBER = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "halaman_masuk",
] as const;

function teks(nilai: unknown) {
  return typeof nilai === "string" ? nilai.trim().slice(0, PANJANG_MAKS) : "";
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, galat: "Format data tidak valid." }, { status: 400 });
  }

  // Kolom jebakan terisi berarti bot: balas "ok" supaya bot tidak mencoba lagi, tapi jangan disimpan.
  if (teks(data.website)) return Response.json({ ok: true });

  const lead = {
    nama: teks(data.nama),
    wa: teks(data.wa).replace(/[^\d+]/g, ""),
    perusahaan: teks(data.perusahaan),
    jawaban: teks(data.jawaban),
    halaman: teks(data.halaman),
    sumber: teks(data.sumber),
    ...Object.fromEntries(KOLOM_SUMBER.map((k) => [k, teks(data[k])])),
  };

  if (!lead.nama || !lead.perusahaan || lead.wa.replace(/\D/g, "").length < 9) {
    return Response.json({ ok: false, galat: "Nama, perusahaan, dan nomor WhatsApp wajib diisi." }, { status: 400 });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead] LEAD_WEBHOOK_URL belum diisi di Vercel; lead tidak disimpan ke Sheet.");
    return Response.json({ ok: true, tersimpan: false });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // Apps Script membaca body sebagai teks; text/plain menghindari masalah CORS/preflight.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ token: process.env.LEAD_WEBHOOK_TOKEN ?? "", ...lead }),
      redirect: "follow",
      cache: "no-store",
    });
    const hasil = (await res.json().catch(() => null)) as { ok?: boolean; galat?: string } | null;
    if (!res.ok || !hasil?.ok) {
      console.error("[lead] Gagal menyimpan ke Sheet:", res.status, hasil?.galat ?? "");
      return Response.json({ ok: false, tersimpan: false }, { status: 502 });
    }
    return Response.json({ ok: true, tersimpan: true });
  } catch (err) {
    console.error("[lead] Tidak bisa menghubungi Apps Script:", err);
    return Response.json({ ok: false, tersimpan: false }, { status: 502 });
  }
}
