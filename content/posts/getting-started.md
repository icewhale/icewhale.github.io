---
title: "欢迎来到我的博客"
date: "2025-01-01"
description: "这是第一篇示例文章，展示博客的基本功能"
tags: ["入门", "介绍"]
---

欢迎来到我的个人技术博客！这是一篇示例文章，用于展示博客的基本功能。

## 标题支持

博客支持标准的 Markdown 语法，包括：

- 标题（H1-H6）
- 粗体和*斜体*文本
- 列表
- 链接
- 图片
- 代码块

## 代码高亮

博客集成了 Shiki 代码高亮库，支持多种编程语言：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com"
};

console.log(greet(user));
```

```javascript
// JavaScript 示例
const sum = (a, b) => a + b;

console.log(sum(1, 2)); // 3
```

```bash
# Shell 命令示例
npm install next react typescript
npm run dev
```

## 链接和引用

这是一个[外部链接](https://nextjs.org/)。

> "代码如诗，算法如画。"

## 下一步

现在你可以：
1. 在 `content/posts` 目录下创建新的 Markdown 文件
2. 使用 frontmatter 配置文章元数据
3. 开始撰写你的技术文章

祝你写作愉快！
