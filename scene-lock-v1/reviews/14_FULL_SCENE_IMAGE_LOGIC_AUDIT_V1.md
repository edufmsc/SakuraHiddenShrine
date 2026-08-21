# 《櫻隱》V58｜全站逐幕圖片／操作／故事邏輯稽核 V1

> Branch: `review/v58-scene-lock`
> Date: 2026-08-21
> Rule: 不以「有圖」當成完成。每幕必須同時檢查劇情動作、圖片動作、前後幕重複、Desktop/Mobile、選項後反應。

## 判定

- 🟢 可保留：圖片與劇情動作吻合，前後幕辨識清楚。
- 🟡 可用但仍需實機確認：主要語意成立，但構圖／裁切／證據辨識需人工看。
- 🟠 暫時修正：流程可用，但仍混用舊素材、橫圖或非專用反應圖。
- 🔴 需要專圖：不同事件仍共用同一畫面，不能以焦點或文字假裝不同。

---

## 一、29 張正式生成圖逐幕檢查

| 卷 | 場景 | 正式圖 | 圖片是否演到劇情動作 | Desktop / Mobile | 判定 | 處理 |
|---|---|---|---|---|---|---|
| 緣 | `love.silence` | `LOVE_SILENCE_01_one_sided_thread_*` | 紅線熄後只剩一端亮回成立；畫面沒有玩家伸手，因此文字已改成「你沒有伸手，觀察另一端是否自己接回」 | 成對 | 🟡 | 語意已對齊，實機確認即可 |
| 緣 | `love.turn` | `LOVE_TURN_01_thread_bites_back_*` | 玩家手、腕線、鏡面、空椅與紅線繞回玩家的反轉清楚 | 成對 | 🟢 | 保留 |
| 緣 | `love.result` | `LOVE_RESULT_01_destiny_scroll_*` | 空白命牒＋九尾，符合寫卷 | 成對 | 🟢 | 保留 |
| 緣 | `love.ritual` | `LOVE_RITUAL_01_seal_thread_*` | 玩家腕線、剪線工具、印記、九尾都存在；適合當「封線儀式主畫面」 | 成對 | 🟡 | 主圖保留；不能再拿同一張當三個不同結果 |
| 業 | `career.borrowed` | `CAREER_BORROWED_01_name_swap_proof_*` | 棋盤／成果證據成立，但「成果仍在、署名換人」不是一眼就能看懂 | 成對 | 🟡 | 已用標題與對白明確補足，不再要求玩家猜圖 |
| 業 | `career.result` | `CAREER_RESULT_01_destiny_scroll_*` | 空白命牒＋九尾，符合業卷判讀 | 成對 | 🟢 | 保留 |
| 命 | `life.turn` | `LIFE_TURN_01_mirror_substitute_*` | 鏡內完整、鏡外逐漸透明的替身反轉清楚 | 成對 | 🟢 | 保留 |
| 命 | `life.result` | `LIFE_RESULT_01_destiny_scroll_*` | 空白命牒＋九尾 | 成對 | 🟢 | 保留 |
| 禁 | `forbidden.turn` | `FORBIDDEN_TURN_01_mask_recognizes_player_*` | 狐面、紅線、玩家手、九尾退遠，認主反轉成立 | 成對 | 🟢 | 保留 |
| 禁 | `forbidden.result` | `FORBIDDEN_RESULT_01_destiny_scroll_*` | 空白命牒＋狐面／九尾 | 成對 | 🟢 | 保留 |
| 禁 | `forbidden.ending` | `FORBIDDEN_ENDING_01_empty_gate_*` | 門後無人、天將亮成立；九尾仍在前景 | 成對 | 🟡 | 核心語意成立，實機確認「空門」是否仍足夠明確 |
| 五 | `finale.gate` | `FINALE_GATE_01_fifth_door_*` | 發光第五門、九尾驚訝、四件命痕朝門聚合，符合「本來不存在的第五門」 | 成對 | 🟢 | 保留 |
| 五 | `finale.confession` | `FINALE_CONFESSION_01_vulnerable_seal_*` | 九尾脆弱、玩家手、胸前第五印，與坦白及失言一致 | 成對 | 🟢 | 保留 |
| 五 | `finale.seal-test` | `FINALE_SEAL_TEST_01_uncontrolled_seal_mobile` | 第五印失控、九尾驚訝、玩家手與四痕成立 | **只有正式 Mobile** | 🟠 | 主畫面成立；Desktop仍非同系列專圖，兩個行為反應仍需要專圖 |
| 終 | `finale.ending` | `FINALE_ENDING_01_final_destiny_scroll_*` | 大面積空白總命牒＋九尾＋黎明，適合最後總結 | 成對 | 🟢 | 保留；紙面座標已校正 |

> 上表一列代表 Desktop / Mobile 一組，因此共涵蓋 29 張正式生成圖。

---

## 二、動態選項／反應圖稽核

### 1. `love.face`

原問題：手機端「原畫面／碰臉頰／停在唇前」多次共用同一張 `LOVE_03_close_face_bait_mobile.webp`。

目前修正：
- 碰臉頰 → `love_face_touch.webp`
- 停在唇前 → `LOVE_lips_mobile.webp`
- 收回手 → 原本的空線反應

判定：🟠。反應已不再完全相同，但前兩張現有資產不是正式 9:16 專圖，手機需用完整畫面或後續補直式專圖，不能標 LOCKED。

