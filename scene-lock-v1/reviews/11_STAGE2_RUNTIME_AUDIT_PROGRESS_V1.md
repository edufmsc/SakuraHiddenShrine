# 櫻隱 V58｜第二階段 Desktop＋Mobile 實機驗收進度 V1

> 分支：`review/v58-scene-lock`
> `main`：未修改。
> 狀態：第二階段進行中，尚未完成，尚未有任何新頁面標記 `🔒 LOCKED`。

## 本輪已抓到並修正的阻斷性問題

### 1. 自訂 hotspot 的 MutationObserver 自我回饋循環

第一階段的 `interaction_ui_overrides_v1.js` 原本監看：
- 整棵 `#app` subtree
- `childList`
- `style`

但同一支程式在每次 `sync()` 時又會：
- 新增 hotspot DOM
- 修改 hotspot 的 `left / top / width / height`

因此可能形成：

`MutationObserver → sync → 新增/定位 hotspot → DOM/style mutation → MutationObserver → ...`

可能症狀：
- 手機耗電／CPU 持續高
- hotspot 閃動或重建
- 點擊不穩
- 畫面抖動

**已修正**：
- `appObserver` 只監看 `data-scene / data-mode / data-layout / data-image-fit`
- `choiceObserver` 只監看 `#choices` 的 childList
- 不再監看整棵 app 的 style / subtree

Commit：`37d3c47225bd2e21414e9b2c7a7b47035003e35b`

---

### 2. 新增的 V58 hotspot 可能看得到但點不到

原 `style.css`：

```css
.scene-hotspots {
  pointer-events: none;
}
```

第一階段新增 `.v58-interaction-hotspot` 時沒有明確設定 `pointer-events:auto`。

這會造成第五印／腕線提示圈雖然顯示，但在部分瀏覽器上無法成為點擊目標。

**已修正**：

```css
.v58-interaction-hotspot {
  pointer-events: auto;
}
```

Commit：`69bd25e36a21bde109076928ad6ffef1c1ef4096`

---

### 3. `love.face` fallback 提示仍可能反覆觸發 observer

`applyFaceFallbackCopy()` 原本每次 `sync()` 都直接寫：

```js
hint.textContent = '...';
```

而 `choiceObserver` 監看 `#choices` childList。文字節點被重建時仍可能再次喚醒 observer。

**已修正**：只有文字真的不同才寫入：

```js
if (hint.textContent !== fallbackText) hint.textContent = fallbackText;
```

Commit：`6d1bf8a2183ad4ac638dc7d2c8f02e152944c7c1`

---

### 4. `love.ritual` / `finale.seal-test` hotspot 第一版框太寬

已直接檢視正式 WebP：
- `LOVE_RITUAL_01_seal_thread_desktop.webp`
- `LOVE_RITUAL_01_seal_thread_mobile.webp`
- `FINALE_SEAL_TEST_01_uncontrolled_seal_mobile.webp`

第一版 hotspot 雖能操作，但範圍偏大，可能把祭壇、九尾手部或第五印外圍也算成有效點擊。

**已修正**：
- `love.ritual` Desktop 腕線框收斂為 `{ x:.13, y:.34, w:.30, h:.34 }`
- `love.ritual` Mobile 腕線框收斂為 `{ x:.14, y:.65, w:.42, h:.24 }`
- `finale.seal-test` Mobile 第五印框收斂為 `{ x:.27, y:.39, w:.54, h:.28 }`

Commit：`637798dfc302af2f156d6f1436da2f0f8621c627`

---

### 5. Finale 三分支 reaction 在 Mobile 會被橫圖硬裁

目前三個 reaction：
- `final_complete_dawn.webp`
- `final_scroll_desktop.webp`
- `final_refuse_room.webp`

都只有橫式資產。若直接以 Mobile `cover` 顯示，會切掉人物、手勢或劇情道具。

**已修正成暫時安全模式**：
- `interaction_ui_overrides_v1.js` 會偵測這三張 reaction 圖。
- Mobile 時加上 `.v58-finale-landscape-reaction`。
- `style_overrides_v1.css` 將該狀態改為 `object-fit: contain`，先完整保留橫圖內容，不再暴力裁切。
- Story panel 同時限制在約 34dvh，避免文字吞掉整張圖。

