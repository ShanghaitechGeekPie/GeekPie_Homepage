// components/mdx/code-block.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils'; // 假设你有这个类名合并工具，如果没有可以使用 clsx 和 tailwind-merge 直接写

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  'data-language'?: string;
  'data-theme'?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const language = props['data-language'] || 'text';

  const copyToClipboard = async () => {
    if (!preRef.current) return;

    const code = preRef.current.textContent || '';
    
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group my-6 overflow-hidden rounded-lg border border-border bg-zinc-950 dark:border-zinc-800 prose-pre:py-0 prose-pre:bg-transparent prose-pre:border-0 prose-pre:rounded-none">
      <div className="flex items-center justify-between bg-zinc-900 px-4 py-2 text-xs text-zinc-400 border-b border-zinc-800">
        <div className="flex items-center gap-2">
           <Terminal className="h-3.5 w-3.5" />
           <span className="font-medium uppercase">{language}</span>
        </div>
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded p-1 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
          aria-label="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <pre
          ref={preRef}
          className={cn("p-4 text-sm leading-relaxed", className)}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}