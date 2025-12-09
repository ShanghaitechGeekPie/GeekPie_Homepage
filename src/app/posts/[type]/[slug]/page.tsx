import { getPostData, getAllPostIds, PostType } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { extractHeadings } from '@/lib/toc';
import { TableOfContents } from '@/components/post/toc';
import { TagsList } from '@/components/post/tags';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  
  if (type !== 'blog' && type !== 'event') {
    notFound();
  }

  let postData;
  try {
      postData = await getPostData(type as PostType, slug);
  } catch (e) {
      notFound();
  }

  const headings = extractHeadings(postData.content);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1 order-1">
           <div className="lg:sticky lg:top-24 space-y-8">
              <TableOfContents headings={headings} />
              <div>
                 <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Tags</h3>
                 <TagsList tags={postData.tags} />
              </div>
           </div>
        </aside>

        <main className="lg:col-span-3 order-2">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
            <div className="text-sm text-gray-500 mb-8 flex gap-4">
              <span>{format(new Date(postData.date), 'MMMM d, yyyy')}</span>
              {postData.author && <span>By {postData.author}</span>}
            </div>
            
            {type === 'event' && (
               <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
                 <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                 {postData.place && <p><strong>Location:</strong> {postData.place}</p>}
                 {postData.start && <p><strong>Start:</strong> {format(new Date(postData.start), 'PPpp')}</p>}
                 {postData.end && <p><strong>End:</strong> {format(new Date(postData.end), 'PPpp')}</p>}
               </div>
            )}

            <div className="lg:hidden mb-8 not-prose">
               <TableOfContents headings={headings} />
            </div>

            <MDXRemote
              source={postData.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </article>

           <div className="lg:hidden mt-8 border-t pt-4">
              <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Tags</h3>
              <TagsList tags={postData.tags} />
           </div>
        </main>
      </div>
    </div>
  );
}
