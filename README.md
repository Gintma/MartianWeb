# Martian Mono Rebuild

当前项目已经接入 `Vite + TypeScript` 骨架，但页面渲染仍然先兼容现有活动页结构。

## 当前入口

- 页面入口：`index.html`
- 工程入口：`src/main.ts`
- 当前活动样式：`src/styles/shared/*` 与 `src/styles/sections/*`
- 运行时补丁样式：`src/styles/shared/runtime.css`
- 当前活动交互：`src/shared/*` 与 `src/sections/*`

## 目录说明

- `assets/mirrored/`
  - 从原站镜像下来的图片、SVG、Lottie JSON 等静态资源
- `assets/fonts/`
  - 本地字体资源
- `assets/media/`
  - 额外本地图像与装饰资源
- `src/`
  - 新的工程化入口，后续会逐步接管页面
- `rewrite-backup/`
  - 旧的重写备份，不参与当前渲染

## 启动方式

先安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

构建：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

默认访问：

- `http://127.0.0.1:5173/`

## 当前迁移状态

- 现有页面仍然保留原活动页 DOM 结构，先保证视觉和交互不掉
- `index.html` 已经不再直接硬绑旧 CSS/JS，改由 `src/main.ts` 接管入口
- `src/main.ts` 当前负责挂载新拆分后的样式，并顺序加载本地 vendor 依赖
- `Hero` 首屏的 preloader、第一页初始态、首屏滚动联动、噪点层和首屏观察器已经迁到 `src/sections/hero`
- `About` 第二屏卡片视差和 `Creator` 第三屏标题/电池/地球/卡片展开已经迁到 `src/sections/about` 与 `src/sections/creator`
- `Variable_1 / Symbols / Variable_2 / Demo_1 / Demo_2 / Footer` 的滚动、底部文案、text controls、dropdown、Lottie scroll、漂浮、hover 与 footer cards 逻辑已经迁到对应的 `src/sections/*`
- 菜单弹层、burger 开合、popup item hover 已经迁到 `src/shared/menu-popup`
- `vh fix`、selector blocks、scrollTrigger body attributes、`ic-plus` 滚动也已经迁到 `src/shared/*`
- `Lenis` 滚动锁、runtime Lottie 初始化、interactive Lottie、canvas flames 已经迁到 `src/shared/*`
- 旧的 `assets/custom-runtime.js` / `assets/main.js` / `assets/proto-app.js` 已移除，不再参与页面行为
- 样式拆分已经开始，按钮样式迁到 `src/styles/shared/buttons.css`，菜单样式迁到 `src/styles/shared/menu.css`，字体系迁到 `src/styles/shared/typography.css`，shared trigger/state 迁到 `src/styles/shared/triggers.css`，首屏与 preloader 主体迁到 `src/styles/sections/hero.css`，`about` 样式迁到 `src/styles/sections/about.css`，`creator` 样式迁到 `src/styles/sections/creator.css`，`demo_1` 样式迁到 `src/styles/sections/demo1.css`，`variable_1` 样式迁到 `src/styles/sections/variable1.css`，`demo_3` 样式迁到 `src/styles/sections/demo3.css`，`symbols` 样式迁到 `src/styles/sections/symbols.css`，`variable_2` 样式迁到 `src/styles/sections/variable2.css`，`demo_2` 样式迁到 `src/styles/sections/demo2.css`，footer 样式迁到 `src/styles/sections/footer.css`
- 共享基础样式迁到 `src/styles/shared/base.css` 与 `src/styles/shared/chrome.css`
- 运行时补丁样式迁到 `src/styles/shared/runtime.css`
- `assets/style.css` 已收成占位文件，不再参与渲染
- `assets/site-runtime.css` 已收成占位文件，不再参与渲染
- 后续会按 section 逐步拆到 `src/sections/*`
- 第三方库后续会从本地 vendor 文件逐步切到正式依赖管理

## 下一步拆分顺序

1. 清理旧导出遗留命名和无用样式
2. 把本地 vendor 文件逐步替换成正式依赖管理
3. 逐步把现有 DOM 继续组件化
4. 最后清理旧的静态导出组织方式
