"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { PostCard } from "./post-card";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowUpRightIcon, FileQuestion } from "lucide-react";

function PostListWithFilterContent({
  allPosts,
  allTags,
  type,
}: {
  allPosts: PostData[];
  allTags: string[];
  type: string;
}) {
  const searchParams = useSearchParams();
  const activeTags = searchParams.getAll("tag");

  const filteredPosts = useMemo(() => {
    if (activeTags.length === 0) return allPosts;
    return allPosts.filter((post) =>
      activeTags.every((t) => post.tags?.includes(t))
    );
  }, [allPosts, activeTags]);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 capitalize">{type}s</h1>
      <div className="mb-8 flex flex-wrap gap-2">
        {allTags.map((t) => {
          const isActive = activeTags.includes(t);
          const nextTags = isActive
            ? activeTags.filter((at) => at !== t)
            : [...activeTags, t];

          const newParams = new URLSearchParams();
          nextTags.forEach((nt) => newParams.append("tag", nt));
          const href =
            nextTags.length > 0
              ? `/posts/${type}/?${newParams.toString()}`
              : `/posts/${type}/`;

          return (
            <Link
              key={t}
              href={href}
              prefetch={false}
              className={cn(
                toggleVariants({ variant: "outline", size: "sm" }),
                "rounded-xl border-1 px-3 transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </Link>
          );
        })}
        {activeTags.length > 0 && (
          <Link
            href={`/posts/${type}/`}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center ml-2"
          >
            Reset Filters
          </Link>
        )}
      </div>
      <div className="grid gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileQuestion />
              </EmptyMedia>
              <EmptyTitle>No Result</EmptyTitle>
              <EmptyDescription>No posts found with the selected tags.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                variant="link"
                asChild
                className="text-muted-foreground"
                size="sm"
              >
                <Link href={`/posts/${type}/`}>
                  Reset Filters <ArrowUpRightIcon />
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}

export function PostListWithFilter(props: {
  allPosts: PostData[];
  allTags: string[];
  type: string;
}) {
  return (
    <Suspense fallback={<div className="container mx-auto py-12 px-4 max-w-4xl">Loading...</div>}>
      <PostListWithFilterContent {...props} />
    </Suspense>
  );
}
