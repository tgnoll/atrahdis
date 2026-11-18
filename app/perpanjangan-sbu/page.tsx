import { ambilArtikel } from "@/content/blog";
import { site } from "@/content/site";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { JsonLd, schemaLayanan } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { BacaJuga, KartuIkon, Langkah, type ItemIkon } from "@/components/sections/Kartu";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { KenapaAtrahdis } from "@/components/sections/KenapaAtrahdis";
import { PageHero } from "@/components/sections/PageHero";
import { meta } from "@/lib/seo";

const DESKRIPSI =
  "Jasa perpanjangan SBU konstruksi Kecil, Menengah, Besar lewat SIKI LPJK. KSWP, SKK, dan data OSS dicek dulu supaya SBU tidak terputus saat tender.";

export const metadata = meta("Jasa Perpanjangan SBU Konstruksi | Atrahdis", DESKRIPSI, "/perpanjangan-sbu");

const sisaMasa = [
  { warna: "#1F9D55", sisa: "90+ hari", ket: "Aman, banyak waktu cadangan" },
  { warna: "#1F9D55", sisa: "60–90 hari", ket: "Waktu ideal untuk mulai" },
  { warna: "#D69A06", sisa: "30–60 hari", ket: "Masih bisa, tanpa cadangan" },
  { warna: "#F28508", sisa: "Kurang dari 30 hari", ket: "Risiko tinggi" },
  { warna: "#C4321C", sisa: "Sudah expired", ket: "Kritis, diproses seperti baru" },
];

const risiko: ItemIkon[] = [
  { ikon: "larangan", judul: "Status tidak aktif di LPJK", isi: "SBU tidak lagi tercatat aktif di database LPJK." },
  {
    ikon: "koper",
    judul: "Tidak bisa ikut tender",
    isi: "Perusahaan tidak bisa ikut tender pemerintah atau menjadi subkontraktor yang mensyaratkan SBU.",
  },
  {
    ikon: "perpanjang",
    judul: "Diproses seperti SBU baru",
    isi: "Reaktivasi lebih lama dan biayanya bisa lebih besar dari perpanjangan biasa.",
  },
  {
    ikon: "peringatan",
    judul: "Risiko di proyek berjalan",
    isi: "SBU expired di tengah proyek berisiko pembatalan kontrak dan masuk daftar hitam.",
  },
];

const dokumen: ItemIkon[] = [
  { ikon: "kartuId", judul: "NIB aktif", isi: "NIB masih aktif dan KBLI sesuai dengan subklasifikasi SBU." },
  { ikon: "perisai", judul: "KSWP valid", isi: "Status KSWP harus valid saat pengajuan perpanjangan." },
  { ikon: "orang", judul: "SKK tenaga ahli", isi: "Cek masa berlaku SKK, karena SKK juga bisa kedaluwarsa." },
  { ikon: "uang", judul: "Neraca keuangan", isi: "Laporan keuangan tahun buku terakhir." },
  { ikon: "dokumen", judul: "Akta perusahaan", isi: "Diperbarui hanya jika ada perubahan pengurus atau modal." },
  {
    ikon: "dokumen",
    judul: "Surat pernyataan",
    isi: "Surat pernyataan kebenaran data dibuat baru dan ditandatangani ulang.",
  },
];

const langkah = [
  { judul: "Kirim SBU lama", isi: "Kirim SBU lama dan dokumen terbaru lewat WhatsApp untuk konsultasi gratis." },
  { judul: "Audit titik rawan", isi: "Kami cek KSWP, SKK, KBLI, dan data OSS sebelum pengajuan." },
  {
    judul: "Pengajuan di SIKI LPJK",
    isi: "Perpanjangan diajukan dan dipantau sampai disetujui, dengan update di tiap milestone.",
  },
  { judul: "SBU baru terbit", isi: "SBU diperpanjang untuk 3 tahun berikutnya, sesuai kontrak." },
];

