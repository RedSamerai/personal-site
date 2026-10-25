# OpenCode 指令：个人导航站重构

## 项目信息
- **路径**：`D:\My project\My Wedsite\personal-site`
- **框架**：Astro ^5.18.0 + Tailwind CSS v4（@tailwindcss/vite）
- **部署**：Cloudflare Pages（GitHub push 自动触发）
- **风格**：保持现有深色主题（#0f1419 bg，#3b82f6 accent，Playfair Display + Inter）

---

## 任务概述

将现有个人网站重构为**以导航为主功能**的网站：
- 首页 = 导航（手风琴分类 + 个人信息右侧面板）
- 个人页 = 附属
- 删除作品页和推荐页
- 新建 9 个分类的 JSON 数据文件（先用占位数据，后续手动填充）

---

## 执行步骤（严格按顺序，每步验证后继续）

### Step 1：删除不再需要的页面

删除以下文件：
```
src/pages/works.astro
src/pages/recommendations.astro
src/pages/en/works.astro
src/pages/en/recommendations.astro
```

运行 `npm run build` 确认无报错。

---

### Step 2：创建数据文件结构

创建目录 `src/data/nav/`，以下 10 个文件：

```
src/data/nav/
  01-video.json
  02-books.json
  03-opensource.json
  04-pc.json
  05-mobile.json
  06-common.json
  07-hidden.json
  08-learning.json
  09-design.json
  changelog.json
```

**JSON 结构规范**（每个分类文件）：

```json
{
  "id": "01",
  "title": "影视（在线·磁力·字幕）",
  "subcategories": [
    {
      "id": "01-1",
      "title": "免费在线（无会员）",
      "items": [
        {
          "name": "示例站点",
          "url": "https://example.com",
          "note": "4K无广告，偶尔有贴片广告",
          "stars": null,
          "vpn": false,
          "added": "2026-10-23"
        }
      ]
    }
  ]
}
```

**字段说明**：
- `name`：工具/网站名称
- `url`：完整 URL
- `note`：一句话说明（为什么推荐/有什么特点）
- `stars`：GitHub 星数（仅 GitHub 项目填写，格式 `"4.2k"`，其他填 `null`）
- `vpn`：是否需要科学上网（`true`/`false`，国内直连填 `false`）
- `added`：添加日期（ISO 格式 `YYYY-MM-DD`）

**各分类小项清单**（先用占位数据，每个小项填 1-2 条示例即可）：

**01-video.json**：
- 01-1 免费在线（无会员）
- 01-2 美剧/追剧
- 01-3 动漫/纪录片
- 01-4 直播
- 01-5 字幕
- 01-6 磁力（国内可用）
- 01-7 磁力（需科学上网）

**02-books.json**：
- 02-1 电子书
- 02-2 网文/小说
- 02-3 漫画
- 02-4 音乐下载
- 02-5 在线听歌
- 02-6 有声书/听书
- 02-7 播客

**03-opensource.json**（重点，小项多）：
- 03-1 LLM/推理框架
- 03-2 RAG/知识管理
- 03-3 AI 图像/视频
- 03-4 AI 编程工具
- 03-5 Skills/MCP/Agent 生态
- 03-6 工作流/自动化
- 03-7 效率/开发者工具
- 03-8 浏览器/扩展
- 03-9 量化/金融
- 03-10 前端/框架
- 03-11 系统/DevOps
- 03-12 数据库
- 03-13 有趣/实验

**04-pc.json**：
- 04-1 系统/运行库
- 04-2 办公/文档
- 04-3 解压缩/文件
- 04-4 开发环境
- 04-5 设计/修图工具

**05-mobile.json**：
- 05-1 影视/直播
- 05-2 听歌/有声
- 05-3 办公/效率
- 05-4 学习
- 05-5 摄影/修图

**06-common.json**：
- 06-1 搜索引擎
- 06-2 网盘/同步
- 06-3 财经/资讯
- 06-4 生活/工具

**07-hidden.json**：
- 07-1 宝藏小站
- 07-2 社区/论坛
- 07-3 数据/可视化
- 07-4 实验/艺术

**08-learning.json**：
- 08-1 义务教育（K-12）
- 08-2 大学公开课（国内·国外）
- 08-3 编程/计算机
- 08-4 外语
- 08-5 财经类（CPA/中级经济师/注安）
- 08-6 工程类（一建/造价/监理）
- 08-7 综合（普通话/教资/法考）

**09-design.json**：
- 09-1 设计工具
- 09-2 剪辑
- 09-3 特效/调色
- 09-4 素材（视频/音频/字体）

