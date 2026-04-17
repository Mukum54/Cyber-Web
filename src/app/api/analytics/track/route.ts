import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// In-memory rate limiter for analytics tracking
const trackRateLimit = new Map<string, { count: number; resetAt: number }>();
const TRACK_RATE_WINDOW = 60_000; // 1 minute
const TRACK_RATE_MAX = 10; // max 10 tracks per minute per IP

function parseUserAgent(ua: string): { device: string; browser: string; os: string } {
  let device = "Desktop";
  let browser = "Unknown";
  let os = "Unknown";

  if (!ua) return { device, browser, os };

  // Device detection
  if (/Mobile|Android.*Mobile|iPhone|iPod/i.test(ua)) device = "Mobile";
  else if (/iPad|Android(?!.*Mobile)/i.test(ua)) device = "Tablet";

  // Browser detection
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";

  // OS detection
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";

  return { device, browser, os };
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const entry = trackRateLimit.get(ip);

    if (entry && entry.count >= TRACK_RATE_MAX && now < entry.resetAt) {
      return NextResponse.json({ error: "Rate limited" }, { status: 429 });
    }

    if (entry && now >= entry.resetAt) {
      trackRateLimit.set(ip, { count: 1, resetAt: now + TRACK_RATE_WINDOW });
    } else if (entry) {
      entry.count++;
    } else {
      trackRateLimit.set(ip, { count: 1, resetAt: now + TRACK_RATE_WINDOW });
    }

    const body = await request.json();
    const { path, title, referrer, sessionId } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Sanitize
    const cleanPath = path.slice(0, 500);
    const cleanTitle = title ? String(title).slice(0, 200) : null;
    const cleanReferrer = referrer ? String(referrer).slice(0, 500) : null;
    const cleanSessionId = sessionId ? String(sessionId).slice(0, 100) : null;

    const ua = request.headers.get("user-agent") || null;
    const { device, browser, os } = ua ? parseUserAgent(ua) : { device: "Desktop", browser: "Unknown", os: "Unknown" };

    // Determine country from headers (Vercel/Cloudflare set this)
    const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || null;

    await db.pageView.create({
      data: {
        path: cleanPath,
        title: cleanTitle,
        referrer: cleanReferrer,
        userAgent: ua,
        country,
        device,
        browser,
        os,
        sessionId: cleanSessionId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ error: "Failed to track" }, { status: 500 });
  }
}
