# 櫻隱 V58｜六幕素材定案 V1

> 分支：`review/v58-scene-lock`
> 日期：2026-08-19
> 範圍：`love.silence → love.ritual → career.turn → life.cost → forbidden.threat → forbidden.ending`
> 原則：不以檔名猜畫面；GitHub 只能確認路徑、SHA、現行 story 映射與專用配對關係。沒有像素／實機畫面就不標 `🔒 LOCKED`。

---

## 1｜`love.silence`｜沉默之後

### 故事任務
紅線先熄滅，再看冷下來後究竟是誰把關係真正接回來。

### 現況
- desktop：`assets/images/active/01_love/love_015.webp`
- mobile：`assets/images/active/01_love/love_020.webp`
- active 內雖有 `LOVE_VERIFY_02_*`、`LOVE_VERIFY_03_*`，但它們已是 trial / reaction 系統的正式素材，不再拿來重複支撐一般劇情幕。
- library 內的 `love_001/002/004/005/007/010/013/014/023/new_01/new_02` 缺乏語意標籤；在未做像素檢查前不可憑檔名指定。

### 最終判定
**🎨 GENERATE**

### 專圖必備
- 明確看得到紅線曾斷／熄。
- 至少一端出現「重新接回」的動作或痕跡。
- 九尾在場，但不是靠台詞補故事。
- desktop / mobile 分開構圖。
- 不與 `love.pulse-trial` 的 VERIFY 圖重複。

---

## 2｜`love.ritual`｜封線

### 故事任務
玩家完成緣卷判詞後，選擇如何把紅線帶回現實：不打結、剪去多餘一截、或留在門環。

### 現況
- desktop：`assets/images/active/08_props/FX_004.png`
- mobile：`assets/images/active/01_love/love_020.webp`

目前桌機只是純道具圖，手機又借用其他緣卷人物圖，無法形成正式收卷儀式。

### 最終判定
**🎨 GENERATE + 🔧 reactionArt**

### 專圖必備
- 九尾成熟成人形象清楚存在。
- 紅線與儀式道具同框。
- 可讓三個 ritual choice 產生狀態差：
  1. 未打結繞腕。
  2. 鏡前剪線。
  3. 線留門環。
- 若三張 reactionArt 成本過高，至少主圖 + 3 個局部狀態圖。

---

## 3｜`career.turn`｜棋手反轉

### 故事任務
九尾抬起棋盤，盤底是一雙雙等玩家替它們完成最後一步的手；玩家第一次意識到自己不是棋，而是一直替整個系統維持運作的手。

### 現況
- desktop：`assets/images/active/02_career/career_new_01.webp`
- mobile：`assets/images/active/02_career/career_015.webp`
- active / library 未發現名稱可明確證明有「抬盤＋盤底多手＋黑棋回掌」的更可靠配對圖。

### 最終判定
**🟠 PIXEL REVIEW FIRST → 不足即 🎨 GENERATE**

### 驗收硬條件
只要以下任一項缺失，就直接生成，不再繼續找泛用人物圖：
- 棋盤真的被抬起／翻起。
- 盤底多雙手成立。
- 黑棋或玩家手成為反轉核心。
- 九尾像揭露者，不是單純美人肖像。

---

## 4｜`life.cost`｜身體記帳

### 故事任務
鏡片依序亮出睡眠、食慾、肩頸、耐心；每一盞命燈比上一盞更暗。畫面本身要讓玩家感到「代價被記帳」。

### 現況
- desktop：`assets/images/active/03_life/life_003.webp`
- mobile：`assets/images/active/03_life/life_020.webp`
- active / library 有許多命卷鏡面與 VERIFY 素材，但沒有名稱能直接證明是「多盞命燈逐步熄暗」。

### 最終判定
**🟠 PIXEL REVIEW FIRST → 不足即 🎨 GENERATE**

### 驗收硬條件
- 至少 3–4 個清楚可辨的狀態燈／鏡片。
- 亮度有明顯遞減。
- 九尾冷靜觀察，不做醫療診斷式視覺。
- 關鍵暗燈不可被文字遮掉。

若現圖只是一般人物／鏡面圖，直接生成。

---

## 5｜`forbidden.threat`｜重演廊

### 故事任務
四個不同的人依序轉身；重點是「不同的人，卻同一個重演瞬間」。

### 原錯配
- desktop：`FORBIDDEN_03_neck_shadow_threat_v39.webp`
- mobile 原本誤接：`forbidden_018.webp`

### 已修
active 內存在真正配對：
- desktop：`FORBIDDEN_03_neck_shadow_threat_v39.webp`
- mobile：`FORBIDDEN_03_neck_shadow_threat_mobile.webp`

已寫入 `story_overrides_v1.js`。

### 最終判定
**🟡 ADJUST / PIXEL REVIEW**

### 後續規則
- 先驗真正配對的 desktop + mobile。
- 若畫面只是「近頸陰影威脅」而沒有四人／多影重演結構，仍改成 🎨 GENERATE。
- 這一輪只修錯配，不假裝已經通過故事語意驗收。

---

## 6｜`forbidden.ending`｜門後無人

### 故事任務
卸下面具後，門後不再有人替玩家背罪。這是禁卷真正的餘韻，不應再次回到前面的鏡中誘惑／自我試探畫面。

### 現況
V58 scene 定義本身使用：
- desktop：`FORBIDDEN_mirror_gaze_v44.webp`
- mobile：`forbidden_020.webp`

這組同時已被 `forbidden.mirror` / `forbidden.result` 使用，語意與視覺都重複。

active 中另有 `forbidden_007.webp`（儀式）、`forbidden_new_03.webp`、`forbidden_022.webp` 等；library 也有 `FORBIDDEN_04_final_confrontation` 等，但沒有任何路徑名稱足以證明「卸面後空景／餘火／門後無人」。

### 最終判定
**🎨 GENERATE**

### 專圖必備
- 人物可非常小，甚至九尾不必正面出現。
- 門／鳥居／長廊收尾。
- 狐面已被放下、摘下、留在地面或桌面。
- 只剩弱狐火／天將亮的冷光。
- 不再使用 `FORBIDDEN_mirror_gaze_v44.webp`。
- 不使用純 generic `FX_empty_torii.png` 作正式最終圖；可當構圖參考，但正式圖要有禁卷痕跡。

---

# 本批結論

## 直接生圖
1. `love.silence`
2. `love.ritual`
3. `forbidden.ending`

## 現圖先做像素驗收，不足立刻生圖
4. `career.turn`
5. `life.cost`
6. `forbidden.threat`

其中 `forbidden.threat` 的手機錯配已先完成程式修正。

# 不變規則

- `main` 不修改。
- 不因本批修正重寫整份 `story.js` / `style.css`。
- 圖片未實際看過像素與裁切前，不標 `🔒 LOCKED`。
- 同一張圖片若已在重要 trial / result 使用，不再為了省圖硬重複到一般劇情幕。
