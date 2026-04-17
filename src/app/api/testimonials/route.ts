import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const seedTestimonials = [
  { id: "t-1", content: "CYBER WEB transformed our business operations with their AI automation solutions. Our efficiency increased by 40% within the first three months of implementation.", author: "Emmanuel Nkoulou", company: "TechVision Solutions", role: "CEO", rating: 5 },
  { id: "t-2", content: "The digital marketing team at CYBER WEB helped us grow our online presence dramatically. Our website traffic tripled and we saw a 200% increase in qualified leads.", author: "Grace Mbarga", company: "AfriShop Online", role: "Marketing Director", rating: 5 },
  { id: "t-3", content: "The training programs are hands-on and practical. I went from zero programming knowledge to building full-stack applications in just 8 weeks. Highly recommended!", author: "Hervé Fotso", company: "Independent Developer", role: "Student", rating: 5 },
  { id: "t-4", content: "Their project support team guided me through my final year project from concept to implementation. The mentorship was invaluable and helped me graduate with distinction.", author: "Sylvie Nganou", company: "University of Yaounde", role: "Student", rating: 5 },
  { id: "t-5", content: "CYBER WEB delivered our e-commerce platform on time and within budget. The quality exceeded our expectations and their ongoing support has been excellent.", author: "Patrice Kamga", company: "Cameroon Crafts Co-op", role: "Operations Manager", rating: 4 },
];

// GET all testimonials with optional ?isActive=true filter
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("isActive");

    const where: Record<string, unknown> = {};
    if (activeOnly === "true") {
      where.isActive = true;
    }

    let testimonials = await db.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (testimonials.length === 0) {
      for (const t of seedTestimonials) {
        await db.testimonial.upsert({ where: { id: t.id }, update: t, create: t });
      }
      testimonials = await db.testimonial.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    }
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json(seedTestimonials);
  }
}

// POST create a testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, author, company, role, rating, avatar, isActive } = body;

    if (!content || !author) {
      return NextResponse.json(
        { error: "Content and author are required" },
        { status: 400 }
      );
    }

    const testimonial = await db.testimonial.create({
      data: {
        content,
        author,
        company: company || null,
        role: role || null,
        rating: rating ?? 5,
        avatar: avatar || null,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

// PUT update a testimonial
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, content, author, company, role, rating, avatar, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        ...(content !== undefined && { content }),
        ...(author !== undefined && { author }),
        ...(company !== undefined && { company }),
        ...(role !== undefined && { role }),
        ...(rating !== undefined && { rating }),
        ...(avatar !== undefined && { avatar }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE a testimonial
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
