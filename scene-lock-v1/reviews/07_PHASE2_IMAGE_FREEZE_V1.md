# 櫻隱 V58｜第二段・最後缺圖凍結 V1

> 分支：`review/v58-scene-lock`
> 目的：在最終 Prompt 彙整前，凍結「保留現圖／只修程式／確定生圖／條件式生圖」。
> 規則：從本檔開始，不再因為檔名漂亮或同圖不同名而新增生圖需求；只有實機像素證明現圖不合格，才可啟動條件式項目。

---

## 一、凍結結論

### 確定必生
- **15 個場景目標**
- 建議核心劇情與命牒圖都分桌機／手機製作
- 其中 `finale.seal-test` 目前只缺手機專用圖
- 因此目前最低生圖量：**29 張圖片檔**

### 條件式補生
- **4 個場景目標**
- 若實機證明現圖缺必要劇情元素，再各補桌機＋手機
- 最多增加 **8 張圖片檔**

### 最壞情況上限
- **19 個場景目標**
- **37 張圖片檔**

> 這是目前 V58 Scene Lock 的正式生圖範圍。第三段只會補齊 Prompt、構圖、檔名與生成順序，不再重新擴張範圍。

---

## 二、A 級｜確定必生 15 幕

### 緣之卷｜4 幕

#### A01 `love.silence`
- 桌機：必生
- 手機：必生
- 核心：紅線熄滅／斷掉，只有一方仍在維持。

#### A02 `love.turn`
- 桌機：必生
- 手機：必生
- 核心：紅線從鏡後反咬回玩家；空椅／玩家象徵／九尾旁觀。

#### A03 `love.result`
- 桌機：必生
- 手機：必生
- 核心：緣卷命牒專圖；桌機左側命牒安全區，九尾在右。

#### A04 `love.ritual`
- 桌機：必生
- 手機：必生
- 核心：九尾＋紅線＋封線儀式道具，不能再用純道具 `FX_004.png`。

### 業之卷｜2 幕

#### A05 `career.borrowed`
- 桌機：必生
- 手機：必生
- 核心：成果仍在，但名字／印章被換；九尾把證據推向玩家。

#### A06 `career.result`
- 桌機：必生
- 手機：必生
- 核心：業卷命牒專圖；棋／署名元素與命牒安全區。

### 命之卷｜2 幕

#### A07 `life.turn`
- 桌機：必生
- 手機：必生
- 核心：鏡內完整替身、鏡外真身透明；玩家一眼看懂誰才是替身。

#### A08 `life.result`
- 桌機：必生
- 手機：必生
- 核心：命卷命牒專圖；鏡片／命燈語言＋命牒安全區。

### 禁之卷｜3 幕

#### A09 `forbidden.turn`
- 桌機：必生
- 手機：必生
- 核心：狐面沿紅線停在玩家面前，九尾退遠，面具認主。

#### A10 `forbidden.result`
- 桌機：必生
- 手機：必生
- 核心：禁卷命牒專圖；不可再用有霧化問題或前幕鏡圖。

#### A11 `forbidden.ending`
- 桌機：必生
- 手機：必生
- 核心：卸面後、門後無人、餘火／將亮未亮；真正收尾，不再重複鏡圖。

### 真命卷｜4 幕

#### A12 `finale.gate`
- 桌機：必生
- 手機：必生
- 核心：無字第五門＋紅線／玄棋／鏡片／狐面四痕同時發熱並指向九尾；她第一次失去從容。

#### A13 `finale.confession`
- 桌機：必生
- 手機：必生
- 核心：九尾第一次真正脆弱坦白，牽玩家手貼向封印，力道停在可抽回的位置。

#### A14 `finale.seal-test`
- 桌機：保留現圖先驗
- 手機：**必生**
- 核心：第五印在身前形成，九尾想阻止卻不敢碰；手機不可再借禁卷泛用圖。

#### A15 `finale.ending`
- 桌機：必生
- 手機：必生
- 核心：真結總命牒；桌機左 38–43% 完整紙面安全區、九尾右側，從構圖源頭解決遮擋衝突。

---

## 三、B 級｜條件式生圖 4 幕

這四幕**不先生成**。只有實機／截圖證明現圖缺少必要敘事元素，才轉 A 級。

