# 深圳大学 2026 届毕业寄语静态站

这是一个可直接部署到 GitHub Pages 的纯静态网页，不需要服务器、数据库或构建工具。

## 文件结构

- `index.html`: 首页，包含两封信的入口
- `economics/index.html`: 经济学专业毕业寄语
- `finance-2/index.html`: 金融学 2 班毕业寄语
- `assets/`: 样式、脚本和分享图片

## GitHub Pages 部署

1. 新建一个 GitHub 仓库，例如 `graduation-letters-2026`。
2. 把本文件夹内的所有文件上传到仓库根目录。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`，保存。
6. 等待 GitHub Pages 发布，访问地址通常是：
   `https://你的用户名.github.io/graduation-letters-2026/`

## 更新内容

后续只要修改 HTML/CSS/JS 后重新提交到 GitHub，GitHub Pages 会自动更新。

## 国内访问建议

GitHub Pages 在国内访问速度不完全可控。正式大范围传播前，建议用手机流量、校园网、家庭宽带分别测试。如果访问不稳定，可以保留这套静态文件，迁移到腾讯云 COS、阿里云 OSS 或已备案域名的静态托管服务。
