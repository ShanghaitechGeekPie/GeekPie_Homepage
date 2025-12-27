export function TagsList({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
