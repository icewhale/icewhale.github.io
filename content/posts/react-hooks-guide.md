---
title: "React Hooks 最佳实践"
date: "2025-01-15"
description: "深入理解 React Hooks 的使用场景和最佳实践"
tags: ["React", "前端", "JavaScript"]
---

React Hooks 是 React 16.0 引入的重要特性，它让我们能够在函数组件中使用状态和其他 React 特性。

## useState Hook

`useState` 是最常用的 Hook，用于在函数组件中添加状态。

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect Hook

`useEffect` 用于处理副作用，如数据获取、订阅等。

```typescript
import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

## 自定义 Hooks

自定义 Hooks 可以复用组件逻辑。

```typescript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用自定义 Hook
function ResponsiveComponent() {
  const { width } = {width: window.innerWidth};

  return <div>Window width: {width}px</div>;
}
```

## 最佳实践

1. **Hooks 只能在顶层调用**：不要在循环、条件或嵌套函数中调用 Hooks
2. **依赖数组要完整**：确保 `useEffect` 的依赖数组包含所有用到的变量
3. **善用自定义 Hooks**：将复杂逻辑提取到自定义 Hook 中
4. **避免过度优化**：`useMemo` 和 `useCallback` 只在必要时使用

```typescript
// 好的实践
useEffect(() => {
  fetchData(dependency);
}, [dependency]);

// 坏的实践 - 缺少依赖
useEffect(() => {
  fetchData(dependency);
}, []);
```

## 总结

React Hooks 提供了一种更简洁、更符合函数式编程思想的方式来编写 React 组件。掌握 Hooks 是成为优秀 React 开发者的必备技能。
