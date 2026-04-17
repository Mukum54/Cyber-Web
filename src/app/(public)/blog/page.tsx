import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - CYBER WEB | Tech Articles, AI, SEO & Programming Cameroon",
  description: "Read the latest articles on technology, AI, digital marketing, SEO, programming, and cybersecurity from CYBER WEB. Expert insights from Cameroon's leading IT company.",
  keywords: [
    "CYBER WEB blog",
    "tech blog Cameroon",
    "AI articles Africa",
    "SEO tips Cameroon",
    "programming tutorials",
    "digital marketing blog Yaounde",
    "technology news Cameroon",
    "web development articles",
    "cybersecurity blog Cameroon",
  ],
  alternates: { canonical: "https://cyberweb.cm/blog" },
  openGraph: {
    title: "Blog - CYBER WEB | Tech Articles & Expert Insights",
    description: "Latest articles on AI, digital marketing, SEO, programming & technology from Cameroon's IT company.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Blog" }],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
