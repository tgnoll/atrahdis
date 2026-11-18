import { fullAddress, site, waLink } from "@/content/site";
import { Bagian, JudulBagian, Tombol } from "@/components/ui/Bagian";
import { CheckList } from "@/components/ui/Icon";
import { LogoKlien, StudiKasus } from "@/components/sections/Bukti";
import { KartuIkon, type ItemIkon } from "@/components/sections/Kartu";
import { PageHero } from "@/components/sections/PageHero";
import { CtaStrip, Founder, Kutipan, PetaLokasi } from "@/components/sections/Profil";
import { meta } from "@/lib/seo";

export const metadata = meta(
  "Tentang Atrahdis: Konsultan SBU dan SKK Konstruksi Sejak 2016",
  "Atrahdis (PT Atrahdis Idea Nusantara) menangani pengurusan SBU dan SKK konstruksi sejak 2016. Setiap berkas diaudit sebelum diajukan.",
  "/tentang",
);

// TODO tim: pastikan tahun (web lama menulis 2016, artboard lama 2017) dan isi tiap tonggak.
const perjalanan = [
  { tahun: "2016", judul: "Mulai menangani SBU", isi: `${site.founder.name} mulai mengurus SBU konstruksi untuk kontraktor secara langsung.` },
  { tahun: "2017", judul: "PT berdiri", isi: `Layanan dilembagakan sebagai ${site.legalName}.` },
  { tahun: "2020", judul: "100+ sertifikat", isi: "Lebih dari seratus sertifikat selesai diproses." },
  { tahun: "2024–26", judul: "Digitalisasi", isi: "Proses pengiriman dokumen dan pemantauan progres berjalan online." },
];

const caraKerja: ItemIkon[] = [
  {
    ikon: "cari",
    judul: "Audit dulu, baru ajukan",
    isi: "NIB, KBLI, akta, SKK, dan keuangan dicocokkan sebelum pengajuan, supaya tidak bolak-balik.",
  },
  {
    ikon: "garansi",
    judul: "Semua tertulis di kontrak",
    isi: "Biaya, timeline, dan garansi disepakati sebelum pekerjaan dimulai. Tidak ada tagihan di luar itu.",
  },
  {
    ikon: "bendera",
    judul: "Kabar di tiap milestone",
    isi: "Progres dikabari rutin. Kalau melewati estimasi, Anda diberi tahu secara terbuka.",
  },
  {
    ikon: "orang",
    judul: "Bisa langsung ke founder",
    isi: `Kalau ada kendala, Anda bisa eskalasi langsung ke ${site.founder.name}.`,
  },
];

