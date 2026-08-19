# 櫻隱 V58｜第一批鎖頁候選總表 V1

> 分支：`review/v58-scene-lock`
> 目的：整理目前最有機會先完成實機驗收並標記 `🔒 LOCKED` 的頁面，避免每次都從高風險頁開始，拖慢整卷收斂。
> 注意：本表只是候選，不代表已鎖定。

---

## 一、鎖頁固定條件

每幕只有以下六項全部通過，才可改成 `🔒 LOCKED`：

1. 故事內容不再修改。
2. 主圖／手機圖已確定。
3. 桌機 `cover` 裁切安全。
4. 手機 9:16 構圖安全。
5. 文字／選項不遮臉、手、道具、異象。
6. hotspot／reaction／命牒等互動已實測。

---

## 二、第一批最高優先鎖頁候選

### 緣之卷

#### `love.wrist`
- 理由：桌機／手機都有明確配對圖，故事動作單純且清楚。
- 驗收：手腕、紅線、九尾視線、下方 UI。
- 預估：最容易先鎖。

#### `love.proximity`
- 理由：主圖與近身節奏已明確，主要只需台詞自然化與裁切驗證。
- 驗收：臉、狐耳、脖、胸線、伸手、手機下方 UI。

---

### 業之卷

#### `career.name`
- 理由：桌機／手機成對、成果牌與署名故事直接。
- 驗收：牌面／姓名、文字安全區、卡牌不能被 UI 蓋。

#### `career.threshold`
- 理由：主圖方向成熟，主要驗棋盤是否仍可辨。
- 驗收：棋盤、人物比例、手機構圖。

---

### 命之卷

#### `life.double`
- 理由：`life_mirror_mismatch.webp` 是命卷核心伏筆，現有故事定位清楚。
- 驗收：現實九尾與鏡中九尾不同步是否一眼看懂。
- 注意：第五卷回收另做狀態差異，不影響本幕先鎖。

#### `life.room`
- 理由：故事與現有潮濕長廊／休息畫面方向一致，互動低風險。
- 驗收：手機肩頸／濕髮不被 UI 蓋，性感不搶掉「停下來」的主題。

---

### 禁之卷

#### `forbidden.wrist`
- 理由：束腕故事單純、桌機與手機方向都有明確素材。
- 驗收：紅線要看得出是鬆的，玩家可以抽手。

#### `forbidden.bait`
- 理由：現圖本身就是近火誘惑，主要驗「危險＋性感」是否同時成立。
- 驗收：狐火／禁線、臉、脖、胸、手機 UI。

#### `forbidden.last-proof`
- 理由：現圖與「保留慾望但換第一個動作」方向一致。
- 驗收：台詞縮短、面具／紅線作為前情提示即可。

---

### 真命卷

#### `finale.relics`
- 理由：`finale_four_relics.webp` 已明確服務四痕上桌。
- 驗收：紅線、玄棋、鏡片、狐面四件是否一眼可辨；手機亦同。

#### `finale.withdrawal`
- 理由：`final_refuse_room.webp` 的「九尾不在場」正是故事本身，不需要補人物。
- 驗收：四痕、發熱紅線、手書、門外將亮是否清楚。

---

## 三、第二批條件式鎖頁候選

### 緣
- `love.threshold`：手機改真正配對圖後可鎖。
- `love.face`：hotspot 根治後可鎖。
- `love.question`：選項文字自然化後可鎖。
- `love.last-proof`：九尾 presence 校正後可鎖。
- `love.ending`：手機角色一致性驗證後可鎖。

### 業
- `career.black-piece`：手機換對題素材後可鎖。
- `career.pressure`：驗雨局與棋盤是否同時可見。
- `career.last-proof`：驗燈熄／棋路減少是否成立。
- `career.ending`：避免 shared 圖過度重複即可。

### 命
- `life.threshold`：手機倒影異常成立即可。
- `life.shadow`：手機遲影成立即可。
- `life.mirror`：hotspot 座標化後可鎖。
- `life.last-proof`：四片鏡能看懂即可。
- `life.ending`：同步收束語意成立即可。

### 禁
- `forbidden.threshold`：手機仍保留符牆／禁門語意即可。
- `forbidden.mask`：點觸互動確認後可鎖。
- `forbidden.mirror`：鏡中玩家反照成立即可。

### 真命
- `finale.verdicts`：九尾失控表情精準＋手機專用圖後可鎖。
- `finale.cross`：第五卷伏筆回收狀態化後可鎖。
- `finale.question`：角色一致＋近身裁切通過即可。
- `finale.choice`：focus 與三分支反應圖完成後可鎖。

---

## 四、目前禁止先鎖的高風險頁

### 緣
`love.evidence`、`love.thread-room`、`love.silence`、`love.turn`、`love.pulse-trial`、`love.result`、`love.ritual`

### 業
`career.exchange`、`career.borrowed`、`career.turn`、`career.stake-trial`、`career.result`、`career.ritual`

### 命
`life.cost`、`life.turn`、`life.body-trial`、`life.result`、`life.ritual`

### 禁
`forbidden.pattern`、`forbidden.threat`、`forbidden.turn`、`forbidden.heat-trial`、`forbidden.result`、`forbidden.ritual`、`forbidden.ending`

### 真命
`finale.gate`、`finale.confession`、`finale.seal-test`、`finale.ending`

---

## 五、第一批鎖頁執行順序

建議固定順序：

1. `love.wrist`
2. `love.proximity`
3. `career.name`
4. `career.threshold`
5. `life.double`
6. `life.room`
7. `forbidden.wrist`
8. `forbidden.bait`
9. `forbidden.last-proof`
10. `finale.relics`
11. `finale.withdrawal`

這一批只做低風險頁的「圖＋文字＋RWD＋互動」實機鎖定，不牽動高風險頁，避免一開始就大改整站。