const faq = [
  {
    q: "Kapan sebaiknya mulai memperpanjang SBU?",
    a: "Idealnya 60–90 hari sebelum masa berlaku habis, supaya ada waktu cadangan jika ada dokumen yang perlu diperbaiki.",
  },
  { q: "Berapa lama masa berlaku SBU?", a: "SBU konstruksi berlaku 3 tahun sejak tanggal terbit, tanpa masa tenggang." },
  {
    q: "Berapa lama proses perpanjangan SBU?",
    a: "Estimasinya 3–6 minggu setelah dokumen lengkap, tergantung kualifikasi dan jumlah subklasifikasi.",
  },
  {
    q: "Bagaimana kalau SBU sudah expired?",
    a: "SBU yang sudah expired diproses seperti pengajuan baru, sehingga waktunya lebih lama. Hubungi kami secepatnya untuk dicek langkah tercepatnya.",
  },
  {
    q: "Bisakah perpanjangan sekaligus naik kualifikasi?",
    a: "Bisa, tapi sebaiknya diproses terpisah. Kami bantu atur urutannya supaya SBU tetap aktif.",
  },
  {
    q: "Apakah SKK juga perlu diperpanjang?",
    a: "Ya. SKK tenaga ahli punya masa berlaku sendiri, dan SKK yang kedaluwarsa bisa menahan perpanjangan SBU.",
  },
];

