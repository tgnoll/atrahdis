import { waLink } from "@/content/site";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { FAQ } from "@/components/sections/FAQ";
import { Langkah } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";
import { CtaStrip } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Program Kemitraan Atrahdis: Referral dan White-label | Atrahdis",
  "Dua jalur kemitraan untuk konsultan, notaris, akuntan, dan badan usaha: referral atau white-label layanan SBU, SKK, dan ISO. Besaran fee atau diskon disepakati tertulis.",
  "/mitra",
);

// Angka fee dan diskon tidak ditampilkan (KEPUTUSAN-FINAL: harga tidak ditampilkan); disepakati tertulis per mitra.
const jalur = [
  {
    judul: "Jalur referral",
    untuk: "Untuk konsultan, notaris, akuntan, atau perorangan yang punya klien tapi tidak mengerjakan sisi teknisnya.",
    poin: [
      "Harga untuk klien mengikuti harga Atrahdis, tanpa markup tersembunyi",
      "Fee dihitung dari nilai kontrak, besarannya disepakati tertulis",
      "Fee bisa lebih besar bila mitra ikut membantu closing atau membawa proyek rutin",
      "Fee dibayar setelah klien melunasi tagihan",
      "Tanpa biaya bergabung",
    ],
  },
  {
    judul: "Jalur white-label",
    untuk: "Untuk badan usaha yang ingin menjual layanan dengan brand sendiri tanpa membangun tim teknis.",
    poin: [
      "Layanan tampil dengan nama dan identitas perusahaan mitra",
      "Diskon kemitraan dari harga Atrahdis, disepakati tertulis",
      "Syarat diskon: komitmen tertulis minimal 1 proyek per kuartal",
      "Dokumen tetap diverifikasi tim Atrahdis sebelum diserahkan",
      "Wajib perjanjian kerahasiaan (NDA)",
    ],
  },
];

export default function Mitra() {
  return (
    <>
      <PageHero
        breadcrumb="Kemitraan"
        path="/mitra"
        eyebrow="Program kemitraan"
        judul="Anda Pegang Klien, Kami Kerjakan Teknisnya"
        pengantar="Dua jalur kemitraan untuk layanan SBU, SKK, dan ISO. Mitra tetap memegang hubungan dengan klien, Atrahdis mengerjakan bagian teknis dan administrasinya."
        cta={{ href: waLink("Halo Atrahdis, saya tertarik dengan program kemitraan."), label: "DISKUSIKAN VIA WHATSAPP" }}
      />

      <Bagian latar="muda">
        <JudulBagian eyebrow="Dua jalur" judul="Pilih Cara Bekerja Sama" />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          {jalur.map((j) => (
            <article key={j.judul} className="flex min-w-0 flex-[1_1_380px] flex-col gap-3 rounded-[14px] border border-garis bg-white p-7">
              <h3 className="text-xl font-extrabold">{j.judul}</h3>
              <p className="text-[15px] leading-relaxed text-teks-muted">{j.untuk}</p>
              <CheckList items={j.poin} className="text-[15px] leading-snug" />
            </article>
          ))}
        </div>
      </Bagian>

      <Bagian>
        <JudulBagian eyebrow="Cara kerja" judul="Empat Langkah Kemitraan" />
        <Langkah
          items={[
            { judul: "Perkenalan", isi: "Kami petakan jenis klien yang biasa Anda bawa." },
            { judul: "Kesepakatan jalur", isi: "Referral atau white-label, dengan fee atau diskon yang disepakati tertulis." },
            { judul: "Serah terima klien", isi: "Kebutuhan klien kami audit dulu: subklasifikasi, personil, dan peralatan." },
            { judul: "Eksekusi dan laporan", isi: "Anda menerima progres berkala, klien menerima hasil akhirnya." },
          ]}
        />
      </Bagian>

      <Bagian latar="muda" sempit>
        <JudulBagian eyebrow="Batasan" judul="Yang Tidak Kami Janjikan" />
        <CheckList
          className="w-full text-base leading-snug"
          items={[
            "Penerbitan sertifikat, karena hasil asesmen ada di tangan lembaga berwenang",
            "Kemenangan tender",
            "Harga khusus di luar kesepakatan tertulis",
            "Program retainer kemitraan, yang saat ini belum dibuka",
          ]}
        />
      </Bagian>

      <FAQ
        judul="Pertanyaan yang sering muncul"
        buka={1}
        items={[
          {
            q: "Kenapa tidak dikerjakan sendiri?",
            a: "Pengerjaannya butuh jaringan LSBU, LSP untuk SKK, dan KAP untuk laporan keuangan. Untuk satu atau dua klien, membangun jaringan itu tidak ekonomis.",
          },
          { q: "Apakah white-label wajib komitmen volume?", a: "Ya, untuk mendapat diskon kemitraan. Tanpa komitmen, kerja sama tetap bisa lewat jalur referral." },
          { q: "Bisa tanpa NDA?", a: "Tidak. Pada white-label, kerahasiaan identitas pelaksana dan data klien wajib diikat tertulis." },
        ]}
      >
        <div className="flex justify-center">
          <Tombol href={waLink("Halo Atrahdis, saya ingin mengirim satu kasus klien untuk diaudit.")} kecil>
            Kirim Satu Kasus Dulu
          </Tombol>
        </div>
      </FAQ>

      <CtaStrip
        judul="Mau mulai dari satu klien dulu?"
        isi="Kirim satu kasus, kebutuhannya kami audit tanpa biaya."
        tombol="DISKUSIKAN VIA WHATSAPP"
        href={waLink("Halo Atrahdis, saya tertarik dengan program kemitraan.")}
      />
    </>
  );
}
