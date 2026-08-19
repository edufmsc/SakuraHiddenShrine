# 櫻隱 V58｜命之卷製作工作表 V1

> 卷別：命之卷
> 基底版本：V58
> 分支：`review/v58-scene-lock`
> 目的：把「疲憊、身體訊號、鏡中不同步、界線、恢復」轉成可直接執行的逐幕製作清單。
> 原則：先定圖 → 再鎖頁 → 最後才修改 V58 程式；不碰 `main`；不把命卷做成健康量表或一般唯美鏡面圖。

---

## 一、狀態代號

- `✅ USE`：現圖可直接保留，僅需實機驗證。
- `🟡 ADJUST`：保留現圖，但要修 focus／手機圖／安全區／文字或局部互動。
- `🔄 SWAP`：先從 V58 active/library 換成更對題的現有圖。
- `🎨 GENERATE`：現有素材沒有必要故事動作，生成專用圖。
- `🔧 BUILD`：hotspot／試煉／命牒／流程需程式修正。
- `⬜`：尚未鎖頁。
- `🔒`：故事＋圖片＋桌機＋手機＋互動全部通過。

---

## 二、命之卷製作目標

命之卷的恐怖不是跳嚇，而是「有哪裡不對」。核心視覺元素固定為：

- 水面與倒影。
- 紙門與慢半拍的影子。
- 裂鏡與碎片。
- 鏡內／鏡外不同步。
- 命燈／身體代價。
- 身體試煉。
- 回身與同步。

情緒曲線：**照水 → 遲影 → 停下 → 裂鏡 → 不同步 → 命燈代價 → 替身反轉 → 小步改變 → 身體試煉 → 命牒 → 照身儀式 → 同步收束。**

### 本卷不可犯錯

1. 不把身體訊號寫成醫療診斷。
2. 不只靠台詞說「鏡子不同步」，畫面本身必須看得懂。
3. 不把每幕都做成唯美鏡前人物照。
4. 鏡片、影子、命燈等異象不可被文字區遮住。
5. 手機版要保留「異常點」，不能因直式裁切讓關鍵差異消失。
6. 第五卷回收 `life_mirror_mismatch.webp` 時要有狀態差異，不能讓人覺得只是重複使用。

---

## 三、逐幕製作工作表

|幕次|Scene ID|幕名|現用主圖|製作判定|主要工作|新圖可能性|鎖頁|
|-:|---|---|---|---|---|---|---|
|01|`life.threshold`|水庭倒影|`LIFE_01_water_reflection_v39.webp`|✅ USE / 🟡 ADJUST|驗手機倒影異常|低|⬜|
|02|`life.shadow`|紙門遲影|`LIFE_02_paperdoor_shadow_v39.webp`|✅ USE / 🟡 ADJUST|手機必須保留慢半拍影子|低中|⬜|
|03|`life.room`|潮氣長廊|`LIFE_wet_corridor_v44.webp`|✅ USE|保留停下／濕髮／靜室感|低|⬜|
|04|`life.mirror`|裂鏡問句|`life_cracked_mirror.webp`|🟡 ADJUST + 🔧 BUILD|鏡片 hotspot 原圖座標化|低|⬜|
|05|`life.double`|鏡中不同步|`life_mirror_mismatch.webp`|✅ USE|命卷關鍵伏筆，保留|低|⬜|
|06|`life.cost`|命燈代價|`life_003.webp`|🔄 SWAP / 🎨 GENERATE|畫面要真的表現代價被記帳|中高|⬜|
|07|`life.turn`|鏡外人|`life_mirror_double_face.webp`|🔄 SWAP / 🎨 GENERATE|鏡內完整替身＋鏡外透明真身|高|⬜|
|08|`life.last-proof`|今夜以後|`life_new_01.webp`|🟡 ADJUST|四片鏡／四個可做動作要清楚|中|⬜|
|09|`life.body-trial`|身體試煉|`life_016.webp`＋動態圖|🔧 BUILD|獨立操作、四組 variant/reaction 全驗|視圖而定|⬜|
|10|`life.result`|命卷判讀|`life_014.webp`|🎨 GENERATE + 🔧 BUILD|統一命牒構圖與捲動|高|⬜|
|11|`life.ritual`|照身碎片|`LIFE_broken_mirror_v44.webp`|🟡 ADJUST / 🔧 BUILD|三種儀式選擇增加道具反應|中|⬜|
|12|`life.ending`|鏡息餘韻|V58 現行結尾圖|🟡 ADJUST|確認「影子同步」而非泛用收尾|低中|⬜|

