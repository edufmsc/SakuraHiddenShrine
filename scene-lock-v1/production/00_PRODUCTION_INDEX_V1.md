# 櫻隱 V58｜五卷 Production 製作總索引 V1

> 分支：`review/v58-scene-lock`
> 本資料夾用途：把五卷逐幕規格轉成可直接執行的製作清單，統一控管換圖、生圖、RWD、安全區、hotspot、命牒與鎖頁。
> 本階段不修改 `main`，也不因局部修正而整理全站 CSS。

---

## 一、五卷 Production 文件

1. `01_LOVE_PRODUCTION_WORKLIST_V1.md`｜緣之卷 14 幕
2. `02_CAREER_PRODUCTION_WORKLIST_V1.md`｜業之卷 12 幕
3. `03_LIFE_PRODUCTION_WORKLIST_V1.md`｜命之卷 12 幕
4. `04_FORBIDDEN_PRODUCTION_WORKLIST_V1.md`｜禁之卷 13 幕
5. `05_FINALE_PRODUCTION_WORKLIST_V1.md`｜真命卷 10 幕

---

## 二、執行狀態

- ✅ 五卷逐幕規格已建立。
- ✅ 五卷 visual-audit 已建立。
- ✅ 五卷 Production 工作表已建立。
- ⬜ 逐幕最終定圖。
- ⬜ 第一批 `🔒 LOCKED`。
- ⬜ V58 程式精準修改。

---

## 三、全站統一判定

每一幕只使用以下製作判定：

- `✅ USE`：現圖可直接使用。
- `🟡 ADJUST`：現圖保留，調 focus／安全區／手機圖／文字／hotspot。
- `🔄 SWAP`：先從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材缺必要故事動作，生成專用新圖。
- `🔧 BUILD`：程式／互動必修。

只有「故事＋圖片＋桌機＋手機＋安全區＋互動」全部通過後，才能標 `🔒 LOCKED`。

---

## 四、跨卷不可違反原則

1. 九尾必須始終是同一位明確成年九尾女性。
2. 近身頁可大特寫，但不可裁壞頭、狐耳、眼、唇、脖、胸線、手勢。
3. 一般敘事頁優先完整動作與場景，不以漂亮肖像代替劇情。
4. 手機優先使用獨立直式構圖，不用桌機橫圖硬裁。
5. 命牒圖在構圖／生成階段就必須留出紙面安全區。
6. hotspot 綁原圖 normalized 座標／SVG viewBox，不綁螢幕像素。
7. 前四卷不再使用刮除；第五卷只有真正需要時才保留唯一終局揭封。
8. 同一主圖原則只服務一個主場景；第五卷刻意伏筆回收例外，但必須做狀態差異。
9. 已 `🔒 LOCKED` 頁不得因修別頁被連帶改壞。

---

## 五、各卷目前最高風險幕

### 緣
`love.evidence`、`love.thread-room`、`love.silence`、`love.turn`、`love.result`、`love.ritual`

### 業
`career.borrowed`、`career.turn`、`career.stake-trial`、`career.result`、`career.ritual`

### 命
`life.cost`、`life.turn`、`life.body-trial`、`life.result`

### 禁
`forbidden.pattern`、`forbidden.threat`、`forbidden.turn`、`forbidden.heat-trial`、`forbidden.result`、`forbidden.ending`

### 真命
`finale.gate`、`finale.verdicts`、`finale.confession`、`finale.seal-test`、`finale.choice`、`finale.ending`

---

## 六、接下來統一執行順序

1. 建立跨五卷 `IMAGE_GENERATION_MASTER_V1.md`。
2. 建立 `LOCK_CANDIDATES_MASTER_V1.md`。
3. 從緣卷開始逐幕最終定圖。
4. 符合條件的頁面先批次標記第一批 `🔒 LOCKED`。
5. 所有需生圖畫面完成後，再進入 V58 精準程式修改。

本索引只負責控管，不代替各卷詳細工作表。