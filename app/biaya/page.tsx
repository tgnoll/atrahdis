import { site } from "@/content/site";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { KartuIkon } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ } from "@/components/sections/FAQ";
import { CtaStrip } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Komponen Biaya SBU dan SKK Konstruksi | Atrahdis",
  "Apa saja yang menentukan biaya pengurusan SBU dan SKK: kualifikasi, jumlah subklasifikasi, SKK, KTA, dan kondisi berkas. Estimasi pasti setelah audit dokumen gratis.",
  "/biaya",
);

// KEPUTUSAN-FINAL butir 1: halaman /biaya menjelaskan KOMPONEN tanpa nominal.
// Satu-satunya jalur angka = kalkulator (/tools/kalkulator-sbu).

const komponen = [
  { ikon: "bendera", judul: "Kualifikasi SBU", isi: "Kecil, Menengah, Besar, atau PMA. Makin tinggi kualifikasi, makin banyak dokumen dan verifikasi yang harus disiapkan." },
  { ikon: "daftar", judul: "Jumlah subklasifikasi", isi: "Biaya dasar dihitung untuk 1 subklasifikasi. Setiap tambahan subklasifikasi dihitung terpisah setelah audit." },
  { ikon: "orang", judul: "SKK tenaga ahli", isi: "Dihitung per orang, per jenjang, per sub-bidang. Kalau SKK yang ada masih berlaku dan sesuai, tidak perlu diurus ulang." },
  { ikon: "kartuId", judul: "KTA asosiasi dan LSBU", isi: "Terpisah dari paket SBU dan mengikuti ketentuan asosiasi untuk tiap kualifikasi." },
  { ikon: "uang", judul: "Laporan keuangan", isi: "Kualifikasi Menengah ke atas membutuhkan laporan keuangan yang lebih detail, untuk Besar wajib audit KAP." },
  { ikon: "auditBerkas", judul: "Kondisi berkas awal", isi: "NIB, KBLI, KSWP, dan data OSS yang belum sinkron perlu diperbaiki dulu. Ini terlihat saat audit, sebelum Anda membayar." },
] as const;

const termasuk = [
  { ikon: "cari", judul: "Audit dokumen gratis", isi: "Kelengkapan berkas dicek sebelum proses dimulai, tanpa biaya dan tanpa komitmen." },
  { ikon: "dokumen", judul: "Pendampingan penuh", isi: "Kami urus dari awal sampai terbit. Anda tidak perlu bolak-balik ke dinas atau LSBU." },
  { ikon: "perpanjang", judul: "Revisi dokumen selama proses", isi: "Permintaan revisi dari LPJK selama proses berjalan ditangani tanpa biaya tambahan." },
  { ikon: "chat", judul: `Konsultasi langsung dengan ${site.founder.name}`, isi: "Setiap berkas diperiksa langsung oleh founder, bukan dilepas ke staf junior." },
] as const;

const pembayaran = [
  ["Uang muka", "DP 50% sebagai standar. Untuk perusahaan dengan birokrasi pembayaran berlapis, skema lain bisa dibicarakan."],
  ["Pelunasan", "Sisa pembayaran lunas sebelum penyerahan fisik sertifikat."],
  ["Estimasi", "Angka final ditulis setelah audit dokumen, sebelum Anda menyetujui apa pun."],
];

const tanya = [
  { q: "Kenapa harga tidak dicantumkan di halaman ini?", a: "Biaya SBU sangat bergantung pada kualifikasi, jumlah subklasifikasi, SKK, dan kondisi berkas awal. Angka yang dipasang tanpa melihat dokumen Anda hampir selalu meleset. Untuk gambaran kasar, gunakan kalkulator biaya SBU. Angka pastinya kami berikan setelah audit dokumen gratis." },
  { q: "Kalau saya butuh 3 subklasifikasi, berapa totalnya?", a: "Subklasifikasi tambahan dihitung per tambahan. Kirim dokumen Anda via WhatsApp, estimasi detail kami berikan setelah audit singkat." },
  { q: "Ada biaya tersembunyi?", a: "Tidak ada. Biaya yang disepakati di awal adalah total biaya. Tidak ada biaya revisi atau biaya percepatan mendadak di tengah proses." },
  { q: "SKK bisa diurus bersamaan dengan SBU?", a: "Bisa dan disarankan. SKK adalah syarat SBU, jadi mengurusnya bersamaan menghindari hambatan di tengah proses." },
];

export default function Biaya() {
  return (
    <>
      <PageHero
        breadcrumb="Biaya"
        path="/biaya"
        eyebrow="Biaya"
        judul="Biaya Transparan, Dihitung dari Berkas Anda"
        pengantar="Kami tidak memasang satu harga untuk semua. Berikut komponen yang menentukan biaya, dan apa saja yang sudah termasuk. Estimasi final diberikan gratis setelah audit dokumen, tanpa komitmen."
        cta={{ href: "/tools/kalkulator-sbu", label: "HITUNG DI KALKULATOR" }}
        cta2={{ href: "/kontak#konsultasi", label: "MINTA ESTIMASI GRATIS" }}
      />

      <Bagian>
        <JudulBagian eyebrow="Komponen" judul="Yang Menentukan Biaya" pengantar="Enam hal ini yang kami hitung saat menyusun estimasi untuk perusahaan Anda." />
        <KartuIkon items={[...komponen]} />
      </Bagian>

      <Bagian latar="muda">
        <JudulBagian eyebrow="Sudah termasuk" judul="Tanpa Tagihan di Luar Kesepakatan" />
        <KartuIkon items={[...termasuk]} latar="putih" />
      </Bagian>

      <Bagian sempit>
        <JudulBagian eyebrow="Pembayaran" judul="Skema Pembayaran" />
        <dl className="w-full divide-y divide-garis overflow-hidden rounded-[14px] border border-garis bg-white">
          {pembayaran.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1 px-6 py-4 md:flex-row md:gap-6">
              <dt className="font-extrabold text-navy md:w-[180px] md:flex-none">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-teks-muted">{v}</dd>
            </div>
          ))}
        </dl>
        <Tombol href="/tools/kalkulator-sbu" varian="navy" kecil>
          Coba kalkulator biaya SBU
        </Tombol>
      </Bagian>

      <FAQ judul="Pertanyaan tentang Biaya" items={tanya} latar="muda" />

      <CtaStrip
        judul="Mau tahu angka pastinya untuk perusahaan Anda?"
        isi="Audit dokumen gratis via WhatsApp. Tidak ada komitmen sebelum Anda setuju."
        tombol="MINTA ESTIMASI GRATIS"
      />
    </>
  );
}
