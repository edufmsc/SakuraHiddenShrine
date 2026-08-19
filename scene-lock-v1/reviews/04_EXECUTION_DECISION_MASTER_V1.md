# 櫻隱 V58｜逐幕最終執行決策總表 V1

> 分支：`review/v58-scene-lock`
> 來源：五卷 Scene Lock、Visual Audit、Production、高風險檢查、實際 V58 資產目錄，以及 `05_SIX_SCENE_RESOLUTION_V1.md`。
> 用途：之後不再重新討論同一幕該做什麼；所有製作依本表執行，再以實機驗收決定是否 `🔒 LOCKED`。

---

## A｜確定生成專用圖

### 緣之卷
1. `love.silence`｜沉默之後
   - 桌機／手機分開構圖。
   - 必須看出紅線曾斷／熄，且至少一端出現重新接回的動作或痕跡。
   - 不挪用已被 trial 使用的 VERIFY 圖。
2. `love.turn`｜紅線反咬
   - 桌機 16:9 + 手機 9:16 各一張。
   - 鏡中玩家象徵、空椅、紅線繞回玩家自己、九尾側看。
3. `love.result`｜緣卷命牒
   - 桌機／手機分開構圖。
   - 桌機左 4–42% 命牒安全區，九尾右側提筆。
4. `love.ritual`｜封線
   - 九尾＋紅線＋儀式道具同框。
   - 規劃三種 reaction 狀態：未結繞腕／鏡前剪線／門環留線。
5. `love.thread-room`｜線室
   - 若找不到真正「鏡＋未寄信件＋單方紅線＋另一端空白」素材，直接生成。
   - 現 `love_006.webp` 與 `LOVE_empty_threads.webp` 為相同 blob，不接受當成兩幕不同圖。

### 業之卷
6. `career.borrowed`｜成果借名
   - 高優先；若後續實機證明既有 `career_borrowed_evidence.webp` 完整達標，可取消生成。
   - 成果＋他人署名／印章＋九尾推證據。
7. `career.result`｜業卷命牒
   - 左命牒、右九尾＋棋盤＋黑棋。

### 命之卷
8. `life.turn`｜鏡外人
   - 鏡內完整替身、鏡外透明真身、九尾在旁揭露。
9. `life.result`｜命卷命牒
   - 左命牒、右九尾＋恢復同步的鏡面／影子。

### 禁之卷
10. `forbidden.turn`｜面具認主
    - 狐面前景沿紅線到玩家、內側刻痕感、九尾退遠。
11. `forbidden.result`｜禁卷命牒
    - 左命牒、右九尾＋狐面＋禁火／符牆。
12. `forbidden.ending`｜門後無人
    - 真正卸面後收尾；門／鳥居／長廊、放下的狐面、微弱餘火或天將亮冷光。
    - 不再重複 `FORBIDDEN_mirror_gaze_v44.webp`。

### 真命卷
13. `finale.gate`｜無字之門
    - 第五門＋四痕發熱指向九尾＋她第一次失去從容。
14. `finale.confession`｜九尾失言
    - 脆弱坦白、牽玩家手貼封印、第五印前兆。
15. `finale.seal-test`｜手機專用
    - 桌機主圖先保留驗收；只先做 9:16 手機圖。
16. `finale.ending`｜總命牒
    - 全站最高優先之一；桌機／手機分開生成。
    - 桌機左 4–42% 命牒安全區、九尾右 52–85%。

---

## B｜像素／實機先驗，任一硬條件不足即生成

### 業之卷
1. `career.turn`
   - 現圖：`career_new_01.webp / career_015.webp`。
   - 硬條件：抬起棋盤、盤底多雙手、黑棋／玩家手、九尾作為揭露者。
   - 任一缺失即 🎨 GENERATE，不再找泛用人物圖。

### 命之卷
2. `life.cost`
   - 現圖：`life_003.webp / life_020.webp`。
   - 硬條件：至少 3–4 個狀態燈／鏡片、亮度明顯遞減、形成「代價被記帳」。
   - 不足即 🎨 GENERATE。

