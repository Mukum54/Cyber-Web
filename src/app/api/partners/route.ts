import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all partners
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("isActive");

    const where: Record<string, unknown> = {};
    if (activeOnly === "true") {
      where.isActive = true;
    }

    const partners = await db.partner.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Error fetching partners:", error);
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

// POST create a partner
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, website, logo, country, isActive, order } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const partner = await db.partner.create({
      data: {
        name,
        description: description || null,
        website: website || null,
        logo: logo || null,
        country: country || null,
        isActive: isActive ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    console.error("Error creating partner:", error);
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}

// PUT update a partner
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, website, logo, country, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const partner = await db.partner.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(website !== undefined && { website }),
        ...(logo !== undefined && { logo }),
        ...(country !== undefined && { country }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

// DELETE a partner
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}
