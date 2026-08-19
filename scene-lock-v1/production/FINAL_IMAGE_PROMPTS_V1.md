# 櫻隱 V58｜最終生圖彙整檔 V1

> **第三段正式交付檔。之後生圖只看這一份。**
> 分支：`review/v58-scene-lock`
> 基準：`reviews/07_PHASE2_IMAGE_FREEZE_V1.md`
> 正式範圍：A 級 15 幕；最低 29 張圖片檔。B 級 4 幕只在實機證明現圖不合格時才啟動。
> 規則：不因「想換漂亮一點」擴張生圖範圍；新圖完成後才回網站做桌機／手機、focus、hotspot、文字安全區與 `🔒 LOCKED` 驗收。

---

# 0｜使用方式

每次只處理一幕。建議操作順序：

1. 先使用「固定角色母提示詞」。
2. 接上該幕「場景核心 Prompt」。
3. 桌機圖加上「Desktop Modifier」；手機圖改加「Mobile Modifier」。
4. 最後加上「固定 Negative Prompt」。
5. 生成後依本檔建議檔名保存，不要自行改名。
6. 完成後在本檔勾選 `[x]`，再交回網站回填與驗收。

如果生圖工具支援 Reference Image：**優先使用一張目前網站裡最接近正式九尾形象、臉部最穩定的已核准圖片作角色參考**，以維持同一張臉、狐耳、黑紅和服、九尾與身材比例。

---

# 1｜固定角色母提示詞

## 中文固定角色

> 同一位、明確 25 歲以上的成熟日本九尾狐女性。長而濃密的黑髮，精緻白色狐耳，**正好九條**大型淡白色蓬鬆狐尾，白皙帶微光的肌膚，暖紅／赤褐色眼睛，精緻花簪與和風髮飾。臉部漂亮、成熟、妖艷、聰明、危險，眼神有誘惑力與主導感。身材為成熟豐滿女性曲線：**胸部明顯豐滿偏大、自然飽滿，細腰、長腿、優雅臀腰曲線**，但人體比例必須自然，不做色情裸露。固定穿華麗黑色與深紅色花紋和服，低領口、優雅露出鎖骨與肩線，完整穿著、不露點、不透明。她必須維持原網站圖片那種性感、妖艷、成熟、有吸引力、神祕、危險又高級的氣質。畫面為高質感日式暗黑奇幻視覺小說 CG、電影級光影、精緻皮膚與布料細節、自然漂亮的手、清楚的狐耳與九尾層次。不是普通站姿人像，每張都必須真的演出該幕故事事件。

## English fixed character

> The same clearly adult Japanese nine-tailed fox woman, age 25+, matching the established heroine identity from the approved SakuraHiddenShrine reference art. Long rich black hair, exactly two elegant white fox ears, **exactly nine large pale-white fluffy fox tails**, pale luminous skin, warm reddish / red-brown eyes, refined floral kanzashi ornaments. Her face is mature, beautiful, seductive, intelligent, dangerous and magnetic. She has a mature voluptuous feminine figure with a **prominently full large natural bust**, slim waist, long elegant legs and graceful hourglass curves, while maintaining believable adult anatomy. She wears the same luxurious black-and-deep-crimson floral kimono with a low elegant neckline, visible collarbones and relaxed shoulders, fully clothed, opaque and non-explicit. Her presence must remain sensual, alluring,妖艷, mysterious, dangerous and premium, consistent with the original website heroine. Premium cinematic Japanese dark-fantasy visual-novel CG, detailed skin, fabric and hair, elegant hands, clean anatomy, layered tails, dramatic storytelling lighting. This must be a real story scene, not a generic portrait.

---

# 2｜固定構圖規則

## Desktop
- 比例：**16:9 landscape**。
- S-L：文字左側時，左約 4–36% 優先乾淨，人物與主事件放右 40–100%。
- S-R：文字右側時，右約 62–96% 優先乾淨，人物與主事件放左 0–58%。
- 命牒專圖：桌機左側約 **38–43%** 必須能放大型命牒／文字，不可塞重要人物部位。
- 重要道具不可藏在最邊緣，避免 cover 裁掉。

## Mobile
- 比例：**9:16 portrait**。
- 頂部 0–12% 留 UI 呼吸區。
- 九尾臉／重要劇情視覺盡量在 18–52%。
- 下方 62–100% 優先留給台詞／選項，除非該幕明確需要操作物件在下方。
- 手機不是把桌機硬裁直式，必須重新構圖。

---

# 3｜固定 Negative Prompt

## 中文

> 未成年、少女感、幼態臉、平胸、胸型縮小、過度誇張畸形乳房、裸露乳頭、透視衣物、色情姿勢、裸體、現代休閒服、錯誤和服、短髮、金髮、黑狐耳、缺少狐耳、人類耳朵明顯外露、少於九尾、多於九尾、尾巴融合成一團、額外手臂、額外手指、缺手指、畸形手、扭曲肩膀、斷裂脖子、胸線畸形、身體比例崩壞、重複人物、雙頭、錯誤倒影、文字、水印、Logo、UI、字幕、亂碼、低畫質、模糊、過曝、過暗看不清劇情物件、普通證件照、純站姿肖像。

## English

> child, teenager, young-looking face, petite childlike body, flat chest, reduced bust, grotesquely oversized anatomy, exposed nipples, transparent clothing, explicit nudity, pornographic pose, modern casual clothes, wrong kimono, short hair, blonde hair, black fox ears, missing fox ears, visible human ears, fewer than nine tails, more than nine tails, merged tail blob, extra arms, extra fingers, missing fingers, malformed hands, broken neck, deformed shoulders, distorted bust line, bad anatomy, duplicate heroine, two heads, accidental duplicate reflections, random text, watermark, logo, subtitles, UI, gibberish letters, blurry, low quality, overexposed, too dark to read story objects, generic portrait, static standing pose.

---

# 4｜A 級 15 幕｜正式必生

