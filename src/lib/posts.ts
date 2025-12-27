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
  [key: string]: any;
}

export function getSortedPostsData(type: PostType): PostData[] {
  const dir = path.join(postsDirectory, type);
  if (!fs.existsSync(dir)) {
    return [];
  }
  const fileNames = fs.readdirSync(dir);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(dir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const data = matterResult.data;

      // Ensure date is a string
      if (data.date && data.date instanceof Date) {
        data.date = data.date.toISOString();
      }

      return {
        slug,
        type,
        content: matterResult.content,
        ...(data as { title: string; date: string }),
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
      const fileNames = fs.readdirSync(dir);
      fileNames.forEach((fileName) => {
        if (fileName.endsWith(".md")) {
          paths.push({
            type: type,
            slug: fileName.replace(/\.md$/, ""),
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
  const fullPath = path.join(postsDirectory, type, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const data = matterResult.data;

  // Ensure date is a string
  if (data.date && data.date instanceof Date) {
    data.date = data.date.toISOString();
  }

  return {
    slug,
    type,
    content: matterResult.content,
    ...(data as { title: string; date: string }),
  };
}
