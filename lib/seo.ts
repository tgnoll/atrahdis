import type { Metadata } from "next";

/** Metadata per halaman: title, description, canonical ke dirinya sendiri. */
export function meta(judul: string, deskripsi: string, path: string): Metadata {
  return {
    title: { absolute: judul },
    description: deskripsi,
    alternates: { canonical: path },
    openGraph: { title: judul, description: deskripsi, url: path },
  };
}
