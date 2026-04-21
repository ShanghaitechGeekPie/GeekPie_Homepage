"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ContactRedirect({ target }: { target?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (target) {
      window.location.href = target;
    } else {
      router.replace("/");
    }
  }, [target, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
