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
目前三個 ending reaction 已改成 Repo 內存在的圖片，404 問題已排除；但目前這三張仍是同一張圖同時供 Desktop / Mobile 使用。

依《櫻隱》既定規則，Mobile 理想上必須重新構圖，不應把 Desktop 橫圖直接硬裁。因此：
- 功能路徑可測
- Mobile 視覺尚不可鎖定
- 不在本階段沒有專圖的情況下亂拿其他劇情圖替代

### D. `love.silence / career.borrowed`
仍需實際網站搭配文字觀看，才能判斷：
- `love.silence` 是否真的需要補「玩家手接回一端」新版圖
- `career.borrowed` 是否能一眼理解「成果署名被換」

---

## 第二階段接下來的判定順序

1. 先取得可用的 Desktop / Mobile runtime evidence。
2. 實際驗 `love.face` 並校正臉頰／唇前位置。
3. 實際驗 `love.ritual` / `finale.seal-test` hotspot 是否可點。
4. 跑完整四卷與第五卷，檢查死路／錯圖／404／選項流程。
5. 核對 Mobile 構圖與文字遮擋。
6. 只有通過且使用者確認的頁面才標 `🔒 LOCKED`。

## 本階段目前結論

第二階段不是停滯；在 runtime audit 中已先修掉 3 個可能造成實際操作異常的程式問題。
目前最主要的剩餘阻塞是取得真正的瀏覽器畫面證據，而不是再大幅改寫故事或重新整理網站架構。
