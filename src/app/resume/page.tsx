import type { Metadata } from "next";
import Resume from "@/components/ui-contents/resume";

export const metadata: Metadata = {
  title: "Resume | Samir Patel",
  description:
    "Preview and download Samir Patel's resume, including his experience, skills, and projects.",
};

export default function ResumePage() {
  return <Resume />;
}