export default function PerpanjanganSbu() {
  return (
    <>
      <JsonLd data={schemaLayanan("Jasa Perpanjangan SBU Konstruksi", "/perpanjangan-sbu", DESKRIPSI)} />

      <PageHero
        breadcrumb="Perpanjangan SBU"
        path="/perpanjangan-sbu"
        eyebrow="Perpanjangan SBU konstruksi"
        judul="Jasa Perpanjangan SBU Konstruksi Sebelum Masa Berlaku Habis"
        pengantar={
          <>
            Atrahdis mengurus <strong>perpanjangan SBU</strong> Kecil, Menengah, dan Besar lewat SIKI
            LPJK. KSWP, SKK tenaga ahli, dan data OSS kami cek dulu supaya SBU Anda tidak terputus
            saat tender.
          </>
        }
        cta={{ href: "#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "#biaya", label: "LIHAT BIAYA" }}
        samping={
          <div className="flex flex-col rounded-2xl bg-white p-6">
            <span className="mb-3.5 text-[13px] font-extrabold tracking-[1.5px] text-teks-muted">
              SISA MASA BERLAKU SBU ANDA
            </span>
            {sisaMasa.map((s) => (
              <div key={s.sisa} className="flex items-center gap-3.5 border-t border-garis py-2.5">
                <span aria-hidden="true" className="h-3.5 w-3.5 flex-none rounded-full" style={{ background: s.warna }} />
                <strong className="w-[140px] flex-none text-[15px]">{s.sisa}</strong>
                <span className="text-sm text-teks-muted">{s.ket}</span>
              </div>
            ))}
            <span className="mt-2 text-xs leading-normal text-teks-muted">
              SBU berlaku 3 tahun sejak tanggal terbit, tanpa masa tenggang.
            </span>
          </div>
        }
      />

      <Bagian>
        <JudulBagian
          eyebrow="Risiko SBU expired"
          judul="Apa yang Terjadi Kalau SBU Tidak Diperpanjang"
          pengantar="Tanggal kedaluwarsa adalah hari terakhir SBU dianggap berlaku. Setelah itu:"
        />
        <KartuIkon items={risiko} lebar={240} />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian
          eyebrow="Syarat perpanjangan"
          judul="Dokumen Perpanjangan SBU Konstruksi"
          pengantar="Fokus utamanya ada di KSWP, SKK, dan data OSS. Tiga hal ini paling sering membuat perpanjangan tertahan."
        />
        <KartuIkon items={dokumen} latar="putih" />
      </Bagian>

      <Bagian>
        <JudulBagian eyebrow="Cara kerja" judul="Cara Perpanjangan SBU di Atrahdis" />
        <Langkah items={langkah} latar="muda" />
      </Bagian>

      <KenapaAtrahdis />

      <Bagian id="biaya" latar="navy">
        <JudulBagian eyebrow="Biaya & waktu" judul="Biaya dan Lama Proses Perpanjangan SBU" terang />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          <article className="flex min-w-0 flex-[1_1_320px] flex-col gap-2.5 rounded-[14px] bg-white p-7">
            <span className="text-sm font-extrabold text-teks-muted">Biaya perpanjangan SBU</span>
            <strong className="text-[26px] font-extrabold">Ditulis setelah audit</strong>
            <p className="text-[15px] leading-relaxed text-teks-muted">
              Mengikuti kualifikasi, jumlah subklasifikasi, dan dokumen yang perlu diperbarui. Estimasi
              dikirim lewat WhatsApp setelah audit singkat.
            </p>
          </article>
          <article className="flex min-w-0 flex-[1_1_320px] flex-col gap-2.5 rounded-[14px] bg-white p-7">
            <span className="text-sm font-extrabold text-teks-muted">Estimasi waktu proses</span>
            <strong className="text-[26px] font-extrabold">3–6 minggu</strong>
            <p className="text-[15px] leading-relaxed text-teks-muted">
              Dihitung setelah dokumen lengkap. Jika melewati estimasi, Anda dikabari secara terbuka.
            </p>
          </article>
          <article className="flex min-w-0 flex-[1_1_320px] flex-col gap-3 rounded-[14px] border-2 border-oranye bg-white p-7">
            <span className="text-sm font-extrabold text-teks-muted">Sudah termasuk</span>
            <CheckList
              className="text-[15px] leading-snug"
              items={[
                "Audit dokumen gratis sebelum proses",
                "Revisi dokumen tanpa biaya tambahan",
                `Konsultasi langsung dengan ${site.founder.name}`,
                "Garansi tertulis di kontrak",
              ]}
            />
          </article>
        </div>
        <p className="text-center text-sm text-teks-redup">
          Ingin sekaligus naik kualifikasi? Sebaiknya diproses terpisah dari perpanjangan. Kami bantu
          atur urutannya.
        </p>
      </Bagian>

      <Konsultasi
        judul="Cek Gratis: SBU Anda Masih Aman atau"
        sorot="Perlu Segera Diperpanjang?"
        pengantar="Jawab 3 pertanyaan singkat. Kami cek sisa masa berlaku SBU, status KSWP, SKK, dan data OSS perusahaan Anda, lalu kirim hasilnya lewat WhatsApp."
        form={{
          pesanPembuka: "Halo Atrahdis, saya ingin konsultasi perpanjangan SBU.",
          judul: "Ceritakan kondisi SBU Anda",
          pertanyaan: [
            {
              label: "Kapan SBU Anda habis?",
              ringkas: "Masa berlaku",
              opsi: ["Sudah habis", "Kurang dari 3 bulan", "3–6 bulan lagi", "Belum tahu"],
              wajib: true,
            },
            { label: "Kualifikasi SBU saat ini", ringkas: "Kualifikasi", opsi: ["Kecil (K)", "Menengah (M)", "Besar (B)", "Belum tahu"] },
            { label: "Sekalian naik kualifikasi?", ringkas: "Naik kualifikasi", opsi: ["Ya", "Tidak", "Belum tahu"] },
          ],
        }}
      />

      <FAQ judul="Pertanyaan Seputar Perpanjangan SBU" items={faq} />

      <Bagian latar="muda">
        <JudulBagian eyebrow="Baca juga" judul="Panduan Terkait" />
        <BacaJuga
          artikel={ambilArtikel([
            "perpanjangan-sbu-sebelum-expired",
            "sbu-expired-tender",
            "upgrade-sbu-kecil-ke-menengah",
          ])}
        />
      </Bagian>
    </>
  );
}
