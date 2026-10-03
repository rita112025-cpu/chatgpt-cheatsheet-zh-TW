---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface: 指令大全首頁（src/App.tsx）

Mode: Operate. 上班族／ChatGPT 新手，工作卡關時找模板 → 複製 → 貼到 ChatGPT。手機優先、桌機同等。

Scope: 整頁視覺改版（replacement world）。保留 100 個模板全文、slash 名、10 分類、搜尋、複製與備援、深淺色、SEO、Pages base、上輪手機修正（16px 輸入、44px 觸控、單一 sticky 列）。

Decisions: 不加大型中文 webfont（Noto Sans TC 900 做標題）；既有文案保留，只在控制項用輕度菜單語；本機記住「已點過」（localStorage，可清除）；失敗狀態用同一專色＋清楚文字。

## Direction contract

THESIS: 100 個指令是一張台式單色印刷點菜單——分區、編號、勾格即複製。拒絕業界預設的「圓角卡片網格＋紫色強調＋側欄分類」。

OWN-WORLD: 淡綠道林紙底、單一印刷藍專色（所有線、字、勾格）、鉛筆灰勾記。細格線表格、雙線框分區頭、等寬編號欄、【】印成填空底線框。深色＝反印：深藍紙、淡綠墨。無陰影、無漸層、無圓角卡片。

STORY: 一眼看懂這是「可以點的清單」；掃分區或輸入關鍵字／編號 → 點行看完整模板，【】一目了然要改 → 勾格複製，鉛筆打勾回饋；回來時看得到點過哪幾道。

FIRST VIEWPORT: 上方店招：「100」店章＋標題＋一行說明，右側主題切換。其下 sticky：搜尋框（可輸入編號跳轉）＋分區索引列（編號範圍）。之後即是第一分區表頭與表格行「編號｜品名＋/slash｜勾格」，手機首屏至少見 4 行。桌機菜單分 2–3 欄連續排列。

FORM: 點菜單（自有清單第 7 位，擲骰分派），seed 306c11bd。Signature interaction：點行展開，其餘行退淡；勾格→鉛筆勾記＋列號圈起，兩格切換、不淡入。

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
