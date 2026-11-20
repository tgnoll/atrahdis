import { readFile } from "node:fs/promises";
import path from "node:path";

export type IsiArtikel = { body: string; faq: { q: string; a: string }[] };

/** Baca content/artikel/<slug>.md → body markdown + FAQ (dipisah baris `=====FAQ=====`). */
export async function bacaIsiArtikel(slug: string): Promise<IsiArtikel | null> {
  "use cache";
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  let raw: string;
  try {
    raw = await readFile(path.join(process.cwd(), "content", "artikel", `${slug}.md`), "utf8");
  } catch {
    return null;
  }
  const [body, faqRaw = ""] = raw.split(/^=====FAQ=====\s*$/m);
  const faq = faqRaw
    .split(/\n\s*\n/)
    .map((blok) => {
      const q = blok.match(/^Q:\s*(.+)$/m)?.[1]?.trim();
      const a = blok.match(/^A:\s*([\s\S]+)$/m)?.[1]?.trim();
      return q && a ? { q, a } : null;
    })
    .filter((x): x is { q: string; a: string } => x !== null);
  return { body: body.trim(), faq };
}
