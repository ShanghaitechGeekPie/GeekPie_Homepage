import { getSortedPostsData, PostType } from '@/lib/posts';
import { PostCard } from '@/components/post/post-card';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { type: 'blog' },
    { type: 'event' },
  ];
}

export default async function PostTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (type !== 'blog' && type !== 'event') {
    notFound();
  }

  const posts = getSortedPostsData(type as PostType);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 capitalize">{type}s</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
