## 第二部分：OpenClaw / Hermes 自动化

### 安装

把文件夹放进你的 skills 目录：

```
mkdir -p skills
cp -R site-design-student-skill skills/site-design-student
```

如果你用 Hermes，也可以放到 profile 目录：

```
mkdir -p ~/.hermes/profiles/default/skills
cp -R site-design-student-skill ~/.hermes/profiles/default/skills/site-design-student
```

default 换成你的 profile 名即可。

---

### 最简单用法

直接把这段发给 Agent：

```
请使用 site-design-student Skill，为我的产品做站点设计。

产品名：
一句话定位：
目标用户：
核心页面：首页 / Pricing / FAQ / SEO 页面
竞品：URL1 URL2 URL3

请输出：
1. 竞品视觉分析
2. 反 AI 味约束表
3. 3 个设计方向
4. 首页页面生成 Prompt
5. Logo / OG / Hero 图提示词
6. HANDOFF.md
```

---

### 推荐用法

先填写：

```
templates/input-brief.md
```

然后发给 Agent：

```
请使用 site-design-student Skill，基于下面的 input brief 生成完整设计交付包。

[粘贴 input brief]
```

---

### 有没有 Key 都能用

#### 无 Key：直接拿 Prompt

#### 有 Key：自动化用法

如果你希望 Agent 直接生成页面或图片，需要按工具配置对应 Key：

Stitch API Key 获取：

https://stitch.withgoogle.com/settings

没有这些 Key 不影响 Skill 使用，只是不能自动出图/自动调用设计工具。

---

## 第三部分：手动实操 — 不用 OpenClaw 也能做

### 开始之前：准备清单

在开始设计之前，确认你手里有这些东西：

### 第一步：竞品视觉分析（10 分钟）

#### 怎么看

打开你 PRD 里列的 2-3 个竞品网站，边看边填这张表：

```
竞品视觉分析表

竞品 A：[URL]
  主色调：[颜色]
  深色/浅色：[哪种]
  Hero 策略：[放了什么——截图？输入框？视频？动画？]
  Section 数量：[几个]
  CTA 文案：[写的什么]
  整体感觉：[便宜/专业/高端/模板感]
  字体：[什么字体，F12 看]

竞品 B：[URL]
  ...

竞品 C：[URL]
  ...
```

#### 怎么用 F12 看竞品字体

1. 打开竞品网站
1. 按 F12 打开开发者工具
1. 点选左上角的"元素选择"按钮（箭头图标）
1. 点击竞品的标题文字
1. 右侧面板里搜 font-family，就能看到字体名称
#### 做差异化决策

填完表之后，做一轮"反向选择"：

### 第二步：填写反 AI 味约束表（5 分钟）

在写 Stitch prompt 之前，先确定你的约束。复制下面这个表，填好：

### 第三步（可选）：用 AI 帮你选字体和配色

如果你不确定选什么字体和配色，把下面的 prompt 发给 ChatGPT 或 Claude：

```
我在做一个 [一句话产品描述] 的网站。

竞品分析：
- 竞品 A 用了 [颜色/字体/风格]
- 竞品 B 用了 [颜色/字体/风格]

我希望的调性是 [从 8 个里选的那个]。
我希望和竞品有明确视觉差异。

请帮我推荐：
1. 配色方案（4 个颜色，给 HEX 色值）：背景色、主色、强调色、文字色
2. 字体搭配（2 个，从 Google Fonts 选）：Display 字体 + Body 字体
3. Hero 区策略：应该放什么（截图/输入框/动画/对比图）
4. 推荐理由（每个选择 1 句话）

要求：
- 不要用 Inter / Roboto / Arial
- 不要用紫蓝渐变
- 和竞品的方案明确不同
```

### 第四步：注册 Google Stitch + 写 Prompt（15 分钟）

#### 注册

1. 打开 [stitch.withgoogle.com](https%3A%2F%2Fstitch.withgoogle.com)
1. Google 账号登录
1. 免费，无使用限制
### 写 Stitch Prompt

这是整个设计环节最核心的技能。 Prompt 写得好，一次就出好设计；写得差，要来回改 5 次。

把下面的模板复制过来，把 [方括号] 里的内容替换成你自己的：

