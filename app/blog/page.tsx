import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export const metadata = {
  title: "文章列表 - 个人技术博客",
  description: "所有技术文章",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[960px] mx-auto px-6">
      <section className="py-20 border-b border-[var(--border)]">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          文章列表
        </h1>
      </section>

      <section className="py-12">
        {posts.length > 0 ? (
          <div className="space-y-0">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-[var(--border)] py-6 first:pt-0"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3 className="text-base font-medium group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h3>
                    <time
                      dateTime={post.date}
                      className="text-sm text-muted shrink-0"
                    >
                      {format(new Date(post.date), "yyyy.MM.dd", { locale: zhCN })}
                    </time>
                  </div>
                  {post.description && (
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </Link>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted border border-[var(--border)] rounded-sm px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted">
              还没有文章，在 content/posts 目录下添加 Markdown 文件开始写作吧
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