## A01｜`love.silence`｜沉默之後

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LOVE_SILENCE_01_one_sided_thread_desktop.webp`
- `LOVE_SILENCE_01_one_sided_thread_mobile.webp`

**故事任務**：紅線曾熄滅／斷掉；只有一方仍在維持。九尾不是撩人，而是安靜看穿真相。

**人物動作**：九尾右側站立或微側身，一手讓紅線從指間垂落，另一手不去救它；表情冷靜、稍微憐惜、像在等玩家自己看見。

**背景**：雨後神社長廊、潮濕木地板、遠處紙門與微弱燈火。

**必備元素**：紅線一段已暗／鬆脫，另一端仍微亮；必須看出「單方維持」。

**中文核心 Prompt**
> 16:9 或 9:16 日式暗黑奇幻視覺小說故事場景。同一位成熟妖艷九尾狐女性站在雨後昏暗神社長廊，長黑髮、白狐耳、九條淡白色大狐尾、暖紅眼、華麗黑紅花紋和服，胸部明顯豐滿偏大、細腰、長腿、成熟性感曲線。她沒有刻意微笑勾引，而是冷靜、洞悉、帶一點憐惜地看著玩家。她的手中有一條紅線，其中一段已鬆開、黯淡、像熄滅或剛斷過，另一端只有非常微弱的紅光。她故意不替玩家把線接回去，讓畫面一眼看懂：這段關係長期只有一方在維持。雨水、木廊與紙門形成安靜心痛的背景。人物臉、胸線、腰、手勢、九尾清楚自然，性感妖艷但情緒主軸是真相揭露，不是單純人像。

**English core Prompt**
> Cinematic Japanese dark-fantasy visual novel story scene. The same clearly adult seductive nine-tailed fox woman stands in a dim shrine corridor after rain, with long black hair, white fox ears, exactly nine pale-white fluffy tails, warm reddish eyes, luxurious black-and-crimson floral kimono, a prominently full large natural bust, slim waist and elegant long-legged curves. She is not performing a flirtatious smile; her expression is calm, perceptive, slightly sorrowful, as if she has already understood the truth. A red thread hangs from her hand: one section is loose, dim and almost extinguished as if it had broken before, while the opposite end only retains a faint glow. She deliberately does not repair it. The visual must immediately communicate that the bond has been sustained by only one side. Wet wooden corridor, paper doors, distant shrine lamps, emotional silence. Clear face, bust line, waist, hands and layered nine tails; sensual and magnetic, but primarily a truth-reveal scene rather than a portrait.

**Desktop Modifier**
> 16:9 landscape, heroine on the right 42–48%, red thread clearly crossing mid-frame, clean dark text-safe area on the left 4–36%, do not hide the thread knot or her hand.

**Mobile Modifier**
> 9:16 portrait, heroine face and upper torso around 20–50%, full bust and hand with dim red thread visible, top 0–12% clean for UI, lower 64–100% simplified dark corridor for dialogue, do not crop fox ears or hand.

**不能出錯**：普通站姿、紅線只是裝飾、兩端都很亮、畫面看不出誰在維持。

---

## A02｜`love.turn`｜紅線反咬

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LOVE_TURN_01_thread_bites_back_desktop.webp`
- `LOVE_TURN_01_thread_bites_back_mobile.webp`

**故事任務**：玩家以為一直在追另一端，最後發現紅線從鏡後繞回自己；空椅其實一直由玩家替對方留著。

**人物動作**：九尾站在鏡側，不主動碰線，兩指輕搭鏡框或抱臂觀察；表情冷、看穿、略帶殘酷溫柔。

**背景／事件**：古鏡、空椅、紅線從鏡後繞回第一人稱玩家手腕／玩家倒影；鏡中可出現玩家模糊象徵但不要清楚固定玩家長相。

**中文核心 Prompt**
> 日式暗黑奇幻視覺小說重大反轉場景。同一位成熟性感妖艷九尾狐女性站在古老鏡面旁，黑長髮、白狐耳、九條淡白狐尾、華麗黑紅和服、豐滿偏大的胸型、細腰長腿。她退在側邊，不再操控紅線，只冷靜看著玩家發現真相。畫面中央有古鏡與一張長久空著的椅子，一條紅線原本像通往鏡後的另一個人，卻從鏡後繞了一圈，最後回到第一人稱玩家自己的手腕或鏡中玩家模糊倒影。空椅旁可以有被反覆整理過的痕跡，暗示一直是玩家替某個不存在的下一次留位置。構圖要讓「紅線反咬回自己」一眼看懂。九尾性感美麗但不是主事件，主事件是玩家被自己的等待照回來。

**English core Prompt**
> Major reversal scene in a cinematic Japanese dark-fantasy visual novel. The same mature seductive nine-tailed fox woman stands beside an antique mirror, long black hair, white fox ears, exactly nine pale-white tails, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and elegant long legs. She deliberately steps aside and does not touch the red thread, calmly watching the player discover the truth. In the center, an old mirror and a chair that has been kept empty for someone. A red thread appears to travel behind the mirror toward another person, but loops behind the glass and returns to the first-person player's own wrist or an indistinct player reflection. Small signs around the empty chair suggest it has repeatedly been kept ready by the player. The image must instantly communicate: the red thread has bitten back and revealed that the player has been maintaining the empty place themselves. The fox woman remains beautiful and alluring, but the visual event is the revelation, not her portrait.

**Desktop Modifier**
> 16:9, mirror and empty chair center-right, red-thread loop fully readable, heroine offset to the far right or left edge, text-safe zone opposite the main evidence.

**Mobile Modifier**
> 9:16, mirror occupies vertical center, player's wrist / reflection and returning red thread remain visible in the middle, heroine higher in frame, lower area simplified for dialogue, do not crop the thread return path.

**不能出錯**：紅線真的通往另一個人、九尾拿著線替玩家解釋、空椅不見、只有普通鏡中美人。

---

