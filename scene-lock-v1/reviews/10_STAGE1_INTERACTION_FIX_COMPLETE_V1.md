# 櫻隱 V58｜第一階段互動與例外修正完成紀錄 V1

> 分支：`review/v58-scene-lock`
> `main`：未修改。
> 本階段目標：把剩餘互動與例外先修到「可安全進入 Desktop＋Mobile 實機驗收」；不提前標 `🔒 LOCKED`。

## 本階段已完成

### 1. `love.ritual` 三選一不再直接跳頁
- 三個選擇都加入 `reactionArt` 狀態。
- 玩家選完會先停留看九尾反應，再進入收卷／ending。
- 現有正式圖沒有三張各自專用 reaction 圖，因此本階段不借用錯誤故事圖；保留正式封線主圖，以不同 focus + reaction 文字完成第一版。
- 圖上只開放一個能可靠對應畫面的「腕線」hotspot；剪線與門環因現圖沒有穩定物件，不製造假的圖上按鈕。

### 2. `finale.seal-test` 從線性頁改成真正行為試探
原本流程只是九尾說「別碰」後往下走；現在改成兩個玩家行為：
- `hover-seal`：把手停在第五印前。
- `withdraw-seal`：把手收回來。

兩個選擇都會寫入 behavior，且都不會提前替九尾完成第五印；真正最終三選一仍留在 `finale.choice`。

### 3. 第五印加入實際圖上 hotspot
- `finale.seal-test` 新增圖上第五印觸點。
- 圖上觸點對應「把手停在第五印前」。
- 「把手收回來」刻意保留在下方文字選項，避免同一印記上重疊兩個互相衝突的點擊區。
- hotspot 使用與主程式相同概念的 cover / focus 換算，Desktop 與 Mobile 各有自己的 normalized box。

### 4. `finale.choice` 三分支缺圖 BUG 已修
原本三個 ending 會引用 Repo 內不存在的：
- `final_complete.webp`
- `final_scroll_only.webp`
- `final_refuse.webp`

本階段改成 Repo 內實際存在的：
- complete → `assets/images/active/05_fifth/final_complete_dawn.webp`
- scroll-only → `assets/images/active/05_fifth/final_scroll_desktop.webp`
- refuse → `assets/images/active/05_fifth/final_refuse_room.webp`

因此最後三選一不再因不存在的檔案產生 404 缺圖。

### 5. `love.face` 已知錯位 hotspot 改成 fail-safe
原始主程式仍有：
- cheek：`x=59, y=18, w=13, h=18`
- lips：`x=59, y=34, w=13, h=9`

先前已確認實際會偏到額頭／眼睛。本階段沒有再次猜座標，而是：
- 在 `love.face` 暫時隱藏舊圖上 hotspot。
- 三個下方文字選項完整保留，玩家仍可正常完成場景。
- 畫面提示改成「先使用下方三個選項」。
- 真正臉頰／唇前 hotspot 延到第二階段實際瀏覽器畫面校準後才重新開啟。

這樣比保留一個會選錯答案的點擊區更安全。

### 6. 新增互動視覺提示
新增 `.v58-interaction-hotspot`：
- 微弱、不搶劇情畫面的提示圈。
- hover / keyboard focus 會提高辨識度。
- 手機最小點擊尺寸保護。
- 不改整套原始視覺。

## 新增／修改檔案

### 新增
- `interaction_ui_overrides_v1.js`

### 修改
- `interaction_story_overrides_v1.js`
- `style_overrides_v1.css`
- `index.html`

目前載入順序：

`story.js → story_overrides_v1.js → pixel_overrides_v1.js → interaction_story_overrides_v1.js → script.js → interaction_ui_overrides_v1.js → ui_overrides_v1.js`

## 第一階段完成判定

### ✅ 已完成，可進第二階段實機驗收
- `love.ritual` 三選一 reaction 流程
- `finale.seal-test` 行為選擇
- `finale.seal-test` 第五印圖上 hotspot
- `finale.choice` 三分支反應圖片路徑
- `love.face` 錯位 hotspot 防呆
- Desktop / Mobile hotspot 基礎適配

### ⏭ 刻意移到第二階段
- `love.face` 臉頰／唇前真正座標：必須看實際網站渲染後校準。
- `love.ritual` 是否值得再補三張獨立 reaction 圖：先看現有主圖＋文字反應的實機效果，不先重生。
- `love.silence` 是否必須補「玩家手接回一端」新版圖：先實機看故事＋圖像是否仍不足。
- `career.borrowed` 「換署名」是否足夠一眼看懂：先實機搭配文案判斷。

## 驗收誠信規則

本階段只是把互動程式修到可測，不代表任何頁面已經 `🔒 LOCKED`。
下一階段必須從開場實際跑完整 Desktop + Mobile 流程，通過後才逐頁鎖定。
