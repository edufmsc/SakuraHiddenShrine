# 櫻隱 V58｜第三批高風險逐幕檢查 V1

> 分支：`review/v58-scene-lock`
> 原則：本批先確認該「換現圖、生成新圖、或先修程式」，尚未完成桌機＋手機實機驗收前不標 `🔒 LOCKED`。

## `love.thread-room` 線室
- 故事：鏡前未寄信件，多條紅線只連同一隻手，另一側沒有第二雙手。
- 現圖：`love_006.webp`；手機 `love_022.webp`。
- 安全區：`S-EVIDENCE`，鏡中空白與單方紅線不能被文字蓋。
- 判定：`🔄 SWAP` 優先；現有素材若無「鏡＋信件＋單方紅線＋另一端空白」，升級 `🎨 GENERATE`。
- 鎖定：⬜

## `love.silence` 沉默之後
- 故事：沉默後誰真正把關係接回來。
- 現圖：`love_015.webp`；手機 `love_020.webp`。
- 必須：斷／熄的紅線、至少一端重新接回、九尾冷靜判讀。
- 判定：`🔄 SWAP` 優先；找不到對題圖再 `🎨 GENERATE`。
- 鎖定：⬜

## `love.ritual` 封線
- 故事：未結腕線／鏡前斷餘／門環留線。
- 現圖：桌機 `FX_004.png`；手機 `love_020.webp`。
- 必須：九尾手或半身＋紅線＋儀式道具。
- 程式：三種選擇應有 reactionArt／道具狀態變化。
- 判定：`🔄 SWAP + 🔧 BUILD`；無合適現圖再生成。
- 鎖定：⬜

## `career.turn` 棋手反轉
- 故事：九尾掀起棋盤，盤底是等玩家收尾的多雙手；唯一黑棋回到玩家掌心。
- 現圖：`career_new_01.webp`；手機 `career_015.webp`。
- 必須：被掀棋盤、盤底多手、黑棋入掌。
- 判定：`🔄 SWAP` 優先；缺核心動作就 `🎨 GENERATE`。
- 鎖定：⬜

## `career.ritual` 玄棋署名
- 故事：黑棋落中央／收袖／撤掉無名棋。
- 現圖：`career_008.webp`；手機 `career_017.webp`。
- 程式：三種選擇至少三種明顯道具狀態，不需要三張完整新背景。
- 判定：`🔧 BUILD` 優先；現圖若連棋盤／手都不足才 `🔄 SWAP`。
- 鎖定：⬜

## `life.cost` 命燈代價
- 故事：消耗開始被記帳，命燈逐盞暗下。
- 現圖：`life_003.webp`。
- 必須：多盞命燈、逐漸暗下、九尾冷靜觀看、疲憊痕跡。
- 判定：`🔄 SWAP` 優先；無命燈敘事圖則 `🎨 GENERATE`。
- 鎖定：⬜

## `forbidden.pattern` 第一道重複
- 故事：不同的人，在不同門後重演同一種背對／拒絕。
- 現圖：`forbidden_005.webp`。
- 必須：3–4 扇門、不同人物／剪影、重複姿態、九尾側看。
- 判定：`🎨 GENERATE` 高優先。
- 鎖定：⬜

## `forbidden.threat` 重演廊
- 故事：四個不同的人，卻在同一種關鍵時刻重演。
- 現圖：`FORBIDDEN_03_neck_shadow_threat_v39.webp`；手機 `forbidden_018.webp`。
- 必須：多人物／影子／門後輪廓，能看出共同壓迫節奏。
- 判定：`🔄 SWAP` 優先；現有素材不足就 `🎨 GENERATE`。
- 鎖定：⬜

## `forbidden.ending` 門後餘火
- 故事：責任留下，罪名散掉；不可再用前面同構圖鏡中凝視收尾。
- 必須：卸面後空間、狐面或燒過一角、禁火漸熄、門後空出來。
- 判定：`🔄 SWAP`；先找現有收尾空景，不急著生成。
- 鎖定：⬜

## `finale.gate` 無字之門
- 故事：四痕同時發熱，指向九尾身後本來不存在的第五門；她第一次說「不對」。
- 現圖：`ending_003.webp`；手機 `SHARED_fullbody_mobile.webp`。
- 必須：第五門、紅線／玄棋／鏡片／狐面四痕、光線指向九尾、九尾失去從容。
- 判定：`🎨 GENERATE` 高優先；shared 手機圖不作正式第五門主圖。
- 鎖定：⬜

## `finale.seal-test` 第五印形成
- 故事：第五印失控形成，九尾想阻止卻不敢碰。
- 桌機：`final_seal_form.webp` → `🟡 ADJUST`，先驗第五印與表情。
- 手機：目前借用禁卷圖 → `🎨 GENERATE mobile`。
- 程式：印記／手勢 hotspot 使用 normalized/SVG。
- 鎖定：⬜

## `finale.choice` 天亮以前的選擇
- 故事：答案、九尾、或一條沒人替玩家命名的路。
- 現圖：`final_seal_touch.webp`。
- 已知：原圖頭臉完整，但現行 `desktopFocus=50% 58%` 可能裁切太低。
- 正確順序：先校 desktop/mobile focus → UI 退後 → 三選一各自 reactionArt → 仍無法保人物才考慮重生。
- 判定：`🟡 ADJUST + 🔧 BUILD`，目前禁止先重生主圖。
- 鎖定：⬜

# 本批結論

- `love.thread-room`：🔄 SWAP → 不足再 🎨
- `love.silence`：🔄 SWAP → 不足再 🎨
- `love.ritual`：🔄 SWAP + 🔧
- `career.turn`：🔄 SWAP → 不足再 🎨
- `career.ritual`：🔧 優先
- `life.cost`：🔄 SWAP → 不足再 🎨
- `forbidden.pattern`：🎨 GENERATE
- `forbidden.threat`：🔄 SWAP → 不足再 🎨
- `forbidden.ending`：🔄 SWAP
- `finale.gate`：🎨 GENERATE
- `finale.seal-test`：桌機 🟡；手機 🎨
- `finale.choice`：🟡 + 🔧，不先重生