## A03｜`love.result`｜緣卷命牒

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LOVE_RESULT_01_destiny_scroll_desktop.webp`
- `LOVE_RESULT_01_destiny_scroll_mobile.webp`

**故事任務**：緣卷正式判讀，九尾親手寫／遞出命牒；背景要有紅線語言，但不要把文字畫死在圖片裡。

**人物動作**：九尾右側坐姿或半跪，手持毛筆、封印或展開空白命牒；成熟主導、略帶溫柔。

**中文核心 Prompt**
> 高級日式暗黑奇幻視覺小說命牒場景。同一位成熟妖艷九尾狐女性坐在神社書案右側，長黑髮、白狐耳、九條淡白狐尾、暖紅眼、華麗黑紅和服，胸部明顯豐滿偏大、細腰、成熟優雅曲線。她一手持毛筆或印章，另一手將一份尚未寫入可讀文字的空白命牒向玩家展開。周圍只有少量紅線、燭火、封線痕跡，氣氛正式、神祕、性感但莊重。不要在圖片內生成任何可讀中文。這張圖是緣卷判讀的背景，必須讓命牒 UI 有足夠乾淨空間，九尾的臉、胸線、腰、手、九尾都不能被紙面遮掉。

**English core Prompt**
> Premium cinematic Japanese dark-fantasy destiny-scroll scene. The same mature seductive nine-tailed fox woman is seated at a shrine writing desk, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson floral kimono, prominently full large natural bust, slim waist and elegant mature curves. She holds a brush or seal in one hand and presents an elegant blank destiny scroll toward the viewer with the other. Subtle red-thread motifs, candlelight and ritual seal traces surround her. Formal, mysterious, sensual but ceremonial. Do not render readable text, letters or UI into the artwork. This is a destiny-reading background: preserve a large clean area for the real web text while keeping her face, bust line, waist, hands and tails unobstructed.

**Desktop Modifier**
> 16:9, reserve a truly clean left 38–43% for the destiny paper / web text, heroine seated on the right 50–95%, no important tail, hand or bust entering the left paper area.

**Mobile Modifier**
> 9:16, heroine and writing gesture in upper 18–52%, keep top UI zone clean and lower 55–100% visually quiet for the mobile destiny reader; no baked text.

**不能出錯**：AI 亂寫中文字、命牒壓九尾胸臉、左側塞滿尾巴、變成普通和服寫字肖像。

---

## A04｜`love.ritual`｜封線儀式

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LOVE_RITUAL_01_seal_thread_desktop.webp`
- `LOVE_RITUAL_01_seal_thread_mobile.webp`

**故事任務**：九尾與玩家一起完成封線，不再用純道具圖。

**人物動作**：九尾半跪／坐在儀式桌旁，一手持紅線、一手靠近封線印或小剪／結繩器；手勢要像「讓玩家自己選擇封、留、鬆」。

**背景**：燭火、和紙、結繩、淺木祭壇、雨聲收尾。

**中文核心 Prompt**
> 日式暗黑奇幻視覺小說儀式場景。同一位成熟性感妖艷九尾狐女性坐在低矮祭壇旁，黑長髮、白狐耳、九條淡白狐尾、暖紅眼、黑紅花紋和服、豐滿偏大胸型、細腰與長腿曲線。她不是單純擺拍，而是在進行紅線封線儀式：一手穩穩持著發光紅線，另一手停在封印、結繩器或小型儀式剪具前，把最後決定留給玩家。桌上可有白紙、封蠟／朱印、紅線結與燭火。表情成熟、誘惑、穩定，但有一種「這一步你自己做」的尊重。道具、手、紅線與九尾必須同框清楚。

**English core Prompt**
> Cinematic Japanese dark-fantasy visual-novel ritual scene. The same mature seductive nine-tailed fox woman sits beside a low ritual altar, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson floral kimono, prominently full large natural bust, slim waist and long elegant curves. She is actively performing a red-thread sealing ritual rather than posing: one hand securely holds a glowing red thread, while the other pauses beside a seal, knotting tool or small ceremonial cutting instrument, deliberately leaving the final decision to the player. White ritual paper, vermilion seal, thread knots and candlelight on the table. Her expression is mature, alluring and composed, with the feeling of “this final step belongs to you.” Hands, thread, ritual object and tails must all be clearly readable.

**Desktop Modifier**
> 16:9, heroine and ritual altar on right-center, thread and tool clearly visible, left text-safe zone 4–36%, no crop on hands.

**Mobile Modifier**
> 9:16, face / bust / working hands stacked vertically around 18–60%, ritual object clearly visible in middle-lower area, top clean for UI, bottommost area simplified for choices.

**不能出錯**：只有剪刀／結繩沒有九尾、紅線被胸或 UI 蓋住、變成色情姿勢、手指崩壞。

---

## A05｜`career.borrowed`｜成果借名

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `CAREER_BORROWED_01_name_swap_proof_desktop.webp`
- `CAREER_BORROWED_01_name_swap_proof_mobile.webp`

**故事任務**：成果仍在，但落地署名換成別人的名字；九尾把證據推到玩家面前。

**人物動作**：九尾坐在大型漆黑策略桌對面，用兩指把成果文件／牌與被換掉的姓名牌推向第一人稱玩家；冷靜、略帶「現在看懂了嗎？」。

**中文核心 Prompt**
> 16:9 或 9:16 日式暗黑奇幻職涯策略場景。同一位成熟妖艷九尾狐女性坐在大型漆黑策略桌對面，長黑髮、白狐耳、九條淡白狐尾、紅棕眼、華麗黑紅和服、胸部豐滿偏大、細腰長腿。她不是靠近誘惑，而像冷靜的策略家。桌面中央有一份清楚可辨的成果文件／成果牌／完成物，旁邊壓著不屬於玩家的姓名牌、朱印或署名封條。她用兩根手指把這組證據慢慢推向第一人稱玩家，另一手安靜放在棋盤／卷宗旁。她的表情冷、清楚、微微帶笑，像在問「現在終於看懂了嗎？」畫面必須一眼看出：成果還在，但名字被換掉。不要生成可讀姓名文字，只用姓名牌、印章與位置關係表現。

**English core Prompt**
> Cinematic Japanese dark-fantasy career strategy scene. The same mature seductive nine-tailed fox woman sits across a large lacquered strategy table, long black hair, white fox ears, exactly nine pale-white tails, red-brown eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long elegant legs. She is not flirting physically; she behaves like a calm strategist who has found proof. In the center of the table sits a clearly recognizable completed work / achievement document / result plaque, visibly overlaid or paired with someone else's name plaque, vermilion seal or authorship marker. With two fingers she slowly pushes this evidence toward the first-person player, while her other hand rests near a chess-like board or dossier. Her expression is cool, sharp, slightly amused, almost saying “Now do you finally see it?” The image must instantly read: the work remains, but the credit has been replaced. Do not generate readable names; show the theft through seals, plaques and spatial evidence.

**Desktop Modifier**
> 16:9, evidence center-lower, heroine opposite side of table, text-safe area opposite her face, keep name plaque / seal and her two-finger push unobstructed.

**Mobile Modifier**
> 9:16, heroine upper half, evidence enlarged in the center, her pushing fingers and seal visible, lower dialogue area not covering the proof.

**不能出錯**：只有九尾坐桌邊、沒有成果證據、名字只是亂碼文字、證據太小。

---

## A06｜`career.result`｜業卷命牒

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `CAREER_RESULT_01_destiny_scroll_desktop.webp`
- `CAREER_RESULT_01_destiny_scroll_mobile.webp`

**故事任務**：業卷正式判讀，命牒視覺語言融合玄棋、署名、朱印。

