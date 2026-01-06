import { getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/post/post-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RecentPosts() {
  const blogs = getSortedPostsData("blog");
  const events = getSortedPostsData("event");

  const allPosts = [...blogs, ...events]
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col p-10 py-20 gap-5 items-center w-full">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl">
        活动与博客
      </h2>
      <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-center">
        探索我们的最新动态和技术分享
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {recentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <Button asChild variant="outline">
          <Link href="/posts">查看更多推文</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/api/geekpie-events.ics" target="_blank" prefetch={false}>
            订阅活动日历
          </Link>
        </Button>
      </div>
      <span className="text-sm text-muted-foreground mt-2">
        活动日历为 ics 格式，由前端生成，不可下载。请复制链接至日历软件中订阅。
      </span>
    </div>
  );
}
