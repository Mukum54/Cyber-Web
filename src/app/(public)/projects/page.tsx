import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Our Projects - CYBER WEB | Portfolio of Tech Solutions Cameroon",
  description: "Explore innovative projects built by CYBER WEB team and students - from AI solutions and web applications to mobile apps and digital marketing platforms in Yaounde, Cameroon.",
  keywords: [
    "CYBER WEB projects",
    "tech portfolio Cameroon",
    "web development projects Yaounde",
    "AI projects Africa",
    "mobile app development Cameroon",
    "software portfolio Yaounde",
    "student projects Cameroon",
    "IT showcase Cameroon",
  ],
  alternates: { canonical: "https://cyberweb.cm/projects" },
  openGraph: {
    title: "Our Projects - CYBER WEB | Tech Portfolio",
    description: "Innovative tech projects: AI, web apps, mobile apps & digital solutions from Cameroon.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB Projects" }],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
