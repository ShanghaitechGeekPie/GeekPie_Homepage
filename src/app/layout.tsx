import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GeekPie_ } from "@/components/geekpie";
import { NavMenu } from "@/components/navigation";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans"],
});

export const metadata: Metadata = {
  title: "GeekPie_",
  description: "ShanghaiTech University, GeekPie_ Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased relative flex flex-col justify-center items-stretch`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-40 p-3 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <GeekPie_ className="min-h-[2rem] max-h-[2rem] min-w-fit hidden md:block" />
              <NavMenu className="" />
            </div>
          </header>
          {children}
          <footer className="flex items-center justify-center w-full p-10 border-t">
            <div className="flex flex-col items-center justify-center w-full max-w-3xl">
              <p className="text-sm text-muted-foreground">
                Designed & Developed by ZAMBAR @ GeekPie_
              </p>
              <p className="text-sm font-bold text-muted-foreground">
                © 2025 GeekPie Association. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
