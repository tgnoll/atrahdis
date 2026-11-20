import Link from "next/link";
import type { ReactNode } from "react";

/** Renderer markdown mini untuk isi artikel: ##/###, paragraf, list -/1., tabel, ---, **bold**, *italic*, [teks](/path). */

function inline(teks: string, kunci = "i"): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(teks))) {
    if (m.index > last) out.push(teks.slice(last, m.index));
    const k = `${kunci}-${n++}`;
    if (m[1] !== undefined) out.push(<strong key={k}>{inline(m[1], k)}</strong>);
    else if (m[2] !== undefined) {
      const href = m[3];
      out.push(
        href.startsWith("/") ? (
          <Link key={k} href={href} className="font-semibold text-oranye-teks underline underline-offset-2">
            {inline(m[2], k)}
          </Link>
        ) : (
          <a key={k} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-oranye-teks underline">
            {inline(m[2], k)}
          </a>
        ),
      );
    } else if (m[4] !== undefined) out.push(<em key={k}>{inline(m[4], k)}</em>);
    last = re.lastIndex;
  }
  if (last < teks.length) out.push(teks.slice(last));
  return out;
}

const sel = (baris: string) =>
  baris
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function Markdown({ isi }: { isi: string }) {
  const baris = isi.split("\n");
  const blok: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < baris.length) {
    const b = baris[i];
    const t = b.trim();
    if (!t) {
      i++;
      continue;
    }
    if (t === "---") {
      blok.push(<hr key={k++} className="my-2 border-garis" />);
      i++;
    } else if (t.startsWith("### ")) {
      blok.push(<h3 key={k++} className="mt-3 text-xl font-bold text-navy">{inline(t.slice(4))}</h3>);
      i++;
    } else if (t.startsWith("## ")) {
      blok.push(<h2 key={k++} className="mt-6 text-2xl font-extrabold leading-tight text-navy md:text-[28px]">{inline(t.slice(3))}</h2>);
      i++;
    } else if (t.startsWith("|")) {
      const rows: string[] = [];
      while (i < baris.length && baris[i].trim().startsWith("|")) rows.push(baris[i++]);
      const head = sel(rows[0]);
      const body = rows.slice(1).filter((r) => !/^\|?\s*:?-{2,}/.test(r.trim())).map(sel);
      blok.push(
        <div key={k++} className="overflow-x-auto rounded-xl border border-garis">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <thead className="bg-latar-muda">
              <tr>{head.map((h, j) => <th key={j} className="border-b border-garis px-4 py-3 font-bold text-navy">{inline(h)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-b border-garis last:border-0">
                  {r.map((c, j) => <td key={j} className="px-4 py-3 align-top">{inline(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else if (/^[-*] /.test(t)) {
      const items: string[] = [];
      while (i < baris.length && /^[-*] /.test(baris[i].trim())) items.push(baris[i++].trim().slice(2));
      blok.push(<ul key={k++} className="flex list-disc flex-col gap-1.5 pl-6">{items.map((x, j) => <li key={j}>{inline(x)}</li>)}</ul>);
    } else if (/^\d+\. /.test(t)) {
      const items: string[] = [];
      while (i < baris.length && /^\d+\. /.test(baris[i].trim())) items.push(baris[i++].trim().replace(/^\d+\. /, ""));
      blok.push(<ol key={k++} className="flex list-decimal flex-col gap-1.5 pl-6">{items.map((x, j) => <li key={j}>{inline(x)}</li>)}</ol>);
    } else {
      const para: string[] = [];
      while (i < baris.length) {
        const p = baris[i].trim();
        if (!p || p === "---" || p.startsWith("#") || p.startsWith("|") || /^[-*] /.test(p) || /^\d+\. /.test(p)) break;
        para.push(p);
        i++;
      }
      blok.push(
        <p key={k++}>
          {para.map((p, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {inline(p)}
            </span>
          ))}
        </p>,
      );
    }
  }

  return <div className="flex flex-col gap-4 text-[17px] leading-relaxed">{blok}</div>;
}
