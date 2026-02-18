import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import Link from "next/link";
import MDXComponents from "@/components/MDXComponents";

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} - 个人技术博客`,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <article>
        <header className="py-20 border-b border-[var(--border)]">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1 mb-8"
          >
            &larr; 返回文章列表
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted">
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy.MM.dd", { locale: zhCN })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--border)] rounded-sm px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none py-12">
          <MDXRemote source={post.content} components={MDXComponents} />
        </div>
      </article>
    </div>
  );
}
