import { fullAddress, site } from "@/content/site";

/** Menyisipkan structured data (schema.org) ke halaman. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Schema usaha. Alamat diambil dari content/site.ts supaya sama persis dengan footer. */
export const schemaUsaha = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#usaha`,
  name: site.legalName,
  alternateName: site.brand,
  url: site.url,
  image: `${site.url}/images/logo-atrahdis.png`,
  telephone: `+${site.whatsapp.number}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.building}, ${site.address.street}, ${site.address.area}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: site.hours.days,
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
  areaServed: "ID",
  description: `Jasa pembuatan SBU konstruksi, perpanjangan SBU, dan SKK tenaga ahli. ${fullAddress}.`,
};

export const schemaLayanan = (nama: string, path: string, deskripsi: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: nama,
  description: deskripsi,
  url: `${site.url}${path}`,
  areaServed: "ID",
  provider: { "@id": `${site.url}/#usaha` },
});
