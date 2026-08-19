# 櫻隱 V58｜Scene Lock V1 進度追蹤

> 基底：V58
>
> 分支：`review/v58-scene-lock`
>
> `main`：本階段不修改。

## 已完成

### 逐幕規格
- ✅ `00_MASTER_SCENE_LOCK_V1.md`：總控規則。
- ✅ `01_LOVE_SCENE_LOCK_V1.md`：緣卷逐幕規格。
- ✅ `02_CAREER_SCENE_LOCK_V1.md`：業卷逐幕規格。
- ✅ `03_LIFE_SCENE_LOCK_V1.md`：命卷逐幕規格。
- ✅ `04_FORBIDDEN_SCENE_LOCK_V1.md`：禁卷逐幕規格。
- ✅ `05_FINALE_SCENE_LOCK_V1.md`：真命卷逐幕規格。

### 圖片視覺審核層
- ✅ `visual-audit/00_VISUAL_AUDIT_INDEX_V1.md`：圖片審核規則與安全區。
- ✅ `visual-audit/01_LOVE_VISUAL_AUDIT_V1.md`：緣卷實際圖片預覽。
- ✅ `visual-audit/02_CAREER_VISUAL_AUDIT_V1.md`：業卷實際圖片預覽。
- ✅ `visual-audit/03_LIFE_VISUAL_AUDIT_V1.md`：命卷實際圖片預覽。
- ✅ `visual-audit/04_FORBIDDEN_VISUAL_AUDIT_V1.md`：禁卷實際圖片預覽。
- ✅ `visual-audit/05_FINALE_VISUAL_AUDIT_V1.md`：真命卷實際圖片預覽。

### Production 製作工作表
- ✅ `production/01_LOVE_PRODUCTION_WORKLIST_V1.md`：緣卷正式製作清單。
- ✅ `production/02_CAREER_PRODUCTION_WORKLIST_V1.md`：業卷正式製作清單。
- ⬜ `production/03_LIFE_PRODUCTION_WORKLIST_V1.md`
- ⬜ `production/04_FORBIDDEN_PRODUCTION_WORKLIST_V1.md`
- ⬜ `production/05_FINALE_PRODUCTION_WORKLIST_V1.md`

## 現在所在階段

**Production 製作工作表建立中。**

目前完成：緣 → 業。

接下來依序：

1. 命卷 Production 工作表。
2. 禁卷 Production 工作表。
3. 真命卷 Production 工作表。
4. 五卷工作表齊全後，回到緣卷做真正逐幕定圖。

每幕最終狀態只有四種：

- `✅ USE`：現圖直接使用。
- `🟡 ADJUST`：現圖保留，修 focus／安全區／手機構圖／hotspot。
- `🔄 SWAP`：從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材沒有該故事動作，生成專用新圖。

只有「故事＋圖片＋桌機＋手機＋文字安全區＋互動」全部通過後，才改成 `🔒 LOCKED`。

## 目前最高優先圖

### 緣卷
- `love.evidence`
- `love.thread-room`
- `love.silence`
- `love.turn`
- `love.result`
- `love.ritual`

### 業卷
- `career.borrowed`
- `career.turn`
- `career.stake-trial`
- `career.result`
- `career.ritual`

### 命卷
- `life.double`
- `life.turn`
- `life.body-trial`
- `life.result`

### 禁卷
- `forbidden.pattern`
- `forbidden.turn`
- `forbidden.result`
- `forbidden.ritual`
- `forbidden.ending`

### 真命卷
- `finale.verdicts`
- `finale.confession`
- `finale.choice`
- `finale.ending`

## 下一個實作動作

建立 `production/03_LIFE_PRODUCTION_WORKLIST_V1.md`，把命卷逐幕轉成正式製作清單。

在五卷 Production 工作表完成、且整卷鎖定以前，不修改 V58 正式故事程式。