```
Design a [dark/light]-theme landing page for [产品名] — [一句话定位].

Target users: [目标用户，用英文].

Typography: [Display 字体] for headings, [Body 字体] for body text.

Color scheme: [背景色 HEX] background, [主色 HEX] as primary accent, 
[强调色 HEX] for CTAs and highlights, [文字色 HEX] for text.

Page structure (top to bottom):

1. NAVIGATION: Logo left, nav links center, CTA button right.

2. HERO SECTION: [你选的 Hero 策略]. 
   Large headline "[你的标题，直接写定稿文案]". 
   Subheadline "[你的副标题]". 
   A prominent CTA button "[按钮文案]" in [强调色].
   [Hero 区视觉元素描述].

3. [SECTION 名称]: [具体描述，写清楚内容和布局].

4. HOW IT WORKS: [N] steps — "[步骤1]", "[步骤2]", "[步骤3]".

5. FEATURES: [N] feature items in [你选的布局]:
   - [Feature 1 标题]: [一句话描述]
   - [Feature 2 标题]: [一句话描述]
   ...

6. PRICING: [N] cards:
   - [Plan 1] ($[价格]/[周期]): [权益列表]
   - [Plan 2] ($[价格]/[周期]): [权益列表]
   [哪个 Plan] card highlighted.

7. FAQ: [N] expandable questions:
   - "[问题1]"
   - "[问题2]"
   ...

8. FOOTER: Logo, [links], copyright "[你的版权文字]".

Design constraints:
- [你选的调性] aesthetic
- NOT a typical boring SaaS template
- Do NOT use emoji as icons — use Material Icons or SVG only
- Asymmetric layout where appropriate, not everything centered
- Typography should be bold and distinctive
- [从约束表里补充的其他约束]
```

#### Prompt 写作要点

#### 实战示例（getchargen.com）

```
Design a premium dark-theme landing page for CharGen.ai — 
an AI Character Generator that creates character portraits 
+ full character sheets in one click.

Target users: DnD players, anime fans, novel writers, 
game developers.

Typography: Space Grotesk for headings, DM Sans for body text.

Color scheme: Deep black (#08080F) background, 
cyber-teal (#00E5CC) as primary accent, 
amber-gold (#FFBF00) for CTAs and highlights, 
soft white (#E8ECF0) for text.

Page structure (top to bottom):

1. HERO SECTION: Large headline "Generate Characters 
   with AI, Instantly". 
   Subheadline "Portrait + full character sheet in one 
   click — for DnD, anime, fantasy, and more". 
   A prominent glowing CTA input box where users can 
   type a character description, with a "Generate" 
   button in cyber-teal. Show a preview of a beautiful 
   fantasy character card floating beside the input.

2. DEMO SECTION: 3 pre-generated character card examples 
   — a DnD warrior, an anime schoolgirl, a fantasy mage. 
   Each shows portrait + name + brief stats.

3. HOW IT WORKS: 3 steps — "Describe Your Character", 
   "AI Generates Portrait + Sheet", "Export & Use".

4. USE CASES: 4 cards — DnD/TTRPG, Novels & Fiction, 
   Game Development, Anime & OC.

5. FEATURES: 6 items — Image+Text in One, Multiple 
   Templates, Structured Export, DnD Mode, Anime Style, 
   Fast Generation.

6. PRICING: 2 cards — Free ($0, 3/day, SDXL, watermark) 
   and Pro ($9/mo, 200/month, Flux, no watermark, all 
   templates, JSON export). Pro highlighted.

7. FAQ: 6 expandable questions.

8. FOOTER: Logo, Privacy, Terms, copyright.

Design constraints:
- Retro-futurism / cinematic / gaming-tool aesthetic
- NOT a boring SaaS template
- Asymmetric layouts, no three-column symmetry
- Do NOT use emoji as icons
- No purple gradients
```

### 第五步：在 Stitch 里生成 + 出 3 个方向（15 分钟）

#### 生成第一个方向

1. 在 Stitch 首页点 "+ New Project"
1. 给项目起个名（如 "CharGen.ai"）
1. 选 Desktop（先做桌面版）
1. 把你写好的 Prompt 粘贴进对话框
1. 按回车，等 1-2 分钟
#### 生成 3 个方向

在同一个 Stitch 项目里，创建 3 个 screen。每个 screen 用同一个 prompt，但改视觉风格：

#### 怎么选

问自己 3 个问题：

1. 哪个一眼看上去最不像 AI 模板？ — 选它
1. 哪个跟竞品差异最大？ — 加分
1. 哪个的 CTA 按钮最醒目？ — 加分
#### 精修

