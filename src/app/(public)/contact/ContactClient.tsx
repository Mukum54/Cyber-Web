"use client";

import { useState, useEffect } from "react";
import { AnimatedSection } from "@/components/animations/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Github, Linkedin, Facebook } from "lucide-react";

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "service", label: "Service Request" },
  { value: "partnership", label: "Partnership" },
  { value: "training", label: "Training Programs" },
  { value: "other", label: "Other" },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [mathAnswer, setMathAnswer] = useState("");
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, operator: "+" });

  // Generate a simple math CAPTCHA on mount
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = Math.random() > 0.5 ? "+" : "-";
    setMathQuestion({
      num1,
      num2: operator === "-" && num2 > num1 ? num1 : num2,
      operator,
    });
    setFormStartTime(Date.now());
  }, []);

  const expectedAnswer = mathQuestion.operator === "+"
    ? mathQuestion.num1 + mathQuestion.num2
    : mathQuestion.num1 - mathQuestion.num2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam: Honeypot check (bots fill hidden fields)
    if (honeypot) {
      // Silently pretend success so bots don't retry
      setStatus("success");
      return;
    }

    // Anti-spam: Minimum time check (form filled too fast = bot)
    if (Date.now() - formStartTime < 3000) {
      setStatus("error");
      return;
    }

    // Anti-spam: Math CAPTCHA verification
    if (parseInt(mathAnswer) !== expectedAnswer) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setMathAnswer("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-accent to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">Contact Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Let&apos;s Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Conversation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have a project in mind or want to learn more about our services? Reach out to us
              and we will get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  {status === "success" ? (
                    <div className="text-center py-12">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                      <p className="text-muted-foreground mb-4">Thank you for reaching out. We will respond within 24 hours.</p>
                      <Button onClick={() => setStatus("idle")} variant="outline">Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                          <Input required placeholder="John Doe" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Email Address *</label>
                          <Input required type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                          <Input type="tel" placeholder="+237 6XX XXX XXX" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Subject</label>
                          <Select value={formData.subject} onValueChange={(v) => handleChange("subject", v)}>
                            <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                            <SelectContent>
                              {subjects.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {/* Honeypot field - hidden from humans, visible to bots */}
                      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Message *</label>
                        <Textarea required rows={5} placeholder="Tell us about your project or inquiry..." value={formData.message} onChange={(e) => handleChange("message", e.target.value)} />
                      </div>
                      {/* Math CAPTCHA - anti-bot verification */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Quick Verification *</label>
                        <div className="flex items-center gap-3">
                          <div className="px-4 py-2.5 bg-muted rounded-lg text-sm font-medium whitespace-nowrap">
                            {mathQuestion.num1} {mathQuestion.operator} {mathQuestion.num2} = ?
                          </div>
                          <Input
                            required
                            type="number"
                            placeholder="Answer"
                            value={mathAnswer}
                            onChange={(e) => setMathAnswer(e.target.value)}
                            className="w-28"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Solve the math to verify you are human.</p>
                      </div>
                      {status === "error" && <p className="text-sm text-destructive">Failed to send message. Please check the verification and try again.</p>}
                      <Button type="submit" disabled={status === "loading"} size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-12">
                        {status === "loading" ? "Sending..." : "Send Message"}
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection direction="right" className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you are a business seeking digital transformation, a student looking for training,
                  or an organization looking for a tech partner, we are here to help.
                </p>
              </div>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Office Address</p>
                      <p className="text-sm text-muted-foreground">Carrefour Etoug-Ebe, Yaounde, Cameroon</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Phone</p>
                      <p className="text-sm text-muted-foreground">+237 654 492 652</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Email</p>
                      <p className="text-sm text-muted-foreground">cyberweb237@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Business Hours</p>
                      <p className="text-sm text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-sm text-muted-foreground">Sat: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <p className="font-medium text-sm mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {[
                      { icon: Github, label: "GitHub", href: "https://github.com/cyberweb" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/cyberweb" },
                      { icon: Facebook, label: "Facebook", href: "https://facebook.com/cyberwebcm" },
                    ].map(({ icon: Icon, label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label={label}>
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
