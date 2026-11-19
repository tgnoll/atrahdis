import Image from "next/image";
import type { ReactNode } from "react";
import { fullAddress, site, waLink } from "@/content/site";
import { Eyebrow, Tombol } from "@/components/ui/Bagian";
import { Icon } from "@/components/ui/Icon";

/** Foto founder + cerita. Isi kanan diberikan lewat children. */
export function Founder({
  eyebrow,
  judul,
  children,
}: {
  eyebrow: string;
  judul: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-10 px-6 py-14 md:gap-14 md:py-[60px]">
        <div className="relative w-full max-w-[340px] flex-none overflow-hidden rounded-[18px] shadow-[0_16px_40px_rgba(13,34,66,0.14)]">
          <Image
            src="/images/nicx.webp"
            alt={`${site.founder.name}, Founder dan Principal Consultant Atrahdis`}
            width={640}
            height={640}
            className="block aspect-square w-full object-cover"
          />
          <div className="flex flex-col gap-0.5 bg-navy px-[22px] py-4">
            <span className="text-xl font-extrabold text-white">{site.founder.name}</span>
            <span className="text-sm text-teks-terang">{site.founder.role}, Atrahdis</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col items-start gap-[18px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[26px] font-extrabold leading-tight md:text-[32px]">{judul}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

export function Kutipan({ children }: { children: string }) {
  return (
    <blockquote className="flex flex-col gap-1.5 self-stretch rounded-xl bg-latar-muda px-5 py-4">
      <span className="text-[17px] font-bold italic leading-snug text-navy">“{children}”</span>
      <span className="text-[13px] text-teks-muted">{site.founder.name}, Founder Atrahdis</span>
    </blockquote>
  );
}

/** Alamat + link Google Maps (tanpa embed peta). Semua data dari content/site.ts. */
export function PetaLokasi() {
  return (
    <section id="lokasi" className="scroll-mt-24 bg-white">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-stretch gap-10 px-6 py-14 md:py-[60px]">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col items-start gap-[18px]">
          <Eyebrow>Lokasi kantor</Eyebrow>
          <h2 className="text-[26px] font-extrabold leading-tight md:text-[30px]">
            Kantor Jasa SBU Konstruksi Atrahdis di {site.address.city}
          </h2>
          <p className="text-base leading-relaxed text-teks-muted">
            Silakan datang untuk konsultasi tatap muka dengan janji temu lebih dulu. Klien di luar
            Jakarta tetap bisa mengurus seluruh proses secara online.
          </p>
          <div className="flex flex-col gap-3.5 text-[15px] leading-relaxed">
            <div className="flex items-start gap-3">
              <Icon name="lokasi" className="text-oranye-teks" />
              <address className="not-italic">
                <strong>{site.legalName}</strong>
                <br />
                {fullAddress}
              </address>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="chat" className="text-oranye-teks" />
              <a href={waLink()} className="font-bold">
                WhatsApp {site.whatsapp.display}
              </a>
            </div>
          </div>
          <div className="mt-1 flex flex-wrap gap-3">
            <Tombol href={site.mapsLink} varian="navy" kecil>
              Buka di Google Maps
            </Tombol>
            <Tombol href={waLink("Halo Atrahdis, saya ingin membuat janji temu di kantor.")} varian="garis-navy" kecil>
              Buat janji temu
            </Tombol>
          </div>
        </div>
        <a
          href={site.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[300px] min-w-0 flex-[1.3_1_480px] flex-col items-center justify-center gap-3 rounded-2xl bg-navy p-8 text-center text-white no-underline hover:text-white"
        >
          <Icon name="lokasi" className="text-oranye" />
          <strong className="text-xl font-extrabold">{site.address.building}</strong>
          <span className="text-[15px] leading-relaxed text-teks-redup">
            {site.address.street}, {site.address.area}
            <br />
            {site.address.city} {site.address.postalCode}
          </span>
          <span className="mt-2 rounded-lg bg-oranye px-5 py-3 text-sm font-extrabold text-navy">
            Buka di Google Maps →
          </span>
        </a>
      </div>
    </section>
  );
}

/** Ajakan penutup sederhana. */
export function CtaStrip({
  judul,
  isi,
  tombol,
  href = "/kontak#konsultasi",
}: {
  judul: string;
  isi: string;
  tombol: string;
  href?: string;
}) {
  return (
    <section className="latar-kisi relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-28 -top-36 h-[380px] w-[380px] rounded-full border-2 border-oranye/35" />
      <div className="relative mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-6 px-6 py-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-2.5">
          <span className="self-start rounded-full bg-oranye px-3 py-1 text-xs font-extrabold tracking-[1px] text-navy">
            PENAWARAN KONSULTASI
          </span>
          <h2 className="text-2xl font-extrabold leading-tight text-white md:text-[28px]">{judul}</h2>
          <p className="text-base leading-relaxed text-teks-terang">{isi}</p>
        </div>
        <Tombol href={href}>{tombol}</Tombol>
      </div>
    </section>
  );
}