**人物動作**：九尾右側坐在策略桌，手持黑棋／朱印或替空白命牒落印。

**中文核心 Prompt**
> 高質感日式暗黑奇幻業卷命牒場景。同一位成熟妖艷九尾狐女性坐在策略桌右側，黑長髮、白狐耳、九條淡白狐尾、暖紅眼、黑紅華麗和服、豐滿偏大的胸型、細腰長腿。她一手捏著唯一黑棋或朱印，另一手把空白命牒向玩家展開／準備落印。桌上只留少量棋盤、成果牌、姓名封條等業卷象徵，不能搶走命牒閱讀區。人物表情冷靜、權威、性感、有掌控力，像正式替玩家寫下「什麼能帶走、什麼不再替人扛」。圖片內不要生成可讀文字。

**English core Prompt**
> Premium Japanese dark-fantasy career destiny-scroll scene. The same mature seductive nine-tailed fox woman sits at the right side of a strategy table, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and elegant long legs. In one hand she holds a single black chess piece or vermilion seal; with the other she presents or prepares to stamp an elegant blank destiny scroll. Only restrained career symbols remain on the table: a partial chessboard, achievement plaque, authorship seal. Her expression is calm, authoritative, alluring and fully in control, as if formally recording what belongs to the player and what they will no longer carry for others. Do not render readable text.

**Desktop Modifier**
> 16:9, left 38–43% clean destiny-paper area, heroine and strategy props on the right, keep black piece / seal hand visible.

**Mobile Modifier**
> 9:16, heroine and black-piece / seal gesture in upper half, lower half visually quiet for destiny UI, no baked lettering.

**不能出錯**：棋盤塞滿左側、AI 亂寫字、主圖像一般工作照、人物手勢不見。

---

## A07｜`life.turn`｜鏡外人

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LIFE_TURN_01_mirror_substitute_desktop.webp`
- `LIFE_TURN_01_mirror_substitute_mobile.webp`

**故事任務**：鏡內那個永遠能撐的人才是替身；鏡外真正的自己反而開始透明。

**人物動作／異象**：九尾在鏡側把碎鏡拼回；鏡內九尾／玩家象徵完整穩定，鏡外同一輪廓的手、肩或身體開始半透明。

**中文核心 Prompt**
> 日式暗黑奇幻視覺小說心理恐怖反轉場景。同一位成熟性感妖艷九尾狐女性在大型古鏡旁，黑長髮、白狐耳、九條淡白狐尾、黑紅和服、豐滿偏大胸型、細腰長腿。她正在把一片碎鏡放回鏡框，冷靜揭露真正異象。鏡子裡的「永遠能撐住的版本」完整、清晰、姿態穩定，像完美替身；鏡子外真正的人形／玩家象徵卻從手指、肩膀、胸口外緣開始半透明，像正在從現實裡消失。九尾本人可以站在側面觀察或完成最後一片鏡片，但不能讓觀眾誤以為只是普通雙臉特效。畫面必須一眼看懂：鏡內完整的是替身，鏡外透明的才是真身。

**English core Prompt**
> Cinematic Japanese dark-fantasy psychological-horror reversal scene. The same mature seductive nine-tailed fox woman stands beside a large antique mirror, long black hair, white fox ears, exactly nine pale-white tails, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and elegant long legs. She is placing the final shard back into the mirror frame, calmly revealing the anomaly. Inside the mirror, the “always capable, always holding everything together” version is complete, crisp and stable like a perfect substitute. Outside the mirror, the real human silhouette / player-symbol begins becoming translucent from the fingers, shoulder and torso edges, as if disappearing from reality. The fox woman may observe from the side, but this cannot look like a generic double-face effect. It must instantly read: the complete figure in the mirror is the substitute; the transparent figure outside is the real self.

**Desktop Modifier**
> 16:9, large mirror center-left or center, both inside/outside states readable simultaneously, heroine offset to side, text-safe area opposite the anomaly.

**Mobile Modifier**
> 9:16, mirror vertical and dominant in center, transparent outside hand/shoulder and complete inside figure remain visible, heroine face higher in frame, do not crop the transparency transition.

**不能出錯**：只是鏡子裡兩張九尾臉、透明效果看不出鏡內外、沒有碎鏡／揭露動作。

---

## A08｜`life.result`｜命卷命牒

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `LIFE_RESULT_01_destiny_scroll_desktop.webp`
- `LIFE_RESULT_01_destiny_scroll_mobile.webp`

**故事任務**：命卷判讀，把鏡片、命燈、身體訊號轉為正式命牒，而不是醫療診斷。

**人物動作**：九尾持一片鏡片靠近命牒，另一手護著小燈／燭火；神情柔和但不甜膩。

**中文核心 Prompt**
> 高質感日式暗黑奇幻命卷命牒場景。同一位成熟妖艷九尾狐女性坐在右側低案前，黑長髮、白狐耳、九條淡白狐尾、暖紅眼、黑紅和服、胸部豐滿偏大、細腰成熟曲線。她一手拿著乾淨鏡片或碎鏡，一手守著一盞小命燈，旁邊是一份空白命牒。鏡片與燈只作為「身體訊號被看見」的象徵，不做醫療診斷。她的表情安靜、成熟、稍微靠近玩家，像在說「你不必痛到證明自己才值得停下」。不要生成可讀文字。畫面正式、神祕、帶溫度但仍維持性感妖艷的九尾氣質。

**English core Prompt**
> Premium Japanese dark-fantasy life destiny-scroll scene. The same mature seductive nine-tailed fox woman sits at a low desk on the right, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, black-and-crimson floral kimono, prominently full large natural bust, slim waist and mature curves. She holds a clean mirror shard in one hand and protects a small dim life-lamp with the other, beside an elegant blank destiny scroll. The mirror and lamp symbolize bodily signals being acknowledged, not medical diagnosis. Her expression is quiet, mature and gently attentive, as if saying the player does not need to suffer enough to earn rest. No readable text in the art. Formal, mysterious, emotionally warm while preserving her seductive and妖艷 identity.

**Desktop Modifier**
> 16:9, reserve left 38–43% clean for destiny text, heroine right, mirror shard and small lamp visible without entering the paper zone.

**Mobile Modifier**
> 9:16, heroine face / bust / mirror and lamp in upper-middle, lower half calm and dark for destiny reader, no text baked in.

**不能出錯**：醫院／醫療器材、病人感、鏡片遮臉、命燈變成普通背景燈。

---

## A09｜`forbidden.turn`｜面具認主

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FORBIDDEN_TURN_01_mask_recognizes_player_desktop.webp`
- `FORBIDDEN_TURN_01_mask_recognizes_player_mobile.webp`