### 禁之卷
3. `forbidden.pattern`
   - ✅ 已接 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`。
   - 實機必須看得出「多門／多人／相同重複姿態」，否則生成專用圖。
4. `forbidden.threat`
   - ✅ mobile 已修成真正配對 `FORBIDDEN_03_neck_shadow_threat_mobile.webp`。
   - 實機仍要看得出四人／多影重演；若只是近頸威脅照，仍 🎨 GENERATE。

---

## C｜已確定使用／替換現有圖，待實機驗收

### 緣之卷
1. `love.evidence`
   - ✅ desktop：`LOVE_VERIFY_01_next_time_proof_desktop.webp`
   - ✅ mobile：`LOVE_VERIFY_01_next_time_proof_mobile.webp`
   - 原 `LOVE_lips_hush_v44.webp` 不再作正式證據主圖。
2. `love.threshold`
   - ✅ mobile 改 `LOVE_01_rain_bridge_invite_mobile.webp`。

### 命之卷
3. `life.threshold`
   - ✅ mobile → `LIFE_01_water_reflection_mobile.webp`。
4. `life.shadow`
   - ✅ mobile → `LIFE_02_paperdoor_shadow_mobile.webp`。
5. `life.room`
   - ✅ mobile → `LIFE_recline_mobile_v44.webp`。

### 禁之卷
6. `forbidden.threshold`
   - ✅ mobile → `FORBIDDEN_01_talisman_wall_fullbody_mobile.webp`。
7. `forbidden.threat`
   - ✅ mobile → `FORBIDDEN_03_neck_shadow_threat_mobile.webp`；僅修錯配，不代表已通過整幕語意驗收。

---

## D｜不要先生成，優先修程式／焦點／互動

1. `love.face`
   - 圖先留。
   - ✅ 已修「碰臉頰」手機反應誤接到 `LOVE_VERIFY_01_next_time_proof_mobile` 的圖片錯配。
   - hotspot 等實際畫面後再校正原圖 normalized 座標；不憑空猜點位。
2. `love.question`
   - ✅ 圖保留；四選項已改自然繁體中文並移除教材式 hint。
3. `love.pulse-trial`
   - 從 ordinary choice 拆成獨立操作幕，單一觸線 hotspot。
4. `career.stake-trial`
   - 獨立落子操作；variantArt / reactionArt / mobile 全驗。
5. `career.ritual`
   - 三種棋子狀態 reactionArt；不急著換主圖。
6. `life.mirror`
   - 鏡片 hotspot 座標化。
7. `life.body-trial`
   - 獨立操作＋動態圖；不做醫療診斷。
8. `life.ritual`
   - 三種碎鏡儀式狀態反應。
9. `forbidden.mask`
   - 點觸／觀察，不恢復刮除。
10. `forbidden.heat-trial`
    - 高潮操作＋variant/reaction；前四卷不刮。
11. `finale.choice`
    - ✅ 第一輪 desktop/mobile focus 已統一調為 `50% 42%`。
    - 後續三選一各自 reactionArt；目前禁止先重生主圖。
12. `finale.ending`
    - 除了新圖，命牒需固定標題、可見捲軸、內文可捲、逐字自動跟隨。
    - ✅ 第一輪 scrollbar + auto-follow 已用 `style_overrides_v1.css / ui_overrides_v1.js` 落地，待實機驗證。

---

## E｜優先保留，但仍需實機驗收

### 緣
- `love.wrist`
- `love.proximity`
- `love.ending`（手機角色一致性）

### 業
- `career.name`
- `career.threshold`
- `career.pressure`

### 命
- `life.double`
- `life.room`
- `life.threshold`
- `life.shadow`

### 禁
- `forbidden.wrist`
- `forbidden.bait`
- `forbidden.last-proof`

### 真命
- `finale.relics`
- `finale.withdrawal`
- `finale.verdicts`（桌機情緒精準才保留；手機另審）

---

# 實際製作順序（目前正式版）

## 第 1 組｜已完成／正在驗收的現有素材修正
1. ✅ `love.evidence`
2. ✅ `love.threshold` mobile
3. ✅ `love.face` touch reaction mobile bug
4. ✅ `life.threshold` mobile
5. ✅ `life.shadow` mobile
6. ✅ `life.room` mobile
7. ✅ `forbidden.threshold` mobile
8. ✅ `forbidden.pattern` → 現有 VERIFY_01 配對圖先驗
9. ✅ `forbidden.threat` mobile → 真正配對圖
10. `career.turn` → 像素驗收硬條件
11. `life.cost` → 像素驗收硬條件

## 第 2 組｜生成真正缺圖的核心畫面
1. `love.silence`
2. `love.ritual`
3. `forbidden.ending`
4. `love.turn`
5. `career.borrowed`
6. `life.turn`
7. `forbidden.turn`
8. `finale.gate`
9. `finale.confession`
10. `love.thread-room`（若仍無合格現圖）
11. `career.turn`（像素驗收失敗時）
12. `life.cost`（像素驗收失敗時）
13. `forbidden.threat`（配對圖實機仍不合格時）
14. `forbidden.pattern`（VERIFY_01 實機不合格時）

## 第 3 組｜四卷命牒與總命牒
1. `love.result`
2. `career.result`
3. `life.result`
4. `forbidden.result`
5. `finale.ending`

## 第 4 組｜手機專屬終局圖
1. `finale.seal-test` mobile
2. 所有新生命牒 mobile
3. 所有第 2 組高敘事場景 mobile

## 第 5 組｜程式精準修正
1. hotspot normalized/SVG
2. 獨立 trial scenes
3. reactionArt
4. destiny scroll 實機微調
5. per-image focus
6. 最終三選一

---

# 鎖頁規則

任何頁面只有以下全部完成才可 `🔒 LOCKED`：
- 故事定稿。
- 桌機主圖定稿。
- 手機主圖定稿。
- 文字安全區通過。
- `cover` / focus 通過。
- hotspot / reaction / trial / destiny 等互動通過。
- 實際網站桌機與手機畫面驗收通過。

**沒有像素／實機驗收，就只能標 `✅ USE候選`、`🟡 ADJUST` 或 `🟠 PIXEL REVIEW`，不可假裝已鎖。**
