# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
一般上班族與 ChatGPT 新手（台灣、繁體中文使用者）。情境：工作卡關時臨時打開，想找一個「直接貼上就能用」的模板，求快，不想學 prompt 技巧。常在手機或辦公電腦上使用。

## Product Purpose
免費、公開的 ChatGPT 繁中指令大全：100 個模板、10 大分類，可搜尋、展開、一鍵複製。成功＝使用者幾秒內找到合用的指令、複製成功、之後還會回來用。不以導流、變現或個人品牌曝光為目標。

## Positioning
繁體中文在地化的現成模板（台灣用語、情境範例），每個模板用【】標出要替換的地方，複製後改幾個字就能貼到 ChatGPT。

## Operating Context
- 使用流程：搜尋或點分類 → 瀏覽卡片 → 展開完整模板 → 一鍵複製 → 到 ChatGPT 貼上並替換【】內容。
- 單頁靜態網站，部署在 GitHub Pages（`/chatgpt-cheatsheet-zh-TW/`），推送 main 由 GitHub Actions 自動部署。

## Capabilities and Constraints
- React 18 + Vite + Tailwind CSS v3，全部內容與 UI 在 `src/App.tsx`。
- 指令資料為靜態陣列：每筆有 slash 指令名（如 `/prompt_expert`）、標題、說明、分類、模板全文。
- 支援淺色／深色模式（跟隨系統，可手動切換）。
- 複製：Clipboard API，失敗時改用 execCommand，再失敗提示手動選取。
- 無後端、無帳號、無追蹤需求。

## Brand Commitments
- 名稱：「100個最好用的 ChatGPT 指令大全」。
- 網站圖示：`public/logo.png`。
- 語言：繁體中文（zh-Hant／zh-TW）。

## Evidence on Hand
- 100 個實際模板內容（`src/App.tsx` 中的 `commandsData`）。
- 沒有使用者見證、使用數據或媒體報導，不可捏造。

## Product Principles
1. 速度優先：從打開到複製成功，步驟越少越好。
2. 對新手友善：不假設使用者懂 prompt 術語；【】要替換的地方一眼看得出來。
3. 內容是主角：模板本身的可讀性勝過裝飾。
4. 免費且不打擾：不放干擾使用的導流、彈窗或登入。

## Accessibility & Inclusion
繁中字體可讀性（行高、字級）、觸控目標足夠大、深淺色模式對比皆需達標；複製結果需有清楚回饋（含失敗狀態）。
