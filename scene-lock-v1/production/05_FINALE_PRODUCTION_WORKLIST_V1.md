# 櫻隱 V58｜真命卷製作工作表 V1

> 卷別：真命卷
> 基底版本：V58
> 分支：`review/v58-scene-lock`
> 目的：把前四卷回收、九尾失控、第五印、最終三選一與總命牒整理成可直接執行的終局製作清單。
> 原則：第五卷不是第五份測驗，而是前四卷規則開始失效後的真正高潮；不碰 `main`，先定圖與終局互動，再改程式。

---

## 一、狀態代號

- `✅ USE`：現圖可直接保留，僅需實機驗證。
- `🟡 ADJUST`：保留現圖，但要修 focus／手機圖／安全區／文字或局部互動。
- `🔄 SWAP`：先從 V58 active/library 換成更對題現有圖。
- `🎨 GENERATE`：現有素材缺必要高潮動作，生成專用圖。
- `🔧 BUILD`：終局互動／命牒／focus／分支反應需程式修正。
- `⬜`：尚未鎖頁。
- `🔒`：故事＋圖片＋桌機＋手機＋互動全部通過。

---

## 二、真命卷製作目標

真命卷必須完成以下回收：

- 前四卷四件遺物：紅線、玄棋、鏡片、狐面。
- 命卷不同步鏡面伏筆。
- 九尾第一次真正失控。
- 九尾第一次承認自己的私心與脆弱。
- 第五印形成與失控。
- 最終三選一。
- 九尾消失。
- 九尾回來親手展開總命牒。

情緒曲線：**第五門出現 → 四痕回收 → 九尾失控 → 玩家反證 → 九尾坦白 → 第五印逼近 → 只問玩家 → 最終選擇 → 九尾消失 → 總命牒真結。**

### 本卷不可犯錯

1. 九尾失控時不能還是平常自信微笑。
2. 第五卷不能再出現前四卷那種連續問卷節奏。
3. `finale.cross` 可以回收舊鏡圖，但要讓人看出是刻意伏筆回返。
4. `finale.choice` 先修 focus，再判斷要不要重生主圖。
5. `finale.withdrawal` 必須真的沒有九尾。
6. `finale.ending` 總命牒圖必須從生成／構圖階段就為左側紙面留空。

---

## 三、逐幕製作工作表

|幕次|Scene ID|幕名|現用主圖|製作判定|主要工作|新圖可能性|鎖頁|
|-:|---|---|---|---|---|---|---|
|01|`finale.gate`|無字之門|`ending_003.webp`|🔄 SWAP / 🎨 GENERATE|第五門＋四痕指向九尾|高|⬜|
|02|`finale.relics`|四痕上桌|`finale_four_relics.webp`|✅ USE / 🟡 ADJUST|四件遺物一眼可辨|低|⬜|
|03|`finale.verdicts`|四卷互證|`finale_uncontrolled.webp`|✅ USE / 🟡 ADJUST|九尾第一次真正失控；手機需專用|中|⬜|
|04|`finale.cross`|九尾反問|`life_mirror_mismatch.webp`|🟡 ADJUST|伏筆回收狀態化＋手機重做|中|⬜|
|05|`finale.confession`|九尾失言|`SHARED_recline.webp`|🔄 SWAP / 🎨 GENERATE|脆弱坦白＋牽手貼封印|高|⬜|
|06|`finale.seal-test`|第五印形成|`final_seal_form.webp`|🟡 ADJUST + 🎨 GENERATE mobile|桌機驗印、手機專用圖|中高|⬜|
|07|`finale.question`|真正只問你|`SHARED_close.webp`|🟡 ADJUST|近身凝視、UI 退後|低|⬜|
|08|`finale.choice`|天亮以前的選擇|`final_seal_touch.webp`|🔧 BUILD / 🟡 ADJUST|先修 focus＋三分支 reaction|中|⬜|
|09|`finale.withdrawal`|她忽然不見了|`final_refuse_room.webp`|✅ USE / 🟡 ADJUST|空室與四痕／紅線／手書可辨|低|⬜|
|10|`finale.ending`|真結・總命牒|`final_scroll_desktop.webp`|🎨 GENERATE + 🔧 BUILD|右九尾／左總命牒安全區|高|⬜|

---

## 四、逐幕正式製作要求

### 01｜`finale.gate` 無字之門

