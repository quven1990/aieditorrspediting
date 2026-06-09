# SEO / GSC — robots.txt 与 sitemap 排查

## 当前线上状态（已核对）

| URL | 状态 | 说明 |
|-----|------|------|
| `https://aieditorrspediting.xyz/robots.txt` | 200 | 正常，末尾含 `Sitemap: https://aieditorrspediting.xyz/sitemap_index.xml` |
| `https://aieditorrspediting.xyz/sitemap_index.xml` | 200 | 有效 XML，全部可索引 URL |
| `https://aieditorrspediting.xyz/sitemap.xml` | **301** | 旧地址重定向到 `sitemap_index.xml` |
| `https://www.aieditorrspediting.xyz/sitemap_index.xml` | **530** | www 未接入 Pages，不要用 www 资源 |
| `https://aieditorrspediting.xyz/sitemap_index.xml/` | **404** | 不要带尾部斜杠 |

**结论：** robots.txt **没有**禁止 Google 抓取；浏览器能打开 sitemap 但 GSC 显示「无法读取」时，常见原因是 **首次提交时部署失败（错误被缓存）**、**GSC 资源类型不对**、**Cloudflare 拦截 Googlebot**，或 **www 域名 530**。

### GSC 显示「无法读取」但 URL 浏览器能打开

1. 在 GSC → **站点地图** → 删除旧的 `sitemap.xml` 条目（如有）
2. 等 Cloudflare **最新部署成功**（含 `public/sitemap_index.xml`）
3. 重新提交：`sitemap_index.xml`（不要带 `www`，不要尾部 `/`）
4. 用 **网址检查** 测试首页是否「可编入索引」  
5. Cloudflare → **Security** → **Bots**：关闭 Bot Fight Mode，或开启 **Allow verified bots**（允许 Googlebot）  
6. 确认 GSC 资源为 **网址前缀** `https://aieditorrspediting.xyz`（与 sitemap 里域名一致）

---

## robots.txt 里两段内容是什么？

Cloudflare 会在文件**开头**自动插入 **Managed Content**（Content-Signal、部分 AI 爬虫 Disallow），你项目在**末尾**追加：

```
User-Agent: *
Allow: /

Sitemap: https://aieditorrspediting.xyz/sitemap_index.xml
```

Google 仍能读到 `Sitemap` 行。若想去掉 Cloudflare 段：Dashboard → 站点 → **Security** / **Bots** → 关闭 **Managed robots.txt**（名称因账号而异）。

---

## Google Search Console 正确提交方式

1. 资源类型选 **网址前缀**：`https://aieditorrspediting.xyz`（不要 `www`，不要 `http://` 除非单独验证）
2. 站点地图 URL 只填：

   ```
   sitemap_index.xml
   ```

   或完整地址 `https://aieditorrspediting.xyz/sitemap_index.xml`

3. Cloudflare Pages 环境变量（可选但建议）：

   ```
   NEXT_PUBLIC_SITE_URL=https://aieditorrspediting.xyz
   ```

4. 重新部署后再在 GSC 点「测试」/ 重新提交。

---

## www 域名（建议）

在 Cloudflare Pages → **Custom domains**：

- 添加 `www.aieditorrspediting.xyz`
- 开启 **Redirect to apex**（跳转到 `aieditorrspediting.xyz`）

否则 `www` 会一直 530，用 www 验证的 GSC 会失败。

---

## 构建产物

本地 `npm run build` 后检查：

- `out/robots.txt`
- `out/sitemap_index.xml`
- `out/c17fe838b04349c4ac14070d1d38bd10.txt`（IndexNow 验证）

应与线上一致。
