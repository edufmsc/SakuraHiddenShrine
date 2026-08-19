# 櫻隱 V58｜Scene Lock V1 進度追蹤

> 基底：V58
> 分支：`review/v58-scene-lock`
> `main`：本階段不修改。

## 已完成

### 逐幕規格
- ✅ `00_MASTER_SCENE_LOCK_V1.md`
- ✅ `01_LOVE_SCENE_LOCK_V1.md`
- ✅ `02_CAREER_SCENE_LOCK_V1.md`
- ✅ `03_LIFE_SCENE_LOCK_V1.md`
- ✅ `04_FORBIDDEN_SCENE_LOCK_V1.md`
- ✅ `05_FINALE_SCENE_LOCK_V1.md`

### 圖片視覺審核層
- ✅ `visual-audit/00_VISUAL_AUDIT_INDEX_V1.md`
- ✅ `visual-audit/01_LOVE_VISUAL_AUDIT_V1.md`
- ✅ `visual-audit/02_CAREER_VISUAL_AUDIT_V1.md`
- ✅ `visual-audit/03_LIFE_VISUAL_AUDIT_V1.md`
- ✅ `visual-audit/04_FORBIDDEN_VISUAL_AUDIT_V1.md`
- ✅ `visual-audit/05_FINALE_VISUAL_AUDIT_V1.md`

### Production 製作工作表
- ✅ `production/00_PRODUCTION_INDEX_V1.md`
- ✅ `production/01_LOVE_PRODUCTION_WORKLIST_V1.md`
- ✅ `production/02_CAREER_PRODUCTION_WORKLIST_V1.md`
- ✅ `production/03_LIFE_PRODUCTION_WORKLIST_V1.md`
- ✅ `production/04_FORBIDDEN_PRODUCTION_WORKLIST_V1.md`
- ✅ `production/05_FINALE_PRODUCTION_WORKLIST_V1.md`
- ✅ `production/IMAGE_GENERATION_MASTER_V1.md`
- ✅ `production/LOCK_CANDIDATES_MASTER_V1.md`

### 高風險逐幕檢查
- ✅ `reviews/02_HIGH_RISK_SCENE_REVIEW_V1.md`
- ✅ `reviews/03_HIGH_RISK_SCENE_REVIEW_V1.md`
- ✅ `reviews/04_EXECUTION_DECISION_MASTER_V1.md`

### 第一批實際程式落地
- ✅ 新增 `story_overrides_v1.js`，避免大幅重寫 V58 原始 `story.js`。
- ✅ `index.html` 載入順序改為 `story.js → story_overrides_v1.js → script.js`。
- ✅ `love.threshold` 手機圖改用真正配對的 `LOVE_01_rain_bridge_invite_mobile.webp`。
- ✅ `love.question` 四個選項改為自然繁中對話，移除教材式 hint。
- ✅ `love.evidence` 改用既有 `LOVE_VERIFY_01_next_time_proof_desktop/mobile` 作為第一順位正式驗收圖。

## 現在所在階段

**規格、視覺審核、Production 與高風險場景定向已完成；第一批低風險可確定項目已開始真正寫入程式。現在持續進行「現有素材替換 → 專用生圖 → hotspot / trial / focus / 命牒修正 → 實機鎖頁」。**

### 每幕最終判定
- `✅ USE`：現圖直接使用。
- `🟡 ADJUST`：現圖保留，修 focus／安全區／手機構圖／hotspot／文字。
- `🔄 SWAP`：從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材沒有該故事動作，生成專用新圖。
- `🔧 BUILD`：程式／互動需修正。
- `🔒 LOCKED`：必須實際桌機＋手機＋互動驗收通過。

## 確定高優先生成

### 緣
- `love.turn`
- `love.result`

### 業
- `career.borrowed`
- `career.result`

### 命
- `life.turn`
- `life.result`

### 禁
- `forbidden.pattern`
- `forbidden.turn`
- `forbidden.result`

### 真命
- `finale.gate`
- `finale.confession`
- `finale.seal-test` 手機
- `finale.ending`

## 優先換現有圖

- ✅ `love.evidence` → 已先接 `LOVE_VERIFY_01_next_time_proof_desktop/mobile`，等待實機驗收。
- `love.thread-room`
- `love.silence`
- `love.ritual`
- `career.turn`
- `life.cost`
- `forbidden.threat`
- `forbidden.ending`

## 不要先重生，先修程式／焦點

- `love.face`
- ✅ `love.question` 文案已先修，圖片保留。
- `love.pulse-trial`
- `career.stake-trial`
- `career.ritual`
- `life.mirror`
- `life.body-trial`
- `life.ritual`
- `forbidden.mask`
- `forbidden.heat-trial`
- `finale.choice`

## 下一個實作動作

依 `reviews/04_EXECUTION_DECISION_MASTER_V1.md` 持續執行：

1. 繼續搜尋並定案所有 `🔄 SWAP` 場景的現有替代圖。
2. 對確定 `🎨 GENERATE` 的核心場景製作桌機／手機專用新圖。
3. 完成 hotspot、trial、reactionArt、命牒捲動與 per-image focus。
4. 進入實際網站桌機＋手機逐幕驗收，通過才回寫 `🔒 LOCKED`。

## 驗收誠信規則

GitHub 連接器可核對檔案、故事映射、圖片路徑與 Markdown 預覽引用，但目前不能直接把 WebP 二進位以像素級視覺檢查方式提供給模型。因此在實際瀏覽器／使用者截圖驗收以前，不會把尚未真正看過裁切與細節的頁面誤標成 `🔒 LOCKED`。
