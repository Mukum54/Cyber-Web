import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import JsonLd from "@/components/shared/json-ld";
import { AnalyticsTracker } from "@/components/shared/AnalyticsTracker";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberweb.cm"),
  title: {
    default: "CYBER WEB - IT & Digital Innovation Company | Yaounde, Cameroon",
    template: "%s | CYBER WEB",
  },
  description:
    "CYBER WEB is a leading IT and digital innovation company in Yaounde, Cameroon. We deliver AI automation, custom software development, web development, digital marketing, SEO optimization, cybersecurity, and professional IT training.",
  keywords: [
    "CYBER WEB",
    "IT company Cameroon",
    "IT company Yaounde",
    "web development Yaounde",
    "web development Cameroon",
    "AI automation Africa",
    "AI automation Cameroon",
    "digital marketing Cameroon",
    "digital marketing Yaounde",
    "SEO services Cameroon",
    "SEO company Yaounde",
    "IT training Cameroon",
    "programming courses Cameroon",
    "software development Cameroon",
    "CYBER WEB Mukum Dieudonne",
    "tech startup Cameroon",
    "tech startup Yaounde",
    "digital transformation Cameroon",
    "cybersecurity Cameroon",
    "hardware maintenance Yaounde",
    "best IT company Yaounde",
    "affordable web design Cameroon",
    "professional IT training Yaounde",
  ],
  authors: [{ name: "CYBER WEB", url: "https://cyberweb.cm" }],
  creator: "CYBER WEB",
  publisher: "CYBER WEB",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cyberweb.cm",
    siteName: "CYBER WEB",
    title: "CYBER WEB - IT & Digital Innovation Company | Yaounde, Cameroon",
    description:
      "Delivering AI-powered solutions, custom software, web development, digital marketing, SEO, cybersecurity, and professional IT training in Cameroon and Central Africa.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB - IT Company Yaounde Cameroon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CYBER WEB - IT & Digital Innovation Company",
    description: "AI automation, software development, digital marketing, SEO & IT training in Cameroon.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://cyberweb.cm" },
  verification: {
    google: "google-site-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <JsonLd />
          <AnalyticsTracker />
          <Navbar />
          <main className="min-h-screen pt-16 md:pt-20">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
