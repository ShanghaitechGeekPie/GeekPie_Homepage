import {
  GlobeIcon,
  MixIcon,
  PieChartIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import { TechStacks } from "@/components/techstacks";
import { Companies } from "@/components/companies";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Services } from "@/components/services";
import { FaQq, FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoLogoWechat, IoMail } from "react-icons/io5";
import { SiKnowledgebase } from "react-icons/si";

export const features = [
  {
    Icon: RocketIcon,
    name: "信息学院最具影响力的学生组织",
    description:
      "我们开发和运营了上科大 OJ、镜像源，上科大 CourseBench 论坛；举办、承办 Workshop、AOSCC、ASFR 校内比赛、上海市大学生程序设计竞赛等多项赛事和论坛。",
    href: "/calendar",
    cta: "我们最近的动态",
    background: (
      <Services className="absolute h-full transition-all opacity-50 hover:opacity-20 [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)]" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: MixIcon,
    name: "信息学院最多样化的学生组织",
    description:
      "我们的成员来自 CS/EE/BME 等多个专业，尊重不同的背景和身份；我们用多样的技术栈，在各类不同竞赛(HPC、CTF、ICPC、IC Design)中屡获殊荣。",
    href: "/members",
    cta: "我们的成员",
    background: <TechStacks className="absolute opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: PieChartIcon,
    name: "信息学院最优秀的学生组织",
    description:
      "我们的元老人物相继创立公司，融资金额达到千万级至亿级人民币，其中一位入选 30 Under 30 榜单。我们的成员在 Stanford、UCB、UToronto、UIUC 等世界顶尖高校深造，并发表一作文章于世界顶级会议。",
    href: "/posts/blog/",
    cta: "我们的博客和推文",
    background: (
      <FlickeringGrid className="absolute opacity-30 dark:invert-100" />
    ),
    className: "lg:col-start-2 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: GlobeIcon,
    name: "信息学院社会化程度最佳的学生组织",
    description:
      "我们的成员在多家顶级企业实习和工作；我们与社会各界建立频繁的联系与合作关系。“在这里，我们玩真的。”",
    href: "/posts/event",
    cta: "我们举办的活动",
    background: (
      <Companies className="absolute border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_50%)] group-hover:scale-105" />
    ),
    className: "lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-4",
  },
];

export const footerSocials = [
  {
    icon: <FaQq />,
    href: "https://qm.qq.com/cgi-bin/qm/qr?k=g248V3KideQVW6xQA_REfiiErBrsRq_P&authKey=abd97DiBhLi0qyR0PQAMvFm5HCxNr4sjaMGaVuUOsSc5NYptm6trJSgM%2Bmip6MQh&noverify=0&group_code=217260786",
    label: "QQ Group",
    contact: true,
  },
  {
    icon: <IoLogoWechat />,
    href: "https://geekpie.club/posts",
    label: "WeChat Official Account",
  },
  {
    icon: <IoMail />,
    href: "mailto: geekpie@geekpie.club",
    label: "Email",
    contact: true,
  },
  {
    icon: <FaGithub />,
    href: "https://github.com/ShanghaitechGeekPie/",
    label: "Github",
  },
  {
    icon: <SiKnowledgebase />,
    href: "https://ncngzakonwnv.feishu.cn",
    label: "Feishu Knowledge Base",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/company/geekpie/",
    label: "LinkedIn",
    contact: true,
  },
]