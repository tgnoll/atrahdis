import { site, waLink } from "@/content/site";
import { Bagian, Tombol } from "@/components/ui/Bagian";

/** Portal klien lama (/app/*) belum dipindah ke situs baru: arahkan klien ke WhatsApp. */
export function HalamanPortal({ judul, isi }: { judul: string; isi: string }) {
  return (
    <Bagian sempit>
      <div className="flex w-full flex-col items-center gap-5 rounded-[14px] border border-garis bg-latar-muda px-6 py-12 text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-oranye-teks">Portal Klien</p>
        <h1 className="text-[28px] font-extrabold leading-tight text-navy md:text-[36px]">{judul}</h1>
        <p className="max-w-[560px] text-[16px] leading-relaxed text-teks-muted">{isi}</p>
        <p className="max-w-[560px] text-[15px] leading-relaxed text-teks-muted">
          Portal klien sedang kami pindahkan ke sistem baru. Sementara ini, status berkas, dokumen, dan pembayaran
          bisa ditanyakan langsung ke tim kami lewat WhatsApp {site.whatsapp.display}.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Tombol href={waLink("Halo Atrahdis, saya klien dan ingin menanyakan status berkas saya.")}>Hubungi via WhatsApp</Tombol>
          <Tombol href="/kontak" varian="garis-navy">Halaman kontak</Tombol>
        </div>
      </div>
    </Bagian>
  );
}
