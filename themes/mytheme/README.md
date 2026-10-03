# mytheme 自定义指南

> 改完记得看最后一节「改完怎么生效」。

---

## 一、先搞清楚：哪些文件管哪些事

| 我想改的东西 | 改哪个文件 |
| --- | --- |
| 站点标题、作者名、语言 | `E:\myblog\_config.yml` |
| 导航菜单、标语、摘要长度、Read More 文案 | `E:\myblog\_config.mytheme.yml` |
| 首页/归档/按钮上的文案（Read More 内部、Posted on、Tagged…） | `themes\mytheme\languages\en.yml` |
| 页脚版权文字 | `themes\mytheme\layout\_partial\footer.ejs` |
| 背景颜色、背景图 | `themes\mytheme\source\css\_variables.styl` + `_base.styl` |
| 玻璃面板透明度、圆角、模糊度 | `themes\mytheme\source\css\_variables.styl` |
| 文章页正文里的文字 | 对应的 `source\_posts\xxx.md` |

### ⚠️ 配置的优先级（很重要）

```
_config.mytheme.yml        ← 最高，优先改这里
   ↑ 覆盖
themes\mytheme\_config.yml ← 主题默认值，一般不动
```

也就是说：**主题配置只改 `_config.mytheme.yml`**。改了 `themes\mytheme\_config.yml` 以后升级主题会丢。

顺带一提，站点级配置的优先级同理：`_config.yml` > 主题的 `_config.yml`。所以 `title`、`author`、`subtitle` 写在根 `_config.yml` 里就够了，不用管主题里有没有。

---

## 二、改文本

### 1. 导航菜单和标语

打开 `E:\myblog\_config.mytheme.yml`：

```yaml
# 导航菜单：名字在左，链接在右
menu:
  Home: /
  Archives: /archives
  About: /about

# 导航栏右侧那句标语，留空就不显示
slogan: live happily.
```

**想加一个菜单项**，比如「标签」：

```yaml
menu:
  Home: /
  Archives: /archives
  Tags: /tags
  About: /about
```

**想让菜单显示中文**，把 `_config.yml` 里的 `language` 改成 `zh-CN` 即可，
菜单名会自动去 `languages\zh-CN.yml` 取「首页 / 归档 / 标签 / 关于」。

**想用完全自定义的名字**（不走多语言）：

```yaml
menu:
  我的小站: /
  随便看看: /archives
```

取不到翻译时会原样显示你写的名字。

### 2. 站点标题、作者

`E:\myblog\_config.yml` 开头：

```yaml
title: Hitimes's Blog    # 导航栏左上角 + 浏览器标签页
subtitle: 人啊，幸福吧。  # 备用，当前主题用 _config.mytheme.yml 的 slogan
author: Hitimes          # 页脚版权署名
language: en             # en 或 zh-CN
```

### 3. 页面上那些零碎文案

打开 `E:\myblog\themes\mytheme\languages\en.yml`，左边是 key 不要动，改右边的值：

```yaml
home: Home
archives: Archives
prev: Prev                 # 分页「上一页」
next: Next                 # 分页「下一页」
read_more: Read More...    # 这个实际由 _config.mytheme.yml 覆盖，见下
posted_on: Posted on       # 文章页日期前面的字
tagged: Tagged             # 文章页末尾标签前面的字
categorized: Categories    # 分类页标题前面的字
no_posts: No posts yet.    # 没有文章时的提示
```

### 4. 「Read More...」按钮文案

这个**不在语言文件里**，在 `_config.mytheme.yml`：

```yaml
read_more: Read More...    # 改成 阅读全文...，或者 '' 直接隐藏这个按钮
```

### 5. 页脚文字

打开 `E:\myblog\themes\mytheme\layout\_partial\footer.ejs`。

默认显示 `© 2026 Hitimes` 和 `Powered by Hexo · Theme mytheme`。
想改成自己的，比如加个邮箱和备案号，把中间的 `<% ... %>` 那段换成：

```html
<p class="footer-copyright">&copy; <%= year %> Hitimes &middot; 你的邮箱@example.com</p>
<p class="footer-meta">Powered by <a href="https://hexo.io/" target="_blank">Hexo</a> &middot; Theme <strong>mytheme</strong></p>
```

`<%= year %>` 会自动变成当前年份，不用每年手改。

### 6. 文章内容

