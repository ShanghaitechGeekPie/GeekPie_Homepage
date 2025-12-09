'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/lib/toc';
import clsx from 'clsx';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
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
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2 text-sm border-l border-border pl-4">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={clsx("transition-all", {
                "pl-0": heading.level === 1,
                "pl-2": heading.level === 2,
                "pl-4": heading.level === 3,
            })}
          >
            <a
              href={`#${heading.id}`}
              className={clsx(
                'block transition-colors hover:text-primary py-1 text-muted-foreground',
                activeId === heading.id && 'lg:font-bold lg:text-primary'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
                setActiveId(heading.id);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
