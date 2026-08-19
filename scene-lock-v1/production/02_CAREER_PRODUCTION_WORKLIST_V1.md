# 櫻隱 V58｜業之卷製作工作表 V1

> 卷別：業之卷
> 基底版本：V58
> 分支：`review/v58-scene-lock`
> 目的：把「成果、署名、交換、選擇權」從規格轉成可執行的逐幕製作清單。
> 原則：先定圖 → 再鎖頁 → 最後才修改 V58 程式；不碰 `main`；不先整理全站 CSS。

---

## 一、狀態代號

- `✅ USE`：現圖可直接保留，僅做實機確認。
- `🟡 ADJUST`：保留現圖，但需修 focus／手機圖／安全區／文案。
- `🔄 SWAP`：優先從 V58 現有 active/library 換圖。
- `🎨 GENERATE`：現有素材缺少必要故事動作，需生成專用新圖。
- `🔧 BUILD`：程式／hotspot／試煉／命牒流程必修。
- `⬜`：尚未鎖頁。
- `🔒`：故事＋圖片＋桌機＋手機＋互動全部核准。

---

## 二、業之卷製作目標

業之卷不能只是「九尾很漂亮地談工作」。畫面必須持續出現能被辨認的職涯證據：

- 棋盤與黑棋。
- 成果牌／成果物。
- 姓名牌、署名、印章。
- 卷宗、任務紙、交換條件。
- 玩家手與落子動作。

情緒曲線：**看盤 → 成果署名 → 可攜資產 → 加碼交換 → 成果借名 → 雨局壓力 → 棋手反轉 → 選擇正在減少 → 真正落子 → 命牒 → 署名儀式 → 封局。**

### 本卷不可犯錯

1. 不可整卷都是人物肖像。
2. 「成果被借名」必須看得到證據，不可只靠台詞。
3. 棋盤與重要道具不能被文字區遮住。
4. 試煉頁不是普通四選一，要有真正落子感。
5. 業卷結果應納入四卷統一命牒語言。
6. 手機版不得把棋盤、名字牌、玩家手裁掉。

---

## 三、逐幕製作工作表

|幕次|Scene ID|幕名|現用主圖|製作判定|主要工作|新圖可能性|鎖頁|
|-:|---|---|---|---|---|---|---|
|01|`career.threshold`|棋室開局|`CAREER_chess_command_v44.webp`|✅ USE / 🟡 ADJUST|驗棋盤可見度與手機構圖|低|⬜|
|02|`career.name`|成果署名|`CAREER_02_table_cards_choice_v39.webp`|✅ USE|驗卡牌／姓名不被文字遮|低|⬜|
|03|`career.black-piece`|無名籤牌|`career_002.webp`|🟡 ADJUST|手機借圖需換成真正對題構圖|中|⬜|
|04|`career.exchange`|加碼交換|`career_003.webp`|🟡 ADJUST / 🔄 SWAP|確認任務紙＋交換條件真的存在|中|⬜|
|05|`career.borrowed`|成果借名|`career_name_swap` 對應圖|🎨 GENERATE / 🔄 SWAP|建立一眼可懂的「成果在、名字被換」證據|高|⬜|
|06|`career.pressure`|雨局壓力|`CAREER_03_rain_standing_pressure_v39.webp`|✅ USE / 🟡 ADJUST|確認雨真的侵蝕棋局，不是純站姿|低|⬜|
|07|`career.turn`|棋手反轉|`career_new_01.webp`|🔄 SWAP / 🎨 GENERATE|盤底多雙手＋黑棋回到玩家掌心|高|⬜|
|08|`career.last-proof`|最後一手|`career_020_wide_v39.webp`|🟡 ADJUST|驗「燈熄、路變少」是否真的存在|中|⬜|
|09|`career.stake-trial`|落子試煉|`career_stake_plan.webp`＋動態圖|🔧 BUILD|獨立落子操作＋四組 variant/reaction 驗收|視圖而定|⬜|
|10|`career.result`|業卷判讀|`career_new_02.webp`|🎨 GENERATE + 🔧 BUILD|統一命牒專用構圖／捲動|高|⬜|
|11|`career.ritual`|玄棋署名|`career_008.webp`|🔧 BUILD / 🔄 SWAP|三種選擇要有道具反應，不只換文字|中高|⬜|
|12|`career.ending`|封局|`SHARED_close_gaze_v44.webp`|🟡 ADJUST|作為短餘韻，避免與其他卷 shared 圖重複感|低|⬜|

---

## 四、逐幕正式製作要求

### 01｜`career.threshold` 棋室開局

