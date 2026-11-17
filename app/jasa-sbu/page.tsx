import Image from "next/image";
import Link from "next/link";
import { langkahSbu } from "@/content/layanan";
import { site, waLink } from "@/content/site";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { CheckList, Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd, schemaLayanan } from "@/components/seo/JsonLd";
import { LogoKlien, StudiKasus } from "@/components/sections/Bukti";
import { FAQ } from "@/components/sections/FAQ";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { PaketSbu } from "@/components/sections/Harga";
import { Langkah } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";
import { Founder, Kutipan } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

const DESKRIPSI =
  "Jasa pembuatan SBU konstruksi kualifikasi Kecil, Menengah, Besar. Berkas diaudit dulu sebelum diajukan. 280+ sertifikat sejak 2016.";

export const metadata = meta("Jasa Pembuatan SBU Konstruksi K, M, B | Atrahdis", DESKRIPSI, "/jasa-sbu");

const dikerjakan: { ikon: IconName; judul: string; isi: string }[] = [
  { ikon: "auditBerkas", judul: "Audit berkas", isi: "NIB, KBLI, akta, SKK, dan keuangan dicek sebelum pengajuan." },
  { ikon: "perisai", judul: "Pengajuan SBU", isi: "Berkas dirapikan dan diajukan lewat OSS ke LSBU sampai terbit." },
  { ikon: "tim", judul: "SKK & KTA", isi: "Bantu siapkan SKK tenaga ahli dan KTA asosiasi bila belum ada." },
  { ikon: "layar", judul: "Proses online", isi: "Kirim dokumen dan pantau progres lewat WhatsApp dari kota mana pun." },
];

const syarat = [
  {
    judul: "Data badan usaha",
    isi: "Akta pendirian dan perubahan, SK AHU, NIB dengan KBLI konstruksi, NPWP badan usaha, serta KTP dan NPWP direksi.",
  },
  {
    judul: "Data tenaga ahli",
    isi: "SKK penanggung jawab sesuai subklasifikasi, dan tidak merangkap di badan usaha lain.",
  },
  {
    judul: "Data keuangan",
    isi: "Laporan keuangan atau neraca sesuai kualifikasi yang diajukan, serta status KSWP.",
  },
  {
    judul: "Data peralatan & pendukung",
    isi: "Bukti peralatan, KTA asosiasi badan usaha, dan sertifikat sistem manajemen bila disyaratkan.",
  },
];

const faq = [
  {
    q: "Berapa lama proses pembuatan SBU?",
    a: "Tergantung kelengkapan berkas, kualifikasi, dan jumlah subklasifikasi. Estimasi kami tulis di penawaran setelah audit.",
  },
  {
    q: "Berapa biaya jasa pembuatan SBU?",
    a: "Mengikuti kualifikasi, jumlah subklasifikasi, dan kebutuhan pendukung seperti SKK atau KTA. Rinciannya ada di penawaran tertulis.",
  },
  {
    q: "Kenapa pengajuan SBU bisa ditolak?",
    a: "Paling sering karena KBLI tidak selaras, data akta dan OSS tidak sinkron, atau SKK tidak sesuai.",
    aKaya: (
      <>
        Paling sering karena KBLI tidak selaras, data akta dan OSS tidak sinkron, atau SKK tidak
        sesuai. Baca <Link href="/blog/kenapa-sbu-ditolak-solusi">penyebab dan solusinya</Link>.
      </>
    ),
  },
  {
    q: "Perusahaan saya di luar Jakarta, bisa?",
    a: "Bisa. Seluruh proses berjalan online lewat WhatsApp dan email.",
  },
  // TODO tim: tambahkan FAQ "Bagaimana sistem pembayarannya?" setelah skema DP/pelunasan diputuskan.
];

