import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/posts");

export type PostType = "blog" | "event";

export interface PostData {
  slug: string;
  type: PostType;
  title: string;
  date: string;
  content: string;
  tags?: string[];
  duration?: "milestone" | "continuous";
  [key: string]: any;
}

export function getSortedPostsData(type: PostType): PostData[] {
  const dir = path.join(postsDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const allPostsData = entries
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "index.md")))
    .map((entry) => {
      const slug = entry.name;
      const fullPath = path.join(dir, entry.name, "index.md");
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const data = matterResult.data;

      // Ensure date is a string
      if (data.date && data.date instanceof Date) {
        data.date = data.date.toISOString();
      }
      if (data.start && data.start instanceof Date) {
        data.start = data.start.toISOString();
      }
      if (data.end && data.end instanceof Date) {
        data.end = data.end.toISOString();
      }

      // Ensure tags are strings
      if (data.tags && Array.isArray(data.tags)) {
        data.tags = data.tags.map((tag) => String(tag));
      }

      return {
        slug,
        type,
        content: matterResult.content,
        ...(data as { title: string; date: string; tags?: string[] }),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllSortedPosts(): PostData[] {
  const blogs = getSortedPostsData("blog");
  const events = getSortedPostsData("event");
  const allPosts = [...blogs, ...events];

  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const types: PostType[] = ["blog", "event"];
  let paths: { type: string; slug: string }[] = [];

  types.forEach((type) => {
    const dir = path.join(postsDirectory, type);
    if (fs.existsSync(dir)) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach((entry) => {
        if (entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, "index.md"))) {
          paths.push({
            type: type,
            slug: entry.name,
          });
        }
      });
    }
  });
  return paths;
}

export async function getPostData(
  type: PostType,
  slug: string,
): Promise<PostData> {
  const fullPath = path.join(postsDirectory, type, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const data = matterResult.data;

  // Ensure date is a string
  if (data.date && data.date instanceof Date) {
    data.date = data.date.toISOString();
  }
  if (data.start && data.start instanceof Date) {
    data.start = data.start.toISOString();
  }
  if (data.end && data.end instanceof Date) {
    data.end = data.end.toISOString();
  }

  return {
    slug,
    type,
    content: matterResult.content,
    ...(data as { title: string; date: string; tags?: string[] }),
  };
}
