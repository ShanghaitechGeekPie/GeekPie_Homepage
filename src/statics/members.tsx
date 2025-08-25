import { Testimonial } from "@/components/ui/profile-card-testimonial-carousel";
import { Github, Globe, Linkedin } from "lucide-react";

export const testimonials: Testimonial[] = [
  {
    name: "Lei Huang (Winlere)",
    title: "GeekPie 核心成员 / ACM 前社长",
    description:
      "参与 GeekPie_HPC 超算比赛取得 ISC 23 第三，SC 23 第七。荣获 ICPC 银牌。曾在思勰担任量化系统工程师。曾于新加坡国立大学担任科研助理，现赴 UIUC 攻读计算机科学理学硕士。",
    imageUrl:
      "/assets/members/huangl.webp",
    links: [
      {
        icon: Globe,
        url: "https://winlere.github.io/",
        label: "Website",
      },
      {
        icon: Github,
        url: "https://github.com/winlere",
        label: "GitHub",
      },
      {
        icon: Linkedin,
        url: "https://www.linkedin.com/in/lei-huang-winlere?originalSubdomain=cn",
        label: "LinkedIn",
      },
    ]
  },
  {
    name: "Qingcheng Zhao (Clarivy)",
    title: "GeekPie 前社长",
    description:
      "GeekPie 前社长，CourseBench 主要开发者。曾于大疆、Deemos、NVIDIA 等多家顶级公司实习。",
    imageUrl:
      "/assets/members/zhaoqc.jpg",
    links: [
      {
        icon: Globe,
        url: "https://clarivy.github.io/",
        label: "Website",
      },
      {
        icon: Github,
        url: "https://github.com/Clarivy",
        label: "GitHub",
      },
    ],
  },
  {
    name: "Wentao Lyu",
    title: "GeekPie 核心创始人 / Stereye CEO & Co-Founder",
    description:
      "",
    imageUrl:
      "/assets/members/lyuwt.jpg",
    links: [],
  },
];