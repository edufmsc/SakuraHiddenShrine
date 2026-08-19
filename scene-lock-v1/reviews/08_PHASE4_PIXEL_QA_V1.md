# 櫻隱 V58｜第四階段・第一輪像素 QA V1

> 分支：`review/v58-scene-lock`
> 來源：`SakuraHiddenShrine_0819_final_images.zip` 匯入後的 29 張正式 WebP。
> 本輪不是看檔名猜測，而是直接檢查實際圖片像素、人物位置、重要道具與桌機／手機構圖。
> 規則：本輪沒有任何頁面直接標 `🔒 LOCKED`；像素通過仍需網站實機與使用者確認。

---

## 一、本輪總結

### 🟢 圖像本身已達到「可進網站實機驗收」
- `love.turn`
- `love.result`
- `career.result`
- `life.turn`
- `life.result`
- `forbidden.turn`
- `forbidden.result`
- `forbidden.ending`（核心成立，構圖有備註）
- `finale.gate`
- `finale.confession`
- `finale.seal-test` mobile
- `finale.ending`（需先修命牒文字框座標）

### 🟡 可先接網站，但仍需語意／互動驗證
- `career.borrowed`：有成果文件、棋局、紅色牌件與九尾推證據動作，但「成果署名被換成別人」不夠一眼辨識；實機若仍太模糊，再決定是否補強。

### 🟠 不可鎖頁，仍缺重要語意／互動畫面
- `love.silence`：圖片有單方紅線與九尾，但缺「玩家手重新接回一端」的明確證據；目前紅線仍偏亮，無法完整演出「熄滅 → 只有一方重新接回」。
- `love.ritual`：主圖有玩家手、紅線、印章與九尾，視覺品質足夠；但三個 ritual 選擇「鬆開腕線／鏡前剪掉多餘線／把線留在門檻」沒有三種立即反應圖，不能視為互動完成。

---

## 二、逐幕檢查

### 緣之卷

#### A01 `love.silence`
**Desktop**：九尾在右，左側黑暗空間充足；紅線主體清楚。

**Mobile**：人物比例穩定，紅線向下延伸，手機重新構圖不是桌機硬裁。

**問題**：
- 畫面沒有第一人稱玩家手把一端重新接起。
- 紅線從九尾手中延伸，仍偏亮，沒有非常明確的「曾熄滅／只有一方續命」前後差異。

**判定**：🟠 `NEEDS SEMANTIC FIX`。目前可以暫接網站測節奏，但不能鎖頁。

#### A02 `love.turn`
**Desktop**：非常符合反轉：第一人稱玩家手在左前景、紅線纏回玩家、中央古鏡、空椅、鏡中玩家倒影，九尾在右側旁觀。

**Mobile**：鏡、玩家手、紅線與九尾仍可同時辨識。

**判定**：🟢 `READY FOR LIVE CHECK`。

**版面調整**：Desktop 文字改放左上，避開左下玩家手與中央紅線。

#### A03 `love.result`
**Desktop**：大型空白卷軸在左，九尾在右；沒有 AI 亂碼文字，適合命牒用途。

**Mobile**：卷軸與九尾重新直式構圖，並非桌機硬裁。

**判定**：🟢 `READY FOR LIVE CHECK`。

#### A04 `love.ritual`
**Desktop / Mobile**：九尾、玩家手、紅線、印章／祭壇同框，人物與手部品質可用。

**問題**：主圖只完整支援「腕線／封線」動作；沒有把三個 ritual 選擇各自做成明確反應：
1. 腕線鬆開。
2. 鏡前只剪掉多餘段。
3. 紅線留在門檻／門環後玩家收手。

**判定**：🟠 `NEEDS INTERACTION REACTIONS`。

**版面調整**：Desktop 文字改左上，避免遮住左下玩家手與中央祭壇。

---

### 業之卷

#### A05 `career.borrowed`
**Desktop / Mobile**：九尾在策略桌前，手指把紅色牌件／文件推向玩家；棋盤與成果資料清楚。

**問題**：「成果還在、署名被換成別人」主要靠文件與牌件暗示，沒有非常明確的舊署名／新署名位置差異。

**判定**：🟡 `LIVE EVIDENCE CHECK`。先進網站看搭配文案是否足夠；若玩家仍無法一眼懂，再補強，不先重生。

#### A06 `career.result`
**Desktop**：空白命牒在左、九尾在右、棋盤與落子手勢成立。

**Mobile**：卷軸、九尾、棋局仍有分層。

**判定**：🟢 `READY FOR LIVE CHECK`。

---

### 命之卷

#### A07 `life.turn`
**Desktop**：本批最符合故事的反轉圖之一。鏡內有完整人物，鏡外前景人物明顯半透明；九尾正在拼／觸鏡，碎鏡與異象一眼可辨。

**Mobile**：鏡內完整人物、鏡外透明人形、九尾三者都完整保留。

**判定**：🟢 `READY FOR LIVE CHECK`。

**版面調整**：Desktop 文字改右下，避免直接遮住左側鏡內／鏡外反轉證據。

#### A08 `life.result`
**Desktop / Mobile**：九尾、空白命牒、鏡片與命燈語言清楚，沒有醫療化，也沒有可讀 AI 亂碼。

**判定**：🟢 `READY FOR LIVE CHECK`。

---

