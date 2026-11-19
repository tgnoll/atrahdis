import Link from "next/link";
import { daftarKota, type Kota } from "@/content/kota";
import { langkahSbu } from "@/content/layanan";
import { site } from "@/content/site";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { JsonLd, schemaLayanan } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { Langkah } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";
import { KenapaAtrahdis } from "@/components/sections/KenapaAtrahdis";

export type JenisKota = "sbu" | "skk";

const isi = {
  sbu: {
    label: "SBU",
    induk: "/jasa-sbu",
    layanan: [
      "Audit kesiapan NIB, KBLI, akta, dan keuangan sesuai kualifikasi yang dituju",
      "Pengurusan KTA asosiasi dan penyusunan PJBU, PJTBU, serta PJSKBU ber-SKK",
      "Pengajuan lewat OSS ke LSBU sampai SBU terbit dan tercatat di LPJK",
      "Perpanjangan dan naik kualifikasi SBU sebelum masa berlaku habis",
    ],
    bacaJuga: [
      { href: "/blog/apa-itu-sbu-konstruksi", label: "Apa itu SBU konstruksi?" },
      { href: "/blog/syarat-sbu-konstruksi-2026", label: "Syarat SBU 2026" },
      { href: "/perpanjangan-sbu", label: "Jasa perpanjangan SBU" },
    ],
  },
  skk: {
    label: "SKK",
    induk: "/jasa-skk",
    layanan: [
      "Pemetaan kebutuhan SKK per subklasifikasi dan jenjang 4 sampai 9",
      "Pendampingan uji kompetensi di LSP yang tercatat di LPJK",
      "Penyelarasan SKK tenaga ahli dengan data SBU perusahaan",
      "Perpanjangan SKK sebelum masa berlakunya habis",
    ],
    bacaJuga: [
      { href: "/jasa-skk", label: "Jasa pembuatan SKK konstruksi" },
      { href: "/blog/perbedaan-sbu-kecil-menengah-besar-2026", label: "Beda SBU Kecil, Menengah, Besar" },
      { href: "/jasa-sbu", label: "Jasa pembuatan SBU konstruksi" },
    ],
  },
} as const;

export const judulKota = (jenis: JenisKota, k: Kota) =>
  `Jasa Pengurusan ${isi[jenis].label} Konstruksi di ${k.nama}`;

export const deskripsiKota = (jenis: JenisKota, k: Kota) =>
  `Pendampingan ${isi[jenis].label} konstruksi untuk perusahaan di ${k.nama}, ${k.provinsi}. Berkas diaudit dulu, proses online lewat WhatsApp. ${site.stats.sertifikat} sertifikat diproses sejak ${site.stats.sejak}.`;

/** Halaman layanan per kota. Satu template untuk 25 kota SBU dan 25 kota SKK. */
export function HalamanKota({ jenis, kota }: { jenis: JenisKota; kota: Kota }) {
  const c = isi[jenis];
  const path = `${c.induk}/${kota.slug}`;
  const lain: JenisKota = jenis === "sbu" ? "skk" : "sbu";
  const faq = [
    {
      q: `Apakah perusahaan di ${kota.nama} harus datang ke kantor?`,
      a: `Tidak. Dokumen dikirim dan progres dipantau lewat WhatsApp, jadi perusahaan di ${kota.nama} dan seluruh ${kota.provinsi} bisa mengurus ${c.label} tanpa datang. Kantor kami di Jakarta Selatan terbuka untuk konsultasi tatap muka dengan janji temu.`,
    },
    {
      q: `Berapa biaya pengurusan ${c.label} di ${kota.nama}?`,
      a: `Biaya tidak dibedakan per kota. Rinciannya mengikuti kualifikasi, jumlah subklasifikasi, dan kondisi berkas, dan kami tulis di penawaran setelah audit gratis.`,
    },
    {
      q: "Apa yang diperiksa saat audit awal?",
      a: "NIB dan KBLI, kesesuaian akta dengan data OSS, status KSWP, serta SKK tenaga ahli untuk subklasifikasi yang dituju.",
    },
  ];

  return (
    <>
      <JsonLd data={schemaLayanan(judulKota(jenis, kota), path, deskripsiKota(jenis, kota))} />
      <PageHero
        breadcrumb={`Jasa ${c.label} ${kota.nama}`}
        path={path}
        eyebrow={`${c.label} konstruksi · ${kota.provinsi}`}
        judul={judulKota(jenis, kota)}
        pengantar={
          <>
            Atrahdis mendampingi perusahaan konstruksi di <strong>{kota.nama}</strong> dan seluruh{" "}
            {kota.provinsi}, dari audit dokumen sampai sertifikat terbit. Seluruh proses berjalan online.
          </>
        }
        cta={{ href: "#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: c.induk, label: `TENTANG JASA ${c.label}` }}
      />

      <Bagian>
        <JudulBagian
          eyebrow="Layanan"
          judul={`Layanan ${c.label} untuk Perusahaan di ${kota.nama}`}
          pengantar="Berkas diaudit lebih dulu, supaya pengajuan tidak bolak-balik."
        />
        <CheckList items={[...c.layanan]} className="w-full max-w-[760px] text-base leading-snug" />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian judul={`Cara kerja untuk klien di ${kota.nama}`} />
        <Langkah items={langkahSbu} />
      </Bagian>

      <KenapaAtrahdis />

      <Konsultasi
        judul={`Konsultasi Gratis ${c.label} untuk Perusahaan di ${kota.nama}`}
        pengantar="Jawab 3 pertanyaan singkat. Hasil audit dan langkah berikutnya kami kirim lewat WhatsApp."
        form={{ pesanPembuka: `Halo Atrahdis, saya dari ${kota.nama} (${kota.provinsi}) dan ingin konsultasi ${c.label} konstruksi.` }}
      />

      <FAQ judul={`Pertanyaan seputar ${c.label} di ${kota.nama}`} items={faq} buka={1}>
        <p className="text-center text-sm text-teks-muted">
          Baca juga:{" "}
          {c.bacaJuga.map((b, i) => (
            <span key={b.href}>
              {i > 0 && " · "}
              <Link href={b.href}>{b.label}</Link>
            </span>
          ))}{" "}
          · <Link href={`${isi[lain].induk}/${kota.slug}`}>Jasa {isi[lain].label} di {kota.nama}</Link>
        </p>
      </FAQ>

      <Bagian latar="muda">
        <JudulBagian judul={`Jasa ${c.label} di kota lain`} />
        <ul className="flex w-full flex-wrap justify-center gap-2.5">
          {daftarKota
            .filter((k) => k.slug !== kota.slug)
            .map((k) => (
              <li key={k.slug}>
                <Link
                  href={`${c.induk}/${k.slug}`}
                  className="inline-block rounded-full border border-garis bg-white px-4 py-2 text-sm font-bold no-underline"
                >
                  {k.nama}
                </Link>
              </li>
            ))}
        </ul>
      </Bagian>
    </>
  );
}
