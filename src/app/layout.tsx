import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GeekPie_ } from "@/components/geekpie";
import { NavMenu } from "@/components/navigation";
import { Footer7 } from "@/components/ui/footer-7";
import { departlinks, friendlinks, links, services } from "@/statics/links";
import { footerSocials } from "@/statics/home";
import Link from "next/link";

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
  title: "GeekPie_ Association @ ShanghaiTech SIST",
  description:
    "For those who love Tech! We are GeekPie Association from ShanghaiTech University.",
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
              <Link className="min-w-fit hidden md:block" href="/">
                <GeekPie_ className="min-h-[2rem] max-h-[2rem]" />
              </Link>
              <NavMenu className="" />
            </div>
          </header>
          {children}
          <footer className="flex items-center justify-center w-full p-5 border-t bg-transparent backdrop-blur-sm">
            <Footer7
              logo={{
                url: "https://geekpie.club/",
                src: "/geekpie_Logo.svg",
                alt: "GeekPie_",
                title: "Association",
              }}
              description="上海科技大学 GeekPie 学生社团 @ SIST"
              sections={[
                {
                  title: "GeekPie_",
                  links: [
                    {
                      name: "Github",
                      href: "https://github.com/ShanghaitechGeekPie/",
                    },
                    ...links.map((link) => {
                      return {
                        name: link.title,
                        href: link.href,
                        description: link.description,
                      };
                    }),
                  ],
                },
                {
                  title: "服务",
                  links: [
                    ...services.map((link) => {
                      return {
                        name: link.title,
                        href: link.href,
                        description: link.description,
                      };
                    }),
                  ],
                },
                {
                  title: "友链",
                  links: [
                    ...departlinks.map((link) => {
                      return {
                        name: link.title,
                        href: link.href,
                        description: link.description,
                      };
                    }),
                    ...friendlinks.map((link) => {
                      return {
                        name: link.title,
                        href: link.href,
                        description: link.description,
                      };
                    }),
                  ],
                },
              ]}
              copyright="Made with ❤️ by ZAMBAR @ GeekPie_"
              socialLinks={footerSocials}
              legalLinks={[
                {
                  name: "沪ICP备2021011443号-2",
                  href: "https://beian.miit.gov.cn/",
                },
              ]}
            />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
