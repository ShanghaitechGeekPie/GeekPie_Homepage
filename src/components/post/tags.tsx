import Link from "next/link";
import { cn } from "@/lib/utils";

export function TagsList({
  tags,
  type,
  className,
}: {
  tags: string[];
  type?: "blog" | "event";
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2 mt-4", className)}>
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} type={type} />
      ))}
    </div>
  );
}

export function Tag({ tag, type }: { tag: string; type?: "blog" | "event" }) {
  const content = (
    <span className="px-2.5 py-0.5 bg-accent-foreground/5 text-secondary-foreground rounded-full text-xs font-medium hover:bg-foreground/15 transition-colors cursor-pointer">
      #{tag}
    </span>
  );

  if (type) {
    return <Link href={`/posts/${type}/?tag=${encodeURIComponent(tag)}`}>{content}</Link>;
  }

  return content;
}
