import Link from "next/link";
import { paketSbu } from "@/content/layanan";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { PageHero } from "@/components/sections/PageHero";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Info Tender Konstruksi: Syarat SBU per Kualifikasi | Atrahdis",
  "SBU adalah syarat utama ikut tender konstruksi. Kualifikasi Kecil, Menengah, atau Besar harus sesuai nilai paket, dan dokumen prasyarat harus aktif saat penawaran ditutup.",
  "/tender",
);

const layananTender = [
  { href: "/layanan/tender-dan-sbu", judul: "Tender dan SBU", isi: "Syarat SBU untuk tender dan risiko SBU yang tidak valid." },
  { href: "/layanan/dok-tender", judul: "Dokumen prasyarat tender", isi: "PKKPR, PBG, BPJS, KSWP, dan Bank Garansi sesuai RKS." },
  { href: "/layanan/tender-desk", judul: "Tender Desk", isi: "Audit 12 dokumen wajib dan pendampingan satu paket tender." },
];

export default function Tender() {
  return (
    <>
      <PageHero
        breadcrumb="Info Tender"
        path="/tender"
        eyebrow="Info tender"
        judul="SBU Adalah Syarat Utama Ikut Tender Konstruksi"
        pengantar="Kualifikasi SBU Anda harus sesuai dengan nilai paket tender yang dituju, dan semua dokumen prasyarat harus aktif saat penawaran ditutup."
        cta={{ href: "#konsultasi", label: "KONSULTASI TENDER" }}
        cta2={{ href: "/layanan/tender-desk", label: "TENDER DESK" }}
      />

      <Bagian latar="muda">
        <JudulBagian eyebrow="Syarat tender" judul="Kualifikasi SBU Menentukan Paket yang Bisa Diikuti" />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {paketSbu.map((p) => (
            <article key={p.nama} className="flex min-w-0 flex-[1_1_280px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6">
              <h3 className="text-lg font-extrabold">{p.nama}</h3>
              <p className="text-[15px] leading-relaxed text-teks-muted">{p.untuk}</p>
            </article>
          ))}
        </div>
      </Bagian>

      <Bagian sempit>
        <JudulBagian eyebrow="Sebelum menawar" judul="Yang Paling Sering Membuat Gugur" />
        <CheckList
          className="w-full text-base leading-snug"
          items={[
            "SBU tidak aktif atau kualifikasinya di bawah syarat paket",
            "Subklasifikasi SBU tidak cocok dengan lingkup pekerjaan",
            "SKK tenaga ahli kedaluwarsa atau dipakai di perusahaan lain",
            "Status KSWP tidak valid karena tunggakan pajak",
            "Dokumen prasyarat (BPJS, PKKPR, Bank Garansi) kedaluwarsa saat penutupan",
          ]}
        />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian eyebrow="Layanan terkait" judul="Siapkan Tender Anda Bersama Kami" />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {layananTender.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-w-0 flex-[1_1_280px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6 no-underline hover:border-biru"
            >
              <h3 className="text-lg font-extrabold text-navy">{l.judul}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-teks-muted">{l.isi}</p>
              <span className="text-[15px] font-extrabold text-oranye-teks">Lihat detail →</span>
            </Link>
          ))}
        </div>
      </Bagian>

      <Konsultasi
        judul="Kirim Syarat Tender Anda,"
        sorot="Kami Cek Kesiapan Berkasnya"
        pengantar="Jawab 3 pertanyaan singkat. Kami balas lewat WhatsApp dengan daftar dokumen yang masih kurang untuk paket tersebut."
        form={{ pesanPembuka: "Halo Atrahdis, saya ingin konsultasi kesiapan tender." }}
      />
    </>
  );
}
