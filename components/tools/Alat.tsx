"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { waLink } from "@/content/site";
import {
  BIDANG_SKK,
  CEK_NIB,
  DOKUMEN_DASAR,
  DOKUMEN_TAMBAHAN,
  ESTIMASI_WAKTU,
  JENJANG_PER_KUALIFIKASI,
  MASALAH_OSS,
  PLAYBOOK,
} from "@/content/tools";
import { CheckList, Icon } from "@/components/ui/Icon";

const kartu = "flex w-full max-w-[720px] flex-col gap-5 rounded-[20px] border-t-[6px] border-biru bg-white p-5 shadow-[0_16px_40px_rgba(13,34,66,0.10)] sm:p-8";
const label = "text-[15px] font-extrabold text-navy";
const isian = "min-h-[50px] w-full rounded-[10px] border-[1.5px] border-garis-input bg-white px-3.5 py-3 text-base text-navy";
const tombol = "min-h-14 w-full cursor-pointer rounded-[10px] bg-biru px-6 py-4 text-base font-extrabold tracking-[0.5px] text-white transition-colors hover:bg-biru-gelap";
const tombolWa = "flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] bg-hijau px-6 py-3.5 text-[15px] font-extrabold text-white no-underline hover:text-white";

function Pilihan({ opsi, nilai, ubah, nama }: { opsi: string[]; nilai: string; ubah: (v: string) => void; nama: string }) {
  return (
    <div role="radiogroup" aria-label={nama} className="flex flex-wrap gap-2">
      {opsi.map((o) => {
        const aktif = o === nilai;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={aktif}
            onClick={() => ubah(o)}
            className={`flex min-h-11 items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2.5 text-sm text-navy transition-colors ${
              aktif ? "border-biru bg-[#eaf2fc] font-bold" : "border-garis-input bg-white hover:border-biru"
            }`}
          >
            {aktif && <Icon name="centang" size={16} stroke={3} className="text-biru" />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Hasil({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4 rounded-[14px] bg-latar-muda p-5" aria-live="polite">{children}</div>;
}

function TombolWa({ pesan, label: teks }: { pesan: string; label: string }) {
  return (
    <a href={waLink(pesan)} target="_blank" rel="noopener" className={tombolWa}>
      <Icon name="chat" size={20} stroke={2} />
      {teks}
    </a>
  );
}

/* ───────── Kalkulator kebutuhan SBU ───────── */
export function AlatKalkulator() {
  const [entitas, setEntitas] = useState("");
  const [kualifikasi, setKualifikasi] = useState("");
  const [skk, setSkk] = useState("");
  const [tampil, setTampil] = useState(false);
  const [galat, setGalat] = useState("");

  const hitung = () => {
    if (!entitas || !kualifikasi || !skk) {
      setGalat("Pilih jenis badan usaha, kualifikasi, dan kebutuhan SKK dulu.");
      setTampil(false);
      return;
    }
    setGalat("");
    setTampil(true);
  };

  const dokumen = kualifikasi
    ? [
        ...DOKUMEN_DASAR,
        ...DOKUMEN_TAMBAHAN[kualifikasi],
        ...(skk === "Ya, belum punya" ? ["SKK tenaga ahli (kami bantu urus)"] : ["SKK tenaga ahli yang masih aktif"]),
        ...(entitas === "BUJKA" ? ["Dokumen kemitraan dan perizinan BUJKA"] : []),
      ]
    : [];

  return (
    <div className={kartu}>
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>1. Jenis badan usaha</legend>
        <Pilihan nama="Jenis badan usaha" opsi={["PT", "CV", "Koperasi", "BUJKA"]} nilai={entitas} ubah={setEntitas} />
      </fieldset>
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>2. Kualifikasi SBU</legend>
        <Pilihan nama="Kualifikasi SBU" opsi={["Kecil", "Menengah", "Besar"]} nilai={kualifikasi} ubah={setKualifikasi} />
      </fieldset>
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>3. Butuh SKK tenaga ahli?</legend>
        <Pilihan nama="Kebutuhan SKK" opsi={["Ya, belum punya", "Tidak, sudah ada"]} nilai={skk} ubah={setSkk} />
      </fieldset>
      {galat && <p role="alert" className="text-sm font-bold text-red-700">{galat}</p>}
      <button type="button" onClick={hitung} className={tombol}>LIHAT ESTIMASI</button>
      {tampil && (
        <Hasil>
          <div>
            <p className="text-sm font-bold text-teks-muted">Estimasi waktu</p>
            <p className="text-base text-navy">{ESTIMASI_WAKTU[kualifikasi]}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold text-teks-muted">Dokumen wajib</p>
            <CheckList items={dokumen} className="text-[15px]" />
          </div>
          <div>
            <p className="text-sm font-bold text-teks-muted">Biaya</p>
            <p className="text-base text-navy">Dihitung setelah audit dokumen gratis, karena bergantung pada subklasifikasi dan kondisi berkas.</p>
          </div>
          <TombolWa
            label="Minta Rincian Biaya via WhatsApp"
            pesan={`Halo Atrahdis, saya ingin rincian biaya SBU. Badan usaha: ${entitas}. Kualifikasi: ${kualifikasi}. SKK: ${skk}.`}
          />
        </Hasil>
      )}
    </div>
  );
}

/* ───────── Audit kesiapan NIB ───────── */
export function AlatNib() {
  const id = useId();
  const [nib, setNib] = useState("");
  const [cek, setCek] = useState<Record<string, boolean>>({});
  const [tampil, setTampil] = useState(false);
  const [galat, setGalat] = useState("");

  const audit = () => {
    if (!/^\d{13}$/.test(nib.replace(/\s/g, ""))) {
      setGalat("NIB harus 13 digit angka.");
      setTampil(false);
      return;
    }
    setGalat("");
    setTampil(true);
  };

  const sudah = CEK_NIB.filter((c) => cek[c.id]).length;
  const skor = Math.round((sudah / CEK_NIB.length) * 100);
  const kurang = CEK_NIB.filter((c) => !cek[c.id]).map((c) => c.label);
  const status = skor === 100 ? "Siap diajukan" : skor >= 60 ? "Hampir siap" : "Perlu dirapikan dulu";

  return (
    <div className={kartu}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-nib`} className={label}>1. Nomor NIB (13 digit)</label>
        <input
          id={`${id}-nib`}
          inputMode="numeric"
          maxLength={15}
          value={nib}
          onChange={(e) => {
            setNib(e.target.value);
            setGalat("");
          }}
          placeholder="Contoh: 9120001234567"
          className={isian}
        />
      </div>
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>2. Centang kondisi yang sudah terpenuhi</legend>
        {CEK_NIB.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-start gap-3 text-[15px] text-navy">
            <input
              type="checkbox"
              checked={!!cek[c.id]}
              onChange={(e) => setCek({ ...cek, [c.id]: e.target.checked })}
              className="mt-1 h-5 w-5 flex-none accent-[#1f5fbf]"
            />
            {c.label}
          </label>
        ))}
      </fieldset>
      {galat && <p role="alert" className="text-sm font-bold text-red-700">{galat}</p>}
      <button type="button" onClick={audit} className={tombol}>AUDIT SEKARANG</button>
      {tampil && (
        <Hasil>
          <div className="flex items-baseline gap-3">
            <span className="text-[40px] font-extrabold leading-none text-navy">{skor}%</span>
            <span className="text-base font-bold text-teks-muted">{status}</span>
          </div>
          {kurang.length > 0 ? (
            <div>
              <p className="mb-2 text-sm font-bold text-teks-muted">Yang masih perlu dirapikan</p>
              <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[15px] text-navy">
                {kurang.map((k) => <li key={k}>{k}</li>)}
              </ul>
            </div>
          ) : (
            <p className="text-[15px] text-navy">Semua kondisi dasar terpenuhi. Kami tetap sarankan audit berkas sebelum pengajuan.</p>
          )}
          <TombolWa
            label="Konsultasikan Hasil Audit"
            pesan={`Halo Atrahdis, saya sudah cek kesiapan NIB ${nib.replace(/\s/g, "")}. Skor: ${skor}%. Yang masih kurang: ${kurang.join("; ") || "tidak ada"}.`}
          />
        </Hasil>
      )}
    </div>
  );
}

/* ───────── Pembaca masalah OSS ───────── */
export function AlatOss() {
  const id = useId();
  const [kode, setKode] = useState("");
  const m = MASALAH_OSS.find((x) => x.kode === kode);
  return (
    <div className={kartu}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-kode`} className={label}>Masalah yang muncul</label>
        <select id={`${id}-kode`} value={kode} onChange={(e) => setKode(e.target.value)} className={isian}>
          <option value="">Pilih masalah...</option>
          {MASALAH_OSS.map((x) => (
            <option key={x.kode} value={x.kode}>{x.kode} · {x.nama}</option>
          ))}
        </select>
      </div>
      {m && (
        <Hasil>
          <div>
            <p className="text-sm font-bold text-teks-muted">Penyebab yang umum</p>
            <p className="text-base text-navy">{m.sebab}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold text-teks-muted">Langkah perbaikan</p>
            <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[15px] text-navy">
              {m.langkah.map((l) => <li key={l}>{l}</li>)}
            </ol>
          </div>
          <TombolWa label="Minta Bantuan via WhatsApp" pesan={`Halo Atrahdis, pengajuan SBU saya terkendala: ${m.kode} ${m.nama}.`} />
        </Hasil>
      )}
    </div>
  );
}

/* ───────── Pemilih jenjang SKK ───────── */
export function AlatSkk() {
  const id = useId();
  const [bidang, setBidang] = useState("");
  const [kualifikasi, setKualifikasi] = useState("");
  const [tampil, setTampil] = useState(false);
  const [galat, setGalat] = useState("");
  const j = JENJANG_PER_KUALIFIKASI[kualifikasi];

  const lihat = () => {
    if (!bidang || !kualifikasi) {
      setGalat("Pilih bidang pekerjaan dan kualifikasi SBU dulu.");
      setTampil(false);
      return;
    }
    setGalat("");
    setTampil(true);
  };

  return (
    <div className={kartu}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-bidang`} className={label}>1. Bidang pekerjaan</label>
        <select id={`${id}-bidang`} value={bidang} onChange={(e) => setBidang(e.target.value)} className={isian}>
          <option value="">Pilih bidang...</option>
          {BIDANG_SKK.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <fieldset className="flex flex-col gap-2.5">
        <legend className={`${label} mb-2.5`}>2. Kualifikasi SBU yang dituju</legend>
        <Pilihan nama="Kualifikasi SBU" opsi={["Kecil", "Menengah", "Besar"]} nilai={kualifikasi} ubah={setKualifikasi} />
      </fieldset>
      {galat && <p role="alert" className="text-sm font-bold text-red-700">{galat}</p>}
      <button type="button" onClick={lihat} className={tombol}>LIHAT JENJANG</button>
      {tampil && j && (
        <Hasil>
          <div>
            <p className="text-sm font-bold text-teks-muted">Perkiraan jenjang minimal</p>
            <p className="text-2xl font-extrabold text-navy">{j.jenjang}</p>
            <p className="text-[15px] text-teks-muted">{j.ket} Untuk {bidang.toLowerCase()}, subklasifikasi SKK harus sama dengan subklasifikasi SBU.</p>
          </div>
          <p className="text-[15px] text-navy">
            Jenjang pasti dan jumlah tenaga ahli kami pastikan saat audit, karena bergantung pada subklasifikasi dan peran (PJTBU atau PJSKBU).
          </p>
          <Link href={j.href} className="text-[15px] font-extrabold text-oranye-teks">Lihat layanan SKK {j.jenjang} →</Link>
          <TombolWa label="Konsultasi SKK via WhatsApp" pesan={`Halo Atrahdis, saya butuh SKK untuk ${bidang.toLowerCase()}, SBU ${kualifikasi}.`} />
        </Hasil>
      )}
    </div>
  );
}

/* ───────── Checklist pengurusan SBU ───────── */
const KUNCI = "atrahdis_playbook";

export function AlatPlaybook() {
  const [cek, setCek] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setCek(JSON.parse(window.localStorage.getItem(KUNCI) ?? "{}"));
    } catch {
      // localStorage bisa diblokir; checklist tetap jalan tanpa simpanan.
    }
  }, []);

  const ubah = (k: string, v: boolean) => {
    const baru = { ...cek, [k]: v };
    setCek(baru);
    try {
      window.localStorage.setItem(KUNCI, JSON.stringify(baru));
    } catch {}
  };

  return (
    <div className="flex w-full max-w-[880px] flex-col gap-5">
      {PLAYBOOK.map((t, i) => {
        const selesai = t.items.filter((_, j) => cek[`${i}-${j}`]).length;
        return (
          <fieldset key={t.tahap} className="flex flex-col gap-3 rounded-[14px] border border-garis bg-white p-6">
            <legend className="sr-only">{t.tahap}</legend>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-extrabold text-navy">{i + 1}. {t.tahap}</h3>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${selesai === t.items.length ? "bg-[#e7f5ec] text-[#146c3a]" : "bg-latar-muda text-teks-muted"}`}>
                {selesai}/{t.items.length}
              </span>
            </div>
            {t.items.map((it, j) => (
              <label key={it} className="flex cursor-pointer items-start gap-3 text-[15px] text-navy">
                <input
                  type="checkbox"
                  checked={!!cek[`${i}-${j}`]}
                  onChange={(e) => ubah(`${i}-${j}`, e.target.checked)}
                  className="mt-1 h-5 w-5 flex-none accent-[#1f5fbf]"
                />
                {it}
              </label>
            ))}
          </fieldset>
        );
      })}
    </div>
  );
}
