"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Code2, Search } from "lucide-react";

const categories = ["ALL", "AI", "WEB", "MOBILE", "DATA", "MARKETING"];
const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700", WEB: "bg-blue-100 text-blue-700",
  MOBILE: "bg-green-100 text-green-700", DATA: "bg-amber-100 text-amber-700",
  MARKETING: "bg-pink-100 text-pink-700",
};

interface Project {
  id: string; title: string; shortDesc: string; category: string; techStack: string; price: number;
}

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
  }, []);

  useEffect(() => {
    let result = projects;
    if (activeCategory !== "ALL") result = result.filter((p) => p.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    setFiltered(result);
  }, [projects, activeCategory, search]);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Portfolio</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Projects
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore the innovative projects built by our team and students, showcasing real-world
              solutions across AI, web development, mobile apps, data science, and digital marketing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
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
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Code2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => {
                const techStack: string[] = project.techStack ? JSON.parse(project.techStack) : [];
                return (
                  <AnimatedSection key={project.id} delay={index * 0.05}>
                    <Link href={`/projects/${project.id}`}>
                      <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
                        <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                          <Code2 className="w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
                          <div className="absolute top-3 right-3">
                            <Badge className={categoryColors[project.category] || ""}>{project.category}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold mb-1.5 line-clamp-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.shortDesc}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {techStack.slice(0, 4).map((tech) => (
                              <span key={tech} className="text-xs px-2 py-0.5 bg-muted rounded-md font-medium">{tech}</span>
                            ))}
                            {techStack.length > 4 && (
                              <span className="text-xs px-2 py-0.5 bg-muted rounded-md font-medium">+{techStack.length - 4}</span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                            View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
