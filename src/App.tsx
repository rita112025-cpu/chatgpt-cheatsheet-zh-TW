import { useState, useMemo, useEffect } from 'react';

type Command = {
  id: number;
  slash: string;
  title: string;
  desc: string;
  cat: number;
  catName: string;
  template: string;
};

const categories = [
  { id: 1, name: "提問與指令調校", range: "1–10" },
  { id: 2, name: "內容創作與靈感", range: "11–20" },
  { id: 3, name: "職場與商務溝通", range: "21–30" },
  { id: 4, name: "學習與知識吸收", range: "31–40" },
  { id: 5, name: "程式與數據分析", range: "41–50" },
  { id: 6, name: "行銷與商業策略", range: "51–60" },
  { id: 7, name: "專案與日常管理", range: "61–70" },
  { id: 8, name: "個人品牌與自媒體", range: "71–80" },
  { id: 9, name: "生活、娛樂與探索", range: "81–90" },
  { id: 10, name: "思考架構與心智模型", range: "91–100" },
];

const commandsData: Command[] = [
  // 1-10
  { id: 1, slash: "/prompt_expert", title: "優化提示詞指令", desc: "幫你優化提示詞指令", cat: 1, catName: "提問與指令調校", template: `你現在是世界級 Prompt Engineer，請幫我優化以下指令。

原始指令：【貼上你的指令】

請依照這 4 個維度重寫：
1. 目標清晰度 2. 角色設定 3. 限制條件 4. 輸出格式

並給我 3 個優化版本：基礎版、進階版、專家版，並說明每個版本的改進邏輯。` },
  { id: 2, slash: "/act_as", title: "角色扮演專家口吻", desc: "角色扮演專家口吻", cat: 1, catName: "提問與指令調校", template: `請你扮演【資深角色，例如：10年經驗的產品經理 / 諾貝爾經濟學獎得主】，你擁有【具體專業與成就】。

我的情境是：【貼上你的問題或任務】

請用該角色的：
- 專業術語與思維框架
- 決策邏輯與口吻
- 常見的 3 個追問

來回答我，並在最後給我一個該角色會用的檢查清單。` },
  { id: 3, slash: "/cot_reasoning", title: "一步步思考邏輯推演", desc: "一步步思考邏輯推演", cat: 1, catName: "提問與指令調校", template: `請使用 Chain of Thought 逐步思考來解決以下問題，請不要直接給答案。

問題：【貼上問題】

請按此格式：
1. 拆解問題的核心要素
2. 列出已知與未知
3. 每一步的推理與依據
4. 可能的陷阱與反例
5. 最終結論與信心指數（0-100%）
6. 如果要驗證，你會怎麼做？` },
  { id: 4, slash: "/feynman_tech", title: "費曼學習法白話解釋", desc: "費曼學習法白話解釋", cat: 1, catName: "提問與指令調校", template: `請用費曼學習法，幫我把這個概念解釋到連國小生都聽得懂。

概念：【貼上艱深概念】

請輸出：
1. 一句話白話版定義
2. 生活化比喻（至少 2 個）
3. 為什麼它重要？用 3 個日常例子
4. 常見誤解是什麼？
5. 給我一個 5 歲小孩也能懂的故事版

語氣要像朋友聊天，禁止專業術語堆砌。` },
  { id: 5, slash: "/few_shot", title: "給範例讓生成更精準", desc: "給範例讓生成更精準", cat: 1, catName: "提問與指令調校", template: `我要用 Few-Shot 方式讓你更精準生成。

任務：【例如：寫 Threads 文案】

範例 1：
輸入：【貼上】
輸出：【貼上你喜歡的風格】

範例 2：
輸入：【貼上】
輸出：【貼上你喜歡的風格】

範例 3：
輸入：【貼上】
輸出：【貼上你喜歡的風格】

現在請依照以上範例的語氣、結構、長度，幫我生成：
【貼上新主題】，給我 3 個版本。` },
  { id: 6, slash: "/tone_adjust", title: "調整語氣與文章風格", desc: "調整語氣與文章風格", cat: 1, catName: "提問與指令調校", template: `請幫我調整以下文字的語氣與風格。

原文：【貼上原文】

目標語氣：【例如：專業但不嚴肅 / 像蔡康永一樣溫暖犀利 / 17歲高中生在限動抱怨的口吻】
目標對象：【例如：給老闆看 / 給 Z 世代看】
限制：【例如：300字內、不要用驚嘆號、要有幽默感】

請給我 3 個版本，並標示每個版本適合的場景。` },
  { id: 7, slash: "/lang_translate", title: "高情境自然多國翻譯", desc: "高情境自然多國翻譯", cat: 1, catName: "提問與指令調校", template: `你現在是母語級翻譯官，請幫我翻譯。

原文：【貼上】
原文語氣：【例如：正式商務 / 朋友閒聊】
目標語言：【例如：英文 / 日文 / 韓文】
使用情境：【例如：要寫給美國客戶的信，不能太直譯 / 要放在日本官網的品牌文案】

請提供：
1. 直譯版（保留原意）
2. 在地化自然版（母語人士會這樣說）
3. 3 個文化差異提醒（什麼詞不能這樣翻）` },
  { id: 8, slash: "/fact_check", title: "檢查文章邏輯與錯假", desc: "檢查文章邏輯與錯假", cat: 1, catName: "提問與指令調校", template: `請擔任事實查核與邏輯審查官，幫我審核以下內容。

內容：【貼上文章或論點】

請輸出表格：
| 段落 | 主張 | 邏輯問題 | 事實查核 | 建議修正 |

最後給我：
- 整體可信度評分（0-100）
- 3 個最需要補強的證據
- 重寫後的可信版本（200字內）` },
  { id: 9, slash: "/summary_limit", title: "指定字數精準總結", desc: "指定字數精準總結", cat: 1, catName: "提問與指令調校", template: `請幫我把以下內容，總結成【請填：50字 / 100字 / 300字】的版本。

原文：【貼上長文】

要求：
1. 必須在指定字數正負 10% 內
2. 保留 3 個最關鍵數據/觀點
3. 用條列式，每點不超過 15 字
4. 最後加一句「一句話帶走」

請給我 2 種版本：給高層看的極簡版 + 給團隊看的脈絡版。` },
  { id: 10, slash: "/format_json", title: "指定格式與表格輸出", desc: "指定格式與表格輸出", cat: 1, catName: "提問與指令調校", template: `請將以下資料，轉成我指定的格式。

原始資料：【貼上】
目標格式：【例如：JSON / Markdown 表格 / CSV / Notion Database 格式】

欄位要求：【例如：需要 name, price, pain_point, solution 4 個欄位】
範例格式：
\`\`\`json
{
  "name": "",
  "price": 0
}
\`\`\`

請確保格式可直接貼上使用，不要有多餘解釋。` },

  // 11-20
  { id: 11, slash: "/article_outline", title: "一秒生深度文章大綱", desc: "一秒生深度文章大綱", cat: 2, catName: "內容創作與靈感", template: `我要寫一篇深度文章，請幫我生大綱。

主題：【貼上主題，例如：為什麼 ChatGPT 指令比你想的重要】
目標讀者：【例如：想提升效率的上班族】
目標長度：【例如：2000字】
核心觀點：【你想傳達的 1 句話】

請給我：
1. 5 個吸睛標題選項
2. 包含 Hook、痛點、架構、案例、反直覺觀點、行動呼籲的完整大綱
3. 每段預計字數與寫作重點
4. 3 個可以引用的數據或研究方向` },
  { id: 12, slash: "/copywriter", title: "高爆發社群爆款文案", desc: "高爆發社群爆款文案", cat: 2, catName: "內容創作與靈感", template: `你現在是寫出過百萬按讚文案的社群操盤手。

產品/主題：【貼上】
目標平台：【FB / IG / Threads / LinkedIn】
目標：【例如：要導流、要留言、要轉發】
受眾痛點：【例如：覺得 AI 很難】

請用 AIDA + PAS 架構，給我 3 篇爆款文案：
- 開頭 3 秒鉤子
- 中間故事或痛點共鳴
- 結尾強力 CTA

每篇不超過 150 字，語氣像真人，不要像 AI。` },
  { id: 13, slash: "/brainstorm", title: "10個創新點子發想", desc: "10個創新點子發想", cat: 2, catName: "內容創作與靈感", template: `請幫我腦力激盪 10 個創新點子。

主題：【例如：如何讓線上課程完課率提升】
限制：【例如：預算 0 元、團隊只有 2 人、不能用折扣】
目標：【例如：讓學員主動分享】

請用表格：
| 點子 | 靈感來源 | 為什麼有效 | 執行難度 (1-5) | 爆發潛力 (1-5) |

最後幫我選出 Top 3 最值得先做的。` },
  { id: 14, slash: "/story_telling", title: "高共鳴故事敘事架構", desc: "高共鳴故事敘事架構", cat: 2, catName: "內容創作與靈感", template: `請用故事行銷幫我包裝這個經歷。

原始素材：【貼上你的故事或產品歷程】

請用「英雄旅程」架構重寫：
1. 平凡世界（原本怎樣）
2. 召喚與拒絕（遇到什麼衝擊）
3. 導師與試煉（如何轉變）
4. 獲得寶藏（學到什麼）
5. 回歸與贈禮（讀者能帶走什麼）

語氣要真誠、有細節、有對話感，最後加一句金句。` },
  { id: 15, slash: "/podcast_script", title: "雙人對談訪談逐字稿", desc: "雙人對談訪談逐字稿", cat: 2, catName: "內容創作與靈感", template: `請幫我寫一集 Podcast 雙人對談逐字稿。

主題：【貼上】
來賓：【例如：連續創業者】
主持人風格：【例如：像吳淡如溫暖提問】
長度：【例如：30分鐘，約 4500 字】
目標聽眾：【例如：想離職創業的上班族】

請輸出：
- 開場 1 分鐘 Hook
- 5 個段落，每段有主持人提問 + 來賓故事 + 金句
- 中間穿插 2 個笑點或反差
- 結尾 3 個 Takeaway + CTA

請標註語氣 [笑] [停頓] [強調]` },
  { id: 16, slash: "/poetry_prose", title: "修飾文字增添文學感", desc: "修飾文字增添文學感", cat: 2, catName: "內容創作與靈感", template: `請幫我把這段文字，修飾得更有文學感，但不要矯情。

原文：【貼上】

風格參考：【例如：像張西 / 像村上春樹 / 像李白但現代版】
保留意思，但加入：
- 1 個隱喻
- 1 個五感描寫
- 節奏感

給我 3 個版本：極簡詩意版 / 溫柔敘事版 / 電影感版` },
  { id: 17, slash: "/title_generator", title: "生成10個吸睛標題", desc: "生成10個吸睛標題", cat: 2, catName: "內容創作與靈感", template: `請幫我生成 10 個吸睛標題。

主題：【貼上文章主題或產品】
平台：【例如：Threads / YouTube / 電子報主旨】
目標：【例如：提升點擊率、讓人想轉發】

請用這 10 種公式各給 1 個：
1. 數字型 2. 痛點反轉型 3. 好奇缺口型 4. 反直覺型 5. 對比型
6. 故事型 7. 權威背書型 8. 時效型 9. 提問型 10. 利益承諾型

並標註每個標題的預估點擊力 1-10 分。` },
  { id: 18, slash: "/clickbait_check", title: "檢查標題點擊力道", desc: "檢查標題點擊力道", cat: 2, catName: "內容創作與靈感", template: `請擔任標題優化師，幫我檢查這些標題的點擊力道。

標題清單：
1. 【貼上】
2. 【貼上】
3. 【貼上】

請用表格分析：
| 標題 | 好奇缺口 | 利益點 | 情緒強度 | 過度標題黨風險 | 建議優化版 |

最後選出 1 個最強標題，並說明為什麼它會爆。` },
  { id: 19, slash: "/content_repurpose", title: "長文轉多平台短影音", desc: "長文轉多平台短影音", cat: 2, catName: "內容創作與靈感", template: `請把這篇長文，拆解成多平台內容包。

長文：【貼上】

請幫我產出：
1. Threads：3 則 280 字內的連續貼文，有鉤子
2. IG Reels 腳本：15 秒 + 30 秒 + 60 秒版本，含畫面指示
3. YouTube Shorts：標題 + 3 秒鉤子 + 字幕文案
4. 電子報段落：300 字精華
5. 5 個金句圖文案

全部要保留原文核心觀點，但語氣要符合各平台。` },
  { id: 20, slash: "/content_calendar", title: "排定整月社群內容月曆", desc: "排定整月社群內容月曆", cat: 2, catName: "內容創作與靈感", template: `請幫我排定整月的社群內容月曆。

主題：【例如：個人品牌講 AI 應用】
平台：【例如：Threads + IG】
發文頻率：【例如：一週 4 篇】
目標：【例如：漲粉 + 導流到課程】
本月重點：【例如：要推 100 個指令大全】

請給我表格：
| 日期 | 平台 | 主題 | 鉤子句 | CTA | 內容支柱 |

支柱要包含：教育、故事、觀點、互動、轉化，平均分配。` },

  // 21-30
  { id: 21, slash: "/business_email", title: "專業商務信件代寫", desc: "專業商務信件代寫", cat: 3, catName: "職場與商務溝通", template: `請幫我寫一封專業的商務信件。

情境：【例如：要跟客戶追蹤報價】
對象：【例如：美國客戶 John，合作 2 年】
我的立場：【例如：想推進但不想太逼】
關鍵資訊：【貼上數據、時程、附件說明】

請輸出：
1. 主旨 3 選 1（開信率高）
2. 信件本文（300 字內，結構：感謝 + 脈絡 + 請求 + 下一步）
3. 語氣：專業、有溫度、不卑不亢
4. 避免的地雷提醒` },
  { id: 22, slash: "/soft_refuse", title: "高EQ禮貌拒絕要求", desc: "高EQ禮貌拒絕要求", cat: 3, catName: "職場與商務溝通", template: `請幫我高 EQ 拒絕這個要求，不要得罪人。

對方要求：【貼上】
我的真實原因：【例如：沒預算 / 沒時間 / 不符合方向】
關係：【例如：重要客戶 / 同事 / 朋友】
我想維持的形象：【例如：專業但溫暖】

請給我 3 個版本：
1. 溫柔堅定版（適合長期合作）
2. 幽默化解版（適合朋友）
3. 正式官方版（適合公開回覆）

每個版本都要包含：肯定對方 + 拒絕理由 + 替代方案` },
  { id: 23, slash: "/meeting_recap", title: "逐字稿轉會議紀錄", desc: "逐字稿轉會議紀錄", cat: 3, catName: "職場與商務溝通", template: `請把這份逐字稿，轉成專業會議紀錄。

逐字稿：【貼上】

請輸出：
## 會議資訊
時間 / 與會者 / 目標

## 核心決議（3-5 點）
## 待辦事項（負責人 + 截止日 + 優先級）
## 爭議未決事項
## 下次會議議程

語氣要精煉，刪除贅字，重點用粗體。` },
  { id: 24, slash: "/exec_summary", title: "給老闆看的極簡摘要", desc: "給老闆看的極簡摘要", cat: 3, catName: "職場與商務溝通", template: `請把這份資料，濃縮成給老闆看的極簡摘要，老闆只有 30 秒。

原始資料：【貼上長文 / 報告 / 數據】

請用這個架構：
**一句話結論：**
**3 個關鍵數據：**
**風險 / 機會：**
**需要老闆決策什麼：**
**建議下一步：**

總字數不超過 150 字，用老闆的語言（營收、成本、風險）。` },
  { id: 25, slash: "/report_writer", title: "撰寫完整商業分析報告", desc: "撰寫完整商業分析報告", cat: 3, catName: "職場與商務溝通", template: `請幫我撰寫商業分析報告。

主題：【例如：Q3 轉換率下降原因分析】
數據：【貼上數據或現象】
目標讀者：【例如：給行銷長】
我已有的假設：【貼上】

請依照以下結構：
1. 執行摘要
2. 問題定義與背景
3. 數據洞察（附表格）
4. 根本原因（用 5 Whys）
5. 解決方案（短期/中期/長期）
6. 風險與備案
7. 建議與資源需求` },
  { id: 26, slash: "/sop_maker", title: "工作流程寫成SOP", desc: "工作流程寫成SOP", cat: 3, catName: "職場與商務溝通", template: `請把這個工作流程，寫成標準 SOP。

任務：【例如：新同事 onboarding 發文流程】
目前做法（口述版）：【貼上你現在怎麼做的】

請輸出：
1. 目標與範圍
2. 角色與職責
3. 步驟清單（每步含：輸入 / 動作 / 輸出 / 檢查點 / 耗時）
4. 常用模板/連結
5. 常見錯誤與排除
6. 版本紀錄

格式用 Markdown 表格 + Checklist，新人照著做就不會錯。` },
  { id: 27, slash: "/raise_negotiate", title: "談判加薪話術準備", desc: "談判加薪話術準備", cat: 3, catName: "職場與商務溝通", template: `請幫我準備加薪 / 升遷談判的話術。

背景：【年資 / 職位 / 貢獻數據 / 市場薪資】
目標：【例如：加薪 15%】
主管風格：【例如：數據導向 / 重視忠誠度】

請給我：
1. 開場白（30秒內建立價值）
2. 3 個貢獻的 STAR 案例（情境-任務-行動-結果，含數據）
3. 市場薪資對標話術
4. 主管可能拒絕的 3 個理由 + 我的回應
5. 結尾收斂語（不情緒勒索但堅定）

語氣要自信、感恩、專業。` },
  { id: 28, slash: "/conflict_solve", title: "化解跨部門溝通摩擦", desc: "化解跨部門溝通摩擦", cat: 3, catName: "職場與商務溝通", template: `請幫我化解這個跨部門衝突。

衝突情境：【貼上發生什麼事】
對方立場：【例如：工程說時程太趕】
我的立場：【例如：行銷需要準時上線】
共同目標：【例如：產品成功】

請提供：
1. 對方的 3 個合理顧慮（先同理）
2. 非暴力溝通句型重寫我的需求
3. 3 個雙贏方案
4. 一封緩和氣氛的 Slack / Email 範本
5. 未來預防機制` },
  { id: 29, slash: "/speech_draft", title: "撰寫高感染力演講稿", desc: "撰寫高感染力演講稿", cat: 3, catName: "職場與商務溝通", template: `請幫我寫一篇高感染力的演講稿。

場合：【例如：公司尾牙 / 產品發表會 / 離職感言】
聽眾：【例如：100 位同事，平均 30 歲】
時長：【例如：5 分鐘】
核心訊息：【一句話，例如：失敗是最好的履歷】
你想讓人記住的 1 個故事：【貼上】

架構：強力開場（提問或金句）→ 3 個故事/轉折 → 1 個反直覺觀點 → 行動呼籲
語氣要像 TED，真誠，有停頓感。` },
  { id: 30, slash: "/cover_letter", title: "量身打造求職自薦信", desc: "量身打造求職自薦信", cat: 3, catName: "職場與商務溝通", template: `請幫我寫一封量身打造的求職自薦信。

職缺 JD：【貼上】
我的履歷亮點：【貼上 3 個最相關成就，含數據】
公司：【例如：新創 / 外商，重視什麼】
我想突出的特質：【例如：跨領域、快速學習】

請輸出：
1. 主旨
2. 300-400 字自薦信，結構：為什麼是你公司 + 為什麼是我 + 我能帶來什麼 + 行動呼籲
3. 3 個客製化亮點對應 JD 關鍵字
4. 避免的陳腔濫調

語氣：自信不自大，具體有數據。` },

  // 31-40
  { id: 31, slash: "/book_digest", title: "名著觀點精華濃縮", desc: "名著觀點精華濃縮", cat: 4, catName: "學習與知識吸收", template: `請幫我濃縮這本書的精華。

書名：【貼上，例如：《快思慢想》】
我已讀章節或筆記：【貼上，如果沒讀就寫「幫我總結整本」】
我想應用的場景：【例如：決策、寫作、投資】

請輸出：
1. 一句話總結這本書
2. 3 個最顛覆的觀點（每個含原文例子）
3. 作者的核心模型圖（用文字描述）
4. 我可以馬上用的 3 個行動
5. 延伸閱讀 2 本

300 字內講完，像朋友轉述。` },
  { id: 32, slash: "/concept_explain", title: "白話解釋艱深理論", desc: "白話解釋艱深理論", cat: 4, catName: "學習與知識吸收", template: `請用白話文解釋這個艱深理論。

理論：【例如：賽局理論中的納許均衡】
我的背景：【例如：完全不懂數學的行銷人】
我想用在哪：【例如：跟同事解釋為什麼要合作】

請給我：
1. 10 歲小孩版（用糖果或遊戲比喻）
2. 高中生版（加入一點邏輯）
3. 專家版（精準定義 + 公式）
4. 一張心智圖文字版
5. 3 個常見誤用` },
  { id: 33, slash: "/study_plan", title: "設計30天學習地圖", desc: "設計30天學習地圖", cat: 4, catName: "學習與知識吸收", template: `請幫我設計 30 天學習地圖。

目標：【例如：30 天學會用 Python 做數據分析】
起點：【例如：完全新手，只會 Excel】
每天可投入：【例如：1 小時】
學習風格：【例如：喜歡做中學，不喜歡看理論】

請輸出表格：
| 天數 | 主題 | 15分鐘理論 | 45分鐘實作 | 成果 | 檢核點 |

加上每週 1 個小專案，最後有期末成果發表。` },
  { id: 34, slash: "/language_tutor", title: "對話式外語家教訓練", desc: "對話式外語家教訓練", cat: 4, catName: "學習與知識吸收", template: `你現在是我的 1 對 1 外語家教，風格像朋友，很會鼓勵人。

目標語言：【例如：英文 / 日文】
我的程度：【例如：TOEIC 600，想練口說】
主題：【例如：今天想練面試】
請全程用目標語言，遇到我卡住時，用中文提示。

流程：
1. 先問我 1 個暖身問題
2. 進行 5 輪對話，每輪糾正我的 1 個錯誤
3. 教我 3 個母語人士常用的口頭禪
4. 最後給我今日表現回饋 + 明日作業` },
  { id: 35, slash: "/quiz_generator", title: "根據文本生成測試題", desc: "根據文本生成測試題", cat: 4, catName: "學習與知識吸收", template: `請根據以下文本，生成測試題。

文本：【貼上課文 / 文章 / 筆記】
題型：【例如：5 題選擇 + 3 題簡答 + 1 題申論】
難度：【例如：高中段考難度】
目的：【例如：確認我真的讀懂，不是死背】

請輸出：
1. 題目
2. 答案
3. 解析（為什麼其他選項錯）
4. 出題背後考察的觀念

最後給我一個總分評量表。` },
  { id: 36, slash: "/paper_reading", title: "學術論文核心結論拆解", desc: "學術論文核心結論拆解", cat: 4, catName: "學習與知識吸收", template: `請幫我拆解這篇學術論文。

論文標題 / 摘要 / 連結：【貼上】
我的目的：【例如：想引用在報告裡，但看不懂】

請用白話輸出：
1. 研究問題是什麼？（一句話）
2. 研究方法（用流程圖文字版）
3. 3 個核心發現（含數據）
4. 研究限制
5. 我可以怎麼引用 / 應用
6. 如果要反駁它，可以從哪切入？

不要用學術八股。` },
  { id: 37, slash: "/analogy_maker", title: "用生活比喻理解新知", desc: "用生活比喻理解新知", cat: 4, catName: "學習與知識吸收", template: `請用生活化比喻，幫我理解這個新知識。

新知識：【例如：什麼是區塊鏈】
我的熟悉領域：【例如：我懂煮飯、追劇、養貓】

請給我 3 個比喻：
- 用【煮飯】比喻
- 用【談戀愛】比喻
- 用【打手遊】比喻

每個比喻包含：對應關係 + 為什麼貼切 + 哪裡不貼切（避免誤解）` },
  { id: 38, slash: "/mindmap_code", title: "生成心智圖語法結構", desc: "生成心智圖語法結構", cat: 4, catName: "學習與知識吸收", template: `請把這個主題，轉成心智圖語法。

主題 / 筆記：【貼上】
目標工具：【Markmap / XMind / Mermaid mindmap】

請直接輸出可貼上的語法，例如：
\`\`\`markdown
# 中心主題
## 分支 1
- 細節
## 分支 2
\`\`\`

要求：層次不超過 4 層，關鍵字化，不要長句。` },
  { id: 39, slash: "/debate_partner", title: "正反方辯論思考模擬", desc: "正反方辯論思考模擬", cat: 4, catName: "學習與知識吸收", template: `請擔任我的辯論夥伴，幫我做正反方思考模擬。

議題：【例如：公司該不該全面遠距工作】
我的立場：【例如：我支持遠距】

請進行：
回合 1：你先扮演反方，用最強的 3 個論點攻擊我
回合 2：我回應後（你可以先模擬我的回應），你再扮演正方幫我補強
回合 3：擔任裁判，評分誰的邏輯強，並給出綜合最佳解

語氣要犀利但尊重。` },
  { id: 40, slash: "/memory_palace", title: "製作記憶宮殿聯想記憶", desc: "製作記憶宮殿聯想記憶", cat: 4, catName: "學習與知識吸收", template: `請幫我用記憶宮殿法，記住這些內容。

要記的內容：【例如：10 個英文單字 / 演講稿重點 / 歷史年代】

1. 【貼上清單】

請幫我：
1. 設定一個我熟悉的場景（例如：我家）
2. 把每個要記的東西，變成荒謬、有畫面、有情緒的物件，放在場景路徑上
3. 編成一個故事
4. 給我 3 個回憶提取的鉤子` },

  // 41-50
  { id: 41, slash: "/code_explain", title: "逐行解釋程式碼邏輯", desc: "逐行解釋程式碼邏輯", cat: 5, catName: "程式與數據分析", template: `請逐行解釋這段程式碼，像教新手一樣。

程式碼：
\`\`\`
【貼上程式碼】
\`\`\`

我的程度：【例如：剛學 Python 一個月】
請輸出：
1. 整體在做什麼（一句話）
2. 逐行解釋（每行做什麼 + 為什麼這樣寫）
3. 流程圖文字版
4. 如果輸入是【舉例】，會發生什麼？
5. 3 個常見坑與優化建議` },
  { id: 42, slash: "/bug_finder", title: "除錯並提供修正方案", desc: "除錯並提供修正方案", cat: 5, catName: "程式與數據分析", template: `請幫我除錯。

程式碼：
\`\`\`
【貼上】
\`\`\`

錯誤訊息：【貼上】
預期行為：【例如：應該要回傳陣列】
實際行為：【例如：回傳 undefined】

請給我：
1. Bug 根本原因（Root Cause）
2. 修正後的程式碼（可直接貼上跑）
3. 為什麼這樣修
4. 3 個測試案例（包含邊界）
5. 以後如何避免同類 Bug` },
  { id: 43, slash: "/code_refactor", title: "優化代碼性能與結構", desc: "優化代碼性能與結構", cat: 5, catName: "程式與數據分析", template: `請幫我重構這段程式碼，變得更乾淨、更快、更好維護。

程式碼：
\`\`\`
【貼上】
\`\`\`

目標：【例如：提升可讀性 / 降低時間複雜度 / 更好測試】
限制：【例如：不能改外部 API / 必須相容舊資料】

請輸出：
1. Code Smell 分析
2. 重構後程式碼（附註解）
3. 效能對比（Big O）
4. 重構前後的差異表
5. 建議的單元測試` },
  { id: 44, slash: "/sql_query", title: "自然語言轉SQL語法", desc: "自然語言轉SQL語法", cat: 5, catName: "程式與數據分析", template: `請把自然語言轉成 SQL。

資料表結構：【貼上 CREATE TABLE 或欄位說明】
需求：【例如：找出過去 30 天，每個用戶的平均訂單金額，排除退款】

請輸出：
1. SQL 查詢（MySQL / PostgreSQL 選一個，註明）
2. 逐句解釋
3. 效能優化建議（索引）
4. 3 個常見變形（例如：改成 7 天、改成 Top 10）
5. 假資料測試` },
  { id: 45, slash: "/excel_formula", title: "自動寫出萬能Excel函式", desc: "自動寫出萬能Excel函式", cat: 5, catName: "程式與數據分析", template: `請幫我寫 Excel / Google Sheets 公式。

資料長這樣：【描述欄位，例如：A 欄是日期、B 欄是金額】
目標：【例如：算出每個月不重複客戶的總消費】
我會的函式：【例如：只會 SUM 和 VLOOKUP】

請給我：
1. 可直接貼上的公式
2. 白話解釋每段在做什麼
3. 如果要用 LET / LAMBDA 更優雅的版本
4. 常見錯誤排除` },
  { id: 46, slash: "/api_docs", title: "自動生成API文件", desc: "自動生成API文件", cat: 5, catName: "程式與數據分析", template: `請幫我生成 API 文件。

程式碼 / 路由：【貼上後端程式碼】
目標格式：【OpenAPI 3.0 / Markdown / Postman】

請輸出：
- Endpoint、Method、Auth
- Request Params / Body 範例
- Response 範例（含成功與錯誤）
- 錯誤碼對照表
- cURL 範例

用專業文件語氣，可直接給前端。` },
  { id: 47, slash: "/python_script", title: "自動化爬蟲與處理腳本", desc: "自動化爬蟲與處理腳本", cat: 5, catName: "程式與數據分析", template: `請幫我寫一個 Python 自動化腳本。

任務：【例如：爬取某網站標題與價格，存成 CSV】
網站 / 資料：【貼上網址或資料範例】
限制：【例如：要遵守 robots.txt、要有延遲】

請給我：
1. 完整可執行的 Python 腳本（含 import）
2. 每段註解
3. 如何處理反爬與異常
4. 如何排程每日執行

使用 requests + BeautifulSoup / Playwright 擇一。` },
  { id: 48, slash: "/data_analyze", title: "數據分析與洞察解讀", desc: "數據分析與洞察解讀", cat: 5, catName: "程式與數據分析", template: `請幫我分析這份數據，並給出商業洞察。

數據：【貼上 CSV 或表格或描述】
背景：【例如：這是電商過去 3 個月轉換率】
我的假設：【例如：我覺得是價格太高】

請輸出：
1. 數據清理建議
2. 3 個關鍵發現（附數據）
3. 視覺化建議（用什麼圖）
4. 根本原因推測
5. 下一步行動建議（按影響力排序）` },
  { id: 49, slash: "/regex_gen", title: "正則表達式自動生成", desc: "正則表達式自動生成", cat: 5, catName: "程式與數據分析", template: `請幫我寫正則表達式。

需求：【例如：匹配台灣手機 09xx-xxx-xxx，允許有空白或 dash】
要匹配的範例：【貼上應該匹配的字串】
不該匹配的範例：【貼上不該匹配的字串】

請給我：
1. Regex（相容 JavaScript / Python）
2. 白話解釋每個符號
3. 在 regex101 上的測試連結描述
4. 常見變形版` },
  { id: 50, slash: "/tech_stack", title: "推薦技術選型與架構", desc: "推薦技術選型與架構", cat: 5, catName: "程式與數據分析", template: `請幫我做技術選型與架構建議。

專案：【例如：要做一個 10 萬人的即時聊天 App】
團隊：【例如：3 個前端、1 個後端新手】
預算與時程：【例如：3 個月上線，預算有限】
關鍵需求：【例如：要即時、低延遲、可擴展】

請輸出：
1. 推薦技術棧（前端/後端/資料庫/部署）+ 理由
2. 架構圖文字版
3. 不推薦什麼 + 為什麼
4. MVP 與二期規劃
5. 風險與學習成本` },

  // 51-60
  { id: 51, slash: "/persona_builder", title: "建立精準目標受眾人物誌", desc: "建立精準目標受眾人物誌", cat: 6, catName: "行銷與商業策略", template: `請幫我建立目標受眾 Persona。

產品：【貼上產品描述】
目前客戶：【貼上你觀察到的特徵】
目標：【例如：想更精準投廣告】

請生成 3 個 Persona，包含：
- 姓名、年齡、職業、收入、生活型態
- 痛點、渴望、抗拒點
- 一天日常
- 會在哪裡獲取資訊
- 一句會讓他掏錢的文案
- 不該對他說什麼` },
  { id: 52, slash: "/swot_matrix", title: "SWOT與TOWS分析矩陣", desc: "SWOT與TOWS分析矩陣", cat: 6, catName: "行銷與商業策略", template: `請幫我做 SWOT 與 TOWS 分析。

主題：【例如：我的個人品牌 / 我的產品】
背景：【貼上現況、資源、競品】

請輸出：
1. SWOT 四象限（各 3-5 點，要具體）
2. TOWS 矩陣：SO / WO / ST / WT 策略各 2 個
3. 最關鍵的 1 個槓桿點
4. 未來 90 天行動建議` },
  { id: 53, slash: "/competitor_check", title: "競品優劣勢對比分析", desc: "競品優劣勢對比分析", cat: 6, catName: "行銷與商業策略", template: `請幫我做競品分析。

我的產品：【貼上定位與價格】
競品：【貼上 2-3 個競品名稱與特色】
面向：【產品、價格、通路、行銷、品牌】

請用表格：
| 維度 | 我們 | 競品 A | 競品 B | 差距 | 機會 |

最後給我 3 個差異化定位建議，要能一句話說清。` },
  { id: 54, slash: "/seo_keywords", title: "SEO關鍵字清單規劃", desc: "SEO關鍵字清單規劃", cat: 6, catName: "行銷與商業策略", template: `請幫我規劃 SEO 關鍵字清單。

主題：【例如：ChatGPT 指令大全】
目標：【例如：想排名在「ChatGPT 指令」第一頁】
受眾搜尋意圖：【例如：想找好用指令提升效率】

請輸出表格：
| 關鍵字 | 搜尋意圖 | 難度 | 內容形式 | 標題建議 |

分成交叉：核心關鍵字 / 長尾關鍵字 / 問題型關鍵字，各 10 個。` },
  { id: 55, slash: "/landing_page", title: "高轉換銷售頁架構設計", desc: "高轉換銷售頁架構設計", cat: 6, catName: "行銷與商業策略", template: `請幫我設計高轉換的銷售頁架構。

產品：【貼上產品、價格、特色】
受眾：【例如：怕 AI 取代的上班族】
痛點：【貼上】
見證：【貼上學員回饋或數據】

請依照此架構：
1. Hero 區（大標 + 副標 + CTA）
2. 痛點共鳴
3. 夢想藍圖
4. 產品介紹 + 機制
5. 見證 / 數據
6. 方案對比
7. FAQ 破除疑慮
8. 稀缺與行動呼籲

每區給我文案範例。` },
  { id: 56, slash: "/pr_release", title: "品牌公關新聞稿撰寫", desc: "品牌公關新聞稿撰寫", cat: 6, catName: "行銷與商業策略", template: `請幫我寫一篇品牌公關新聞稿。

事件：【例如：我們發布了 100 個 ChatGPT 指令大全，免費開源】
亮點數據：【例如：已幫助 5000 人提升效率】
目標媒體：【例如：科技媒體、行銷媒體】
想傳達的訊息：【例如：我們想讓 AI 變得人人可用】

請輸出：
- 標題（吸睛但專業）
- 導語（5W1H）
- 3 段正文（故事 + 數據 + 願景）
- 創辦人引言
- 媒體聯絡資訊` },
  { id: 57, slash: "/slogan_ideas", title: "金句與品牌口號發想", desc: "金句與品牌口號發想", cat: 6, catName: "行銷與商業策略", template: `請幫我想品牌金句與口號。

品牌：【貼上品牌定位與個性】
目標對象：【例如：20-35 歲自由工作者】
想要的感覺：【例如：專業、溫暖、有點叛逆】
參考風格：【例如：像 Nike / 像 Apple】

請給我：
1. 10 個 Slogan（8 字內，好記）
2. 10 個金句（適合放社群圖）
3. 每個標註適合的場景與情緒

最後選出 Top 3 並說明為什麼好。` },
  { id: 58, slash: "/user_journey", title: "描繪顧客購買決策旅程", desc: "描繪顧客購買決策旅程", cat: 6, catName: "行銷與商業策略", template: `請幫我描繪顧客旅程地圖。

產品：【貼上】
顧客：【例如：剛入行的行銷企劃】

請輸出表格：
| 階段 | 顧客想法 | 情緒 | 痛點 | 接觸點 | 我們的機會 | 內容/功能 |

階段包含：認知 → 考慮 → 購買 → 使用 → 忠誠 → 推薦
每個階段給我 1 個關鍵指標。` },
  { id: 59, slash: "/pricing_strategy", title: "產品定價與組合策略", desc: "產品定價與組合策略", cat: 6, catName: "行銷與商業策略", template: `請幫我設計定價與組合策略。

產品：【貼上成本、價值、競品價格】
目標：【例如：提升客單價 / 提高轉化】
顧客價格敏感度：【例如：中等，願意為省時付費】

請提供：
1. 3 種定價策略（成本+ / 價值 / 錨定）分析
2. 建議的 3 層組合（入門 / 標準 / 旗艦）與價格
3. 加價購 / 捆綁設計
4. 心理定價技巧（例如 299 vs 300）
5. A/B 測試建議` },
  { id: 60, slash: "/funnel_design", title: "行銷漏斗導流節點設計", desc: "行銷漏斗導流節點設計", cat: 6, catName: "行銷與商業策略", template: `請幫我設計行銷漏斗。

產品：【貼上】
流量來源：【例如：Threads 免費流量】
目標：【例如：從免費到 2990 元課程】

請輸出：
| 漏斗層 | 目標 | 內容/誘餌 | 指標 | 轉化率預估 | 優化方向 |

層級：曝光 → 點擊 → 名單 → 信任 → 成交 → 回購
並畫出漏斗圖文字版，標出最容易流失的節點。` },

  // 61-70
  { id: 61, slash: "/project_plan", title: "專案時程與里程碑拆解", desc: "專案時程與里程碑拆解", cat: 7, catName: "專案與日常管理", template: `請幫我拆解專案時程與里程碑。

專案：【例如：2 週內上線 100 個指令網站】
目標：【例如：準時上線，零重大 Bug】
資源：【例如：1 人全職】

請輸出：
1. WBS 工作拆解（大任務 → 子任務）
2. 甘特圖文字版（週為單位，標出依賴關係）
3. 3 個里程碑與驗收標準
4. 風險與緩衝時間
5. 每日站立會議 3 問模板` },
  { id: 62, slash: "/task_priority", title: "任務優先順序評估", desc: "任務優先順序評估", cat: 7, catName: "專案與日常管理", template: `請幫我評估任務優先順序。

任務清單：
1. 【貼上任務】
2. 【貼上任務】
3. 【貼上任務】
...（盡量列 10 個）

請用 Eisenhower + ICE 評分法：

表格：| 任務 | 緊急 | 重要 | 影響 | 信心 | 輕易度 | 總分 | 建議順序 |

最後告訴我：今天只做 3 件事，該做哪 3 件？` },
  { id: 63, slash: "/risk_manage", title: "風險評估與備案規劃", desc: "風險評估與備案規劃", cat: 7, catName: "專案與日常管理", template: `請幫我做風險評估與備案。

專案：【貼上專案描述】
階段：【例如：即將上線】

請輸出表格：
| 風險 | 發生機率 | 影響程度 | 風險等級 | 預防措施 | 備案 | 負責人 |

至少列 8 個風險，包含技術、人力、時程、外部依賴。
最後給我 Top 3 必須現在就處理的風險。` },
  { id: 64, slash: "/decision_tree", title: "優缺點矩陣幫助決策", desc: "優缺點矩陣幫助決策", cat: 7, catName: "專案與日常管理", template: `請幫我用決策矩陣做決定。

決策：【例如：該不該離職創業】
選項 A：【描述】
選項 B：【描述】
評估維度：【例如：收入、成長、風險、快樂，請給權重】

請輸出：
1. 加權評分表（每個維度 1-10 分）
2. 決策樹文字版
3. 如果選 A，最壞情況與備案
4. 如果選 B，機會成本
5. 你的建議 + 1 個小測試（如何用一週驗證）` },
  { id: 65, slash: "/daily_schedule", title: "排定一日高效時間塊", desc: "排定一日高效時間塊", cat: 7, catName: "專案與日常管理", template: `請幫我排定一日高效時間塊。

我的目標：【例如：今天要完成 3 個深度工作】
可工作時間：【例如：9:00-18:00，中午休息 1 小時】
能量高峰：【例如：早上最高】
固定行程：【貼上會議、接送等】
想養成的習慣：【例如：運動、閱讀】

請輸出 Time Blocking 表：
| 時段 | 任務類型 | 任務 | 能量需求 | 提醒 |

用番茄鐘 + 90 分鐘專注區塊，留緩衝。` },
  { id: 66, slash: "/habit_tracker", title: "設計21天習慣養成計畫", desc: "設計21天習慣養成計畫", cat: 7, catName: "專案與日常管理", template: `請幫我設計 21 天習慣養成計畫。

想養成的習慣：【例如：每天寫 500 字】
為什麼重要：【例如：想做個人品牌】
目前障礙：【例如：沒靈感、拖延】

請輸出：
- 習慣公式：提示 → 渴望 → 回應 → 獎賞
- 21 天階梯難度（從 2 分鐘版開始）
- 每日打卡模板（Markdown 表格）
- 如果中斷 1 天，如何重啟
- 第 7/14/21 天的獎勵設計` },
  { id: 67, slash: "/event_plan", title: "線上下活動籌備企劃表", desc: "線上下活動籌備企劃表", cat: 7, catName: "專案與日常管理", template: `請幫我做線下/線上活動企劃表。

活動：【例如：100 人小聚，主題是 AI 實戰】
目標：【例如：建立社群、轉化課程】
預算：【例如：3 萬】
日期：【例如：下個月】

請輸出：
1. 活動定位與受眾
2. 時程表（倒推）
3. 場地/設備/人力清單
4. 流程表（精確到分鐘）
5. 行銷宣傳節奏
6. 風險與備案
7. 結束後追蹤模板` },
  { id: 68, slash: "/checklist_gen", title: "專案執行必備檢查清單", desc: "專案執行必備檢查清單", cat: 7, catName: "專案與日常管理", template: `請幫我生成專案執行檢查清單。

專案：【例如：發佈線上課程】
階段：【例如：上線前 7 天】

請輸出 Checklist，分 4 類：
- [ ] 內容 / 產品
- [ ] 技術 / 流程
- [ ] 行銷 / 客服
- [ ] 法律 / 財務

每項要有：檢查點 + 負責人 + 完成標準 + 常見遺漏提醒` },
  { id: 69, slash: "/post_mortem", title: "專案結束檢討與復盤", desc: "專案結束檢討與復盤", cat: 7, catName: "專案與日常管理", template: `請幫我做專案復盤 Post-mortem。

專案：【貼上專案回顧】
目標 vs 實際：【例如：目標營收 10 萬，實際 7 萬】
過程：【貼上發生什麼事】

請用 4L 框架：
1. Liked：做得好的
2. Learned：學到的
3. Lacked：缺少的
4. Longed for：下次想要的

再加上：
- 5 個可量化的改進
- 給未來自己的 3 封建議信` },
  { id: 70, slash: "/resource_alloc", title: "人力與預算最佳化分配", desc: "人力與預算最佳化分配", cat: 7, catName: "專案與日常管理", template: `請幫我做資源分配最佳化。

專案：【貼上專案與目標】
可用資源：【例如：人力 3 人、預算 10 萬、時間 4 週】
限制：【例如：設計只能兼職】

請輸出：
| 任務 | 所需人力 | 預算 | 預估效益 | ROI | 建議分配 |

並給我：
1. 最佳分配方案
2. 瓶頸在哪
3. 如果砍掉 30% 預算，該砍哪裡` },

  // 71-80
  { id: 71, slash: "/bio_generator", title: "個人簡介多風格設計", desc: "個人簡介多風格設計", cat: 8, catName: "個人品牌與自媒體", template: `請幫我寫個人簡介，多風格。

我是誰：【貼上背景、專長、成績】
目標平台：【例如：Threads / LinkedIn / IG】
想吸引誰：【例如：想學 AI 的上班族】
個性：【例如：專業但幽默】

請給我 5 種風格，各 2 行內：
1. 專業權威版
2. 故事共鳴版
3. 幽默反差版
4. 極簡一句話版
5. 招募合作版

每個都要有 CTA。` },
  { id: 72, slash: "/media_position", title: "定位個人品牌獨特性", desc: "定位個人品牌獨特性", cat: 8, catName: "個人品牌與自媒體", template: `請幫我定位個人品牌的獨特性。

我：【貼上技能、經歷、價值觀】
市場：【貼上同領域的常見定位】
我不想變成：【例如：不想當雞湯導師】

請輸出：
1. 我的 3 個交叉優勢（Ikigai）
2. 一句話定位：「我幫助【誰】透過【方法】達到【結果】，不像【競品】那樣【缺點】」
3. 3 個內容支柱
4. 差異化故事線
5. 30 秒電梯簡報稿` },
  { id: 73, slash: "/threads_viral", title: "Threads爆款短文格式", desc: "Threads爆款短文格式", cat: 8, catName: "個人品牌與自媒體", template: `請幫我寫 Threads 爆款短文。

主題：【例如：我用 100 個指令讓工作效率提升 3 倍】
目標：【例如：要高留言、導流到完整清單】
語氣：【例如：像朋友分享祕密，不要像老師】

請給我 3 篇，格式：
- 第一行鉤子（讓人停下）
- 3-5 行乾貨（條列、短句）
- 1 行反差或金句
- 最後 1 行 CTA 問句

每篇不超過 500 字，加入 1 個表情符號就好。` },
  { id: 74, slash: "/yt_script", title: "YouTube長影片腳本結構", desc: "YouTube長影片腳本結構", cat: 8, catName: "個人品牌與自媒體", template: `請幫我寫 YouTube 長影片腳本。

主題：【例如：100 個 ChatGPT 指令，我只推這 10 個】
目標長度：【例如：12 分鐘】
觀眾：【例如：剛開始用 ChatGPT 的新手】
風格：【例如：像老高，懸念強】

請輸出：
1. 標題 3 選 1（高點擊）
2. 縮圖文字 3 選 1
3. 腳本（0-30秒鉤子 / 前言 / 3 個章節 / 總結 / CTA）
4. 每段的 B-roll 建議
5. 留言區置頂文案` },
  { id: 75, slash: "/newsletter_draft", title: "電子報高開信率排版", desc: "電子報高開信率排版", cat: 8, catName: "個人品牌與自媒體", template: `請幫我寫一封高開信率的電子報。

主題：【例如：本週我最愛的 3 個指令】
受眾：【例如：訂閱我 AI 週報的 2000 人】
目的：【例如：讓人點進完整清單】
語氣：【例如：像朋友週末分享】

請輸出：
1. 主旨 5 選 1（開信率導向）
2. 預覽文字
3. 電子報本文（結構：問候 + 故事 + 3 個乾貨 + CTA + P.S.）
4. 3 個 A/B 測試想法

總字數 400-600 字。` },
  { id: 76, slash: "/dm_bait", title: "設計私訊自動索取誘餌", desc: "設計私訊自動索取誘餌", cat: 8, catName: "個人品牌與自媒體", template: `請幫我設計私訊自動索取的誘餌（Lead Magnet）。

免費贈品：【例如：100 個指令 PDF】
平台：【例如：IG / Threads】
觸發關鍵字：【例如：留言「指令」】

請給我：
1. 貼文文案（引發留言）
2. 自動回覆私訊文案（3 句內 + 連結）
3. 領取後的 3 封培育私訊（建立信任 + 導向付費）
4. 避免被判定垃圾訊息的提醒` },
  { id: 77, slash: "/roast_my_profile", title: "以毒舌口吻點出粉專問題", desc: "以毒舌口吻點出粉專問題", cat: 8, catName: "個人品牌與自媒體", template: `請用毒舌但有建設性的口吻，幫我 roast 我的粉專 / 個人檔案。

我的帳號：【貼上簡介、最近 5 篇貼文、數據】
風格：【例如：像 Gordon Ramsay 點評，但最後會給愛】

請輸出：
1. 3 個最致命的問題（不留情面）
2. 為什麼這些問題讓人不想追蹤
3. 3 個馬上可改的解法
4. 重寫後的簡介 + 1 篇示範貼文

語氣要嗆，但要有料。` },
  { id: 78, slash: "/engagement_bait", title: "提問法引發社群高留言", desc: "提問法引發社群高留言", cat: 8, catName: "個人品牌與自媒體", template: `請幫我設計高留言的提問貼文。

主題：【例如：大家最常用的 ChatGPT 指令】
目標：【例如：要 100+ 留言，演算法加分】
平台：【例如：Threads】

請給我 5 種提問法，各 1 篇範例：
1. 二選一對立
2. 填空題
3. 經驗徵集
4. 敢不敢挑戰
5. 幫我決定

每篇都要有鉤子 + 降低留言門檻的設計。` },
  { id: 79, slash: "/monetize_idea", title: "個人知識變現途徑規劃", desc: "個人知識變現途徑規劃", cat: 8, catName: "個人品牌與自媒體", template: `請幫我規劃知識變現路徑。

我的專長：【例如：會寫 ChatGPT 指令】
受眾：【例如：中小企業老闆】
目前資產：【例如：有 3000 追蹤，沒有產品】

請輸出：
| 變現產品 | 定價 | 適合誰 | 交付形式 | 製作時間 | 預估月收 |

包含：免費引流品 / 低價體驗 / 核心課程 / 高價顧問 / 被動收入
並給我未來 90 天變現路線圖。` },
  { id: 80, slash: "/press_media", title: "媒體受訪個人亮點包裝", desc: "媒體受訪個人亮點包裝", cat: 8, catName: "個人品牌與自媒體", template: `請幫我包裝媒體受訪的亮點。

背景：【貼上你的故事】
受訪主題：【例如：AI 如何改變工作】
媒體：【例如：天下雜誌】
你想讓觀眾記住你什麼：【例如：讓 AI 變簡單的人】

請給我：
1. 3 個故事金句（媒體愛引用）
2. 1 個反差人設（例如：文組卻教 AI）
3. 5 個記者可能會問的刁鑽問題 + 你的回答
4. 30 秒自我介紹（上電視版）` },

  // 81-90
  { id: 81, slash: "/travel_itinerary", title: "多天客製化旅遊行程", desc: "多天客製化旅遊行程", cat: 9, catName: "生活、娛樂與探索", template: `請幫我規劃客製化旅遊行程。

目的地：【例如：日本京都 5 天 4 夜】
人數與預算：【例如：2 人，預算 6 萬，喜歡慢遊】
偏好：【例如：愛咖啡廳、不愛爬山、想拍美照】
出發日：【例如：11 月】

請輸出：
| 天數 | 上午 | 下午 | 晚上 | 住宿建議 | 美食 | 拍照點 |

加上交通方式、預算分配、避雷提醒。` },
  { id: 82, slash: "/recipe_generator", title: "剩食料理食譜與步驟", desc: "剩食料理食譜與步驟", cat: 9, catName: "生活、娛樂與探索", template: `請用我冰箱剩下的食材，幫我生成食譜。

食材：【例如：雞蛋 2 顆、白飯一碗、洋蔥半顆、起司】
調味料：【例如：只有鹽、醬油、黑胡椒】
時間：【例如：15 分鐘內】
工具：【例如：只有平底鍋】

請給我 2 道菜，包含：
- 菜名（有趣一點）
- 份量、時間、難度
- 步驟（條列，含時間）
- 小技巧 + 擺盤建議
- 營養小知識` },
  { id: 83, slash: "/fitness_plan", title: "居家減脂增肌運動菜單", desc: "居家減脂增肌運動菜單", cat: 9, catName: "生活、娛樂與探索", template: `請幫我設計居家運動菜單。

目標：【例如：減脂 3 公斤，同時增肌】
現況：【身高體重、運動經驗、傷痛】
器材：【例如：只有彈力帶和瑜珈墊】
時間：【例如：一週 4 天，每次 30 分鐘】
飲食：【例如：外食多】

請輸出：
- 一週課表（表格：動作、組數、休息、替代）
- 每個動作的重點提示
- 飲食搭配 3 原則
- 如何追蹤進步` },
  { id: 84, slash: "/gift_ideas", title: "根據性別性格推薦禮物", desc: "根據性別性格推薦禮物", cat: 9, catName: "生活、娛樂與探索", template: `請幫我推薦禮物。

對象：【例如：30 歲女生朋友，ISTJ，喜歡極簡、咖啡、貓】
場合：【例如：生日】
預算：【例如：1000-2000 元】
關係：【例如：同事，不想太曖昧】
禁忌：【例如：不要香水】

請給我 5 個禮物：
| 禮物 | 為什麼適合他 | 哪裡買 | 包裝建議 | 一句卡片文案 |

最後選出 Top 1。` },
  { id: 85, slash: "/movie_recommend", title: "根據影迷偏好推薦片單", desc: "根據影迷偏好推薦片單", cat: 9, catName: "生活、娛樂與探索", template: `請根據我的喜好推薦片單。

我喜歡的 3 部電影/影集：【例如：《寄生上流》《黑鏡》《Ted Lasso》】
喜歡的原因：【例如：喜歡反轉、社會議題、溫暖幽默】
現在心情：【例如：想被治癒但有點燒腦】
時間：【例如：今晚 2 小時】
平台：【例如：Netflix】

請給我 5 部，包含：
- 片名 + 年份 + 導演
- 為什麼你會喜歡（對應你的喜好）
- 適合的觀看情境
- 無雷一句話推薦` },
  { id: 86, slash: "/budget_tracker", title: "個人財務與記帳規劃", desc: "個人財務與記帳規劃", cat: 9, catName: "生活、娛樂與探索", template: `請幫我做個人財務與記帳規劃。

月收入：【例如：5 萬】
固定支出：【房租、貸款等】
目標：【例如：一年存 20 萬、想投資】
記帳習慣：【例如：從沒記過，想從簡單開始】

請給我：
1. 50/30/20 預算分配（依我的情況調整）
2. 記帳表格模板（Google Sheets 可貼）
3. 3 個存錢自動化技巧
4. 1 個本月挑戰（例如：無痛存 3000）` },
  { id: 87, slash: "/game_master", title: "跑團RPG遊戲主持人", desc: "跑團RPG遊戲主持人", cat: 9, catName: "生活、娛樂與探索", template: `你現在是跑團 RPG 的遊戲主持人（GM），風格幽默但有史詩感。

世界觀：【例如：賽博龐克台北 2077】
玩家人數與角色：【例如：2 人，一個駭客一個武士】
時長：【例如：2 小時短團】

請開始：
1. 描述開場場景（五感）
2. 給玩家 3 個選擇（每個有風險與獎勵）
3. 根據我的選擇推進劇情
4. 加入 1 個反轉和 1 個 NPC
5. 隨時可擲骰判定（請說明判定邏輯）

現在請問：你們醒來的第一眼看到了什麼？` },
  { id: 88, slash: "/joke_teller", title: "幽默美式喜劇段子創作", desc: "幽默美式喜劇段子創作", cat: 9, catName: "生活、娛樂與探索", template: `請幫我寫一段幽默美式脫口秀段子。

主題：【例如：用 ChatGPT 寫情書被抓包】
風格：【例如：像賀瓏 / 像 Jimmy Fallon / 像地獄梗但溫和】
長度：【例如：1 分鐘】
對象：【例如：講給同事聽】

請包含：
- 1 個 Callback
- 1 個自嘲
- 1 個觀眾互動句
- 3 個笑點（鋪陳→反轉）

最後給我表演提示：語速、停頓、表情。` },
  { id: 89, slash: "/dream_interpret", title: "夢境心理學符號解析", desc: "夢境心理學符號解析", cat: 9, catName: "生活、娛樂與探索", template: `請幫我解析這個夢境，用心理學角度。

夢境：【貼上你記得的細節，越細越好】
最近壓力：【例如：工作轉換期】
醒來感受：【例如：焦慮但有點興奮】

請輸出：
1. 夢境中的 3 個關鍵符號解析（佛洛伊德 + 榮格 + 現代心理學各 1 種觀點）
2. 可能對應的現實議題
3. 3 個自我提問，幫我探索潛意識
4. 一個溫柔的行動建議

語氣要療癒，不要迷信。` },
  { id: 90, slash: "/gift_letter", title: "溫馨手寫卡片祝福語撰寫", desc: "溫馨手寫卡片祝福語撰寫", cat: 9, catName: "生活、娛樂與探索", template: `請幫我寫溫馨手寫卡片祝福語。

對象：【例如：要離職的同事，合作 3 年】
場合：【例如：生日 / 感謝 / 離別】
我和他的回憶：【貼上 1-2 個具體小事】
我想傳達：【例如：感謝、祝福、不捨但支持】

請給我 3 個版本：
- 溫暖真誠版（適合手寫）
- 幽默不煽情版
- 極簡金句版（一句話）

每版 100 字內，語氣像真人手寫。` },

  // 91-100
  { id: 91, slash: "/first_principles", title: "第一性原理拆解問題", desc: "第一性原理拆解問題", cat: 10, catName: "思考架構與心智模型", template: `請用第一性原理幫我拆解這個問題。

問題：【例如：如何提升線上課程完課率】

請按步驟：
1. 列出大家默認的假設（至少 5 個）
2. 質疑每個假設，回到物理/人性/數學的最基本事實
3. 重建新解法（從零開始會怎麼做）
4. 用第一性原理推導出 3 個反直覺解法

參考 Elon Musk 的思考方式，禁止用類比推理。` },
  { id: 92, slash: "/second_thinking", title: "二階思考預測長遠後果", desc: "二階思考預測長遠後果", cat: 10, catName: "思考架構與心智模型", template: `請用二階思考幫我預測長遠後果。

決策：【例如：全面導入 AI 取代 50% 客服】

請輸出：
1. 一階後果（立即發生）
2. 二階後果（3-6 個月）
3. 三階後果（1-2 年）
4. 誰受益？誰受害？誰沒被考慮？
5. 如果要做，如何設計護欄避免最壞二階後果

用表格呈現，思維要像 Howard Marks。` },
  { id: 93, slash: "/pre_mortem", title: "事前檢討法預防failure", desc: "事前檢討法預防failure", cat: 10, catName: "思考架構與心智模型", template: `請用 Pre-Mortem 事前驗屍法，假設專案已經失敗。

專案：【例如：下個月要辦 300 人 AI 年會】
假設：現在是活動結束後，活動徹底失敗，上了新聞

請進行：
1. 假設失敗了，寫一份失敗新聞稿標題
2. 列出 10 個導致失敗的原因（從最可能到最荒謬）
3. 每個原因的預防措施
4. 未來 2 週內要先做的 3 件事來避免

這個方法來自 Gary Klein，目的是在失敗前就預防。` },
  { id: 94, slash: "/pareto_principle", title: "抓出80/20核心關鍵", desc: "抓出80/20核心關鍵", cat: 10, catName: "思考架構與心智模型", template: `請用 80/20 法則幫我抓出核心關鍵。

目標：【例如：想讓 Threads 漲粉更快】
我目前做的 10 件事：【貼上清單】

請分析：
1. 哪 20% 的事帶來 80% 成果？
2. 哪 80% 的事可以刪掉、外包、自動化？
3. 如果每天只做 1 件事，哪件 ROI 最高？
4. 設計一個 80/20 儀表板（追蹤哪 3 個指標就好）` },
  { id: 95, slash: "/eisenhower_matrix", title: "四象限評估緊急重要度", desc: "四象限評估緊急重要度", cat: 10, catName: "思考架構與心智模型", template: `請幫我用艾森豪矩陣整理待辦。

待辦清單：
1. 【貼上】
2. 【貼上】
3. 【貼上】
...至少 8 項

請分類到：
- 第一象限：緊急且重要（馬上做）
- 第二象限：重要不緊急（排程做）
- 第三象限：緊急不重要（授權）
- 第四象限：不緊急不重要（刪除）

最後告訴我：我是不是都在做第三象限？如何轉移到第二象限？` },
  { id: 96, slash: "/5_whys", title: "連續提問找問題根本原因", desc: "連續提問找問題根本原因", cat: 10, catName: "思考架構與心智模型", template: `請用 5 Whys 幫我找根本原因。

表面問題：【例如：團隊離職率很高】

請進行：
Why 1：為什麼會發生？→ 【請先回答或讓 AI 假設】
Why 2：為什麼會那樣？
Why 3：...
Why 4：...
Why 5：...

每層都要有證據或假設，最後給我：
- 根本原因（可能是制度/流程/人性）
- 3 個治本解法（不是治標）
- 如何驗證是否真的治本` },
  { id: 97, slash: "/scamper_tool", title: "奔馳法觸發產品創新", desc: "奔馳法觸發產品創新", cat: 10, catName: "思考架構與心智模型", template: `請用 SCAMPER 奔馳法幫我創新產品。

產品：【例如：線上 Notion 模板商店】

請用 7 個角度各給 2 個點子：
S - Substitute 替代
C - Combine 合併
A - Adapt 改編
M - Modify 修改
P - Put to other use 其他用途
E - Eliminate 刪除
R - Reverse 翻轉

表格：| 角度 | 點子 | 為什麼有機會 | 風險 |

最後選出 Top 3 最值得測試。` },
  { id: 98, slash: "/six_hats", title: "六頂思考帽多角度評估", desc: "六頂思考帽多角度評估", cat: 10, catName: "思考架構與心智模型", template: `請用六頂思考帽幫我評估這個決策。

決策：【例如：要不要把 100 個指令做成付費產品】

請戴上六頂帽子：
🤍 白帽：客觀數據與事實
❤️ 紅帽：直覺與情緒
🖤 黑帽：風險與批判
💛 黃帽：好處與機會
💚 綠帽：創意與替代方案
💙 藍帽：總結與下一步

最後由藍帽給出建議：做 / 不做 / 條件式做` },
  { id: 99, slash: "/inversion_think", title: "逆向思考避免最壞情況", desc: "逆向思考避免最壞情況", cat: 10, catName: "思考架構與心智模型", template: `請用逆向思考幫我避免最壞情況。

目標：【例如：我想讓客戶續約率提升】

請先問：如何確保「一定失敗」？

列出 10 個保證失敗的做法，然後反轉：
| 保證失敗的做法 | 反轉後的成功做法 | 我現在有沒有在做失敗版？ |

這個方法來自 Charlie Munger：與其追求成功，不如避免愚蠢。` },
  { id: 100, slash: "/mental_model", title: "套用跨領域心智模型思考", desc: "套用跨領域心智模型思考", cat: 10, catName: "思考架構與心智模型", template: `請套用跨領域心智模型來思考我的問題。

問題：【例如：為什麼我的內容有流量但沒轉化】

請選 5 個心智模型：
1. 物理學：【例如：熵增】
2. 生物學：【例如：演化適應】
3. 經濟學：【例如：機會成本】
4. 心理學：【例如：損失厭惡】
5. 系統思考：【例如：反饋迴路】

每個模型解釋：
- 用 1 句話定義模型
- 如何解釋我的問題
- 帶來什麼新解法

最後給我綜合洞察。` },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(m.matches ? "dark" : "light");
  }, []);

  const filtered = useMemo(() => {
    return commandsData.filter(c => {
      const matchCat = activeCat ? c.cat === activeCat : true;
      const q = search.trim().toLowerCase();
      if (!q) return matchCat;
      return matchCat && (
        c.slash.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.template.toLowerCase().includes(q) ||
        c.catName.toLowerCase().includes(q)
      );
    });
  }, [search, activeCat]);

  const handleCopy = async (cmd: Command) => {
    const showSuccess = () => {
      setCopiedId(cmd.id);
      setToast(`已複製 ${cmd.slash}`);
      setTimeout(() => setCopiedId(null), 1800);
      setTimeout(() => setToast(null), 2200);
    };
    const showFail = () => {
      setToast(`複製失敗，請手動選取`);
      setTimeout(() => setToast(null), 2500);
    };
    try {
      await navigator.clipboard.writeText(cmd.template);
      showSuccess();
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = cmd.template;
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand returned false");
        showSuccess();
      } catch {
        showFail();
      }
    }
  };

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "dark" : ""}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap');
        * { font-family: 'Inter', 'Noto Sans TC', -apple-system, sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0a0b] text-zinc-100" : "bg-[#fbfaf8] text-zinc-900"}`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${isDark ? "bg-[#0a0a0b]/80 border-zinc-800" : "bg-[#fbfaf8]/80 border-zinc-200"}`}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 sm:py-5 gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#7c3aed] flex items-center justify-center text-white font-bold text-[15px] shadow-[0_4px_12px_rgba(124,58,237,0.35)]">100</div>
                  <h1 className="text-[18px] sm:text-[20px] font-[700] tracking-tight leading-none truncate">
                    100個最好用的 ChatGPT 指令大全
                  </h1>
                </div>
                <p className={`mt-1.5 text-[13px] sm:text-[14px] ${isDark ? "text-zinc-400" : "text-zinc-500"} tracking-wide`}>
                  分類搜尋 · 一鍵複製 · 直接貼上就能用 <span className="hidden sm:inline">· Traditional Chinese</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium border ${isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-white border-zinc-200 text-zinc-600 shadow-sm"}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {filtered.length} / 100 已載入
                </div>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${isDark ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-50 shadow-sm"}`}
                  aria-label="切換主題"
                >
                  <span className="text-[16px]">{isDark ? "☀️" : "🌙"}</span>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="pb-4">
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[16px] opacity-60 group-focus-within:opacity-100 transition">⌕</div>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="搜尋指令、關鍵字、分類… 例如：/copywriter、商業信件、SEO"
                  className={`w-full pl-10 pr-4 py-3.5 rounded-2xl border text-[14px] sm:text-[15px] outline-none transition-all
                    ${isDark
                      ? "bg-zinc-900 border-zinc-800 placeholder:text-zinc-500 focus:border-[#7c3aed]/50 focus:ring-4 focus:ring-[#7c3aed]/10"
                      : "bg-white border-zinc-200 placeholder:text-zinc-400 shadow-[0_1px_2px_rgba(0,0,0,0.04)] focus:border-[#7c3aed]/40 focus:ring-4 focus:ring-[#7c3aed]/10"
                    }`}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[12px] ${isDark ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"}`}
                  >
                    清除
                  </button>
                )}
              </div>

              {/* Stats bar */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
                <div className={`px-2.5 py-1 rounded-full font-medium ${isDark ? "bg-zinc-900 text-zinc-300 border border-zinc-800" : "bg-zinc-900 text-white"}`}>
                  篩選結果：{filtered.length} 個指令
                </div>
                <div className={`${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                  {activeCat ? `分類 ${activeCat} · ${categories.find(c => c.id === activeCat)?.name}` : "全部 10 大分類 · 100 個精選"} · 點擊卡片可展開預覽
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Category chips sticky */}
        <div className={`sticky top-[93px] sm:top-[101px] z-30 backdrop-blur-xl border-b ${isDark ? "bg-[#0a0a0b]/80 border-zinc-800" : "bg-[#fbfaf8]/80 border-zinc-200"}`}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveCat(null)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all active:scale-[0.98]
                  ${!activeCat
                    ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                    : isDark ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200" : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
              >
                全部 100
              </button>
              {categories.map(cat => {
                const isActive = activeCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(isActive ? null : cat.id)}
                    className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all active:scale-[0.98] flex items-center gap-1.5
                      ${isActive
                        ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
                        : isDark ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200" : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${isActive ? "bg-white/20" : isDark ? "bg-zinc-800" : "bg-zinc-100"}`}>{cat.id}</span>
                    <span className="whitespace-nowrap">{cat.name}</span>
                    <span className={`text-[11px] ${isActive ? "text-white/70" : "opacity-60"}`}>{cat.range}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main grid */}
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {filtered.length === 0 ? (
            <div className={`rounded-[20px] border p-10 text-center ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
              <div className="text-[32px] mb-2">🔍</div>
              <div className="font-medium">找不到符合的指令</div>
              <div className={`text-[13px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>試試其他關鍵字，或清除篩選</div>
              <button onClick={() => { setSearch(""); setActiveCat(null); }} className="mt-4 px-4 py-2 rounded-full bg-[#7c3aed] text-white text-[13px] font-medium">清除全部篩選</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 auto-rows-fr">
              {filtered.map(cmd => {
                const isExpanded = expandedId === cmd.id;
                const isCopied = copiedId === cmd.id;
                return (
                  <div
                    key={cmd.id}
                    onClick={() => setExpandedId(isExpanded ? null : cmd.id)}
                    className={`group relative flex flex-col rounded-[20px] border p-4 sm:p-5 transition-all cursor-pointer
                      ${isDark
                        ? `bg-zinc-900/70 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 ${isExpanded ? "!border-[#7c3aed]/40 !bg-zinc-900" : ""}`
                        : `bg-white border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-zinc-300 ${isExpanded ? "!border-[#7c3aed]/30 !shadow-[0_8px_24px_rgba(124,58,237,0.12)]" : ""}`
                      }`}
                  >
                    {/* top */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-[600] tracking-tight border ${isDark ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-zinc-900 text-white border-zinc-900"}`}>
                            {cmd.slash}
                          </span>
                          <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${isDark ? "bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/20" : "bg-[#f5f0ff] text-[#7c3aed] border border-[#ede6ff]"}`}>
                            {cmd.cat} · {cmd.catName}
                          </span>
                          <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>#{cmd.id}</span>
                        </div>
                        <h3 className="mt-3 text-[15px] font-[700] leading-[1.35] tracking-tight line-clamp-2">
                          {cmd.title}
                        </h3>
                        <p className={`mt-1 text-[13px] leading-[1.5] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                          {cmd.desc}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopy(cmd); }}
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-90
                          ${isCopied
                            ? "bg-[#7c3aed] border-[#7c3aed] text-white shadow-[0_4px_12px_rgba(124,58,237,0.4)]"
                            : isDark
                              ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                              : "bg-zinc-900 text-white border-zinc-900 hover:bg-black shadow-sm"
                          }`}
                        aria-label="複製"
                      >
                        <span className="text-[14px]">{isCopied ? "✓" : "⧉"}</span>
                      </button>
                    </div>

                    {/* template preview */}
                    <div className={`mt-4 rounded-[14px] border p-3.5 text-[12.5px] leading-[1.65] font-[450] whitespace-pre-wrap transition-all
                      ${isDark ? "bg-[#101010] border-zinc-800 text-zinc-300" : "bg-[#fcfbfa] border-zinc-100 text-zinc-700"}
                      ${isExpanded ? "" : "line-clamp-[7] max-h-[168px] overflow-hidden relative"}
                    `}>
                      {!isExpanded && (
                        <div className={`absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t ${isDark ? "from-[#101010] to-transparent" : "from-[#fcfbfa] to-transparent"} pointer-events-none rounded-b-[14px]`} />
                      )}
                      {cmd.template}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                        {isExpanded ? "點擊收合" : "點擊展開完整模板"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className={`text-[11px] px-2 py-1 rounded-full ${isCopied ? "bg-emerald-500 text-white" : isDark ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500"}`}>
                          {isCopied ? "已複製" : "一鍵複製"}
                        </div>
                      </div>
                    </div>

                    {/* accent glow */}
                    <div className={`pointer-events-none absolute -inset-px rounded-[20px] opacity-0 group-hover:opacity-100 transition duration-300 ${isDark ? "bg-gradient-to-b from-white/[0.04] to-transparent" : "bg-gradient-to-b from-zinc-900/[0.02] to-transparent"}`} />
                  </div>
                );
              })}
            </div>
          )}

          <div className={`mt-10 rounded-[20px] border p-6 sm:p-7 ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[14px] font-[700]">如何使用最有效？</div>
                <div className={`mt-1 text-[13px] leading-[1.6] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                  1. 先搜尋你的場景 → 2. 點擊卡片展開 → 3. 一鍵複製 → 4. 把【】替換成你的內容 → 5. 貼到 ChatGPT。<br />
                  <span className="opacity-80">小技巧：把常用指令釘選在 ChatGPT 的自訂指令裡，效率提升 3 倍。</span>
                </div>
              </div>
              <div className={`text-[11px] px-3 py-2 rounded-full border ${isDark ? "border-zinc-800 text-zinc-500" : "border-zinc-200 text-zinc-500 bg-zinc-50"}`}>
                Made for zh-TW · 100 prompts · Notion-like minimal
              </div>
            </div>
          </div>
        </main>

        {/* Toast */}
        <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2">
          {toast && (
            <div className="pointer-events-auto px-4 py-2.5 rounded-full bg-zinc-900 text-white text-[13px] font-medium shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex items-center gap-2 animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="w-5 h-5 rounded-full bg-[#7c3aed] flex items-center justify-center text-[12px]">✓</span>
              {toast}
              <span className="opacity-60 ml-1">已複製到剪貼簿</span>
            </div>
          )}
        </div>

        <style>{`
          @keyframes slideUp {
            from { transform: translateY(12px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-\[7\] {
            display: -webkit-box;
            -webkit-line-clamp: 7;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
}
