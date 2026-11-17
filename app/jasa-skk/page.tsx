import { ambilArtikel } from "@/content/blog";
import { HARGA_DISEMBUNYIKAN, hargaSkk, tampilHarga } from "@/content/layanan";
import { Bagian, JudulBagian } from "@/components/ui/Bagian";
import { JsonLd, schemaLayanan } from "@/components/seo/JsonLd";
import { FAQ } from "@/components/sections/FAQ";
import { BacaJuga, KartuIkon, Langkah, type ItemIkon } from "@/components/sections/Kartu";
import { Konsultasi } from "@/components/sections/Konsultasi";
import { PageHero } from "@/components/sections/PageHero";
import { meta } from "@/lib/seo";

const DESKRIPSI =
  "Jasa pembuatan SKK konstruksi jenjang 5–9 untuk tenaga ahli dan syarat SBU. Pemetaan jenjang dan subklasifikasi sampai sertifikat terbit.";

export const metadata = meta("Jasa Pembuatan SKK Konstruksi Jenjang 5–9 | Atrahdis", DESKRIPSI, "/jasa-skk");

const harga = (h: string) => (tampilHarga ? h : HARGA_DISEMBUNYIKAN);

const fungsi: ItemIkon[] = [
  {
    ikon: "perisai",
    judul: "Syarat wajib SBU",
    isi: "SBU tidak bisa diajukan tanpa tenaga ahli ber-SKK yang sesuai subklasifikasinya.",
  },
  {
    ikon: "koper",
    judul: "Dibutuhkan saat tender",
    isi: "Dokumen tenaga ahli menjadi bagian dari penilaian kualifikasi tender.",
  },
  {
    ikon: "kalender",
    judul: "Punya masa berlaku",
    isi: "SKK yang kedaluwarsa bisa menahan pengajuan atau perpanjangan SBU.",
  },
];

// TODO tim: deskripsi jenjang ditulis dari aturan umum, mohon dipastikan.
const jenjang = [
  { label: "Jenjang 4–6", judul: "Teknisi dan analis", isi: "Tenaga ahli di level pelaksana dan pengawas lapangan." },
  { label: "Jenjang 7", judul: "Ahli muda", isi: "Tenaga ahli untuk penanggung jawab teknis." },
  { label: "Jenjang 8", judul: "Ahli madya", isi: "Tenaga ahli senior untuk proyek berskala lebih besar." },
  { label: "Jenjang 9", judul: "Ahli utama", isi: "Level tertinggi untuk tenaga ahli konstruksi." },
];

// TODO tim: syarat dokumen SKK ditulis dari aturan umum, mohon dipastikan.
const syarat: ItemIkon[] = [
  { ikon: "kartuId", judul: "KTP dan NPWP", isi: "Identitas tenaga ahli yang akan disertifikasi." },
  { ikon: "toga", judul: "Ijazah terakhir", isi: "Ijazah yang sesuai dengan bidang dan jenjang yang diajukan." },
  { ikon: "dokumen", judul: "Riwayat pengalaman kerja", isi: "CV dan bukti pengalaman di proyek konstruksi." },
  { ikon: "orang", judul: "Pas foto", isi: "Pas foto terbaru dengan latar polos." },
  {
    ikon: "dokumen",
    judul: "Surat pernyataan",
    isi: "Surat pernyataan kebenaran data dan tidak merangkap di badan usaha lain.",
  },
];

const langkah = [
  { judul: "Konsultasi gratis", isi: "Ceritakan kebutuhan SKK dan subklasifikasi SBU perusahaan lewat WhatsApp." },
  { judul: "Pemetaan jenjang", isi: "Kami cocokkan jenjang dan subklasifikasi SKK dengan kebutuhan SBU Anda." },
  { judul: "Uji kompetensi", isi: "Berkas disiapkan dan tenaga ahli didampingi sampai proses sertifikasi selesai." },
  { judul: "SKK terbit", isi: "Sertifikat terbit dan siap dipakai untuk pengajuan SBU." },
];

