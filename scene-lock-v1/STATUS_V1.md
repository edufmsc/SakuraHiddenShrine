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

### 高風險逐幕檢查／執行決策
- ✅ `reviews/02_HIGH_RISK_SCENE_REVIEW_V1.md`
- ✅ `reviews/03_HIGH_RISK_SCENE_REVIEW_V1.md`
- ✅ `reviews/04_EXECUTION_DECISION_MASTER_V1.md`
- ✅ `reviews/05_SIX_SCENE_RESOLUTION_V1.md`

### 實際程式落地
- ✅ 新增 `story_overrides_v1.js`，以小範圍覆寫方式保護 V58 原始 `story.js`。
- ✅ 新增 `style_overrides_v1.css`，只修已確認的命牒閱讀性，不重整原 `style.css`。
- ✅ 新增 `ui_overrides_v1.js`，處理命牒逐字自動跟隨與玩家手動往上閱讀時暫停跟隨。
- ✅ `index.html` 載入順序：`style.css → style_overrides_v1.css`；`story.js → story_overrides_v1.js → script.js → ui_overrides_v1.js`。
- ✅ `love.threshold`：手機改 `LOVE_01_rain_bridge_invite_mobile.webp`。
- ✅ `love.face`：修正「碰臉頰」反應手機圖誤接證據圖；目前先用 `LOVE_03_close_face_bait_mobile.webp`，等待實機確認。
- ✅ `love.question`：四個選項改為自然繁中對話，移除教材式 hint。
- ✅ `love.evidence`：改用 `LOVE_VERIFY_01_next_time_proof_desktop/mobile`，等待實機驗收。
- ✅ `life.threshold`：手機改 `LIFE_01_water_reflection_mobile.webp`。
- ✅ `life.shadow`：手機改 `LIFE_02_paperdoor_shadow_mobile.webp`。
- ✅ `life.room`：恢復獨立直式 `LIFE_recline_mobile_v44.webp`，不再用桌機橫圖硬裁。
- ✅ `forbidden.threshold`：手機改 `FORBIDDEN_01_talisman_wall_fullbody_mobile.webp`。
- ✅ `forbidden.pattern`：先接 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`；由「確定生成」降為「現圖實機驗收，不足才生成」。
- ✅ `forbidden.threat`：手機由 generic `forbidden_018.webp` 改為真正配對的 `FORBIDDEN_03_neck_shadow_threat_mobile.webp`。
- ✅ `finale.choice`：桌機焦點由已知過低的 `50% 58%` 先調回 `50% 42%`，不先重生主圖。
- ✅ 命牒：overflow 時顯示可見捲軸；逐字寫入自動跟到最新內容；玩家主動往上閱讀時不強制拉回底部。

目前 `story_overrides_v1.js` 實作標記：`2026-08-19-d`。

## 本批六幕最新定案

詳見：`reviews/05_SIX_SCENE_RESOLUTION_V1.md`

### 直接升級為 🎨 GENERATE
- `love.silence`：需要真正表現「紅線熄滅／斷掉 → 誰重新接回」的專用畫面，避免挪用 trial VERIFY 圖。
- `love.ritual`：目前 desktop 只是 `FX_004.png` 純道具、mobile 又借其他緣卷圖；改為九尾＋紅線＋儀式道具專圖，並規劃三種 ritual 狀態 reactionArt。
- `forbidden.ending`：現況重複 `FORBIDDEN_mirror_gaze_v44.webp / forbidden_020.webp`，與 `forbidden.mirror`／`forbidden.result` 形成視覺重複；改做真正「卸面後／門後無人／餘火或天將亮」收尾圖。

### 先做像素／實機驗收，不足立刻 🎨 GENERATE
- `career.turn`：現圖 `career_new_01.webp / career_015.webp` 必須真的看見「抬起棋盤＋盤底多手＋黑棋／玩家手」。任一缺失就生成。
- `life.cost`：現圖 `life_003.webp / life_020.webp` 必須真的看見多個狀態燈／鏡片逐步變暗，形成「代價被記帳」。不足就生成。
- `forbidden.threat`：已先修真正配對 mobile；實機仍要確認是否真的表現四個不同人物／多影重演，而不只是近頸威脅照。不足仍生成。

## 重要資產重複發現

### `love.thread-room`
- `love_006.webp`
- `LOVE_empty_threads.webp`

兩個檔案使用相同 blob SHA：`06c716aaca5f8c2afb1beb0d81a4e103f8bd786a`。

因此 `love.thread-room` 不能再把現圖當成獨立「線室」正式圖：**🔄 SWAP 優先；找不到真正「鏡＋未寄信件＋單方紅線」素材就 🎨 GENERATE。**

### 其他已知同圖不同檔名

禁卷：
- `FORBIDDEN_mask.webp` = `FORBIDDEN_mask_reveal_v44.webp` = `forbidden_014.webp`
- `FORBIDDEN_close_right.webp` = `FORBIDDEN_mirror_gaze_v44.webp`
- `FORBIDDEN_soft_bait_v44.webp` = `FORBIDDEN_close_left.webp` = `forbidden_009.webp`
- `FORBIDDEN_dark_gaze_v44.webp` = `FORBIDDEN_wet_gaze.webp` = `forbidden_013.webp`
- `FORBIDDEN_seated_bait_v44.webp` = `FORBIDDEN_seated_right.webp`

命卷：
- `LIFE_shards.webp` = `LIFE_broken_mirror_v44.webp`
- `LIFE_turn_back.webp` = `LIFE_wet_corridor_v44.webp`
- `LIFE_recline_mobile.webp` = `life_019.webp`
- `life_mirror_double_face.webp` = `LIFE_03_mirror_double_face_v39.webp`

後續不得因檔名不同就把相同 blob 當成不同劇情素材。

## `love.face` hotspot 根因

`script.js` 已有依圖片實際 cover 尺寸換算的 `renderedImageMetrics()` / `layoutSceneHotspots()`，hotspot 會以 normalized 百分比乘上實際渲染圖片尺寸。

所以目前「臉頰點到額頭／眼睛」主因不是 RWD 縮放公式，而是 scene 本身硬寫的原始座標：
- cheek：`x=59, y=18, w=13, h=18`
- lips：`x=59, y=34, w=13, h=9`

沒有真正看到實際圖片像素前不猜新座標；實機畫面確認後再精準校正。

## 現在所在階段

**規格、視覺審核、高風險定向、多批素材錯配修正，以及第一個命牒 UI 根因修正已完成。六幕素材決策也已定案，現在正式進入「真正缺圖生成規格 → trial / reaction / hotspot 精修 → 實機鎖頁」。**

### 每幕最終判定
- `✅ USE`：現圖直接使用。
- `🟡 ADJUST`：現圖保留，修 focus／安全區／手機構圖／hotspot／文字。
- `🔄 SWAP`：從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材沒有該故事動作，生成專用新圖。
- `🔧 BUILD`：程式／互動需修正。
- `🔒 LOCKED`：必須實際桌機＋手機＋互動驗收通過。

## 確定高優先生成

### 緣
- `love.silence`
- `love.turn`
- `love.result`
- `love.ritual`
- `love.thread-room`（若無真正對題現圖）

### 業
- `career.borrowed`
- `career.result`
- `career.turn`（像素驗收不合格時）

### 命
- `life.turn`
- `life.result`
- `life.cost`（像素驗收不合格時）

### 禁
- `forbidden.turn`
- `forbidden.result`
- `forbidden.ending`
- `forbidden.threat`（真正配對圖實機仍不合格時）

### 真命
- `finale.gate`
- `finale.confession`
- `finale.seal-test` 手機
- `finale.ending`

## 已接現有替代圖、待實機驗收

- ✅ `love.evidence` → `LOVE_VERIFY_01_next_time_proof_desktop/mobile`
- ✅ `forbidden.pattern` → `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`
- ✅ `forbidden.threat` mobile → `FORBIDDEN_03_neck_shadow_threat_mobile.webp`
- ✅ `love.threshold` mobile → 專用配對圖
- ✅ `life.threshold` mobile → 專用配對圖
- ✅ `life.shadow` mobile → 專用配對圖
- ✅ `life.room` mobile → 獨立直式圖
- ✅ `forbidden.threshold` mobile → 專用配對圖

## 不要先重生，先修程式／焦點

- `love.face` → 圖片錯配已修；hotspot 等實際畫面校座標。
- ✅ `love.question` → 文案已修，圖片保留。
- `love.pulse-trial`
- `career.stake-trial`
- `career.ritual`
- `life.mirror`
- `life.body-trial`
- `life.ritual`
- `forbidden.mask`
- `forbidden.heat-trial`
- ✅ `finale.choice` → 第一輪 focus 已修，待實機微調與三分支 reaction。
- ✅ destiny reader → 捲軸／自動跟隨第一輪已修，待實機驗證。

## 下一個實作動作

1. 依目前已定案的 `🎨 GENERATE` 清單，先製作真正缺圖場景的桌機／手機圖規格。
2. 優先：`love.silence → love.ritual → forbidden.ending → love.turn → career.borrowed → life.turn → forbidden.turn → finale.gate → finale.confession`。
3. 再處理四卷命牒與總命牒。
4. 完成各卷 trial、reactionArt 與剩餘 per-image focus。
5. 實際網站桌機＋手機逐幕驗收；`love.face` hotspot 在實機畫面精準校正。
6. 全部通過才回寫 `🔒 LOCKED`。

## 驗收誠信規則

GitHub 連接器可核對檔案、故事映射、圖片路徑、檔案 SHA 與程式結構，但目前不能把 WebP 二進位直接提供像素級視覺檢查。因此在實際瀏覽器／使用者截圖驗收以前，不會把尚未真正看過裁切與人物細節的頁面誤標成 `🔒 LOCKED`。
