import Link from "next/link";
import type { Artikel } from "@/content/blog";
import { IconBox, type IconName } from "@/components/ui/Icon";

export type ItemIkon = { ikon: IconName; judul: string; isi: string };

/** Grid kartu: ikon di kiri, judul + keterangan di kanan. */
export function KartuIkon({
  items,
  latar = "muda",
  lebar = 300,
}: {
  items: ItemIkon[];
  latar?: "muda" | "putih";
  lebar?: number;
}) {
  return (
    <div className="flex w-full flex-wrap items-stretch gap-4">
      {items.map((it) => (
        <article
          key={it.judul}
          style={{ flexBasis: lebar }}
          className={`flex min-w-0 flex-1 items-start gap-4 rounded-[14px] border border-garis p-[22px] ${
            latar === "muda" ? "bg-latar-muda" : "bg-white"
          }`}
        >
          <IconBox name={it.ikon} />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[17px] font-extrabold">{it.judul}</h3>
            <p className="text-sm leading-relaxed text-teks-muted">{it.isi}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Langkah bernomor 01–04. */
export function Langkah({
  items,
  latar = "putih",
}: {
  items: { judul: string; isi: string }[];
  latar?: "muda" | "putih";
}) {
  return (
    <ol className="flex w-full flex-wrap items-stretch gap-5">
      {items.map((it, i) => (
        <li
          key={it.judul}
          className={`flex min-w-0 flex-[1_1_210px] flex-col gap-2.5 rounded-[14px] border border-garis px-[22px] py-[26px] ${
            latar === "muda" ? "bg-latar-muda" : "bg-white"
          }`}
        >
          <span aria-hidden="true" className="text-[34px] font-extrabold leading-none text-oranye">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1.5 text-[19px] font-extrabold">{it.judul}</h3>
          <p className="text-[15px] leading-relaxed text-teks-muted">{it.isi}</p>
        </li>
      ))}
    </ol>
  );
}

export function LabelKategori({ children }: { children: string }) {
  return (
    <span className="self-start rounded-full bg-oranye-muda px-2.5 py-1 text-xs font-extrabold text-oranye-teks">
      {children}
    </span>
  );
}

/** Sampul artikel sementara (pola navy + kategori) sampai gambar artikel dipindahkan. */
export function SampulArtikel({ a, tinggi = 150 }: { a: Artikel; tinggi?: number | string }) {
  return (
    <div
      aria-hidden="true"
      style={{ height: tinggi }}
      className="latar-kisi relative flex w-full items-end overflow-hidden p-5"
    >
      <span className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-2 border-oranye/40" />
      <span className="relative text-lg font-extrabold leading-tight text-white/90">{a.kategori}</span>
    </div>
  );
}

/** Kartu artikel untuk grid blog. */
export function KartuArtikel({ a }: { a: Artikel }) {
  return (
    <article className="flex min-w-0 flex-[1_1_300px] flex-col overflow-hidden rounded-[14px] border border-garis bg-white">
      <SampulArtikel a={a} />
      <div className="flex flex-col gap-2.5 px-5 pb-[22px] pt-[18px]">
        <div className="flex items-center justify-between gap-2">
          <LabelKategori>{a.kategori}</LabelKategori>
          <span className="text-xs text-teks-muted">{a.tanggal}</span>
        </div>
        <h3 className="text-[17px] font-extrabold leading-snug">
          <Link href={`/blog/${a.slug}`} className="no-underline">
            {a.judul}
          </Link>
        </h3>
      </div>
    </article>
  );
}

/** "Baca juga": kartu artikel ringkas tanpa sampul. */
export function BacaJuga({ artikel }: { artikel: Artikel[] }) {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {artikel.map((a) => (
        <Link
          key={a.slug}
          href={`/blog/${a.slug}`}
          className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 rounded-[14px] border border-garis bg-white px-[22px] py-5 no-underline"
        >
          <LabelKategori>{a.kategori}</LabelKategori>
          <span className="text-[17px] font-extrabold leading-snug text-navy">{a.judul}</span>
          <span className="text-sm font-bold text-oranye-teks">Baca artikel →</span>
        </Link>
      ))}
    </div>
  );
}