const faq = [
  {
    q: "Berapa biaya pembuatan SKK konstruksi?",
    a: tampilHarga
      ? "Jenjang 5 dan 6 Rp5.970.000, Jenjang 7 Rp7.470.000, dan Jenjang 8 Rp8.970.000, per orang, per jenjang, per subklasifikasi. Jenjang 9 dihitung setelah konsultasi."
      : "Biaya dihitung per orang, per jenjang, per subklasifikasi. Rinciannya kami kirim setelah konsultasi.",
  },
  {
    q: "Apakah SKK bisa diurus bersamaan dengan SBU?",
    a: "Bisa, dan kami sarankan, karena SKK adalah syarat wajib SBU. Mengurus keduanya sekaligus mempersingkat timeline.",
  },
  {
    q: "Jenjang SKK mana yang dibutuhkan untuk SBU saya?",
    a: "Tergantung kualifikasi dan subklasifikasi SBU. Kami petakan saat konsultasi gratis.",
  },
  {
    q: "Apakah tenaga ahli boleh merangkap di perusahaan lain?",
    a: "Tidak. Tenaga ahli yang dipakai untuk SBU tidak boleh merangkap di badan usaha lain.",
  },
  {
    q: "Apakah SKK punya masa berlaku?",
    a: "Ya. SKK yang kedaluwarsa perlu diperpanjang supaya tidak menahan pengajuan atau perpanjangan SBU.",
  },
];

