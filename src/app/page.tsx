import { TextAnimate } from "@/components/magicui/text-animate";
import { isotonic } from "@/components/localfont";
import cs from "classnames";
import { BentoAbout } from "@/components/bento";
import { RetroGrid } from "@/components/contact";
import Universe from "@/components/universe";
import { RecentPosts } from "@/components/recent-posts";

export default function Home() {
  return (
    <>
      <main className="flex-1 -mt-5">
        <div
          className={cs(
            "flex flex-col items-between justify-center min-h-screen max-h-screen p-5 lg:p-24 relative overflow-clip",
            "[mask-image:linear-gradient(to_top,transparent_0%,#000_10%)]",
          )}
          style={{ paddingTop: 0 }}
        >
          <div className="">
            <Universe />
            <TextAnimate
              animation="blurInUp"
              as="h2"
              className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl"
            >
              For those
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              as="h2"
              delay={0.25}
              className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-8xl mb-3"
            >
              who love Tech
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              delay={0.5}
              as="h1"
              className={cs(
                isotonic.className,
                "text-2xl font-bold tracking-tight lg:text-4xl",
              )}
            >
              GeekPie_ Association @ ShanghaiTech SIST
            </TextAnimate>
          </div>
        </div>
        <RecentPosts />
        <div className="flex flex-col p-10 py-20 gap-5 items-center">
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
            我们是谁？
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-center">
            GeekPie_ 是一个立足于技术的综合性科创社团，屡获殊荣。
            <br />
            方向覆盖人工智能、高性能计算、硬件与软件工程、计算机系统与安全、理论与算法、芯片设计等。
            <br />
            实际上很难用简单的标签概括我们，
            <br />
            我们是一个秉承开源与合作理念，不断追求思想进步和技术前沿的学生组织。
          </p>
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