选定方向后，在对话框里继续修改。常用指令：

```
# 结构调整
"Make the hero section taller"
"Move the pricing section above the FAQ"
"Add more whitespace between sections"

# 配色调整
"Change the CTA button color to amber gold #FFBF00"
"Make the section backgrounds slightly different shades"

# 布局调整
"Make the feature cards use a 2x3 grid instead of 3x2"
"Make the hero asymmetric — headline left, visual right"

# 字体调整
"Use Space Grotesk for all headings"
"Make the headline bigger and bolder"
```

### 第六步：生成移动端（5 分钟）

桌面版定稿后，在 Stitch 里新建一个 screen，选 Mobile，prompt 写：

```
Create a mobile version of the desktop landing page above. 
Same content, same design system, same colors and fonts.
Adapt layout for mobile:
- Single column layout
- Hero headline max 2 lines
- Feature cards stack vertically
- Pricing cards stack vertically
- Navigation becomes hamburger menu
- Touch targets minimum 44px
```

### 第七步：导出 HTML/CSS 代码（2 分钟）

#### 操作

1. 选中你定稿的 screen
1. 点右上角 "Get Code"
1. 你会拿到一份完整的 HTML 文件
#### 代码长什么样

```
<!DOCTYPE html>
<html class="dark" lang="en">
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk..."
        rel="stylesheet"/>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#00E5CC",
            "background": "#08080F",
            ...
          }
        }
      }
    }
  </script>
</head>
<body>
  <!-- 完整的页面 HTML -->
</body>
</html>
```

### 第八步：生成品牌素材（20 分钟）

#### Logo 图标

方法 1：用 AI 生图（简单）

给 ChatGPT 或 Gemini 发：

```
Generate a minimalist logo icon for [产品名].

Requirements:
- Simple geometric mark, NOT text
- Single color: [你的主色 HEX] on transparent/dark background
- Clean enough to recognize at 32px (favicon size)
- Square format (1:1)
- No gradients, no shadows, no 3D effects
- One memorable visual idea only

The product is: [一句话描述]
The brand personality is: [你选的调性]
```

方法 2：用 SVG 手写/AI 辅助（高级，推荐）

给 Claude 发：

```
为 [产品名] 设计一个 SVG 矢量 Logo icon。

要求：
- 输出原始 SVG 代码（不是图片）
- 单色，用 [你的主色 HEX]
- viewBox="0 0 64 64"
- 几何化设计，从圆/方/三角的基形出发
- 必须在 16px 可辨识（细节不能太多）
- 只有一个记忆点
- 和产品概念有关联：[你的产品是做什么的]

同时生成 wordmark SVG：
- 用 [你的 Display 字体] 的路径
- 全小写 / 首字母大写（选一个）
- letter-spacing 微调

最后生成两个组合版本：
- stacked.svg：icon 上 + wordmark 下，居中
- horizontal.svg：icon 左 + wordmark 右，垂直居中
```

#### Favicon

方法 A（最简单，现代浏览器）：直接用 SVG 做 favicon

```
<link rel="icon" type="image/svg+xml" href="/icon.svg">
```

方法 B（兼容性好）：把 SVG/PNG 上传到 [realfavicongenerator.net](https%3A%2F%2Frealfavicongenerator.net%2F)，一键生成全套（favicon.ico + 多尺寸 PNG + apple-touch-icon）。

方法 C（命令行，需要 ImageMagick）：

```
convert icon.svg -resize 16x16 favicon-16.png
convert icon.svg -resize 32x32 favicon-32.png
convert icon.svg -resize 180x180 apple-touch-icon.png
convert icon.svg -resize 512x512 favicon-512.png
convert favicon-16.png favicon-32.png favicon.ico
```

#### OG Image（社交分享预览图）

方法 1：AI 生图

```
Generate a social media preview image (OG image) for [产品名].

Size: 1200x630 pixels (wide format, like a movie poster banner).
Background: [你的背景色 HEX]
Left side: Large bold headline "[你的首页标题]" in white/[文字色]
Right side: [产品截图描述 / 核心视觉元素]
Bottom left: Brand name "[产品名]" in [主色 HEX], small
Overall style: [你的调性], premium, not template-looking
```

方法 2：snapog API（如果有 key）