export default function JasaSkk() {
  return (
    <>
      <JsonLd data={schemaLayanan("Jasa Pembuatan SKK Konstruksi", "/jasa-skk", DESKRIPSI)} />

      <PageHero
        breadcrumb="Jasa SKK"
        path="/jasa-skk"
        eyebrow="SKK konstruksi jenjang 5–9"
        judul="Jasa Pembuatan SKK Konstruksi untuk Tenaga Ahli dan Syarat SBU"
        pengantar={
          <>
            Atrahdis membantu <strong>pembuatan SKK konstruksi</strong> untuk tenaga ahli perusahaan
            Anda, dari pemilihan jenjang dan subklasifikasi sampai sertifikat terbit. Bisa diurus
            bersamaan dengan SBU.
          </>
        }
        cta={{ href: "#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "#biaya", label: "LIHAT BIAYA" }}
        samping={
          <div className="flex flex-col rounded-2xl bg-white p-6">
            <span className="mb-3 text-[13px] font-extrabold tracking-[1.5px] text-teks-muted">
              BIAYA PEMBUATAN SKK KONSTRUKSI
            </span>
            {hargaSkk.map((h) => (
              <div key={h.jenjang} className="flex items-center justify-between gap-3 border-t border-garis py-[13px]">
                <strong>{h.jenjang}</strong>
                <span className="text-lg font-extrabold text-oranye-teks">{harga(h.harga)}</span>
              </div>
            ))}
            <span className="mt-1.5 text-xs leading-normal text-teks-muted">
              Per orang, per jenjang, per subklasifikasi.
            </span>
          </div>
        }
      />

      <Bagian>
        <JudulBagian
          eyebrow="Kenapa SKK penting"
          judul="Fungsi SKK Konstruksi bagi Perusahaan"
          pengantar="SKK adalah sertifikat kompetensi kerja untuk tenaga ahli konstruksi, dan menjadi syarat wajib dalam pengajuan SBU."
        />
        <KartuIkon items={fungsi} />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian eyebrow="Jenjang SKK" judul="Jenjang SKK Konstruksi yang Kami Urus" />
        <div className="flex w-full flex-wrap gap-4">
          {jenjang.map((j) => (
            <article key={j.label} className="flex min-w-0 flex-[1_1_240px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6">
              <span className="text-[13px] font-extrabold text-oranye-teks">{j.label}</span>
              <h3 className="text-[19px] font-extrabold">{j.judul}</h3>
              <p className="text-sm leading-relaxed text-teks-muted">{j.isi}</p>
            </article>
          ))}
        </div>
      </Bagian>

      <Bagian>
        <JudulBagian
          eyebrow="Syarat SKK"
          judul="Syarat Pembuatan SKK Konstruksi"
          pengantar="Siapkan dokumen berikut untuk setiap tenaga ahli. Belum lengkap? Kirim yang ada, kami bantu petakan sisanya."
        />
        <KartuIkon items={syarat} latar="putih" />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian eyebrow="Cara kerja" judul="Cara Mengurus SKK Konstruksi di Atrahdis" />
        <Langkah items={langkah} />
      </Bagian>

      <Bagian id="biaya" latar="navy">
        <JudulBagian eyebrow="Biaya SKK" judul="Biaya Pembuatan SKK Konstruksi 2026" terang />
        <div className="flex w-full flex-wrap items-stretch gap-4">
          {hargaSkk.map((h) => (
            <article key={h.jenjang} className="flex min-w-0 flex-[1_1_220px] flex-col gap-2 rounded-[14px] bg-white p-[26px] text-center">
              <span className="font-extrabold">{h.jenjang}</span>
              <strong className="text-[26px] font-extrabold">{harga(h.harga)}</strong>
              <a
                href="#konsultasi"
                className="mt-2 rounded-lg bg-navy p-3 text-sm font-extrabold text-white no-underline hover:text-white"
              >
                Konsultasi {h.jenjang}
              </a>
            </article>
          ))}
        </div>
        <p className="max-w-[720px] text-center text-sm leading-relaxed text-teks-redup">
          Harga per orang, per jenjang, per subklasifikasi. Kami sarankan SKK diurus bersamaan dengan
          SBU supaya timeline lebih singkat dan tidak tertahan di tengah proses.
        </p>
      </Bagian>

      <Konsultasi
        judul="Cek Gratis Jenjang SKK yang"
        sorot="Dibutuhkan Perusahaan Anda"
        pengantar="Jawab 3 pertanyaan singkat. Kami petakan jenjang dan subklasifikasi SKK yang cocok dengan SBU perusahaan Anda, lalu kirim hasilnya lewat WhatsApp."
        poin={[
          { ikon: "cari", judul: "Pemetaan jenjang", isi: "Jenjang dan subklasifikasi SKK dicocokkan dengan SBU Anda" },
          { ikon: "daftar", judul: "Checklist SKK", isi: "Dokumen tenaga ahli yang perlu disiapkan" },
          { ikon: "jam", judul: "Estimasi tertulis", isi: "Biaya dan timeline dikirim lewat WhatsApp" },
        ]}
        form={{
          pesanPembuka: "Halo Atrahdis, saya ingin konsultasi SKK konstruksi.",
          judulLangkah1: "Ceritakan kebutuhan SKK Anda",
          judulLangkah2: "Ke mana hasil pemetaan dikirim?",
          tombolKirim: "KIRIM & TERIMA HASIL PEMETAAN DI WHATSAPP",
          pertanyaan: [
            { label: "Untuk jabatan apa?", ringkas: "Jabatan", opsi: ["PJBU", "PJTBU", "PJSKBU", "Belum tahu"], wajib: true },
            { label: "Jenjang yang dibutuhkan", ringkas: "Jenjang", opsi: ["Jenjang 5–6", "Jenjang 7", "Jenjang 8–9", "Belum tahu"] },
            { label: "Berapa orang tenaga ahli?", ringkas: "Jumlah", opsi: ["1 orang", "2–5 orang", "Lebih dari 5"] },
          ],
        }}
      />

      <FAQ judul="Pertanyaan Seputar SKK Konstruksi" items={faq} />

      <Bagian latar="muda">
        <JudulBagian eyebrow="Baca juga" judul="Panduan Terkait" />
        <BacaJuga
          artikel={ambilArtikel([
            "syarat-sbu-konstruksi-2026",
            "kenapa-sbu-ditolak-solusi",
            "dokumen-sbu-konstruksi-checklist",
          ])}
        />
      </Bagian>
    </>
  );
}
