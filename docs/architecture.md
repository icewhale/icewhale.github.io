# 架构文档

## 概述

本项目是一个基于 Next.js 15 (App Router) 的个人技术博客，采用静态站点生成（SSG）策略，使用 Markdown/MDX 文件作为内容源。

技术栈：Next.js 15 + TypeScript + Tailwind CSS + MDX + Shiki

## 模块总览

```
my-blog/
├── app/                    # 页面路由模块
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式
│   ├── page.tsx            # 首页
│   ├── about/page.tsx      # 关于页
│   └── blog/
│       ├── page.tsx        # 文章列表页
│       └── [slug]/page.tsx # 文章详情页 (动态路由)
├── components/             # UI 组件模块
│   ├── Header.tsx          # 顶部导航
│   ├── Footer.tsx          # 页脚
│   ├── CodeBlock.tsx       # 代码高亮组件
│   └── MDXComponents.tsx   # MDX 自定义组件映射
├── content/                # 内容模块
│   └── posts/              # 博客文章 (.md / .mdx)
├── lib/                    # 数据层模块
│   └── posts.ts            # 文章读取、解析、排序
├── mdx-components.tsx      # MDX 组件导出 (根级)
├── next.config.mjs         # Next.js + MDX 插件配置
├── tailwind.config.ts      # Tailwind CSS 配置
└── postcss.config.mjs      # PostCSS 配置
```

## 模块详细说明

### 1. 页面路由模块 (`app/`)

Next.js App Router 的文件系统路由，负责页面渲染和元数据生成。

| 文件 | 路由 | 渲染方式 | 说明 |
|------|------|----------|------|
| `layout.tsx` | 全局 | 服务端 | 根布局，挂载字体(Inter)、Header、Footer |
| `globals.css` | - | - | CSS 变量定义，明暗主题，prose 代码样式 |
| `page.tsx` | `/` | SSG | 首页，展示按日期倒序的文章列表 |
| `about/page.tsx` | `/about` | SSG | 关于页，静态内容 |
| `blog/page.tsx` | `/blog` | SSG | 文章列表页 |
| `blog/[slug]/page.tsx` | `/blog/:slug` | SSG | 文章详情页，使用 `generateStaticParams` 预渲染 |

**对外暴露：** 无，作为路由入口直接渲染页面。

**依赖关系：**
- `layout.tsx` → `components/Header`, `components/Footer`
- `page.tsx` → `lib/posts.getAllPosts()`
- `blog/page.tsx` → `lib/posts.getAllPosts()`
- `blog/[slug]/page.tsx` → `lib/posts.getPostBySlug()`, `lib/posts.getAllPostSlugs()`, `components/MDXComponents`

### 2. UI 组件模块 (`components/`)

可复用的 React 组件。

#### Header (`Header.tsx`)

顶部导航栏，包含首页链接和导航菜单（文章、关于）。

- **对外暴露：** `default export Header`
- **依赖：** `next/link`
- **被依赖：** `app/layout.tsx`

#### Footer (`Footer.tsx`)

页脚，显示版权信息。

- **对外暴露：** `default export Footer`
- **依赖：** 无
- **被依赖：** `app/layout.tsx`

#### CodeBlock (`CodeBlock.tsx`)

客户端代码高亮组件（`"use client"`），使用 Shiki 引擎渲染。

- **对外暴露：** `default export CodeBlock`
- **依赖：** `shiki` (getHighlighter, BundledLanguage)
- **被依赖：** `components/MDXComponents`, `mdx-components.tsx`
- **支持语言：** TypeScript, JavaScript, Bash, Python, Java, Go, Rust, HTML, CSS, JSON
- **主题：** github-dark / github-light（跟随系统 `prefers-color-scheme`）
- **行为：** 加载中显示原始 `<pre>` 回退，异步加载 Shiki 后替换为高亮 HTML

#### MDXComponents (`MDXComponents.tsx`)

MDX 自定义组件映射表，将 `<pre>` 标签映射到 `CodeBlock`。

- **对外暴露：** `default export MDXComponents`（对象 `{ pre: CodeBlock }`）
- **依赖：** `components/CodeBlock`
- **被依赖：** `app/blog/[slug]/page.tsx`

### 3. 内容模块 (`content/`)

纯文件存储，无代码逻辑。

#### 文章 (`content/posts/`)

Markdown/MDX 格式的博客文章。每篇文章通过 frontmatter 定义元数据：

```yaml
---
title: "文章标题"
date: "YYYY-MM-DD"
description: "文章描述"
tags: ["标签1", "标签2"]
---
```

