import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all achievements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("isActive");

    const where: Record<string, unknown> = {};
    if (activeOnly === "true") {
      where.isActive = true;
    }

    const achievements = await db.achievement.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

// POST create an achievement
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, icon, date, image, isActive, order } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const achievement = await db.achievement.create({
      data: {
        title,
        description: description || "",
        icon: icon || null,
        date: date || null,
        image: image || null,
        isActive: isActive ?? true,
        order: order ?? 0,
      },
    });

    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    console.error("Error creating achievement:", error);
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}

// PUT update an achievement
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, icon, date, image, isActive, order } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const achievement = await db.achievement.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(date !== undefined && { date }),
        ...(image !== undefined && { image }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error("Error updating achievement:", error);
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 });
  }
}

// DELETE an achievement
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
