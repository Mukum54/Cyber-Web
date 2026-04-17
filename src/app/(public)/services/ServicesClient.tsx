"use client";

import { useEffect, useState } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain, Code2, TrendingUp, GraduationCap, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Brain, Code2, TrendingUp, GraduationCap, BookOpen };
const sectionIds: Record<string, string> = {
  AI_AUTOMATION: "ai-automation", SOFTWARE_DEV: "software-dev",
  DIGITAL_MARKETING: "digital-marketing", TRAINING: "training", PROJECT_SUPPORT: "project-support",
};

interface Service {
  id: string; title: string; description: string; category: string; icon: string; features: string;
}

export default function ServicesClient() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => setServices(Array.isArray(data) ? data : []))
      .catch(() => { /* silently fail, data stays empty */ });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Our Services</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Solutions That Drive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Real Results
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We deliver comprehensive technology solutions across five verticals, each designed
              to address specific business challenges and create measurable impact.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service Detail Sections */}
      {services.map((service, index) => {
        const Icon = iconMap[service.icon] || Code2;
        const features: string[] = service.features ? JSON.parse(service.features) : [];
        const isReversed = index % 2 !== 0;

        return (
          <section
            key={service.id}
            id={sectionIds[service.category]}
            className={`py-20 scroll-mt-20 ${index % 2 === 0 ? "bg-background" : "bg-muted/50"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? "md:direction-rtl" : ""}`}>
                <AnimatedSection direction={isReversed ? "right" : "left"} className={isReversed ? "md:order-2" : ""}>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link href="/contact">Get Started <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </AnimatedSection>

                <AnimatedSection direction={isReversed ? "left" : "right"} className={isReversed ? "md:order-1" : ""}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <h3 className="font-semibold mb-4 text-lg">What We Offer</h3>
                      <ul className="space-y-3">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <AnimatedSection>
        <section className="py-20 bg-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Need a Custom Solution?</h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              Tell us about your project and we will craft a tailored solution that meets your unique needs.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-semibold">
              <Link href="/contact">Contact Us Today <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