- **被依赖：** `lib/posts.ts` 在构建时读取此目录

### 4. 数据层模块 (`lib/`)

#### posts.ts

文章数据处理核心，负责从文件系统读取、解析 Markdown frontmatter、排序。

**对外暴露的接口：**

```typescript
interface Post {
  slug: string;        // 文章标识（文件名去后缀）
  title: string;       // 标题
  date: string;        // 日期
  description?: string;// 描述
  tags?: string[];     // 标签列表
  content: string;     // 正文内容（Markdown 原文）
}

function getAllPosts(): Post[]          // 获取所有文章，按日期倒序
function getPostBySlug(slug: string): Post | null  // 按 slug 获取单篇
function getAllPostSlugs(): string[]   // 获取所有 slug（用于 SSG）
```

**依赖：** `fs`, `path`, `gray-matter`
**被依赖：** `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`

**行为细节：**
- 自动创建 `content/posts` 目录（如不存在）
- 支持 `.md` 和 `.mdx` 两种后缀
- slug 查找优先 `.md`，其次 `.mdx`

### 5. 配置模块

#### next.config.mjs

通过 `@next/mdx` 插件扩展 Next.js，支持 `.md`/`.mdx` 文件作为页面。

- `output: 'export'`：启用静态导出，构建产物输出到 `out/` 目录
- `images.unoptimized: true`：禁用图片优化（静态托管不支持）

#### .github/workflows/deploy.yml

GitHub Actions 自动部署工作流，推送 `main` 分支时触发：

1. 使用 pnpm 安装依赖
2. 执行 `pnpm build` 静态导出
3. 上传 `out/` 目录到 GitHub Pages

#### tailwind.config.ts

- 暗色模式：`class` 策略
- 内容扫描：`app/`、`components/`、`pages/`
- 插件：`@tailwindcss/typography`（prose 排版样式）
- 自定义 typography 样式覆盖

#### globals.css

通过 CSS 变量定义明暗主题色板，使用 `prefers-color-scheme` 媒体查询自动切换。代码块样式通过 `.prose pre` / `.prose code` 覆盖。

## 模块依赖关系图

```
content/posts/*.md
       │
       │ (文件系统读取)
       ▼
   lib/posts.ts ──────────────────────────────────┐
       │                                          │
       │ getAllPosts()          getPostBySlug()    │ getAllPostSlugs()
       ▼                       ▼                  ▼
  app/page.tsx            app/blog/[slug]/    app/blog/[slug]/
  app/blog/page.tsx       page.tsx            page.tsx
       │                       │
       │                       │ MDXRemote + MDXComponents
       │                       ▼
       │               components/MDXComponents.tsx
       │                       │
       │                       ▼
       │               components/CodeBlock.tsx
       │                       │
       │                       ▼
       │                     shiki
       │
       └──────────┐
                  ▼
           app/layout.tsx
            │         │
            ▼         ▼
   components/    components/
   Header.tsx     Footer.tsx
```

## 数据流

1. **构建阶段：** `lib/posts.ts` 读取 `content/posts/` 下的所有 Markdown 文件，通过 `gray-matter` 解析 frontmatter 和正文内容
2. **列表渲染：** 首页和文章列表页调用 `getAllPosts()` 获取排序后的文章列表，渲染标题、描述、日期、标签
3. **详情渲染：** 文章详情页调用 `getPostBySlug()` 获取单篇文章，通过 `next-mdx-remote/rsc` 将 Markdown 正文渲染为 React 组件
4. **代码高亮：** MDX 渲染过程中，`<pre>` 标签被替换为 `CodeBlock` 组件，在客户端使用 Shiki 异步完成语法高亮

## 第三方依赖说明

| 包名 | 用途 |
|------|------|
| `next` (15.1.6) | React 框架，SSG/SSR |
| `react` / `react-dom` (19) | UI 渲染 |
| `next-mdx-remote` (5) | 服务端 MDX 渲染 |
| `@next/mdx` / `@mdx-js/loader` / `@mdx-js/react` | MDX 文件支持 |
| `gray-matter` (4) | Markdown frontmatter 解析 |
| `shiki` (1.29) | 代码语法高亮（VSCode 引擎） |
| `date-fns` (4) | 日期格式化 |
| `lucide-react` | 图标库（已安装，尚未使用） |
| `tailwindcss` (3.4) | 原子化 CSS |
| `@tailwindcss/typography` | prose 排版样式 |
