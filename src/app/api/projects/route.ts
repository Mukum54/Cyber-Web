import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const seedProjects = [
  {
    id: "proj-1",
    title: "E-Commerce Platform for Local Artisans",
    shortDesc: "A full-stack marketplace connecting Cameroonian artisans with global buyers",
    description: "Built a comprehensive e-commerce platform that enables local artisans to showcase and sell their handcrafted products to a global audience. Features include product management, secure payments, order tracking, and real-time inventory management.",
    category: "WEB",
    techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"]),
    status: "PUBLISHED",
    studentId: "student-1",
    screenshots: JSON.stringify([]),
    price: 250000,
    liveUrl: "https://example.com",
    linkedinPost: null,
    peopleInvolved: null,
  },
  {
    id: "proj-2",
    title: "AI-Powered Customer Support Chatbot",
    shortDesc: "Intelligent chatbot reducing support response time by 60%",
    description: "Developed an AI-powered chatbot for a local telecommunications company that handles customer inquiries, troubleshoots common issues, and escalates complex problems to human agents. Uses NLP for understanding customer intent.",
    category: "AI",
    techStack: JSON.stringify(["Python", "TensorFlow", "FastAPI", "React", "Docker"]),
    status: "PUBLISHED",
    studentId: "student-2",
    screenshots: JSON.stringify([]),
    price: 180000,
    liveUrl: null,
    linkedinPost: null,
    peopleInvolved: null,
  },
  {
    id: "proj-3",
    title: "School Management System",
    shortDesc: "Comprehensive platform for managing student records and academic operations",
    description: "A robust school management system that handles student enrollment, grade tracking, attendance management, timetable scheduling, and parent communication. Built with scalability to support multiple institutions.",
    category: "WEB",
    techStack: JSON.stringify(["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Chart.js"]),
    status: "PUBLISHED",
    studentId: "student-3",
    screenshots: JSON.stringify([]),
    price: 350000,
    liveUrl: "https://example.com/school",
    linkedinPost: null,
    peopleInvolved: null,
  },
  {
    id: "proj-4",
    title: "Mobile Fitness Tracking App",
    shortDesc: "Cross-platform fitness app with workout plans and progress analytics",
    description: "A React Native mobile application for fitness enthusiasts that tracks workouts, monitors nutrition, and provides personalized exercise recommendations based on user goals and fitness levels.",
    category: "MOBILE",
    techStack: JSON.stringify(["React Native", "TypeScript", "Firebase", "Expo", "Chart.js"]),
    status: "PUBLISHED",
    studentId: "student-1",
    screenshots: JSON.stringify([]),
    price: 200000,
    liveUrl: null,
    linkedinPost: null,
    peopleInvolved: null,
  },
  {
    id: "proj-5",
    title: "SEO Analytics Dashboard",
    shortDesc: "Real-time SEO performance monitoring and reporting tool",
    description: "Built an analytics dashboard that monitors website SEO performance in real-time, tracks keyword rankings, analyzes competitor strategies, and generates comprehensive reports with actionable insights.",
    category: "DATA",
    techStack: JSON.stringify(["React", "Python", "FastAPI", "PostgreSQL", "D3.js"]),
    status: "PUBLISHED",
    studentId: "student-2",
    screenshots: JSON.stringify([]),
    price: 150000,
    liveUrl: null,
    linkedinPost: null,
    peopleInvolved: null,
  },
  {
    id: "proj-6",
    title: "Social Media Marketing Platform",
    shortDesc: "All-in-one tool for scheduling posts and analyzing engagement",
    description: "Developed a social media management platform that allows businesses to schedule posts across multiple platforms, analyze engagement metrics, manage content calendars, and collaborate with team members.",
    category: "MARKETING",
    techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "Redis", "Tailwind CSS"]),
    status: "PUBLISHED",
    studentId: "student-3",
    screenshots: JSON.stringify([]),
    price: 280000,
    liveUrl: null,
    linkedinPost: null,
    peopleInvolved: null,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let projects = await db.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });

    if (projects.length === 0) {
      for (const p of seedProjects) {
        await db.project.upsert({ where: { id: p.id }, update: p, create: p });
      }
      projects = await db.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      });
    }

    // Filter
    let filtered = projects;
    if (category && category !== "ALL") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json(seedProjects);
  }
}
