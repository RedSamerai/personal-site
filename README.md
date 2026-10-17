# personal-site

RedSamerai 的个人主页。Astro 5 + Tailwind CSS 4 + TypeScript，中英双语（文件级方案）。

## 本地运行

```bash
npm install
npm run dev
```

开发服务器：http://localhost:4321

## 构建

```bash
npm run build
```

输出到 `dist/`。

## 部署到 Cloudflare Pages

1. 在 Cloudflare Dashboard → Pages → 连接 GitHub 仓库 `RedSamerai/personal-site`
2. Build command: `npm run build`，Output directory: `dist`
3. push 到 `main` 分支自动部署

## 目录结构

- `src/pages/` — 中文版页面（`/`、`/about`、`/works`、`/recommendations`）
- `src/pages/en/` — 英文版页面（`/en/*`）
- `src/components/` — Layout / NavBar / LanguageSwitch
- `src/content/recommendations/` — 推荐内容（Content Collections：movies / music / books）
- `src/i18n/` — zh.json / en.json 共享文案
- `src/styles/global.css` — Tailwind v4 + 主题色（#0a0a0a / #f5f5f5 / #00ff88 / #888888）

## 约定

- i18n 为文件级方案：每个页面写两份（中/英），不做动态语言检测
- 图标：内联 SVG / 极简符号（未用 lucide，保持轻量）
- Tailwind v4 通过 `@tailwindcss/vite` 插件接入，无 tailwind.config.mjs，主题在 `global.css` 的 `@theme` 中定义
