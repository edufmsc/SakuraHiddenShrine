# 櫻隱 V58｜緣之卷製作工作表 V1

> 卷別：緣之卷
> 基底版本：V58
> 分支：`review/v58-scene-lock`
> 目的：正式從「規格／審核」進入「製作執行」
> 原則：先定圖 → 再鎖頁 → 最後才修改 V58 程式
> 不碰 `main`；不整理全站 CSS；不因修別頁而改壞已鎖頁。

---

## 一、狀態代號

- `✅ USE`：直接保留現圖
- `🟡 ADJUST`：保留，但需調整焦點／手機圖／安全區／台詞
- `🔄 SWAP`：換成現有素材庫更適合的圖
- `🎨 GENERATE`：必須生成專用新圖
- `🔧 BUILD`：需要程式實作（hotspot／命牒／操作幕）
- `⬜`：尚未鎖頁
- `🔒`：已鎖頁

---

## 二、緣之卷整體製作目標

緣之卷是《櫻隱》中最靠近玩家、最有身體距離感、紅線與情感驗證最多的一卷。

情緒曲線：**靠近 → 被誘惑 → 找證據 → 看見只有自己在維持 → 紅線反咬 → 停止餵線 → 九尾下判 → 自己封線。**

### 本卷不可犯錯

1. 不能做成心理測驗。
2. 不能同一張漂亮圖重複撐太多幕。
3. 不能只靠台詞講故事，畫面必須真的演出事件。
4. 不能讓命牒蓋住九尾的重要部位。
5. 不能桌機好看、手機裁壞。
6. hotspot 點位不可因 cover / resize 跑掉。

---

## 三、逐幕製作工作表

|幕次|Scene ID|幕名|現用主圖|製作判定|主要工作|是否需新圖|鎖頁|
|-:|---|---|---|---|---|---|---|
|01|`love.threshold`|雨廊邀請|`LOVE_01_rain_bridge_invite_v39.webp`|🟡 ADJUST|手機改真正配對圖、確認安全區|否|⬜|
|02|`love.face`|臉前一寸|`love_face_before.webp`|🟡 ADJUST + 🔧 BUILD|修 hotspot、三種近身互動|否|⬜|
|03|`love.question`|第一問|`LOVE_02_mirror_thread_interaction_v39.webp`|🟡 ADJUST|改掉心理測驗式文案|否|⬜|
|04|`love.wrist`|纏腕|`LOVE_04_player_hand_pulled_v39.webp`|✅ USE|檢查手機裁切與文字遮擋|否|⬜|
|05|`love.evidence`|第一項證據|`LOVE_lips_hush_v44.webp`|🔄 SWAP|優先改 `LOVE_VERIFY_01_next_time_proof_*`|可能否|⬜|
|06|`love.thread-room`|線室|`love_006.webp`|🔄 SWAP / 🎨 GENERATE|確認只有一方維持紅線|可能是|⬜|
|07|`love.proximity`|近身|`LOVE_close_reach_v44.webp`|🟡 ADJUST|九尾台詞自然化|否|⬜|
|08|`love.silence`|沉默之後|`love_015.webp`|🔄 SWAP|換「斷線後誰接回」對題畫面|可能否|⬜|
|09|`love.turn`|紅線反咬|`love_003.webp`|🎨 GENERATE|專用反轉構圖|是|⬜|
|10|`love.last-proof`|最後一證|`love_last_proof.webp`|🟡 ADJUST|九尾不能完全消失|否|⬜|
|11|`love.pulse-trial`|觸線試煉|`love_012.webp`|🔧 BUILD|從 choice 拆成獨立操作幕|視圖而定|⬜|
|12|`love.result`|緣卷命牒|`love_destiny_wide.webp`|🎨 GENERATE + 🔧 BUILD|命牒專圖＋命牒捲動元件|是|⬜|
|13|`love.ritual`|封線|`FX_004.png`|🔄 SWAP / 🎨 GENERATE|九尾＋儀式道具同框|高機率是|⬜|
|14|`love.ending`|雨停以前|`love_016.webp`|🟡 ADJUST|檢查手機角色一致性|否|⬜|

---

## 四、逐幕正式製作要求

### 01｜`love.threshold` 雨廊邀請
- 保留桌機主圖。
- 手機優先改回 `LOVE_01_rain_bridge_invite_mobile.webp`。
- 左側文字安全區；手勢、狐耳、臉不得被裁。
- 完成條件：桌機與手機都看得出「九尾等玩家自己跨半步」。

