"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Users,
  Calendar,
  ArrowRight,
  ImageIcon,
} from "lucide-react";

/* ─── Types ─── */
interface ProjectData {
  id: string;
  title: string;
  shortDesc: string | null;
  description: string;
  category: string;
  techStack: string | null;
  status: string;
  screenshots: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  linkedinPost: string | null;
  peopleInvolved: string | null;
  createdAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  publishedAt: string | null;
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  WEB: "bg-blue-100 text-blue-700",
  MOBILE: "bg-green-100 text-green-700",
  DATA: "bg-amber-100 text-amber-700",
  MARKETING: "bg-pink-100 text-pink-700",
};

const blogCategoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  SEO: "bg-emerald-100 text-emerald-700",
  TECHNOLOGY: "bg-blue-100 text-blue-700",
  MARKETING: "bg-pink-100 text-pink-700",
  TUTORIAL: "bg-amber-100 text-amber-700",
  COMPANY: "bg-orange-100 text-orange-700",
};

export default function ProjectDetailClient() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects")
        .then((r) => r.json())
        .then((data: ProjectData[]) => {
          const found =
            Array.isArray(data) &&
            data.find((p) => p.id === projectId);
          setProject(found || null);
        })
        .catch(() => setProject(null)),
      fetch("/api/blog")
        .then((r) => r.json())
        .then((data: BlogPost[]) =>
          setBlogPosts(Array.isArray(data) ? data : [])
        )
        .catch(() => setBlogPosts([])),
    ]).finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-muted rounded-2xl mx-auto mb-4" />
          <div className="h-6 bg-muted rounded w-48 mx-auto mb-2" />
          <div className="h-4 bg-muted rounded w-32 mx-auto" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The project you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const techStack: string[] = project.techStack
    ? JSON.parse(project.techStack)
    : [];
  const screenshots: string[] = project.screenshots
    ? JSON.parse(project.screenshots)
    : [];
  const peopleInvolved: { name: string; role: string; avatar?: string }[] =
    project.peopleInvolved ? JSON.parse(project.peopleInvolved) : [];

  // Find related blog posts by matching category or keywords
  const projectCategory = project.category;
  const projectKeywords = project.title
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const relatedPosts = blogPosts
    .filter((post) => {
      if (post.category === projectCategory) return true;
      const postText = `${post.title} ${post.excerpt || ""}`.toLowerCase();
      return projectKeywords.some((kw) => postText.includes(kw));
    })
    .slice(0, 3);

  return (
    <div>
      {/* ━━━ Hero ━━━ */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-accent to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/projects")}
              className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Projects
            </Button>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                className={
                  categoryColors[project.category] || "bg-muted text-muted-foreground"
                }
              >
                {project.category}
              </Badge>
              <Badge
                variant="outline"
                className="border-primary/30 text-primary"
              >
                {project.status}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 max-w-4xl">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {project.shortDesc || project.description.substring(0, 200) + "..."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ Image Gallery ━━━ */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-primary" />
              Project Gallery
            </h2>
          </AnimatedSection>

          {screenshots.length > 0 ? (
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={0.08}
            >
              {screenshots.map((src, i) => (
                <StaggerItem key={i}>
                  <Card className="border-0 shadow-sm overflow-hidden group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative">
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <AnimatedSection>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 rounded-xl flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-background/60 rounded-2xl flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary/40" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Screenshots will be added soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ━━━ Description ━━━ */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ Tech Stack ━━━ */}
      {techStack.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Code2 className="w-6 h-6 text-primary" />
                Tech Stack
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-accent to-primary/10 text-foreground border border-primary/10 hover:shadow-sm transition-shadow"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ━━━ Team / People Involved ━━━ */}
      {peopleInvolved.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Team
              </h2>
            </AnimatedSection>
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={0.1}
            >
              {peopleInvolved.map((person, i) => (
                <StaggerItem key={i}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                      {person.avatar ? (
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-14 h-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-white">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{person.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {person.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ━━━ Links ━━━ */}
      {(project.liveUrl || project.repoUrl || project.linkedinPost) && (
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold">Project Links</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.repoUrl && (
                <AnimatedSection delay={0}>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-foreground text-white rounded-xl flex items-center justify-center shrink-0 group-hover:bg-foreground/80 transition-colors">
                          <Github className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold">GitHub Repository</p>
                          <p className="text-xs text-muted-foreground">
                            View source code
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              )}
              {project.liveUrl && (
                <AnimatedSection delay={0.05}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 group-hover:opacity-90 transition-opacity">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold">Live Demo</p>
                          <p className="text-xs text-muted-foreground">
                            Visit the project
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              )}
              {project.linkedinPost && (
                <AnimatedSection delay={0.1}>
                  <a
                    href={project.linkedinPost}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 text-white rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                          <Linkedin className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold">LinkedIn Post</p>
                          <p className="text-xs text-muted-foreground">
                            Read the announcement
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ Related Blog Posts ━━━ */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-8">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <p className="text-muted-foreground mt-1">
                Blog posts related to this project&apos;s category and technologies
              </p>
            </AnimatedSection>
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={0.08}
            >
              {relatedPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                      <CardContent className="p-6">
                        {post.category && (
                          <Badge
                            className={`mb-3 ${
                              blogCategoryColors[post.category] ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {post.category}
                          </Badge>
                        )}
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        )}
                        {post.publishedAt && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ━━━ Bottom CTA ━━━ */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-muted-foreground mb-6">
              Interested in this project or want something similar?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Projects
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
