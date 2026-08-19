# 櫻隱 V58｜全章節逐頁畫面定稿總表（審核分支）

> 本文件位於 `review/v58-scene-lock` 分支，只做盤點與定稿紀錄，**不修改 main、不改正式網站程式**。一頁經使用者確認後才標記「🔒已鎖定」。

## 本輪先確認的技術根因

1. **緣卷臉/唇熱區錯位**：目前 `love.face` 的臉頰熱區硬編碼為 `x=59,y=18,w=13,h=18`，唇為 `x=59,y=34,w=13,h=9`。對目前 `love_face_before.webp` 而言，臉頰座標確實落到額頭/眼周。
2. **命牒「可捲但看不出能捲」**：`.destiny-paper` 雖然是 `overflow-y:auto`，但 CSS 同時設定 `scrollbar-width:none`，Chrome/WebKit 也直接 `display:none`；逐字寫入時也沒有自動將新行捲進視野。
3. **禁卷判讀的霧面不是瀏覽器造成**：`forbidden_mask_verdict_wide.webp` 左側模糊已經存在於圖片像素裡，CSS 無法把原本不存在的細節救回來；若不要霧面，需換原圖/重新裁圖/生成新圖。
4. **總命牒擋主角是構圖衝突**：目前左側命牒寬約 `43vw`，但 `final_scroll_desktop.webp` 的九尾在畫面中央，兩者必然互相遮擋。
5. **第五卷最後選擇不一定要重生**：`final_seal_touch.webp` 原圖有完整頭臉，但目前 `desktopFocus=50% 58%` 使實機裁切過低；這一頁先校焦點，再決定是否重生。
6. **精確重複圖目前只找到一組主場景**：`life_mirror_mismatch.webp` 同時用於 `life.double` 與 `finale.cross`，原意是第五卷回收命卷伏筆；另外禁卷判讀/卸面雖不是同檔，構圖過近，仍會產生「又是同一張」的感受。

## 固定驗收規則

- 每頁同時檢查：故事、文字、文字位置、圖片語意、女主角頭/臉/脖/胸/手/腿/九尾、滿版裁切、互動方式、節奏長度。
- 一般場景以完整故事畫面為優先；誘惑/近身/高潮頁可刻意讓臉、胸、頭飾、上半身非常大，但不能把關鍵表情裁掉。
- 圖片不是裝飾：**背景＋九尾動作＋當頁台詞＋玩家操作必須是同一件事。**
- 已核准頁面標記 `🔒已鎖定`；後續修改其他頁不得連帶改壞。

## 入館

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`intake.age`|門縫裡，只有一隻眼睛。|`OPENING_01_door_eyes_desktop_v47.webp`|⚪|⬜|
|2|`intake.name`|「先別給我真名。」|`OPENING_02_pulse_alias_desktop_v47.webp`|⚪|⬜|
|3|`intake.birth`|她把三枚銅錢推到你指下。|`birth_coin_desktop.webp`|⚪|⬜|
|4|`intake.horizon`|「你要我陪你看到哪裡？」|`fx_006.webp`|⚪|⬜|
|5|`intake.omen`|三團狐火，只准憑直覺碰一團。|`RITUAL_01_three_foxes_desktop.webp`|⚪|⬜|

