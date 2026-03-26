# Martian Mono Local Clone

入口文件：

- `index.html`

当前活动版本：

- 保留原站导出结构作基线，但活动页已经不再加载 Webflow JS runtime
- `assets/style.css`：当前活动样式文件
- `assets/site-runtime.css`：从页面内联样式抽离出的运行时样式补丁
- `assets/custom-runtime.js`：从页面内联脚本抽离出的业务运行时
- `assets/lottie.min.js`：本地 Lottie 运行时
- `assets/lenis.min.js`：本地 Lenis
- `assets/mirrored/`：从原站镜像下来的 Webflow CDN 资源
- `assets/fonts/`：本地字体文件
- `assets/media/`：额外本地图像和装饰资源

备份文件：

- `rewrite-backup/`：之前的可维护重写稿备份，不参与当前页面渲染

说明：

- 页面渲染已不再依赖 Webflow CDN、Google Fonts、unpkg 或外部脚本资源
- 页面内联业务脚本已抽离到 `assets/custom-runtime.js`
- `s2` 区块的 4 个自动播放 Lottie 已改由本地 runtime 接管
- `s4` 区块的 2 个交互型 Lottie 也已由本地 runtime 接管
- 活动页已经完全不再依赖 Webflow runtime 或 Webflow 导出类名/属性
- 页面里的 `https://...` 现在只剩站外跳转链接和注释中的来源信息

预览：

```bash
cd /Users/lee/tmp
python3 -m http.server 9200
```

然后访问：

- `http://127.0.0.1:9200/`

如果端口被占用，把 `9200` 换成任意空闲端口即可。
