import type { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Electronics Shop - CYBER WEB | Buy Laptops & Tech in Cameroon",
  description:
    "Shop premium electronics at the best prices in Cameroon. Laptops, monitors, peripherals, networking gear, and accessories from top brands. CYBER WEB Electronics Yaounde.",
  keywords: [
    "buy electronics Cameroon",
    "laptops Yaounde",
    "electronics shop Cameroon",
    "computer store Yaounde",
    "monitors Cameroon",
    "IT equipment Africa",
    "networking equipment Cameroon",
    "cheap laptops Yaounde",
    "CYBER WEB shop",
    "tech accessories Cameroon",
  ],
  alternates: { canonical: "https://cyberweb.cm/shop" },
  openGraph: {
    title: "Electronics Shop - CYBER WEB | Buy Laptops & Tech in Cameroon",
    description: "Premium electronics at the best prices in Cameroon. Laptops, monitors, peripherals & accessories.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Electronics Shop" }],
  },
};

const shopJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "CYBER WEB Electronics Shop",
  description: "Premium electronics at the best prices in Cameroon",
  url: "https://cyberweb.cm/shop",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaounde",
    addressCountry: "CM",
  },
};

export default function ShopPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }} />
      <ShopClient />
    </>
  );
}
