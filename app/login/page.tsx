'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { AuthPage } from "./AuthPage";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";

  const handleModeChange = (nextMode: "login" | "signup") => {
    const query = nextMode === "signup" ? "?mode=signup" : "";
    router.replace(`/login${query}`);
  };

  return <AuthPage mode={mode} onModeChange={handleModeChange} />;
}
