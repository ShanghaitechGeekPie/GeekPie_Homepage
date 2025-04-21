import { TextAnimate } from "@/components/magicui/text-animate";
import { Globe } from "@/components/magicui/globe";
import { isotonic } from "@/components/localfont";
import cs from "classnames"
import { Particles } from "@/components/magicui/particles";
import { BentoAbout } from "@/components/bento";
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
      <div className="flex flex-col items-between justify-center min-h-screen max-h-screen p-5 lg:p-24 relative overflow-clip">
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
          <TextAnimate animation="blurInUp" as="h1" className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-8xl">
            For those
          </TextAnimate>
          <TextAnimate animation="blurInUp" as="h1" delay={0.25} className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-8xl mb-3">
            who love Tech
          </TextAnimate>
          <TextAnimate animation="blurInUp" delay={0.5} className={cs(isotonic.className, "text-2xl font-bold tracking-tight lg:text-4xl")}>
            GeekPie_ Association @ ShanghaiTech
          </TextAnimate>
        </div>
        <Globe className="mt-[70vh] lg:mt-40 mr-auto lg:mr-0 -z-10 max-w-2/3" />
      </div>
      <div className="flex flex-col h-screen p-10 gap-5 items-center">
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
          我们是谁？
        </h2>

        <div className="flex-grow w-full max-w-4xl lg:overflow-auto">
          <BentoAbout className="w-full h-full p-5" />
        </div>
      </div>


    </>
  );
}
