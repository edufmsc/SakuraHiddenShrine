# 櫻隱 V58｜互動程式修改第一輪 V1

> 分支：`review/v58-scene-lock`
> 本輪只修改 review 分支，不碰 `main`。

## 已完成

### 1. `love.ritual` 三選擇不再直接跳頁
原本三個封線選擇沒有 `reactionArt`，`script.js` 的既有 `choose()` 會直接前進到下一幕，只把反應文字帶到後面。

本輪透過 `interaction_story_overrides_v1.js` 為以下三個選擇建立 reaction state：
- `unknotted`
- `mirror-cut`
- `door-knot`

目前因為沒有三張各自專用的新圖，所以先保留同一張正式封線主圖，利用不同 focus ＋ 原有 reaction 文案讓玩家在同一幕看見選擇後的即時回應。沒有借用其他劇情圖片。

狀態：🔧 程式流程完成；🎨 若未來要三種完全不同視覺，仍需專用 reaction 圖。

### 2. `finale.seal-test` 從線性說明改成行為選擇
原本 `renderSealTest()` 只有固定三句話後前進，玩家實際上沒有在第五印前留下行為。

現在改成一般 ritual scene，提供兩個真正可記錄的動作：
- `hover-seal`：把手停在第五印前，不碰。
  - `restraint +2`
  - `agency +1`
- `withdraw-seal`：把手收回來。
  - `agency +2`
  - `restraint +1`

兩條路都不會在此時替九尾完成第五印；真正的 `complete / scroll-only / refuse` 三路結局仍留在 `finale.choice`。

狀態：🔧 行為流程完成；下一輪再做第五印圖片 hotspot。

### 3. 修正 `finale.choice` 三分支缺圖 BUG
程式原本的 endings 會透過 `v49()` 指向：
- `final_complete.webp`
- `final_scroll_only.webp`
- `final_refuse.webp`

目前 `assets/images/active/05_fifth/` 裡沒有這三個檔案，所以實際走到三路 reaction 時存在 404 缺圖風險。

本輪改用 Repo 內確實存在的資產：
- `complete` → `final_complete_dawn.webp`
- `scroll-only` → `final_scroll_desktop.webp`
- `refuse` → `final_refuse_room.webp`

並分別設定 safe-side / focus / heroPresence。

狀態：✅ 404 路徑問題已排除；三張舊資產仍需下一輪實際像素驗收。

## 新增檔案

`interaction_story_overrides_v1.js`

載入順序：

```text
story.js
→ story_overrides_v1.js
→ pixel_overrides_v1.js
→ interaction_story_overrides_v1.js
→ script.js
→ ui_overrides_v1.js
```

所有 story data patch 都在 `script.js` 建立 `const STORY = window.SHRINE_STORY` 以前完成，因此可直接沿用既有 `choose()` / `chooseFinaleScene()` / reaction phase 流程，不需要大改主程式。

## 本輪刻意沒有做

- 沒有猜 `love.face` hotspot。
- 沒有把 `finale.seal-test` 的 hotspot 座標硬寫進去；下一輪會依已看到的手機第五印圖片與桌機圖分別校正。
- 沒有把 `love.ritual` 三種反應假裝成三張不同圖片。
- 沒有標任何 `🔒 LOCKED`。
- 沒有刪除舊圖或 ZIP。
- 沒有修改 `main`。

## 下一步

1. `finale.seal-test`：加入第五印可點區，並保留下方文字選項作無障礙備援。
2. `finale.choice`：像素檢查 complete / scroll-only / refuse 三張既有 reaction 圖。
3. `love.ritual`：實機驗證三個 reaction state 的節奏；若同圖換焦點仍不足，再列為三張專用 reaction 生圖，而不是硬借其他幕。
4. `love.face`：等實際網站畫面後精準校臉頰／唇前 hotspot。
