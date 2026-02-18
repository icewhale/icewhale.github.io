# 功能变更文档

## v0.1.2 (2025-02-18) - GitHub Pages 部署

### 新增功能

#### 部署
- 配置 `output: 'export'` 静态导出，构建产物输出到 `out/` 目录
- 配置 `images.unoptimized: true` 适配静态托管环境
- 添加 GitHub Actions 工作流 (`.github/workflows/deploy.yml`)，推送 `main` 分支自动构建并部署到 GitHub Pages
- 使用 pnpm 作为 CI 包管理器

## v0.1.0 (2025-01-01) - 初始版本

首次搭建个人技术博客，完成基础框架和核心功能。

### 新增功能

#### 博客框架
- 基于 Next.js 15 (App Router) + TypeScript 搭建项目
- 配置 Tailwind CSS 样式框架，集成 `@tailwindcss/typography` 排版插件
- 配置 PostCSS + Autoprefixer

#### 页面
- **首页 (`/`)：** 展示所有文章列表，按日期倒序排列，显示标题、描述、日期、标签
- **文章列表页 (`/blog`)：** 专门的文章列表页面
- **文章详情页 (`/blog/:slug`)：** 动态路由，渲染 Markdown/MDX 文章内容
- **关于页 (`/about`)：** 静态个人介绍页面

#### Markdown 文章系统
- 支持 `.md` 和 `.mdx` 格式的文章
- 通过 frontmatter 定义文章元数据（标题、日期、描述、标签）
- 使用 `gray-matter` 解析 frontmatter
- 使用 `next-mdx-remote` 在服务端渲染 MDX 内容
- 文章按日期自动倒序排列

#### 代码高亮
- 集成 Shiki 语法高亮引擎（VSCode 同款）
- 支持 10 种编程语言：TypeScript, JavaScript, Bash, Python, Java, Go, Rust, HTML, CSS, JSON
- 明暗主题自动切换（github-light / github-dark）
- 加载中回退显示原始代码块

#### UI 组件
- **Header：** 顶部导航栏（首页、文章、关于）
- **Footer：** 页脚版权信息
- **CodeBlock：** 客户端代码高亮渲染组件
- **MDXComponents：** MDX 自定义组件映射

#### 样式与主题
- 简洁极简风格，单栏布局，最大宽度 4xl
- CSS 变量定义色板，支持明暗主题（`prefers-color-scheme` 自动切换）
- Inter 字体
- 响应式设计

#### SEO
- 各页面独立的 metadata（title, description）
- 文章详情页动态生成元数据

#### 静态生成
- 所有页面使用 SSG 预渲染
- 文章详情页通过 `generateStaticParams` 在构建时生成所有路由

#### 示例文章
- `getting-started.md` - 博客功能介绍
- `react-hooks-guide.md` - React Hooks 最佳实践
- `nextjs-tips.md` - Next.js 开发技巧