**故事任務**：九尾不先算努力，而是要玩家看自己在盤上究竟是棋子、棋手，還是替人收拾棋盤的手。

**現圖**：
- 桌機：`CAREER_chess_command_v44.webp`
- 手機：`career_017.webp`

**製作要求**：
- 棋盤必須清楚，不可被人物與 UI 吃掉。
- 九尾要像操盤者，不是單純持扇肖像。
- 黑棋／白棋最好有可辨差異，支持後續「名字」故事。

**安全區**：S-L / S-R 依棋盤實際位置；手機棋盤至少保留中下方 25–35%。

**暫定**：✅ USE，實機若棋盤不足則 🟡 ADJUST。

---

### 02｜`career.name` 成果署名

**故事任務**：三張成果牌翻面，玩家第一次正面看「這件事最後先被說成誰的名字」。

**現圖**：
- 桌機：`CAREER_02_table_cards_choice_v39.webp`
- 手機：`CAREER_02_table_cards_choice_mobile.webp`

**製作要求**：
- 成果牌、姓名標記、九尾翻牌／指牌要同時成立。
- 卡牌不能因文字安全區變成看不清的背景裝飾。

**安全區**：S-EVIDENCE。

**暫定**：✅ USE。

---

### 03｜`career.black-piece` 無名籤牌

**故事任務**：九尾交出無名籤牌，問「如果明天你不在，什麼能跟著你走？」

**現圖**：
- 桌機：`career_002.webp`
- 手機：目前借用 `CAREER_01_fan_command_mobile.webp`

**製作要求**：
- 桌機需看到無名籤牌／檔案室／玩家可伸手接取的位置。
- 手機不能再只因角色好看就借用不對題圖；優先找真正有籤牌、手勢的現有直式圖。

**安全區**：S-L / S-R，籤牌與手勢放非文字側。

**暫定**：🟡 ADJUST；若無對題手機現圖則 🔄 SWAP。

---

### 04｜`career.exchange` 加碼交換

**故事任務**：九尾把任務往玩家面前推，指出「只有你能做」若沒有交換，只是更漂亮的佔用。

**現圖**：桌機 `career_003.webp`；手機 `career_016.webp`。

**必要畫面**：
- 任務紙／卷宗。
- 扇骨或手壓住任務。
- 黑棋／籌碼正在失去光澤或被壓住。
- 九尾是談條件的姿態。

**安全區**：S-EVIDENCE。

**暫定**：🟡 ADJUST；缺任務／交換元素則 🔄 SWAP。

---

### 05｜`career.borrowed` 成果借名

**故事任務**：這是業卷最重要的證據幕。玩家做出的成果還在，但落地時被換成別人的名字。

**現況**：V58 實際故事使用 `career_name_swap` 對應圖；舊規格曾列 `career_borrowed_evidence.webp`。

**正式畫面必備**：
1. 可辨認的成果／文件／成果牌。
2. 另一人的姓名牌、印章或署名壓在成果上。
3. 九尾坐在策略桌另一側。
4. 九尾用兩指把證據推向玩家。
5. 表情冷、清楚、略帶「現在看懂了嗎？」。
6. 人物頭、臉、脖、胸、腰、手自然完整。

**安全區**：S-EVIDENCE；證據區至少佔 25–35%，文字在相反側。

**暫定**：🎨 GENERATE 高優先；若現有 active/library 有完全對題圖才改 🔄 SWAP。

---

### 06｜`career.pressure` 雨局壓力

**故事任務**：冷雨落棋盤，每一句「最近太忙」都沖掉一格選擇。

**現圖**：
- 桌機：`CAREER_03_rain_standing_pressure_v39.webp`
- 手機：`CAREER_03_rain_standing_pressure_mobile.webp`

**製作要求**：
- 必須同時有雨、棋盤、九尾。
- 盤面最好能看到被雨／暗光侵蝕，表達「選擇正在消失」。

**暫定**：✅ USE / 🟡 ADJUST。

---

### 07｜`career.turn` 棋手反轉

**故事任務**：九尾抬起棋盤，盤底是一雙雙等玩家替它們完成最後一步的手；唯一黑棋最後回到玩家掌心。

**現圖**：桌機 `career_new_01.webp`；手機 `career_015.webp`。

**必要畫面**：
- 棋盤被掀／抬起。
- 盤底多雙手或明確「別人的責任等玩家接」的異象。
- 黑棋最後落到玩家手中。
- 九尾是揭露真相的人，不是畫面唯一主體。

**安全區**：S-EVIDENCE 或中構圖短句。

**暫定**：🔄 SWAP / 🎨 GENERATE，高風險敘事幕。

---

### 08｜`career.last-proof` 最後一手