這只是 Mobile 安全顯示方案，**不是正式 9:16 reaction 圖，也不代表可 LOCKED**。

Commits：
- `8c82019de8cd4c346b92e9c0e32a4d0920fad643`
- `f9aaabbb30ee01cceb5c9dd4199f2fd749930fbd`

---

## 已確認的程式契約

### `frame()`
主程式會正確寫入：

```js
el.app.dataset.scene = sceneId;
```

因此 `interaction_ui_overrides_v1.js` 以 `app.dataset.scene` 判斷：
- `love.face`
- `love.ritual`
- `finale.seal-test`

是可成立的。

### `setArt()`
主程式會：
- Desktop 使用 `artData.desktop`
- Mobile `<source>` 使用 `artData.mobile || artData.desktop`
- 寫入 `--desktop-focus / --mobile-focus`
- 保存 `currentArtData`

因此新圖的 Desktop / Mobile 分流架構本身成立。

### `love.ritual` hotspot 對應按鈕
目前圖上腕線 hotspot 搜尋文字 `先別剪`。
`story.js` V54 已把 `unknotted` 選項改為：

`先別剪。看它會不會自己鬆。`

因此 hotspot 能確實找到真正的 choice button，不是死連結。

### Finale 三選一 reaction 圖真的會出現
`renderFinalChoice()` 選擇後會：

```js
fs.reactionArt = STORY.finale.endings[id].art;
fs.phase = 'reaction';
renderFinale();
```

而 `renderFinale()` 在 reaction 狀態會優先使用 `fs.reactionArt`。
因此前一階段修正的三張 ending reaction 路徑確實會在選擇後顯示，之後才進入 final-ending / 總命牒。

---

## 第二階段目前仍不能宣告通過的項目

### A. GitHub Actions Chromium QA 尚未產出報告
已新增：

`.github/workflows/stage2-browser-qa.yml`

原設計會測：
- Desktop 1440×900
- Mobile 390×844
- HTTP / 404
- JS console errors
- script order
- horizontal overflow
- opening image natural size
- `love.ritual` reactionArt
- `finale.seal-test` choices
- finale ending asset paths

但目前 `scene-lock-v1/runtime-qa/STAGE2_BROWSER_QA.md/json` 尚未出現在 branch，因此本紀錄不把未取得的結果假裝成通過。

### B. `love.face` 真正圖上 hotspot
目前仍採 fail-safe：
- 舊錯位 hotspot 隱藏
- 三個文字選項可正常用
- 必須取得真實瀏覽器畫面後才重開臉頰／唇前 hotspot

### C. Finale 三結局 Mobile 專圖
目前已加上 contain 安全模式，避免橫圖被硬裁；但依《櫻隱》既定規則，正式 Mobile 仍應使用重新構圖的 9:16 專圖。

因此：
- 功能路徑可繼續測
- Mobile 暫時不會嚴重裁圖
- 視覺仍不可 LOCKED
- 不拿其他劇情圖亂代替

### D. `love.silence / career.borrowed`
仍需實際網站搭配文字觀看，才能判斷：
- `love.silence` 是否真的需要補「玩家手接回一端」新版圖
- `career.borrowed` 是否能一眼理解「成果署名被換」

---

## 第二階段接下來的判定順序

1. 取得可用的 Desktop / Mobile runtime evidence。
2. 實際驗 `love.face` 並校正臉頰／唇前位置。
3. 實際驗 `love.ritual` / `finale.seal-test` hotspot 是否可點。
4. 跑完整四卷與第五卷，檢查死路／錯圖／404／選項流程。
5. 核對 Mobile 構圖與文字遮擋。
6. 只有通過且使用者確認的頁面才標 `🔒 LOCKED`。

## 本階段目前結論

第二階段持續前進中，目前已修掉：
- observer 自我循環
- hotspot 無法點擊風險
- fallback 文字重複觸發
- 腕線／第五印 hotspot 過大
- Finale 橫式 reaction 在 Mobile 被硬裁

目前剩餘最大阻塞仍是「完整 runtime evidence + love.face 真實座標 + Finale 專用 Mobile reaction 圖」，不是網站核心架構或故事需要重做。
