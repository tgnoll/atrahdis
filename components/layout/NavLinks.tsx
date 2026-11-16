"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const menu = [
  { href: "/", label: "Beranda" },
  { href: "/jasa-sbu", label: "Jasa SBU" },
  { href: "/perpanjangan-sbu", label: "Perpanjangan SBU" },
  { href: "/jasa-skk", label: "Jasa SKK" },
  { href: "/layanan", label: "Layanan" },
  { href: "/tentang", label: "Tentang" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

/** Tautan menu dengan penanda halaman aktif. */
export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <>
      {menu.map((m) => {
        const aktif = m.href === "/" ? pathname === "/" : pathname.startsWith(m.href);
        return (
          <Link
            key={m.href}
            href={m.href}
            aria-current={aktif ? "page" : undefined}
            className={`no-underline ${aktif ? "text-oranye-teks" : "text-navy"} ${className}`}
          >
            {m.label}
          </Link>
        );
      })}
    </>
  );
}