**故事任務**：九尾一盞盞吹熄燈，棋盤上可走的路逐步減少；玩家必須說清留下條件或離開訊號。

**現圖**：桌機 `career_020_wide_v39.webp`；手機 `career_020.webp`。

**製作要求**：
- 燈熄與棋路變少要能被看見。
- 九尾可縮小，讓「選擇正在變少」成主視覺。

**安全區**：S-L / S-R，不能遮棋路與熄燈區。

**暫定**：🟡 ADJUST；若異象太弱則 🔄 SWAP。

---

### 09｜`career.stake-trial` 落子試煉

**故事任務**：玩家真正只走一手，不再回答第四題。

**主圖／動態圖**：`career_stake_plan.webp`＋ branch trial variantArt / reactionArt；手機目前包含 `CAREER_VERIFY_01_achievement_proof_mobile`、`CAREER_VERIFY_03_negotiate_terms_mobile`、`CAREER_01_fan_command_mobile`、`CAREER_VERIFY_02_ally_door_mobile`。

**程式要求**：
- 獨立操作幕。
- 玩家手＋黑棋＋棋盤落點是主體。
- hotspot 綁原圖 normalized 座標／SVG viewBox。
- 每個 variantArt、reactionArt、mobile 都要分開驗。

**安全區**：S-OPERATE。

**暫定**：🔧 BUILD；圖片逐分支另審。

---

### 10｜`career.result` 業卷判讀

**故事任務**：九尾正式寫下業卷判詞：可見槓桿、成果被借名、鍍金困局、出口已亮等。

**現圖**：桌機 `career_new_02.webp`；手機 `career_016.webp`。

**正式方向**：納入四卷統一命牒敘事：
- 左側業卷命牒。
- 右側九尾＋棋盤／黑棋。
- 圖片生成時就預留紙面，不事後用 CSS 蓋住人物。

**程式要求**：固定標題、內文可捲、捲軸可見、逐字寫入自動跟隨。

**安全區**：S-DESTINY。

**暫定**：🎨 GENERATE + 🔧 BUILD。

---

### 11｜`career.ritual` 玄棋署名

**故事任務**：玩家選擇把黑棋落在中央、收入袖中、或拿掉一枚不屬於自己的棋。

**現圖**：桌機 `career_008.webp`；手機 `career_017.webp`。

**製作要求**：
- 黑棋、棋盤、玩家手／九尾手都要清楚。
- 三個選擇不能只有台詞不同；至少有棋子落點、收袖、撤棋的道具狀態變化。
- 可以用 reactionArt，不一定三張全新主背景。

**安全區**：S-OPERATE / S-EVIDENCE。

**暫定**：🔧 BUILD；視現圖決定 🔄 SWAP。

---

### 12｜`career.ending` 封局

**故事任務**：九尾收起棋局，不再替玩家決定這一手；只留短餘韻銜接下一卷。

**V58 實際桌機圖**：`SHARED_close_gaze_v44.webp`（不是舊鎖頁表曾寫的空門圖）。

**製作要求**：
- 只留 1–2 句收束。
- 若 shared 圖在其他卷太常出現，改成業卷既有專屬收局圖優先，不急著生新圖。

**安全區**：S-CLOSE 或依人物位置 S-L / S-R。

**暫定**：🟡 ADJUST。

---

## 五、業卷最高優先製作清單

### 高優先專用圖
1. `career.borrowed`｜成果借名證據。
2. `career.result`｜業卷命牒。

### 高風險，先查現有素材再決定生圖
3. `career.turn`｜棋手反轉／盤底多雙手。
4. `career.ritual`｜玄棋三種儀式反應。

### 程式必修
5. `career.stake-trial`｜獨立落子＋分支圖。
6. `career.result`｜命牒捲動與安全區。

---

## 六、目前可先鎖候選

### 優先候選
- `career.name`

### 條件式候選
- `career.threshold`
- `career.black-piece`
- `career.pressure`
- `career.last-proof`
- `career.ending`

### 目前不可鎖
- `career.exchange`
- `career.borrowed`
- `career.turn`
- `career.stake-trial`
- `career.result`
- `career.ritual`

---

## 七、下一步

業卷 Production 工作表完成後，依序建立：

1. `03_LIFE_PRODUCTION_WORKLIST_V1.md`
2. `04_FORBIDDEN_PRODUCTION_WORKLIST_V1.md`
3. `05_FINALE_PRODUCTION_WORKLIST_V1.md`

五卷 Production 工作表齊全後，再回到緣卷做真正逐幕 `USE / ADJUST / SWAP / GENERATE` 定圖與第一批 `🔒 LOCKED`。
