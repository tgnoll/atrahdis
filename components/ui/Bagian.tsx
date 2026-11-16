import Link from "next/link";
import type { ReactNode } from "react";

/** Pembungkus section: latar + lebar konten yang seragam. */
export function Bagian({
  id,
  latar = "putih",
  sempit = false,
  className = "",
  children,
}: {
  id?: string;
  latar?: "putih" | "muda" | "navy";
  sempit?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const bg = { putih: "bg-white", muda: "bg-latar-muda", navy: "bg-navy" }[latar];
  return (
    <section id={id} className={`${bg} scroll-mt-24`}>
      <div
        className={`mx-auto flex flex-col items-center gap-8 px-6 py-14 md:py-[60px] ${
          sempit ? "max-w-[880px]" : "max-w-[1180px]"
        } ${className}`}
      >
        {children}
      </div>
    </section>
  );
}

/** Label kecil bergaris oranye di atas judul. */
export function Eyebrow({ children, terang = false }: { children: ReactNode; terang?: boolean }) {
  return (
    <span
      className={`border-b-2 border-oranye pb-1.5 text-xs font-extrabold uppercase tracking-[2px] ${
        terang ? "text-white" : "text-navy"
      }`}
    >
      {children}
    </span>
  );
}

/** Judul section: eyebrow + h2 + pengantar. */
export function JudulBagian({
  eyebrow,
  judul,
  pengantar,
  terang = false,
  kiri = false,
}: {
  eyebrow?: string;
  judul: string;
  pengantar?: ReactNode;
  terang?: boolean;
  kiri?: boolean;
}) {
  return (
    <div
      className={`flex max-w-[700px] flex-col gap-3 ${
        kiri ? "items-start text-left" : "items-center text-center"
      }`}
    >
      {eyebrow && <Eyebrow terang={terang}>{eyebrow}</Eyebrow>}
      <h2
        className={`text-[26px] font-extrabold leading-tight md:text-[32px] ${
          terang ? "text-white" : "text-navy"
        }`}
      >
        {judul}
      </h2>
      {pengantar && (
        <p className={`text-base leading-relaxed ${terang ? "text-teks-redup" : "text-teks-muted"}`}>
          {pengantar}
        </p>
      )}
    </div>
  );
}

type Varian = "oranye" | "navy" | "garis-putih" | "garis-navy";

const varianKelas: Record<Varian, string> = {
  oranye: "bg-oranye text-navy hover:bg-oranye-gelap",
  navy: "bg-navy text-white hover:bg-navy-gelap",
  "garis-putih": "border-[1.5px] border-white text-white hover:bg-white/10",
  "garis-navy": "border-[1.5px] border-navy text-navy hover:bg-latar-muda",
};

/** Tombol/tautan berbentuk pil. Tautan internal memakai next/link. */
export function Tombol({
  href,
  varian = "oranye",
  kecil = false,
  className = "",
  children,
}: {
  href: string;
  varian?: Varian;
  kecil?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const kelas = `inline-flex min-h-11 items-center justify-center rounded-full text-center font-extrabold tracking-[0.3px] no-underline transition-colors ${
    kecil ? "px-5 py-2.5 text-sm" : "px-7 py-3.5 text-[15px]"
  } ${varianKelas[varian]} ${className}`;
  const eksternal = /^(https?:|mailto:|tel:)/.test(href);
  if (eksternal || href.startsWith("#")) {
    return (
      <a href={href} className={kelas} {...(eksternal ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={kelas}>
      {children}
    </Link>
  );
}
