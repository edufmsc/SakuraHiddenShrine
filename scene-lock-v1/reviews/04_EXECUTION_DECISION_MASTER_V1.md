# 櫻隱 V58｜逐幕最終執行決策總表 V1

> 分支：`review/v58-scene-lock`
> 來源：五卷 Scene Lock、Visual Audit、Production、高風險檢查與實際 V58 資產目錄。
> 用途：之後不再重新討論同一幕該做什麼；所有製作依本表執行，再以實機驗收決定是否 `🔒 LOCKED`。

---

## A｜確定生成專用圖

### 緣之卷
1. `love.turn`｜紅線反咬
   - 桌機 16:9 + 手機 9:16 各一張。
   - 鏡中玩家象徵、空椅、紅線繞回玩家自己、九尾側看。
2. `love.result`｜緣卷命牒
   - 桌機／手機分開構圖。
   - 桌機左 4–42% 命牒安全區，九尾右側提筆。

### 業之卷
3. `career.borrowed`｜成果借名
   - 高優先；若後續實機證明既有 `career_borrowed_evidence.webp` 完整達標，可取消生成。
   - 成果＋他人署名／印章＋九尾推證據。
4. `career.result`｜業卷命牒
   - 左命牒、右九尾＋棋盤＋黑棋。

### 命之卷
5. `life.turn`｜鏡外人
   - 鏡內完整替身、鏡外透明真身、九尾在旁揭露。
6. `life.result`｜命卷命牒
   - 左命牒、右九尾＋恢復同步的鏡面／影子。

### 禁之卷
7. `forbidden.turn`｜面具認主
   - 狐面前景沿紅線到玩家、內側刻痕感、九尾退遠。
8. `forbidden.result`｜禁卷命牒
   - 左命牒、右九尾＋狐面＋禁火／符牆。

### 真命卷
9. `finale.gate`｜無字之門
   - 第五門＋四痕發熱指向九尾＋她第一次失去從容。
10. `finale.confession`｜九尾失言
    - 脆弱坦白、牽玩家手貼封印、第五印前兆。
11. `finale.seal-test`｜手機專用
    - 桌機主圖先保留驗收；只先做 9:16 手機圖。
12. `finale.ending`｜總命牒
    - 全站最高優先之一；桌機／手機分開生成。
    - 桌機左 4–42% 命牒安全區、九尾右 52–85%。

> `forbidden.pattern` 已從「確定生成」移出：V58 active 內存在 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`，已先接入 review 程式，實機不合格才重新生成。

---

## B｜先換現有圖，找不到／驗收失敗才生成

### 緣之卷
1. `love.evidence`
   - ✅ 已接：`LOVE_VERIFY_01_next_time_proof_desktop.webp`
   - ✅ 手機：`LOVE_VERIFY_01_next_time_proof_mobile.webp`
   - 原 `LOVE_lips_hush_v44.webp` 不再作正式證據主圖。
2. `love.thread-room`
   - 必須有鏡＋未寄信件＋單方紅線＋另一端空白。
   - **重要：目前 `love_006.webp` 與 `LOVE_empty_threads.webp` 使用完全相同 GitHub blob SHA，代表現在是重複素材，不接受現況。**
   - 找不到真正對題現圖就直接生成。
3. `love.silence`
   - 必須有斷／熄紅線＋至少一端重新接回。
4. `love.ritual`
   - 找九尾＋儀式道具構圖；桌機純 `FX_004.png` 不作正式主圖。

### 業之卷
5. `career.turn`
   - 找抬起棋盤／盤底多手／黑棋入掌；不足才生成。

### 命之卷
6. `life.cost`
   - 找命燈逐盞暗下／消耗被記帳構圖；不足才生成。

### 禁之卷
7. `forbidden.pattern`
   - ✅ 已接 `FORBIDDEN_VERIFY_01_patterns_converge_desktop/mobile`。
   - 實機必須看得出「多門／多人／相同重複姿態」，否則仍生成專用圖。
8. `forbidden.threat`
   - 找多人物／多影子／重演結構；不足才生成。
9. `forbidden.ending`
   - 換真正的卸面後空景／餘火收尾，不重複前面鏡像主圖。

---

## C｜不要先生成，優先修程式／焦點／互動

1. `love.face`
   - 圖先留。
   - ✅ 已修「碰臉頰」手機反應誤接到 `LOVE_VERIFY_01_next_time_proof_mobile` 的圖片錯配。
   - hotspot 仍需改原圖 normalized 座標／SVG viewBox。
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
    - 先修 `desktopFocus/mobileFocus`；三選一各自 reactionArt；目前禁止先重生主圖。
12. `finale.ending`
    - 除了新圖，命牒本身還需固定標題、可見捲軸、內文可捲、逐字自動跟隨。

---

## D｜已修明確手機錯配，優先保留待實機驗收

### 緣
- `love.threshold` → ✅ `LOVE_01_rain_bridge_invite_mobile.webp`
- `love.wrist`
- `love.proximity`
- `love.ending`（手機角色一致性仍驗）

### 業
- `career.name`
- `career.threshold`
- `career.pressure`

### 命
- `life.threshold` → ✅ `LIFE_01_water_reflection_mobile.webp`
- `life.shadow` → ✅ `LIFE_02_paperdoor_shadow_mobile.webp`
- `life.room` → ✅ 恢復 `LIFE_recline_mobile_v44.webp`
- `life.double`

### 禁
- `forbidden.threshold` → ✅ `FORBIDDEN_01_talisman_wall_fullbody_mobile.webp`
- `forbidden.wrist`
- `forbidden.bait`
- `forbidden.last-proof`

### 真命
- `finale.relics`
- `finale.withdrawal`
- `finale.verdicts`（桌機情緒精準才保留；手機另審）

---

# 實際製作順序（更新版）

## 第 1 組｜繼續解決現有素材錯配
1. ✅ `love.evidence`
2. ✅ `love.threshold` mobile
3. ✅ `love.face` touch reaction mobile bug
4. ✅ `life.threshold` mobile
5. ✅ `life.shadow` mobile
6. ✅ `life.room` mobile
7. ✅ `forbidden.threshold` mobile
8. ✅ `forbidden.pattern` → 現有 VERIFY_01 配對圖先驗
9. `love.thread-room` → 現圖已確認為重複 blob，找替代，沒有就生成
10. `love.silence`
11. `love.ritual`
12. `career.turn`
13. `life.cost`
14. `forbidden.threat`
15. `forbidden.ending`

## 第 2 組｜生成真正缺圖的核心畫面
1. `love.turn`
2. `career.borrowed`
3. `life.turn`
4. `forbidden.turn`
5. `finale.gate`
6. `finale.confession`
7. `love.thread-room`（只有第 1 組確認無合格現圖時）
8. `forbidden.pattern`（只有現有 VERIFY_01 實機不合格時）

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
4. destiny scroll
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

**沒有像素／實機驗收，就只能標 `✅ USE候選` 或 `🟡 ADJUST`，不可假裝已鎖。**
