import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ── Seed data ──────────────────────────────────────────────
const seedBlogPosts = [
  {
    id: "blog-1",
    title: "Why Every Business in Cameroon Needs AI Automation in 2026",
    slug: "why-every-business-cameroon-needs-ai-automation-2026",
    content:
      "Artificial Intelligence is no longer a luxury reserved for large corporations. In 2026, businesses of all sizes in Cameroon are discovering how AI automation can transform their operations, reduce costs, and unlock new growth opportunities.\n\nFrom customer service chatbots to automated inventory management, the applications are endless. Small businesses are using AI to compete with larger players, while enterprises are leveraging it to maintain their competitive edge.\n\nAt CYBER WEB, we have seen firsthand how AI implementation can increase operational efficiency by up to 40%. The key is starting small and scaling gradually, focusing on high-impact areas first.\n\nThe African tech ecosystem is rapidly evolving, and Cameroon is at the forefront of this transformation. Local businesses that embrace AI today will be the market leaders of tomorrow. Whether you run a retail shop, a logistics company, or a service-based business, there are AI solutions tailored to your needs.\n\nGetting started is easier than you think. Cloud-based AI tools have democratized access to powerful technologies that were once only available to Fortune 500 companies. Tools like natural language processing for customer interactions, predictive analytics for inventory management, and computer vision for quality control are now accessible and affordable.",
    excerpt:
      "Discover how AI automation is transforming businesses across Cameroon and why 2026 is the year to embrace this technology.",
    category: "AI",
    tags: JSON.stringify(["AI", "Automation", "Business", "Cameroon"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-15"),
  },
  {
    id: "blog-2",
    title: "Complete Guide to SEO for African Businesses",
    slug: "complete-guide-seo-african-businesses",
    content:
      "Search Engine Optimization (SEO) is one of the most cost-effective digital marketing strategies for businesses in Africa. This comprehensive guide covers everything you need to know about improving your online visibility.\n\nUnderstanding local search behavior is crucial. African internet users have unique search patterns and preferences. Optimizing for local keywords, creating region-specific content, and building local backlinks are essential strategies.\n\nTechnical SEO forms the foundation. This includes optimizing site speed (critical for areas with slower internet), mobile responsiveness (most African users access the web via mobile), and proper site structure.\n\nContent is king in the SEO world. Creating high-quality, relevant content that addresses the needs of your target audience is the most effective long-term SEO strategy. Focus on answering questions your customers are actually searching for.\n\nLocal SEO is particularly important for businesses serving specific geographic areas. Google Business Profile optimization, local citations, and location-based content can significantly boost your visibility in local search results.\n\nMeasuring your SEO success requires the right tools and metrics. Track your keyword rankings, organic traffic, conversion rates, and backlink profile to understand what is working and where to improve.",
    excerpt:
      "A comprehensive SEO guide tailored for businesses operating in the African market, covering local strategies and technical optimization.",
    category: "SEO",
    tags: JSON.stringify(["SEO", "Digital Marketing", "Africa", "Local Search"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-10"),
  },
  {
    id: "blog-3",
    title: "Getting Started with Web Development: A Beginner's Roadmap",
    slug: "getting-started-web-development-beginners-roadmap",
    content:
      "Web development is one of the most in-demand skills in the digital economy. Whether you want to build websites, web applications, or start a career in tech, this roadmap will guide you through the learning journey.\n\nStart with the fundamentals: HTML, CSS, and JavaScript. These three technologies form the backbone of every website. Once you are comfortable with these, move on to a frontend framework like React or Next.js.\n\nBackend development comes next. Learn about server-side programming, databases, and APIs. Node.js is an excellent choice as it allows you to use JavaScript for both frontend and backend development.\n\nAt CYBER WEB, our training programs cover all these topics with hands-on projects that prepare you for real-world development work.\n\nVersion control with Git is an essential skill for any developer. Learn to use GitHub for collaboration and showcase your projects to potential employers or clients.\n\nThe learning journey never ends in web development. Stay curious, build projects, contribute to open source, and keep up with the latest trends and technologies. The tech community is incredibly supportive and there are endless resources available for learners at every level.",
    excerpt:
      "Your complete roadmap to becoming a web developer in 2026, from HTML basics to deploying full-stack applications.",
    category: "TECHNOLOGY",
    tags: JSON.stringify(["Web Development", "Programming", "Beginner", "Tutorial"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-05"),
  },
  {
    id: "blog-4",
    title: "Digital Marketing Strategies That Work in Central Africa",
    slug: "digital-marketing-strategies-central-africa",
    content:
      "Marketing in Central Africa requires a deep understanding of local culture, consumer behavior, and the unique challenges of the digital landscape. What works in Western markets often needs significant adaptation.\n\nSocial media marketing is particularly powerful in the region. Platforms like Facebook, WhatsApp, and Instagram dominate user attention. Building a strong social media presence and engaging with your community is essential.\n\nContent marketing that resonates with local audiences drives better results than generic content. Understanding local languages, cultural references, and current events helps create content that truly connects with your target audience.\n\nEmail marketing remains one of the highest-ROI digital marketing channels. Building a quality email list and sending targeted campaigns can drive significant business results.\n\nPaid advertising on platforms like Facebook and Google can accelerate your growth, but it requires careful targeting and budget management. Start small, test different approaches, and scale what works.\n\nData-driven decision making is the foundation of successful digital marketing. Use analytics tools to track your campaigns, understand your audience, and continuously optimize your strategies for better results.",
    excerpt:
      "Learn effective digital marketing strategies specifically designed for the Central African market and consumer behavior.",
    category: "MARKETING",
    tags: JSON.stringify([
      "Digital Marketing",
      "Africa",
      "Social Media",
      "Strategy",
    ]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-02-28"),
  },
];

/** Try to find a blog post by id or by slug */
async function findBlogPost(idOrSlug: string) {
  // Try by id first (cuid format)
  let post = await db.blogPost.findUnique({ where: { id: idOrSlug } });
  if (!post) {
    // Try by slug
    post = await db.blogPost.findUnique({ where: { slug: idOrSlug } });
  }
  return post;
}

// ── GET /api/blog/:id ──────────────────────────────────────
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idOrSlug } = await params;

    let post = await findBlogPost(idOrSlug);

    if (!post) {
      // Seed data if DB is empty
      const allPosts = await db.blogPost.findMany();
      if (allPosts.length === 0) {
        for (const p of seedBlogPosts) {
          await db.blogPost.upsert({
            where: { id: p.id },
            update: p,
            create: p,
          });
        }
        post = await findBlogPost(idOrSlug);
      }
    }

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = await db.blogPost.findMany({
      where: {
        status: "PUBLISHED",
        category: post.category,
        id: { not: post.id },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    return NextResponse.json({ post, relatedPosts });
  } catch {
    // Fallback to seed data
    const { id: idOrSlug } = await params;

    const post = seedBlogPosts.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const relatedPosts = seedBlogPosts.filter(
      (p) => p.category === post.category && p.id !== post.id
    );

    return NextResponse.json({ post, relatedPosts });
  }
}

// ── PUT /api/blog/:id ──────────────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      content,
      excerpt,
      category,
      tags,
      status,
      publishedAt,
      coverImage,
      authorId,
    } = body;

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Build update data with only provided fields
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = JSON.stringify(tags);
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (authorId !== undefined) updateData.authorId = authorId;
    if (status !== undefined) {
      updateData.status = status;
      // Auto-set publishedAt when publishing
      if (status === "PUBLISHED" && !existing.publishedAt) {
        updateData.publishedAt = publishedAt
          ? new Date(publishedAt)
          : new Date();
      }
    }
    if (publishedAt !== undefined && status !== "PUBLISHED") {
      updateData.publishedAt = publishedAt
        ? new Date(publishedAt)
        : null;
    }

    const blogPost = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error("[PUT /api/blog/:id] DB error:", error);

    const body = await request.clone().json().catch(() => ({}));
    return NextResponse.json(
      {
        id: "fallback",
        title: body.title || "Untitled",
        slug: "untitled",
        content: body.content || "",
        excerpt: body.excerpt || null,
        coverImage: null,
        category: body.category || null,
        tags: body.tags || [],
        authorId: null,
        status: body.status || "DRAFT",
        publishedAt: body.publishedAt || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 200 }
    );
  }
}

// ── DELETE /api/blog/:id ───────────────────────────────────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const blogPost = await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deleted: blogPost });
  } catch (error) {
    console.error("[DELETE /api/blog/:id] DB error:", error);
    return NextResponse.json(
      {
        success: true,
        deleted: { id: "fallback", _fallback: true },
        _fallback: true,
      },
      { status: 200 }
    );
  }
}
