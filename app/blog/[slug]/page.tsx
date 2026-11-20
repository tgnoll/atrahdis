import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artikel, cariArtikel } from "@/content/blog";
import { site } from "@/content/site";
import { Tombol } from "@/components/ui/Bagian";
import { BacaJuga, LabelKategori } from "@/components/sections/Kartu";
import { CtaStrip } from "@/components/sections/Profil";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return artikel.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const a = cariArtikel((await params).slug);
  if (!a) return {};
  return { title: a.judul, description: a.ringkas, alternates: { canonical: `/blog/${a.slug}` } };
}

/**
 * Halaman artikel. Isi artikel BELUM dipindahkan dari situs lama (tahap 6):
 * sementara menampilkan judul + tautan ke artikel asli di atrahdis.id.
 */
export default async function ArtikelBlog({ params }: PageProps<"/blog/[slug]">) {
  const a = cariArtikel((await params).slug);
  if (!a) notFound();

  const terkait = artikel.filter((x) => x.slug !== a.slug && x.kategori === a.kategori).slice(0, 3);

  return (
    <>
      <article className="bg-white">
        <div className="mx-auto flex max-w-[800px] flex-col gap-5 px-6 pb-14 pt-12">
          <nav aria-label="Breadcrumb" className="text-[13px] text-teks-muted">
            <Link href="/" className="text-teks-muted no-underline">
              Beranda
            </Link>{" "}
            <span aria-hidden="true">›</span>{" "}
            <Link href="/blog" className="text-teks-muted no-underline">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <LabelKategori>{a.kategori}</LabelKategori>
            <span className="text-[13px] text-teks-muted">{a.tanggal}</span>
          </div>
          <h1 className="text-[30px] font-extrabold leading-tight md:text-[40px]">{a.judul}</h1>
          {a.ringkas && <p className="text-lg leading-relaxed text-teks-muted">{a.ringkas}</p>}

          <div className="flex flex-col items-start gap-3 rounded-[14px] border border-dashed border-garis-input bg-latar-muda p-6">
            <strong className="text-[17px]">Isi artikel sedang dipindahkan ke situs baru</strong>
            <p className="text-[15px] leading-relaxed text-teks-muted">
              Halaman ini masih versi preview. Artikel lengkapnya bisa dibaca di situs Atrahdis yang
              sekarang.
            </p>
            <Tombol href={`${site.url}/blog/${a.slug}`} varian="navy" kecil>
              Baca di atrahdis.id
            </Tombol>
          </div>
        </div>
      </article>

      {terkait.length > 0 && (
        <section className="bg-latar-muda">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-12">
            <h2 className="text-2xl font-extrabold">Artikel terkait</h2>
            <BacaJuga artikel={terkait} />
          </div>
        </section>
      )}

      <CtaStrip
        judul="Butuh bantuan mengurus SBU atau SKK?"
        isi="Dapatkan audit berkas gratis dan Checklist Dokumen SBU 2026 lewat WhatsApp."
        tombol="KLAIM AUDIT GRATIS"
      />
    </>
  );
}
