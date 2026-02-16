import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default async function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">个人技术博客</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          分享技术见解与开发经验
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border-b border-gray-200 dark:border-gray-800 pb-8"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <time dateTime={post.date}>
                {format(new Date(post.date), "yyyy年MM月dd日", { locale: zhCN })}
              </time>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            还没有文章，在 content/posts 目录下添加 Markdown 文件开始写作吧
          </p>
        </div>
      )}
    </div>
  );
}
