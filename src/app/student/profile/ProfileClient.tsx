"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Edit3,
  Save,
  Plus,
  X,
  FolderGit2,
  MapPin,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  portfolio?: string;
}

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  techStack: string;
  status: string;
}

const initialProfile = {
  firstName: "Student",
  lastName: "Demo",
  email: "student.demo@cyberweb.cm",
  phone: "+237 6 XX XX XX XX",
  bio: "Passionate full-stack developer and AI enthusiast currently training at CYBER WEB. I love building innovative solutions that solve real-world problems and contribute to the digital transformation of Africa.",
  location: "Yaounde, Cameroon",
  program: "Full-Stack Web Development",
  avatar: "SD",
};

const initialSocialLinks: SocialLinks = {
  github: "https://github.com/studentdemo",
  linkedin: "https://linkedin.com/in/studentdemo",
  twitter: "https://twitter.com/studentdemo",
  portfolio: "https://studentdemo.dev",
};

const initialSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "Git",
];

const statusColors: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  DRAFT: "bg-gray-100 text-gray-700",
};

export default function ProfileClient() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSkillInput, setShowSkillInput] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setProjects);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setSocialLinks(initialSocialLinks);
    setSkills(initialSkills);
    setIsEditing(false);
    setShowSkillInput(false);
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
      setShowSkillInput(false);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02di02aDZ6TTYgMzR2NmgtNnYtNmg2em0wLTEwdjZoLTZ2LTZoNnptMC0xMHY2aC02VjRoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative">
          <AnimatedSection className="flex flex-col sm:flex-row items-center gap-6">
            {/* Large Avatar */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-4 ring-white/30 shadow-lg shrink-0">
              <span className="text-4xl sm:text-5xl font-bold text-white">
                {profile.avatar}
              </span>
            </div>
            {/* Name & Info */}
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h1>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 font-medium">
                  Student
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-white/90 text-sm mb-2">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>{profile.program}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              </div>
              <p className="text-white/80 max-w-xl text-sm sm:text-base leading-relaxed">
                {profile.bio}
              </p>
            </div>
            {/* Edit Button */}
            <div className="shrink-0">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-white text-orange-600 hover:bg-white/90 font-semibold"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content - overlapping the hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        {/* Personal Information */}
        <AnimatedSection delay={0.1} className="mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>

              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })
                      }
                      placeholder="First name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })
                      }
                      placeholder="Last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      placeholder="Email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) =>
                        setProfile({ ...profile, location: e.target.value })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Input
                      id="program"
                      value={profile.program}
                      onChange={(e) =>
                        setProfile({ ...profile, program: e.target.value })
                      }
                      placeholder="Training program"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Full Name</p>
                      <p className="font-medium">
                        {profile.firstName} {profile.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="font-medium">{profile.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Program</p>
                      <p className="font-medium">{profile.program}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Social Links */}
            <AnimatedSection delay={0.2}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-orange-600" />
                    </div>
                    <h2 className="text-lg font-semibold">Social Links</h2>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <Github className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Input
                          value={socialLinks.github || ""}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, github: e.target.value })
                          }
                          placeholder="GitHub URL"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <Linkedin className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Input
                          value={socialLinks.linkedin || ""}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                          }
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <Twitter className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Input
                          value={socialLinks.twitter || ""}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, twitter: e.target.value })
                          }
                          placeholder="Twitter URL"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Input
                          value={socialLinks.portfolio || ""}
                          onChange={(e) =>
                            setSocialLinks({ ...socialLinks, portfolio: e.target.value })
                          }
                          placeholder="Portfolio URL"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {socialLinks.github && (
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                            <Github className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">GitHub</p>
                            <Link
                              href={socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline truncate block"
                            >
                              {socialLinks.github.replace(/^https?:\/\/(www\.)?/, "")}
                            </Link>
                          </div>
                        </div>
                      )}
                      {socialLinks.linkedin && (
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                            <Linkedin className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">LinkedIn</p>
                            <Link
                              href={socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline truncate block"
                            >
                              {socialLinks.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                            </Link>
                          </div>
                        </div>
                      )}
                      {socialLinks.twitter && (
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center shrink-0">
                            <Twitter className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Twitter</p>
                            <Link
                              href={socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline truncate block"
                            >
                              {socialLinks.twitter.replace(/^https?:\/\/(www\.)?/, "")}
                            </Link>
                          </div>
                        </div>
                      )}
                      {socialLinks.portfolio && (
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                            <Globe className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Portfolio</p>
                            <Link
                              href={socialLinks.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:underline truncate block"
                            >
                              {socialLinks.portfolio.replace(/^https?:\/\/(www\.)?/, "")}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Project Showcase */}
            <AnimatedSection delay={0.3}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FolderGit2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <h2 className="text-lg font-semibold">Project Showcase</h2>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {projects.length} projects
                    </Badge>
                  </div>

                  {projects.length === 0 ? (
                    <div className="text-center py-10">
                      <FolderGit2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">No published projects yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {projects.slice(0, 6).map((project) => {
                        const techStack: string[] = project.techStack
                          ? JSON.parse(project.techStack)
                          : [];
                        return (
                          <Card
                            key={project.id}
                            className="group border border-border/50 hover:border-orange-200 hover:shadow-md transition-all duration-200"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${statusColors[project.status] || ""}`}
                                >
                                  {project.status.replace("_", " ")}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {project.category}
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-sm mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {project.shortDesc}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {techStack.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[11px] px-1.5 py-0.5 bg-muted rounded font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {techStack.length > 3 && (
                                  <span className="text-[11px] px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded font-medium">
                                    +{techStack.length - 3}
                                  </span>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <AnimatedSection delay={0.2} direction="right">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    {!isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 h-8 w-8 p-0"
                        onClick={() => setShowSkillInput(true)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-orange-50 text-orange-700 border border-orange-200/60 hover:bg-orange-100 transition-colors text-sm px-3 py-1"
                      >
                        {skill}
                        {(isEditing || showSkillInput) && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1.5 text-orange-400 hover:text-orange-700 transition-colors"
                            aria-label={`Remove ${skill}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {/* Add Skill Input */}
                  {(isEditing || showSkillInput) && (
                    <div className="mt-4 flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="h-9 text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={addSkill}
                        disabled={!newSkill.trim()}
                        className="h-9 bg-orange-500 hover:bg-orange-600 text-white shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Add
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Quick Stats */}
            <AnimatedSection delay={0.3} direction="right">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FolderGit2 className="w-4 h-4" />
                        Projects
                      </div>
                      <span className="font-semibold">{projects.length}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        Skills
                      </div>
                      <span className="font-semibold">{skills.length}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        Social Links
                      </div>
                      <span className="font-semibold">
                        {Object.values(socialLinks).filter(Boolean).length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
