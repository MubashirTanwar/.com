import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: "Resume · Mubashir Tanwar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
