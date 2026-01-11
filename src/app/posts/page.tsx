import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { PostCard } from "@/components/post/post-card";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts | GeekPie Club",
    description:
      "Explore the latest events and blog posts from GeekPie Association at ShanghaiTech University.",
  };
}

export default function PostsPage() {
  const recentEvents = getSortedPostsData("event").slice(0, 2);
  const recentBlogs = getSortedPostsData("blog").slice(0, 2);

  return (
    <>
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Posts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-12 px-4 max-w-4xl space-y-12">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <h1 className="text-6xl font-bold my-5 min-w-fit flex-grow">活动与博客</h1>
          <div className="w-full flex items-center justify-around gap-3 flex-wrap">
            <div className="flex gap-3 items-center justify-center">
              <img
                src="/wechat.jpg"
                alt="WeChat Official Account"
                className="w-20 md:w-28 aspect-square shadow-sm"
              />
              <span className="text-left">
                微信公众号
                <br />
                <b>GeekPie 极客派</b>
              </span>
            </div>
            <div className="flex flex-col justify-center items-end gap-2">
              <Link href="/rss.xml" target="_blank" prefetch={false}
                className="flex items-center text-primary hover:underline group min-w-fit"
              >
                订阅 RSS 源
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/api/geekpie-events.ics" target="_blank" prefetch={false}
                className="flex items-center text-primary hover:underline group min-w-fit"
              >
                订阅活动日历
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-sm text-muted-foreground -mt-2">
                复制链接至日历软件中订阅
              </span>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <section>
          <div className="flex items-center justify-between mb-6 gap-3">
            <h2 className="text-3xl font-bold">极客活动 | GeekPie_ Events</h2>
            <Link
              href="/posts/event"
              className="flex items-center text-primary hover:underline group min-w-fit"
            >
              More events{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {recentEvents.length > 0 ? (
              recentEvents.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <p className="text-muted-foreground col-span-2">
                No upcoming events.
              </p>
            )}
          </div>
        </section>

        {/* Blogs Section */}
        <section>
          <div className="flex items-center justify-between mb-6 gap-3">
            <h2 className="text-3xl font-bold">极客日志 | GeekPie_ Blogs</h2>
            <Link
              href="/posts/blog"
              className="flex items-center text-primary hover:underline group min-w-fit"
            >
              More blogs{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <p className="text-muted-foreground col-span-2">
                No blog posts yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
