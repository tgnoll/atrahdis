import Link from "next/link";
import type { ReactNode } from "react";
import { Tombol } from "@/components/ui/Bagian";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";

type Cta = { href: string; label: string };

/** Hero halaman dalam: breadcrumb, eyebrow, H1, pengantar, 2 tombol, panel samping opsional. */
export function PageHero({
  breadcrumb,
  path,
  eyebrow,
  judul,
  pengantar,
  cta,
  cta2,
  samping,
  bawah,
}: {
  breadcrumb: string;
  path: string;
  eyebrow?: string;
  judul: string;
  pengantar: ReactNode;
  cta?: Cta;
  cta2?: Cta;
  samping?: ReactNode;
  bawah?: ReactNode;
}) {
  return (
    <section className="hero-dalam">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: site.url },
            { "@type": "ListItem", position: 2, name: breadcrumb, item: `${site.url}${path}` },
          ],
        }}
      />
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 pb-16 pt-12 md:pb-[72px] md:pt-14">
        <div className="flex flex-wrap items-center gap-12">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
            <nav aria-label="Breadcrumb" className="text-[13px] text-teks-redup">
              <Link href="/" className="text-teks-redup no-underline hover:text-white">
                Beranda
              </Link>{" "}
              <span aria-hidden="true">›</span> <span className="text-white">{breadcrumb}</span>
            </nav>
            {eyebrow && (
              <span className="self-start border-b-2 border-oranye pb-1.5 text-[13px] font-extrabold uppercase tracking-[2px] text-white">
                {eyebrow}
              </span>
            )}
            <h1 className="text-[32px] font-extrabold leading-[1.14] text-white md:text-[44px]">{judul}</h1>
            <p className="max-w-[600px] text-lg leading-relaxed text-teks-terang [&_strong]:text-white">
              {pengantar}
            </p>
            {(cta || cta2) && (
              <div className="mt-1 flex flex-wrap gap-3">
                {cta && <Tombol href={cta.href}>{cta.label}</Tombol>}
                {cta2 && (
                  <Tombol href={cta2.href} varian="garis-putih">
                    {cta2.label}
                  </Tombol>
                )}
              </div>
            )}
          </div>
          {samping && <div className="min-w-0 flex-[1_1_380px]">{samping}</div>}
        </div>
        {bawah}
      </div>
    </section>
  );
}