export default function Tentang() {
  return (
    <>
      <PageHero
        breadcrumb="Tentang Kami"
        path="/tentang"
        eyebrow="Tentang Atrahdis"
        judul="Konsultan SBU dan SKK Konstruksi yang Mengaudit Berkas Sebelum Mengajukan"
        pengantar={`Atrahdis adalah nama layanan ${site.legalName}. Sejak ${site.stats.sejak} kami membantu kontraktor menyiapkan, mengecek, dan mengajukan SBU serta SKK sampai terbit.`}
        cta={{ href: "/kontak#konsultasi", label: "KONSULTASI GRATIS" }}
        cta2={{ href: "#perjalanan", label: "PERJALANAN KAMI" }}
        bawah={
          <dl className="flex w-full flex-wrap gap-4">
            {[
              [site.stats.sertifikat, "sertifikat diproses"],
              [site.stats.perusahaan, "perusahaan didampingi"],
              [site.stats.sejak, "mulai beroperasi"],
            ].map(([angka, ket]) => (
              <div key={ket} className="flex min-w-0 flex-[1_1_200px] flex-col-reverse gap-1 rounded-[14px] border border-white/20 bg-white/[0.08] px-6 py-5">
                <dt className="text-sm text-teks-redup">{ket}</dt>
                <dd className="text-[32px] font-extrabold leading-none text-white">{angka}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Founder eyebrow="Founder" judul={`Dimulai dari berkas yang ${site.founder.name} tangani sendiri`}>
        <p className="text-base leading-relaxed text-teks-muted">
          Atrahdis berawal dari pengurusan SBU konstruksi yang {site.founder.name} tangani sendiri
          pada 2016, lalu berdiri sebagai {site.legalName} pada 2017. Hingga kini, setiap pengajuan tetap melalui pemeriksaan akhir dan persetujuan langsung
          dari {site.founder.name} sebelum disampaikan ke LPJK.
        </p>
        <p className="text-base leading-relaxed text-teks-muted">
          Dari pengalaman itu kami melihat pola yang sama berulang: pengajuan tertahan bukan karena
          berkas kurang, tapi karena data yang tidak saling cocok. Karena itu audit berkas menjadi
          langkah pertama di setiap pekerjaan.
        </p>
        <Kutipan>Regulasi punya aturan main yang jelas. Kalau dokumennya benar, hasilnya pasti.</Kutipan>
        <Tombol href={waLink(`Halo ${site.founder.name}, saya ingin konsultasi SBU/SKK.`)} kecil>
          Hubungi {site.founder.name}
        </Tombol>
      </Founder>

      <Bagian id="perjalanan" latar="muda">
        <JudulBagian eyebrow="Perjalanan" judul="Perjalanan Atrahdis Sejak 2016" />
        <ol className="flex w-full flex-wrap items-stretch gap-5">
          {perjalanan.map((p) => (
            <li key={p.tahun} className="flex min-w-0 flex-[1_1_220px] flex-col gap-2 rounded-[14px] border border-garis bg-white p-6">
              <span className="text-[28px] font-extrabold leading-none text-oranye-teks">{p.tahun}</span>
              <h3 className="mt-1 text-lg font-extrabold">{p.judul}</h3>
              <p className="text-[15px] leading-relaxed text-teks-muted">{p.isi}</p>
            </li>
          ))}
        </ol>
      </Bagian>

      <Bagian>
        <JudulBagian
          eyebrow="Cara kami bekerja"
          judul="Empat Hal yang Kami Pegang di Setiap Pekerjaan"
          pengantar="Kami tidak menjanjikan proses instan. Yang kami janjikan adalah berkas yang benar dan proses yang terbuka."
        />
        <KartuIkon items={caraKerja} lebar={420} />
      </Bagian>

      <LogoKlien judul="Perusahaan yang Pernah Kami Dampingi" />

      <StudiKasus latar="muda" />

      <Bagian>
        <JudulBagian eyebrow="Legalitas" judul="Data Perusahaan" />
        <div className="flex w-full flex-wrap items-stretch gap-5">
          <dl className="flex min-w-0 flex-[1_1_480px] flex-col rounded-[14px] border border-garis bg-white px-7 py-3">
            {[
              ["Nama badan usaha", site.legalName],
              ["Nama layanan", site.brand],
              ["NIB", site.nib],
              ["Alamat", fullAddress],
              ["Jam kerja", site.hours.panjang],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-garis py-3.5 last:border-b-0">
                <dt className="w-40 flex-none text-sm font-bold text-teks-muted">{k}</dt>
                <dd className="min-w-0 flex-1 text-[15px] font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3 rounded-[14px] bg-latar-muda p-7">
            <h3 className="text-lg font-extrabold">Yang bisa Anda periksa sebelum bekerja sama</h3>
            <CheckList
              className="text-[15px] leading-snug"
              items={[
                "Penawaran dan kontrak tertulis sebelum pembayaran",
                "Biaya, timeline, dan garansi tercantum di kontrak",
                "Kantor bisa dikunjungi dengan janji temu",
              ]}
            />
            <p className="text-sm leading-relaxed text-teks-muted">
              Untuk perusahaan PMA dan klien asing, lihat layanan saudara kami,{" "}
              <a href={site.sisterSite.href} className="font-bold">
                VerityX
              </a>
              .
            </p>
          </div>
        </div>
      </Bagian>

      <PetaLokasi />

      <CtaStrip
        judul="Mau berkas perusahaan Anda dicek dulu?"
        isi="Audit berkas awal gratis dan tanpa komitmen. Keputusan tetap di tangan Anda."
        tombol="KLAIM AUDIT GRATIS"
      />
    </>
  );
}
