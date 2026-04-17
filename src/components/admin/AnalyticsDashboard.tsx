"use client";

import { useEffect, useState, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3, Eye, Users, MousePointerClick, Globe,
  Monitor, Smartphone, Tablet, ArrowUpRight, ArrowDownRight,
  TrendingUp, Activity, Clock, ExternalLink,
} from "lucide-react";

interface DailyView {
  date: string;
  views: number;
}

interface TopPage {
  path: string;
  views: number;
}

interface Stats {
  device: string;
  count: number;
}

interface NamedStats {
  [key: string]: string | number;
}

interface RecentView {
  path: string;
  title: string | null;
  country: string | null;
  device: string;
  browser: string;
  createdAt: string;
}

interface HourlyData {
  hour: number;
  views: number;
}

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgViewsPerSession: number;
  dailyViews: DailyView[];
  topPages: TopPage[];
  deviceStats: Stats[];
  browserStats: NamedStats[];
  countryStats: NamedStats[];
  topReferrers: NamedStats[];
  osStats: NamedStats[];
  recentViews: RecentView[];
  hourlyDistribution: HourlyData[];
  comparison: {
    prevViews: number;
    prevVisitors: number;
    viewsChange: number;
    visitorsChange: number;
  };
}

const CHART_COLORS = [
  "#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899",
  "#eab308", "#06b6d4", "#f43f5e", "#14b8a6", "#6366f1",
];

const DEVICE_ICONS: Record<string, React.ElementType> = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Tablet: Tablet,
};

