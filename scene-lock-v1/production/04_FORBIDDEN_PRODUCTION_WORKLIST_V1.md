# 櫻隱 V58｜禁之卷製作工作表 V1

> 卷別：禁之卷
> 基底版本：V58
> 分支：`review/v58-scene-lock`
> 目的：把「模式、控制、誘惑、界線、狐面、重演」轉成可直接執行的逐幕製作清單。
> 原則：先定圖 → 再鎖頁 → 最後才修改 V58 程式；不碰 `main`；性感與危險必須同時存在，但不可讓整卷只剩近身美圖。

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

## 二、禁之卷製作目標

禁之卷核心元素固定為：

- 符牆與禁門。
- 鬆綁的紅線與手腕。
- 近火誘惑。
- 狐面與面具內的聲音。
- 鏡面中的玩家反照。
- 多門／多人／同一種重演。
- 狐面認主。
- 最後一寸的高張力操作。
- 禁卷命牒與卸面儀式。

情緒曲線：**進禁門 → 看重演 → 束腕 → 被誘惑 → 面具說出藉口 → 看見自己也在控制 → 四人重演 → 面具認主 → 換第一個動作 → 最後一寸 → 命牒 → 卸面 → 門後無人。**

### 本卷不可犯錯

1. 不把「危險」只做成暗色濾鏡。
2. 不把「重演」只用一張近身威脅照代替。
3. 狐面必須是劇情道具，不是裝飾。
4. 前四卷不再使用刮除互動；禁卷採點觸／觀察／選擇。
5. `forbidden.result` 不得回頭使用已知左側霧化有問題的舊判讀圖。
6. 禁卷結尾不能再次拿前面的同一張鏡像主圖敷衍收尾。

---

## 三、逐幕製作工作表

|幕次|Scene ID|幕名|現用主圖|製作判定|主要工作|新圖可能性|鎖頁|
|-:|---|---|---|---|---|---|---|
|01|`forbidden.threshold`|禁門符牆|`FORBIDDEN_01_talisman_wall_fullbody_v39.webp`|✅ USE / 🟡 ADJUST|驗手機仍有符牆／禁門語意|低|⬜|
|02|`forbidden.pattern`|第一道重複|`forbidden_005.webp`|🔄 SWAP / 🎨 GENERATE|多門／多人／同一背對模式|高|⬜|
|03|`forbidden.wrist`|狐索束腕|`forbidden_red_thread.webp`|✅ USE|保留鬆結與可抽手感|低|⬜|
|04|`forbidden.bait`|近火誘惑|`FORBIDDEN_soft_bait_v44.webp`|✅ USE / 🟡 ADJUST|性感＋危險同時成立|低|⬜|
|05|`forbidden.mask`|狐面揭露|`forbidden_fox_mask.webp`|✅ USE + 🔧 BUILD|點觸／觀察，不用刮除|低|⬜|
|06|`forbidden.mirror`|第二張狐面|`FORBIDDEN_mirror_gaze_v44.webp`|🟡 ADJUST|鏡中必須有玩家反照|中|⬜|
|07|`forbidden.threat`|重演廊|`FORBIDDEN_03_neck_shadow_threat_v39.webp`|🔄 SWAP / 🎨 GENERATE|四個不同的人／同一瞬間|高|⬜|
|08|`forbidden.turn`|面具認主|`FORBIDDEN_dark_gaze_v44.webp`|🔄 SWAP / 🎨 GENERATE|狐面沿紅線停在玩家前、九尾退遠|高|⬜|
|09|`forbidden.last-proof`|停止重演|`FORBIDDEN_seated_bait_v44.webp`|✅ USE / 🟡 ADJUST|保留美貌但不再拿誘惑當答案|低|⬜|
|10|`forbidden.heat-trial`|最後一寸|`FORBIDDEN_mask.webp`＋動態圖|🔧 BUILD|獨立高潮操作、variant/reaction 全驗|視圖而定|⬜|
|11|`forbidden.result`|禁卷判讀|V58 現行 `FORBIDDEN_mirror_gaze_v44.webp`|🎨 GENERATE + 🔧 BUILD|統一命牒專圖|高|⬜|
|12|`forbidden.ritual`|卸下面具|`forbidden_007.webp`|🟡 ADJUST / 🔧 BUILD|三種卸面反應狀態|中|⬜|
|13|`forbidden.ending`|門後無人|V58 現行結尾圖|🔄 SWAP / 🟡 ADJUST|不要重複判讀主圖，改真正收尾|中|⬜|

---

## 四、逐幕正式製作要求

### 01｜`forbidden.threshold` 禁門符牆

