# Martian

`Martian` 是一个基于 `Martian Mono` / `Martian Grotesk` 视觉语言重建的单页展示网站。

网站包含：
- 首屏加载与分层背景动画
- About / Creator / Demo / Symbols / Variable 等内容分区
- 桌面端与移动端的独立布局与交互
- Lottie、滚动联动、菜单弹层和悬浮元素动画

## 技术栈

- `Vite`
- `TypeScript`
- 原生 DOM / CSS 模块化拆分
- `lenis`
- `lottie-web`

## 本地运行

要求：
- `Node.js 20.19+` 或 `22.12+`

启动：

```bash
cd /Users/lee/martian
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

浏览器访问：

```text
http://127.0.0.1:5173/
```

## 生产构建

```bash
npm run build
```

构建产物输出到：

```text
dist/
```

## 目录结构

```text
src/
  main.ts
  shared/
  sections/
  styles/

assets/
  images/
  icons/
  lottie/
  meta/
```

## 说明

- `src/sections/*` 存放各个页面分区的交互逻辑
- `src/shared/*` 存放共享运行逻辑
- `src/styles/*` 存放拆分后的样式
- `assets/*` 存放网站实际使用的资源文件