## 緣之卷

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`love.threshold`|先別說對方的名字。|`LOVE_01_rain_bridge_invite_v39.webp`|⚪|⬜|
|2|`love.face`|她把距離交給你。|`love_face_before.webp`|🔴|⬜|
|3|`love.question`|哪一句最怕是真的？|`LOVE_02_mirror_thread_interaction_v39.webp`|⚪|⬜|
|4|`love.wrist`|線一緊，你先顧誰？|`LOVE_04_player_hand_pulled_v39.webp`|⚪|⬜|
|5|`love.evidence`|下一次，是誰留下的？|`LOVE_lips_hush_v44.webp`|⚪|⬜|
|6|`love.thread-room`|鏡子裡沒有第二雙手。|`love_006.webp`|⚪|⬜|
|7|`love.proximity`|被渴望，不等於被選擇。|`LOVE_close_reach_v44.webp`|⚪|⬜|
|8|`love.silence`|誰把關係接回來？|`love_015.webp`|⚪|⬜|
|9|`love.turn`|困住你的，不全是對方。|`love_003.webp`|⚪|⬜|
|10|`love.last-proof`|若你不再餵線，它會怎樣？|`love_last_proof.webp`|⚪|⬜|
|11|`love.pulse-trial`|她把紅線拉到你面前。|`love_012.webp`|⚪|⬜|
|12|`love.result`|紅線肯說實話了。|`love_destiny_wide.webp`|🔴|⬜|
|13|`love.ritual`|選一種帶走答案的方式。|`FX_004.png`|⚪|⬜|
|14|`love.ending`|緣卷封了。|`love_016.webp`|⚪|⬜|

## 業之卷

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`career.threshold`|今晚不算你多努力。|`CAREER_chess_command_v44.webp`|⚪|⬜|
|2|`career.name`|翻一張。別說「大家一起」。|`CAREER_02_table_cards_choice_v39.webp`|⚪|⬜|
|3|`career.black-piece`|這枚棋，離開公司還算你的嗎？|`career_002.webp`|⚪|⬜|
|4|`career.exchange`|「只有你能做。」你要拿什麼換？|`career_003.webp`|⚪|⬜|
|5|`career.borrowed`|成果還在。名字卻被壓到下面。|`career_borrowed_evidence.webp`|⚪|⬜|
|6|`career.pressure`|忙，是最好用的拖延。|`CAREER_03_rain_standing_pressure_v39.webp`|⚪|⬜|
|7|`career.turn`|「不可取代」很好聽。|`career_new_01.webp`|⚪|⬜|
|8|`career.last-proof`|留下可以。先把代價說出來。|`career_001.webp`|⚪|⬜|
|9|`career.stake-trial`|只走一手。|`career_stake_plan.webp`|🔴|⬜|
|10|`career.result`|棋局終於輪到你落子。|`career_new_02.webp`|⚪|⬜|
|11|`career.ritual`|黑棋只能落一次。|`career_008.webp`|🔴|⬜|
|12|`career.ending`|這一局不再替你決定。|`FX_empty_gate.png`|⚪|⬜|

## 命之卷

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`life.threshold`|先別問運。你醒來的第一秒呢？|`LIFE_01_water_reflection_v39.webp`|⚪|⬜|
|2|`life.shadow`|你的影子晚了一個呼吸。|`LIFE_02_paperdoor_shadow_v39.webp`|⚪|⬜|
|3|`life.room`|坐下。別急著把休息也做成任務。|`LIFE_wet_corridor_v44.webp`|⚪|⬜|
|4|`life.mirror`|挑一片。哪一句你一直沒說？|`life_cracked_mirror.webp`|⚪|⬜|
|5|`life.double`|她已經轉身。鏡裡的她沒有。|`life_mirror_mismatch.webp`|⚪|⬜|
|6|`life.cost`|有些燈，已經暗很久了。|`life_003.webp`|⚪|⬜|
|7|`life.turn`|鏡裡那個「永遠能撐」的，才是替身。|`life_mirror_double_face.webp`|⚪|⬜|
|8|`life.last-proof`|不要發誓愛自己。做一件明天看得見的事。|`life_009.webp`|⚪|⬜|
|9|`life.body-trial`|鏡面只照你最先緊繃的地方。|`life_016.webp`|🔴|⬜|
|10|`life.result`|鏡子把你放回來了。|`life_014.webp`|🔴|⬜|
|11|`life.ritual`|碎片不能照全身。|`LIFE_broken_mirror_v44.webp`|⚪|⬜|
|12|`life.ending`|影子終於和你同時回身。|`FX_empty_mirror_hall.png`|⚪|⬜|

