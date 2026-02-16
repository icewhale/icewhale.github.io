"use client";

import { useEffect, useState } from "react";
import { getHighlighter, BundledLanguage } from "shiki";

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function highlight() {
      const codeElement = children as any;
      const className = codeElement.props?.className || "";
      const languageMatch = className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : "text";
      const code = String(codeElement.props?.children || "");

      try {
        const highlighter = await getHighlighter({
          themes: ["github-dark", "github-light"],
          langs: ["typescript", "javascript", "bash", "python", "java", "go", "rust", "html", "css", "json"],
        });

        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const html = highlighter.codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: isDark ? "github-dark" : "github-light",
        });

        setHighlightedCode(html);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(`<pre class="shiki"><code>${code}</code></pre>`);
      }

      setLoading(false);
    }

    highlight();
  }, [children]);

  if (loading) {
    return <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">{children}</pre>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      className="rounded overflow-x-auto"
    />
  );
}
