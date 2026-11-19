import { HARGA_DISEMBUNYIKAN, paketSbu } from "@/content/layanan";
import { CheckList } from "@/components/ui/Icon";

/** Tiga paket SBU (Kecil/Menengah/Besar) tanpa nominal harga, di atas latar separuh navy. */
export function PaketSbu({
  id = "biaya",
  eyebrow,
  judul,
  pengantar,
}: {
  id?: string;
  eyebrow: string;
  judul: string;
  pengantar: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-[linear-gradient(180deg,var(--color-navy)_0%,var(--color-navy)_340px,#fff_340px)]">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-11 px-6 pb-[72px] pt-16">
        <div className="flex max-w-[700px] flex-col items-center gap-3.5 text-center">
          <span className="border-b-2 border-oranye pb-1.5 text-xs font-extrabold uppercase tracking-[2px] text-white">
            {eyebrow}
          </span>
          <h2 className="text-[28px] font-extrabold leading-tight text-white md:text-[34px]">{judul}</h2>
          <p className="text-base leading-relaxed text-teks-redup">{pengantar}</p>
        </div>
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {paketSbu.map((p) => (
            <article
              key={p.nama}
              className={`flex min-w-0 flex-[1_1_300px] flex-col gap-3.5 rounded-[14px] bg-white p-7 shadow-[0_12px_32px_rgba(13,34,66,0.10)] ${
                p.unggulan ? "border-2 border-oranye" : "border border-garis"
              }`}
            >
              {p.unggulan && (
                <span className="self-center rounded-full bg-oranye px-3 py-1 text-xs font-extrabold text-navy">
                  Paling sering dipilih
                </span>
              )}
              <h3 className="text-center text-xl font-extrabold">{p.nama}</h3>
              <span className="text-center text-[22px] font-extrabold leading-tight text-oranye-teks">
                {HARGA_DISEMBUNYIKAN}
              </span>
              <span className="text-center text-sm text-teks-muted">{p.untuk}</span>
              <a
                href="#konsultasi"
                className={`rounded-lg p-3.5 text-center text-[15px] font-extrabold no-underline ${
                  p.unggulan ? "bg-oranye text-navy hover:text-navy" : "bg-navy text-white hover:text-white"
                }`}
              >
                Konsultasi {p.nama}
              </a>
              <CheckList items={p.termasuk} className="border-t border-garis pt-4 text-sm leading-snug" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