---

## 四、逐幕正式製作要求

### 01｜`life.threshold` 水庭倒影

**故事任務**：玩家還沒問運，九尾先問醒來第一秒最先出現的身體感受；水面裡的她從一開始就有微妙不一致。

**現圖**：桌機 `LIFE_01_water_reflection_v39.webp`；手機 `life_019.webp`。

**必要畫面**：水庭、九尾、倒影、可被看出的細微異常。

**安全區**：S-L / S-R；水面異象不可被文字遮。

**判定**：桌機 ✅ USE；手機若看不到異常則 🟡 ADJUST／🔄 SWAP。

---

### 02｜`life.shadow` 紙門遲影

**故事任務**：本體已經走過紙門，影子卻慢一個呼吸。

**現圖**：桌機 `LIFE_02_paperdoor_shadow_v39.webp`；手機 `life_016.webp`。

**必要畫面**：本體／影子不同步必須一眼辨識，不靠說明文字。

**安全區**：S-EVIDENCE；影子差異區優先保留。

**判定**：桌機 ✅ USE；手機需確認異象，否則換真正直式對題素材。

---

### 03｜`life.room` 潮氣長廊

**故事任務**：九尾讓玩家坐下，指出真正的休息是「身體不用繼續監視世界」。

**現圖**：桌機 `LIFE_wet_corridor_v44.webp`；手機 `LIFE_recline_mobile_v44.webp`。

**必要畫面**：潮濕長廊／靜室、九尾側身或背身整理濕髮、肩頸放鬆；性感是成熟氛圍，不是勾引。

**安全區**：S-L / S-R；手機 UI 不壓肩頸與濕髮。

**判定**：✅ USE 候選。

---

### 04｜`life.mirror` 裂鏡問句

**故事任務**：玩家真的挑一片鏡子，而不是再選一個文字答案。

**現圖**：`life_cracked_mirror.webp`。

**必要畫面**：多片裂鏡、九尾手或玩家手靠近、各鏡片反光略有差異。

**安全區**：S-EVIDENCE / S-OPERATE。

**程式要求**：若用鏡片 hotspot，改成 normalized 座標或 SVG viewBox；每片鏡片的可點範圍跟著 `cover` 裁切縮放。

**判定**：🟡 ADJUST + 🔧 BUILD。

---

### 05｜`life.double` 鏡中不同步

**故事任務**：現實九尾已轉身，鏡中的她還沒有。

**現圖**：`life_mirror_mismatch.webp`。

**必要畫面**：兩個九尾狀態明確不同；不是普通鏡面倒影。

**安全區**：S-EVIDENCE；現實與鏡內角色都要完整。

**第五卷回收規則**：可保留同圖作伏筆，但第五卷必須透過裁切、四痕疊加、光源或動畫狀態做成「記憶回返」。

**判定**：✅ USE，命卷關鍵保留。

---

### 06｜`life.cost` 命燈代價

**故事任務**：玩家的消耗開始「被記帳」，睡眠、情緒、身體緊繃或麻木成為命燈亮度。

**現圖**：舊規格 `life_003.webp`。

**必要畫面**：多盞燈逐漸暗下、九尾冷靜看著、身體輪廓／呼吸或肩頸緊繃可被感受到。

**安全區**：S-EVIDENCE；命燈狀態不可變成背景小裝飾。

**判定**：🔄 SWAP 優先；現有素材缺「命燈熄滅／代價記帳」就 🎨 GENERATE。

---

### 07｜`life.turn` 鏡外人

**故事任務**：鏡中的「永遠能撐」才是替身；站在鏡外的真正自己反而透明。

**現圖**：桌機 `life_mirror_double_face.webp`；手機 `life_mirror_mismatch.webp`。

**正式畫面必備**：
1. 鏡內人物完整、穩定、像一個被做給世界看的版本。
2. 鏡外人物身體／手開始透明。
3. 九尾在旁拼鏡或完成揭露。
4. 玩家一眼看得懂「誰才是替身」。

**安全區**：S-EVIDENCE；鏡內外不可被 UI 截斷。