**故事任務**：狐面不再指向九尾，而沿紅線停在玩家面前；九尾第一次退遠。

**人物動作**：九尾站在遠處或畫面後方，沒有伸手控制狐面；她的表情冷靜但警覺。

**中文核心 Prompt**
> 日式暗黑奇幻禁忌視覺小說反轉場景。第一人稱玩家面前，一張古老白色狐面沿著發亮紅線滑行／懸停，最後停在鏡頭前方，面具內側有手寫痕跡或刻痕感，但不要生成可讀文字。紅線明確連到玩家方向。遠處的同一位成熟妖艷九尾狐女性第一次退到背景，黑長髮、白狐耳、九條淡白狐尾、黑紅和服、豐滿偏大胸型、細腰長腿，她沒有伸手抓回面具，只帶著警覺、理解、稍微失去掌控的表情看著它認出玩家。主視覺是「面具認主」，九尾性感有吸引力但不能搶回中心。

**English core Prompt**
> Cinematic Japanese dark-fantasy forbidden-reversal scene. In first-person view, an old white fox mask slides or hovers along a glowing red thread and stops directly in front of the player. The inside of the mask contains handwritten-looking scratches or engraved traces, but no readable text. The red thread clearly leads toward the player. In the distance, the same mature seductive nine-tailed fox woman has stepped away for the first time: long black hair, white fox ears, exactly nine pale-white tails, black-and-crimson kimono, prominently full large natural bust, slim waist and long legs. She does not reach out to reclaim the mask. Her expression is alert, understanding and slightly unsettled as the mask recognizes the player. The visual center is the mask choosing the player; the alluring fox woman must not reclaim the center.

**Desktop Modifier**
> 16:9, fox mask large foreground center-left, red-thread path readable, heroine smaller in background right, text-safe zone where it does not cover mask.

**Mobile Modifier**
> 9:16, mask foreground around middle, heroine visible above / behind it, red thread leads toward bottom edge / player, keep top UI clear and lower dialogue not covering mask interior.

**不能出錯**：九尾戴著面具、面具還在她手上、玩家方向不清楚、面具內亂碼文字。

---

## A10｜`forbidden.result`｜禁卷命牒

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FORBIDDEN_RESULT_01_destiny_scroll_desktop.webp`
- `FORBIDDEN_RESULT_01_destiny_scroll_mobile.webp`

**故事任務**：禁卷判讀。不能再用前幕鏡圖或有霧化問題的舊判讀圖。

**人物動作**：九尾已把狐面拿下，右側持面具靠桌面／膝側，另一手展開空白命牒；誘惑感保留，但危險變得可被看見。

**中文核心 Prompt**
> 高質感日式暗黑奇幻禁卷命牒場景。同一位成熟性感妖艷九尾狐女性坐在右側，長黑髮、白狐耳、九條淡白狐尾、暖紅眼、華麗黑紅和服、胸部明顯豐滿偏大、細腰長腿。她已經把狐面從臉上卸下，一手讓白色狐面停在膝旁／桌邊，另一手把空白命牒展向玩家。背景只有少量符紙、熄弱狐火與紅線痕跡，不要用大片霧遮左側。她仍有強烈吸引力，但表情比前面更清醒、少一點操控。不要生成可讀文字。整體要像危險模式被辨認後的正式判讀，而不是重複鏡前誘惑照。

**English core Prompt**
> Premium Japanese dark-fantasy forbidden destiny-scroll scene. The same mature seductive nine-tailed fox woman sits on the right, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long elegant legs. She has removed the white fox mask from her face; one hand lets the mask rest beside her knee or at the table edge, while the other presents an elegant blank destiny scroll toward the player. Only restrained talismans, fading foxfire and red-thread traces remain in the background. No heavy fog over the text area. She remains intensely alluring but looks clearer and less controlling than before. No readable text. This must feel like a formal judgment after a dangerous pattern has been recognized, not another mirror seduction portrait.

**Desktop Modifier**
> 16:9, left 38–43% clean destiny area, heroine right, mask visible near her hand, no fog over left paper zone.

**Mobile Modifier**
> 9:16, face / bust / removed mask in upper half, lower area clean for destiny UI, preserve seductive danger without obscuring readability.

**不能出錯**：面具還戴著、重複 `FORBIDDEN_mirror_gaze` 構圖、大片霧、亂碼文字。

---

## A11｜`forbidden.ending`｜門後無人

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FORBIDDEN_ENDING_01_empty_gate_desktop.webp`
- `FORBIDDEN_ENDING_01_empty_gate_mobile.webp`

**故事任務**：卸面後真正收尾。門已開，但後面沒有任何人。

**人物動作**：九尾側身或半回首，手裡拿著已卸下狐面；也可以把狐面放在門邊。不是勝利笑，而是安靜知道某個循環結束。

**中文核心 Prompt**
> 日式暗黑奇幻視覺小說禁卷結尾。同一位成熟性感妖艷九尾狐女性站在打開的禁門／神社紙門旁，長黑髮、白狐耳、九條淡白狐尾、暖紅眼、華麗黑紅和服、胸部豐滿偏大、細腰長腿。她已卸下面具，狐面握在手中或安靜放在門邊。門後必須清楚是空的，沒有等待的人、沒有神祕人影，只有逐漸熄滅的狐火、燒過的符紙、很淡的晨光或將亮未亮的天空。她半回首看向玩家，表情安靜、微冷、仍有成熟誘惑力，但像終於不再把危險包裝成答案。畫面有空虛、餘火、結束後的寂靜。

**English core Prompt**
> Cinematic Japanese dark-fantasy visual-novel ending. The same mature seductive nine-tailed fox woman stands beside an opened forbidden shrine gate / paper door, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long legs. She has removed the fox mask; it is held in her hand or rests quietly beside the doorway. Beyond the opened gate there is clearly **no one** — no waiting person, no mysterious silhouette, only fading foxfire, burned talisman fragments and the first weak hint of dawn. She glances back toward the player with a quiet, slightly cool, still alluring expression, as if she no longer needs to package danger as an answer. Emotional emptiness, lingering heat, ritual aftermath, true closure.

**Desktop Modifier**
> 16:9, open empty doorway clearly readable center or right, heroine offset to one side, text-safe area on opposite side, mask visible.

**Mobile Modifier**
> 9:16, vertical doorway emphasized behind heroine, empty space beyond it must remain visible, face and mask above dialogue zone, do not crop the door opening.

