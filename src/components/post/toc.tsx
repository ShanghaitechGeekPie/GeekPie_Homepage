"use client";

import { useEffect, useState, useMemo } from "react";
import { Heading } from "@/lib/toc";
import clsx from "clsx";
// 1. 引入图标
import { ChevronsUpDown } from "lucide-react";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  // 2. 新增状态控制是否全部展开
  const [isExpanded, setIsExpanded] = useState(false);

  const activeIds = useMemo(() => {
    if (!activeId) return new Set<string>();

    const activeSet = new Set<string>();
    activeSet.add(activeId);

    const index = headings.findIndex((h) => h.id === activeId);
    if (index === -1) return activeSet;

    const currentHeading = headings[index];
    let currentLevel = currentHeading.level;

    for (let i = index - 1; i >= 0; i--) {
      const h = headings[i];
      if (h.level < currentLevel) {
        activeSet.add(h.id);
        currentLevel = h.level;
      }
    }

    return activeSet;
  }, [activeId, headings]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc">
      <div className="flex items-center justify-start gap-2 mb-4 pr-2">
        <h2 className="text-lg font-semibold">Table of Contents</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
            isExpanded && "bg-muted text-foreground",
          )}
          title={isExpanded ? "Collapse all" : "Expand all"}
          aria-label="Toggle table of contents expansion"
        >
          <ChevronsUpDown className="h-4 w-4" />
        </button>
      </div>

      <ul className="space-y-0 text-sm border-l border-border pl-4">
        {headings.map((heading) => {
          const isActive = activeIds.has(heading.id);
          const isCurrent = activeId === heading.id;

          const isDeep = heading.level > 3;
          const shouldShow = isExpanded || !isDeep || isActive;

          return (
            <li
              key={heading.id}
              className={clsx(
                "grid transition-all duration-300 ease-in-out",
                shouldShow
                  ? "grid-rows-[1fr] opacity-100 my-1"
                  : "grid-rows-[0fr] opacity-0 my-0",
              )}
            >
              <div className="overflow-hidden relative">
                {heading.level >= 4 && (
                  <span
                    className={clsx(
                      "absolute left-4 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary transition-opacity",
                      isCurrent ? "opacity-100" : "opacity-0",
                    )}
                  />
                )}

                <a
                  href={`#${heading.id}`}
                  className={clsx(
                    "block transition-colors hover:text-primary py-1 leading-snug",
                    isActive
                      ? "font-medium text-primary"
                      : "text-muted-foreground",
                    {
                      "pl-0": heading.level === 1,
                      "pl-2": heading.level === 2,
                      "pl-4": heading.level === 3,
                      "pl-8": heading.level >= 4,
                    },
                    isDeep && "text-xs",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setActiveId(heading.id);
                  }}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
