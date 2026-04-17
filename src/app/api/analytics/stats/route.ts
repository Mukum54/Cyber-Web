import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "7d"; // 7d, 30d, 90d, 1y

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    switch (range) {
      case "30d":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(now.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case "7d":
      default:
        startDate.setDate(now.getDate() - 7);
        break;
    }

    // Run all queries in parallel
    const [
      totalViews,
      uniqueVisitors,
      dailyViews,
      topPages,
      deviceStats,
      browserStats,
      countryStats,
      topReferrers,
      osStats,
      recentViews,
      hourlyDistribution,
    ] = await Promise.all([
      // Total page views in range
      db.pageView.count({
        where: { createdAt: { gte: startDate } },
      }),

      // Unique visitors (by sessionId)
      db.pageView.groupBy({
        by: ["sessionId"],
        where: { createdAt: { gte: startDate }, sessionId: { not: null } },
      }).then((results) => results.length),

      // Daily page views for chart
      db.$queryRaw<Array<{ date: string; views: number }>>`
        SELECT DATE("createdAt") as date, COUNT(*)::int as views
        FROM page_views
        WHERE "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,

      // Top pages
      db.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),

      // Device stats
      db.pageView.groupBy({
        by: ["device"],
        where: { createdAt: { gte: startDate } },
        _count: { device: true },
        orderBy: { _count: { device: "desc" } },
      }),

      // Browser stats
      db.pageView.groupBy({
        by: ["browser"],
        where: { createdAt: { gte: startDate } },
        _count: { browser: true },
        orderBy: { _count: { browser: "desc" } },
      }),

      // Country stats
      db.pageView.groupBy({
        by: ["country"],
        where: { createdAt: { gte: startDate }, country: { not: null } },
        _count: { country: true },
        orderBy: { _count: { country: "desc" } },
        take: 10,
      }),

      // Top referrers - fetch all and filter
      db.pageView.groupBy({
        by: ["referrer"],
        where: { createdAt: { gte: startDate } },
        _count: { referrer: true },
        orderBy: { _count: { referrer: "desc" } },
        take: 10,
      }).then((results) => results.filter(r => r.referrer && r.referrer !== "")),

      // OS stats
      db.pageView.groupBy({
        by: ["os"],
        where: { createdAt: { gte: startDate } },
        _count: { os: true },
        orderBy: { _count: { os: "desc" } },
      }),

      // Recent views (last 50)
      db.pageView.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          path: true,
          title: true,
          country: true,
          device: true,
          browser: true,
          createdAt: true,
        },
      }),

      // Hourly distribution for heatmap
      db.$queryRaw<Array<{ hour: number; views: number }>>`
        SELECT EXTRACT(HOUR FROM "createdAt")::int as hour, COUNT(*)::int as views
        FROM page_views
        WHERE "createdAt" >= ${startDate}
        GROUP BY EXTRACT(HOUR FROM "createdAt")
        ORDER BY hour ASC
      `,
    ]);

    // Calculate bounce rate (sessions with only 1 page view)
    const sessionCounts = await db.$queryRaw<Array<{ sessionId: string; count: number }>>`
      SELECT "sessionId", COUNT(*)::int as count
      FROM page_views
      WHERE "createdAt" >= ${startDate} AND "sessionId" IS NOT NULL
      GROUP BY "sessionId"
    `;
    const totalSessions = sessionCounts.length;
    const singlePageSessions = sessionCounts.filter((s) => s.count === 1).length;
    const bounceRate = totalSessions > 0 ? Math.round((singlePageSessions / totalSessions) * 100) : 0;

    // Average views per session
    const avgViewsPerSession = totalSessions > 0
      ? Math.round((sessionCounts.reduce((sum, s) => sum + s.count, 0) / totalSessions) * 10) / 10
      : 0;

    // Previous period comparison
    const rangeMs = now.getTime() - startDate.getTime();
    const prevStart = new Date(startDate.getTime() - rangeMs);
    const [prevViews, prevVisitors] = await Promise.all([
      db.pageView.count({ where: { createdAt: { gte: prevStart, lt: startDate } } }),
      db.pageView.groupBy({
        by: ["sessionId"],
        where: { createdAt: { gte: prevStart, lt: startDate }, sessionId: { not: null } },
      }).then((r) => r.length),
    ]);

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      bounceRate,
      avgViewsPerSession,
      dailyViews,
      topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
      deviceStats: deviceStats.map((d) => ({ device: d.device, count: d._count.device })),
      browserStats: browserStats.map((b) => ({ browser: b.browser, count: b._count.browser })),
      countryStats: countryStats.map((c) => ({ country: c.country || "Unknown", count: c._count.country })),
      topReferrers: topReferrers.map((r) => ({
        referrer: r.referrer || "Direct",
        count: r._count.referrer,
      })),
      osStats: osStats.map((o) => ({ os: o.os, count: o._count.os })),
      recentViews,
      hourlyDistribution,
      comparison: {
        prevViews,
        prevVisitors,
        viewsChange: prevViews > 0 ? Math.round(((totalViews - prevViews) / prevViews) * 100) : 0,
        visitorsChange: prevVisitors > 0 ? Math.round(((uniqueVisitors - prevVisitors) / prevVisitors) * 100) : 0,
      },
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
