# personal-site UI 改造 · OpenCode 执行指令（Nocturne 玻璃拟态）
> 交付形态：本文件是可原样粘贴给 OpenCode 的指令块。风格权威 = 仓库内 `DESIGN_nocturne-glassmorphism.md`（务必先读它，逐条遵守，禁止风格漂移）。
> 交叉约束：`design-taste-frontend`（反 AI 味）+ `ui-ux-pro-max`（WCAG AA / 键盘可达 / reduced-motion）。

## 你要做的（单任务：只改样式，不改架构）
把 `D:/My project/My Wedsite/personal-site` 的整体视觉，改成 DESIGN 文件里的 **Nocturne 玻璃拟态（夜航玻璃）**。
保留：两级手风琴交互、i18n（zh/en 双页）、`src/data/nav/*.json` 数据驱动、响应式、SEO 语义标签。
只改：配色、玻璃面板、背景层、字体、阴影/圆角/动效、组件视觉。

## 背景（当前状态）
- 技术栈：Astro ^5.18 + Tailwind v4（`@import "tailwindcss"`，v4 用 `@theme` 写 CSS 变量，不用 tailwind.config.js）。
- 组件：`src/components/{NavBar,ThemeToggle,LanguageSwitch}.astro`、`src/components/nav/{NavAccordion,NavItem,PersonalPanel,Changelog}.astro`。
- 布局：`src/layouts/BaseLayout.astro`；页面：`src/pages/index.astro`、`about.astro` 及 `en/*`。
- 数据：`src/data/nav/01-video.json … 09-design.json`（每条 name/url/note/栏目号）。
- 旧视觉：钴蓝 #3b82f6 + Playfair。本次按 DESIGN 文件替换为「深墨夜景 + 香槟金」体系。

## 执行步骤（逐步做，每步自检）
### Step 1 · 全局背景层（`src/styles/global.css`）
- body 底色 `#0B1322`（边缘可到 `#060A13`）。
- 铺 2–3 个大半径柔和光源光斑（radial-gradient light wells）：
  右上 月光 `rgba(124,156,196,0.28)`、左下 深钢蓝 `rgba(51,81,122,0.35)`、居中可选暖香槟 `rgba(228,184,99,0.10)`。
- 全屏叠加 2–3% SVG `feTurbulence` 噪点（opacity 0.025，`baseFrequency 0.8`，`fractalNoise`）固定铺底。
- 用 `@theme` 定义 token 变量（下面 §token），Tailwind 任意值直接引用。
- 禁止：紫粉渐变（#667eea/#764ba2/#f093fb 一类）、纯色平面背景。

### Step 2 · token 变量（`global.css` 的 `@theme`）
- `--c-bg:#0B1322; --c-bg-deep:#060A13; --c-lift:#16233A; --c-well:#33517A; --c-moon:#7C9CC4;`
- `--c-gold:#E4B863; --c-gold-bright:#F3DCA8;`
- 玻璃：`bg-white/5..12` + `backdrop-blur-[40px]/[60px]` + `backdrop-saturate-[180%]`（移动端 blur 降到 30px）。
- 边框 `border-white/15`（hover→`/30`）；圆角 `rounded-2xl/3xl`；过渡 `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`。
- 唯一强调色 香槟金 `#E4B863`：只用于主 CTA、关键数字、高亮词、选中态，绝不大面积铺。

### Step 3 · 字体（`BaseLayout` 注入）
- 标题：Playfair Display（display/editorial 奢华感），中文标题可衬线 Noto Serif SC 兜底。
- 正文：中文系统栈 `PingFang SC / Microsoft YaHei / Noto Sans SC`；拉丁兜底用 **Manrope 或 Space Grotesk**。
- **禁止 Inter / Roboto / Geist**（design-taste 反 AI 味）。
- 正文行宽 65–75 字符；无渐变文字（`background-clip:text`）；无 tiny uppercase eyebrow。

### Step 4 · 组件套用（逐个改，保留内部逻辑）
| 组件 | 目标样式 |
|---|---|
| `NavBar` | 固定顶栏玻璃：`bg-white/8 backdrop-blur-[40px] backdrop-saturate-[180%] border-b border-white/10` |
| `NavAccordion`（大项） | 玻璃条 `bg-white/6`，选中项 `border-[#E4B863]/40` + 左移指示 |
| `NavItem`（条目卡片） | 玻璃卡 `bg-white/8 blur-[40px] saturate-180% rounded-3xl`，三层方向性阴影（外层深 + 顶边 inset 高光 + 底边 inset 暗缘），hover 上浮 `-translate-y-1` + 扫光高光（skew 光带 700ms）；`active:scale-[0.97]` |
| 〔VPN〕〔破〕 标签 | 玻璃小 chip `bg-white/8 border-white/15 text-white/60 rounded-2xl`；〔破〕用香槟金描边区分 |
| `PersonalPanel` | 右侧附属玻璃面板，头像/坐标/作品卡，关键数字用香槟金 |
| `Changelog` | 玻璃列表，`今日更新` 徽章 = 香槟金 |
| 页脚 | `bg-white/12 blur-[60px]` 三栏 |
- 卡片三层阴影配方（照 DESIGN）：`shadow-[0_16px_40px_rgba(3,7,18,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(2,6,16,0.35)]`。

### Step 5 · 无障碍 + 动效兜底
- 所有交互可键盘 Tab 可达，focus 态 `focus:shadow-[0_0_0_3px_rgba(228,184,99,0.18)]`。
- 正文对比度 WCAG AA（white/80 对 #0B1322 ≥ 4.5:1；弱化文字不低于 white/50）。
- 加 `@media (prefers-reduced-motion: reduce)` 关闭扫光/上浮/长过渡。
- 移动端：手风琴 flex-col 自适应，卡片 1 列，无横向溢出。

## 验收（交付前逐项勾）
- [ ] 背景 = 深墨夜景 + 2–3 光斑 + 噪点；**无紫粉渐变、无平面纯色底**
- [ ] 玻璃面板无色（white/5–12）+ `blur-[40px+]` + `saturate-[180%]` + 三层方向性阴影
- [ ] 香槟金 #E4B863 只出现在 CTA/关键数字/选中/高亮；没被大面积铺
- [ ] 边框 border-white/15、圆角 2xl/3xl、过渡 spring `cubic-bezier(0.16,1,0.3,1)`
- [ ] 标题 Playfair、正文非 Inter/Roboto/Geist；无渐变文字、无 eyebrow、无嵌套卡片
- [ ] 键盘可达 + focus 光晕 + reduced-motion 兜底；正文 AA 对比度
- [ ] 移动/平板/桌面三端无横向溢出，手风琴可用
- [ ] i18n（zh/en）双页同套视觉；数据仍从 `src/data/nav/*.json` 渲染（未改数据）

## 不要做
- 不要动 `src/data/nav/*.json` 内容（10-AI 那个文件另开内容任务）。
- 不要引入新框架/新路由；只改 样式/组件 class/字体/背景层。
- 不要省略 `backdrop-saturate`、不要玻璃透明度 >15%、不要用 `backdrop-blur-sm`、不要用 `duration-100/150`。
