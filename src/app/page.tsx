import { TextAnimate } from "@/components/magicui/text-animate";
import { Globe } from "@/components/magicui/globe";
import { isotonic } from "@/components/localfont";
import cs from "classnames"
import { Particles } from "@/components/magicui/particles";
import { BentoAbout } from "@/components/bento";
import { GeekPie_ } from "@/components/geekpie";
import { NavMenu } from "@/components/navigation";
import { RetroGrid } from "@/components/contact";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

export default function Home() {
  // const { resolvedTheme } = useTheme();
  // const [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  // }, [resolvedTheme]);
  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-sm shadow-sm p-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <GeekPie_ className="min-h-[2rem] max-h-[2rem] min-w-fit hidden md:block" />
          <NavMenu className="" />
        </div>
      </header>
      <main className="flex-1 -mt-5">
        <div className={cs("flex flex-col items-between justify-center min-h-screen max-h-screen p-5 lg:p-24 relative overflow-clip",
          "[mask-image:linear-gradient(to_top,transparent_0%,#000_10%)]"
        )}>
          <Particles
            className="absolute inset-0 z-0"
            quantity={80}
            ease={80}
            vx={1}
            size={0.8}
            color={"#000000"}
            refresh
          />
          <Particles
            className="absolute inset-0 -z-20"
            quantity={20}
            ease={80}
            vx={-1}
            size={0.4}
            color={"#00000044"}
            refresh
          />
          <div className="">
            <TextAnimate animation="blurInUp" as="h1" className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl">
              For those
            </TextAnimate>
            <TextAnimate animation="blurInUp" as="h1" delay={0.25} className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl mb-3">
              who love Tech
            </TextAnimate>
            <TextAnimate animation="blurInUp" delay={0.5} className={cs(isotonic.className, "text-2xl font-bold tracking-tight lg:text-4xl")}>
              GeekPie_ Association @ShanghaiTech SIST
            </TextAnimate>
          </div>
          <Globe className="mt-[70vh] lg:mt-40 mr-auto lg:mr-0 -z-10 max-w-2/3" />
        </div>
        <div className="flex flex-col p-10 gap-5 items-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            我们是谁？
          </h2>

          <div className="flex-grow w-full max-w-4xl lg:overflow-visible">
            <BentoAbout className="w-full h-full lg:p-5" />
          </div>
        </div>
        <div>
          <RetroGrid />
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Designed & Developed by ZAMBAR @ GeekPie_
          </p>
          <p className="text-sm font-bold text-muted-foreground">
            © 2025 GeekPie_ Association. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
