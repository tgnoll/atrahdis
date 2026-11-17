"use client";

import { useEffect, useId, useRef, useState } from "react";
import { waLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { bacaSumber, kirimEvent, labelSumber, simpanSumber } from "@/lib/tracking";

/** Satu grup pilihan di langkah 1. Pengunjung cukup klik, tidak mengetik. */
export type Pertanyaan = {
  /** Label di atas pilihan, mis. "Apa yang ingin diurus?" */
  label: string;
  /** Label pendek untuk pesan WhatsApp, mis. "Kebutuhan" */
  ringkas: string;
  opsi: string[];
  /** Wajib dipilih sebelum lanjut ke langkah 2. */
  wajib?: boolean;
};

export const PERTANYAAN_UMUM: Pertanyaan[] = [
  {
    label: "Apa yang ingin diurus?",
    ringkas: "Kebutuhan",
    opsi: ["SBU baru", "Perpanjangan SBU", "Naik kualifikasi", "SKK tenaga ahli", "Belum yakin"],
    wajib: true,
  },
  {
    label: "Target kualifikasi SBU",
    ringkas: "Kualifikasi",
    opsi: ["Kecil (K)", "Menengah (M)", "Besar (B)", "Belum tahu"],
  },
  {
    label: "Kapan dibutuhkan?",
    ringkas: "Waktu",
    opsi: ["Segera, ada tender < 1 bulan", "1–3 bulan lagi", "Baru cari info"],
  },
];

const kelasDasar =
  "min-h-[50px] rounded-[10px] border-[1.5px] border-garis-input bg-white px-3.5 py-3 text-base text-navy placeholder:text-teks-muted/70";
const kelasLabel = "text-sm font-bold text-navy";
const kelasTombol =
  "min-h-14 w-full cursor-pointer rounded-[10px] px-6 py-4 text-base font-extrabold tracking-[0.5px] transition-colors";

/**
 * Form penyaring 2 langkah sebelum WhatsApp.
 * Langkah 1: klik pilihan kebutuhan (tanpa mengetik, supaya orang mulai mengisi).
 * Langkah 2: nama, WhatsApp, dan perusahaan.
 * Saat dikirim: membuka WhatsApp dengan pesan terisi (jawaban + sumber iklan), lalu tampil layar terima kasih.
 * TODO: kirim juga ke Google Sheet "Leads Atrahdis" lewat app/api/lead.
 */
export function FormKonsultasi({
  pertanyaan = PERTANYAAN_UMUM,
  judulLangkah1 = "Ceritakan kebutuhan Anda",
  judulLangkah2 = "Ke mana hasil audit dikirim?",
  tombolKirim = "KIRIM & TERIMA HASIL AUDIT DI WHATSAPP",
  pesanPembuka = "Halo Atrahdis, saya ingin konsultasi.",
}: {
  pertanyaan?: Pertanyaan[];
  judulLangkah1?: string;
  judulLangkah2?: string;
  tombolKirim?: string;
  pesanPembuka?: string;
}) {
  const id = useId();
  const [langkah, setLangkah] = useState<1 | 2 | 3>(1);
  const [jawaban, setJawaban] = useState<Record<string, string>>({});
  const [galat, setGalat] = useState("");
  const [linkWa, setLinkWa] = useState("");
  const judulRef = useRef<HTMLHeadingElement>(null);
  const sudahPindah = useRef(false);

  useEffect(() => {
    simpanSumber();
  }, []);

  // Pindahkan fokus ke judul tiap ganti langkah (pembaca layar & keyboard), kecuali saat halaman baru dimuat.
  useEffect(() => {
    if (!sudahPindah.current) {
      sudahPindah.current = true;
      return;
    }
    judulRef.current?.focus();
  }, [langkah]);

  const ringkasan = pertanyaan
    .map((p) => jawaban[p.ringkas])
    .filter(Boolean)
    .join(" · ");

  function pilih(kunci: string, nilai: string) {
    setJawaban((j) => ({ ...j, [kunci]: nilai }));
    setGalat("");
  }

  function lanjut() {
    const kurang = pertanyaan.find((p) => p.wajib && !jawaban[p.ringkas]);
    if (kurang) return setGalat(`Pilih dulu: ${kurang.label.replace(/\?$/, "").toLowerCase()}.`);
    setGalat("");
    kirimEvent("form_langkah_1", { ...jawaban, halaman: window.location.pathname });
    setLangkah(2);
  }

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
      pesanPembuka,
      "",
      `Nama: ${nama}`,
      `Perusahaan: ${d.get("bentuk")} ${pt}`,
      `No. WhatsApp: ${wa}`,
      ...pertanyaan.map((p) => (jawaban[p.ringkas] ? `${p.ringkas}: ${jawaban[p.ringkas]}` : "")),
      sumber ? `Sumber: ${sumber}` : "",
    ].filter((b, i) => b !== "" || i === 1);

    const link = waLink(baris.join("\n"));
    setLinkWa(link);
    kirimEvent("form_kirim", { ...jawaban, halaman: window.location.pathname }, true);
    window.open(link, "_blank", "noopener");
    setLangkah(3);
  }

  function ulang() {
    setJawaban({});
    setGalat("");
    setLangkah(1);
  }

  return (
    <form
      id="form-konsultasi"
      onSubmit={kirim}
      noValidate
      aria-label="Form audit berkas gratis"
      className="flex w-full max-w-[620px] scroll-mt-28 flex-col gap-[22px] rounded-[20px] border-t-[6px] border-biru bg-white p-5 text-left shadow-[0_16px_40px_rgba(13,34,66,0.10)] sm:p-8"
    >
      {langkah < 3 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 ref={judulRef} tabIndex={-1} className="text-xl font-extrabold text-navy outline-none">
              {langkah === 1 ? judulLangkah1 : judulLangkah2}
            </h3>
            <span className="text-[13px] font-bold text-teks-muted">Langkah {langkah} dari 2</span>
          </div>
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-biru" />
            <span className={`h-1.5 flex-1 rounded-full ${langkah === 2 ? "bg-biru" : "bg-garis"}`} />
          </div>
        </div>
      )}

      {langkah === 1 && (
        <>
          {pertanyaan.map((p, i) => (
            <fieldset key={p.ringkas} className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-2.5 p-0 text-[15px] font-extrabold text-navy">
                {i + 1}. {p.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {p.opsi.map((o) => {
                  const aktif = jawaban[p.ringkas] === o;
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={aktif}
                      onClick={() => pilih(p.ringkas, o)}
                      className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2.5 text-sm text-navy transition-colors ${
                        aktif
                          ? "border-biru bg-biru-muda font-extrabold"
                          : "border-garis-input bg-white font-semibold hover:border-navy"
                      }`}
                    >
                      {aktif && <Icon name="centang" size={16} stroke={3} className="text-biru" />}
                      {o}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {galat && (
            <p role="alert" className="text-sm font-bold text-red-700">
              {galat}
            </p>
          )}

          <div className="flex flex-col gap-2.5">
            <button type="button" onClick={lanjut} className={`${kelasTombol} bg-biru text-white hover:bg-biru-gelap`}>
              LANJUT, TINGGAL 1 LANGKAH →
            </button>
            <span className="text-center text-[13px] text-teks-muted">
              Butuh sekitar 30 detik. Gratis dan tanpa kewajiban lanjut.
            </span>
          </div>
        </>
      )}

      {langkah === 2 && (
        <>
          <div className="flex items-center justify-between gap-3 rounded-[10px] bg-latar-muda px-3.5 py-3">
            <span className="text-sm leading-snug text-navy">
              <strong>Kebutuhan:</strong> {ringkasan}
            </span>
            <button
              type="button"
              onClick={() => setLangkah(1)}
              className="min-h-11 flex-none cursor-pointer px-1 text-sm font-bold text-biru underline"
            >
              Ubah
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-nama`} className={kelasLabel}>
              Nama lengkap
            </label>
            <input id={`${id}-nama`} name="nama" type="text" autoComplete="name" placeholder="Nama Anda" className={`w-full ${kelasDasar}`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-wa`} className={kelasLabel}>
              Nomor WhatsApp
            </label>
            <input id={`${id}-wa`} name="wa" type="tel" autoComplete="tel" inputMode="tel" placeholder="08xx-xxxx-xxxx" className={`w-full ${kelasDasar}`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-pt`} className={kelasLabel}>
              Nama perusahaan
            </label>
            <div className="flex gap-2">
              <select name="bentuk" aria-label="Bentuk badan usaha" className={`${kelasDasar} w-24 flex-none px-2.5`}>
                <option>PT</option>
                <option>CV</option>
                <option>Lainnya</option>
              </select>
              <input id={`${id}-pt`} name="pt" type="text" autoComplete="organization" placeholder="Contoh: Karya Bangun Mandiri" className={`${kelasDasar} min-w-0 flex-1`} />
            </div>
          </div>

          {galat && (
            <p role="alert" className="text-sm font-bold text-red-700">
              {galat}
            </p>
          )}

          <button type="submit" className={`${kelasTombol} mt-1 bg-biru text-white hover:bg-biru-gelap`}>
            {tombolKirim}
          </button>
          <span className="flex items-start justify-center gap-2 text-center text-[13px] leading-normal text-teks-muted">
            <Icon name="gembok" size={16} stroke={2} className="mt-0.5" />
            Data hanya dipakai untuk konsultasi ini. Setelah dikirim, WhatsApp terbuka dengan pesan yang sudah terisi.
          </span>
        </>
      )}

      {langkah === 3 && (
        <div className="flex flex-col items-center gap-3.5 py-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f5ec] text-[#146c3a]">
            <Icon name="centang" size={32} stroke={2.6} />
          </span>
          <h3 ref={judulRef} tabIndex={-1} className="text-[22px] font-extrabold leading-snug text-navy outline-none">
            Data diterima. Hasil audit dikirim lewat WhatsApp.
          </h3>
          {ringkasan && <p className="text-[15px] leading-relaxed text-teks-muted">{ringkasan}</p>}
          <p className="text-[15px] leading-relaxed text-teks-muted">
            WhatsApp terbuka dengan pesan yang sudah terisi. Kalau belum terbuka, klik tombol di bawah.
          </p>
          <a
            href={linkWa}
            target="_blank"
            rel="noopener"
            className="flex min-h-[52px] items-center gap-2 rounded-[10px] bg-hijau px-6 py-3.5 text-[15px] font-extrabold text-white no-underline hover:text-white"
          >
            <Icon name="chat" size={20} stroke={1.8} />
            BUKA WHATSAPP
          </a>
          <button type="button" onClick={ulang} className="min-h-11 cursor-pointer text-sm font-bold text-teks-muted underline">
            Isi ulang form
          </button>
        </div>
      )}
    </form>
  );
}
