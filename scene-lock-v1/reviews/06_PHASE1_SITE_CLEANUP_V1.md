# 櫻隱 V58｜第一段網站整理完成紀錄 V1

> 分支：`review/v58-scene-lock`
> 目標：在最後生圖凍結前，先把「不需要新圖即可修正」的網站問題處理到能處理的程度。
> 原則：不碰 `main`；不重整 V58 原始 `story.js / script.js / style.css`；能用小型 override 解決就不大改。

---

## 一、本段已完成的網站修正

### 1. 命牒閱讀元件
- ✅ overflow 時顯示可見 scrollbar。
- ✅ 逐字寫入時，若玩家在底部，自動跟隨最新文字。
- ✅ 玩家主動往上閱讀時停止強制拉回。
- ✅ 回到底部後恢復自動跟隨。
- ✅ `destinyPaper` 加上 `tabindex="0"`，可直接鍵盤聚焦捲動。
- ✅ 加上 focus-visible 樣式，不改原命牒美術語言。

### 2. 網站版本與控制語意
- ✅ HTML `<title>` 由舊 `V54` 修正為 `V58`，與 `VERSION.txt = 58` 一致。
- ✅ 手機／桌機重新開始按鈕由模糊的 `×` 改為 `重`，避免和「關閉」混淆。
- ✅ toolbar 控制補齊 aria-label。
- ✅ `牒` 與 `重` 在收合選單中做輕量語意區分，不重做整套配色。
- ✅ 手機功能選單可點外側收合。
- ✅ 手機／外接鍵盤可用 `Esc` 關閉功能選單並回到「選」。
- ✅ 「選」會依開／關狀態同步 `aria-expanded`、aria-label 與 title。
- ✅ 從手機切回桌機寬度時，自動清掉殘留的 `menu-open` 狀態。

### 3. 手機圖片明確錯配
- ✅ `love.threshold` mobile → `LOVE_01_rain_bridge_invite_mobile.webp`
- ✅ `love.face` touch reaction mobile 不再誤接 `LOVE_VERIFY_01` 證據圖。
- ✅ `life.threshold` mobile → `LIFE_01_water_reflection_mobile.webp`
- ✅ `life.shadow` mobile → `LIFE_02_paperdoor_shadow_mobile.webp`
- ✅ `life.room` mobile → `LIFE_recline_mobile_v44.webp`
- ✅ `forbidden.threshold` mobile → `FORBIDDEN_01_talisman_wall_fullbody_mobile.webp`
- ✅ `forbidden.threat` mobile → `FORBIDDEN_03_neck_shadow_threat_mobile.webp`

### 4. 現有素材可直接替換的場景
- ✅ `love.evidence` → `LOVE_VERIFY_01_next_time_proof_desktop/mobile`
- ✅ `forbidden.pattern` → `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`
- ✅ `finale.choice` 第一輪 desktop focus：`50% 58% → 50% 42%`

### 5. 文案型非圖片問題
- ✅ `love.question` 四個選項改為自然繁中玩家台詞。
- ✅ 移除教材／心理測驗式 hint。

---

## 二、已確認但本段不亂修的項目

### `love.face` hotspot
原 `script.js` 已有 `renderedImageMetrics()` / `layoutSceneHotspots()`，會依 `cover`、focus、實際 image metrics 換算 normalized hotspot。

因此問題不是 RWD 座標系統不存在，而是 scene 目前寫死的位置本身不準：
- cheek：`x=59, y=18, w=13, h=18`
- lips：`x=59, y=34, w=13, h=9`

**沒有真正看到網站實際圖片像素時，不猜新座標。**
這會留到回填圖片／實機畫面時一次精準校正。

### 其他 hotspot / trial
- `forbidden.wrist`、`love.last-proof` 已有 normalized hotspot 流程。
- branch trial 已有 `variantArt / reactionArt` 資料層與 mobile 專圖清單。
- 真正需要的是逐幕實機驗證，不是先重寫整套互動引擎。

---

## 三、重複圖片盤點結論

已確認 GitHub active 資產存在同 blob 不同檔名；後續不得因檔名不同就視為新畫面。

### 緣
- `love_006.webp` = `LOVE_empty_threads.webp`
  - `love.thread-room` 因此不能接受現況，需換真正對題圖或生成。

### 命
- `LIFE_shards.webp` = `LIFE_broken_mirror_v44.webp`
- `LIFE_turn_back.webp` = `LIFE_wet_corridor_v44.webp`
- `LIFE_recline_mobile.webp` = `life_019.webp`
- `life_mirror_double_face.webp` = `LIFE_03_mirror_double_face_v39.webp`

### 禁
- `FORBIDDEN_mask.webp` = `FORBIDDEN_mask_reveal_v44.webp` = `forbidden_014.webp`
- `FORBIDDEN_close_right.webp` = `FORBIDDEN_mirror_gaze_v44.webp`
- `FORBIDDEN_soft_bait_v44.webp` = `FORBIDDEN_close_left.webp` = `forbidden_009.webp`
- `FORBIDDEN_dark_gaze_v44.webp` = `FORBIDDEN_wet_gaze.webp` = `forbidden_013.webp`
- `FORBIDDEN_seated_bait_v44.webp` = `FORBIDDEN_seated_right.webp`

---

## 四、第一段正式結論

### 已完成
- ✅ 命牒可讀性第一輪。
- ✅ 版本標題與 toolbar 控制語意。
- ✅ 手機功能選單關閉／焦點語意補齊。
- ✅ 一批明確手機錯配。
- ✅ 可直接用現有語意圖替換的頁面。
- ✅ 已知文案型測驗感問題。
- ✅ 重複 blob 盤點規則。

### 留到實機／像素驗收
- `love.face` hotspot 精準座標。
- per-image focus 最後 2–5% 微調。
- branch trial 所有 variant/reaction 的實際構圖。
- 第一批 `🔒 LOCKED` 正式確認。

## 五、第一段狀態

# ✅ PHASE 1 COMPLETE

第一段網站非生圖問題已收斂到目前可安全處理的程度。
沒有實際像素就不能精準處理的項目，已明確移到最終回填驗收，不再阻擋缺圖凍結。

### 下一段
第二段基準：`reviews/07_PHASE2_IMAGE_FREEZE_V1.md`

**第二段直接做「五卷最後缺圖凍結」：每一幕只留下 `保留現圖 / 只修程式 / 必須生圖 / 條件式生圖`，並凍結桌機與手機生圖數量。**
