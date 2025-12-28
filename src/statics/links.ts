import { NavLink, ServiceEntry } from "@/lib/types";

export const links: Array<NavLink> = [
  {
    title: "社团主页",
    href: "/",
    description: "关于 GeekPie 学生社团",
  },
  {
    title: "活动日历",
    href: "/calendar",
    description:
      "GeekPie 的活动日历，记录 GeekPie 学生社团的活动、比赛、Seminar 等",
  },
  {
    title: "成员介绍",
    href: "/members",
    description: "GeekPie 学生社团的核心成员",
  },
  {
    title: "活动与博客",
    href: "/posts",
    description: "查看我们最新的活动和博客投稿",
  },
];

export const services: Array<ServiceEntry> = [
  {
    title: "GeekPie 服务状态",
    href: "https://status.geekpie.club/status",
    description: "由 GeekPie 运维的主要服务的状态",
  },
  {
    title: "GeekPie Uni-Auth",
    href: "https://auth.geekpie.club/",
    description: "使用 GeekPie 账户登录到各个服务",
  },
  {
    title: "上海科技大学镜像站",
    href: "https://mirrors.shanghaitech.edu.cn/",
    description:
      "抽风、龟速、复古的镜像服务——托管于华东教育网边缘节点张江理工学院",
  },
  {
    title: "CourseBench",
    href: "https://coursebench.geekpie.club/",
    description: "一个真实可靠、不断完善的多维课程评价信息库",
  },
  {
    title: "GeekPie Meeting",
    href: "https://meet.geekpie.club/",
    description: "基于 Jitsi Meet 的无限制视频会议服务（仅校内）",
  },
  {
    title: "Holly DDL",
    href: "https://ddl.geekpie.club/",
    description: "集合 Blackboard / HydroOJ / Gradescope 的一站式 DDL 查询平台",
  },
  {
    title: "Course Prettier",
    href: "https://courseprettier.geekpie.club/",
    description: "上科大课程表美化、导出工具",
  },
  {
    title: "GeekPie Danmaku",
    href: "https://danmaku.geekpie.club/",
    description: "基于 Comment9 的弹幕服务器",
  },
  // {
  //   title: "GeekPie AFFiNE",
  //   href: "https://affine.geekpie.club/",
  //   description:
  //     "GeekPie 运维的笔记与知识管理及协作平台",
  // },
  // {
  //   title: "CTFd",
  //   href: "https://ctfd.geekpie.club/",
  //   description:
  //     "GeekPie_CTF 赛事平台",
  // },
  // {
  //   title: "GeekPie Overleaf",
  //   href: "https://overleaf.geekpie.club/",
  //   description:
  //     "GeekPie 运维的 LaTeX 在线编写平台（仅校内）",
  // },
  {
    title: "Next.GenAI",
    href: "https://chat.geekpie.club/chat",
    description: "简洁、现代的下一代 ShanghaiTech GenAI 前端",
  },
  {
    title: "GeekPie Send",
    href: "https://send.geekpie.club/",
    description: "简单、私密的文件分享服务（仅校内）",
  },
];

export const departlinks: Array<NavLink> = [
  {
    title: "GeekPie_HPC",
    href: "https://hpc.geekpie.club/",
    description: "来自上海科技大学的高性能计算团队",
  },
  {
    title: "GeekPie_CTF",
    href: "https://ctf.geekpie.club/",
    description: "GeekPie_CTF 主页 & WriteUps",
  },
];

export const friendlinks: Array<NavLink> = [
  {
    title: "ShanghaiTech University",
    href: "https://www.shanghaitech.edu.cn/",
    description: "上海科技大学主页",
  },
  {
    title: "ShanghaiTech ACM",
    href: "https://acm.shanghaitech.edu.cn/",
    description: "上海科技大学 ACM 社团",
  },
  {
    title: "DataTech",
    href: "https://www.datatech.club/",
    description: "上海科技大学 DataTech 社团",
  },
  {
    title: "PKU - HPCGame",
    href: "https://hpcgame.pku.edu.cn/",
    description: "北京大学主办、GeekPie_HPC 参与协办的高性能计算挑战赛",
  },
  {
    title: "MirrorZ",
    href: "https://mirrorz.org/",
    description: "高校联合镜像站",
  },
];
