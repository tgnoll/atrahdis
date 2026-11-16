"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

export const menu = [
  { href: "/", label: "Beranda" },
  { href: "/jasa-sbu", label: "Jasa SBU Baru" },
  { href: "/perpanjangan-sbu", label: "Perpanjangan SBU" },
];

/** Tautan setelah dropdown "Layanan". */
export const menuAkhir = [
  { href: "/tentang", label: "Tentang" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

/** Isi dropdown "Layanan". */
export const menuLayanan: { href: string; label: string; ringkas: string; ikon: IconName }[] = [
  {
    href: "/jasa-sbu",
    label: "Jasa Pengurusan SBU",
    ringkas: "SBU baru, perpanjangan, naik kualifikasi",
    ikon: "dokumen",
  },
  {
    href: "/jasa-skk",
    label: "Jasa Pembuatan SKK",
    ringkas: "SKK tenaga ahli jenjang 5–9",
    ikon: "orang",
  },
  {
    href: "/layanan#pendukung",
    label: "Layanan Lainnya",
    ringkas: "KAP, ISO 37001, SMK3, Bank Garansi",
    ikon: "koper",
  },
];

const halamanLayanan = ["/jasa-skk", "/layanan"];

function useAktif() {
  const pathname = usePathname();
  return {
    pathname,
    aktif: (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    layananAktif: halamanLayanan.some((h) => pathname.startsWith(h)),
  };
}

const warna = (aktif: boolean) => (aktif ? "text-oranye-teks" : "text-navy");

/** Menu desktop: 3 tautan + dropdown "Layanan". */
export function NavLinks() {
  const { pathname, aktif, layananAktif } = useAktif();
  const [buka, setBuka] = useState(false);
  const wadah = useRef<HTMLDivElement>(null);
  const idPanel = useId();
  const mouseDiDalam = useRef(false);

  // Tutup saat pindah halaman (termasuk tombol back), klik di luar, atau tekan Esc.
  const [pathTerakhir, setPathTerakhir] = useState(pathname);
  if (pathTerakhir !== pathname) {
    setPathTerakhir(pathname);
    setBuka(false);
  }
  useEffect(() => {
    if (!buka) return;
    const klikLuar = (e: MouseEvent) => {
      if (!wadah.current?.contains(e.target as Node)) setBuka(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setBuka(false);
    document.addEventListener("mousedown", klikLuar);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", klikLuar);
      document.removeEventListener("keydown", esc);
    };
  }, [buka]);

  return (
    <>
      {menu.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(m.href) ? "page" : undefined}
          className={`no-underline ${warna(aktif(m.href))}`}
        >
          {m.label}
        </Link>
      ))}

      <div
        ref={wadah}
        className="relative"
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          mouseDiDalam.current = true;
          setBuka(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          mouseDiDalam.current = false;
          setBuka(false);
        }}
      >
        <button
          type="button"
          aria-expanded={buka}
          aria-controls={idPanel}
          // Mouse: sudah terbuka lewat hover, klik tidak menutupnya. Sentuh/keyboard: buka-tutup.
          onClick={() => setBuka((b) => (mouseDiDalam.current ? true : !b))}
          className={`flex items-center gap-1 font-semibold ${warna(layananAktif)}`}
        >
          Layanan
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform ${buka ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* pt-3 = jembatan supaya kursor tidak "jatuh" di celah antara tombol dan panel. */}
        <div
          id={idPanel}
          hidden={!buka}
          className="absolute right-0 top-full z-50 pt-3"
        >
          <div className="flex w-[340px] flex-col rounded-xl border border-garis bg-white p-2 shadow-xl">
            {menuLayanan.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setBuka(false)}
                className="flex items-start gap-3 rounded-lg p-3 no-underline hover:bg-latar-muda"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-oranye-muda text-oranye-teks">
                  <Icon name={l.ikon} size={21} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold text-navy">{l.label}</span>
                  <span className="text-[13px] font-medium text-teks-muted">{l.ringkas}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {menuAkhir.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(m.href) ? "page" : undefined}
          className={`no-underline ${warna(aktif(m.href))}`}
        >
          {m.label}
        </Link>
      ))}
    </>
  );
}

/** Menu HP/tablet: tautan biasa, sub-layanan ditampilkan menjorok di bawah "Layanan". */
export function NavLinksMobile() {
  const { aktif, layananAktif } = useAktif();
  const kelas = "rounded-lg px-4 py-3 no-underline hover:bg-latar-muda";
  return (
    <>
      {menu.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(m.href) ? "page" : undefined}
          className={`${kelas} ${warna(aktif(m.href))}`}
        >
          {m.label}
        </Link>
      ))}
      <span className={`px-4 pb-1 pt-3 ${warna(layananAktif)}`}>Layanan</span>
      {menuLayanan.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`ml-4 rounded-r-lg border-l-2 border-garis px-4 py-2.5 text-[14px] text-navy no-underline hover:bg-latar-muda`}
        >
          {l.label}
        </Link>
      ))}
      {menuAkhir.map((m) => (
        <Link
          key={m.href}
          href={m.href}
          aria-current={aktif(m.href) ? "page" : undefined}
          className={`${kelas} ${warna(aktif(m.href))}`}
        >
          {m.label}
        </Link>
      ))}
    </>
  );
}
