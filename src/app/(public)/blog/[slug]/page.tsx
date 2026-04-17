import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

const seedBlogPosts = [
  {
    slug: "why-every-business-cameroon-needs-ai-automation-2026",
    title: "Why Every Business in Cameroon Needs AI Automation in 2026",
    excerpt:
      "Discover how AI automation is transforming businesses across Cameroon and why 2026 is the year to embrace this technology.",
  },
  {
    slug: "complete-guide-seo-african-businesses",
    title: "Complete Guide to SEO for African Businesses",
    excerpt:
      "A comprehensive SEO guide tailored for businesses operating in the African market, covering local strategies and technical optimization.",
  },
  {
    slug: "getting-started-web-development-beginners-roadmap",
    title: "Getting Started with Web Development: A Beginner's Roadmap",
    excerpt:
      "Your complete roadmap to becoming a web developer in 2026, from HTML basics to deploying full-stack applications.",
  },
  {
    slug: "digital-marketing-strategies-central-africa",
    title: "Digital Marketing Strategies That Work in Central Africa",
    excerpt:
      "Learn effective digital marketing strategies specifically designed for the Central African market and consumer behavior.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { db } = await import("@/lib/db");
    const post = await db.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
    });

    if (post) {
      const tags = post.tags ? JSON.parse(post.tags) : [];
      const keywords = [
        post.title,
        "CYBER WEB blog",
        ...tags,
        post.category || "",
        "technology Cameroon",
        "IT blog Yaounde",
      ].filter(Boolean);

      return {
        title: `${post.title} | CYBER WEB Blog`,
        description: post.excerpt || `Read ${post.title} on the CYBER WEB blog - technology insights from Cameroon's leading IT company.`,
        keywords,
        authors: [{ name: "CYBER WEB", url: "https://cyberweb.cm" }],
        alternates: { canonical: `https://cyberweb.cm/blog/${slug}` },
        openGraph: {
          title: post.title,
          description: post.excerpt || `Read ${post.title} on the CYBER WEB blog.`,
          type: "article",
          publishedTime: post.publishedAt?.toISOString(),
          modifiedTime: post.updatedAt?.toISOString(),
          authors: ["CYBER WEB"],
          url: `https://cyberweb.cm/blog/${slug}`,
          images: post.coverImage
            ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
            : [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Blog" }],
        },
        twitter: {
          card: "summary_large_image",
          title: post.title,
          description: post.excerpt || "",
          images: post.coverImage ? [post.coverImage] : ["/og-image.png"],
        },
      };
    }
  } catch {
    // DB not available, use seed data
  }

  const seedPost = seedBlogPosts.find((p) => p.slug === slug);
  if (seedPost) {
    return {
      title: `${seedPost.title} | CYBER WEB Blog`,
      description: seedPost.excerpt,
      keywords: [seedPost.title, "CYBER WEB blog", "technology Cameroon", "IT blog Yaounde"],
      alternates: { canonical: `https://cyberweb.cm/blog/${slug}` },
      openGraph: {
        title: seedPost.title,
        description: seedPost.excerpt,
        type: "article",
        url: `https://cyberweb.cm/blog/${slug}`,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: seedPost.title }],
      },
    };
  }

  return {
    title: "Blog Post - CYBER WEB",
    description: "Read articles on technology, AI, and digital marketing.",
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
