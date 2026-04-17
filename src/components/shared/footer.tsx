import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin, Facebook } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "AI Automation", href: "/services#ai-automation" },
    { label: "Software Development", href: "/services#software-dev" },
    { label: "Digital Marketing & SEO", href: "/services#digital-marketing" },
    { label: "IT Training", href: "/services#training" },
    { label: "Project Support", href: "/services#project-support" },
    { label: "Cybersecurity Solutions", href: "/services#cyber-security" },
    { label: "Hardware Maintenance", href: "/services#hardware-maintenance" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Shop: [
    { label: "Electronics", href: "/shop" },
    { label: "Accessories", href: "/shop" },
    { label: "Peripherals", href: "/shop" },
  ],
  Training: [
    { label: "Digital Marketing", href: "/services#training" },
    { label: "SEO Mastery", href: "/services#training" },
    { label: "Programming", href: "/services#training" },
    { label: "AI & Automation", href: "/services#training" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/cyberwebcm", icon: Facebook },
  { label: "LinkedIn", href: "https://linkedin.com/company/cyberweb", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/cyberweb", icon: Github },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-6 h-6" fill="none">
                  <path d="M8 28L18 8L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 22H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xl font-bold">
                <span className="text-primary">CYBER</span>
                <span className="text-neutral-50">WEB</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
              Empowering Innovation Through Technology. Delivering AI-powered solutions,
              custom software, digital marketing, and professional training in Cameroon
              and across Central Africa.
            </p>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Carrefour Etoug-Ebe, Yaounde, Cameroon</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+237 654 492 652</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>cyberweb237@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold mb-4 text-neutral-50">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} CYBER WEB. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
