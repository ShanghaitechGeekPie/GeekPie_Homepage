import { visit } from "unist-util-visit";
import type { Image, Link, Root } from "mdast";

export function remarkRewriteAssets(type: string, slug: string) {
  return () => (tree: Root) => {
    // Rewrite Images
    visit(tree, "image", (node: Image) => {
      if (node.url.startsWith("./")) {
        node.url = `/posts/${type}/${slug}/${node.url.slice(2)}`;
      }
    });

    // Rewrite Links (for attachments, pdfs, etc.)
    visit(tree, "link", (node: Link) => {
      if (node.url.startsWith("./")) {
        node.url = `/posts/${type}/${slug}/${node.url.slice(2)}`;
      }
    });
  };
}
