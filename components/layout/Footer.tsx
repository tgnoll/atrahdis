import Link from "next/link";
import { fullAddress, site, waLink } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Header";

const kolomLayanan = [
  { href: "/jasa-sbu", label: "Jasa Pembuatan SBU" },
  { href: "/perpanjangan-sbu", label: "Perpanjangan SBU" },
  { href: "/jasa-skk", label: "Jasa SKK" },
  { href: "/layanan", label: "Semua layanan" },
  { href: "/tools", label: "Tools gratis" },
];

const kolomPerusahaan = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

const tautan = "text-sm text-teks-redup no-underline hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 pb-7 pt-13">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex flex-[1_1_300px] flex-col gap-3">
            <Logo terang />
            <span className="text-sm leading-relaxed text-teks-redup">
              Jasa pembuatan SBU konstruksi, perpanjangan SBU, dan SKK tenaga ahli untuk kontraktor
              di seluruh Indonesia. {site.legalName} · NIB {site.nib}
            </span>
          </div>
          <div className="flex flex-[1_1_260px] flex-col gap-2">
            <span className="font-extrabold text-white">Kontak</span>
            <span className="text-sm leading-normal text-teks-redup">{fullAddress}</span>
            <a href={waLink()} className="text-sm font-bold text-white hover:text-oranye">
              WhatsApp {site.whatsapp.display}
            </a>
            {site.email && (
              <a href={`mailto:${site.email}`} className={tautan}>
                {site.email}
              </a>
            )}
          </div>
          <div className="flex flex-[1_1_200px] flex-col gap-2">
            <span className="font-extrabold text-white">Layanan</span>
            {kolomLayanan.map((l) => (
              <Link key={l.href} href={l.href} className={tautan}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-[1_1_200px] flex-col gap-2">
            <span className="font-extrabold text-white">Perusahaan</span>
            {kolomPerusahaan.map((l) => (
              <Link key={l.href} href={l.href} className={tautan}>
                {l.label}
              </Link>
            ))}
            <a href={site.sisterSite.href} className={tautan}>
              {site.sisterSite.label}
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 pt-4 text-[13px] text-teks-redup">
          © 2026 {site.legalName}
        </div>
      </div>
    </footer>
  );
}

/** Tombol WhatsApp mengambang di pojok kanan bawah. */
export function TombolWA() {
  return (
    <a
      href={waLink("Halo Atrahdis, saya ingin konsultasi SBU/SKK konstruksi.")}
      target="_blank"
      rel="noopener"
      aria-label="Chat WhatsApp Atrahdis"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hijau text-white shadow-lg transition-transform hover:scale-105 hover:text-white"
    >
      <Icon name="chat" size={28} stroke={2} />
    </a>
  );
}
