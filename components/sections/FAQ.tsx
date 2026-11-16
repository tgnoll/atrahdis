import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";

export type Tanya = { q: string; a: string; aKaya?: ReactNode };

/** FAQ akordeon + schema FAQPage. `a` = teks polos (untuk schema), `aKaya` = versi dengan tautan. */
export function FAQ({
  judul,
  items,
  latar = "putih",
  buka = 2,
  children,
}: {
  judul: string;
  items: Tanya[];
  latar?: "putih" | "muda";
  buka?: number;
  children?: ReactNode;
}) {
  return (
    <section className={latar === "muda" ? "bg-latar-muda" : "bg-white"}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((t) => ({
            "@type": "Question",
            name: t.q,
            acceptedAnswer: { "@type": "Answer", text: t.a },
          })),
        }}
      />
      <div className="mx-auto flex max-w-[880px] flex-col gap-7 px-6 py-14 md:py-[60px]">
        <h2 className="text-center text-[26px] font-extrabold leading-tight md:text-[32px]">{judul}</h2>
        <div className="flex flex-col gap-2.5">
          {items.map((t, i) => (
            <details
              key={t.q}
              open={i < buka}
              className={`group rounded-xl px-[22px] py-[18px] ${
                latar === "muda" ? "border border-garis bg-white" : "bg-latar-muda"
              }`}
            >
              <summary className="flex items-center justify-between gap-4 text-[17px] font-bold">
                {t.q}
                <span aria-hidden="true" className="flex-none text-xl text-oranye-teks transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 text-[15px] leading-relaxed text-teks-muted">{t.aKaya ?? t.a}</p>
            </details>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}
