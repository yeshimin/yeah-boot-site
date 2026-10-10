# yeah-boot-site

YeahBoot 官方网站源码。技术文档已经拆分到独立仓库：

- `https://github.com/yeshimin/yeah-boot-docs`

## 目录

```text
.
├── index.html              官网首页
├── privacy.html            隐私说明
├── assets/                 官网样式、脚本和图片
├── robots.txt
└── sitemap.xml
```

## 本地预览

项目不需要安装依赖，也不需要构建。首页可直接双击 `index.html` 预览，也可以在项目根目录启动任意静态文件服务器：

```bash
python -m http.server 8000
```

然后访问：

- 官网：`http://localhost:8000/`

## 发布前检查

- 替换官网中的演示地址和仓库地址（如有变化）。
- 替换产品预览图。
- 确认页脚 ICP 与公安备案信息和当前登记信息一致。
- 确认 `sitemap.xml` 中的地址正确。
- 不要将服务器配置、账号、密码、Token 或密钥提交到本仓库。
