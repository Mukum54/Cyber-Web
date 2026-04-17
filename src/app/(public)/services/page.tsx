import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services - CYBER WEB | AI, Software, Marketing & Training Cameroon",
  description: "Explore CYBER WEB services: AI Automation, Custom Software Development, Web Development, Digital Marketing & SEO, Cybersecurity, Hardware Maintenance, IT Training, and Academic Project Support in Yaounde, Cameroon.",
  keywords: [
    "IT services Cameroon",
    "AI automation Yaounde",
    "web development Cameroon",
    "digital marketing services Yaounde",
    "SEO optimization Cameroon",
    "cybersecurity services Cameroon",
    "IT training Yaounde",
    "software development company Yaounde",
    "hardware maintenance Cameroon",
    "academic project support Cameroon",
  ],
  alternates: { canonical: "https://cyberweb.cm/services" },
  openGraph: {
    title: "Our Services - CYBER WEB | AI, Software, Marketing & Training",
    description: "AI automation, custom software, digital marketing, SEO, cybersecurity & IT training services in Cameroon.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Services" }],
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CYBER WEB Services",
  description: "Professional IT and digital innovation services",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "AI Automation & Intelligent Systems", description: "Optimize workflows with AI-powered automation tools", provider: { "@type": "Organization", name: "CYBER WEB" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Custom Software Development", description: "Tailored IT solutions built for your unique needs", provider: { "@type": "Organization", name: "CYBER WEB" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Digital Marketing & SEO", description: "Grow your online presence and reach the right audience", provider: { "@type": "Organization", name: "CYBER WEB" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Service", name: "IT Training & Capacity Building", description: "Equip yourself with practical digital skills", provider: { "@type": "Organization", name: "CYBER WEB" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Service", name: "Academic & Technical Project Support", description: "Transform your ideas into impactful solutions", provider: { "@type": "Organization", name: "CYBER WEB" } } },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
      <ServicesClient />
    </>
  );
}
