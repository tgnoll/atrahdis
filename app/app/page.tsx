import type { Metadata } from "next";
import { HalamanPortal } from "@/components/portal/HalamanPortal";
import { meta } from "@/lib/seo";

export const metadata: Metadata = {
  ...meta("Portal Klien Atrahdis", "Portal klien Atrahdis untuk memantau status pengurusan, dokumen, dan pembayaran.", "/app"),
  robots: { index: false, follow: true },
};

export default function Portal() {
  return <HalamanPortal judul="Portal Klien Atrahdis" isi="Pantau status pengurusan, dokumen, dan pembayaran Anda di satu tempat." />;
}