**不能出錯**：門後有人影、重複鏡中九尾、只有人物特寫沒有門、狐面消失。

---

## A12｜`finale.gate`｜無字之門

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FINALE_GATE_01_fifth_door_desktop.webp`
- `FINALE_GATE_01_fifth_door_mobile.webp`

**故事任務**：四痕同時發熱，指向九尾身後第五道無字之門；她第一次真正失去從容。

**人物動作／表情**：九尾站在第五門前偏側，第一次不是自信微笑：驚訝、難以置信、嘴唇微張、一手本能後撤、一手想碰異象卻停住。

**背景／事件**：紅線、玄棋、鏡片、狐面四件遺物同時發光，光線／方向清楚指向九尾與門。

**中文核心 Prompt**
> 16:9 或 9:16 日式暗黑奇幻視覺小說終局場景。四卷遺物——未結紅線、唯一玄棋、碎鏡片、白色狐面——同時在前景或祭壇上發熱發光，四道不同色溫的痕跡匯聚，明確指向九尾身後一扇原本不存在、沒有字的第五道門／鳥居。相同成熟九尾狐女性站在門前，長黑髮、白狐耳、九條淡白狐尾、黑紅華麗和服、豐滿偏大的胸型、細腰長腿。**她第一次不再自信微笑**：眼睛比平常更大、嘴唇微張、真正驚訝與難以置信，帶一點害怕；一隻手本能往後退，另一隻手想碰發光痕跡卻停在半空。性感妖艷外型不變，但控制感第一次裂開。畫面要有真正終局門開啟前的壓迫感。

**English core Prompt**
> Cinematic Japanese dark-fantasy visual-novel finale scene. The four relics from the previous routes — an unfinished red thread, a single black chess piece, a mirror shard and a white fox mask — simultaneously heat up and glow in the foreground or on a ritual table. Four distinct trails of light converge and unmistakably point toward a previously impossible, nameless fifth gate / torii behind the fox woman. The same mature nine-tailed heroine stands before it, long black hair, white fox ears, exactly nine pale-white tails, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long legs. **For the first time she is not smiling confidently.** Her eyes are wider, lips slightly parted, showing genuine surprise, disbelief and a trace of fear. One hand instinctively moves backward; the other reaches toward the phenomenon but hesitates before touching it. Her seductive,妖艷 appearance remains, but her control has visibly cracked. Strong final-act pressure.

**Desktop Modifier**
> 16:9 wide cinematic composition, fifth gate large behind heroine, four relics readable in foreground, heroine center-right, leave one side clean for short dialogue without covering relics.

**Mobile Modifier**
> 9:16 vertical gate towering behind her, face and shocked expression 18–45%, four relics arranged mid-lower but above dialogue zone, preserve all four objects.

**不能出錯**：九尾仍自信微笑、四痕缺一、光指向玩家而非九尾／門、第五門只是普通背景門。

---

## A13｜`finale.confession`｜九尾失言

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FINALE_CONFESSION_01_vulnerable_seal_desktop.webp`
- `FINALE_CONFESSION_01_vulnerable_seal_mobile.webp`

**故事任務**：九尾第一次真正坦白私心；她牽玩家的手貼向封印，但力道停在玩家隨時能抽回的位置。

**人物動作**：九尾靠近但不壓迫；雙手中只有一手輕牽第一人稱玩家手腕／手掌，另一手靠近自己的胸前第五印；表情脆弱、害怕失去，不是情色勾引。

**中文核心 Prompt**
> 日式暗黑奇幻視覺小說情緒高潮場景。同一位成熟妖艷九尾狐女性近距離面對第一人稱玩家，長黑髮、白狐耳、九條淡白狐尾、暖紅眼、黑紅花紋和服、胸部明顯豐滿偏大、細腰長腿。她第一次卸下平常自信控制的笑，眼神脆弱、真誠、有一點害怕。她輕輕牽起玩家的一隻手，把玩家掌心帶向自己胸前／身前正在形成的第五封印，但她的手指只是輕搭，清楚留出玩家隨時可以抽回的空間。另一隻手停在封印旁，像不敢替玩家完成最後一步。構圖成熟性感、近身、有吸引力，但情緒核心是坦白與害怕失去，不是人體藝術。封印、玩家手與她的表情都要清楚。

**English core Prompt**
> Cinematic Japanese dark-fantasy visual-novel emotional climax. The same mature seductive nine-tailed fox woman faces the first-person player at close range, long black hair, white fox ears, exactly nine pale-white tails, warm reddish eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long legs. For the first time she has dropped her usual confident controlling smile; her eyes are vulnerable, sincere and slightly afraid. She gently takes one of the player's hands and guides the open palm toward the fifth seal forming in front of her chest / body, but her fingers only rest lightly, clearly leaving enough space for the player to pull away at any moment. Her other hand hovers near the seal, unwilling to complete the decision for them. Mature, sensual, intimate and magnetic, but the emotional center is confession and fear of loss, not erotic display. The seal, player hand and her vulnerable face must all be readable.

**Desktop Modifier**
> 16:9 close cinematic composition, heroine center-right, player hand enters from lower foreground, fifth seal between hand and her upper torso, clean side area for dialogue, do not cover face or seal.

**Mobile Modifier**
> 9:16, face in upper 20–38%, seal and guided player hand around 40–60%, full bust visible but naturally clothed, bottom dialogue zone below the hand, do not crop ears or fingers.

**不能出錯**：強抓玩家手、九尾又在笑得很自信、封印不見、畫面變成情色胸部特寫、手部崩壞。

---

## A14｜`finale.seal-test`｜第五印形成（只缺手機）

**生成**：`Desktop 保留現圖`　`[ ] Mobile`

**建議檔名**
- `FINALE_SEAL_TEST_01_uncontrolled_seal_mobile.webp`

**故事任務**：狐火逼迫玩家立刻決定，第五印在九尾身前不受控制形成；九尾想阻止卻不敢碰。

**中文核心 Prompt**
> 9:16 直式日式暗黑奇幻視覺小說終局操作場景。同一位成熟妖艷九尾狐女性正面或微側面出現在畫面中上方，長黑髮、白狐耳、九條淡白狐尾、黑紅華麗和服、豐滿偏大的胸型、細腰。她的身前／胸前外側懸浮形成一枚不受控制的第五封印，由狐火、四卷痕跡與細碎紅光構成。她神情真正驚訝、害怕、沒有自信微笑；一隻手本能後撤，另一隻手伸向第五印卻停在距離它幾公分的位置，不敢碰。封印必須完全可見、適合玩家操作／點觸，不可被人物胸部或台詞區擋住。頂部留 UI 空間，下方留對話空間。