**故事任務**：四件命痕同時發熱，指向九尾身後一扇本來不該存在的無字之門；九尾第一次說「……不對。」

**現圖**：桌機 `ending_003.webp`；手機 `SHARED_fullbody_mobile.webp`。

**正式畫面必備**：
1. 第五道無名鳥居／門縫。
2. 紅線、玄棋、鏡片、狐面同時發熱。
3. 光／指向關係明確指向九尾，不是玩家。
4. 九尾表情第一次失去從容。

**安全區**：S-L / S-R；門與九尾表情都要完整。

**判定**：現圖若缺四痕與失控語意，先 🔄 SWAP；素材庫沒有就 🎨 GENERATE。

---

### 02｜`finale.relics` 四痕上桌

**故事任務**：前四卷留下的命痕第一次同桌，玩家看到自己一路留下的「口供」。

**現圖**：桌機 `finale_four_relics.webp`；手機 `shared_005.webp`。

**必要畫面**：紅線、玄棋、鏡片、狐面四件都能辨認；九尾可以把它們一件件放上桌。

**安全區**：S-EVIDENCE；四痕不能被文字壓住。

**判定**：桌機 ✅ USE 候選；手機若四件不清楚則 🟡 ADJUST／🔄 SWAP。

---

### 03｜`finale.verdicts` 四卷互證

**故事任務**：四卷結果不再只是指向玩家，命痕開始「認九尾」，她第一次真正意識到事情超出控制。

**現圖**：桌機 `finale_uncontrolled.webp`；手機 `SHARED_fullbody_mobile.webp`。

**九尾表情固定**：
- 不笑。
- 明顯驚訝、難以置信。
- 帶一點害怕。
- 嘴唇微張。
- 眼神比平常更大。
- 一隻手本能後撤，另一隻手想碰卻停住。

**安全區**：S-CLOSE 或中構圖少文字。

**判定**：桌機若情緒精準則 ✅ USE；手機 shared 圖高風險，優先換成專用直式圖。

---

### 04｜`finale.cross` 九尾反問

**故事任務**：九尾把四痕推回玩家面前，允許玩家挑一卷帶到現實證明命館看錯。

**現圖**：桌機 `life_mirror_mismatch.webp`；手機 `forbidden_023.webp`。

**正式方向**：保留命卷鏡圖作伏筆回收，但新增第五卷狀態：
- 四痕在前景／桌面。
- 光線或紅線把鏡中異常重新喚醒。
- 裁切與命卷不同。
- 九尾推回證據或站在更後方。

**手機要求**：不能用完全不同主題的泛用禁卷圖；需保留鏡中回返語意。

**判定**：🟡 ADJUST；桌機保留伏筆，手機需 🔄 SWAP／專用圖。

---

### 05｜`finale.confession` 九尾失言

**故事任務**：九尾坦白一開始確實有私心，真正怕的卻是門開後玩家再也沒有回來的理由。

**現圖**：桌機 `SHARED_recline.webp`；手機 `SHARED_fullbody_mobile.webp`。

**正式畫面必備**：
1. 九尾第一次真正脆弱，不用性感笑容遮掩。
2. 她牽玩家的手貼上封印。
3. 力道停在玩家隨時能抽回的位置。
4. 封印／第五印前兆可見。
5. 近身成熟，但情緒重點是坦白，不是人體藝術。

**安全區**：S-CLOSE；長台詞自動分段，不要求玩家每句一直點。

**判定**：shared 躺姿若沒有牽手＋封印＋脆弱情緒，先 🔄 SWAP；無對題素材就 🎨 GENERATE。

---

### 06｜`finale.seal-test` 第五印形成

**故事任務**：狐火逼迫玩家立刻替九尾決定，第五印開始不受她控制地形成。

**現圖**：桌機 `final_seal_form.webp`；手機目前 `forbidden_020.webp`。

**正式畫面必備**：第五印在九尾胸前／身前形成；九尾手停在印前，想阻止卻不敢碰；表情驚訝與害怕。

**安全區**：S-CLOSE / S-OPERATE；第五印不可被 UI 遮。

**判定**：桌機 🟡 ADJUST（先驗印與表情）；手機不能再借禁卷泛用圖，🎨 GENERATE 專用直式版本。

---

### 07｜`finale.question` 真正只問你

**故事任務**：前面所有問題都還有別人的名字，這次只剩玩家本人。

