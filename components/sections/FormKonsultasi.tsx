"use client";

import { useEffect, useId, useRef, useState } from "react";
import { waLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { bacaSumber, kirimEvent, labelSumber, simpanSumber } from "@/lib/tracking";

/** Satu grup pilihan di bagian atas form. Pengunjung cukup klik, tidak mengetik. */
export type Pertanyaan = {
  /** Label di atas pilihan, mis. "Apa yang ingin diurus?" */
  label: string;
  /** Label pendek untuk pesan WhatsApp, mis. "Kebutuhan" */
  ringkas: string;
  opsi: string[];
  /** Wajib dipilih sebelum form bisa dikirim. */
  wajib?: boolean;
  /** Boleh pilih lebih dari satu, sampai jumlah ini. Kosong = satu pilihan saja. */
  maks?: number;
  /** Pasangan pilihan yang tidak boleh dipilih bersamaan; memilih satu mengganti pasangannya. */
  bentrok?: [string, string][];
  /** Pilihan yang harus berdiri sendiri (mis. "Belum yakin"). */
  sendiri?: string[];
};

/** Aturan pilihan kebutuhan: maks 2, SBU baru tidak bisa bersama perpanjangan, "Belum yakin" berdiri sendiri. */
export const ATURAN_KEBUTUHAN = {
  maks: 2,
  bentrok: [["SBU baru", "Perpanjangan SBU"]] as [string, string][],
  sendiri: ["Belum yakin"],
};

export const PERTANYAAN_UMUM: Pertanyaan[] = [
  {
    label: "Apa yang ingin diurus?",
    ringkas: "Kebutuhan",
    opsi: ["SBU baru", "Perpanjangan SBU", "Naik kualifikasi", "SKK tenaga ahli", "Belum yakin"],
    wajib: true,
    ...ATURAN_KEBUTUHAN,
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

/** Pilihan panjang berketerangan dalam kurung, mis. "Bangunan gedung (rumah, ruko, kantor, sekolah)". */
const POLA_KET = /^(.*?) \((.+)\)$/;

const kelasDasar =
  "min-h-[50px] rounded-[10px] border-[1.5px] border-garis-input bg-white px-3.5 py-3 text-base text-navy placeholder:text-teks-muted/70";
const kelasLabel = "text-sm font-bold text-navy";
const kelasTombol =
  "min-h-14 w-full cursor-pointer rounded-[10px] px-6 py-4 text-base font-extrabold tracking-[0.5px] transition-colors";

/**
 * Form penyaring satu halaman sebelum WhatsApp.
 * Atas: klik pilihan kebutuhan (tanpa mengetik). Bawah: nama, WhatsApp, dan perusahaan.
 * Saat dikirim: data disimpan lewat /api/lead (ke Sheet "Leads Atrahdis"), WhatsApp terbuka dengan
 * pesan terisi (jawaban + sumber iklan), lalu tampil layar terima kasih.
 */
export function FormKonsultasi({
  pertanyaan = PERTANYAAN_UMUM,
  judul = "Ceritakan kebutuhan Anda",
  judulKontak = "Ke mana hasil audit dikirim?",
  tombolKirim = "KIRIM & TERIMA HASIL AUDIT DI WHATSAPP",
  pesanPembuka = "Halo Atrahdis, saya ingin konsultasi.",
}: {
  pertanyaan?: Pertanyaan[];
  judul?: string;
  judulKontak?: string;
  tombolKirim?: string;
  pesanPembuka?: string;
}) {
  const id = useId();
  const [selesai, setSelesai] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, string[]>>({});
  const [galat, setGalat] = useState("");
  const [linkWa, setLinkWa] = useState("");
  const judulSelesaiRef = useRef<HTMLHeadingElement>(null);
  const sudahMulai = useRef(false);

  useEffect(() => {
    simpanSumber();
  }, []);

  useEffect(() => {
    if (selesai) judulSelesaiRef.current?.focus();
  }, [selesai]);

  const teks = (p: Pertanyaan) => (jawaban[p.ringkas] ?? []).join(" + ");
  const ringkasan = pertanyaan.map(teks).filter(Boolean).join(" · ");
  const jawabanBerlabel = pertanyaan
    .map((p) => (teks(p) ? `${p.ringkas}: ${teks(p)}` : ""))
    .filter(Boolean);
  const dataEvent = () =>
    Object.fromEntries(pertanyaan.map((p) => [p.ringkas, teks(p)]).filter(([, v]) => v));

  /** Event "form_mulai" sekali saja, saat pengunjung pertama kali berinteraksi dengan form. */
  function mulai() {
    if (sudahMulai.current) return;
    sudahMulai.current = true;
    kirimEvent("form_mulai", { halaman: window.location.pathname });
  }

  const bentrok = (p: Pertanyaan, a: string, b: string) =>
    (p.bentrok ?? []).some(([x, y]) => (x === a && y === b) || (x === b && y === a));

  /** Pilihan yang tidak bisa ditambah karena batas maks sudah tercapai (dan tidak mengganti pilihan lain). */
  function terkunci(p: Pertanyaan, o: string) {
    const kini = jawaban[p.ringkas] ?? [];
    if (!p.maks || p.maks < 2 || kini.includes(o) || kini.length < p.maks) return false;
    if (p.sendiri?.includes(o)) return false;
    return !kini.some((x) => bentrok(p, o, x) || p.sendiri?.includes(x));
  }

  function pilih(p: Pertanyaan, o: string) {
    mulai();
    setGalat("");
    setJawaban((j) => {
      const kini = j[p.ringkas] ?? [];
      if (!p.maks || p.maks < 2) return { ...j, [p.ringkas]: [o] };
      if (kini.includes(o)) return { ...j, [p.ringkas]: kini.filter((x) => x !== o) };
      if (p.sendiri?.includes(o)) return { ...j, [p.ringkas]: [o] };
      const sisa = kini.filter((x) => !p.sendiri?.includes(x) && !bentrok(p, o, x));
      if (sisa.length >= p.maks) return j;
      return { ...j, [p.ringkas]: [...sisa, o] };
    });
  }

  function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const nama = String(d.get("nama") ?? "").trim();
    const wa = String(d.get("wa") ?? "").replace(/[^\d+]/g, "");
    const pt = String(d.get("pt") ?? "").trim();
    const perusahaan = `${d.get("bentuk")} ${pt}`;

    const kurang = pertanyaan.find((p) => p.wajib && !(jawaban[p.ringkas] ?? []).length);
    if (kurang) return setGalat(`Pilih dulu: ${kurang.label.replace(/\?$/, "").toLowerCase()}.`);
    if (!nama || !pt) return setGalat("Nama dan nama perusahaan wajib diisi.");
    if (wa.replace(/\D/g, "").length < 9) return setGalat("Nomor WhatsApp belum lengkap.");
    setGalat("");

    const sumber = bacaSumber();
    const label = labelSumber(sumber);
    const baris = [
      pesanPembuka,
      "",
      `Nama: ${nama}`,
      `Perusahaan: ${perusahaan}`,
      `No. WhatsApp: ${wa}`,
      ...jawabanBerlabel,
      label ? `Sumber: ${label}` : "",
    ].filter((b, i) => b !== "" || i === 1);

    const link = waLink(baris.join("\n"));
    setLinkWa(link);
    // Buka WhatsApp dulu (masih dalam klik pengguna, supaya tidak diblokir browser), lalu simpan data.
    window.open(link, "_blank", "noopener");
    fetch("/api/lead", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...sumber,
        nama,
        wa,
        perusahaan,
        jawaban: jawabanBerlabel.join(" · "),
        halaman: window.location.pathname,
        sumber: label,
        website: String(d.get("website") ?? ""),
      }),
    }).catch(() => {
      // Penyimpanan gagal tidak menghentikan pengunjung; pesan WhatsApp tetap terkirim.
    });
    kirimEvent("form_kirim", { ...dataEvent(), halaman: window.location.pathname }, true);
    setSelesai(true);
  }

  function ulang() {
    setJawaban({});
    setGalat("");
    setSelesai(false);
  }

  return (
    <form
      id="form-konsultasi"
      onSubmit={kirim}
      onFocus={mulai}
      noValidate
      aria-label="Form audit berkas gratis"
      className="flex w-full max-w-[620px] scroll-mt-28 flex-col gap-[22px] rounded-[20px] border-t-[6px] border-biru bg-white p-5 text-left shadow-[0_16px_40px_rgba(13,34,66,0.10)] sm:p-8"
    >
      {!selesai && (
        <>
          <h3 className="text-xl font-extrabold text-navy">{judul}</h3>

          {pertanyaan.map((p, i) => (
            <fieldset key={p.ringkas} className="m-0 min-w-0 border-0 p-0">
              <legend className="mb-2.5 p-0 text-[15px] font-extrabold text-navy">
                {i + 1}. {p.label}
                {p.maks && p.maks > 1 && (
                  <span className="font-semibold text-teks-muted"> (boleh pilih {p.maks})</span>
                )}
              </legend>
              <div className="flex flex-wrap gap-2">
                {p.opsi.map((o) => {
                  const aktif = (jawaban[p.ringkas] ?? []).includes(o);
                  // Pilihan berketerangan, mis. "Bangunan gedung (rumah, ruko, ...)", tampil sebagai kartu selebar form.
                  const [, utama, ket] = (o.length > 30 && o.match(POLA_KET)) || [o, o, ""];
                  const kartu = p.opsi.some((x) => x.length > 30 && POLA_KET.test(x));
                  const kunci = terkunci(p, o);
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={aktif}
                      aria-disabled={kunci || undefined}
                      onClick={() => !kunci && pilih(p, o)}
                      className={`flex min-h-11 items-center gap-1.5 border-[1.5px] px-4 py-2.5 text-sm text-navy transition-colors ${
                        kartu ? "w-full rounded-xl text-left" : "rounded-full"
                      } ${
                        aktif
                          ? "cursor-pointer border-biru bg-biru-muda font-extrabold"
                          : kunci
                            ? "cursor-not-allowed border-garis bg-white font-semibold opacity-45"
                            : "cursor-pointer border-garis-input bg-white font-semibold hover:border-navy"
                      }`}
                    >
                      {aktif && <Icon name="centang" size={16} stroke={3} className="text-biru" />}
                      {ket ? (
                        <span className="flex flex-col">
                          <span>{utama}</span>
                          <span className="text-[13px] font-medium text-teks-muted">{ket}</span>
                        </span>
                      ) : (
                        o
                      )}
                    </button>
                  );
                })}
              </div>
              {p.maks && p.maks > 1 && (jawaban[p.ringkas] ?? []).length >= p.maks && (
                <p className="mt-2 text-[13px] text-teks-muted">
                  Sudah {p.maks} pilihan. Klik pilihan yang aktif untuk mengganti.
                </p>
              )}
            </fieldset>
          ))}

          <fieldset className="m-0 flex min-w-0 flex-col gap-3.5 border-0 border-t border-garis p-0 pt-5">
            <legend className="float-left mb-1 w-full p-0 text-[15px] font-extrabold text-navy">
              {pertanyaan.length + 1}. {judulKontak}
            </legend>

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

            {/* Jebakan bot: manusia tidak melihat kolom ini, jadi kalau terisi, lead tidak disimpan. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          </fieldset>

          {galat && (
            <p role="alert" className="text-sm font-bold text-red-700">
              {galat}
            </p>
          )}

          <div className="flex flex-col gap-2.5">
            <button type="submit" className={`${kelasTombol} bg-biru text-white hover:bg-biru-gelap`}>
              {tombolKirim}
            </button>
            <span className="text-center text-[13px] text-teks-muted">
              Isi form sekitar 30 detik. Gratis dan tanpa kewajiban lanjut.
            </span>
            <span className="flex items-start justify-center gap-2 text-center text-[13px] leading-normal text-teks-muted">
              <Icon name="gembok" size={16} stroke={2} className="mt-0.5" />
              Data hanya dipakai untuk konsultasi ini. Setelah dikirim, WhatsApp terbuka dengan pesan yang sudah terisi.
            </span>
          </div>
        </>
      )}

      {selesai && (
        <div className="flex flex-col items-center gap-3.5 py-2 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f5ec] text-[#146c3a]">
            <Icon name="centang" size={32} stroke={2.6} />
          </span>
          <h3 ref={judulSelesaiRef} tabIndex={-1} className="text-[22px] font-extrabold leading-snug text-navy outline-none">
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