```
curl -X POST https://api.snapog.dev/v1/generate \
  -H "Authorization: Bearer $SNAPOG_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "product",
    "params": {
      "title": "[你的产品名]",
      "accentColor": "[主色 HEX]"
    },
    "fontFamily": "[你的 Display 字体]"
  }' --output og-image.png
```

方法 3：Canva / Figma 模板

在 Canva 搜 "OG image template"，选一个改文字和颜色。免费。

#### Hero 配图

用 ChatGPT / Midjourney / nano-banana-pro 生成产品主视觉：

```
Generate a hero image for [产品名] landing page.

Style: [你的调性], premium quality
Content: [描述你想在 Hero 区展示什么——产品截图？使用场景？抽象视觉？]
Color palette: [主色] + [背景色] tones
Aspect ratio: 16:9 or custom
No text in the image (text will be added via HTML)
```

### 第九步：替换占位内容（15 分钟）

Stitch 生成的 HTML 里有两类东西需要替换：

#### 替换占位图片

Stitch 用 Google CDN 临时图片（lh3.googleusercontent.com/aida-public/...）。这些图片：

- 看起来还行，但不是你产品的真实图
- 可能过一段时间失效
你要做的：

1. 把 Hero 配图替换到 Hero 区
1. 把 Logo SVG 替换到导航栏
1. 其他占位图先用着，后面逐步替换
#### 核对文案

Stitch 有时会：

- 微调你的措辞（把 "Instantly" 改成 "In Seconds"）
- 给 FAQ 编答案（你要换成自己定稿的）
- 给 Feature 描述润色（检查是否还准确）
搜索替换法：

1. Ctrl+F 搜你的 Headline，看是否完全匹配
1. 逐个 section 过一遍文案
1. 把不对的替换成定稿文案
#### 加上 Meta 标签

在 <head> 里加：

```
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- OG Image -->
<meta property="og:title" content="[你的产品名] — [一句话定位]">
<meta property="og:description" content="[你的副标题]">
<meta property="og:image" content="https://[你的域名]/og-image.png">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[你的产品名] — [一句话定位]">
<meta name="twitter:description" content="[你的副标题]">
<meta name="twitter:image" content="https://[你的域名]/og-image.png">
```

#### 替换链接

Stitch 生成的按钮默认都是 href="#"。替换成真实链接：

- CTA 按钮 → 注册页 / 应用入口
- Privacy → /privacy
- Terms → /terms
- Logo → /
---

### 常见问题

#### Q：我没有设计基础，能跟这个教程做吗？

能。你需要的不是"设计能力"，而是"描述能力"——能说清楚你想要什么。如果你能写 PRD 和文案，你就能写 Stitch prompt。

#### Q：Stitch 收费吗？

免费。Google 账号登录就行。

#### Q：生成的代码能直接部署吗？

能用，但生产环境建议做几个改动：

1. 把 cdn.tailwindcss.com 换成本地 Tailwind 构建（性能更好）
1. 替换所有 Google CDN 临时图片
1. 给按钮加上真实链接
1. 加上统计代码（Google Analytics / Plausible）
1. 加上 Favicon 和 OG 标签
#### Q：Stitch 生成的设计不好看怎么办？

80% 是 prompt 问题。检查：

- 有没有给 HEX 色值？（不给色值 = AI 用默认配色 = AI 味）
- 有没有逐 section 描述？（笼统 prompt = 笼统结果）
- 有没有写"不要什么"？（约束比引导更有效）
- 有没有指定字体？（不指定 = Inter = AI 味）
- 试试加调性词："editorial layout"、"asymmetric"、"cinematic"
#### Q：除了 Stitch 还有什么工具？

#### Q：我的产品不是工具站，也能用这套流程吗？

能。Stitch 支持任何类型：工具站、SaaS、个人作品集、博客、活动页。流程通用，只是 prompt 内容不同。

#### Q：真的需要做 3 个方向吗？

强烈建议。原因：

1. 第一个方向往往不是最好的，但你不知道——因为你没有对比
1. 3 个方向的边际成本很低（改 3 个词重新生成就行）
1. 有对比才能做出好决策
#### Q：Logo 用 AI 生成的会不会有版权问题？

SVG Logo（方法 2）是你自己写的代码，没有版权问题。AI 生图（方法 1）的版权取决于使用的工具和条款：

- ChatGPT/DALL·E：商用可以，版权归你
- Midjourney：付费版商用可以
- 建议用 SVG 方法，既无版权问题，又矢量不失真
---
