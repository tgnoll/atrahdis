import Link from "next/link";
import { artikel, kategoriBlog } from "@/content/blog";
import { site } from "@/content/site";
import { KartuArtikel, SampulArtikel } from "@/components/sections/Kartu";
import { CtaStrip } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Blog Panduan SBU dan SKK Konstruksi | Atrahdis",
  "Panduan syarat, biaya, proses, dan perpanjangan SBU konstruksi dari pengalaman mengurus 280+ sertifikat sejak 2016.",
  "/blog",
);

export default function Blog() {
  const [pilihan, ...lainnya] = artikel;
  return (
    <>
      <section className="border-b border-garis bg-latar-muda">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[18px] px-6 pb-10 pt-12">
          <nav aria-label="Breadcrumb" className="text-[13px] text-teks-muted">
            <Link href="/" className="text-teks-muted no-underline">
              Beranda
            </Link>{" "}
            <span aria-hidden="true">›</span> <span>Blog</span>
          </nav>
          <h1 className="text-[32px] font-extrabold leading-[1.15] md:text-[42px]">
            Blog Panduan SBU dan SKK Konstruksi
          </h1>
          <p className="max-w-[720px] text-lg leading-relaxed text-teks-muted">
            Panduan syarat, biaya, proses, dan perpanjangan SBU konstruksi, ditulis dari pengalaman
            mengurus {site.stats.sertifikat} sertifikat sejak {site.stats.sejak}.
          </p>
          {/* TODO tahap 6: filter kategori (butuh tag per artikel). Sementara hanya label. */}
          <ul className="mt-1.5 flex flex-wrap gap-2.5">
            {kategoriBlog.map((k) => (
              <li key={k} className="rounded-full border border-garis bg-white px-4 py-2 text-sm font-bold">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-7 px-6 pb-[60px] pt-12">
          <article className="flex w-full flex-wrap overflow-hidden rounded-2xl border border-garis bg-white">
            <div className="flex min-w-0 flex-[1_1_460px]">
              <SampulArtikel a={pilihan} tinggi="100%" />
            </div>
            <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-3.5 p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-oranye px-2.5 py-1 text-xs font-extrabold text-navy">
                  Artikel pilihan
                </span>
                <span className="text-[13px] text-teks-muted">
                  {pilihan.kategori} · {pilihan.tanggal}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold leading-snug md:text-[28px]">
                <Link href={`/blog/${pilihan.slug}`} className="no-underline">
                  {pilihan.judul}
                </Link>
              </h2>
              <p className="text-base leading-relaxed text-teks-muted">{pilihan.ringkas}</p>
              <Link href={`/blog/${pilihan.slug}`} className="text-[15px] font-extrabold text-oranye-teks">
                Baca artikel →
              </Link>
            </div>
          </article>

          <h2 className="mt-3 text-[26px] font-extrabold leading-snug">Artikel terbaru</h2>
          <div className="flex w-full flex-wrap gap-[18px]">
            {lainnya.map((a) => (
              <KartuArtikel key={a.slug} a={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        judul="Masih bingung soal SBU perusahaan Anda?"
        isi="Dapatkan audit berkas gratis dan Checklist Dokumen SBU 2026 lewat WhatsApp."
        tombol="KLAIM AUDIT GRATIS"
      />
    </>
  );
}