const timeRanges = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "1y", label: "1 Year" },
];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");

  const fetchAnalytics = useCallback(async (selectedRange: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics/stats?range=${selectedRange}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(range);
  }, [range, fetchAnalytics]);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-center">
          <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3 animate-bounce" />
          <p className="text-muted-foreground text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm">No analytics data available yet.</p>
        <p className="text-xs mt-1">Data will appear as visitors browse your site.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Website Analytics</h3>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {timeRanges.map((t) => (
            <button
              key={t.value}
              onClick={() => setRange(t.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                range === t.value
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Views"
          value={data.totalViews.toLocaleString()}
          icon={Eye}
          change={data.comparison.viewsChange}
          subtitle="Page views"
        />
        <KPICard
          title="Unique Visitors"
          value={data.uniqueVisitors.toLocaleString()}
          icon={Users}
          change={data.comparison.visitorsChange}
          subtitle="Individual sessions"
        />
        <KPICard
          title="Bounce Rate"
          value={`${data.bounceRate}%`}
          icon={MousePointerClick}
          subtitle="Single-page sessions"
        />
        <KPICard
          title="Avg. Views/Session"
          value={data.avgViewsPerSession.toFixed(1)}
          icon={Activity}
          subtitle="Pages per visitor"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Over Time */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Traffic Over Time
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.dailyViews}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => {
                      const d = new Date(v);
                      return `${d.getMonth() + 1}/${d.getDate()}`;
                    }}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelFormatter={(v) => new Date(v).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Heatmap */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Hourly Traffic Distribution
            </h4>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.hourlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis
                    dataKey="hour"
                    tickFormatter={(h) => `${h}:00`}
                    tick={{ fontSize: 10 }}
                    interval={2}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelFormatter={(h) => `${h}:00 - ${h}:59`}
                  />
                  <Bar dataKey="views" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Top Pages
            </h4>
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto">
              {data.topPages.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No page data yet</p>
              ) : (
                data.topPages.map((page, i) => (
                  <div key={page.path} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-5 text-right">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{page.path}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min((page.views / (data.topPages[0]?.views || 1)) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-10 text-right">{page.views}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary" />
              Device Breakdown
            </h4>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.deviceStats}
                    dataKey="count"
                    nameKey="device"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {data.deviceStats.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {data.deviceStats.map((d, i) => {
                const Icon = DEVICE_ICONS[d.device] || Monitor;
                return (
                  <div key={d.device} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="flex-1">{d.device}</span>
                    <span className="font-medium">{d.count}</span>
                    <span className="text-xs text-muted-foreground">
                      ({data.totalViews > 0 ? Math.round((d.count / data.totalViews) * 100) : 0}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Browser & OS */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary" />
              Browsers & OS
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Browsers</p>
                <div className="space-y-1.5">
                  {data.browserStats.slice(0, 5).map((b, i) => (
                    <div key={String(b.browser)} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="text-sm flex-1">{String(b.browser)}</span>
                      <span className="text-sm font-medium">{String(b.count)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Operating Systems</p>
                <div className="space-y-1.5">
                  {data.osStats.slice(0, 5).map((o, i) => (
                    <div key={String(o.os)} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: CHART_COLORS[i + 2 % CHART_COLORS.length] }} />
                      <span className="text-sm flex-1">{String(o.os)}</span>
                      <span className="text-sm font-medium">{String(o.count)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Stats */}
        {data.countryStats.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Traffic by Country
              </h4>
              <div className="space-y-2.5">
                {data.countryStats.map((c, i) => (
                  <div key={String(c.country)} className="flex items-center gap-3">
                    <span className="text-sm">{getCountryFlag(String(c.country))}</span>
                    <span className="text-sm flex-1">{String(c.country)}</span>
                    <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min((Number(c.count) / (Number(data.countryStats[0]?.count) || 1)) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10 text-right">{c.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Referrers */}
        {data.topReferrers.length > 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-primary" />
                Top Referrers
              </h4>
              <div className="space-y-2.5">
                {data.topReferrers.map((r, i) => {
                  const hostname = extractHostname(String(r.referrer));
                  return (
                    <div key={String(r.referrer)} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-primary">
                        {hostname.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm flex-1 truncate">{hostname}</span>
                      <span className="text-sm font-medium">{r.count}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activity
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-xs text-muted-foreground uppercase tracking-wide">Page</th>
                  <th className="text-left py-2 px-3 font-medium text-xs text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Device</th>
                  <th className="text-left py-2 px-3 font-medium text-xs text-muted-foreground uppercase tracking-wide hidden md:table-cell">Browser</th>
                  <th className="text-left py-2 px-3 font-medium text-xs text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Country</th>
                  <th className="text-right py-2 px-3 font-medium text-xs text-muted-foreground uppercase tracking-wide">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentViews.slice(0, 20).map((view, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-accent/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <p className="font-medium truncate max-w-[200px]">{view.path}</p>
                      {view.title && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{view.title}</p>
                      )}
                    </td>
                    <td className="py-2.5 px-3 hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs font-normal">
                        {getDeviceIcon(view.device)} {view.device}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell">{view.browser}</td>
                    <td className="py-2.5 px-3 hidden lg:table-cell">{view.country ? `${getCountryFlag(view.country)} ${view.country}` : "—"}</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground text-xs whitespace-nowrap">
                      {timeAgo(view.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ━━ HELPER COMPONENTS ━━

function KPICard({
  title,
  value,
  icon: Icon,
  change,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: number;
  subtitle?: string;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{title}</p>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <div className="flex items-center gap-2 mt-1">
          {change !== undefined && change !== 0 && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${change > 0 ? "text-green-600" : "text-red-500"}`}>
              {change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(change)}%
            </span>
          )}
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  );
}

// ━━ UTILITY FUNCTIONS ━━

function getCountryFlag(country: string | null): string {
  if (!country) return "";
  const flags: Record<string, string> = {
    CM: "\u{1F1E8}\u{1F1F2}",
    US: "\u{1F1FA}\u{1F1F8}",
    FR: "\u{1F1EB}\u{1F1F7}",
    GB: "\u{1F1EC}\u{1F1E7}",
    DE: "\u{1F1E9}\u{1F1EA}",
    NG: "\u{1F1F3}\u{1F1EC}",
    GA: "\u{1F1EC}\u{1F1E6}",
    CG: "\u{1F1E8}\u{1F1EE}",
    SN: "\u{1F1F8}\u{1F1F3}",
    CI: "\u{1F1E8}\u{1F1EE}",
    CA: "\u{1F1E8}\u{1F1E6}",
    IN: "\u{1F1EE}\u{1F1F3}",
    KE: "\u{1F1F0}\u{1F1EA}",
    ZA: "\u{1F1FF}\u{1F1E6}",
    TZ: "\u{1F1F9}\u{1F1FF}",
    BR: "\u{1F1E7}\u{1F1F7}",
    JP: "\u{1F1EF}\u{1F1F5}",
    CN: "\u{1F1E8}\u{1F1F3}",
    RU: "\u{1F1F7}\u{1F1FA}",
  };
  return flags[country] || "\u{1F30D}";
}

function getDeviceIcon(device: string): string {
  switch (device) {
    case "Mobile": return "\u{1F4F1}";
    case "Tablet": return "\u{1F4F2}";
    default: return "\u{1F5A5}";
  }
}

function extractHostname(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url.slice(0, 30);
  }
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
