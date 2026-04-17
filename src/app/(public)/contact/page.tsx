import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us - CYBER WEB | IT Company Yaounde, Cameroon",
  description:
    "Contact CYBER WEB for AI automation, software development, digital marketing, SEO, and IT training in Yaounde, Cameroon. Call +237 654 492 652 or email cyberweb237@gmail.com.",
  keywords: [
    "CYBER WEB contact",
    "IT company Yaounde",
    "web development Cameroon contact",
    "AI automation Cameroon",
    "digital marketing Yaounde",
    "IT training Cameroon",
    "software development Cameroon",
    "tech startup Yaounde",
    "CYBER WEB email",
    "CYBER WEB phone number",
  ],
  alternates: { canonical: "https://cyberweb.cm/contact" },
  openGraph: {
    title: "Contact CYBER WEB - IT & Digital Innovation Company",
    description: "Reach out to CYBER WEB for AI automation, software, digital marketing, and IT training in Yaounde, Cameroon.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact CYBER WEB" }],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "CYBER WEB",
    telephone: "+237 654 492 652",
    email: "cyberweb237@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrefour Etoug-Ebe",
      addressLocality: "Yaounde",
      addressCountry: "CM",
    },
    openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-13:00"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <ContactClient />
    </>
  );
}
