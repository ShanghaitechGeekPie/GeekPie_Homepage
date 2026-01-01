import { getPostData, getAllPostIds, PostType } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { remarkRewriteAssets } from "@/lib/remark-rewrite-assets";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { extractHeadings } from "@/lib/toc";
import { TableOfContents } from "@/components/post/toc";
import { TagsList } from "@/components/post/tags";
import { EventInfoCard } from "@/components/post/event-info-card";
import { AlertTriangle } from "lucide-react";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import rehypeGithubAlert from "rehype-github-alert";
import { CodeBlock } from "@/components/mdx/code-block";
import type { Metadata } from "next";
import { getDescription } from "@/lib/utils";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await params;

  if (type !== "blog" && type !== "event") {
    notFound();
  }

  let postData;
  try {
    postData = await getPostData(type as PostType, slug);
  } catch (e) {
    notFound();
  }

  return {
    title: `${postData.title} | GeekPie Club`,
    description: getDescription(postData.content, postData.summary, 160),
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const { type, slug } = await params;

  if (type !== "blog" && type !== "event") {
    notFound();
  }

  let postData;
  try {
    postData = await getPostData(type as PostType, slug);
  } catch (e) {
    notFound();
  }

  const headings = extractHeadings(postData.content);

  const prettyCodeOptions: Options = {
    theme: "github-dark",
    keepBackground: false,
    onVisitLine(node: any) {
      // 防止空行塌陷
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node: any) {
      node.properties.className?.push("bg-zinc-800 border-l-2 border-blue-500");
    },
  };

  const components = {
    pre: CodeBlock, // 将 markdown 中的 pre 标签替换为我们的 CodeBlock 组件
  };

  return (
    <>
      <div className="container mx-auto py-6 px-4">
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
              <BreadcrumbLink asChild>
                <Link href={`/posts/${type}`} className="capitalize">
                  {type}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{postData.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1 order-1">
          <div className="lg:sticky lg:top-24 space-y-8">
            {type === "event" && <EventInfoCard post={postData} />}
            <TableOfContents headings={headings} />
            <div>
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                Tags
              </h3>
              <TagsList tags={postData.tags} />
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 order-2">
          <article className="prose dark:prose-invert max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
            <div className="text-sm text-gray-500 mb-8 flex gap-4">
              <span>{format(new Date(postData.date), "MMMM d, yyyy")}</span>
              {postData.author && <span>By {postData.author}</span>}
            </div>

            {postData.draft && (
              <div className="not-prose mb-8 p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-200 rounded-r-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">监修中</p>
                  <p className="text-sm mt-1">
                    该文章仍处于草稿阶段，内容信息可能有变动，请留意。
                  </p>
                </div>
              </div>
            )}

            <div className="lg:hidden mb-8 not-prose">
              {type === "event" && <EventInfoCard post={postData} />}
              <TableOfContents headings={headings} />
            </div>

            <MDXRemote
              source={postData.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkRewriteAssets],
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeGithubAlert,
                    [rehypePrettyCode, prettyCodeOptions], // 添加高亮插件
                  ],
                },
              }}
            />
          </article>

          <div className="lg:hidden mt-8 border-t pt-4">
            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
              Tags
            </h3>
            <TagsList tags={postData.tags} />
          </div>
        </main>
      </div>
      </div>
    </>
  );
}
