# 業之卷｜圖片視覺審核 V1

> 對照：`../02_CAREER_SCENE_LOCK_V1.md`

## 01 `career.threshold`｜棋室開局
![CAREER threshold](../../assets/images/active/02_career/CAREER_chess_command_v44.webp)

- 故事：九尾坐棋盤前，不算努力，只看成果最後落在哪裡。
- 安全區：`S-R` / `S-L`，棋盤不可被吃掉。
- 必須：九尾＋真實棋盤＋黑白棋。
- 決策：🟢 保留候選。
- 鎖定：⬜

---

## 02 `career.name`｜成果署名
![CAREER name](../../assets/images/active/02_career/CAREER_02_table_cards_choice_v39.webp)

![CAREER name mobile](../../assets/images/active/02_career/CAREER_02_table_cards_choice_mobile.webp)

- 故事：翻完成／解危／救場三張成果牌，看誰先被說出名字。
- 安全區：`S-EVIDENCE`
- 必須：卡牌、姓名標記、九尾翻牌／指牌。
- 決策：🟢 保留。
- 鎖定：⬜

---

## 03 `career.black-piece`｜無名籤牌
![CAREER black piece](../../assets/images/active/02_career/career_002.webp)

- 故事：九尾把無名籤牌交給玩家，問離開後什麼還能帶走。
- 安全區：`S-EVIDENCE`
- 必須：籤牌、檔案室、接牌手勢。
- 決策：🟡 桌機留；手機目前借圖需重驗。
- 鎖定：⬜

---

## 04 `career.exchange`｜加碼交換
![CAREER exchange](../../assets/images/active/02_career/career_003.webp)

- 故事：九尾把任務推向玩家，問「只有你能做」到底換什麼。
- 安全區：`S-EVIDENCE`
- 必須：任務紙／扇骨／黑棋／交換感。
- 決策：🟡 語意重驗。
- 鎖定：⬜

---

## 05 `career.borrowed`｜成果借名
![CAREER borrowed evidence](../../assets/images/active/02_career/career_borrowed_evidence.webp)

- 故事：成果還在，名字卻被別人壓到下面。
- 安全區：`S-EVIDENCE`
- 必須：成果物＋他人姓名／印章＋九尾把證據推向玩家。
- 注意：這幕是業卷核心證據頁，不能用普通美圖。
- 決策：🔴 若現圖沒有明確「換名／壓名」就專用新圖。
- 鎖定：⬜

---

## 06 `career.pressure`｜雨局壓力
![CAREER pressure](../../assets/images/active/02_career/CAREER_03_rain_standing_pressure_v39.webp)

![CAREER pressure mobile](../../assets/images/active/02_career/CAREER_03_rain_standing_pressure_mobile.webp)

- 故事：雨沖棋盤，忙碌讓可走的路越來越少。
- 安全區：`S-L` / `S-R`
- 必須：雨＋棋盤＋壓迫，不只是雨中站姿。
- 決策：🟢 保留候選，驗棋盤可見度。
- 鎖定：⬜

---

## 07 `career.turn`｜棋手反轉
![CAREER turn](../../assets/images/active/02_career/career_new_01.webp)

- 故事：九尾抬起棋盤，盤底是一雙雙等玩家替它收尾的手；唯一黑棋落到玩家掌心。
- 安全區：`S-EVIDENCE`
- 必須：棋盤反轉、盤底多手、黑棋入掌。
- 決策：🟠 高敘事頁，現圖缺任一核心動作就換／生圖。
- 鎖定：⬜

---

## 08 `career.last-proof`｜最後一手
![CAREER last proof](../../assets/images/active/02_career/career_020_wide_v39.webp)

- 故事：燈一盞盞熄，棋盤可走的路變少；留下可以，但要說清楚條件。
- 安全區：`S-EVIDENCE`
- 必須：熄燈／棋路減少的視覺。
- 決策：🟡 保留候選，驗異象是否夠清楚。
- 鎖定：⬜

---

## 09 `career.stake-trial`｜落子試煉
![CAREER trial](../../assets/images/active/02_career/career_stake_plan.webp)

- 故事：玩家真正只走一手。
- 安全區：`S-OPERATE`
- 互動：棋盤 hotspot 改 normalized/SVG。
- 必須另驗動態 trial variantArt / reactionArt。
- 決策：🔴 圖與互動雙重必修。
- 鎖定：⬜

---

## 10 `career.result`｜業卷命牒
![CAREER result current](../../assets/images/active/02_career/career_new_02.webp)

- 故事：九尾寫下業卷判詞：可見槓桿／借名／困局／出口。
- 安全區：`S-DESTINY`
- 必須：四卷結果頁統一命牒語言，不能只用普通結果美圖。
- 決策：🔴 納入命牒專用構圖。
- 鎖定：⬜

---

## 11 `career.ritual`｜玄棋署名
![CAREER ritual](../../assets/images/active/02_career/career_008.webp)

- 故事：黑棋只能落一次：中央、帶走、拿掉無名棋。
- 安全區：`S-OPERATE`
- 必須：棋、手、袖口、九尾；三個選擇最好有視覺反應。
- 決策：🔴 先驗現圖，不足則加 reactionArt／換圖。
- 鎖定：⬜

---

## 12 `career.ending`｜封局
![CAREER ending current](../../assets/images/active/07_shared/SHARED_close_gaze_v44.webp)

- 故事：棋局結束，九尾不再替玩家決定下一步。
- 安全區：`S-CLOSE` 或短句側欄。
- 注意：這裡以 V58 `story.js` 實際圖為準，不沿用舊鎖頁表的空門圖。
- 決策：🟡 保留候選，需確認不會像緣／禁卷泛用近身圖。
- 鎖定：⬜

---

# 業卷高優先圖
1. `career.borrowed`｜借名證據。
2. `career.turn`｜棋盤反轉。
3. `career.stake-trial`｜操作棋盤。
4. `career.result`｜業卷命牒。
5. `career.ritual`｜玄棋署名反應。