### 02｜`love.face` 臉前一寸
- 保留主圖。
- 三種互動：碰臉頰／停在唇前／收手。
- hotspot 改為原圖 normalized 座標或 SVG overlay。
- 完成條件：點位在各尺寸下仍精準；文字不壓眼、唇、胸線、玩家手。

### 03｜`love.question` 第一問
- 保留圖。
- 玩家選項改成自然台詞：
  1. `如果我不再往前，對方還會靠近嗎？`
  2. `為什麼每次都要等我真的走了，對方才回頭？`
  3. `那些我一直記得的細節……真的是答案嗎？`
  4. `我還要替這條線留位置多久？`
- 移除教材式 hint。

### 04｜`love.wrist` 纏腕
- 保留圖。
- 紅線勒腕位置不可被文字蓋住。
- 手機實測不能切掉手腕或九尾視線。

### 05｜`love.evidence` 第一項證據
- 不再把 `LOVE_lips_hush_v44.webp` 當正式主圖。
- 優先測：`LOVE_VERIFY_01_next_time_proof_desktop.webp` / `LOVE_VERIFY_01_next_time_proof_mobile.webp`。
- 畫面必須有日期、安排、痕跡或可被指認的「下一次」證據。
- 玩家一看就知道這幕在看「誰真的讓下一次發生」。

### 06｜`love.thread-room` 線室
- 現圖需同時具備鏡面、信／紙籤、多條紅線、只有一方維持、另一側沒有第二隻手。
- 缺關鍵元素就換圖或生圖，不用台詞硬補。

### 07｜`love.proximity` 近身
- 保留近身圖與誘惑感。
- 台詞改成九尾本人會說的短句，不用諮商／分析語氣。
- 性感要服務「被渴望不等於被選擇」的故事。

### 08｜`love.silence` 沉默之後
- 必須看出關係曾斷掉，且有／沒有重新接回的差異。
- 若現圖只是普通人物長廊圖，直接從現有素材換圖。

### 09｜`love.turn` 紅線反咬
- 專屬新圖高優先。
- 必備：鏡中玩家象徵、空椅、紅線從鏡後繞回玩家、九尾側旁觀察、被看穿的壓力。
- 這是全卷反轉點，不能用普通倒影圖替代。

### 10｜`love.last-proof` 最後一證
- 保留桌面紅線概念。
- 九尾與玩家都暫時不碰線，但九尾不應完全消失。
- 檢查並調整 `heroPresence: empty`。

### 11｜`love.pulse-trial` 觸線試煉
- 從前幕 ordinary choice 拆成獨立操作幕。
- 單一動作：玩家點紅線一次。
- 不是答題頁。

### 12｜`love.result` 緣卷命牒
- 若現圖無左側命牒安全區，生成命牒專用圖。
- 圖：右側九尾＋左側完整命牒留白；手、筆、臉、胸不可被紙蓋。
- 程式：標題固定、內文可捲、捲軸可見、逐字寫入自動跟隨；點命牒只加速，不跳頁。

### 13｜`love.ritual` 封線
- 不再以純道具 `FX_004.png` 當桌機正式主圖。
- 必須有九尾手／半身、紅線與儀式道具。
- 三種選擇最好各有 reactionArt 或道具狀態改變。

### 14｜`love.ending` 雨停以前
- 桌機圖先保留。
- 手機 shared 圖必須驗證是否為同一位九尾。
- 只留 1–2 句情緒收束，不再做教學式總結。

---

## 五、目前生圖優先級

### 必生高優先
1. `love.turn`
2. `love.result`

### 高機率需生圖
3. `love.ritual`

### 視現圖檢查決定
4. `love.thread-room`
5. `love.silence`

---

## 六、目前鎖頁候選

### 優先可鎖
- `love.wrist`
- `love.proximity`

### 條件式可鎖
- `love.threshold`
- `love.face`
- `love.question`
- `love.last-proof`
- `love.ending`

### 需先處理、目前不可鎖
- `love.evidence`
- `love.thread-room`
- `love.silence`
- `love.turn`
- `love.pulse-trial`
- `love.result`
- `love.ritual`

---

## 七、後續順序

1. 緣卷逐幕完成最終圖片判定。
2. 建立正式需生圖清單。
3. 完成第一批 `🔒 LOCKED`。
4. 再進入業之卷相同流程。
5. 五卷全部定圖後，才正式修改 V58 程式。