**判定**：高風險。現圖若只有雙臉美術效果，改 🔄 SWAP；素材庫沒有就 🎨 GENERATE。

---

### 08｜`life.last-proof` 今夜以後

**故事任務**：九尾不要求大誓言，只把「睡、拒絕、求助、離開」四片鏡推給玩家，選一個明天看得到的小動作。

**V58 實際圖**：桌機 `life_new_01.webp`；手機 `life_019.webp`。

**必要畫面**：四片鏡／四個象徵明確，不可只是一張九尾人物圖配四選一。

**安全區**：S-EVIDENCE。

**判定**：🟡 ADJUST；若四片鏡不存在則 🔄 SWAP。

---

### 09｜`life.body-trial` 身體試煉

**故事任務**：鏡面只照出玩家最先緊繃的地方，玩家用一次點觸確認「我有看見」。

**主圖／動態圖**：`life_016.webp`＋ branch trial variantArt / reactionArt；手機含 `LIFE_VERIFY_01_close_the_noise_mobile`、`LIFE_VERIFY_02_return_the_burden_mobile`、`LIFE_VERIFY_03_choose_yourself_mobile`、`LIFE_01_water_reflection_mobile`。

**程式要求**：
- 獨立操作幕。
- 點觸區綁原圖座標／SVG。
- 每個 variant/reaction/mobile 分開驗收。
- 文案明確標示這不是醫療診斷，不做疾病推論。

**安全區**：S-OPERATE。

**判定**：🔧 BUILD；圖片逐分支另審。

---

### 10｜`life.result` 命卷判讀

**故事任務**：鏡子把玩家放回來，九尾寫下回身復位、界線失血、命燈透支或舊殼將退等判詞。

**現圖**：桌機 `life_014.webp`；手機 `life_019.webp`。

**正式方向**：統一四卷命牒語言：左側命牒＋右側九尾／鏡面，畫面本身最好表現「鏡子重新同步」。

**安全區**：S-DESTINY。

**程式要求**：標題固定、內文可捲、捲軸可見、逐字寫入自動跟隨；健康提醒保留但不破壞視覺小說節奏。

**判定**：🎨 GENERATE + 🔧 BUILD。

---

### 11｜`life.ritual` 照身碎片

**故事任務**：玩家只帶走一小片真實：照月光、鏡面朝下收袖中、或留在門縫。

**現圖**：桌機 `LIFE_broken_mirror_v44.webp`；手機 `LIFE_recline_mobile_v44.webp`。

**必要畫面**：九尾手＋鏡片＋月光／袖口／門縫。

**程式／圖片要求**：三個選擇至少透過 reactionArt 或道具狀態變化讓玩家「看見儀式完成」。

**安全區**：S-OPERATE / S-EVIDENCE。

**判定**：🟡 ADJUST + 🔧 BUILD。

---

### 12｜`life.ending` 鏡息餘韻

**故事任務**：影子終於和玩家同時回身；九尾只留短句，讓命卷安靜結束。

**必要畫面**：影子／倒影終於同步，光線比前面穩定；不需要新的大高潮。

**安全區**：依人物位置 S-L / S-R；只留 1–2 句。

**判定**：🟡 ADJUST；若現圖沒有同步語意，優先換現有收束圖，不急著生成。

---

## 五、命卷最高優先製作清單

### 高優先專用圖
1. `life.turn`｜鏡內完整替身／鏡外透明真身。
2. `life.result`｜命卷命牒。

### 先查現有素材再決定
3. `life.cost`｜命燈代價。
4. `life.last-proof`｜四片鏡。

### 程式必修
5. `life.mirror`｜鏡片 hotspot。
6. `life.body-trial`｜獨立操作＋動態圖。
7. `life.result`｜命牒捲動。
8. `life.ritual`｜儀式反應狀態。

---

## 六、目前鎖頁候選

### 優先候選
- `life.double`
- `life.room`

### 條件式候選
- `life.threshold`
- `life.shadow`
- `life.mirror`
- `life.last-proof`
- `life.ending`

### 目前不可鎖
- `life.cost`
- `life.turn`
- `life.body-trial`
- `life.result`
- `life.ritual`

---

## 七、後續

本卷 Production 工作表完成後，不停下來等待；依同一套規格繼續禁之卷、真命卷。五卷 Production 齊全後，再回到逐幕實際定圖與 `🔒 LOCKED`。