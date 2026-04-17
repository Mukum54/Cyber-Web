import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us - CYBER WEB | IT & Digital Innovation Company Cameroon",
  description:
    "Learn about CYBER WEB - an emerging IT and digital innovation startup in Yaounde, Cameroon. Founded in 2024 by Mukum Dieudonne, we deliver AI automation, custom software, digital marketing, SEO, cybersecurity, and IT training solutions across Central Africa.",
  keywords: [
    "about CYBER WEB",
    "CYBER WEB Cameroon",
    "Mukum Dieudonne",
    "IT company Yaounde",
    "digital innovation Cameroon",
    "tech startup Cameroon",
    "AI company Cameroon",
    "web development company Yaounde",
  ],
  alternates: { canonical: "https://cyberweb.cm/about" },
  openGraph: {
    title: "About CYBER WEB - IT & Digital Innovation Company Cameroon",
    description: "Founded in 2024 in Yaounde, Cameroon. AI, Software, Marketing & Training.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About CYBER WEB" }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
