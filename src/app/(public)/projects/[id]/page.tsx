import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

export const metadata: Metadata = {
  title: "Project Details",
  description:
    "Explore the details of this CYBER WEB project, including tech stack, team, and links.",
  openGraph: {
    title: "Project Details - CYBER WEB",
    description: "Innovative tech project details",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CYBER WEB" }],
  },
};

export default function ProjectDetailPage() {
  return <ProjectDetailClient />;
}
