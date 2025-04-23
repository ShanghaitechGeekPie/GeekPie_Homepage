import {
  GlobeIcon,
  MixIcon,
  PieChartIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import cs from "classnames";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { TechStacks } from "./techstacks";
import { Companies } from "./companies";
import { FlickeringGrid } from "./magicui/flickering-grid";
import { Services } from "./services";

const features = [
  {
    Icon: RocketIcon,
    name: "信息学院最具影响力的学生组织",
    description: "我们开发和运营了上科大 OJ、镜像源，上科大 CourseBench 论坛。举办、承办 Workshop、AOSCC、ASFR 校内比赛、上海市大学生程序设计竞赛等多项赛事和论坛。",
    href: "#",
    cta: "Learn more",
    background: (<Services className="absolute h-full transition-all opacity-50 hover:opacity-20 hover:scale-105 [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]"/>),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MixIcon,
    name: "信息学院最多样化的学生组织",
    description:
      "我们的成员来自 CS/EE/BME 等多个专业，掌握多种编程语言和技术栈，拥有丰富的项目和比赛经验。在 HPC、CTF、ICPC 等竞赛中屡获殊荣。",
    href: "#",
    cta: "Learn more",
    background: <TechStacks className="absolute opacity-60"/>,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: PieChartIcon,
    name: "信息学院最优秀的学生组织",
    description: "我们的元老人物相继创立公司，融资金额达到千万级至亿级人民币，其中一位入选 30 Under 30 榜单。我们的成员在 MIT、UCB、CMU、UIUC 等世界顶尖高校深造，并发表多篇一作文章于世界顶级会议。",
    href: "#",
    cta: "Learn more",
    background: (<FlickeringGrid className="absolute opacity-30 dark:invert-100"/>),
    className: "lg:col-start-2 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: GlobeIcon,
    name: "信息学院社会化程度最佳的学生组织",
    description: "我们的成员在多家顶级企业实习和工作，与多家量化、科技企业举办技术分享会等活动。“在这里，我们玩真的。”",
    href: "#",
    cta: "Learn more",
    background: (<Companies className="absolute border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_50%)] group-hover:scale-105" />),
    className: "lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoAbout({ className }: { className?: string }) {
    return (
        <BentoGrid className={cs(`lg:grid-rows-[280px_minmax(200px,1fr)_200px]`, className)}>
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
