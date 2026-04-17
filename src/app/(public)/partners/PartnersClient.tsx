"use client";

import { useEffect, useState } from "react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowRight, Globe, MapPin, Handshake, ExternalLink } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo: string | null;
  country: string | null;
}

const gradients = [
  "from-orange-400 to-amber-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-cyan-500",
  "from-lime-400 to-green-500",
];

export default function PartnersClient() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((r) => r.json())
      .then((data) => {
        setPartners(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ━━ HERO SECTION ━━ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
              <Handshake className="w-3.5 h-3.5 mr-1.5" />
              Our Partners
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Trusted Partners &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Collaborations
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CYBER WEB builds strategic partnerships with leading technology companies
              and innovation hubs across Africa and beyond. Together, we deliver
              world-class solutions that drive real impact for businesses and communities.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━ PARTNERS GRID ━━ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Skeleton className="w-14 h-14 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : partners.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {partners.map((partner, index) => (
                <StaggerItem key={partner.id}>
                  <Card className="group h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
                    <CardContent className="p-6">
                      {/* Logo & Header */}
                      <div className="flex items-start gap-4 mb-4">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradients[index % gradients.length]} text-white font-bold text-lg shrink-0`}
                          >
                            {partner.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg leading-tight truncate">
                            {partner.name}
                          </h3>
                          {partner.country && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span>{partner.country}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {partner.description || "A valued technology partner of CYBER WEB."}
                      </p>

                      {/* Website Link */}
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <Handshake className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No partners to display yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ━━ BECOME A PARTNER CTA ━━ */}
      <AnimatedSection>
        <section className="py-20 bg-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Interested in Partnering With Us?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              We are always looking for strategic partnerships with companies that share
              our vision of driving digital innovation across Africa. Let&apos;s build the
              future together.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12 font-semibold shadow-lg"
            >
              <Link href="/contact">
                Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