### 禁之卷

#### A09 `forbidden.turn`
**Desktop**：狐面在中央前景，第一人稱玩家手伸出，紅線直連玩家，九尾明顯退到後方。

**Mobile**：面具仍是主要視覺，九尾退在後方，認主關係成立。

**判定**：🟢 `READY FOR LIVE CHECK`。

#### A10 `forbidden.result`
**Desktop / Mobile**：空白命牒、卸下狐面、九尾與餘火成立，與前面的鏡中誘惑圖明顯不同。

**判定**：🟢 `READY FOR LIVE CHECK`。

#### A11 `forbidden.ending`
**Desktop / Mobile**：門確實已開，門後沒有等待的人；晨光、餘火與狐面都在，收尾語意成立。

**構圖備註**：九尾仍是較大的前景人物，而原先理想方向是讓她更次要／更遠，突出「空門後沒有任何人」。不過目前空門仍然足夠清楚，不需要立即重生。

**判定**：🟢 `READY FOR LIVE CHECK WITH COMPOSITION NOTE`。

---

### 真命卷

#### A12 `finale.gate`
**Desktop / Mobile**：第五門非常清楚；紅線、暗色棋件／球形標記、鏡片、狐面四痕同時向門匯聚。九尾表情第一次明顯驚訝，雙手也有失去控制的停頓感。

**備註**：業卷遺物更像暗色球形棋件，而非非常明確的傳統黑棋，但四痕辨識仍成立。

**判定**：🟢 `READY FOR LIVE CHECK`。

**版面調整**：Desktop 文字改右下，避免左側文字蓋到第五門與四痕匯聚線。

#### A13 `finale.confession`
**Desktop / Mobile**：第一人稱玩家手、九尾輕牽、胸前第五印與脆弱表情都成立。畫面性感，但情緒中心仍是坦白與害怕失去，不是單純情色特寫。

**判定**：🟢 `READY FOR LIVE CHECK`。

#### A14 `finale.seal-test` mobile
**Mobile**：第五印非常大且可作 hotspot，九尾的驚慌、伸手停住、玩家手、四痕都可辨識。

**判定**：🟢 `READY FOR LIVE CHECK / HOTSPOT CALIBRATION`。

#### A15 `finale.ending`
**Desktop**：左側大型空白命牒、九尾右側、四件遺物下方、黎明成立。

**Mobile**：直式重新構圖，卷軸在左下至中段，九尾右上，四件遺物在最下方。

**已發現的程式問題**：原本 `STORY.totalScrollArt.scrollBoxDesktop / scrollBoxMobile` 是針對舊圖的窄橫向紙面，若直接沿用，文字會寫到新圖卷軸外。

**新座標基準**：
- Desktop：`x=.15, y=.31, w=.30, h=.38, rotate=0`
- Mobile：`x=.13, y=.42, w=.30, h=.30, rotate=0`

這組座標是依新圖實際空白紙面重新量過，且考慮常見手機 `cover` 水平裁切後仍留在畫面內。

**判定**：🟢 圖片 `READY`；🔧 程式需先套新 scroll box 才能進實機驗收。

---

## 三、29 張檔案層級檢查

- 29 張檔案皆已成功解壓並可讀取。
- Desktop 均為橫式 16:9 類型；Mobile 均為直式 9:16 類型。
- 本輪未發現圖片毀損、全黑、讀取失敗或錯誤格式。
- 命牒專圖沒有發現明顯 AI 可讀文字被直接畫死在紙面上。
- 多數 close / finale 圖因尾巴互相遮疊，單張靜態畫面不一定能肉眼可靠逐根數出九尾；因此尾數不以「看起來很多」直接視為鎖頁通過，仍保留使用者最終確認。

---

## 四、本輪直接要修的網站項目

1. `finale.ending`：換新總命牒 `scrollBoxDesktop / scrollBoxMobile`。
2. `love.silence`：Desktop 文字區移到左上，避開紅線主節點。
3. `love.turn`：Desktop 文字區移到左上，避開玩家手與鏡中紅線。
4. `love.ritual`：Desktop 文字區移到左上，避開玩家手／祭壇。
5. `life.turn`：Desktop 文字區移到右下，保留鏡內／鏡外反轉完整視覺。
6. `finale.gate`：Desktop 文字區移到右下，避免蓋掉第五門與四痕。
7. 新生成的劇情／操作幕在手機上把故事面板高度由原本最高約 44dvh 收斂到約 34dvh，讓圖片保留更多劇情視覺；內容過長時由既有 `.panel-scroll` 捲動，不刪文字。

---

## 五、本輪不做的事

- 不改 `main`。
- 不刪原圖。
- 不刪 ZIP。
- 不把任何場景直接標 `🔒 LOCKED`。
- 不因一張圖很漂亮就忽略故事必要證據。
- 不猜 `love.face` hotspot；該座標仍要在實際網站畫面校正。

---

## 六、下一個驗收順序

1. 先套本輪確定的 focus / safe-side / scrollBox 修正。
2. 再看 `love.silence`、`career.borrowed`、`love.ritual` 三個語意／互動風險。
3. 接著處理 `finale.seal-test` hotspot 與 `finale.choice` 三分支 reaction。
4. 最後逐頁做 Desktop + Mobile 使用者確認；只有確認後才標 `🔒 LOCKED`。
