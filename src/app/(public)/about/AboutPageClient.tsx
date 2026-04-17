"use client";

import { useEffect, useState } from "react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Target,
  Shield,
  Users,
  Lightbulb,
  Rocket,
  MapPin,
  Mail,
  Calendar,
  Trophy,
  Award,
  GraduationCap,
  TrendingUp,
  Heart,
  Handshake,
  MessageCircle,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

/* ─── Static data ─── */

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace emerging technologies to provide forward-thinking solutions that keep our clients ahead of the curve.",
  },
  {
    icon: Target,
    title: "Customization",
    description:
      "Every solution is tailored to client-specific needs, ensuring maximum relevance and impact for your business.",
  },
  {
    icon: Shield,
    title: "Quality",
    description:
      "We prioritize reliability, security, and performance in every line of code and every project we deliver.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We work closely with clients and partners, building lasting relationships through meaningful collaboration.",
  },
  {
    icon: Rocket,
    title: "Empowerment",
    description:
      "We invest in human capital through education and mentorship, developing the next generation of tech talent.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Foundation",
    description:
      "CYBER WEB was founded in Yaounde, Cameroon by Mukum Dieudonne with a vision to transform the digital landscape.",
  },
  {
    year: "2024",
    title: "First Clients",
    description:
      "Onboarded our first business clients for AI automation and custom software development projects.",
  },
  {
    year: "2025",
    title: "Training Launch",
    description:
      "Launched IT training programs in programming, web development, and digital marketing.",
  },
  {
    year: "2025",
    title: "Digital Marketing",
    description:
      "Expanded services to include comprehensive SEO and digital marketing solutions.",
  },
  {
    year: "2026",
    title: "Growth Phase",
    description:
      "Scaling operations with 50+ projects delivered and 200+ students trained across multiple programs.",
  },
];

const teamMembers = [
  {
    name: "Alex Fotso",
    initials: "AF",
    role: "Web Development Assistant",
    bio: "Full-stack developer specializing in React and Next.js with a keen eye for responsive design and performance optimization.",
    gradient: "from-orange-400 to-amber-500",
  },
  {
    name: "Sylvie Nganou",
    initials: "SN",
    role: "Data Scientist",
    bio: "Data scientist with expertise in machine learning, statistical analysis, and building predictive models for business intelligence.",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Herve Kamga",
    initials: "HK",
    role: "Mobile App Developer",
    bio: "Cross-platform mobile developer creating seamless native experiences using React Native and Flutter for iOS and Android.",
    gradient: "from-emerald-400 to-teal-500",
  },
];

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Award,
  GraduationCap,
  TrendingUp,
  Heart,
  Handshake,
};

/* ─── Achievement type ─── */
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  date?: string | null;
}

/* ─── Component ─── */
export default function AboutPageClient() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetch("/api/achievements")
      .then((r) => r.json())
      .then((data) => setAchievements(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ━━━ Hero ━━━ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-accent to-background overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              About Us
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Building the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Technology in Africa
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              CYBER WEB is an emerging IT and digital innovation startup
              headquartered in Yaounde, Cameroon. Founded in 2024, we operate at
              the intersection of Artificial Intelligence, software development,
              digital transformation, and technical training — empowering
              businesses and individuals to thrive in the digital economy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ Mission & Vision ━━━ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-accent to-background hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become a leading technology and innovation hub in Central
                    Africa, providing world-class AI-powered solutions, digital
                    services, and technical expertise that empower businesses,
                    institutions, and individuals to excel in the digital economy.
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-accent to-background hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                    <Brain className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    {[
                      "Deliver high-quality, customized technological solutions",
                      "Promote digital transformation through AI-driven automation",
                      "Provide professional training and mentorship for tech talent",
                      "Support organizations in maximizing digital opportunities",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ━━━ Core Values ━━━ */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our work is guided by five core principles that shape every project
              we undertake and every relationship we build.
            </p>
          </AnimatedSection>
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            staggerDelay={0.08}
          >
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="h-full text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ━━━ Company Timeline ━━━ */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Company Timeline
            </h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimatedSection
                  key={i}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                >
                  <div
                    className={`flex gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block flex-1" />
                    <div className="relative w-8 shrink-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-primary/10 z-10" />
                    </div>
                    <div className="flex-1 pb-2">
                      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                              {m.year}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1">{m.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {m.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ Achievements ━━━ */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              Achievements
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Milestones & Recognition
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A snapshot of the awards, milestones, and recognition that mark our
              journey of building technology solutions in Africa.
            </p>
          </AnimatedSection>

          {achievements.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 bg-muted rounded-xl mb-4" />
                      <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/2 mb-3" />
                      <div className="h-4 bg-muted rounded w-full mb-1.5" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerDelay={0.08}
            >
              {achievements.map((ach) => {
                const IconComponent =
                  (ach.icon && iconMap[ach.icon]) || Trophy;
                return (
                  <StaggerItem key={ach.id}>
                    <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          {ach.date && (
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                              {ach.date}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold mb-2">{ach.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {ach.description}
                        </p>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ━━━ CEO Section ━━━ */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              Leadership
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Meet Our Founder
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* CEO Photo Placeholder */}
                <div className="md:col-span-2 bg-gradient-to-br from-primary via-orange-500 to-amber-500 flex items-center justify-center p-10 relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-full" />
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center ring-4 ring-white/20 shadow-2xl">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      MD
                    </span>
                  </div>
                </div>
                {/* Info */}
                <CardContent className="md:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                  <Badge
                    variant="secondary"
                    className="w-fit mb-4 bg-primary/10 text-primary"
                  >
                    Founder &amp; CEO
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-1">
                    Mukum Dieudonne
                  </h2>
                  <p className="text-primary font-medium mb-4">
                    Founder &amp; CEO, CYBER WEB
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Mukum Dieudonne is a visionary tech entrepreneur and software
                    engineer who founded CYBER WEB with a singular mission: to
                    harness the power of technology and artificial intelligence to
                    solve real-world problems across Africa. With deep expertise
                    in AI, full-stack development, and digital transformation
                    consulting, he leads a talented team dedicated to empowering
                    businesses, institutions, and individuals through innovative
                    digital solutions and world-class technical training.
                  </p>
                  {/* Contact Info */}
                  <div className="flex flex-col gap-2.5 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>Yaounde, Cameroon</span>
                    </div>
                    <a
                      href="mailto:mukum@kitasarl.com"
                      className="flex items-center gap-2.5 hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      <span>mukum@kitasarl.com</span>
                    </a>
                    <a
                      href="https://wa.me/237654547384"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 hover:text-green-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span>+237 654 547 384</span>
                    </a>
                  </div>
                  {/* Social links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/237654547384"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center hover:bg-green-500/20 transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:mukum@kitasarl.com"
                      className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━ Team Section ━━━ */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The People Behind the Code
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate team of developers, designers, and strategists working
              together to build exceptional digital experiences.
            </p>
          </AnimatedSection>
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <CardContent className="p-6 text-center">
                    {/* Avatar placeholder */}
                    <div
                      className={`w-24 h-24 mx-auto mb-5 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {member.initials}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {member.bio}
                    </p>
                    {/* Social links */}
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href="#"
                        className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
