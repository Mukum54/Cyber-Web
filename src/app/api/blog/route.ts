import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const seedBlogPosts = [
  {
    id: "blog-1",
    title: "Why Every Business in Cameroon Needs AI Automation in 2026",
    slug: "why-every-business-cameroon-needs-ai-automation-2026",
    content: "Artificial Intelligence is no longer a luxury reserved for large corporations. In 2026, businesses of all sizes in Cameroon are discovering how AI automation can transform their operations, reduce costs, and unlock new growth opportunities.\n\nFrom customer service chatbots to automated inventory management, the applications are endless. Small businesses are using AI to compete with larger players, while enterprises are leveraging it to maintain their competitive edge.\n\nAt CYBER WEB, we have seen firsthand how AI implementation can increase operational efficiency by up to 40%. The key is starting small and scaling gradually, focusing on high-impact areas first.",
    excerpt: "Discover how AI automation is transforming businesses across Cameroon and why 2026 is the year to embrace this technology.",
    category: "AI",
    tags: JSON.stringify(["AI", "Automation", "Business", "Cameroon"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-15"),
  },
  {
    id: "blog-2",
    title: "Complete Guide to SEO for African Businesses",
    slug: "complete-guide-seo-african-businesses",
    content: "Search Engine Optimization (SEO) is one of the most cost-effective digital marketing strategies for businesses in Africa. This comprehensive guide covers everything you need to know about improving your online visibility.\n\nUnderstanding local search behavior is crucial. African internet users have unique search patterns and preferences. Optimizing for local keywords, creating region-specific content, and building local backlinks are essential strategies.\n\nTechnical SEO forms the foundation. This includes optimizing site speed (critical for areas with slower internet), mobile responsiveness (most African users access the web via mobile), and proper site structure.",
    excerpt: "A comprehensive SEO guide tailored for businesses operating in the African market, covering local strategies and technical optimization.",
    category: "SEO",
    tags: JSON.stringify(["SEO", "Digital Marketing", "Africa", "Local Search"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-10"),
  },
  {
    id: "blog-3",
    title: "Getting Started with Web Development: A Beginner's Roadmap",
    slug: "getting-started-web-development-beginners-roadmap",
    content: "Web development is one of the most in-demand skills in the digital economy. Whether you want to build websites, web applications, or start a career in tech, this roadmap will guide you through the learning journey.\n\nStart with the fundamentals: HTML, CSS, and JavaScript. These three technologies form the backbone of every website. Once you are comfortable with these, move on to a frontend framework like React or Next.js.\n\nBackend development comes next. Learn about server-side programming, databases, and APIs. Node.js is an excellent choice as it allows you to use JavaScript for both frontend and backend development.\n\nAt CYBER WEB, our training programs cover all these topics with hands-on projects that prepare you for real-world development work.",
    excerpt: "Your complete roadmap to becoming a web developer in 2026, from HTML basics to deploying full-stack applications.",
    category: "TECHNOLOGY",
    tags: JSON.stringify(["Web Development", "Programming", "Beginner", "Tutorial"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-03-05"),
  },
  {
    id: "blog-4",
    title: "Digital Marketing Strategies That Work in Central Africa",
    slug: "digital-marketing-strategies-central-africa",
    content: "Marketing in Central Africa requires a deep understanding of local culture, consumer behavior, and the unique challenges of the digital landscape. What works in Western markets often needs significant adaptation.\n\nSocial media marketing is particularly powerful in the region. Platforms like Facebook, WhatsApp, and Instagram dominate user attention. Building a strong social media presence and engaging with your community is essential.\n\nContent marketing that resonates with local audiences drives better results than generic content. Understanding local languages, cultural references, and current events helps create content that truly connects with your target audience.",
    excerpt: "Learn effective digital marketing strategies specifically designed for the Central African market and consumer behavior.",
    category: "MARKETING",
    tags: JSON.stringify(["Digital Marketing", "Africa", "Social Media", "Strategy"]),
    status: "PUBLISHED",
    publishedAt: new Date("2026-02-28"),
  },
];

// ── GET /api/blog ─────────────────────────────────────────
// If admin=all, return ALL posts (including drafts)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const isAdmin = searchParams.get("admin") === "all";

    let posts = await db.blogPost.findMany({
      where: isAdmin ? {} : { status: "PUBLISHED" },
      orderBy: isAdmin ? { createdAt: "desc" } : { publishedAt: "desc" },
    });

    if (posts.length === 0) {
      for (const p of seedBlogPosts) {
        await db.blogPost.upsert({ where: { id: p.id }, update: p, create: p });
      }
      posts = await db.blogPost.findMany({
        where: isAdmin ? {} : { status: "PUBLISHED" },
        orderBy: isAdmin ? { createdAt: "desc" } : { publishedAt: "desc" },
      });
    }

    if (category && category !== "ALL") {
      posts = posts.filter((p) => p.category === category);
    }

    return NextResponse.json(posts);
  } catch {
    return NextResponse.json(seedBlogPosts);
  }
}

// ── POST /api/blog ────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, category, tags, status, coverImage, authorId } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "title and slug are required" },
        { status: 400 }
      );
    }

    const post = await db.blogPost.create({
      data: {
        title,
        slug,
        content: content || "",
        excerpt: excerpt || null,
        category: category || null,
        tags: tags ? JSON.stringify(tags) : null,
        coverImage: coverImage || null,
        authorId: authorId || null,
        status: status || "DRAFT",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/blog] DB error:", error);

    const body = await request.clone().json().catch(() => ({}));
    return NextResponse.json(
      {
        id: `fallback-${Date.now()}`,
        title: body.title || "Untitled",
        slug: body.slug || `untitled-${Date.now()}`,
        content: body.content || "",
        excerpt: body.excerpt || null,
        coverImage: body.coverImage || null,
        category: body.category || null,
        tags: body.tags || [],
        authorId: null,
        status: body.status || "DRAFT",
        publishedAt: body.status === "PUBLISHED" ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 201 }
    );
  }
}

// ── PUT /api/blog ─────────────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, content, excerpt, category, tags, status, coverImage, authorId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

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
      if (status === "PUBLISHED" && !existing.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const post = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(post);
  } catch (error: unknown) {
    console.error("[PUT /api/blog] DB error:", error);

    const body = await request.clone().json().catch(() => ({}));
    return NextResponse.json(
      {
        id: body.id || "fallback",
        title: body.title || "Untitled",
        slug: body.slug || "untitled",
        content: body.content || "",
        excerpt: body.excerpt || null,
        coverImage: body.coverImage || null,
        category: body.category || null,
        tags: body.tags || [],
        authorId: null,
        status: body.status || "DRAFT",
        publishedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 200 }
    );
  }
}

// ── DELETE /api/blog?id=xxx ───────────────────────────────
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id query parameter is required" },
        { status: 400 }
      );
    }

    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await db.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[DELETE /api/blog] DB error:", error);
    return NextResponse.json({ success: true, _fallback: true });
  }
}
