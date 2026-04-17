import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Seed services data for initial setup — 7 services with orders 0-6
const seedServices = [
  {
    id: "svc-1",
    title: "AI Automation & Solutions",
    shortDesc: "Optimize workflows with AI-powered automation tools",
    description: "We design and implement intelligent systems and automation tools that optimize workflows, reduce operational costs, and improve productivity. Our solutions include business process automation, AI-powered tools and integrations, smart data processing systems, and custom machine learning models tailored to your business needs.",
    category: "AI_AUTOMATION",
    icon: "Brain",
    price: 150000,
    features: JSON.stringify([
      "Business Process Automation",
      "AI-Powered Tools & Integrations",
      "Smart Data Processing",
      "Custom ML Models",
      "Workflow Optimization",
      "Predictive Analytics",
      "Natural Language Processing",
    ]),
    order: 0,
  },
  {
    id: "svc-2",
    title: "Custom Software Development",
    shortDesc: "Tailored IT solutions built for your unique needs",
    description: "We specialize in designing and building customized IT products tailored to organizational needs. Our approach prioritizes performance, security, and long-term scalability. We deliver custom software development, web and mobile applications, business management platforms, scalable digital infrastructure, and secure system architecture.",
    category: "SOFTWARE_DEV",
    icon: "Code2",
    price: 250000,
    features: JSON.stringify([
      "Web Applications",
      "Mobile Apps",
      "Business Platforms",
      "System Architecture",
      "API Development",
      "Database Design",
      "Cloud Deployment",
    ]),
    order: 1,
  },
  {
    id: "svc-3",
    title: "Digital Marketing & SEO",
    shortDesc: "Grow your online presence and reach the right audience",
    description: "We help businesses grow their online presence and reach the right audience through data-driven strategies. Our services include search engine optimization (SEO), digital marketing campaigns, online branding strategies, social media strategy and management, and content-driven marketing solutions that deliver measurable results.",
    category: "DIGITAL_MARKETING",
    icon: "TrendingUp",
    price: 100000,
    features: JSON.stringify([
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Brand Building",
      "Analytics & Reporting",
      "Paid Advertising",
    ]),
    order: 2,
  },
  {
    id: "svc-4",
    title: "Cybersecurity Solutions",
    shortDesc: "Protect your digital assets with enterprise-grade security",
    description: "We provide comprehensive cybersecurity solutions to safeguard your business from digital threats. Our services cover vulnerability assessments, penetration testing, security audits, incident response planning, and implementation of robust security protocols to protect your data, systems, and network infrastructure.",
    category: "CYBER_SECURITY",
    icon: "Shield",
    price: 200000,
    features: JSON.stringify([
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Audits",
      "Incident Response Planning",
      "Firewall & Network Security",
      "Data Encryption & Protection",
    ]),
    order: 3,
  },
  {
    id: "svc-5",
    title: "Computer Hardware & Software Maintenance",
    shortDesc: "Keep your IT infrastructure running smoothly and efficiently",
    description: "We offer professional hardware and software maintenance services to ensure your IT infrastructure operates at peak performance. From routine diagnostics and repairs to software updates and system optimization, our technicians provide reliable support for desktops, laptops, servers, and peripherals.",
    category: "HARDWARE_MAINTENANCE",
    icon: "Wrench",
    price: 50000,
    features: JSON.stringify([
      "Hardware Diagnostics & Repair",
      "Software Installation & Updates",
      "System Optimization",
      "Network Setup & Troubleshooting",
      "Data Backup & Recovery",
      "Preventive Maintenance",
    ]),
    order: 4,
  },
  {
    id: "svc-6",
    title: "IT Training & Mentorship",
    shortDesc: "Equip yourself with practical digital skills",
    description: "CYBER WEB offers structured training programs to equip students and professionals with practical digital skills. Training areas include programming and software development, web technologies, AI and automation tools, practical project-based learning, and career readiness in tech fields. We prioritize hands-on learning to prepare trainees for real-world challenges.",
    category: "TRAINING",
    icon: "GraduationCap",
    price: 75000,
    features: JSON.stringify([
      "Programming Courses",
      "Web Development",
      "AI & Automation",
      "Digital Marketing",
      "Project-Based Learning",
      "Career Mentorship",
    ]),
    order: 5,
  },
  {
    id: "svc-7",
    title: "Academic Project Support",
    shortDesc: "Transform your ideas into impactful solutions",
    description: "We assist students and researchers in the successful completion of technical and academic projects. Our services include project concept development, technical guidance and mentorship, implementation support, documentation and research assistance, and prototype development. We help students transform ideas into impactful and practical solutions.",
    category: "PROJECT_SUPPORT",
    icon: "BookOpen",
    price: 50000,
    features: JSON.stringify([
      "Concept Development",
      "Technical Mentorship",
      "Implementation Support",
      "Documentation",
      "Prototype Development",
      "Research Assistance",
    ]),
    order: 6,
  },
];

// Seed first partner
const seedPartner = {
  id: "partner-1",
  name: "KITASARL",
  description:
    "KITASARL is a leading technology company in Cameroon, specializing in software development, IT consulting, and digital transformation solutions.",
  website: "https://kitasarl.com",
  country: "Cameroon",
  isActive: true,
  order: 0,
};

export async function GET() {
  try {
    let services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    if (services.length === 0) {
      // Seed the database with 7 services
      for (const s of seedServices) {
        await db.service.upsert({ where: { id: s.id }, update: s, create: s });
      }
      // Seed the first partner
      await db.partner.upsert({
        where: { id: seedPartner.id },
        update: seedPartner,
        create: seedPartner,
      });
      services = await db.service.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      });
    }
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(seedServices);
  }
}

// POST create a service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, shortDesc, category, icon, price, features, order, isActive } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        title,
        description: description || "",
        shortDesc: shortDesc || null,
        category,
        icon: icon || null,
        price: price || null,
        features: features ? JSON.stringify(features) : null,
        order: order ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// PUT update a service
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, shortDesc, category, icon, price, features, order, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(shortDesc !== undefined && { shortDesc }),
        ...(category !== undefined && { category }),
        ...(icon !== undefined && { icon }),
        ...(price !== undefined && { price }),
        ...(features !== undefined && { features: JSON.stringify(features) }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE a service
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
