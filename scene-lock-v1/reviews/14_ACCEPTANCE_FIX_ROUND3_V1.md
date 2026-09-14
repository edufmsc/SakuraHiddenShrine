# 《櫻隱》V58｜人工驗收第 3 批修正紀錄

Branch: `review/v58-scene-lock`
Date: 2026-09-14

> 本批原則：不把「看得到」當成完成。操作語意、圖片動作、命牒可讀性、四格判象與故事推進必須同時成立。

## 本批已修

### 1. `love.face`｜點唇卻落在眼下

**根因**
- 舊核心仍有臉頰／唇前圖上 hotspot。
- 現有反應圖的玩家手實際停在眼下／臉側，不是嘴唇前。
- 用文字硬稱「唇前」會造成文圖不一致，即使重新校座標也不合理。

**正式處理**
- `love.face` 維持文字選項模式，舊圖上 hotspot 隱藏。
- 選項改成：
  - `指尖碰她的臉頰`
  - `停在她臉前，不碰`
  - `碰到以前，把手收回`
- 故事與 reaction copy 同步改成「臉前／眼下與臉側」的真實畫面動作。

**狀態**：🟡 需重新實機確認；不再接受「唇前一寸」與眼下畫面的錯配。

---

### 2. 命牒文字看似被裁切

**根因**
- JS 已經用逐字方式寫入。
- 舊 CSS 又對 `.destiny-ink-line.is-writing p/small` 加 `clip-path` 揭露動畫。
- 兩層揭露同時存在，會讓已寫出的字在視覺上暫時只露一部分，看起來像被切掉。

**正式處理**
- 保留 JS 逐字寫入。
- 移除命牒文字第二層 `clip-path` 裁切。
- 命牒 paragraph 強制 `overflow: visible`、取消 mobile line-clamp / max-height。
- 桌機紙張 max-height / padding 重新留足。

**狀態**：🟡 Desktop + Mobile 都需重測長句、最後一筆與四卷總命牒。

---

### 3. 禁卷四選題不是 2×2

**根因**
- `forbidden.bait` 等頁雖有四個選項，但舊版 `choices--whisper` 會強制單欄。
- V51 又把選項設計成一般 VN 的細線列表，因此看起來像心理問卷，而不是命館判象。

**正式處理**
- 下列四選場景桌機全部強制 2×2：
  - `forbidden.pattern`
  - `forbidden.bait`
  - `forbidden.mask`
  - `forbidden.threat`
  - `forbidden.last-proof`
- 四格恢復卡片邊界與命象感。
- `forbidden.bait` 改寫為四象：
  - 欲象｜被強烈渴望
  - 需象｜被需要、被依賴
  - 迷象｜若即若離
  - 救象｜只有我懂對方
- 增加 `禁判` oracle 語氣，避免像一般心理測驗。

**狀態**：🟡 需桌機確認真正呈現 2×2；手機仍採一欄以確保閱讀。

---

### 4. 禁卷背景像有霧面

**根因**
- 舊 V51 為文字安全區在 `.panel-scroll` 疊整片深色漸層。
- 禁卷近身人物圖本身有景深，再加這層漸層會像整張被毛玻璃／霧膜蓋住。
- 禁卷命牒右側 scribe 原始樣式也有 brightness `.88` + 深色 shade。

**正式處理**
- 禁卷 story panel 的大面積漸層改透明。
- 禁卷 scene image 僅保留輕微飽和／對比，不做模糊。
- scene shade 降低。
- 禁卷命牒 scribe 圖提高 brightness，shade 大幅減弱。

**狀態**：🟡 需重新看 `forbidden.bait`、`forbidden.last-proof/result`。

---

## 本批同步補強的故事／算命感

### 禁卷

- `forbidden.pattern`：改為「四象認痕」，不是問誰最壞，而是辨認反覆重演的命痕。
- `forbidden.bait`：改為「近火四象」，九尾明確說此問不是算喜歡誰，而是算哪種感覺最容易偷走判斷。
- 選項 reaction 改成 `禁判・欲象／需象／迷象／救象`。

### 第五卷

- `finale.seal-test` 增加 `真命判`：不是看玩家救不救九尾，而是看最想立刻行動時能不能保留自己的手。
- 最後三分支仍保持不同後果，不再強制匯回同一個「九尾消失」。

---

## 圖片仍不能假裝完成的項目

### 🔴 `finale.cross`
- `finale.relics` 與 `finale.cross` 仍可能連續看到 `finale_four_relics.webp`。
- 兩幕事件不同：一幕是「四痕上桌」，下一幕是「允許玩家推翻九尾判詞」。
- 需要真正獨立的反證圖，不能再只換 focus。

### 🔴 `finale.seal-test`
- `停在第五印前` vs `把手收回` 的故事反應不同，但目前仍缺兩張真正不同專圖。

### 🟠 `love.ritual`
- 三個結果已不再完全共用同一張，但目前是利用現有相符素材拆分，不是同場景連續三態專圖。

### 🟠 Finale complete / refuse Mobile
- 尚無正式 9:16 專用 reaction 圖，目前用 contain 保護，不能視為最終 LOCK。

---

## 下一輪人工驗收順序

1. `love.face`
   - 確認完全沒有圖上錯位 hotspot。
   - 三個文字選項與反應圖動作是否一致。
2. 任一長命牒
   - 等逐字完成後確認沒有半句裁切。
   - Mobile 檢查標題、小標、最後一筆。
3. `forbidden.bait`
   - Desktop 必須為 2×2 四格。
   - 背景不能再有大片霧膜感。
4. 禁卷命牒／結果
   - 右側九尾保持清晰，不能為了紙張閱讀把整張圖壓灰。
5. 第五卷
   - 特別記錄任何「上一幕跟下一幕像同一張」的地方。

## LOCK 規則

本批沒有自動把任何頁面標為 `🔒 LOCKED`。
必須經實際 Desktop / Mobile 畫面確認後才能鎖定。