就是普通的 Markdown，在 `E:\myblog\source\_posts\` 里。

新建文章：

```bash
cd E:\myblog
npx hexo new "文章标题"
```

---

## 三、改背景

背景全部在 **`E:\myblog\themes\mytheme\source\css\_variables.styl`**，打开它：

```stylus
// 页面背景（水感淡蓝）
$c-page-1        = #dceaf8
$c-page-2        = #c6dcf2
$c-page-3        = #eaf4fd
```

这三个是渐变的三个色标。**想更蓝、更深**，就把它们调深：

```stylus
$c-page-1        = #c3dcf5
$c-page-2        = #a8caec
$c-page-3        = #dcecfb
```

**想要偏紫一点**：

```stylus
$c-page-1        = #e0e2f8
$c-page-2        = #c8cdf0
$c-page-3        = #eceefd
```

改颜色不用懂颜色代码，去 <https://www.w3schools.com/colors/colors_picker.asp> 挑一个，复制 `#xxxxxx` 过来就行。

### 想换成一张真的 Vista 水波纹壁纸

1. 找一张图（搜 "Windows Vista wallpaper water"，或你自己有的），重命名成 `bg.jpg`
2. 放到 `E:\myblog\themes\mytheme\source\images\` 目录下
3. 打开 `E:\myblog\themes\mytheme\source\css\_base.styl`，找到 `body` 那一段：

```stylus
body
  margin: 0
  min-height: 100%
  font-family: $font-sans
  font-size: 15px
  line-height: $line-height
  color: $c-text
  background-color: $c-page-2
  background-image:
    radial-gradient(...)     ← 这一段
    radial-gradient(...)
    ...
    linear-gradient(...)
  background-attachment: fixed
```

把 `background-image:` 后面那一整串（4 个 `radial-gradient` + 1 个 `linear-gradient`）
连同缩进全部删掉，换成：

```stylus
  background-image: url('images/bg.jpg')
  background-size: cover
  background-position: center center
  background-repeat: no-repeat
  background-attachment: fixed
```

**注意** `url('images/bg.jpg')` 是相对于 `source\` 目录的，所以写 `images/bg.jpg` 就对，别写成 `source/images/bg.jpg`。

> 图片太花的话，玻璃面板会看不清。可以把面板调更白一点（见下一节）。

### 想让背景图淡一点（叠一层白纱）

在 `_base.styl` 的 `body` 里，`background-image` **前面**只写图片，
把它改成用 `linear-gradient` 叠一层半透明白：

```stylus
  background-image: linear-gradient(rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.55)), url('images/bg.jpg')
```

`0.55` 越大背景越淡，试 `0.3` ~ `0.75`。

---

## 四、调玻璃面板的透明度和圆角

同一个文件 `_variables.styl`：

```stylus
// 玻璃面板
$glass-bg        = rgba(255, 255, 255, 0.66)   ← 面板不透明度，越小越透
$glass-blur      = blur(9px) saturate(150%)    ← 毛玻璃模糊度
$radius          = 6px                          ← 圆角，想要更方改 3px，更圆改 10px
$container-w     = 900px                        ← 内容区宽度
$gap             = 18px                         ← 卡片之间的间距

// 主色
$c-accent        = #3a8fd8     ← 亮蓝：高亮、边框
$c-accent-deep   = #1f6fb2     ← 深蓝：链接文字
```

常用组合：

- **更通透**：`$glass-bg = rgba(255, 255, 255, 0.5)`
- **更实、文字更好读**：`$glass-bg = rgba(255, 255, 255, 0.85)`
- **模糊更强**：`$glass-blur = blur(16px) saturate(160%)`
- **完全方角**：`$radius = 0px`

---

## 五、改完怎么生效

| 改了什么 | 怎么生效 |
| --- | --- |
| `.styl` 样式文件 | 保存后刷新浏览器就行（`hexo server` 会自动重编译） |
| `_config.yml` / `_config.mytheme.yml` | **必须重启** `hexo server`，配置文件只在启动时读一次 |
| `.ejs` 模板 / `languages\*.yml` | 保存后刷新浏览器 |
| 改了却不生效 | 先 `Ctrl+C` 停掉，跑 `npx hexo clean`，再 `npx hexo server` |

本地预览：

```bash
cd E:\myblog
npx hexo server
```

打开 <http://localhost:4000/myblog/>

> 注意地址末尾那个 `/myblog/` 不能省，因为你的博客 `root` 配置是 `/myblog/`（GitHub Pages 项目站的路径）。

---

## 六、出问题了怎么回退

改坏了先别慌，这几个文件是安全的：

- `_config.mytheme.yml` —— 整个删掉也能跑，主题会用 `themes\mytheme\_config.yml` 的默认值
- `languages\en.yml` —— 只影响文案，改错了页面还是能开，只是字不对
- `_base.styl` —— 语法错了会构建失败，报错信息里会带行号，照着改回来

样式文件开头的 `//` 是注释，**改之前可以把原来那行复制一份、前面加 `//` 留着**，方便随时切回来。

实在不行，整个主题重来：删掉 `E:\myblog\themes\mytheme`，告诉我一声，我重新生成一份。
