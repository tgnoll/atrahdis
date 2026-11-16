"use client";

import { useEffect, useId, useState } from "react";
import { waLink } from "@/content/site";
import { bacaSumber, labelSumber, simpanSumber } from "@/lib/tracking";

const KEBUTUHAN_UMUM = [
  "SBU baru",
  "Perpanjangan SBU",
  "Naik kualifikasi",
  "SKK tenaga ahli",
  "Dokumen pendukung tender",
  "Belum yakin",
];

const kelasDasar =
  "rounded-lg border border-garis-input bg-white px-3.5 py-3 text-[15px] text-navy placeholder:text-teks-muted/70";
const kelasInput = `w-full ${kelasDasar}`;
const kelasLabel = "text-[13px] font-bold text-navy";

/**
 * Form penyaring sebelum WhatsApp.
 * Saat dikirim: membuka WhatsApp dengan pesan terisi (nama, perusahaan, kebutuhan, sumber iklan).
 * TODO tahap 7: kirim juga ke Google Sheet "Leads Atrahdis" lewat app/api/lead.
 */
export function FormKonsultasi({
  judul = "Klaim audit berkas gratis",
  keterangan,
  tombol = "KIRIM & DAPATKAN CHECKLIST GRATIS",
  kebutuhan = KEBUTUHAN_UMUM,
  tanyaKualifikasi = false,
}: {
  judul?: string;
  keterangan?: string;
  tombol?: string;
  kebutuhan?: string[];
  tanyaKualifikasi?: boolean;
}) {
  const id = useId();
  const [galat, setGalat] = useState("");

  useEffect(() => {
    simpanSumber();
  }, []);

  function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nama = String(d.get("nama") ?? "").trim();
    const wa = String(d.get("wa") ?? "").replace(/[^\d+]/g, "");
    const pt = String(d.get("pt") ?? "").trim();

    if (!nama || !pt) return setGalat("Nama dan nama perusahaan wajib diisi.");
    if (wa.replace(/\D/g, "").length < 9) return setGalat("Nomor WhatsApp belum lengkap.");
    setGalat("");

    const sumber = labelSumber(bacaSumber());
    const baris = [
      "Halo Atrahdis, saya ingin konsultasi.",
      "",
      `Nama: ${nama}`,
      `Perusahaan: ${d.get("bentuk")} ${pt}`,
      `No. WhatsApp: ${wa}`,
      `Kebutuhan: ${d.get("kebutuhan")}`,
      tanyaKualifikasi ? `Kualifikasi dituju: ${d.get("kualifikasi")}` : "",
      sumber ? `Sumber: ${sumber}` : "",
    ].filter((b, i) => b !== "" || i === 1);

    window.open(waLink(baris.join("\n")), "_blank", "noopener");
  }

  return (
    <form
      id="form-konsultasi"
      onSubmit={kirim}
      noValidate
      className="flex w-full max-w-[520px] scroll-mt-28 flex-col gap-3.5 rounded-2xl bg-white p-7 text-left shadow-[0_16px_40px_rgba(8,24,49,0.28)]"
    >
      <div className="flex flex-col gap-1">
        <span className="text-lg font-extrabold text-navy">{judul}</span>
        {keterangan && <span className="text-[13px] leading-normal text-teks-muted">{keterangan}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-nama`} className={kelasLabel}>
          Nama lengkap
        </label>
        <input id={`${id}-nama`} name="nama" type="text" autoComplete="name" placeholder="Nama Anda" className={kelasInput} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-wa`} className={kelasLabel}>
          Nomor WhatsApp
        </label>
        <input id={`${id}-wa`} name="wa" type="tel" autoComplete="tel" inputMode="tel" placeholder="08xx-xxxx-xxxx" className={kelasInput} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-pt`} className={kelasLabel}>
          Nama perusahaan (wajib)
        </label>
        <div className="flex gap-2">
          <select name="bentuk" aria-label="Bentuk badan usaha" className={`${kelasDasar} w-[92px] flex-none px-2.5`}>
            <option>PT</option>
            <option>CV</option>
            <option>Lainnya</option>
          </select>
          <input id={`${id}-pt`} name="pt" type="text" autoComplete="organization" placeholder="Contoh: Karya Bangun Mandiri" className={`${kelasDasar} min-w-0 flex-1`} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
          <label htmlFor={`${id}-butuh`} className={kelasLabel}>
            Kebutuhan
          </label>
          <select id={`${id}-butuh`} name="kebutuhan" className={kelasInput}>
            {kebutuhan.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        {tanyaKualifikasi && (
          <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-1.5">
            <label htmlFor={`${id}-kual`} className={kelasLabel}>
              Kualifikasi yang dituju
            </label>
            <select id={`${id}-kual`} name="kualifikasi" className={kelasInput}>
              <option>Kecil (K)</option>
              <option>Menengah (M)</option>
              <option>Besar (B)</option>
              <option>Belum tahu</option>
            </select>
          </div>
        )}
      </div>

      {galat && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {galat}
        </p>
      )}

      <button
        type="submit"
        className="mt-1 min-h-12 cursor-pointer rounded-lg bg-oranye px-6 py-3.5 text-[15px] font-extrabold tracking-[0.5px] text-navy transition-colors hover:bg-oranye-gelap"
      >
        {tombol}
      </button>
      <span className="text-center text-xs leading-normal text-teks-muted">
        Data hanya dipakai untuk konsultasi ini. Setelah dikirim, WhatsApp terbuka dengan pesan yang
        sudah terisi.
      </span>
    </form>
  );
}
