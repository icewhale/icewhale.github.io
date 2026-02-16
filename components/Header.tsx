import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          首页
        </Link>
        <nav className="flex gap-6">
          <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            文章
          </Link>
          <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
