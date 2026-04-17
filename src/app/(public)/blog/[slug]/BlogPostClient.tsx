"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatedSection } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  Calendar,
  ArrowLeft,
  Clock,
  Tag,
  User,
  ArrowRight,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string;
  status: string;
  publishedAt: string;
  authorId?: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  SEO: "bg-green-100 text-green-700",
  TECHNOLOGY: "bg-blue-100 text-blue-700",
  MARKETING: "bg-pink-100 text-pink-700",
};

export default function BlogPostClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/blog/${encodeURIComponent(slug)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const parseTags = (tagsStr: string): string[] => {
    try {
      return JSON.parse(tagsStr);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero skeleton */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-full max-w-3xl" />
            <Skeleton className="h-10 w-3/4 max-w-2xl" />
            <div className="flex gap-6 pt-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </section>
        {/* Content skeleton */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </section>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-muted-foreground">404</h1>
          <p className="text-lg text-muted-foreground">
            This article could not be found.
          </p>
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const tags = parseTags(post.tags);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-accent to-background overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <Badge
              variant="secondary"
              className={`mb-6 ${categoryColors[post.category] || "bg-primary/10 text-primary"}`}
            >
              {post.category}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>CYBER WEB Team</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{estimateReadTime(post.content)}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured image placeholder */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-10">
        <AnimatedSection>
          <div className="h-64 sm:h-80 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-2xl flex items-center justify-center border border-primary/10">
            <span className="text-8xl sm:text-9xl font-bold text-primary/10">
              {post.title.charAt(0)}
            </span>
          </div>
        </AnimatedSection>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AnimatedSection>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </AnimatedSection>

        {/* Tags */}
        {tags.length > 0 && (
          <AnimatedSection delay={0.1} className="mt-10 pt-8 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Author Info */}
        <AnimatedSection delay={0.15} className="mt-10">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-accent to-primary/10">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                CW
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">CYBER WEB Team</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Cameroon&apos;s leading IT solutions company, providing expert
                  insights on technology, AI, digital marketing, and software
                  development.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Back to Blog Button */}
        <AnimatedSection delay={0.2} className="mt-10">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </Button>
        </AnimatedSection>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-background to-accent/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Related{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                  Articles
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Continue reading with more articles from the {post.category}{" "}
                category.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relPost, index) => (
                <AnimatedSection key={relPost.id} delay={index * 0.05}>
                  <Link href={`/blog/${relPost.slug}`}>
                    <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 flex items-center justify-center relative">
                        <span className="text-6xl font-bold text-primary/10">
                          {relPost.title.charAt(0)}
                        </span>
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={
                              categoryColors[relPost.category] || ""
                            }
                          >
                            {relPost.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />{" "}
                            {formatDate(relPost.publishedAt)}
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {relPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                          {relPost.excerpt}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 gap-1 transition-all">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
