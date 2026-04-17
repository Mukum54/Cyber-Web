export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CYBER WEB",
    url: "https://cyberweb.cm",
    logo: "https://cyberweb.cm/logo.svg",
    image: "https://cyberweb.cm/og-image.png",
    description: "CYBER WEB is a leading IT and digital innovation company in Yaounde, Cameroon, delivering AI automation, custom software, cybersecurity, digital marketing, and IT training.",
    telephone: "+237 654 492 652",
    email: "cyberweb237@gmail.com",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Mukum Dieudonne",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrefour Etoug-Ebe",
      addressLocality: "Yaounde",
      addressRegion: "Centre",
      postalCode: "",
      addressCountry: "CM",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 3.848,
      longitude: 11.502,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "XAF",
    paymentAccepted: "Cash, Bank Transfer, Mobile Money",
    sameAs: [
      "https://github.com/cyberweb",
      "https://linkedin.com/company/cyberweb",
      "https://facebook.com/cyberwebcm",
    ],
    areaServed: [
      { "@type": "Country", name: "Cameroon" },
      { "@type": "Country", name: "Central African Republic" },
      { "@type": "Country", name: "Gabon" },
      { "@type": "Country", name: "Congo" },
      { "@type": "Country", name: "Senegal" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation & Intelligent Systems",
            description: "Optimize workflows with AI-powered automation tools and intelligent systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Tailored IT solutions built for your unique business needs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing & SEO",
            description: "Grow your online presence and reach the right audience with data-driven marketing.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IT Training & Capacity Building",
            description: "Equip yourself with practical digital skills through hands-on training programs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cybersecurity Solutions",
            description: "Protect your digital assets with comprehensive cybersecurity services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hardware Maintenance",
            description: "Professional hardware maintenance and IT infrastructure support.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
      bestRating: "5",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CYBER WEB",
    url: "https://cyberweb.cm",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://cyberweb.cm/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://cyberweb.cm" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://cyberweb.cm/services" },
      { "@type": "ListItem", position: 3, name: "Projects", item: "https://cyberweb.cm/projects" },
      { "@type": "ListItem", position: 4, name: "Blog", item: "https://cyberweb.cm/blog" },
      { "@type": "ListItem", position: 5, name: "Shop", item: "https://cyberweb.cm/shop" },
      { "@type": "ListItem", position: 6, name: "Contact", item: "https://cyberweb.cm/contact" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does CYBER WEB offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CYBER WEB offers AI automation, custom software development, digital marketing & SEO, IT training, cybersecurity solutions, hardware maintenance, and academic project support in Yaounde, Cameroon.",
        },
      },
      {
        "@type": "Question",
        name: "Where is CYBER WEB located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CYBER WEB is located at Carrefour Etoug-Ebe, Yaounde, Cameroon. We serve clients across Cameroon and Central Africa.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact CYBER WEB?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact CYBER WEB by phone at +237 654 492 652, email at cyberweb237@gmail.com, or through our contact form at cyberweb.cm/contact.",
        },
      },
      {
        "@type": "Question",
        name: "Does CYBER WEB offer IT training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CYBER WEB offers professional IT training in programming, web development, digital marketing, SEO, AI, and more. Training sessions are held at our Yaounde office and online via Zoom.",
        },
      },
      {
        "@type": "Question",
        name: "Does CYBER WEB build custom websites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, CYBER WEB specializes in building custom websites, web applications, mobile apps, and e-commerce platforms using modern technologies like React, Next.js, and Node.js.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