## 禁之卷

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`forbidden.threshold`|這一卷，不問誰。|`FORBIDDEN_01_talisman_wall_fullbody_v39.webp`|⚪|⬜|
|2|`forbidden.pattern`|別找最壞的人。找最熟的那一幕。|`forbidden_005.webp`|🔴|⬜|
|3|`forbidden.wrist`|我沒有綁緊。|`forbidden_red_thread.webp`|⚪|⬜|
|4|`forbidden.bait`|她知道你最容易在哪裡鬆口。|`FORBIDDEN_soft_bait_v44.webp`|⚪|⬜|
|5|`forbidden.mask`|狐面裡，是你自己的聲音。|`forbidden_fox_mask.webp`|⚪|⬜|
|6|`forbidden.mirror`|鏡子裡，你也會讓別人猜。|`FORBIDDEN_mirror_gaze_v44.webp`|⚪|⬜|
|7|`forbidden.threat`|四個人。四張臉。同一個瞬間。|`FORBIDDEN_03_neck_shadow_threat_v39.webp`|⚪|⬜|
|8|`forbidden.turn`|狐面不是她的。|`FORBIDDEN_dark_gaze_v44.webp`|⚪|⬜|
|9|`forbidden.last-proof`|下一次，只換第一個動作。|`FORBIDDEN_seated_bait_v44.webp`|⚪|⬜|
|10|`forbidden.heat-trial`|最後一寸，她忽然停了。|`FORBIDDEN_mask.webp`|⚪|⬜|
|11|`forbidden.result`|面具終於肯認主。|`forbidden_mask_verdict_wide.webp`|🔴|⬜|
|12|`forbidden.ritual`|別把面具交給下一個人。|`forbidden_007.webp`|🟠|⬜|
|13|`forbidden.ending`|這次沒有誰替你背罪。|`FX_empty_torii.png`|⚪|⬜|

## 真命卷

|#|Scene ID|標題|目前桌機圖|狀態|鎖定|
|-:|---|---|---|---|---|
|1|`finale.gate`|四道門之外，多了一道沒有名字的鳥居。|`ending_003.webp`|⚪|⬜|
|2|`finale.relics`|四卷留下的東西，同時回來了。|`finale_four_relics.webp`|⚪|⬜|
|3|`finale.verdicts`|這一次，它們在認她。|`finale_uncontrolled.webp`|⚪|⬜|
|4|`finale.cross`|四卷一直還在記另一個人。|`life_mirror_mismatch.webp`|🟡|⬜|
|5|`finale.confession`|「我確實需要你。」|`SHARED_recline.webp`|⚪|⬜|
|6|`finale.seal-test`|狐火要你立刻替她決定。|`final_seal_form.webp`|⚪|⬜|
|7|`finale.question`|這次，沒有別人的名字。|`SHARED_close.webp`|⚪|⬜|
|8|`finale.choice`|答案、她，或一條沒人替你命名的路。|`final_seal_touch.webp`|🔴|⬜|
|9|`finale.withdrawal`|房間只剩一截還在發熱的紅線。|`final_refuse_room.webp`|⚪|⬜|
|10|`finale.ending`|她回來，親手展開總命牒。|`final_scroll_desktop.webp`|🔴|⬜|

## 狀態說明

- `🔴`：使用者截圖已確認有問題，優先修正。
- `🟠`：雖非同檔，但構圖/敘事高度重複，優先換構圖。
- `🟡`：刻意伏筆回收或需要使用者確認是否保留。
- `⚪`：尚未逐頁正式審核，**不代表合格**。
- `⬜`：尚未鎖定；逐頁確認後改為 `🔒`。

## 動態分支圖另審

`love.face`、四卷 branch trial、各卷結果分支與部分選項具有 `variantArt` / `reactionArt`。逐卷審核時會把這些畫面拆成子列，不能只看主場景圖就判定完成。

## 審核順序

`入館 → 緣之卷 → 業之卷 → 命之卷 → 禁之卷 → 真命卷 → 總命牒 → 黎明`