**故事任務**：符牆沒有姓名，只有重複句子；九尾抹去主詞，要求玩家看模式而不是找最壞的人。

**現圖**：桌機 `FORBIDDEN_01_talisman_wall_fullbody_v39.webp`；手機 `forbidden_018.webp`。

**必要畫面**：符牆、九尾、無名符、禁門壓迫感。

**安全區**：S-L / S-R；符牆符號不可被 UI 吃掉。

**判定**：桌機 ✅ USE；手機若只剩暗黑人物圖則 🟡 ADJUST／🔄 SWAP。

---

### 02｜`forbidden.pattern` 第一道重複

**故事任務**：四扇小門同時打開，不同的人卻用同一種方式背對玩家。

**現圖**：`forbidden_005.webp`。

**正式畫面必備**：
1. 至少 3–4 扇門或分割出的空間。
2. 不同人物／輪廓。
3. 同樣背對／拒絕／轉身的姿態。
4. 九尾在側邊或前景觀察，不搶掉「重複模式」。

**安全區**：S-EVIDENCE。

**判定**：若現圖沒有「不同人、同一瞬間」，先 🔄 SWAP；素材庫沒有就 🎨 GENERATE。

---

### 03｜`forbidden.wrist` 狐索束腕

**故事任務**：紅線很鬆，玩家其實可以抽手；真正困住的是等待更漂亮的離開理由。

**現圖**：桌機 `forbidden_red_thread.webp`；手機 `FORBIDDEN_02_player_wrist_bound_mobile.webp`。

**必要畫面**：玩家手腕、鬆結、九尾觀察，線必須看得出可以抽出。

**安全區**：S-CLOSE / S-OPERATE；腕部與繩結不可被 UI 蓋。

**判定**：✅ USE 候選。

---

### 04｜`forbidden.bait` 近火誘惑

**故事任務**：九尾刻意把被渴望、被需要、神秘感、拯救感放大，測試玩家是否把強度當安全。

**現圖**：桌機 `FORBIDDEN_soft_bait_v44.webp`；手機 `forbidden_009.webp`。

**必要畫面**：成熟近身、慢呼吸、眼神柔下來，但背景／光線仍有禁線、狐火或危險提示。

**安全區**：S-CLOSE。

**判定**：✅ USE / 🟡 ADJUST；不可只剩性感。

---

### 05｜`forbidden.mask` 狐面揭露

**故事任務**：狐面裡傳出玩家自己的「沒關係」，合理化開始有了臉。

**現圖**：桌機 `forbidden_fox_mask.webp`；手機 `forbidden_014.webp`。

**必要畫面**：狐面貼在九尾臉側、面具內側／聲音來源有異樣感。

**程式要求**：採點觸／觀察；不恢復刮除。

**安全區**：S-L / S-R；臉與狐面不可被文字切開。

**判定**：✅ USE + 🔧 BUILD。

---

### 06｜`forbidden.mirror` 第二張狐面

**故事任務**：玩家在鏡中看見自己也曾沉默、消失、故作不在意來逼對方先暴露。

**現圖**：桌機 `FORBIDDEN_mirror_gaze_v44.webp`；手機 `forbidden_020.webp`。

**必要畫面**：鏡面、九尾、玩家象徵／倒影；要有「你也在試探」的反照感。

**安全區**：S-EVIDENCE。

**判定**：🟡 ADJUST；若沒有玩家反照就 🔄 SWAP。

---

### 07｜`forbidden.threat` 重演廊

**故事任務**：四個不同的人依序轉身，問題不是誰最壞，而是哪一個瞬間總在重演。

**現圖**：桌機 `FORBIDDEN_03_neck_shadow_threat_v39.webp`；手機 `forbidden_018.webp`。

**正式畫面必備**：
- 四個不同人物／影子／門後輪廓。
- 冷淡、依賴、失約、回頭變溫柔可用姿態或光線區分。
- 九尾可以近，但「四個不同的人」一定要成立。

**安全區**：S-EVIDENCE。

**判定**：🔄 SWAP 優先；現有素材不足就 🎨 GENERATE。

---

### 08｜`forbidden.turn` 面具認主

**故事任務**：狐面從九尾手中滑落，沿紅線停在玩家面前，內側刻著玩家自己的字跡；九尾第一次站遠。

**現圖**：桌機 `FORBIDDEN_dark_gaze_v44.webp`；手機 `forbidden_013.webp`。

**正式畫面必備**：
1. 狐面懸在前景／玩家面前。
2. 內側有可辨字跡／痕跡。
3. 紅線把面具帶向玩家。
4. 九尾退遠，不再是唯一主體。

**安全區**：S-EVIDENCE 或中構圖短句。

