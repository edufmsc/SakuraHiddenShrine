# 櫻隱 V58｜一次總修完成紀錄 V1

> 分支：`review/v58-scene-lock`
> `main`：未修改。
> 狀態：程式與現有素材可處理的剩餘問題已集中修正；尚未因缺少真實瀏覽器逐幕證據與使用者最終確認而標記任何新頁面 `🔒 LOCKED`。

## 這次一次總修已完成

### 1. `love.face` 不再是半完成 fallback

舊圖上 cheek / lips hotspot 已確認曾偏到額頭／眼睛，不再繼續猜座標。

正式處理方式改為：
- 永久停用該幕舊圖上 hotspot。
- 保留三個完整、可操作的文字選擇與三條 reaction。
- 提示改為：「她把距離留給你。直接選你此刻真正會做的第一個動作。」
- Desktop / Mobile 都採相同明確邏輯，不會因點錯位置選錯答案。

這不是暫時防呆，而是目前 V58 的正式互動設計。

### 2. `love.silence` 圖意問題收掉

現有正式圖沒有畫玩家第一人稱手，因此不再強迫圖片演出不存在的「玩家接回一端」。

故事改成：
- 紅線熄滅。
- 玩家明確沒有伸手接回。
- 遠處另一端只亮回一小截。
- 九尾要求玩家判斷對方是否真的把關係往前接，而不是把「亮起」直接當修復。

因此圖片與劇情現在可以一致工作，不必為了補一隻玩家手重生整張正式圖。

### 3. `career.borrowed` 換署名語意收掉

標題改為：

`成果還是你的。署名卻換成了別人。`

畫面敘事明確補上：成果仍在、玩家做過的格子仍亮著、最上面的名字不是玩家。

因此玩家不需要只靠圖中的棋局細節猜「借名」含義。

### 4. `love.ritual` 三個選擇保留立即 reaction

- `unknotted`
- `mirror-cut`
- `door-knot`

三個選擇都不會點完直接跳走；先看 reaction，再進 ending。

目前正式素材只有一張封線主圖，因此三個 reaction 使用同一張正式圖的不同 focus + 不同反應文字，不借用不相關劇情圖。

腕線圖上 hotspot 已依 Desktop / Mobile 正式 WebP 收斂點擊區，避免誤吃祭壇或九尾手部。

### 5. `finale.seal-test` 完整成為玩家行為測試

玩家現在有兩個真正行為：
- `hover-seal`：把手停在第五印前。
- `withdraw-seal`：把手收回來。

兩個選擇都寫入 behavior，而且都不會提前完成第五印。

真正結局選擇仍保留到 `finale.choice`。

Mobile 第五印 hotspot 已依正式 9:16 圖縮到印記主要區域。

### 6. Finale 三條 reaction 路徑已清掉 404

已確認不再引用不存在的：
- `final_complete.webp`
- `final_scroll_only.webp`
- `final_refuse.webp`

目前：
- complete → `final_complete_dawn.webp`
- scroll-only Desktop → `final_scroll_desktop.webp`
- scroll-only Mobile → `FINAL_SCROLL_portrait.webp`
- refuse → `final_refuse_room.webp`

`FINAL_SCROLL_portrait.webp` 實際尺寸確認為 1024×1536，是真正直式資產，不是只靠檔名判斷。

### 7. complete / refuse Mobile 不再硬裁橫圖

目前 Repo 沒有語意完全正確的 complete / refuse 9:16 專圖。

在不亂拿其他劇情直式圖冒充結局的前提下：
- Mobile 使用原本正確分支圖。
- 顯示模式改成 `contain`。
- 不再用 `cover` 切掉人物、玩家手勢或重要道具。
- 文字面板再收斂到約 32dvh。

這是現有素材條件下的正式安全顯示方案；未來若補真正 9:16 專圖，只需換 mobile path，不必再重做流程。

### 8. hotspot 執行穩定性已修

已處理：
- MutationObserver 不再監看自己產生的 style / DOM 變更，避免自我回饋循環。
- `.v58-interaction-hotspot` 明確 `pointer-events:auto`，避免看得到卻點不到。
- face hint 不再因重寫文字反覆喚醒 observer。
- Finale landscape 判定改讀 `image.currentSrc`，Mobile `<picture>` 換圖後也能判斷正確。

### 9. 命牒 Mobile 閱讀保護保留

- 可上下捲動。
- 新字出現時自動跟隨最新內容。
- 玩家主動往上讀舊內容時停止自動拉回。
- 回到底部後恢復自動跟隨。
- 有 overflow 時保留可見捲動提示。

### 10. 開場與載入順序未被破壞

開場仍使用：
- `OPENING_01_door_eyes_desktop_v47.webp`
- `OPENING_01_door_eyes_mobile_v47.webp`

程式載入順序仍為：

`story.js → story_overrides_v1.js → pixel_overrides_v1.js → interaction_story_overrides_v1.js → script.js → interaction_ui_overrides_v1.js → ui_overrides_v1.js`

## 本輪關鍵 Commit

- `404341dc283b74be97b4f2fb001caa2cc41aa7f0`：收掉 love.silence / career.borrowed 語意，scroll-only Mobile 接真正直式圖。
- `788d13c3adfcf5b8d858037ab6a70f4c6406f7b0`：love.face 正式文字選擇模式、Finale Mobile 圖判定修正。
- `ded6786e5d6668a6aa0fa9e3154d4080e9d48fc5`：face / Mobile / landscape reaction CSS 正式收斂。

另包含第二階段前面已完成的：
- observer 回饋循環修正。
- hotspot pointer-events 修正。
- face hint observer 修正。
- love.ritual / finale.seal-test hotspot 實圖座標收斂。

## 現在還剩什麼

### 不再是程式阻塞

目前已知的：
- 404 舊結局路徑
- face 錯位 hotspot
- hotspot 點不到
- observer 自我循環
- love.silence 圖文語意缺口
- career.borrowed 換署名不明確
- scroll-only 手機橫圖

都已經有正式處理方案。

### 唯一不能由靜態檢查代替的事情

仍需要一次真正的 Desktop + Mobile 瀏覽器逐幕觀看，確認：
- 實際視窗下沒有意外遮字。
- hotspot 視覺位置與手感自然。
- complete / refuse 手機 contain 的留黑與故事面板比例可以接受。
- 玩家從開場一路走完四卷＋第五卷沒有瀏覽器特定問題。

先前建立的 GitHub Actions Chromium QA 沒有成功把 runtime 報告回寫，因此本文件不把不存在的 runtime 證據假裝成通過。

## LOCK 規則

本輪可以稱為「程式／現有素材總修完成」，但不能在沒有實際畫面證據與使用者確認前把頁面標 `🔒 LOCKED`。

下一個真正步驟已不是繼續拆小功能修，而是把這個 review 分支拿去實際看畫面、一次列出最後視覺差異；確認後才進最終 cleanup 與正式版本。
