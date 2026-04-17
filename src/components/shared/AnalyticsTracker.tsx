"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function generateSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem("cw_session_id");
  if (!sessionId) {
    sessionId = "cw_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("cw_session_id", sessionId);
  }
  return sessionId;
}

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string>("");
  const hasTracked = useRef<boolean>(false);

  useEffect(() => {
    // Skip tracking for admin paths, API paths, and Next.js internals
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/student")
    ) {
      return;
    }

    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // Avoid duplicate tracking for same path
    if (lastTrackedPath.current === fullPath && hasTracked.current) {
      return;
    }

    lastTrackedPath.current = fullPath;
    hasTracked.current = true;

    // Track with a small delay to get accurate title
    const trackPageView = () => {
      try {
        const sessionId = generateSessionId();
        const referrer = document.referrer || null;

        const payload = JSON.stringify({
          path: fullPath,
          title: document.title,
          referrer,
          sessionId,
        });

        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/analytics/track", blob);
        } else {
          fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        }
      } catch {
        // Silently fail
      }
    };

    const timer = setTimeout(trackPageView, 300);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
}
