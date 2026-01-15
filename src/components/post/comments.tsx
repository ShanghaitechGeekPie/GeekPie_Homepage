"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-800">
      <Giscus
        id="comments"
        repo="ShanghaitechGeekPie/Posts"
        repoId="R_kgDOQlre0w"
        category="General" 
        categoryId="DIC_kwDOQlre084C0_A3"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
