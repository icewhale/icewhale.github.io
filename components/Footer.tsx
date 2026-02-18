export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="border-t border-[var(--border)]" />
      <div className="max-w-[960px] mx-auto px-6 py-8 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} 个人技术博客</p>
      </div>
    </footer>
  );
}
