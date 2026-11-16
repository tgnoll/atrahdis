import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { site, waLink } from "@/content/site";
import { Tombol } from "@/components/ui/Bagian";
import { NavLinks, NavLinksMobile } from "./NavLinks";

export function TopBar() {
  return (
    <div className="bg-navy">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-x-4 gap-y-1 px-6 py-2 text-[13px] text-teks-redup">
        <span className="hidden md:inline">
          {site.legalName} · {site.tagline}
        </span>
        <span>
          {site.hours.display} · WhatsApp{" "}
          <a href={waLink()} className="font-bold text-white no-underline hover:text-oranye">
            {site.whatsapp.display}
          </a>
        </span>
      </div>
    </div>
  );
}

export function Logo({ terang = false }: { terang?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={257}
        height={338}
        className={`h-[46px] w-auto ${terang ? "rounded-lg bg-white p-1.5" : ""}`}
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className={`text-[22px] font-extrabold ${terang ? "text-white" : "text-navy"}`}>
          {site.brand.toLowerCase()}
        </span>
        <span
          className={`text-[9.5px] font-bold uppercase tracking-[1.2px] ${
            terang ? "text-teks-redup" : "text-teks-muted"
          }`}
        >
          {site.legalName}
        </span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-garis bg-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-2.5">
        <Link href="/" aria-label="Atrahdis, ke beranda" className="no-underline">
          <Logo />
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-5 text-[15px] font-semibold xl:flex"
        >
          <Suspense>
            <NavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Tombol href="/kontak#form-konsultasi" kecil>
              Konsultasi Gratis
            </Tombol>
          </div>

          {/* Menu HP/tablet: <details> supaya jalan tanpa JavaScript. */}
          <details className="relative xl:hidden">
            <summary
              aria-label="Buka menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-garis"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav
              aria-label="Navigasi utama"
              className="absolute right-0 top-[52px] flex w-64 flex-col rounded-xl border border-garis bg-white p-2 text-[15px] font-semibold shadow-xl"
            >
              <Suspense>
                <NavLinksMobile />
              </Suspense>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
