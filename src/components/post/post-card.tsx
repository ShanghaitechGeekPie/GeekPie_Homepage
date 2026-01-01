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
import { getDescription } from "@/lib/utils";

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
        <p className="text-muted-foreground">{getDescription(post.content, post.summary, 150)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={`/posts/${post.type}/${post.slug}`}>Read more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
