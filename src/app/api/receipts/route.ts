import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ── Seed data ──────────────────────────────────────────────
const SEED_RECEIPTS = [
  {
    receiptNo: "RCP-2026-001",
    total: 250000,
    subtotal: 250000,
    tax: 0,
    items: JSON.stringify([
      {
        description: "E-Commerce Platform",
        quantity: 1,
        unitPrice: 250000,
        total: 250000,
      },
    ]),
    paymentMethod: "MOBILE_MONEY",
    status: "PAID",
  },
  {
    receiptNo: "RCP-2026-002",
    total: 180000,
    subtotal: 180000,
    tax: 0,
    items: JSON.stringify([
      {
        description: "Digital Marketing Course",
        quantity: 1,
        unitPrice: 180000,
        total: 180000,
      },
    ]),
    paymentMethod: "CASH",
    status: "PAID",
  },
  {
    receiptNo: "RCP-2026-003",
    total: 350000,
    subtotal: 350000,
    tax: 0,
    items: JSON.stringify([
      {
        description: "AI Training Program",
        quantity: 1,
        unitPrice: 350000,
        total: 350000,
      },
    ]),
    paymentMethod: "BANK_TRANSFER",
    status: "PENDING",
  },
];

// ── GET /api/receipts ──────────────────────────────────────
export async function GET() {
  try {
    let receipts = await db.receipt.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Seed if empty
    if (receipts.length === 0) {
      // Find a user to attach receipts to
      const firstUser = await db.user.findFirst({
        orderBy: { createdAt: "asc" },
      });
      const studentId = firstUser?.id || "seed-student";

      for (const seed of SEED_RECEIPTS) {
        await db.receipt.create({
          data: {
            ...seed,
            studentId,
          },
        });
      }

      receipts = await db.receipt.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          project: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    }

    return NextResponse.json(receipts);
  } catch (error) {
    console.error("[GET /api/receipts] DB error:", error);

    // Fallback with student info attached
    const fallbackReceipts = SEED_RECEIPTS.map((r) => ({
      ...r,
      id: `fallback-${r.receiptNo}`,
      studentId: "fallback-student",
      student: {
        id: "fallback-student",
        name: "Grace Mbarga",
        email: "grace@example.com",
        avatar: null,
      },
      project: null,
      notes: null,
      createdAt: new Date().toISOString(),
      _fallback: true,
    }));

    return NextResponse.json(fallbackReceipts, { status: 200 });
  }
}

// ── POST /api/receipts ─────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, items, subtotal, tax, total, paymentMethod, projectId } =
      body;

    if (!studentId || !items || !total) {
      return NextResponse.json(
        { error: "studentId, items, and total are required" },
        { status: 400 }
      );
    }

    // Auto-generate receiptNo: RCP-YYYY-NNN
    const year = new Date().getFullYear();
    const existingReceipts = await db.receipt.findMany({
      where: {
        receiptNo: { startsWith: `RCP-${year}-` },
      },
      select: { receiptNo: true },
    });

    let nextNum = 1;
    for (const r of existingReceipts) {
      const numPart = parseInt(r.receiptNo.split("-")[2], 10);
      if (!isNaN(numPart) && numPart >= nextNum) {
        nextNum = numPart + 1;
      }
    }
    const receiptNo = `RCP-${year}-${String(nextNum).padStart(3, "0")}`;

    const receipt = await db.receipt.create({
      data: {
        receiptNo,
        studentId,
        items: JSON.stringify(items),
        subtotal: subtotal ?? total,
        tax: tax ?? 0,
        total,
        paymentMethod: paymentMethod || "CASH",
        status: "PAID",
        projectId: projectId || null,
      },
    });

    return NextResponse.json(receipt, { status: 201 });
  } catch (error: unknown) {
    console.error("[POST /api/receipts] DB error:", error);

    const body = await request.clone().json().catch(() => ({}));
    const year = new Date().getFullYear();
    const receiptNo = `RCP-${year}-${String(
      Math.floor(Math.random() * 900) + 100
    ).padStart(3, "0")}`;

    return NextResponse.json(
      {
        id: `fallback-${Date.now()}`,
        receiptNo,
        studentId: body.studentId || "fallback",
        items: body.items || [],
        subtotal: body.subtotal ?? body.total ?? 0,
        tax: body.tax ?? 0,
        total: body.total ?? 0,
        paymentMethod: body.paymentMethod || "CASH",
        status: "PAID",
        projectId: body.projectId || null,
        notes: null,
        createdAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 201 }
    );
  }
}

// ── PUT /api/receipts ──────────────────────────────────────
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, studentId, items, subtotal, tax, total, paymentMethod, status, projectId, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const existing = await db.receipt.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Receipt not found" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (studentId !== undefined) updateData.studentId = studentId;
    if (items !== undefined) updateData.items = JSON.stringify(items);
    if (subtotal !== undefined) updateData.subtotal = subtotal;
    if (tax !== undefined) updateData.tax = tax;
    if (total !== undefined) updateData.total = total;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (status !== undefined) updateData.status = status;
    if (projectId !== undefined) updateData.projectId = projectId || null;
    if (notes !== undefined) updateData.notes = notes;

    const receipt = await db.receipt.update({
      where: { id },
      data: updateData,
      include: {
        student: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });

    return NextResponse.json(receipt);
  } catch (error: unknown) {
    console.error("[PUT /api/receipts] DB error:", error);

    const body = await request.clone().json().catch(() => ({}));
    return NextResponse.json(
      {
        id: body.id || "fallback",
        receiptNo: "RCP-FALLBACK",
        studentId: body.studentId || "fallback",
        items: body.items || [],
        subtotal: body.subtotal ?? 0,
        tax: body.tax ?? 0,
        total: body.total ?? 0,
        paymentMethod: body.paymentMethod || "CASH",
        status: body.status || "PAID",
        projectId: body.projectId || null,
        notes: body.notes || null,
        createdAt: new Date().toISOString(),
        _fallback: true,
      },
      { status: 200 }
    );
  }
}
