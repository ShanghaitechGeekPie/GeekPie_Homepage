import { getAllSortedPosts } from "@/lib/posts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remarkRewriteAssets } from "@/lib/remark-rewrite-assets";

export const dynamic = "force-static";

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRewriteAssets)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  
  return String(result);
}

export async function GET() {
  const posts = getAllSortedPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://geekpie.club";

  const items = await Promise.all(
    posts.map(async (post) => {
      const url = `${siteUrl}/posts/${post.type}/${post.slug}`;
      const htmlContent = await markdownToHtml(post.content);
      return `
    <item>
      <title>[GeekPie ${post.type}] ${post.title}</title>
      ${post.author && typeof post.author === "string" ? `<author>${post.author}</author>` : ""}
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${htmlContent}]]></description>
      <category>${post.type}</category>
      ${post.tags && post.tags.map((tag:any) => `<category>${tag}</category>`).join("\n")}
    </item>`;
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/css" href="/assets/css/rss.css" ?>
<rss version="2.0">
  <channel>
    <title>GeekPie Posts</title>
    <link>${siteUrl}</link>
    <description>GeekPie_ 的 RSS 订阅源，包含了最新的帖子和活动。订阅我们，探索我们的最新动态和技术分享！ <br/> GeekPie_ 是一个立足于技术的综合性科创社团，屡获殊荣。方向覆盖人工智能、高性能计算、硬件与软件工程、计算机系统与安全、理论与算法、芯片设计等。实际上很难用简单的标签概括我们，我们是一个秉承开源与合作理念，不断追求思想进步和技术前沿的学生组织。</description>
    ${items.join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