**判定**：普通暗黑凝視不夠，先 🔄 SWAP；無對題素材就 🎨 GENERATE。

---

### 09｜`forbidden.last-proof` 停止重演

**故事任務**：慾望、危險、喜歡都可以留下；玩家只需要在最熟悉的那一刻換第一個動作。

**現圖**：桌機 `FORBIDDEN_seated_bait_v44.webp`；手機 `forbidden_023.webp`。

**必要畫面**：九尾斜坐、仍有吸引力，但情緒已冷靜；狐面／紅線可以留在畫面提醒前面模式。

**安全區**：S-L / S-R。

**判定**：✅ USE / 🟡 ADJUST。

---

### 10｜`forbidden.heat-trial` 最後一寸

**故事任務**：九尾靠到最後一寸忽然停住；玩家在真正心跳加快時做出不同於舊模式的第一個動作。

**主圖／動態圖**：`FORBIDDEN_mask.webp`＋ branch trial variantArt / reactionArt；手機含 `FORBIDDEN_VERIFY_01_patterns_converge_mobile`、`FORBIDDEN_VERIFY_02_break_the_loop_mobile`、`FORBIDDEN_VERIFY_03_reality_threshold_mobile`、`FORBIDDEN_03_neck_shadow_threat_mobile`。

**程式要求**：
- 獨立高潮操作幕。
- UI 退後、少文字、大畫面。
- variant/reaction/mobile 全部逐張驗。
- 不使用刮除。

**安全區**：S-OPERATE / S-CLOSE。

**判定**：🔧 BUILD；圖片逐分支另審。

---

### 11｜`forbidden.result` 禁卷判讀

**故事任務**：狐面終於肯認主，九尾寫下強度成癮、試探之面、近身退避或斷咒之手等判詞。

**現況**：V58 現行主圖已不是舊 `forbidden_mask_verdict_wide.webp`；舊圖左側霧面已知是原像素問題，不回用。

**正式方向**：禁卷專用命牒：左側可讀命牒，右側九尾＋狐面，背景保留禁火／符牆語意。

**安全區**：S-DESTINY。

**程式要求**：固定標題、內文可捲、捲軸可見、逐字寫入自動跟隨。

**判定**：🎨 GENERATE + 🔧 BUILD。

---

### 12｜`forbidden.ritual` 卸下面具

**故事任務**：玩家可以命名模式、摘下面具但不交給任何人，或只燒掉面具一角。

**現圖**：`forbidden_007.webp`。

**必要畫面**：九尾手／玩家手、狐面、筆痕／狐火／缺角狀態。

**程式／圖片要求**：三個選擇要能看見不同儀式結果，不只改一句文字。

**安全區**：S-OPERATE / S-EVIDENCE。

**判定**：🟡 ADJUST + 🔧 BUILD；視素材決定是否 🔄 SWAP。

---

### 13｜`forbidden.ending` 門後無人

**故事任務**：這次沒有誰替玩家背罪；禁門後只剩餘火、空間與卸下後的安靜。

**製作要求**：
- 不再拿 `FORBIDDEN_mirror_gaze_v44.webp` 重複當正式結尾主圖。
- 優先找禁門／空走廊／餘火／卸下面具後的既有收束圖。
- 只有沒有合適素材才考慮生成。

**安全區**：依空景／人物位置 S-L / S-R；只留 1–2 句。

**判定**：🔄 SWAP 優先。

---

## 五、禁卷最高優先製作清單

### 高優先專用圖
1. `forbidden.pattern`｜多門多人重複。
2. `forbidden.turn`｜狐面認主。
3. `forbidden.result`｜禁卷命牒。

### 高風險，先查現有素材
4. `forbidden.threat`｜四個不同人同一瞬間。
5. `forbidden.ending`｜真正收尾空景。

### 程式必修
6. `forbidden.mask`｜點觸不刮除。
7. `forbidden.heat-trial`｜高潮操作＋動態圖。
8. `forbidden.result`｜命牒捲動。
9. `forbidden.ritual`｜儀式反應狀態。

---

## 六、目前鎖頁候選

### 優先候選
- `forbidden.wrist`
- `forbidden.bait`
- `forbidden.last-proof`

### 條件式候選
- `forbidden.threshold`
- `forbidden.mask`
- `forbidden.mirror`

### 目前不可鎖
- `forbidden.pattern`
- `forbidden.threat`
- `forbidden.turn`
- `forbidden.heat-trial`
- `forbidden.result`
- `forbidden.ritual`
- `forbidden.ending`

---

## 七、後續

本卷完成後不停下來等待，直接繼續真命卷 Production。五卷 Production 齊全後，統一回到逐幕定圖與第一批 `🔒 LOCKED`。