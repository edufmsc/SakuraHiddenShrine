# 櫻隱 V58｜最終驗收進行中 V1

> 分支：`review/v58-scene-lock`
> `main`：未修改。
> 狀態：FINAL ACCEPTANCE RUNNING
> 原則：機器可判定的先由程式／檔案契約驗收；最後的人眼構圖、文字遮擋、手機手感與故事節奏由人工確認後才可 `🔒 LOCKED`。

## 一、目前已通過的機器／結構驗收

### 1. 分支安全

`review/v58-scene-lock` 相對 `main`：
- ahead：84 commits
- behind：0 commits
- merge base 與目前 main 基準一致

判定：review 分支沒有漏接 main 的新提交；目前所有驗收修改仍隔離在 review 分支。

### 2. 開場固定資產未被替換

`index.html` 仍使用：
- Desktop：`OPENING_01_door_eyes_desktop_v47.webp`
- Mobile：`OPENING_01_door_eyes_mobile_v47.webp`

原本開場規則維持。

### 3. Script 載入順序

目前順序：
1. `story.js`
2. `story_overrides_v1.js`
3. `pixel_overrides_v1.js`
4. `interaction_story_overrides_v1.js`
5. `script.js`
6. `interaction_ui_overrides_v1.js`
7. `ui_overrides_v1.js`

判定：資料覆寫在主程式讀取前完成；DOM 互動覆寫在主程式後載入，順序正確。

### 4. 29 張正式新增圖資

比較 main 與 review 分支已確認正式新增圖資全部存在於 Git tree：
- Love：8 張
- Career：4 張
- Life：4 張
- Forbidden：6 張
- Finale/Fifth：5 張
- Ending：2 張

合計 29 張。

### 5. 主要正式圖已接回故事

`story_overrides_v1.js` 已確認接入：
- `love.silence`
- `love.turn`
- `love.result`
- `love.ritual`
- `career.borrowed`
- `career.result`
- `life.turn`
- `life.result`
- `forbidden.turn`
- `forbidden.result`
- `forbidden.ending`
- `finale.gate`
- `finale.confession`
- `finale.seal-test` Mobile
- `finale.ending`＋`STORY.totalScrollArt`

### 6. `love.face`

正式採「三個文字選擇」模式。
- 已停用已知錯位的舊臉頰／唇前圖上 hotspot。
- 三個 choice、reaction、behavior 與後續流程保留。
- 不再把「未來再校 hotspot」列為阻塞。

判定：程式結構可驗收；只需人工確認文字選項是否好操作。

### 7. `love.ritual`

- 三個 choice 都有 reactionArt。
- 點完不再直接跳到 ending，而會先停留看 reaction。
- 玩家腕線有圖上 hotspot。
- hotspot 已設定 `pointer-events:auto`。
- Desktop / Mobile 點擊框已依正式圖縮小。

### 8. `finale.seal-test`

- 已由線性頁改為真正兩選一行為測試。
- choice：`hover-seal`、`withdraw-seal`。
- 兩條路都不會提前完成第五印。
- Mobile 第五印 hotspot 已依正式 9:16 圖校正。

### 9. Finale 三路 reaction

原先不存在的三個資產引用已移除。
目前：
- complete → `final_complete_dawn.webp`
- scroll-only Desktop → `final_scroll_desktop.webp`
- scroll-only Mobile → `FINAL_SCROLL_portrait.webp`
- refuse → `final_refuse_room.webp`

`FINAL_SCROLL_portrait.webp` 已確認實際為 1024×1536 直式，不是橫圖假命名。
complete / refuse 因目前沒有語意正確的專用 9:16 圖，Mobile 採完整 `contain` 顯示，避免硬裁核心畫面。

### 10. 最終總命牒

`finale.ending` 與 `STORY.totalScrollArt` 已一起切到：
- Desktop：`FINALE_ENDING_01_final_destiny_scroll_desktop.webp`
- Mobile：`FINALE_ENDING_01_final_destiny_scroll_mobile.webp`

實際像素校正紙面：
- Desktop：`x .15 / y .31 / w .30 / h .38`
- Mobile：`x .13 / y .42 / w .30 / h .30`

### 11. 命牒閱讀

`ui_overrides_v1.js` / `style_overrides_v1.css` 已處理：
- overflow 可捲動
- 逐字寫入時自動跟隨
- 玩家往上閱讀時停止強制跟隨
- 回到底部可恢復
- Mobile 原生 touch scroll

### 12. 已清除的阻斷性互動問題

已修：
- hotspot MutationObserver 自我回饋循環
- hotspot 看得到但可能點不到
- `love.face` fallback 文字反覆觸發 observer
- Finale 三分支 404 圖片引用
- Mobile Finale 橫式 reaction 強制 cover 裁切

---

## 二、尚未取得的自動瀏覽器證據

Repo 內已有 `.github/workflows/stage2-browser-qa.yml`，原設計以 Playwright Chromium 驗：
- Desktop 1440×900
- Mobile 390×844
- HTTP / missing image
- Console error
- request failure
- script order
- horizontal overflow

但目前 `scene-lock-v1/runtime-qa/STAGE2_BROWSER_QA.md` 尚未回寫到 branch，因此不能把「Chromium runtime QA」假裝成 PASS。

這不代表網站已知壞掉；代表目前缺少這一層自動瀏覽器證據。

---

## 三、人工驗收是否需要？

**需要。**

但人工只驗機器無法可靠判斷的項目：
1. 圖片是否真的好看／符合故事。
2. Desktop 文字是否擋住臉、胸線、手勢、證據物件。
3. Mobile 是否擋住九尾臉、第五印、玩家手或選項。
4. hotspot 實際點擊手感是否自然。
5. 四卷到第五卷的故事節奏是否太快／太慢。
6. Finale complete / scroll-only / refuse 三種 reaction 在手機的視覺接受度。
7. 最終命牒文字是否完整落在紙面且容易閱讀。

人工不需要重新檢查程式碼，也不需要逐張檢查所有資產路徑。

---

## 四、人工驗收最短路徑

### Desktop
從開場開始完整跑一次：
`Opening → Love → Career → Life → Forbidden → Fifth → Finale choice → Final destiny scroll`

特別停留確認：
- `love.face`
- `love.silence`
- `love.ritual`
- `career.borrowed`
- `life.turn`
- `forbidden.ending`
- `finale.gate`
- `finale.confession`
- `finale.seal-test`
- 三種 Finale reaction 至少各看一次
- `finale.ending`

### Mobile
同樣完整跑一次；重點看：
- 上方 UI 是否擋畫面
- 下方選項是否太高
- 第五印 hotspot
- 腕線 hotspot
- Finale reaction 是否完整
- 最終命牒是否能正常上下滑

---

## 五、目前驗收狀態

- Branch isolation：✅ PASS
- Opening contract：✅ PASS
- Asset presence：✅ PASS
- Story image wiring：✅ PASS
- Interaction contract：✅ PASS
- Scroll contract：✅ PASS
- Source-image pixel QA：✅ PASS / 已有前期證據
- Automated Chromium runtime：⬜ 尚無證據
- Desktop 人眼驗收：⬜ 待人工
- Mobile 人眼驗收：⬜ 待人工
- User final approval：⬜ 待確認
- `🔒 LOCKED`：尚未宣告

## 六、最終原則

只有 Desktop＋Mobile 人工走完，且沒有阻斷性問題，才將頁面／整體標成 `🔒 LOCKED`。
在此之前不修改 `main`，不提前 merge。
