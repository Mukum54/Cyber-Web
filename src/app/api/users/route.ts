import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ── Seed data ──────────────────────────────────────────────
const SEED_USERS = [
  {
    name: "Grace Mbarga",
    email: "grace@example.com",
    role: "STUDENT",
    status: "ACTIVE",
    skills: JSON.stringify(["React", "Node.js"]),
    socialLinks: JSON.stringify({ github: "https://github.com/grace" }),
    bio: "Full-stack developer",
  },
  {
    name: "Herve Fotso",
    email: "herve@example.com",
    role: "STUDENT",
    status: "ACTIVE",
    skills: JSON.stringify(["Python", "AI"]),
    bio: "AI enthusiast",
  },
  {
    name: "Sylvie Nganou",
    email: "sylvie@example.com",
    role: "STUDENT",
    status: "ACTIVE",
    skills: JSON.stringify(["JavaScript", "SEO"]),
    bio: "Digital marketer",
  },
  {
    name: "Patrice Kamga",
    email: "patrice@example.com",
    role: "STUDENT",
    status: "INACTIVE",
    skills: JSON.stringify(["Mobile Dev"]),
    bio: "Mobile developer",
  },
  {
    name: "Mukum Dieudonne",
    email: "mukum@cyberweb.cm",
    role: "ADMIN",
    status: "ACTIVE",
    skills: JSON.stringify(["AI", "Software", "Marketing"]),
    bio: "Founder & CEO",
    socialLinks: JSON.stringify({
      github: "https://github.com/cyberweb",
      linkedin: "https://linkedin.com/in/mukum",
    }),
  },
];

// ── GET /api/users ─────────────────────────────────────────
export async function GET() {
  try {
    let users = await db.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Seed if empty
    if (users.length === 0) {
      await db.user.createMany({ data: SEED_USERS });
      users = await db.user.findMany({ orderBy: { createdAt: "asc" } });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("[GET /api/users] DB error:", error);
    return NextResponse.json(SEED_USERS, { status: 200 });
  }
}

// ── POST /api/users ────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, bio, phone, skills, socialLinks } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        role: role || "STUDENT",
        bio: bio || null,
        phone: phone || null,
        skills: skills ? JSON.stringify(skills) : null,
        socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/users] DB error:", error);

    // Return a fallback user object
    const body = await request.clone().json().catch(() => ({}));
    return NextResponse.json(
      {
        id: "fallback-id",
        name: body.name || "Unknown",
        email: body.email || "unknown@example.com",
        role: body.role || "STUDENT",
        bio: body.bio || null,
        phone: body.phone || null,
        skills: body.skills || [],
        socialLinks: body.socialLinks || {},
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 201 }
    );
  }
}
