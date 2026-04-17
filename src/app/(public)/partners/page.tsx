import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Our Partners - CYBER WEB | Technology Partnerships in Africa",
  description:
    "CYBER WEB collaborates with leading technology companies across Africa and beyond. Discover our trusted partners driving digital innovation and transformation in Cameroon.",
  keywords: [
    "CYBER WEB partners",
    "technology partnerships Africa",
    "IT partners Cameroon",
    "tech collaboration Yaounde",
    "digital innovation partners",
    "KITASARL partnership",
    "software development partners",
    "AI partners Cameroon",
  ],
  alternates: { canonical: "https://cyberweb.cm/partners" },
  openGraph: {
    title: "Our Partners - CYBER WEB",
    description: "Trusted technology partnerships driving innovation in Africa",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Partners" }],
  },
};

const partnersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CYBER WEB",
  description: "IT and Digital Innovation Company with trusted technology partnerships",
  url: "https://cyberweb.cm/partners",
  memberOf: [
    { "@type": "Organization", name: "KITASARL", url: "https://kitasarl.com" },
  ],
};

export default function PartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnersJsonLd) }} />
      <PartnersClient />
    </>
  );
}