**English core Prompt**
> 9:16 portrait cinematic Japanese dark-fantasy visual-novel interaction scene. The same mature seductive nine-tailed fox woman appears in the upper-middle frame, long black hair, white fox ears, exactly nine pale-white tails, luxurious black-and-crimson kimono, prominently full large natural bust and slim waist. In front of, not inside, her chest / upper torso, an uncontrolled fifth seal is forming from foxfire, traces of the four previous routes and fragmented red light. She looks genuinely shocked and afraid, with no confident smile. One hand instinctively pulls backward; the other reaches toward the seal but stops a few centimeters away, unable to touch it. The complete seal must remain fully visible and usable as an interaction target, not hidden by her bust or dialogue UI. Keep the top clear for UI and the lower area clear for text.

**Mobile Modifier**
> 9:16 only, top 0–12% clean, face 18–38%, fifth seal 40–58%, hands readable around the seal, lower 64–100% visually quiet for dialogue / controls.

**不能出錯**：第五印被胸線擋住、九尾碰到印、九尾笑得從容、直接借用禁卷鏡圖。

---

## A15｜`finale.ending`｜真結・總命牒

**生成**：`[ ] Desktop`　`[ ] Mobile`

**建議檔名**
- `FINALE_ENDING_01_final_destiny_scroll_desktop.webp`
- `FINALE_ENDING_01_final_destiny_scroll_mobile.webp`

**故事任務**：九尾回來親手展開總命牒。這張從構圖源頭解決「左側命牒與九尾中央構圖衝突」。

**人物動作**：九尾右側坐／跪，姿態成熟安定，不再操控玩家；手持毛筆或展開卷軸，四件遺物安靜放在附近。

**中文核心 Prompt**
> 《櫻隱》真結總命牒，最終高質感日式暗黑奇幻視覺小說 CG。同一位成熟性感妖艷九尾狐女性回到安靜的神社書案旁，長黑髮、白狐耳、九條淡白大型狐尾、暖紅眼、華麗黑紅和服、胸部明顯豐滿偏大、細腰長腿、成熟漂亮曲線。她不再像前面那樣控制或試探玩家，而是安靜坐／半跪在畫面右側，一手持毛筆或朱印，一手親手展開最終空白命牒。紅線、玄棋、鏡片、狐面四件遺物已不再發狂，只安靜放在書案／地面附近。天色開始轉亮，狐火很弱，整體像真正走完夜晚。不要生成任何可讀文字。最重要：桌機左側必須從源圖開始保留完整大面積乾淨紙面／背景安全區，九尾的臉、胸、手、狐尾都不能伸進左側命牒文字區。

**English core Prompt**
> Final true-ending destiny-scroll CG for SakuraHiddenShrine, premium cinematic Japanese dark-fantasy visual novel. The same mature seductive nine-tailed fox woman has returned to a quiet shrine writing desk, long black hair, white fox ears, exactly nine large pale-white fluffy tails, warm reddish eyes, luxurious black-and-crimson kimono, prominently full large natural bust, slim waist and long elegant legs. She is no longer controlling or testing the player. She sits or kneels calmly on the right side, holding a brush or vermilion seal in one hand and personally opening the final blank destiny scroll with the other. The four relics — red thread, black chess piece, mirror shard and fox mask — are now quiet and resting nearby rather than glowing violently. Dawn is beginning, foxfire is faint, the entire night feels complete. Do not render readable text. Most importantly, the desktop artwork must be composed from the source with a genuinely clean large left paper / background area; her face, bust, hands and tails must not intrude into the destiny text zone.

**Desktop Modifier**
> 16:9. **Reserve left 38–43% completely clean** for the final destiny text. Heroine occupies right 48–96%. Keep all nine tails mostly behind/right of her. Four relics small but readable near her side. Soft first dawn, no text baked into paper.

**Mobile Modifier**
> 9:16. Heroine, brush and quiet relics in upper 15–52%. Lower 55–100% clean and calm for final destiny reader. Do not force a left-side scroll composition into portrait; redesign vertically. No text baked in.

**不能出錯**：九尾置中擋命牒、左 40% 被尾巴／胸／手佔滿、四痕還在暴走、AI 生成中文字。

---

# 5｜B 級 4 幕｜條件式備用 Prompt

> **目前不要生。** 只有網站實機／截圖證明現圖真的缺必要元素才啟動。

## B01｜`love.thread-room`｜線室

**啟動條件**：找不到真正含「鏡＋未寄信件＋單方紅線＋另一側沒有第二隻手」的現有素材。

**備用檔名**
- `LOVE_THREAD_ROOM_01_one_hand_letters_desktop.webp`
- `LOVE_THREAD_ROOM_01_one_hand_letters_mobile.webp`

**中文備用 Prompt**
> 古老神社長廊盡頭是一面大型鏡子，鏡前懸著數十封沒有寄出的信／和紙信封，多條紅線把每封信縫在一起，但所有紅線最後只繫在同一隻第一人稱玩家手上；鏡子的另一側清楚沒有第二隻手，也沒有另一個人。成熟妖艷九尾狐女性站在側邊，不碰紅線，只看著鏡子揭露「另一端從未做過那些事」。性感成熟、黑紅和服、豐滿胸型、九條淡白狐尾，但主視覺是鏡、未寄信、單手紅線。

**English backup Prompt**
> At the end of an old shrine corridor stands a large antique mirror. Dozens of unsent letters / washi envelopes hang before it, stitched together by many red threads, yet every thread ultimately ties to only one first-person player hand. The opposite side of the mirror clearly contains no second hand and no other person. The same mature seductive nine-tailed fox woman stands to the side without touching the threads, watching the mirror reveal that the other end never performed the missing actions. Sensual mature heroine, black-and-crimson kimono, prominently full bust, exactly nine pale-white tails, but the visual center must be the mirror, unsent letters and one-sided thread network.

---

## B02｜`career.turn`｜棋手反轉

**啟動條件**：現圖少任何一項：棋盤被抬起／盤底多雙手／唯一黑棋／玩家手。

**備用檔名**
- `CAREER_TURN_01_hands_under_board_desktop.webp`
- `CAREER_TURN_01_hands_under_board_mobile.webp`