### 2. `love.ritual`

原問題：三個選擇全部 `cloneArt(scene.art)`，只有 focus 不同，玩家實際會覺得「我選了不同答案但什麼都沒變」。

目前修正：
- 鬆線 → `LOVE_VERIFY_03_release_or_hold_*`
- 鏡前剪斷 → `LOVE_empty_threads.webp` / `love_020.webp`
- 門環留線 → 保留正式儀式圖

判定：🟠。目前至少是三種不同視覺語意，但仍是「利用現有相符素材」而非三張同場景連續反應專圖。正式品質若要 90+，仍建議補三態專圖。

### 3. `finale.seal-test`

原問題：`hover-seal` 與 `withdraw-seal` 仍以同一張第五印畫面、只改 focus。

判定：🔴 需要專圖。
- A：玩家手停在光外，第五印向前顫但沒有碰到。
- B：玩家手已明顯收回，九尾沒有追，第五印停在兩人之間。

目前程式已標記 `needsDedicatedArt: true`，不假裝完成。

### 4. 最後三選一

原問題：
1. 三個選擇反應完都會進同一個 `finale.withdrawal`。
2. complete / scroll-only 即使不是拒絕，也會看到九尾突然消失。
3. refuse reaction 與下一幕還重複 `final_refuse_room.webp`。

目前修正：
- `finale.withdrawal` 已從第五卷場景陣列移除。
- complete / scroll-only / refuse 各自保留不同結局文字與 reaction art。
- reaction 結束直接進總命牒，不再把三條路硬拉成同一個「九尾消失」。

判定：🟡～🟠。
- 故事邏輯已修。
- scroll-only 已有真正直式 `FINAL_SCROLL_portrait.webp`。
- complete / refuse 手機仍只有橫式 reaction 圖，需實機確認 contain；正式 9:16 專圖仍是加分項。

---

## 三、第五卷連續畫面重複

### `finale.relics` → `finale.cross`

目前兩幕仍可能使用 `finale_four_relics.webp`。

這是**連續不同事件共用同一畫面**：
- `relics` 應是「四件命痕上桌、逐件取證」。
- `cross` 應是「九尾允許玩家反駁、某一卷被重新推回玩家面前」。

判定：🔴 需要 `finale.cross` 獨立反證圖。

禁止做法：
- 再拿 `life` 鏡室回來假裝第五卷。
- 拿 `finale.relics` 同一張只改焦點。
- 拿 `finale.confession` 提前劇透下一幕。

建議專圖動作：九尾把四張／四件判詞推回玩家，玩家第一視角手正在挑其中一卷；九尾不是誘惑姿態，而是第一次容許自己被推翻。

---

## 四、手機命牒稽核

原問題：
- 小標 11px，手機過小。
- compact/tight 會把文字再壓小。
- 寫字時程式會一路把紙拖到底，玩家可能沒看完前文。
- 最終命牒曾在 1.8 秒後自動進劇終。

目前修正：
- 手機命牒大標：24–31px。
- 段落小標：14px。
- 正文：16–18px。
- 最後一筆：17–19px。
- 操作：15.5px。
- Mobile 預設不再自動把紙拖到底。
- 最終總命牒必須讀到底才解鎖「收下命牒・看見黎明」。
- 完全取消倒數自動跳劇終。

判定：🟡，需 Mobile 實機確認後才能鎖。

---

## 五、操作邏輯稽核

### 圖上互動規則

正式規則固定：
1. 真的需要「碰某個物件」才使用圖上 hotspot，物件只亮一次微光。
2. 抽象判斷／心理選擇一律使用文字選項。
3. 不再讓玩家猜「這張圖到底能不能點」。

目前需要繼續驗：
- `love.ritual` 腕線 hotspot。
- `finale.seal-test` 第五印 hotspot。
- `love.face` 已正式改成文字選項模式，不再使用錯位臉頰／唇前 hotspot。

### 手機功能列

原問題：`音／景／藏／牒／門／重` 對第一次玩家語意不足。

目前修正：Mobile 展開後顯示完整名稱：
- 音樂
- 只看場景
- 藏景
- 命牒
- 回四門
- 重新起盤

---

## 六、生辰輸入稽核

- 正式規則：必須成年，不限制高齡。
- >90歲目前以相容層橋接舊核心並保存真實生日種子。
- 新增：若輸入不存在日期，例如 2/31，只清除「日」，前面的年／月保留。

長期整理建議：最後清理階段直接把核心 `script.js` 的 legacy 18–90 驗證改乾淨，再移除 surrogate year 相容層；在驗收完成前先不大幅重構核心，以免引入新的流程錯誤。

---

## 七、目前不能標 LOCKED 的項目

1. 🔴 `finale.cross`：缺真正獨立的第五卷反證圖。
2. 🔴 `finale.seal-test`：兩個行為反應缺兩張不同專圖。
3. 🟠 `love.ritual`：三態已拆開，但仍是現有素材拼接，不是同場景專用連續反應。
4. 🟠 `love.face`：手機反應已拆開，但兩張反應資產非正式 9:16 專圖。
5. 🟠 complete / refuse 最終 reaction：Mobile 仍使用橫圖 contain。
6. 🟡 全部命牒：需真手機確認字級、滑動與最後操作。

其餘正式生成圖先進入 `READY FOR PIXEL CHECK`，仍不自動標 `🔒 LOCKED`。
