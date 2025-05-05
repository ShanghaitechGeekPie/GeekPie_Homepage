import { TextAnimate } from "@/components/magicui/text-animate";
import { isotonic } from "@/components/localfont";
import cs from "classnames"
import { BentoAbout } from "@/components/bento";
import { RetroGrid } from "@/components/contact";
import Universe from "@/components/universe";

export default function Home() {
  return (
    <>
      <main className="flex-1 -mt-5">
        <div className={cs("flex flex-col items-between justify-center min-h-screen max-h-screen p-5 lg:p-24 relative overflow-clip",
          "[mask-image:linear-gradient(to_top,transparent_0%,#000_10%)]"
        )}
          style={{ paddingTop: 0 }}
        >
          <div className="">
            <Universe />
            <TextAnimate animation="blurInUp" as="h1" className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl">
              For those
            </TextAnimate>
            <TextAnimate animation="blurInUp" as="h1" delay={0.25} className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl mb-3">
              who love Tech
            </TextAnimate>
            <TextAnimate animation="blurInUp" delay={0.5} className={cs(isotonic.className, "text-2xl font-bold tracking-tight lg:text-4xl")}>
              GeekPie_ Association @ ShanghaiTech SIST
            </TextAnimate>
          </div>
        </div>
        <div className="flex flex-col p-10 py-20 gap-5 items-center">
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
    </>
  );
}
