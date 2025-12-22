import GithubSlugger from 'github-slugger';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  const tree = remark().parse(content);

  visit(tree, 'heading', (node) => {
    const text = toString(node);
    const id = slugger.slug(text);
    if (node.depth >= 6) return;
    
    headings.push({
      id,
      text,
      level: node.depth,
    });
  });

  return headings;
}