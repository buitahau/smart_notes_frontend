import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Smart Notes",
  description: "View your Smart Notes dashboard and manage your workspace.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
