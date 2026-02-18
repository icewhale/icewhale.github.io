import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-[var(--background)]/80">
      <div className="max-w-[960px] mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          blog
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-base text-muted hover:text-[var(--foreground)] transition-colors"
          >
            文章
          </Link>
          <Link
            href="/about"
            className="text-base text-muted hover:text-[var(--foreground)] transition-colors"
          >
            关于
          </Link>
        </nav>
      </div>
      <div className="border-b border-[var(--border)]" />
    </header>
  );
}
