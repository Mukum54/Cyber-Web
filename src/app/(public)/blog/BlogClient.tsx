"use client";

import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowRight, User } from "lucide-react";
import Link from "next/link";

const blogCategories = ["ALL", "AI", "SEO", "TECHNOLOGY", "MARKETING"];

const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700", SEO: "bg-green-100 text-green-700",
  TECHNOLOGY: "bg-blue-100 text-blue-700", MARKETING: "bg-pink-100 text-pink-700",
};

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string;
  category: string; tags: string; publishedAt: string;
}

export default function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
  }, []);

  useEffect(() => {
    let result = posts;
    if (activeCategory !== "ALL") result = result.filter((p) => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [posts, activeCategory, search]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Blog</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Insights &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Articles
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay updated with the latest in technology, AI, digital marketing, and software development
              through our expert articles and guides.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.05}>
                  <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 flex items-center justify-center relative">
                      <span className="text-6xl font-bold text-primary/10">{post.title.charAt(0)}</span>
                      <div className="absolute top-3 left-3">
                        <Badge className={categoryColors[post.category] || ""}>{post.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}</div>
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 gap-1 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
