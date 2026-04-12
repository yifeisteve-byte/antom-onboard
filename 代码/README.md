# 商户入网资料填写工具

一个纯前端的网页工具，帮助支付公司的商户客户一次填写、自动生成所有渠道的入网 Excel 表单。

## 运行方式

由于浏览器在 `file://` 协议下禁止 `fetch` 本地文件，必须通过一个简单的 HTTP 服务器打开：

```bash
cd 代码
npx serve .
# 或
python3 -m http.server 8080
```

然后用浏览器打开 `http://localhost:3000`（或对应端口）。

## 部署到公网

目录里全部是静态文件，直接推到任意静态托管平台即可：
- Vercel / Netlify / Cloudflare Pages / GitHub Pages
- 客户通过 URL 访问，所填数据只保存在各自浏览器 localStorage

## 使用流程

1. **选择渠道** — 勾选客户这次需要报备的渠道/模板
2. **填写资料** — 一次填写所有共享字段，浏览器自动保存
3. **生成文档** — 一键生成 zip，内含填好的原格式 Excel 文件

顶部还有"导出 JSON / 导入 JSON"用于跨电脑/跨会话备份。

## 目录结构

```
index.html              入口
css/app.css             样式
js/
  app.js                路由 + UI 渲染
  schema.js             FIELDS 主表 + TEMPLATES 注册表（核心配置）
  filler.js             ExcelJS 加载/写入/打包
  storage.js            存储抽象层
  transforms.js         日期/数字/百分比格式化
templates/              各渠道 xlsx 模板（从"参考材料"复制）
vendor/                 ExcelJS / JSZip / FileSaver
tools/mapper.html       开发工具：定位模板单元格地址
```

## 当前覆盖范围

**Phase 1**（已完成框架 + 3 个模板）：
- 信用卡 Visa / Master (`VM_card.xlsx`)
- 东南亚 2C2P 通用 (`2C2P_APM.xlsx`)
- 台湾 JKOPay (`JKOPay.xlsx`)

**Phase 2/3（待扩展）**：日本 PayPay / payeasy / auPay、韩国 Toss/KCP、澳门 MPAY、印尼 DANA、泰国 TrueMoney 等。扩展方式：
1. 把新模板 xlsx 复制到 `templates/`
2. 打开 `tools/mapper.html`，上传该 xlsx，查看所有字段的单元格地址
3. 在 `js/schema.js` 的 `TEMPLATES` 数组里新增一条记录，填好 `mappings`
4. 如有新字段，顺便在 `FIELDS` 主表里加上

无需改动其他代码。

## 注意

- 模板文件是静态资源，部署到公网后可被任何人下载。若模板本身属于保密材料，请勿公网部署，或改为有授权的后端存储。
- 附件上传（营业执照、截图等）在 MVP 中尚未实现，客户仍需按原流程手动准备。
