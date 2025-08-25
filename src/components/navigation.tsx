"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { isotonic } from "./localfont"
import { FaGithub } from "react-icons/fa6"
import { GeekPie_ } from "./geekpie"
import { ModeToggle } from "./toggleDark"

const links: { title: string; href: string; description: string }[] = [
  {
    title: "社团主页",
    href: "/",
    description: "关于 GeekPie 学生社团"
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
    description:
      "GeekPie 学生社团的核心成员",
  },
]


const services: { title: string; href: string; description: string }[] = [
  {
    title: "CourseBench",
    href: "https://coursebench.geekpie.club/",
    description:
      "一个真实可靠、不断完善的多维课程评价信息库",
  },
  {
    title: "Next.GenAI",
    href: "https://chat.geekpie.club/chat",
    description:
      "简洁、现代的下一代 ShanghaiTech GenAI 前端",
  },
  {
    title: "GeekPie Send",
    href: "https://send.geekpie.club/",
    description:
      "简单、私密的文件分享服务（仅校内）",
  },
  {
    title: "GeekPie 服务状态",
    href: "https://status.geekpie.club/status",
    description:
      "由 GeekPie 运维的主要服务的状态",
  },
]

const friendlinks: { title: string; href: string; description: string }[] = [
  {
    title: "GeekPie_HPC",
    href: "https://hpc.geekpie.club/",
    description:
      "来自上海科技大学的高性能计算团队",
  },
  {
    title: "ShanghaiTech University",
    href: "https://www.shanghaitech.edu.cn/",
    description:
      "上海科技大学主页",
  },
  {
    title: "ACM",
    href: "https://acm.shanghaitech.edu.cn/",
    description:
      "上海科技大学 ACM 社团",
  }
]

export function NavMenu({ className }: { className?: string }) {
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={"bg-transparent hidden md:inline-flex"}>探索 GeekPie_</NavigationMenuTrigger>
          <NavigationMenuTrigger className={"bg-transparen md:hidden"}>
            <div className="w-16">
              <GeekPie_ />
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] max-h-[80vh] overflow-y-auto">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="https://github.com/ShanghaitechGeekPie/"
                  >
                    <FaGithub className="h-10 w-10 text-muted-foreground" />
                    <div className={cn(`mb-2 mt-1 text-2xl font-medium`, isotonic.className)}>
                      GeekPie_
                    </div>
                    <p className="text-md leading-tight text-muted-foreground">
                      访问 Github 上的 GeekPie_ 开源仓库
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {links.map((item, index) => (
                <ListItem href={item.href} title={item.title} key={index}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={"bg-transparent"}>
            服务
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-400px gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] max-h-[80vh] overflow-y-auto">
              {/* <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"> */}
              {services.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={"bg-transparent"}>
            友链
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-400px gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[500px] max-h-[80vh] overflow-y-auto">
              {/* <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"> */}
              {friendlinks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <ModeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
