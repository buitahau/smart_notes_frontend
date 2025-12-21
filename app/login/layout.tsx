import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | Smart Notes",
  description: "Sign in or create an account to access your Smart Notes dashboard.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