**中文備用 Prompt**
> 九尾用一隻手抬起大型棋盤，盤底不是桌面，而是多雙不同人的手向上伸著，像都在等玩家替它們完成最後一步。唯一一顆黑棋從盤面滑回第一人稱玩家手心。九尾站在旁邊冷靜揭露真相，不是唯一主角。必須同時看到抬起棋盤、盤底多手、黑棋回到玩家手。

**English backup Prompt**
> The fox woman lifts a large strategy board with one hand. Beneath the board there is no normal tabletop — multiple different human hands reach upward, all waiting for the player to complete their final move. The only black chess piece slides back into the first-person player's palm. The nine-tailed fox woman calmly reveals the truth from the side rather than dominating the frame. The raised board, many hands underneath, single black piece and player hand must all be visible at once.

---

## B03｜`life.cost`｜命燈代價

**啟動條件**：現圖只是普通人物／燈景，看不出多個狀態逐步變暗、代價被記帳。

**備用檔名**
- `LIFE_COST_01_lamps_dimming_desktop.webp`
- `LIFE_COST_01_lamps_dimming_mobile.webp`

**中文備用 Prompt**
> 多盞命燈／鏡片沿著神社長廊排列，代表睡眠、情緒、身體緊繃、麻木等不同狀態，燈光從前到後逐盞變暗，形成明確「代價正在被記帳」的視覺。成熟妖艷九尾狐女性站在旁邊安靜觀察，手指輕碰最暗的一盞但不診斷、不醫療化。性感成熟、豐滿胸型、黑紅和服、九尾清楚，但主視覺是多狀態逐步熄暗。

**English backup Prompt**
> A sequence of life-lamps / mirror fragments lines a shrine corridor, each representing a different state such as sleep, emotion, body tension and numbness. From front to back, the lights progressively dim, creating an unmistakable visual sense that the cost is being recorded. The same mature seductive nine-tailed fox woman quietly observes from the side, lightly touching the darkest lamp without medicalizing the scene. Sensual mature heroine, prominently full bust, black-and-crimson kimono, exactly nine pale-white tails, but the visual center is the progressive dimming across multiple states.

---

## B04｜`forbidden.threat`｜重演廊

**啟動條件**：真正配對圖仍只像近頸威脅照，看不到四個不同的人／同一瞬間重演。

**備用檔名**
- `FORBIDDEN_THREAT_01_four_people_repeat_desktop.webp`
- `FORBIDDEN_THREAT_01_four_people_repeat_mobile.webp`

**中文備用 Prompt**
> 一條禁忌神社長廊分成四個門框／四段空間，四個不同的人物輪廓依序做出相同的轉身、冷淡、失約後回頭變溫柔等重複節奏，讓玩家一眼看懂「人不同，但那一刻一直重演」。九尾在近景或側邊觀察，成熟妖艷、黑紅和服、豐滿胸型、九條淡白狐尾，但不能用單一近頸性感照取代四人重演。

**English backup Prompt**
> A forbidden shrine corridor is divided into four doorways / spatial frames. Four clearly different human silhouettes repeat the same relational beat in sequence — turning away, becoming cold, breaking a promise, then returning warm again — so the viewer immediately understands: the people are different, but the same moment keeps repeating. The mature seductive nine-tailed fox woman observes from the foreground or side, black-and-crimson kimono, prominently full bust, exactly nine pale-white tails, but a single sensual close-up must not replace the four-person repetition.

---

# 6｜正式生成順序與勾選表

## 第一批｜劇情斷點最明顯
- [ ] A01 `love.silence` desktop
- [ ] A01 `love.silence` mobile
- [ ] A04 `love.ritual` desktop
- [ ] A04 `love.ritual` mobile
- [ ] A11 `forbidden.ending` desktop
- [ ] A11 `forbidden.ending` mobile
- [ ] A02 `love.turn` desktop
- [ ] A02 `love.turn` mobile
- [ ] A05 `career.borrowed` desktop
- [ ] A05 `career.borrowed` mobile
- [ ] A07 `life.turn` desktop
- [ ] A07 `life.turn` mobile
- [ ] A09 `forbidden.turn` desktop
- [ ] A09 `forbidden.turn` mobile
- [ ] A12 `finale.gate` desktop
- [ ] A12 `finale.gate` mobile
- [ ] A13 `finale.confession` desktop
- [ ] A13 `finale.confession` mobile

## 第二批｜四卷命牒
- [ ] A03 `love.result` desktop
- [ ] A03 `love.result` mobile
- [ ] A06 `career.result` desktop
- [ ] A06 `career.result` mobile
- [ ] A08 `life.result` desktop
- [ ] A08 `life.result` mobile
- [ ] A10 `forbidden.result` desktop
- [ ] A10 `forbidden.result` mobile

## 第三批｜真命終局
- [ ] A14 `finale.seal-test` mobile
- [ ] A15 `finale.ending` desktop
- [ ] A15 `finale.ending` mobile

### A 級合計
- 15 幕
- 29 張圖片檔

### B 級條件式
- [ ] B01 `love.thread-room`（只有實機失敗才啟動）
- [ ] B02 `career.turn`（只有實機失敗才啟動）
- [ ] B03 `life.cost`（只有實機失敗才啟動）
- [ ] B04 `forbidden.threat`（只有實機失敗才啟動）

---

# 7｜每張生成完成後的人工檢查

每張圖至少確認：

- [ ] 明確成年，沒有幼態。
- [ ] 同一張九尾臉、黑長髮、白狐耳、黑紅和服。
- [ ] **九條狐尾**數量與層次合理。
- [ ] 胸部保持豐滿偏大、腰細、腿長，但自然完整、不畸形。
- [ ] 頭、臉、脖子、胸線、肩膀、手、身體比例自然。
- [ ] 手指數量正確、手勢符合劇情。
- [ ] 不是普通人像，該幕必要事件一眼看懂。
- [ ] Desktop 文字安全區成立。
- [ ] Mobile 不是桌機硬裁，臉與關鍵道具保留。
- [ ] 圖內沒有 AI 亂碼中文字、Logo、水印或 UI。
- [ ] 沒有把前一幕相同構圖只是換光線重畫。

---

# 8｜第三段完成定義

本檔即為《櫻隱》V58 **唯一正式生圖操作彙整檔**。

從現在開始：

1. A 級依本檔逐張生成。
2. B 級不提前生成。
3. 新圖回填網站後，再做桌機／手機／文字安全區／focus／hotspot 實機驗收。
4. 驗收通過才標記 `🔒 LOCKED`。
5. 全部鎖定後，再進最後整站收尾與正式版整理。