**現圖**：桌機 `SHARED_close.webp`；手機 `shared_001.webp`。

**必要畫面**：九尾近距離正面看玩家，背景道具／UI 大幅退場；眼神是等答案，不是再操控答案。

**安全區**：S-CLOSE；少文字、留呼吸。

**判定**：🟡 ADJUST；若角色一致與臉完整即可保留。

---

### 08｜`finale.choice` 天亮以前的選擇

**故事任務**：玩家在「答案、她、或一條沒人替你命名的路」之間做真正終局決定。

**現圖**：桌機／手機 `final_seal_touch.webp`。

**已知問題**：原圖有完整頭臉，但 `desktopFocus=50% 58%` 使實機裁切過低。

**程式優先修正**：
- 先校 desktopFocus / mobileFocus。
- 最終三選一時其餘 UI 退到最低。
- 三個選項各自有 reactionArt / ending art，不只換文字。

**安全區**：S-OPERATE / S-CLOSE。

**判定**：🔧 BUILD + 🟡 ADJUST；**不先重生主圖**。

---

### 09｜`finale.withdrawal` 她忽然不見了

**故事任務**：九尾真正消失，沒有再用靠近或誘惑留住玩家。

**現圖**：桌機／手機 `final_refuse_room.webp`；`heroPresence: empty`。

**必要畫面**：空室、四痕、發熱紅線、未乾手書、門外將亮；九尾真的不在。

**安全區**：S-EVIDENCE。

**判定**：✅ USE 候選；只需驗四件道具與手書可辨性。

---

### 10｜`finale.ending` 真結・總命牒

**故事任務**：九尾最後回來，親手展開總命牒；玩家讀完整命牒後自然走向黎明。

**現圖**：桌機 `final_scroll_desktop.webp`；手機 `FINAL_SCROLL_portrait.webp`。

**已知根因**：桌機九尾在畫面中央，與左側約 43vw 的總命牒直接衝突，CSS 無法解決原構圖。

**正式桌機圖規格**：
1. 九尾位於畫面右側約 52–78%。
2. 左側 4–42% 為完整白／米白命牒安全區。
3. 九尾臉、狐耳、脖、胸、手、尾巴不能被紙蓋。
4. 她正在展卷／提筆，與命牒是同一件事。
5. 背景保持櫻隱命館終局氛圍。

**手機圖規格**：獨立直式構圖，不能硬裁桌機；九尾與命牒上下／斜向分區仍要可讀。

**程式要求**：
- 總命牒是故事場景，不另開下載報告。
- 標題固定。
- 內文可捲，捲軸可見。
- 逐字寫入自動跟隨。
- 完成後自然進黎明／結局，不加多餘問卷。

**安全區**：S-DESTINY。

**判定**：🎨 GENERATE + 🔧 BUILD，高優先。

---

## 五、真命卷最高優先製作清單

### 高優先專用圖
1. `finale.gate`｜第五門＋四痕指向九尾。
2. `finale.confession`｜九尾坦白／牽手貼封印。
3. `finale.seal-test`｜手機第五印專用圖。
4. `finale.ending`｜總命牒專用桌機＋手機圖。

### 高風險但先保留現圖驗證
5. `finale.verdicts`｜九尾失控情緒。
6. `finale.cross`｜命卷伏筆回收。
7. `finale.choice`｜先修 focus，再決定是否重生。

### 程式必修
8. `finale.choice`｜最終三分支 reaction / ending。
9. `finale.ending`｜總命牒捲動與自動跟隨。

---

## 六、目前鎖頁候選

### 優先候選
- `finale.relics`
- `finale.withdrawal`

### 條件式候選
- `finale.verdicts`
- `finale.cross`
- `finale.question`
- `finale.choice`

### 目前不可鎖
- `finale.gate`
- `finale.confession`
- `finale.seal-test`
- `finale.ending`

---

## 七、五卷 Production 完成後的統一下一步

1. 回到緣卷開始逐幕真正定圖。
2. 每幕寫入最終 `✅ USE / 🟡 ADJUST / 🔄 SWAP / 🎨 GENERATE`。
3. 建立跨五卷的 `IMAGE_GENERATION_MASTER_V1.md`，只收真正需要生成的新圖。
4. 第一批能直接鎖的頁面先改成 `🔒 LOCKED`。
5. 五卷視覺鎖定達標後，才開始 V58 程式實作。