**changelog.json**：
```json
[
  {
    "date": "10-23",
    "items": [
      "03-4栏：新增 Claude Code、OpenCode 等 3 个 AI 编程工具",
      "01-1栏：更新 2 个免费在线影视站"
    ]
  }
]
```

运行 `npm run build` 确认无报错。

---

### Step 3：创建个人信息数据文件

创建 `src/data/profile.json`：

```json
{
  "name": "RedSamerai",
  "location": "北京",
  "tagline": "什么都会点又什么都不太精通的80后",
  "description": "坐标北京，做量化交易、AI工具、剧本创作。这里放我筛选过的真正有用的资源。",
  "projects": [
    { "name": "a-stock-mcp", "desc": "A股量化MCP服务器，11个工具", "url": "https://github.com/RedSamerai/a-stock-mcp", "stars": "1.5k" },
    { "name": "NarratoAI", "desc": "影视解说生成+自动剪辑", "url": "https://github.com/RedSamerai", "stars": "10.2k" },
    { "name": "quantclean", "desc": "MT5数据清洗工具", "url": "https://github.com/RedSamerai/quantclean", "stars": null },
    { "name": "视频翻译扩展", "desc": "Chrome本地Whisper转写", "url": "https://github.com/RedSamerai/video-summary-extension", "stars": null },
    { "name": "AI简历生成器", "desc": "多模板简历PDF生成", "url": null, "stars": null },
    { "name": "Excel比对工具", "desc": "一键Excel差异对比", "url": null, "stars": null },
    { "name": "会议纪要工具包V2", "desc": "实时转写+本地摘要", "url": null, "stars": null },
    { "name": "《二人组》", "desc": "十集犯罪剧（创作中）", "url": null, "stars": null }
  ]
}
```

---

### Step 4：创建组件

#### 4a：`src/components/nav/NavAccordion.astro`

手风琴主组件。左侧分类按钮列表 + 右侧内容区。

**交互逻辑**：
- 左侧：9 个分类按钮，每个显示 `编号 名称 →`
- 默认无分类展开，右侧显示个人信息面板
- 点击某个分类按钮 → 该分类展开到右侧，其他关闭
- 点击当前已展开的分类 → 关闭，回到个人信息面板
- 按钮展开状态：左侧箭头 `→` 变为 `↓`，按钮背景高亮

**样式**：
- 左侧按钮宽度固定（220px），右侧 flex-1
- 移动端（`md:` 以下）：左侧按钮纵向堆叠在上方，右侧内容在下方（简单 `flex-col`，无横向滚动）
- 切换分类：立即显示/隐藏，无展开动画（或 0.2s opacity fade），不用 max-height 过渡

#### 4b：`src/components/nav/NavItem.astro`

单个导航条目的渲染组件。

**显示内容**（按顺序）：
- `name`（加粗，link 样式）
- 如果有 `stars`：显示 `⭐ {stars}`（小字，灰色）
- 如果有 `note`：显示一句话说明（小字，灰色）
- 如果 `vpn: true`：显示 `🔓 需科学上网` 标签（橙色小标签）
- 如果 `added` 距今 < 14 天：显示绿色小圆点 `●`（新增加入）
- 右侧：`⚠` 按钮（失效反馈，小图标）

**失效反馈按钮**：
- 点击后跳转：`https://github.com/RedSamerai/personal-site/issues/new?title=[失效] {subcategoryId} {name}&body=链接已失效`
- 样式：小字灰色，hover 变红

#### 4c：`src/components/nav/Changelog.astro`

更新日志组件，显示 changelog.json 最新 3 条。

**样式**：
- 横向布局，每条：`✅ {date}  {items[0]}...`
- 字号小（12px），灰色
- 显示在导航主区域上方

#### 4d：`src/components/nav/PersonalPanel.astro`

右侧默认面板（未展开分类时显示）。

**内容**：
- 头像占位（圆形，80px，灰色背景）
- 名字（衬线体，大字）
- tagline（一行）
- "作品" 列表（8 个项目，每个：名字 + 一句话 + GitHub图标）
- `[完整介绍 →]` 链接到 `/about`

**样式**：
- 左侧 40% 宽度，右侧 60%（桌面端）
- 移动端：上下排列

---

### Step 5：重写 index.astro（导航首页）

删除 `src/pages/index.astro` 全部内容，替换为：

```
布局：
┌─────────────────────────────────────┐
│  顶部导航栏（Logo + 关于）           │
├──────────┬──────────────────────────┤
│ 更新日志  │                         │
├──────────┼──────────────────────────┤
│          │  [默认] 个人信息面板      │
│  01 影视 │  或                      │
│  →       │  [展开] 该分类内容       │
│  02 电子书│                         │
│  →       │  小项列表               │
│  ...    │  每个小项标题            │
│          │  + 条目列表             │
│          │                         │
└──────────┴──────────────────────────┘
```

