import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostData } from "@/lib/posts";

function getPreview(content: string) {
  // Remove markdown headings, images, links, etc. roughly
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links but keep text
    .replace(/#{1,6}\s/g, "") // Remove headings
    .replace(/>\s/g, "") // Remove blockquotes
    .replace(/`{3}[\s\S]*?`{3}/g, "") // Remove code blocks
    .replace(/`.*?`/g, "") // Remove inline code
    .replace(/\*\*/g, "") // Remove bold
    .replace(/\*/g, "") // Remove italic
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim();

  return plainText.slice(0, 150) + (plainText.length > 150 ? "..." : "");
}

export function PostCard({ post }: { post: PostData }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-2xl mb-2">
              <Link
                href={`/posts/${post.type}/${post.slug}`}
                className="hover:underline"
              >
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription>
              {format(new Date(post.date), "MMMM d, yyyy")} •{" "}
              <span className="capitalize">{post.type}</span>
              {post.author && ` • By ${post.author}`}
            </CardDescription>
          </div>
          {post.draft && (
            <span className="shrink-0 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800">
              Draft
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{getPreview(post.content)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={`/posts/${post.type}/${post.slug}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
