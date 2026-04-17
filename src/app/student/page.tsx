import type { Metadata } from "next";
import StudentDashboardClient from "./StudentDashboardClient";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Your personalized CYBER WEB student dashboard. Manage your projects, track learning progress, and update your profile.",
};

export default function StudentDashboard() {
  return <StudentDashboardClient />;
}