export default function JasaSbu() {
  return (
    <>
      <JsonLd data={schemaLayanan("Jasa Pembuatan SBU Konstruksi", "/jasa-sbu", DESKRIPSI)} />

      <PageHero
        breadcrumb="Jasa SBU"
        path="/jasa-sbu"
        eyebrow="SBU konstruksi kualifikasi K, M, B"
        judul="Jasa Pembuatan SBU Konstruksi untuk Kontraktor di Seluruh Indonesia"
        pengantar={
          <>
            Kami bantu menyiapkan, mengecek, dan mengajukan <strong>SBU konstruksi</strong> sampai
            terbit. Berkas diaudit dulu, supaya NIB, KBLI, akta, SKK, dan keuangan saling cocok.
          </>
        }
        cta={{ href: "#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "#syarat", label: "CEK PERSYARATAN" }}
      />

      <LogoKlien judul="Dipercaya oleh Kontraktor Nasional dan Multinasional" />

      <Founder eyebrow="Founder Atrahdis" judul="Berkas SBU Anda diaudit langsung oleh founder kami">
        <p className="text-base leading-relaxed text-teks-muted">
          Sejak 2016, {site.founder.name} menangani pengurusan{" "}
          <strong className="text-navy">SBU konstruksi</strong> secara langsung. Setiap berkas melalui pemeriksaan
          akhir dan persetujuannya sebelum diajukan, untuk memastikan NIB, KBLI, akta, SKK, dan data
          keuangan telah selaras.
        </p>
        <CheckList
          className="text-base font-semibold leading-snug"
          items={[
            "Menangani SBU konstruksi sejak 2016",
            "Mengaudit setiap berkas bersama tim sebelum pengajuan",
            "Satu penanggung jawab yang jelas, dari audit sampai SBU terbit",
          ]}
        />
        <Kutipan>Regulation is a code. We debug it for you.</Kutipan>
        <Tombol href={waLink("Halo Atrahdis, saya ingin konsultasi pembuatan SBU.")} kecil>
          Konsultasi gratis
        </Tombol>
      </Founder>

      <Bagian latar="muda">
        <JudulBagian
          judul="Proses jasa pembuatan SBU di Atrahdis"
          pengantar="Empat langkah dari konsultasi sampai sertifikat di tangan. Estimasi waktu kami tulis di kontrak setelah audit."
        />
        <Langkah items={langkahSbu} />
      </Bagian>

      <Bagian>
        <JudulBagian eyebrow="Layanan utama" judul="Yang kami kerjakan dalam pengurusan SBU konstruksi" />
        <div className="flex w-full flex-wrap gap-4">
          {dikerjakan.map((d) => (
            <article key={d.judul} className="flex min-w-0 flex-[1_1_220px] flex-col items-center gap-3 rounded-[14px] border border-garis bg-white px-[22px] py-7 text-center">
              <Icon name={d.ikon} size={48} />
              <h3 className="text-[17px] font-extrabold">{d.judul}</h3>
              <p className="text-sm leading-relaxed text-teks-muted">{d.isi}</p>
            </article>
          ))}
        </div>
      </Bagian>

      <section className="bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3.5 px-6 pb-16 pt-0">
          <div className="flex flex-wrap items-center gap-8 rounded-[18px] bg-latar-muda p-7 md:gap-10 md:p-10">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
              <h2 className="text-2xl font-extrabold leading-tight md:text-[28px]">
                Kenapa kontraktor mengurus SBU di Atrahdis
              </h2>
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                <p className="min-w-0 flex-[1_1_380px] text-base leading-relaxed text-teks-muted">
                  Pengajuan SBU sering tertahan karena KBLI atau SKK tidak cocok dengan subklasifikasi.
                  Karena itu setiap berkas kami audit sebelum diajukan.
                </p>
                <p className="min-w-0 flex-[1_1_380px] text-base leading-relaxed text-teks-muted">
                  Biaya ditulis di penawaran, tanpa tagihan di luar kesepakatan. Kalau pengajuan ditolak
                  karena kelalaian kami, perbaikannya kami tanggung sesuai kontrak.
                </p>
              </div>
              <div className="mt-1 flex flex-wrap items-end gap-x-10 gap-y-4">
                {[
                  [site.stats.sertifikat, "sertifikat diproses"],
                  [site.stats.perusahaan, "perusahaan"],
                  [site.stats.sejak, "mulai beroperasi"],
                ].map(([angka, ket]) => (
                  <span key={ket} className="flex flex-col">
                    <strong className="text-[26px] font-extrabold">{angka}</strong>
                    <span className="text-[13px] text-teks-muted">{ket}</span>
                  </span>
                ))}
                <Tombol href="/tentang" varian="navy" kecil>
                  TENTANG KAMI
                </Tombol>
              </div>
            </div>
            <figure className="m-0 flex min-w-0 flex-[1_1_440px] flex-col gap-2">
              <Image
                src="/images/kolase-sertifikat-klien.webp"
                alt="Kolase klien Atrahdis bersama SBU, SKK, dan kartu anggota yang sudah terbit"
                width={1400}
                height={1120}
                sizes="(min-width: 1024px) 540px, 100vw"
                className="h-auto w-full rounded-[14px] border border-garis shadow-[0_12px_32px_rgba(13,34,66,0.10)]"
              />
              <figcaption className="text-[13px] text-teks-muted">
                Sebagian SBU, SKK, dan kartu anggota klien yang kami urus. Data pribadi disamarkan.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <PaketSbu
        id="paket"
        eyebrow="Pilihan kualifikasi"
        judul="Jasa Pembuatan SBU sesuai Kualifikasi Perusahaan"
        pengantar="Biaya final mengikuti jumlah subklasifikasi dan kondisi berkas, ditulis di penawaran setelah audit."
      />

      <Konsultasi
        judul="Konsultasi Gratis dan Audit Berkas SBU"
        sorot="Sebelum Diajukan"
        pengantar="Jawab 3 pertanyaan singkat. Hasil audit dan estimasi biaya kami kirim lewat WhatsApp."
        form={{
          pesanPembuka: "Halo Atrahdis, saya ingin konsultasi pembuatan SBU.",
          pertanyaan: [
            {
              label: "Kualifikasi SBU yang dituju",
              ringkas: "Kualifikasi",
              opsi: ["Kecil (K)", "Menengah (M)", "Besar (B)", "Belum tahu"],
              wajib: true,
            },
            {
              label: "Klasifikasi pekerjaan",
              ringkas: "Klasifikasi",
              opsi: [
                "Bangunan gedung (rumah, ruko, kantor, sekolah)",
                "Bangunan sipil (jalan, jembatan, irigasi, drainase)",
                "Spesialis (pekerjaan khusus, misalnya pondasi atau konstruksi baja)",
                "Belum yakin, mohon dibantu",
              ],
            },
            { label: "Kapan dibutuhkan?", ringkas: "Waktu", opsi: ["Segera, ada tender < 1 bulan", "1–3 bulan lagi", "Baru cari info"] },
          ],
        }}
      />

      <section id="syarat" className="scroll-mt-24 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-10 px-6 py-16">
          <div className="flex min-w-0 flex-[1_1_280px] flex-col items-start gap-3.5">
            <Icon name="daftar" size={36} className="text-oranye" />
            <h2 className="text-2xl font-extrabold leading-tight md:text-[28px]">
              Syarat Pembuatan SBU Konstruksi
            </h2>
            <p className="text-[15px] leading-relaxed text-teks-muted">
              Setiap badan usaha perlu memenuhi syarat sesuai klasifikasi dan kualifikasinya. Belum
              lengkap? Kirim yang ada, kami bantu petakan sisanya.
            </p>
            <Tombol href="#konsultasi" kecil>
              Cek berkas saya
            </Tombol>
            <Link href="/blog/dokumen-sbu-konstruksi-checklist" className="text-sm font-bold">
              Checklist dokumen lengkap →
            </Link>
          </div>
          <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-3">
            {syarat.map((s) => (
              <article key={s.judul} className="flex flex-col gap-2 rounded-xl border border-garis px-6 py-5">
                <h3 className="text-[17px] font-extrabold">{s.judul}</h3>
                <p className="text-[15px] leading-relaxed text-teks-muted">{s.isi}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StudiKasus latar="muda" />

      <FAQ judul="Pertanyaan seputar jasa pembuatan SBU" items={faq} buka={4}>
        <p className="text-center text-sm text-teks-muted">
          Baca juga: <Link href="/blog/syarat-sbu-konstruksi-2026">Syarat SBU 2026</Link> ·{" "}
          <Link href="/blog/perbedaan-sbu-kecil-menengah-besar-2026">Beda SBU K, M, B</Link> ·{" "}
          <Link href="/blog/biaya-sbu-konstruksi-2026">Biaya SBU 2026</Link>
        </p>
      </FAQ>
    </>
  );
}
