# 櫻隱 V58｜Scene Lock V1 進度追蹤

> 基底：V58
>
> 分支：`review/v58-scene-lock`
>
> `main`：本階段不修改。

## 已完成

- ✅ `00_MASTER_SCENE_LOCK_V1.md`：總控規則。
- ✅ `01_LOVE_SCENE_LOCK_V1.md`：緣卷逐幕規格。
- ✅ `02_CAREER_SCENE_LOCK_V1.md`：業卷逐幕規格。
- ✅ `03_LIFE_SCENE_LOCK_V1.md`：命卷逐幕規格。
- ✅ `04_FORBIDDEN_SCENE_LOCK_V1.md`：禁卷逐幕規格。
- ✅ `05_FINALE_SCENE_LOCK_V1.md`：真命卷逐幕規格。
- ✅ `visual-audit/00_VISUAL_AUDIT_INDEX_V1.md`：圖片審核規則與安全區。
- ✅ `visual-audit/01_LOVE_VISUAL_AUDIT_V1.md`：緣卷實際圖片預覽。
- ✅ `visual-audit/02_CAREER_VISUAL_AUDIT_V1.md`：業卷實際圖片預覽。
- ✅ `visual-audit/03_LIFE_VISUAL_AUDIT_V1.md`：命卷實際圖片預覽。
- ✅ `visual-audit/04_FORBIDDEN_VISUAL_AUDIT_V1.md`：禁卷實際圖片預覽。
- ✅ `visual-audit/05_FINALE_VISUAL_AUDIT_V1.md`：真命卷實際圖片預覽。

## 現在所在階段

**視覺審核層已建立，下一階段是逐幕真正定圖。**

順序：

1. 緣卷 14 幕逐幕定圖。
2. 業卷 12 幕逐幕定圖。
3. 命卷 12 幕逐幕定圖。
4. 禁卷 13 幕逐幕定圖。
5. 真命卷 10 幕逐幕定圖。

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

從 **緣卷第 1 幕開始真正定圖**，依序將每幕判定寫回 `01_LOVE_VISUAL_AUDIT_V1.md`；確認後再同步更新 `01_LOVE_SCENE_LOCK_V1.md` 與 `SCENE_LOCK_V58.md`。

在整卷鎖定以前，不修改 V58 正式故事程式。
