# AGENTS.md - 开发指南

## 项目概述

基于 Next.js 15 (App Router) + TypeScript + Tailwind CSS 的个人技术博客。
使用 Markdown/MDX 作为内容源，Shiki 做代码高亮，SSG 静态生成。

详细架构参见 `docs/architecture.md`，版本变更参见 `docs/changelog.md`。

## 关键约定

### 目录职责

| 目录 | 用途 | 注意事项 |
|------|------|----------|
| `app/` | Next.js App Router 页面 | 仅放路由文件（page.tsx, layout.tsx, error.tsx 等） |
| `components/` | 可复用 UI 组件 | 每个组件一个文件，PascalCase 命名，default export |
| `lib/` | 数据处理、工具函数 | 纯逻辑，不包含 React 组件 |
| `content/posts/` | 博客文章 | `.md` / `.mdx` 格式，必须包含 frontmatter |
| `docs/` | 项目文档 | 架构文档和变更日志，需随功能变更同步更新 |

### 路径别名

使用 `@/*` 指向项目根目录（已在 tsconfig.json 中配置），导入时统一使用此别名：

```typescript
import { getAllPosts } from "@/lib/posts";
import Header from "@/components/Header";
```

### 文章 Frontmatter 格式

```yaml
---
title: "文章标题"          # 必填
date: "YYYY-MM-DD"        # 必填，用于排序
description: "文章简介"    # 可选，列表页展示
tags: ["标签1", "标签2"]   # 可选
---
```

### 服务端 vs 客户端组件

- 页面组件默认为服务端组件（Server Component），不要添加 `"use client"`
- 需要浏览器 API（window、DOM 事件、useState/useEffect 等）的组件必须标记 `"use client"`
- 当前仅 `CodeBlock.tsx` 是客户端组件

### Next.js 15 异步 Params

动态路由的 `params` 是 `Promise` 类型，必须 await：

```typescript
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // ...
}
```

`generateMetadata` 同理。

### 样式规范

- 使用 Tailwind CSS 原子类，不写自定义 CSS（全局主题变量除外）
- 布局最大宽度 `max-w-4xl mx-auto px-4`
- 明暗主题通过 CSS 变量 + `prefers-color-scheme` 自动切换
- 文章正文使用 `prose prose-lg dark:prose-invert` 排版类

### MDX 组件映射

自定义 MDX 元素映射在 `components/MDXComponents.tsx` 中维护。
新增自定义渲染元素时（如自定义图片、表格），在此文件添加映射。

## 常用命令

```bash
npm run dev    # 启动开发服务器 (localhost:3000)
npm run build  # 生产构建（会执行类型检查）
npm run start  # 启动生产服务器
npm run lint   # ESLint 检查
```

## 开发流程

### 添加新文章

在 `content/posts/` 下创建 `.md` 或 `.mdx` 文件，包含正确的 frontmatter，无需修改任何代码。

### 添加新页面

1. 在 `app/` 下创建对应目录和 `page.tsx`
2. 导出 `metadata` 对象用于 SEO
3. 如需导航入口，在 `components/Header.tsx` 添加链接

### 添加新组件

1. 在 `components/` 下创建 `ComponentName.tsx`
2. 使用 default export
3. 需要浏览器 API 时在文件顶部加 `"use client"`

### 扩展文章数据模型

修改 `lib/posts.ts` 中的 `Post` 接口和解析逻辑，所有消费方会自动获取新字段。

### 添加 MDX 自定义组件

1. 在 `components/` 下创建组件
2. 在 `components/MDXComponents.tsx` 中添加标签到组件的映射

## 验证清单

每次功能变更后，执行以下检查：

1. `npm run build` 通过（包含 TypeScript 类型检查和静态页面生成）
2. `npm run lint` 无错误
3. 本地 `npm run dev` 验证页面渲染正常

## 文档维护

功能变更后必须同步更新 `docs/` 目录下的文档：

- **新增/修改模块** → 更新 `docs/architecture.md` 中对应模块说明和依赖关系
- **任何功能变更** → 在 `docs/changelog.md` 中追加记录

## 注意事项

- TypeScript 严格模式已开启（`strict: true`），不要使用 `@ts-ignore` 绕过类型错误
- `lucide-react` 已安装但尚未使用，需要图标时优先使用此库
- 代码高亮组件 `CodeBlock` 中预加载的语言列表是固定的，新增语言需修改 `getHighlighter` 的 `langs` 数组
- 文章 slug 取自文件名（去后缀），slug 查找优先 `.md` 其次 `.mdx`
