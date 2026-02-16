---
title: "Next.js 开发技巧"
date: "2025-02-01"
description: "提升 Next.js 开发效率的实用技巧"
tags: ["Next.js", "React", "Web开发"]
---

Next.js 是一个强大的 React 框架，这里分享一些实用的开发技巧。

## 1. 使用动态路由

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
```

## 2. 优化图片加载

Next.js 的 Image 组件自动优化图片：

```typescript
import Image from 'next/image';

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={100}
      height={100}
      className="rounded-full"
      priority
    />
  );
}
```

## 3. 服务端组件优先

在 Next.js App Router 中，默认所有组件都是服务端组件：

```typescript
// 自动服务端组件 - 在服务器渲染
async function UserList() {
  const users = await fetch('/api/users').then(r => r.json());
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

## 4. 使用中间件

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = checkAuth(request);

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

## 5. 环境变量管理

```bash
# .env.local
DATABASE_URL=postgresql://...
API_KEY=your_api_key
```

```typescript
// 使用环境变量
const dbUrl = process.env.DATABASE_URL;
```

## 6. 错误处理

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>出错了</h2>
      <p>{error.message}</p>
      <button onClick={reset}>重试</button>
    </div>
  );
}
```

## 7. 配置重定向

```javascript
// next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};
```

这些技巧可以帮助你更高效地开发 Next.js 应用！
