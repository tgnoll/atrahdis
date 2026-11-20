import Link from "next/link";
import { cariDetailLayanan, type DetailLayanan } from "@/content/layanan-detail";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { JsonLd, schemaLayanan } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { Langkah } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";

/** Tautan ke halaman detail lain hanya dipasang kalau halamannya sudah ada (hindari 404). */
function hrefAktif(href?: string) {
  if (!href) return undefined;
  const m = href.match(/^\/layanan\/(.+)$/);
  if (m && !cariDetailLayanan(m[1])) return undefined;
  return href;
}

function labelTerkait(t: string) {
  if (t.startsWith("/")) {
    const nama: Record<string, string> = {
      "/jasa-sbu": "Jasa pembuatan SBU",
      "/perpanjangan-sbu": "Perpanjangan SBU",
      "/jasa-skk": "Jasa pembuatan SKK",
    };
    return { href: t, label: nama[t] ?? t };
  }
  const d = cariDetailLayanan(t);
  return d ? { href: `/layanan/${d.slug}`, label: d.nama } : null;
}

/** Halaman detail /layanan/<slug>. Satu template untuk semua layanan; bagian kosong tidak ditampilkan. */
export function HalamanLayanan({ d }: { d: DetailLayanan }) {
  const path = `/layanan/${d.slug}`;
  const terkait = (d.terkait ?? []).map(labelTerkait).filter((t) => t !== null);
  let latarMuda = true;
  const latar = () => ((latarMuda = !latarMuda) ? "muda" : "putih");

  return (
    <>
      <JsonLd data={schemaLayanan(d.judul, path, d.metaDeskripsi)} />
      <PageHero
        breadcrumb={d.nama}
        path={path}
        eyebrow={d.kelompok}
        judul={d.judul}
        pengantar={d.pengantar}
        cta={{ href: "#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "/layanan", label: "SEMUA LAYANAN" }}
      />

      {d.poin && (
        <Bagian latar={latar()}>
          <JudulBagian judul={d.poin.judul} />
          <div className="flex w-full flex-wrap items-stretch gap-5">
            {d.poin.items.map((p) => {
              const href = hrefAktif(p.href);
              return (
                <article
                  key={p.judul}
                  className="flex min-w-0 flex-[1_1_300px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6"
                >
                  <h3 className="text-lg font-extrabold">{p.judul}</h3>
                  <p className="flex-1 text-[15px] leading-relaxed text-teks-muted">{p.isi}</p>
                  {href && (
                    <Link href={href} className="text-[15px] font-extrabold text-oranye-teks">
                      Lihat detail →
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </Bagian>
      )}

      {d.langkah && (
        <Bagian latar={latar()}>
          <JudulBagian judul={d.langkah.judul} />
          <Langkah items={d.langkah.items} />
        </Bagian>
      )}

      {d.gambaran && (
        <Bagian latar={latar()} sempit>
          <JudulBagian judul="Gambaran layanan" />
          <dl className="w-full divide-y divide-garis overflow-hidden rounded-[14px] border border-garis bg-white">
            {d.gambaran.map(([label, isi]) => (
              <div key={label} className="flex flex-col gap-1 px-6 py-4 md:flex-row md:gap-6">
                <dt className="font-extrabold text-navy md:w-[220px] md:flex-none">{label}</dt>
                <dd className="text-[15px] leading-relaxed text-teks-muted">{isi}</dd>
              </div>
            ))}
          </dl>
        </Bagian>
      )}

      {d.siapkan && (
        <Bagian latar={latar()} sempit>
          <JudulBagian judul="Yang perlu Anda siapkan" />
          <CheckList items={d.siapkan} className="w-full text-base leading-snug" />
        </Bagian>
      )}

      {d.titikGagal && (
        <Bagian latar={latar()} sempit>
          <JudulBagian judul="Yang paling sering membuat gagal" />
          <div className="w-full overflow-hidden rounded-[14px] border border-garis bg-white">
            <div className="hidden grid-cols-2 gap-6 bg-latar-muda px-6 py-3 text-sm font-extrabold text-navy md:grid">
              <span>Titik gagal</span>
              <span>Cara menutup</span>
            </div>
            {d.titikGagal.map(([masalah, cara]) => (
              <div key={masalah} className="grid gap-1 border-t border-garis px-6 py-4 text-[15px] md:grid-cols-2 md:gap-6">
                <span className="font-bold text-navy">{masalah}</span>
                <span className="text-teks-muted">{cara}</span>
              </div>
            ))}
          </div>
        </Bagian>
      )}

      <Konsultasi
        judul="Kirim Dokumen Anda,"
        sorot="Kami Balas Daftar Kekurangannya"
        pengantar="Jawab 3 pertanyaan singkat. Hasil audit dan langkah berikutnya kami kirim lewat WhatsApp, tanpa biaya."
        form={{ pesanPembuka: `Halo Atrahdis, saya ingin konsultasi ${d.nama}.` }}
      />

      {d.faq && (
        <FAQ judul="Pertanyaan yang sering muncul" items={d.faq} buka={1}>
          {terkait.length > 0 && (
            <p className="text-center text-sm text-teks-muted">
              Layanan terkait:{" "}
              {terkait.map((t, i) => (
                <span key={t.href}>
                  {i > 0 && " · "}
                  <Link href={t.href}>{t.label}</Link>
                </span>
              ))}
            </p>
          )}
        </FAQ>
      )}
    </>
  );
}
