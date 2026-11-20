import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artikel, cariArtikel } from "@/content/blog";
import { bacaIsiArtikel } from "@/content/isi-artikel";
import { Markdown } from "@/components/blog/Markdown";
import { FAQ } from "@/components/sections/FAQ";
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

/** Halaman artikel: isi dari content/artikel/<slug>.md (dipindah dari atrahdis.id). */
export default async function ArtikelBlog({ params }: PageProps<"/blog/[slug]">) {
  const a = cariArtikel((await params).slug);
  if (!a) notFound();
  const isi = await bacaIsiArtikel(a.slug);

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

          {isi && (
            <div className="mt-4">
              <Markdown isi={isi.body} />
            </div>
          )}
        </div>
      </article>

      {isi && isi.faq.length > 0 && <FAQ judul="Pertanyaan yang Sering Diajukan" items={isi.faq} />}

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
