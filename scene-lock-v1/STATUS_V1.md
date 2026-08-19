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

### 實際程式落地
- ✅ 新增 `story_overrides_v1.js`，以小範圍覆寫方式保護 V58 原始 `story.js`。
- ✅ `index.html` 載入順序為 `story.js → story_overrides_v1.js → script.js`。
- ✅ `love.threshold`：手機改 `LOVE_01_rain_bridge_invite_mobile.webp`。
- ✅ `love.face`：修正「碰臉頰」反應手機圖誤接 `LOVE_VERIFY_01_next_time_proof_mobile.webp` 的錯配；目前先用 `LOVE_03_close_face_bait_mobile.webp`，等待實機確認。
- ✅ `love.question`：四個選項改為自然繁中對話，移除教材式 hint。
- ✅ `love.evidence`：改用 `LOVE_VERIFY_01_next_time_proof_desktop/mobile`，等待實機驗收。
- ✅ `life.threshold`：手機改真正配對的 `LIFE_01_water_reflection_mobile.webp`。
- ✅ `life.shadow`：手機改真正配對的 `LIFE_02_paperdoor_shadow_mobile.webp`。
- ✅ `life.room`：恢復原先獨立直式 `LIFE_recline_mobile_v44.webp`，不再用桌機橫圖硬裁。
- ✅ `forbidden.threshold`：手機改真正配對的 `FORBIDDEN_01_talisman_wall_fullbody_mobile.webp`。
- ✅ `forbidden.pattern`：先接現有 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`；由「確定生成」降為「現圖實機驗收，不足才生成」。

目前 `story_overrides_v1.js` 實作標記：`2026-08-19-b`。

## 重要新發現

### `love.thread-room` 現圖其實是重複素材

GitHub 資產目錄顯示：
- `love_006.webp`
- `LOVE_empty_threads.webp`

兩個檔案使用相同 blob SHA：`06c716aaca5f8c2afb1beb0d81a4e103f8bd786a`。

也就是 `love.thread-room` 桌機現圖實際上與 `love.face`「收回手後的空線」素材完全相同，不可能同時當作「鏡＋未寄信件＋單方紅線＋另一端空白」的專屬線室正式圖。

因此 `love.thread-room` 從「先保留重驗」提升為：**🔄 SWAP 優先；若現有素材找不到完整對題圖，直接 🎨 GENERATE。**

## 現在所在階段

**規格、視覺審核、高風險定向與兩批低風險程式修正已完成。現在持續進行：「現有素材定案 → 真正缺圖生成 → hotspot / trial / focus / 命牒修正 → 實機鎖頁」。**

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
- `forbidden.turn`
- `forbidden.result`

### 真命
- `finale.gate`
- `finale.confession`
- `finale.seal-test` 手機
- `finale.ending`

> `forbidden.pattern` 暫時移出本區：現有 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile` 已接入，先做實機驗收。

## 已接現有替代圖、待實機驗收

- ✅ `love.evidence` → `LOVE_VERIFY_01_next_time_proof_desktop/mobile`
- ✅ `forbidden.pattern` → `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`
- ✅ `love.threshold` mobile → 專用配對圖
- ✅ `life.threshold` mobile → 專用配對圖
- ✅ `life.shadow` mobile → 專用配對圖
- ✅ `life.room` mobile → 獨立直式圖
- ✅ `forbidden.threshold` mobile → 專用配對圖

## 下一批現有素材檢查

- `love.thread-room` → 已知現圖重複，不再接受現況。
- `love.silence`
- `love.ritual`
- `career.turn`
- `life.cost`
- `forbidden.threat`
- `forbidden.ending`

## 不要先重生，先修程式／焦點

- `love.face` → 圖片錯配已先修；hotspot 尚未根治。
- ✅ `love.question` → 文案已修，圖片保留。
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

1. 繼續定案所有 `🔄 SWAP` 場景，避免能用現圖卻重複生圖。
2. `love.thread-room` 若找不到真正「鏡＋信件＋單方紅線」素材，直接列入生圖。
3. 對確定 `🎨 GENERATE` 的核心場景製作桌機／手機專用新圖。
4. 修 `love.face` hotspot、各卷 trial、reactionArt、命牒捲動與 per-image focus。
5. 實際網站桌機＋手機逐幕驗收，通過才回寫 `🔒 LOCKED`。

## 驗收誠信規則

GitHub 連接器可核對檔案、故事映射、圖片路徑、檔案 SHA 與 Markdown 預覽引用，但目前不能把 WebP 二進位直接提供像素級視覺檢查。因此在實際瀏覽器／使用者截圖驗收以前，不會把尚未真正看過裁切與人物細節的頁面誤標成 `🔒 LOCKED`。