### B01 `love.thread-room`
- 現況已確認 `love_006.webp` 與 `LOVE_empty_threads.webp` 是同 blob。
- 若找不到真正有「鏡＋未寄信件＋單方紅線＋另一側沒有第二隻手」的現有圖：生桌機＋手機。

### B02 `career.turn`
- 現圖必須同時看見：棋盤被抬起、盤底多雙手、唯一黑棋／玩家手。
- 少任何一項：生桌機＋手機。

### B03 `life.cost`
- 現圖必須能看見多盞命燈／狀態逐步變暗，形成「代價被記帳」。
- 若只是普通人物／燈景：生桌機＋手機。

### B04 `forbidden.threat`
- 已修成真正配對 mobile。
- 但畫面仍必須看見「四個不同的人／同一瞬間重演」。
- 若仍只是近頸威脅：生桌機＋手機。

---

## 四、C 級｜保留現圖，只做實機／focus／安全區

### 緣
- `love.threshold`
- `love.wrist`
- `love.evidence`（已換 `LOVE_VERIFY_01`）
- `love.proximity`
- `love.last-proof`
- `love.ending`

### 業
- `career.threshold`
- `career.name`
- `career.black-piece`
- `career.exchange`
- `career.pressure`
- `career.last-proof`
- `career.ending`

### 命
- `life.threshold`
- `life.shadow`
- `life.room`
- `life.double`
- `life.last-proof`
- `life.ending`

### 禁
- `forbidden.threshold`
- `forbidden.pattern`（已換 `FORBIDDEN_VERIFY_01`，先驗）
- `forbidden.wrist`
- `forbidden.bait`
- `forbidden.mirror`
- `forbidden.last-proof`

### 真命
- `finale.relics`
- `finale.verdicts`
- `finale.cross`（桌機伏筆圖保留；手機最後驗證）
- `finale.question`
- `finale.withdrawal`

---

## 五、D 級｜不先生圖，只修程式／互動

- `love.face`：hotspot 實機校座標；reaction mobile 錯配已修。
- `love.question`：文案已修。
- `love.pulse-trial`：variantArt / reactionArt 實機驗證。
- `career.stake-trial`：落子操作與 variant/reaction。
- `career.ritual`：三種道具反應。
- `life.mirror`：鏡片 hotspot。
- `life.body-trial`：身體試煉 hotspot / variant/reaction。
- `life.ritual`：碎鏡儀式三種反應。
- `forbidden.mask`：點觸／觀察，不恢復刮除。
- `forbidden.heat-trial`：最後一寸操作與反應。
- `finale.choice`：主圖先保留；focus 已第一輪修正，補三分支 reaction。
- 命牒 reader：第一輪 scrollbar、自動跟隨、鍵盤聚焦已完成；待實機。

---

## 六、正式生成順序

### 第一批｜劇情斷點最明顯
1. `love.silence`
2. `love.ritual`
3. `forbidden.ending`
4. `love.turn`
5. `career.borrowed`
6. `life.turn`
7. `forbidden.turn`
8. `finale.gate`
9. `finale.confession`

### 第二批｜四卷命牒
10. `love.result`
11. `career.result`
12. `life.result`
13. `forbidden.result`

### 第三批｜真命終局
14. `finale.seal-test` mobile
15. `finale.ending`

### 最後才啟動條件式
16. `love.thread-room`（若現圖失敗）
17. `career.turn`（若現圖失敗）
18. `life.cost`（若現圖失敗）
19. `forbidden.threat`（若現圖失敗）

---

## 七、凍結規則

從本檔建立後：

1. A 級 15 幕視為正式必生範圍。
2. B 級 4 幕沒有實機證據不得提前生。
3. C / D 級不得因「想換漂亮一點」而新增生圖；只有故事語意、人物一致性、手機裁切或互動真的不合格才升級。
4. 第三段 `FINAL_IMAGE_PROMPTS_V1.md` 只針對 A 級完整寫 Prompt，B 級附備用 Prompt；不再擴張場景數。
5. 新圖完成後才回網站做桌機／手機像素驗收與 `🔒 LOCKED`。

---

## 八、第二段完成定義

本檔即為第二段「五卷最後缺圖凍結」基準。

**下一步：第三段建立唯一一份最終生圖彙整檔，逐張列出人物動作、背景、性感／妖艷要求、胸腰腿與狐尾要求、文字安全區、中英文 Prompt、建議檔名與生成完成勾選欄。**
