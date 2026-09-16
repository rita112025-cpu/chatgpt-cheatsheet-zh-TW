# chatgpt-cheatsheet-zh-TW | 100個最好用的 ChatGPT 指令大全

![License: MIT](https://img.shields.io/badge/License-MIT-purple)
![Lang: zh-TW](https://img.shields.io/badge/lang-zh--TW-blue)
![Prompts: 100](https://img.shields.io/badge/prompts-100-black)

> 100 個最好用的 ChatGPT 指令，繁中優化、可搜尋、一鍵複製。涵蓋提問技巧、內容創作、職場、學習、程式、行銷、專案管理、個人品牌、生活娛樂、思考模型 10 大場景。

🔗 **線上版：** https://rita112025-cpu.github.io/chatgpt-cheatsheet-zh-TW/

## ✨ 特色
- 10 大分類，100 個開箱即用模板
- 關鍵字搜尋 + 分類篩選 + 展開/收合
- 一鍵複製（支援 Clipboard API + execCommand 備援，失敗會提示）
- Notion-like 極簡設計，支援深色模式
- 手機友善

## 🚀 本地開發

```bash
# 1. 安裝依賴（必須先執行，否則會找不到 vite）
npm install

# 2. 啟動開發伺服器
npm run dev

# 3. 建置
npm run build
npm run preview
```

## 📦 部署到 GitHub Pages

此專案已內建 `.github/workflows/deploy.yml`，採用 GitHub Actions 自動部署。

1. 推送到 GitHub：
```bash
git init
git add .
git commit -m "feat: init 100 prompts"
git branch -M main
git remote add origin https://github.com/rita112025-cpu/chatgpt-cheatsheet-zh-TW.git
git push -u origin main
```

2. 到 GitHub → Settings → Pages → Build and deployment → Source 選擇 **GitHub Actions**

3. 等待 Actions 執行完成，網址即為 `https://rita112025-cpu.github.io/chatgpt-cheatsheet-zh-TW/`

## 📁 結構
```
public/logo.png               # 網站圖示
src/App.tsx                   # 100 指令 + UI + 複製邏輯
.github/workflows/deploy.yml  # GitHub Actions 部署設定
```

## 🔧 已修復問題
- 複製功能：備援失敗時不再誤顯示「已複製」，會顯示「複製失敗，請手動選取」
- 網站圖示：`index.html` 已改為指向存在的 `./logo.png`
- 部署說明：已新增實際存在的 workflow 檔案

MIT License
