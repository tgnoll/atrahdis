import { fullAddress, site, waLink } from "@/content/site";
import { IconBox, type IconName } from "@/components/ui/Icon";
import { FAQ } from "@/components/sections/FAQ";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { PageHero } from "@/components/sections/PageHero";
import { PetaLokasi } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Kontak Atrahdis: Konsultasi SBU dan SKK Konstruksi",
  "Hubungi Atrahdis untuk konsultasi gratis syarat, biaya, dan kesiapan berkas SBU atau SKK. WhatsApp atau tatap muka di kantor Jakarta Selatan.",
  "/kontak",
);

const kartu: { ikon: IconName; label: string; judul: string; isi: string; href: string; aksi: string }[] = [
  {
    ikon: "chat",
    label: "WHATSAPP",
    judul: site.whatsapp.display,
    isi: "Dibalas dalam 15 menit di jam kerja",
    href: waLink("Halo Atrahdis, saya ingin konsultasi SBU/SKK konstruksi."),
    aksi: "Chat sekarang →",
  },
  {
    ikon: "lokasi",
    label: "KANTOR",
    judul: `${site.address.building}, ${site.address.city}`,
    isi: `${site.address.street}, ${site.address.area} ${site.address.postalCode}`,
    href: site.mapsLink,
    aksi: "Buka di Google Maps →",
  },
  {
    ikon: "jam",
    label: "JAM KERJA",
    judul: "Senin–Jumat",
    isi: "08.00–17.00 WIB. Kunjungan kantor dengan janji temu.",
    href: waLink("Halo Atrahdis, saya ingin membuat janji temu di kantor."),
    aksi: "Buat janji temu →",
  },
];

const faq = [
  { q: "Apakah konsultasinya berbayar?", a: "Tidak. Konsultasi dan audit berkas awal gratis, tanpa komitmen." },
  {
    q: "Berapa lama pertanyaan saya dibalas?",
    a: `Pertanyaan di WhatsApp dibalas dalam 15 menit selama jam kerja, ${site.hours.panjang}.`,
  },
  {
    q: "Apakah saya harus datang ke kantor?",
    a: "Tidak harus. Seluruh proses bisa online. Kunjungan kantor bisa diatur dengan janji temu lebih dulu.",
  },
  {
    q: "Dokumen apa yang sebaiknya disiapkan saat konsultasi?",
    a: "NIB, akta perusahaan, dan SBU lama jika ada. Kalau belum lengkap, kirim yang ada dulu.",
  },
];

export default function Kontak() {
  return (
    <>
      <PageHero
        breadcrumb="Kontak"
        path="/kontak"
        judul="Kontak Atrahdis: Konsultasi SBU dan SKK Konstruksi"
        pengantar={`Tanyakan syarat, biaya, dan kesiapan berkas SBU atau SKK perusahaan Anda. Konsultasi gratis lewat WhatsApp atau tatap muka di kantor kami di ${site.address.city}.`}
        bawah={
          <div className="flex w-full flex-wrap items-stretch gap-4">
            {kartu.map((k) => (
              <article key={k.label} className="flex min-w-0 flex-[1_1_300px] flex-col gap-2.5 rounded-[14px] bg-white p-6 shadow-[0_12px_32px_rgba(13,34,66,0.12)]">
                <IconBox name={k.ikon} size={52} />
                <span className="text-[13px] font-extrabold tracking-[1px] text-teks-muted">{k.label}</span>
                <strong className="text-[19px] font-extrabold leading-snug">{k.judul}</strong>
                <span className="flex-1 text-sm leading-relaxed text-teks-muted">{k.isi}</span>
                <a href={k.href} target="_blank" rel="noopener" className="text-sm font-extrabold text-oranye-teks">
                  {k.aksi}
                </a>
              </article>
            ))}
          </div>
        }
      />

      <Konsultasi
        judul="Kirim Pertanyaan Anda, Kami Hubungi Lewat WhatsApp"
        pengantar="Isi data singkat supaya konsultasi langsung membahas kebutuhan perusahaan Anda."
        penawaran="Gratis audit berkas + Checklist Dokumen SBU 2026"
        poin={[
          "Cek kecocokan NIB, KBLI, akta, dan SKK perusahaan Anda",
          "Checklist dokumen dikirim lewat WhatsApp",
          "Estimasi biaya dan timeline tertulis, dibalas dalam 15 menit di jam kerja",
        ]}
      />

      <PetaLokasi />

      <section className="bg-white">
        <p className="mx-auto max-w-[1180px] px-6 pb-4 text-[15px] leading-relaxed text-teks-muted">
          <strong className="text-navy">{site.legalName}</strong> · {fullAddress} · NIB {site.nib}
        </p>
      </section>

      <FAQ judul="Sebelum Menghubungi Kami" items={faq} />
    </>
  );
}
