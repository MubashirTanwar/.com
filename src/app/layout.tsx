import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "./providers/theme-providers";


const inter = Montserrat({ subsets: ["latin"] });

const quicksand = localFont({
  src: "./fonts/Quicksand-VariableFont_wght.ttf",
  variable: "--font-quicksand",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Mubashir Tanwar",
  description: "Web Developer, Freelancer, Currently Learning Deep Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
                <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

      <body className={quicksand.variable}>
        <div className=" absolute pointer-events-none">
        <div className="background-image"></div>
        </div>
{/*                  <div
          id="mouse"
          className="hidden md:block z-[999] fixed h-8 w-8 bg-gray-400/50 rounded-full shadow-lg transition-transform duration-150 ease-linear transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: "40px", left: "40px" }}
        ></div>  */}
        {children}</body>
          </ThemeProvider>
    </html>
  );
}
