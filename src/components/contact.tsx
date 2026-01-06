"use client";

import { RetroGrid as MagicRetroGrid } from "@/components/magicui/retro-grid";
import { cn } from "@/lib/utils";
import { footerSocials } from "@/statics/home";
import { IconType } from "react-icons";
import { FaGithub, FaQq } from "react-icons/fa6";
import { IoLogoWechat } from "react-icons/io5";
import { MdMail } from "react-icons/md";

const links: { href: string; icon: IconType }[] = footerSocials.filter(item => item.contact).map((item) => ({
  icon: item.icon.type as IconType,
  href: item.href,
}));

export function RetroGrid() {
  return (
    <div className="relative flex h-[500px] w-full flex-col gap-5 items-center justify-center overflow-hidden">
      <span className="pointer-events-none z-10 wrap-anywhere p-5 bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        Contact Us
      </span>

      <div className="flex items-center justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <link.icon
              className={cn(
                "w-6 h-6 hover:opacity-80 hover:scale-110 active:scale-90 transition-all",
              )}
            />
          </a>
        ))}
      </div>

      <img
        src="/geekpie_retro.png"
        alt="GeekPie Retro"
        className="h-[200px] -z-10 dark:invert-100"
      />

      <MagicRetroGrid className="[mask-image:linear-gradient(to_bottom,transparent_30%,#000_100%)]" />
    </div>
  );
}
