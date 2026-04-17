import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lazy-init Resend only when actually sending
let resendInstance: InstanceType<typeof import("resend").Resend> | null = null;
function getResend() {
  if (!resendInstance && process.env.RESEND_API_KEY) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const resendModule = require("resend");
    resendInstance = new resendModule.Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

// Input sanitization - strip HTML tags and limit length
function sanitize(str: string, maxLength: number): string {
  return str
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'&]/g, "") // strip dangerous chars
    .slice(0, maxLength)
    .trim();
}

// Rate limiter for contact form (per IP)
const contactRateLimit = new Map<string, { count: number; resetAt: number }>();
const CONTACT_RATE_WINDOW = 60_000; // 1 minute
const CONTACT_RATE_MAX = 3; // max 3 submissions per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = contactRateLimit.get(ip);

  if (!entry || now >= entry.resetAt) {
    contactRateLimit.set(ip, { count: 1, resetAt: now + CONTACT_RATE_WINDOW });
    return true;
  }

  if (entry.count >= CONTACT_RATE_MAX) {
    return false; // rate limited
  }

  entry.count++;
  return true;
}

// Cooldown tracker per email to prevent repeated spam from same email
const emailCooldown = new Map<string, number>();
const EMAIL_COOLDOWN_MS = 5 * 60_000; // 5 minutes between submissions from same email

export async function POST(request: Request) {
  try {
    // Rate limiting by IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many submissions. Please wait a minute before trying again." }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Email cooldown check
    const now = Date.now();
    const lastSubmission = emailCooldown.get(email.toLowerCase());
    if (lastSubmission && now - lastSubmission < EMAIL_COOLDOWN_MS) {
      return NextResponse.json({ error: "Please wait a few minutes before submitting another message." }, { status: 429 });
    }

    // Sanitize inputs
    const cleanName = sanitize(name, 100);
    const cleanEmail = sanitize(email, 254);
    const cleanPhone = phone ? sanitize(phone, 20) : null;
    const cleanSubject = subject ? sanitize(subject, 200) : null;
    const cleanMessage = sanitize(message, 5000);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    // Set email cooldown
    emailCooldown.set(cleanEmail.toLowerCase(), now);

    // 1. Save to database
    const submission = await db.contactSubmission.create({
      data: { name: cleanName, email: cleanEmail, phone: cleanPhone, subject: cleanSubject, message: cleanMessage },
    });

    // 2. Send email notification
    try {
      const resend = getResend();
      if (resend) {
        const emailSubject = cleanSubject
          ? `[CYBER WEB] ${cleanSubject} - New message from ${cleanName}`
          : `[CYBER WEB] New message from ${cleanName}`;

        await resend.emails.send({
          from: "CYBER WEB <onboarding@resend.dev>",
          to: ["cyberweb237@gmail.com"],
          replyTo: cleanEmail,
          subject: emailSubject,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #f97316, #f59e0b); padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">CYBER WEB Website</p>
              </div>
              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; width: 140px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${cleanName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:${cleanEmail}" style="color: #f97316;">${cleanEmail}</a></td>
                  </tr>
                  ${cleanPhone ? `<tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;"><a href="tel:${cleanPhone}" style="color: #f97316;">${cleanPhone}</a></td>
                  </tr>` : ''}
                  ${cleanSubject ? `<tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Subject</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${cleanSubject}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 12px 0; font-weight: 600; color: #374151; vertical-align: top;">Message</td>
                    <td style="padding: 12px 0; color: #111827; line-height: 1.6;">${cleanMessage.replace(/\n/g, "<br>")}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #f97316;">
                  <p style="color: #6b7280; font-size: 13px;">Received on ${new Date().toLocaleString("en-US", { timeZone: "Africa/Douala", dateStyle: "full", timeStyle: "short" })}</p>
                  <p style="color: #6b7280; font-size: 13px; margin-top: 4px;">Reply directly to this email to respond to ${cleanName}.</p>
                </div>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json([]);
  }
}
