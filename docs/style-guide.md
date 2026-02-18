# 页面风格指南

本文档定义博客的视觉设计规范，供后续迭代时参考。整体风格参考 [opencode.ai](https://opencode.ai/)，追求极简、开发者友好的排版美感。

## 设计原则

1. **极简克制** — 不使用多余装饰，以内容为中心，留白充足
2. **排版驱动** — 字体、间距、层级关系是核心表达手段，不依赖色彩或图形
3. **边界清晰** — 用细线（`1px solid var(--border)`）分隔区块，不使用阴影或卡片背景
4. **交互微妙** — hover 效果仅使用 `opacity` 或 `text-decoration-color` 过渡，不使用色彩突变

## 字体体系

### 字体配置

| 用途 | 字体 | CSS 变量 / 类名 | 加载方式 |
|------|------|------------------|----------|
| 英文正文 | JetBrains Mono | `font-sans` | Google Fonts CDN |
| 中文正文 | LXGW Neo ZhiSong（霞鹜新致宋） | `font-sans`（fallback） | 本地 `@font-face`，文件位于 `public/fonts/LXGWNeoZhiSong.ttf` |
| 等宽 / 代码 | Lilex | `font-mono` | Fontsource CDN (`@fontsource/lilex`) |

### 字体栈

```css
/* 正文 (font-sans) */
font-family: "JetBrains Mono", "LXGW Neo ZhiSong", system-ui, sans-serif;

/* 代码 (font-mono) */
font-family: "Lilex", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### 字体规则

- `body` 使用 `font-sans`，英文优先走 JetBrains Mono，中文 fallback 到霞鹜新致宋
- 代码块（`pre`、`code`）使用 `font-mono`，字号与正文一致（`1rem` / `1em`）
- 启用 `font-feature-settings: "liga" 1, "calt" 1` 以支持 Lilex 连字特性
- 中文字体通过 `font-display: swap` 加载，避免阻塞渲染
- 若需新增字体文件，统一放置在 `public/fonts/` 目录

## 色彩体系

通过 CSS 变量定义，使用 `prefers-color-scheme` 媒体查询自动切换明暗主题。

### 变量定义

| 变量名 | Light 模式 | Dark 模式 | 用途 |
|--------|-----------|-----------|------|
| `--background` | `#ffffff` | `#111110` | 页面底色 |
| `--foreground` | `#1d1d1f` | `#f1ecec` | 主文本色 |
| `--muted` | `#646262` | `#b7b1b1` | 次要文本（日期、描述、标签） |
| `--card` | `#f7f7f7` | `#1a1918` | 代码块底色 |
| `--primary` | `#1d1d1f` | `#f1ecec` | 强调元素 |
| `--primary-foreground` | `#fdfdfd` | `#111110` | 强调元素上的文字 |
| `--border` | `rgba(15,0,0,0.12)` | `rgba(255,255,255,0.12)` | 所有边框线 |

### 色彩规则

- **不使用蓝色或其他彩色**作为链接色或强调色，全局仅用前景/背景两极色
- 链接使用 `var(--foreground)` 色 + 下划线（`text-underline-offset: 3px`），hover 时下划线颜色从 `var(--border)` 过渡到 `var(--foreground)`
- 选中文本（`::selection`）反转前景/背景色
- 标签使用线框样式（`border border-[var(--border)]`），不使用填充背景

## 布局规范

### 容器

- 最大宽度：`max-w-[960px]`
- 水平内边距：`px-6`
- 居中：`mx-auto`

### 区块划分

每个页面由多个 `<section>` 组成，区块之间用底部边框分隔：

```
┌─────────────────────────────────┐
│  Header (sticky, backdrop-blur) │
│  ─────────────────── border-b   │
├─────────────────────────────────┤
│  Hero Section (py-20)           │
│    - 页面标题 (text-3xl/4xl)    │
│    - 页面描述 (text-muted)      │
│  ─────────────────── border-b   │
├─────────────────────────────────┤
│  Content Section (py-12)        │
│    - 文章列表 / 正文 / 其他内容  │
├─────────────────────────────────┤
│  ─────────────────── border-t   │
│  Footer (py-8)                  │
└─────────────────────────────────┘
```

### 间距规范

| 位置 | 间距 |
|------|------|
| Hero 区块 | `py-20` |
| 内容区块 | `py-12` |
| Header 内 | `py-5` |
| Footer 内 | `py-8` |
| 文章列表项 | `py-6`，无额外间距（`space-y-0`） |

## 组件风格

### Header

- 粘性定位：`sticky top-0 z-50`
- 毛玻璃效果：`backdrop-blur-sm bg-[var(--background)]/80`
- Logo（左侧）：`text-base font-semibold tracking-tight`，hover 降低透明度
- 导航链接（右侧）：`text-base text-muted`，hover 变为 `var(--foreground)`
- 底部分隔线：单独 `<div>` 承载 `border-b`

### Footer

- 顶部分隔线：单独 `<div>` 承载 `border-t`
- 内容：`text-sm text-muted`，仅显示版权信息

### 文章列表

- 每项由底部边框分隔（`border-b border-[var(--border)]`）
- 标题 + 日期同行（桌面端 `sm:flex-row sm:items-baseline sm:justify-between`）
- 标题：`text-base font-medium`，hover 降低透明度（`group-hover:opacity-70`）
- 日期：`text-sm text-muted`，格式 `yyyy.MM.dd`
- 描述：`text-sm text-muted mt-2`
- 标签：`text-xs text-muted border rounded-sm px-2 py-0.5`，线框样式

### 文章详情页

- Header 区域包含返回链接（`← 返回文章列表`）、标题、日期、标签
- 正文使用 `prose prose-lg max-w-none`
- 正文区块 `py-12`，与 header 区域通过 `border-b` 分隔

### 标签

统一使用线框标签：

```html
<span class="text-xs text-muted border border-[var(--border)] rounded-sm px-2 py-0.5">
  标签名
</span>
```

## 排版规范（Typography / Prose）

文章正文通过 `@tailwindcss/typography` 的 `prose` 类渲染，已在 `tailwind.config.ts` 中覆盖默认样式：

- 所有标题颜色：`var(--foreground)`
- 链接：同色下划线，hover 加深下划线
- 引用：`var(--muted)` 文字 + `var(--border)` 左边线
- 列表标记：`var(--muted)`
- 表格边框：`var(--border)`
- 行内代码：`var(--card)` 底色 + `var(--border)` 边框 + `3px` 圆角
- 代码块：`var(--card)` 底色 + `var(--border)` 边框
- `maxWidth: none`（由外部容器控制宽度）

## 交互规范

| 元素 | 效果 | 实现 |
|------|------|------|
| Logo | hover 降低透明度 | `hover:opacity-70 transition-opacity` |
| 导航链接 | hover 变为主色 | `hover:text-[var(--foreground)] transition-colors` |
| 文章标题 | hover 降低透明度 | `group-hover:opacity-70 transition-opacity` |
| 正文链接 | hover 下划线加深 | `text-decoration-color` 过渡 |
| 返回链接 | hover 变为主色 | `hover:text-[var(--foreground)] transition-colors` |

## 样式文件职责

| 文件 | 职责 |
|------|------|
| `app/globals.css` | CSS 变量（色彩主题）、字体 `@font-face`、`prose` 代码块覆盖样式、链接样式、选中样式 |
| `tailwind.config.ts` | 字体栈定义、语义色映射（`var(--*)` → Tailwind 类名）、typography 插件覆盖 |
| 各组件 `.tsx` | 仅使用 Tailwind 原子类，不编写自定义 CSS |

## 新增页面/组件时的检查清单

1. 容器使用 `max-w-[960px] mx-auto px-6`
2. 页面顶部设置 Hero 区块：`py-20 border-b border-[var(--border)]`
3. 标题使用 `text-3xl sm:text-4xl font-bold tracking-tight`
4. 次要文本使用 `text-muted`（而非 `text-gray-*`）
5. 边框使用 `border-[var(--border)]`（而非 `border-gray-*`）
6. 交互反馈使用 `opacity` 或 `transition-colors`，不使用彩色高亮
7. 代码块确保使用 `font-mono` 类或在 `globals.css` 中已覆盖
8. 不添加 `box-shadow`、`rounded-lg` 等装饰性样式
