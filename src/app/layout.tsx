import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./providers/theme-providers";
import { MotionProvider } from "./providers/motion";
import { DownloadResume } from "@/components/home/DownloadResume";
import { CopyMailButton } from "@/components/home/MailCopy";
import { ViewSource } from "@/components/home/ViewSource";
import FamilyButton from "@/components/ui/family-button";
import { ThemeToggle } from "@/components/ui/theme-toggler";
import { CommandButton, CommandPalette } from "@/components/shell/CommandPalette";
import { NavTracker } from "@/components/shell/NavTracker";
import { site, socials } from "@/data/site";

const quicksand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});

const description =
  "Software engineer (SDE-1 at Prana). Real-time systems, LangGraph agents, Neo4j graphs, and Outpost, a chess coach that's a cat.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} · Software Engineer`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Software Engineer`,
    description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/pfp.jpg`,
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Prana", url: "https://pranaindia.com" },
  address: { "@type": "PostalAddress", addressLocality: site.location, addressCountry: "IN" },
  sameAs: socials.filter((s) => s.external && s.url).map((s) => s.url),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${quicksand.variable} font-quicksand`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <CommandPalette>
              <NavTracker />
              <div className="absolute pointer-events-none">
                <div className="background-image" />
              </div>
              <main className="min-h-screen p-3 md:p-5 bg-[#f4f5f6] dark:bg-black">
                <div className="min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-2.5rem)] bg-[#f4f5f6] dark:bg-black p-3 md:p-5 border-[#d9dbde] dark:border-[#242424] border-2 rounded-3xl">
                  {children}
                </div>
              </main>
              <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6 flex items-center justify-end space-x-4">
                <FamilyButton>
                  <ThemeToggle />
                  <CommandButton />
                  <DownloadResume />
                  <CopyMailButton />
                  <ViewSource />
                </FamilyButton>
              </div>
            </CommandPalette>
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
