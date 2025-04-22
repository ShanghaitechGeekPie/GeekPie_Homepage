"use client";

import { RetroGrid as MagicRetroGrid } from "@/components/magicui/retro-grid";
import { IconType } from "react-icons";
import { FaGithub, FaQq } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const links: { href: string, icon: IconType }[] = [
  {
    href: "https://qm.qq.com/cgi-bin/qm/qr?k=g248V3KideQVW6xQA_REfiiErBrsRq_P&authKey=abd97DiBhLi0qyR0PQAMvFm5HCxNr4sjaMGaVuUOsSc5NYptm6trJSgM%2Bmip6MQh&noverify=0&group_code=217260786",
    icon: FaQq,
  },
  {
    href: "https://github.com/ShanghaitechGeekPie/",
    icon: FaGithub,
  },
  {
    href: "mailto:geekpie@geekpie.club",
    icon: MdMail,
  }
]

export function RetroGrid() {
  return (
    <div className="relative flex h-[500px] w-full flex-col gap-5 items-center justify-center overflow-hidden">
      <span className="pointer-events-none z-10 wrap-anywhere p-5 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        Contact Us
      </span>

      <div className="flex items-center justify-center gap-3">
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            <link.icon className="w-6 h-6 hover:opacity-80 hover:scale-105 active:scale-90 transition-all" />
          </a>
        ))
        }
      </div>


      <MagicRetroGrid className="[mask-image:linear-gradient(to_bottom,transparent_30%,#000_100%)]" />
    </div>
  );
}
