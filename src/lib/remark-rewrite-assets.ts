import { visit } from 'unist-util-visit';
import type { Image, Link, Root } from 'mdast';

export function remarkRewriteAssets() {
  return (tree: Root) => {
    // Rewrite Images
    visit(tree, 'image', (node: Image) => {
      if (node.url.startsWith('../res/')) {
        node.url = node.url.replace('../res/', '/res/');
      } else if (node.url.startsWith('./res/')) {
        node.url = node.url.replace('./res/', '/res/');
      } else if (node.url.startsWith('res/')) {
        node.url = node.url.replace('res/', '/res/');
      }
    });

    // Rewrite Links (for attachments, pdfs, etc.)
    visit(tree, 'link', (node: Link) => {
      if (node.url.startsWith('../res/')) {
        node.url = node.url.replace('../res/', '/res/');
      } else if (node.url.startsWith('./res/')) {
        node.url = node.url.replace('./res/', '/res/');
      } else if (node.url.startsWith('res/')) {
        node.url = node.url.replace('res/', '/res/');
      }
    });
  };
}
