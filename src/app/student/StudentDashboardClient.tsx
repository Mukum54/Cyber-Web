"use client";

import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/animations/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderGit2, GraduationCap, User, Settings, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string; title: string; shortDesc: string; category: string; techStack: string; status: string;
}

export default function StudentDashboardClient() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
  }, []);

  const stats = [
    { icon: FolderGit2, label: "My Projects", value: projects.length, color: "text-blue-600 bg-blue-100" },
    { icon: GraduationCap, label: "Enrolled Courses", value: 0, color: "text-green-600 bg-green-100" },
    { icon: User, label: "Profile Views", value: 124, color: "text-purple-600 bg-purple-100" },
  ];

  return (
    <div className="min-h-[80vh] bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome back!</h1>
              <p className="text-muted-foreground">Manage your projects, profile, and learning progress.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/student"><Settings className="w-4 h-4 mr-1.5" /> Profile Settings</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>

        {/* My Projects */}
        <AnimatedSection delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="w-4 h-4 mr-1.5" /> New Project
            </Button>
          </div>
          {projects.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-10 text-center">
                <FolderGit2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground mb-3">No projects yet. Register your first project!</p>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  <Plus className="w-4 h-4 mr-1.5" /> Register Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => {
                const techStack: string[] = project.techStack ? JSON.parse(project.techStack) : [];
                const statusColors: Record<string, string> = {
                  PUBLISHED: "bg-green-100 text-green-700",
                  COMPLETED: "bg-blue-100 text-blue-700",
                  IN_PROGRESS: "bg-amber-100 text-amber-700",
                  DRAFT: "bg-gray-100 text-gray-700",
                };
                return (
                  <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={statusColors[project.status] || ""}>{project.status.replace("_", " ")}</Badge>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs px-2 py-0.5 bg-muted rounded-md">{tech}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
