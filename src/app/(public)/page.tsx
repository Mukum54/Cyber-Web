"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain, Code2, TrendingUp, GraduationCap, BookOpen,
  ArrowRight, Star, Users, FolderGit2, Award, Zap,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp } from "@/components/animations/motion";

const iconMap: Record<string, React.ElementType> = {
  Brain, Code2, TrendingUp, GraduationCap, BookOpen,
};

interface Service {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  icon: string;
}

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  techStack: string;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  company: string;
  role: string;
  rating: number;
}

const categoryColors: Record<string, string> = {
  AI: "bg-purple-100 text-purple-700",
  WEB: "bg-blue-100 text-blue-700",
  MOBILE: "bg-green-100 text-green-700",
  DATA: "bg-amber-100 text-amber-700",
  MARKETING: "bg-pink-100 text-pink-700",
  CYBER_SECURITY: "bg-red-100 text-red-700",
  HARDWARE_MAINTENANCE: "bg-teal-100 text-teal-700",
};

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [partners, setPartners] = useState<{id: string; name: string; logo?: string; website?: string}[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => setPartners(Array.isArray(data) ? data.filter((p: any) => p.isActive) : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="overflow-hidden">
      {/* ━━ HERO SECTION ━━ */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-accent" />
          <motion.div
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10">
              <Zap className="w-3.5 h-3.5 mr-1.5" /> IT & Digital Innovation Company
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Empowering Innovation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Through Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            CYBER WEB delivers AI-powered solutions, custom software, digital marketing,
            and professional training to help businesses thrive in the digital economy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all">
              <Link href="/services">Explore Our Services <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 text-base font-semibold border-2">
              <Link href="/projects">View Our Work</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ━━ STATS SECTION ━━ */}
      <AnimatedSection className="py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: "+", label: "Projects Delivered", icon: FolderGit2 },
              { value: 200, suffix: "+", label: "Students Trained", icon: Users },
              { value: 15, suffix: "+", label: "Active Courses", icon: GraduationCap },
              { value: 5, suffix: "", label: "Service Verticals", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ━━ SERVICES SECTION ━━ */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">What We Do</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver innovative technology solutions across five key verticals,
              each designed to empower your business in the digital age.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.slice(0, 6).map((service) => {
              const Icon = iconMap[service.icon] || Code2;
              return (
                <StaggerItem key={service.id}>
                  <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.shortDesc}</p>
                      <Link
                        href="/services"
                        className="inline-flex items-center text-sm font-medium text-primary hover:gap-2 gap-1 transition-all"
                      >
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━ FEATURED PROJECTS ━━ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Our Portfolio</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the innovative projects built by our team and students,
              showcasing real-world solutions to complex challenges.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {projects.slice(0, 6).map((project) => {
              const techStack: string[] = project.techStack ? JSON.parse(project.techStack) : [];
              return (
                <StaggerItem key={project.id}>
                  <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="h-44 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-primary/30" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={categoryColors[project.category] || ""}>
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="text-base font-semibold mb-1 line-clamp-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{project.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs px-2 py-0.5 bg-muted rounded-md font-medium">
                            {tech}
                          </span>
                        ))}
                        {techStack.length > 3 && (
                          <span className="text-xs px-2 py-0.5 bg-muted rounded-md font-medium">
                            +{techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="text-center mt-10" delay={0.2}>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/projects">View All Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━ TESTIMONIALS SECTION ━━ */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
          </AnimatedSection>

          {testimonials.length > 0 && (
            <div className="relative">
              <div className="bg-card rounded-2xl shadow-lg p-8 sm:p-10 text-center min-h-[250px] flex flex-col justify-center">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[currentTestimonial]?.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-base sm:text-lg text-muted-foreground italic leading-relaxed mb-6 max-w-2xl mx-auto">
                    &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[currentTestimonial].author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </motion.div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentTestimonial ? "bg-primary w-6" : "bg-border"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ━━ PARTNERS SECTION ━━ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Partners</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We collaborate with industry-leading organizations to deliver exceptional solutions across Africa and beyond.
            </p>
          </AnimatedSection>

          {partners.length > 0 && (
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              {/* Scrolling track */}
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -1200] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...partners, ...partners].map((partner, idx) => {
                  const initials = partner.name
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const gradients = [
                    "from-orange-400 to-amber-500",
                    "from-emerald-400 to-teal-500",
                    "from-violet-400 to-purple-500",
                    "from-rose-400 to-pink-500",
                    "from-sky-400 to-cyan-500",
                    "from-lime-400 to-green-500",
                  ];
                  const gradient = gradients[idx % gradients.length];
                  return (
                    <div
                      key={`${partner.id}-${idx}`}
                      className="flex-shrink-0 w-48 flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-shadow"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                        {initials}
                      </div>
                      <span className="text-sm font-semibold text-foreground text-center leading-tight">
                        {partner.name}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Static grid for desktop */}
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
                {partners.slice(0, 6).map((partner, idx) => {
                  const initials = partner.name
                    .split(" ")
                    .map((w: string) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const gradients = [
                    "from-orange-400 to-amber-500",
                    "from-emerald-400 to-teal-500",
                    "from-violet-400 to-purple-500",
                    "from-rose-400 to-pink-500",
                    "from-sky-400 to-cyan-500",
                    "from-lime-400 to-green-500",
                  ];
                  const gradient = gradients[idx % gradients.length];
                  return (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/50 bg-card hover:shadow-lg transition-shadow"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                        {initials}
                      </div>
                      <span className="text-sm font-semibold text-foreground text-center leading-tight">
                        {partner.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          <AnimatedSection className="text-center mt-10" delay={0.2}>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link href="/partners">View All Partners <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━ CTA SECTION ━━ */}
      <AnimatedSection>
        <section className="py-24 bg-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Whether you need AI automation, a custom website, digital marketing,
              or IT training, CYBER WEB is your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 h-12 font-semibold shadow-lg">
                <Link href="/contact">Start Your Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 font-semibold border-2 border-white text-white hover:bg-white hover:text-foreground transition-colors">
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
