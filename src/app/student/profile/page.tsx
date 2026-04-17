import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Student Profile | CYBER WEB",
  description:
    "View and manage your student profile on CYBER WEB. Update personal information, social links, skills, and showcase your projects.",
};

export default function StudentProfilePage() {
  return <ProfileClient />;
}
