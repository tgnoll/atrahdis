import Link from "next/link";
import { HARGA_DISEMBUNYIKAN, hargaTampil, layanan, paketSbu, tampilHarga } from "@/content/layanan";
import { CheckList, Icon, IconBox } from "@/components/ui/Icon";

/** Panel "Pilih kebutuhan Anda": 4 kartu layanan yang menumpuk di tepi bawah hero beranda. */
export function PilihKebutuhan() {
  return (
    <section aria-label="Pilih kebutuhan" className="relative bg-white">
      <div className="relative mx-auto -mt-24 max-w-[1180px] px-6">
        <div className="flex flex-col gap-3.5 rounded-2xl bg-white px-[22px] pb-[18px] pt-[22px] shadow-[0_18px_44px_rgba(13,34,66,0.16)]">
          <span className="text-[13px] font-extrabold tracking-[1.5px]">PILIH KEBUTUHAN ANDA</span>
          <div className="flex flex-wrap gap-3">
            {layanan.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-w-0 flex-[1_1_420px] items-center gap-3.5 rounded-xl border border-garis bg-white px-[18px] py-3.5 no-underline transition-colors hover:border-oranye"
              >
                <span className="hidden sm:block">
                  <IconBox name={l.ikon} size={46} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-extrabold text-navy">{l.nama}</span>
                  <span className="text-[13px] leading-snug text-teks-muted">{l.ringkas}</span>
                </span>
                <span className="flex flex-none flex-col items-end gap-0.5">
                  <span className="text-[11px] text-teks-muted">
                    {tampilHarga && l.harga ? l.labelHarga : "biaya"}
                  </span>
                  <span className={`font-extrabold text-oranye-teks ${tampilHarga && l.harga ? "text-base" : "text-sm"}`}>
                    {hargaTampil(l)}
                  </span>
                </span>
                <Icon name="panah" size={18} stroke={2} className="hidden text-navy sm:block" />
              </Link>
            ))}
          </div>
          <span className="text-xs leading-normal text-teks-muted">
            Biaya final ditulis di kontrak setelah audit berkas gratis.
          </span>
        </div>
      </div>
    </section>
  );
}

/** Tiga paket SBU (Kecil/Menengah/Besar) di atas latar separuh navy. */
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
              <span className="text-center text-[30px] font-extrabold leading-tight">
                {tampilHarga ? p.harga : HARGA_DISEMBUNYIKAN}
              </span>
              <span className="text-center text-sm text-teks-muted">{p.untuk}</span>
              <a
                href="#form-konsultasi"
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
