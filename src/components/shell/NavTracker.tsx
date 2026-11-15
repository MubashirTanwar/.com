"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { markNavigation } from "./history";

export function NavTracker() {
  const pathname = usePathname();
  useEffect(() => {
    markNavigation();
  }, [pathname]);
  return null;
}
