"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const INTERVIEWER_ONLY = ["/appointments"];
const INTERVIEWEE_ONLY = ["/dashboard"];

export default function RoleRedirect({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Role-based redirects disabled
  }, [role, pathname, router]);

  return null;
}
