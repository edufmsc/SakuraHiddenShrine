# 櫻隱 V58｜Scene Lock V1 進度追蹤

> 基底：V58
>
> 分支：`review/v58-scene-lock`
>
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

## 現在所在階段

**五卷 Production 規格已全部完成。現在正式進入「逐幕最終定圖＋第一批鎖頁」。**

每幕最終判定：

- `✅ USE`：現圖直接使用。
- `🟡 ADJUST`：現圖保留，修 focus／安全區／手機構圖／hotspot／文字。
- `🔄 SWAP`：從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材沒有該故事動作，生成專用新圖。
- `🔧 BUILD`：程式／互動需修正。

只有「故事＋圖片＋桌機＋手機＋文字安全區＋互動」全部通過後，才可改成 `🔒 LOCKED`。

## 第一批鎖頁候選

依 `production/LOCK_CANDIDATES_MASTER_V1.md`：

1. `love.wrist`
2. `love.proximity`
3. `career.name`
4. `career.threshold`
5. `life.double`
6. `life.room`
7. `forbidden.wrist`
8. `forbidden.bait`
9. `forbidden.last-proof`
10. `finale.relics`
11. `finale.withdrawal`

## 最高優先生圖／專用圖

依 `production/IMAGE_GENERATION_MASTER_V1.md`：

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

## 下一個實作動作

不再建立新的規格層。接下來直接從第一批鎖頁候選開始，逐幕核對現圖、焦點、安全區、手機構圖與互動，通過的頁面才同步更新：

- 對應 `visual-audit/*.md`
- 對應各卷 `*_SCENE_LOCK_V1.md`
- `SCENE_LOCK_V58.md`

高風險頁則依 `IMAGE_GENERATION_MASTER_V1.md` 先查現有素材，確認沒有合適圖後才生成。

在整卷視覺與互動尚未鎖定以前，不修改 V58 正式故事程式。