- 左侧：`NavAccordion` 组件（9 个分类按钮）
- 右侧：默认显示 `PersonalPanel`，点击分类后显示该分类内容
- 顶部：`Changelog`（最新 3 条）
- 引入所有 9 个 JSON 数据文件
- 保留现有 CSS 类（fade-in、font-serif、text-fg-muted 等）

运行 `npm run build` 验证。

---

### Step 6：重写 NavBar.astro（极简版）

顶部导航栏只有：
- 左侧：网站 Logo（`RS` 衬线体 或 新名称）
- 右侧：`关于` 链接（到 `/about`）+ 语言切换（如果保留 EN）

删除"首页/作品/笔记"链接。

---

### Step 7：调整 about.astro

`/about` 页面保留，作为完整个人介绍页（从右侧面板"完整介绍"链接进入）。
内容不变，只是入口变了。

---

### Step 8：处理 EN 页面

**保留 EN 结构，但简化**：
- `src/pages/en/index.astro` → 重写为英文导航首页（和中文首页相同的布局，但内容用英文标签）
- `src/pages/en/about.astro` → 保留，英文完整介绍页
- `LanguageSwitch` 组件 → 保留，导航栏右侧显示
- 导航数据文件（`src/data/nav/*.json`）：中文内容不变，EN 页面渲染时显示英文小项标题（或在 JSON 中加 `title_en` 字段，EN 页面用）

**暂不处理**：导航条目本身的英文翻译（影视站名、磁力站名等保持原文），EN 页面主要是布局和描述文字用英文。

运行 `npm run build` 验证。

---

### Step 9：整体构建验证

```bash
cd "D:/My project/My Wedsite/personal-site"
npm run build
# 确认构建成功，页面数：
# /  /en/  /about  /en/about = 4 个页面
```

本地预览：
```bash
npm run dev
# 访问 http://localhost:4321
# 检查：
# - 左侧 9 个分类按钮显示正确
# - 点击分类 → 右侧展开内容
# - 默认状态 → 右侧显示个人信息
# - 更新日志显示 3 条
# - 失效反馈按钮存在
# - 移动端（缩小浏览器窗口）按钮横向排列
# - "科学上网" 标签显示正确
```

---

### Step 10：提交并推送

```bash
git add -A
git commit -m "refactor: restructure as navigation-first personal site with 9 categories"
git push origin main
```

---

## 重要约束

1. **不改** `astro.config.mjs`、`package.json`（Astro 版本）、`wrangler.toml`
2. **保持现有视觉风格**：深色 #0f1419，钴蓝 #3b82f6，Playfair Display 标题，Inter 正文
3. **JSON 文件先用占位数据**（每个小项 1-2 条示例），不要填写真实内容（后续用户手动补充）
4. **移动端自适应**：使用 Tailwind 响应式类（`md:`），小屏幕下按钮纵向堆叠在上方、内容在下方，无横向滚动，无特殊处理
5. **失效反馈**：纯前端跳转 GitHub Issue，不需要后端
6. **"科学上网"标注**：用 `🔓 需科学上网` 标签，不用 "VPN" 字样
7. **星数格式**：GitHub 项目用 `"4.2k"` 字符串格式，非 GitHub 项目填 `null`
8. **新增加入标绿**：`added` 字段距今天数 < 14 天时，显示绿色小圆点

## 文件清单（最终状态）

```
src/pages/
  index.astro          ← 重写（导航首页）
  about.astro          ← 保留（个人完整页）

src/components/
  NavBar.astro         ← 重写（极简）
  LanguageSwitch.astro ← 删除（EN 暂不保留）
  nav/
    NavAccordion.astro ← 新建
    NavItem.astro      ← 新建
    Changelog.astro    ← 新建
    PersonalPanel.astro← 新建

src/data/
  nav/
    01-video.json
    02-books.json
    03-opensource.json
    04-pc.json
    05-mobile.json
    06-common.json
    07-hidden.json
    08-learning.json
    09-design.json
    changelog.json
  profile.json

src/i18n/
  zh.json              ← 保留
  en.json              ← 保留（about 页用）

已删除：
  src/pages/works.astro
  src/pages/recommendations.astro
  src/pages/en/works.astro
  src/pages/en/recommendations.astro

保留：
  src/pages/en/index.astro   ← 重写（EN导航首页）
  src/pages/en/about.astro   ← 保留（EN完整页）
  src/components/LanguageSwitch.astro ← 保留（导航栏语言切换）

  任务概述说明：分类按钮 9 个（01-09），数据文件 10 个（9分类 + changelog.json）
  changelog 单独显示为「更新日志」横条，不占分类按钮位置
```
