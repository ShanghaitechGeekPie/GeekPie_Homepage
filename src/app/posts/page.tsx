import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { PostCard } from '@/components/post/post-card';
import { ArrowRight } from 'lucide-react';

export default function PostsPage() {
  const recentEvents = getSortedPostsData('event').slice(0, 2);
  const recentBlogs = getSortedPostsData('blog').slice(0, 2);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl space-y-12">
      <h1 className="text-6xl font-bold my-5">活动与博客</h1>
      
      {/* Events Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest Events</h2>
          <Link href="/posts/event" className="flex items-center text-primary hover:underline group">
            View all events <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recentEvents.length > 0 ? (
            recentEvents.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2">No upcoming events.</p>
          )}
        </div>
      </section>

      {/* Blogs Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <Link href="/posts/blog" className="flex items-center text-primary hover:underline group">
            View all blogs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recentBlogs.length > 0 ? (
            recentBlogs.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
             <p className="text-muted-foreground col-span-2">No blog posts yet.</p>
          )}
        </div>
      </section>

    </div>
  );
}

