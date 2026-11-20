import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { PageHero } from "@/components/sections/PageHero";
import { CtaStrip } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Tim Atrahdis",
  "Tim yang mengurus SBU dan SKK Anda di Atrahdis: founder, operasional, client relations, dan technical support.",
  "/tentang/tim",
);

const tim = [
  { nama: "Nicx (Nicky Valiant)", peran: "Founder & CEO", tugas: "Strategi dan pengembangan bisnis. Mengurus SBU langsung sejak 2016." },
  { nama: "Febri", peran: "Operations", tugas: "Proses pengurusan SBU dan koordinasi dengan LPJK." },
  { nama: "Reza", peran: "Client Relations", tugas: "Menangani klien, follow-up dokumen, dan komunikasi." },
  { nama: "Irwan", peran: "Technical Support", tugas: "Teknis pengurusan SKK dan dukungan administrasi." },
];

const inisial = (n: string) =>
  n
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

export default function Tim() {
  return (
    <>
      <PageHero
        breadcrumb="Tim"
        path="/tentang/tim"
        eyebrow="Tentang"
        judul="Tim Kami"
        pengantar="Orang-orang yang menangani berkas Anda, dari audit dokumen sampai sertifikat terbit."
        cta={{ href: "/kontak#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "/tentang", label: "TENTANG ATRAHDIS" }}
      />

      <Bagian>
        <JudulBagian eyebrow="Tim" judul="Siapa yang Menangani Berkas Anda" />
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {tim.map((t) => (
            <article key={t.nama} className="flex items-start gap-4 rounded-[14px] border border-garis bg-latar-muda p-6">
              <span aria-hidden="true" className="flex size-14 flex-none items-center justify-center rounded-full bg-navy text-lg font-extrabold text-white">
                {inisial(t.nama)}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-extrabold text-navy">{t.nama}</h3>
                <p className="text-sm font-bold text-oranye-teks">{t.peran}</p>
                <p className="text-[15px] leading-relaxed text-teks-muted">{t.tugas}</p>
              </div>
            </article>
          ))}
        </div>
      </Bagian>

      <CtaStrip
        judul="Ngobrol langsung dengan tim kami"
        isi="Konsultasi dan audit berkas gratis lewat WhatsApp."
        tombol="KONSULTASI GRATIS"
      />
    </>
  );
}
