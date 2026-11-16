import type { ReactNode } from "react";

/** Ikon garis sederhana. Tambah ikon baru di sini, jangan menempel SVG di halaman. */
const paths = {
  dokumen: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  perpanjang: (
    <>
      <path d="M20 11a8 8 0 0 0-14.9-4" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.9 4" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  orang: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.9-3.6 3.7-5.5 7-5.5s6.1 1.9 7 5.5" />
    </>
  ),
  tim: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14.8c1.9.7 3 2.5 3.5 5.2" />
    </>
  ),
  koper: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </>
  ),
  cari: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  auditBerkas: (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <path d="M14 3v6h6" />
      <circle cx="17" cy="17" r="3" />
      <path d="m21 21-1.8-1.8" />
    </>
  ),
  garansi: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="m10 15 1.5 1.5L15 13" />
    </>
  ),
  jam: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bendera: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
  layar: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  perisai: (
    <>
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </>
  ),
  lokasi: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  chat: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" />,
  larangan: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6 6 12 12" />
    </>
  ),
  peringatan: (
    <>
      <path d="M12 3 2 20h20z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  kartuId: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.8 16c.6-1.5 1.8-2.3 3.2-2.3s2.6.8 3.2 2.3M14.5 10h4M14.5 13h3" />
    </>
  ),
  uang: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  kalender: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </>
  ),
  toga: (
    <>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11v5c2 1.5 10 1.5 12 0v-5" />
    </>
  ),
  daftar: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  centang: <path d="M20 6 9 17l-5-5" />,
  panah: <path d="m9 6 6 6-6 6" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 24,
  stroke = 1.6,
  className,
}: {
  name: IconName;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`flex-none ${className ?? ""}`}
    >
      {paths[name]}
    </svg>
  );
}

/** Ikon dalam kotak oranye muda. */
export function IconBox({ name, size = 50 }: { name: IconName; size?: number }) {
  return (
    <span
      className="flex flex-none items-center justify-center rounded-xl bg-oranye-muda text-oranye-teks"
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.52)} />
    </span>
  );
}

/** Daftar bercentang. */
export function CheckList({
  items,
  warna = "text-hijau",
  className = "",
}: {
  items: ReactNode[];
  warna?: string;
  className?: string;
}) {
  return (
    <ul className={`flex flex-col gap-2.5 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <Icon name="centang" size={18} stroke={2.6} className={`mt-0.5 ${warna}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
