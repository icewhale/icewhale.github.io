# 个人技术博客

基于 Next.js、TypeScript 和 MDX 构建的个人技术博客。

## 技术栈

- **Next.js 15** - React 框架，支持 SSG/SSR
- **TypeScript** - 类型安全
- **MDX** - 支持 React 组件的 Markdown
- **Tailwind CSS** - 样式框架
- **Shiki** - 代码高亮
- **gray-matter** - 解析 Markdown frontmatter

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看博客。

### 构建

```bash
npm run build
```

### 生产运行

```bash
npm start
```

## 撰写文章

在 `content/posts` 目录下创建 Markdown 或 MDX 文件：

```markdown
---
title: "文章标题"
date: "2025-01-01"
description: "文章描述"
tags: ["标签1", "标签2"]
---

文章内容...

```typescript
// 代码块自动高亮
const greeting = "Hello, World!";
```
```

## 部署

### Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

### 其他平台

支持任何支持 Next.js 的托管平台（Netlify、Railway 等）。

## 项目结构

```
├── app/              # Next.js App Router
│   ├── blog/         # 博客相关页面
│   ├── layout.tsx    # 根布局
│   └── page.tsx      # 首页
├── components/       # React 组件
├── content/          # 内容文件
│   └── posts/        # 博客文章
├── lib/              # 工具函数
└── public/           # 静态资源
```

## License

MIT
