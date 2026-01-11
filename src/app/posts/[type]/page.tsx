import { getSortedPostsData, PostType } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PostListWithFilter } from "@/components/post/post-list-with-filter";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Posts | GeekPie Club`,
    description:
      `Explore the latest ${type} posts from GeekPie Association at ShanghaiTech University.`,
  };
}

export function generateStaticParams() {
  return [{ type: "blog" }, { type: "event" }];
}

export default async function PostTypePage(props: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await props.params;

  if (type !== "blog" && type !== "event") {
    notFound();
  }

  const allPosts = getSortedPostsData(type as PostType);
  const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags || []))).sort();

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
              <BreadcrumbLink asChild>
                <Link href="/posts">Posts</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{type}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PostListWithFilter allPosts={allPosts} allTags={allTags} type={type} />
    </>
  );
}
