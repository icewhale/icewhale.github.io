export const metadata = {
  title: "关于 - 个人技术博客",
  description: "关于我",
};

export default function AboutPage() {
  return (
    <div className="max-w-[960px] mx-auto px-6">
      <section className="py-20 border-b border-[var(--border)]">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">关于</h1>
      </section>

      <section className="py-12">
        <div className="prose prose-lg max-w-none">
          <p>
            欢迎来到我的个人技术博客！
          </p>
          <p>
            这里是我分享技术见解、开发经验和学习笔记的地方。我专注于 Web 开发、前端技术和软件工程等领域。
          </p>
          <p>
            技术栈主要包括：
          </p>
          <ul>
            <li>React / Next.js</li>
            <li>TypeScript</li>
            <li>Node.js</li>
            <li>数据库技术</li>
          </ul>
          <p>
            希望我的文章对你有所帮助！
          </p>
        </div>
      </section>
    </div>
  );
}
