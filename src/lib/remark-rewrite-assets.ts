import { visit } from 'unist-util-visit';
import type { Node } from 'unist';

interface ImageNode extends Node {
  type: 'image';
  url: string;
  alt?: string;
}

interface LinkNode extends Node {
  type: 'link';
  url: string;
  children?: Node[];
}

export function remarkRewriteAssets() {
  return (tree: Node) => {
    // Rewrite Images
    visit(tree, 'image', (node: any) => {
      const imageNode = node as ImageNode;
      if (imageNode.url.startsWith('../res/')) {
        imageNode.url = imageNode.url.replace('../res/', '/res/');
      } else if (imageNode.url.startsWith('./res/')) {
        imageNode.url = imageNode.url.replace('./res/', '/res/');
      } else if (imageNode.url.startsWith('res/')) {
        imageNode.url = imageNode.url.replace('res/', '/res/');
      }
    });

    // Rewrite Links (for attachments, pdfs, etc.)
    visit(tree, 'link', (node: any) => {
      const linkNode = node as LinkNode;
      if (linkNode.url.startsWith('../res/')) {
        linkNode.url = linkNode.url.replace('../res/', '/res/');
      } else if (linkNode.url.startsWith('./res/')) {
        linkNode.url = linkNode.url.replace('./res/', '/res/');
      } else if (linkNode.url.startsWith('res/')) {
        linkNode.url = linkNode.url.replace('res/', '/res/');
      }
    });
  };
}
