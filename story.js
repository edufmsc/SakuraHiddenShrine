(() => {
  'use strict';

  const beat = (speaker, text) => ({ speaker, text });
  const fox = text => beat('fox', text);
  const narrator = text => beat('narrator', text);
  const player = text => beat('player', text);
  const oracle = text => beat('oracle', text);
  const activeImageCategory = name => {
    const value = String(name || '').toLowerCase();
    if (value.startsWith('love_')) return '01_love';
    if (value.startsWith('career_')) return '02_career';
    if (value.startsWith('life_')) return '03_life';
    if (value.startsWith('forbidden_')) return '04_forbidden';
    if (value.startsWith('final_')) return value === 'final_dawn' ? '06_ending' : '05_fifth';
    if (value.startsWith('home_') || value.startsWith('opening_') || value.startsWith('hub_') || value.startsWith('ritual_') || value.startsWith('birth_')) return '00_home';
    return '07_shared';
  };
  const activeImage = (name, suffix = '') => `assets/images/active/${activeImageCategory(name)}/${name}${suffix}.webp`;
  const v46 = name => activeImage(name);
  const v47 = name => activeImage(name, '_v47');
  const v49 = name => activeImage(name);
  const art = (desktop, mobile, side = 'left', desktopFocus = '50% 50%', mobileFocus = '50% 25%', galleryTitle = '', mobileSide = 'bottom', meta = {}) => ({
    desktop, mobile: mobile || desktop, side, mobileSide, desktopFocus, mobileFocus, galleryTitle, ...meta
  });
  const choice = (id, label, hint, reaction, effects = {}, reactionArt = null) => ({ id, label, hint, reaction, effects, reactionArt });

  const love = {
    id: 'love', label: '緣之卷', door: '緣之門', glyph: '緣', relic: '未結紅線',
    accent: '#ff688f', rgb: '255, 104, 143', audio: 'assets/audio/love.ogg', deepAudio: 'assets/audio/love_deep.ogg',
    teaser: '她不問愛不愛，只看誰替下一次留下位置。',
    scoreKeys: ['mutual', 'reclaim', 'projection', 'alone'],
    scenes: [
      {
        id: 'love.threshold', phase: '試探', layout: 'ritual', kicker: '緣之卷・雨廊', title: '先別說對方的名字。',
        art: art('assets/images/active/01_love/LOVE_01_rain_bridge_invite_v39.webp', 'assets/images/active/01_love/love_018.webp', 'left', '53% 50%', '50% 22%', '雨廊邀請'),
        beats: [
          fox('{{name}}，先別說對方的名字。名字一出口，你就會開始替對方解釋。今晚我只看一件事——這條線，究竟是誰一直拉著。'),
          narrator('她把掌心停在你必須自己往前半步的位置。')
        ],
        choices: [
          choice('take', '把手交給她', '承認你想知道。', [fox('她扣住你的指尖，沒有用力。「很好。至少第一步不是對方替你走的。」')], { behavior: { approach: 2, trust: 1 } }),
          choice('price', '先問她要收什麼', '答案可以危險，代價不能藏。', [fox('她把手收回半寸，笑意反而深了。「我只收你不再否認的那一件事。」')], { behavior: { challenge: 2, control: 1 } })
        ]
      },
      {
        id: 'love.face', phase: '近身', layout: 'ritual', deep: true, kicker: '緣之卷・臉前一寸', title: '她把距離交給你。',
        art: art(v49('love_face_before'), v46('LOVE_03_close_face_bait_mobile'), 'left-top', '55% 24%', '50% 14%', '臉前一寸', 'bottom', { heroPresence: 'large' }),
        beats: [
          narrator('她牽起你的手，帶到自己臉前。'),
          fox('別先討好我。你第一個動作，比答案誠實。')
        ],
        choices: [
          choice('touch-cheek', '指尖碰她的臉頰', '直接確認她是否真的留在原地。', [narrator('你碰到她時，她沒有迎上來，只用臉頰輕壓你的指腹。'), fox('「想確認就碰。只是別把我沒有躲，提前翻譯成永遠。」')], { behavior: { approach: 2, trust: 1 } }, art(v49('love_face_touch'), v46('LOVE_VERIFY_01_next_time_proof_mobile'), 'left-top', '55% 23%', '50% 14%', '臉頰回應', 'bottom', { heroPresence: 'large' })),
          choice('stop-before-lips', '停在她唇前一寸', '承認想靠近，也保留讓她回應的空間。', [narrator('她的呼吸擦過指尖，卻故意不替你完成最後一寸。'), fox('「會停的人，不一定膽小。有時只是想看另一個人會不會也往前。」')], { behavior: { restraint: 2, trust: 1 } }, art(v49('love_lips_pause'), v46('LOVE_03_close_face_bait_mobile'), 'left-top', '56% 22%', '50% 13%', '唇前停手', 'bottom', { heroPresence: 'large' })),
          choice('withdraw-hand', '碰到以前收回手', '不讓心跳替你承諾靠近後的結果。', [narrator('你收手，她也退回鏡後；原本被體溫照亮的地方只剩紅線。'), fox('「你不是不想。你只是習慣在伸手以前，先替自己準備退路。」')], { behavior: { retreat: 2, control: 1 } }, art('assets/images/active/01_love/LOVE_empty_threads.webp', 'assets/images/active/01_love/love_020.webp', 'left-top', '50% 18%', '50% 20%', '伸手前的空位', 'bottom', { heroPresence: 'empty' }))
        ]
      },
      {
        id: 'love.question', phase: '起線', layout: 'split', kicker: '緣之卷・第一問', title: '哪一句最怕是真的？',
        art: art('assets/images/active/01_love/LOVE_02_mirror_thread_interaction_v39.webp', 'assets/images/active/01_love/LOVE_02_mirror_thread_interaction_mobile.webp', 'right-top', '56% 18%', '50% 18%', '鏡中紅線'),
        beats: [
          narrator('紅線越過鏡面，另一端沉進黑暗。'),
          fox('別選最好聽的。選一句——如果我說中了，你今晚會最想逃開的。')
        ],
        choices: [
          choice('near', '對方真的會走向我嗎？', '看安排，不只看語氣。', fox('「你問未來，眼睛卻一直替現在求情。」'), { scores: { mutual: 2 } }),
          choice('return', '為什麼我一退，對方才靠近？', '分辨靠近與回收距離。', fox('「有些人怕失去位置，卻未必想承擔關係。」'), { scores: { reclaim: 2 } }),
          choice('details', '那些細節，真的代表什麼嗎？', '把感受與承諾拆開。', fox('「細節可以是真的；把它升成答案的人，可能是你。」'), { scores: { projection: 2 } }),
          choice('wait', '我到底還要等多久？', '只看另一端有沒有前進。', fox('「期限不在對方嘴裡。等看完，我要你自己定。」'), { scores: { alone: 2 }, behavior: { wait: 1 } })
        ]
      },
      {
        id: 'love.wrist', phase: '起線', layout: 'ritual', kicker: '緣之卷・纏腕', title: '線一緊，你先顧誰？',
        art: art('assets/images/active/01_love/LOVE_04_player_hand_pulled_v39.webp', 'assets/images/active/01_love/LOVE_04_player_hand_pulled_mobile.webp', 'left', '58% 50%', '50% 29%', '紅線纏腕'),
        beats: [
          narrator('紅線忽然收緊。'),
          fox('我沒有綁你。是你的手先抓住了。你先怕它斷，還是先問自己疼不疼？')
        ],
        choices: [
          choice('pull', '把線拉回來', '不讓距離繼續變遠。', fox('「只給一點張力，你就急著替兩個人維持它。」'), { scores: { alone: 2 }, behavior: { hold: 1, wait: 1 } }),
          choice('loosen', '把手鬆開', '看另一端會不會自己留下。', fox('線沒有落地。「真的有另一端，從來不必靠你掐住。」'), { scores: { mutual: 1 }, behavior: { agency: 2, restraint: 1 } }),
          choice('catch-her', '改握住九尾的手', '把主導權從紅線拿回來。', [narrator('她低頭看著被你握住的手，沒有掙開。'), fox('「你想問線，還是想問我？」')], { behavior: { approach: 2, challenge: 1 } })
        ]
      },
      {
        id: 'love.evidence', phase: '驗證', layout: 'evidence', kicker: '緣之卷・第一項證據', title: '下一次，是誰留下的？',
        art: art('assets/images/active/01_love/LOVE_lips_hush_v44.webp', 'assets/images/active/01_love/love_021.webp', 'left', '62% 48%', '50% 19%', '噤聲近影'),
        beats: [
          fox('先別替對方解釋忙不忙。最近三次——下一次，是誰提出，又是誰真的讓它發生？'),
          narrator('她離得很近，近到專注很容易被誤認成偏愛。')
        ],
        choices: [
          choice('planned', '對方主動提出，而且做到', '有時間、有安排、有發生。', fox('「這才叫靠近。不是想起你，是替你留下時間。」'), { scores: { mutual: 4 } }),
          choice('i-ask', '通常我先問，對方才答應', '回應存在，主動不足。', fox('「答應不等於安排。現在這條線，還是你在餵。」'), { scores: { alone: 3 } }),
          choice('vague', '對方說下次，卻從未定下', '語氣延續，現實沒有落點。', fox('「沒有日期的『下次』，常只是捨不得你現在離開。」'), { scores: { projection: 2, reclaim: 1 } }),
          choice('cold', '我一冷，對方才突然出現', '確認你仍在，卻不往前。', fox('「對方回收的是距離。是不是關係，再看第二刀。」'), { scores: { reclaim: 4 } })
        ]
      },
      {
        id: 'love.thread-room', phase: '異象', layout: 'whisper', kicker: '緣之卷・線室', title: '鏡子裡沒有第二雙手。',
        art: art('assets/images/active/01_love/love_006.webp', 'assets/images/active/01_love/love_022.webp', 'right', '50% 50%', '50% 20%', '線室空鏡'),
        lead: ['讓鏡面把話說完', '這一次不必回答。先看空白究竟屬於誰。'],
        beats: [
          narrator('長廊盡頭，數十封沒有寄出的信被紅線縫在鏡前。每一條都繫在同一隻手上。'),
          player('另一端呢？'),
          fox('鏡子照不出沒有做過的事。溫柔可以是真的；承諾，不能由你替對方補。')
        ]
      },
      {
        id: 'love.proximity', phase: '誘惑', layout: 'whisper', kicker: '緣之卷・近身', title: '被渴望，不等於被選擇。',
        art: art('assets/images/active/01_love/LOVE_close_reach_v44.webp', 'assets/images/active/01_love/love_025.webp', 'left', '58% 48%', '50% 15%', '九尾伸手'),
        dynamicEcho: {
          mutual: '你沒有看錯靠近。現在只差一件事：它能不能在沒有你拉的時候，還繼續往前。',
          reclaim: '對方很會在你要走時讓你重新心跳。可回來確認你還在，不等於真正選擇你。',
          projection: '你很容易把「對方記得你」，當成「對方選擇你」。今晚先把兩件事拆開。',
          alone: '你最怕承認的不是對方沒有感覺，而是有感覺，也可能不往前。'
        },
        lead: ['先別急著替這句找答案', '她記得你剛才留下的選擇，只把紅線再往你面前推一寸。'],
        beats: [
          narrator('她俯身，指尖只停在你下巴前，沒有碰。'),
          fox('身體會先替你相信很多事。被注意、被需要、被選擇——不是同一件事。')
        ]
      },
      {
        id: 'love.silence', phase: '反咬', layout: 'evidence', deep: true, kicker: '緣之卷・沉默之後', title: '誰把關係接回來？',
        art: art('assets/images/active/01_love/love_015.webp', 'assets/images/active/01_love/love_020.webp', 'left-bottom', '61% 50%', '50% 24%', '沉默長廊'),
        beats: [
          narrator('紅線忽然熄滅。'),
          fox('冷下來以後，我不問誰先丟一句話。我只看——誰真的把關係往前接。')
        ],
        choices: [
          choice('repair', '對方會主動補上安排', '沉默後帶來具體進度。', fox('「那條線有回力。你可以說需要，不必先演不在意。」'), { scores: { mutual: 4 } }),
          choice('check', '對方只確認我還在不在', '確認位置，沒有承擔下一步。', fox('「確認你還在，和決定走向你，中間隔著整座命館。」'), { scores: { reclaim: 4 } }),
          choice('restart', '每次都是我重新開話題', '關係靠單方續命。', fox('「你不是在維持默契。你是在替沉默付費。」'), { scores: { alone: 4 } }),
          choice('nobody', '我們都沒有接回去', '關係可能停在過去。', fox('「沒有接回來，也是一種回答。只是它沒有你想聽的聲音。」'), { scores: { alone: 2 }, behavior: { change: 1 } })
        ]
      },
      {
        id: 'love.turn', phase: '反轉', layout: 'ritual', deep: true, kicker: '緣之卷・紅線反咬', title: '困住你的，不全是對方。',
        art: art('assets/images/active/01_love/love_003.webp', 'assets/images/active/01_love/love_022.webp', 'left', '64% 48%', '50% 19%', '倒影回線'),
        lead: ['先看鏡裡那個人', '九尾沒有催你。紅線正從鏡後繞回你的手。'],
        beats: [
          narrator('紅線穿過鏡面，纏回你的倒影。那個人還在替一張空椅整理位置。'),
          fox('還有一個人你一直沒有問——那個相信只要再懂事一點、再漂亮一點、再少要一點，就能換來確定的你。'),
          fox('看清楚。困住你的，不全是對方。')
        ]
      },
      {
        id: 'love.last-proof', phase: '判讀', layout: 'split', deep: true, kicker: '緣之卷・最後一證', title: '若你不再餵線，它會怎樣？',
        art: art('assets/images/active/01_love/love_last_proof.webp', 'assets/images/active/01_love/love_last_proof.webp', 'left-top', '50% 50%', '50% 45%', '無人碰線的終證', 'bottom', { heroPresence: 'empty' }),
        beats: [
          narrator('她把線放在桌上，兩端都不碰。'),
          fox('{{period}}。不試探、不消失、不多做。只清楚說一次你需要什麼，然後看它會不會自己朝你走。')
        ],
        choices: [
          choice('touch-line', '碰一下桌上的紅線', '不是承諾，只是讓答案有地方落下。', fox('線只亮了一次。「很好。接下來讓現實自己寫。」'), { behavior: { agency: 1, restraint: 1 } })
        ]
      },
      { id: 'love.result', type: 'result', phase: '判詞', kicker: '緣之卷・九尾判讀', title: '紅線肯說實話了。', art: art('assets/images/active/01_love/love_destiny_wide.webp', 'assets/images/active/01_love/love_destiny_wide.webp', 'right', '50% 50%', '58% 34%', '九尾提筆寫下緣卷命牒', 'bottom', { heroPresence: 'large' }) },
      {
        id: 'love.ritual', type: 'ritual', phase: '收卷', layout: 'ritual', kicker: '緣之卷・封線', title: '選一種帶走答案的方式。',
        art: art('assets/images/active/08_props/FX_004.png', 'assets/images/active/01_love/love_020.webp', 'right', '50% 50%', '50% 25%', '封線之手'),
        beats: [fox('判詞不是命令。你要替它做一個能在現實發生的結尾。')],
        choices: [
          choice('unknotted', '不打結，繞在自己腕上', '給現實一次靠近的空間，也保留鬆手的權利。', fox('「未結，才看得見另一端會不會自己靠近。」'), { flags: { loveRitual: 'unknotted' }, behavior: { restraint: 1 } }),
          choice('mirror-cut', '在鏡前剪斷多餘的一截', '停止替未發生的事預留無限位置。', fox('「你剪掉的不是人，是那個沒有期限的也許。」'), { flags: { loveRitual: 'mirror-cut' }, behavior: { change: 1 } }),
          choice('door-knot', '把線打在門環，不帶走', '讓關係自己來敲門。', fox('「很好。真正想進來的人，知道門在哪裡。」'), { flags: { loveRitual: 'door-knot' }, behavior: { agency: 1 } })
        ]
      },
      { id: 'love.ending', type: 'ending', phase: '餘韻', kicker: '緣之卷・雨停以前', title: '緣卷封了。', art: art('assets/images/active/01_love/love_016.webp', 'assets/images/active/07_shared/shared_009.webp', 'right-top', '50% 48%', '50% 22%', '雨夜收線') }
    ],
    results: {
      mutual: { title: '雙線靠近', verdict: '兩端都有溫度，但需要一次清楚的落點。', lines: ['不是你一拉，對方才動；另一端已用時間或安排留下下一次。', '你真正要做的不是再猜，而是把自己的位置說清楚，讓對方完成後半段。'], sign: '近期會出現主動確認時間、延續話題，或把你納入現實安排的動作。', action: '提出一次可回答的具體邀請；說完停止補充，觀察對方是否自行完成安排。', caution: '別把「有好感」提前翻譯成「已承諾」。' },
      reclaim: { title: '回收式曖昧', verdict: '對方在意失去你的位置，還沒證明願意承擔關係。', lines: ['線一鬆，對方就拉；你一靠近，對方又停。', '這種靠近能讓人上癮，因為每次都像差一點就會成真。'], sign: '你降低主動後，對方會出現確認你仍在，卻迴避具體下一步。', action: '停止主動修復一次沉默，保留禮貌，不用冷暴力；只看對方是否把路走完。', caution: '回來找你，不等於決定走向你。' },
      projection: { title: '替對方補完', verdict: '溫柔可能是真的，完整答案多半是你拼出來的。', lines: ['你沒有看錯細節；你只是把碎片升成了對方沒說過的承諾。', '當現實太少，想像會替關係維持體溫。'], sign: '實際行動會少於你對訊息、語氣與眼神的解釋。', action: '七天只記「對方實際做了什麼」，不替沉默配字幕；七天後再判讀。', caution: '懂你，不等於選你。' },
      alone: { title: '線只在你手裡', verdict: '這條線被你養得很漂亮，另一端卻沒有往前。', lines: ['你等到的是同一種模糊換了日期。', '繼續等待不會讓你更深情，只會讓期限消失。'], sign: '停止主動後，關係沒有新的自發行動，只剩偶爾回應。', action: '說清楚需要的關係節奏與等待期限；期限到時，以行動而不是新理由作答。', caution: '別把忍耐叫成命中注定。' }
    },
    ritualEndings: {
      unknotted: '你把未結紅線繞上手腕。它不再勒緊，也沒有替任何人預留結。',
      'mirror-cut': '剪下的線沉進鏡底。門外仍有雨，但你第一次沒有回頭確認另一端。',
      'door-knot': '門環上的線隨風晃動。若有人真想靠近，下一個動作不再由你代做。'
    }
  };

  const career = {
    id: 'career', label: '業之卷', door: '業之門', glyph: '業', relic: '署名玄棋',
    accent: '#68d4ff', rgb: '104, 212, 255', audio: 'assets/audio/career.ogg', deepAudio: 'assets/audio/career_deep.ogg',
    teaser: '她不算你夠不夠努力，只算誰能帶走你的成果。',
    scoreKeys: ['visible', 'borrowed', 'stuck', 'move'],
    scenes: [
      {
        id: 'career.threshold', phase: '開局', layout: 'ritual', kicker: '業之卷・棋室', title: '努力先放在門外。',
        art: art('assets/images/active/02_career/CAREER_chess_command_v44.webp', 'assets/images/active/02_career/career_017.webp', 'right', '44% 50%', '50% 23%', '玄棋開局'),
        beats: [
          narrator('棋室裡沒有紙筆。九尾坐在真正的棋盤前，黑子排成你的工時，白子刻著別人的名字。'),
          fox('別怕，我沒有要你下贏。先看清你在這局裡究竟是棋子、棋手，還是替人收拾棋盤的手。'),
          fox('{{name}}，最近最想從工作裡拿回哪一樣？')
        ],
        choices: [
          choice('position', '位置與決定權', '不只做事，也能改變方向。', fox('「那我看你說的話，最後有沒有留下形狀。」'), { scores: { visible: 2 } }),
          choice('money', '報酬與交換', '讓成果不再只換來更多工作。', fox('「很好。錢比讚美誠實，也比委屈容易計算。」'), { scores: { borrowed: 1, move: 1 } }),
          choice('exit', '離開或轉換跑道', '確認你是在逃，還是在移動。', fox('「想走不是答案。我要看你手上有沒有能帶走的東西。」'), { scores: { move: 2 } }),
          choice('breath', '只想先喘得過氣', '疲憊可能早已蓋住判斷。', fox('「若連呼吸都要排進待辦，這局已經在吃你。」'), { scores: { stuck: 2 }, behavior: { hold: 1 } })
        ]
      },
      {
        id: 'career.name', phase: '盤面', layout: 'evidence', kicker: '業之卷・第一手', title: '成果最後寫誰的名字？',
        art: art('assets/images/active/02_career/CAREER_02_table_cards_choice_v39.webp', 'assets/images/active/02_career/CAREER_02_table_cards_choice_mobile.webp', 'left', '57% 50%', '50% 27%', '成果牌桌'),
        beats: [
          narrator('她把三張成果牌翻面：完成、解危、救場。每張背後都黏著一個名字。'),
          fox('最近最重要的一次成果，被介紹給別人時，誰的名字先出現？')
        ],
        choices: [
          choice('mine', '我的名字與角色都清楚', '貢獻能被指認，也能被複述。', fox('「可見，才有談判。這顆子先留著。」'), { scores: { visible: 4 } }),
          choice('boss', '上級或團隊的名字先出現', '你做得到，功勞卻被借走。', fox('「團隊不是問題；只有你的部分永遠說不清，才是。」'), { scores: { borrowed: 4 } }),
          choice('hidden', '大家知道是我，但沒有紀錄', '口碑存在，證據不足。', fox('「口頭感謝會蒸發。你需要一個能離開房間的證明。」'), { scores: { borrowed: 2, stuck: 1 } }),
          choice('unclear', '連我都說不清自己的部分', '忙碌取代了成果敘事。', fox('「做了很多，不等於留下籌碼。今晚先把兩件事拆開。」'), { scores: { stuck: 3 } })
        ]
      },
      {
        id: 'career.black-piece', phase: '盤面', layout: 'ritual', kicker: '業之卷・留名', title: '她把一塊沒有名字的籤牌交到你手裡。',
        art: art('assets/images/active/02_career/career_002.webp', v46('CAREER_01_fan_command_mobile'), 'left-top', '50% 48%', '50% 17%', '藍燈檔案室・無名籤牌'),
        beats: [
          narrator('藍燈照亮檔案室。九尾抽出一塊沒有名字的籤牌，讓它停在你伸手就能接到的位置。'),
          fox('如果明天你不在，什麼會跟著你走？技能、客戶的信任、作品、數字，還是什麼都留在原公司？'),
          fox('別只說「經驗」。能被指出、帶走、再次使用的，才真正跟著你。')
        ],
        choices: [
          choice('asset', '我有能展示的成果與能力', '離開原位置仍可被辨認。', fox('黑棋浮出一道細紋。「那不是棋子，是你的槓桿。」'), { scores: { visible: 2, move: 2 } }),
          choice('relationship', '只有關係與信任能帶走', '有價值，但需要轉成可說明的交換。', fox('「人脈若只在你替人救火時出現，還不算槓桿。」'), { scores: { borrowed: 1, visible: 1 } }),
          choice('nothing', '幾乎都留在原位置', '責任很多，可攜資產很少。', fox('「那你不是不能走，是還沒開始替自己打包。」'), { scores: { stuck: 3 } }),
          choice('plan', '我正在準備帶走的東西', '移動已經開始，只是尚未公開。', fox('「別急著宣布。先讓準備長到能保護你。」'), { scores: { move: 4 }, behavior: { restraint: 1 } })
        ]
      },
      {
        id: 'career.exchange', phase: '交易', layout: 'split', kicker: '業之卷・加碼', title: '下一次加工作，換什麼？',
        art: art('assets/images/active/02_career/career_003.webp', 'assets/images/active/02_career/career_016.webp', 'left', '59% 50%', '50% 19%', '命館帳房'),
        beats: [
          narrator('她把一疊任務推向你，扇骨壓住最上方。每拿一張，你的黑棋就淡一分。'),
          fox('下一次有人說「只有你能做」，別先感動。那句話後面若沒有資源、時間、職稱或報酬，只是更漂亮的勒索。'),
          fox('你通常怎麼回？')
        ],
        choices: [
          choice('terms', '先問優先順序與交換條件', '責任增加，權限也要增加。', fox('「很好。能談條件的人，才在盤上有手。」'), { scores: { visible: 3 }, behavior: { challenge: 1 } }),
          choice('accept', '先接下來，之後再說', '可靠，但容易被當成無限容量。', fox('「之後通常沒有之後。你已經把價格說成零。」'), { scores: { stuck: 3 }, behavior: { hold: 1 } }),
          choice('refuse', '直接拒絕，不多解釋', '界線清楚，也可能失去布局空間。', fox('「刀很快。下一次記得問：有沒有你值得換的東西。」'), { scores: { move: 2 }, behavior: { agency: 1 } }),
          choice('document', '接，但把範圍與成果寫下', '把救場轉成可見籌碼。', fox('「這一手很安靜，卻會在談判時發聲。」'), { scores: { visible: 3, borrowed: 1 } })
        ]
      },
      {
        id: 'career.borrowed', phase: '異象', layout: 'whisper', kicker: '業之卷・借名', title: '棋子開始換名字。',
        art: art(v49('career_name_swap'), 'assets/images/active/02_career/career_019.webp', 'left-top', '55% 28%', '50% 22%', '借名棋局', 'bottom', { heroPresence: 'large' }),
        beats: [
          narrator('棋盤發出細響。你做過的每件事都變成一枚棋，卻在落地瞬間刻上別人的姓。'),
          player('為什麼沒有我的？'),
          fox('因為你總在成果完成後說「沒關係，大家一起的」。'),
          fox('謙虛沒有錯。可若只有你被抹掉，那不是謙虛，是系統已經學會怎麼使用你。')
        ],
        choices: [
          choice('claim', '說清楚我的角色與成果', '不搶功，只停止消失。', fox('一枚棋重新刻回你的名字。「看，盤面沒有因此裂開。」'), { scores: { visible: 3 }, behavior: { agency: 1 } }),
          choice('fear', '我怕看起來太愛邀功', '辨認你在保護誰的舒服。', fox('「你怕的不是難看，是別人不再能免費拿走你的好用。」'), { scores: { borrowed: 3 } })
        ]
      },
      {
        id: 'career.pressure', phase: '壓迫', layout: 'evidence', deep: true, kicker: '業之卷・雨局', title: '忙碌不是護身符。',
        art: art('assets/images/active/02_career/CAREER_03_rain_standing_pressure_v39.webp', 'assets/images/active/02_career/CAREER_03_rain_standing_pressure_mobile.webp', 'left', '56% 50%', '50% 24%', '雨中壓局'),
        beats: [
          narrator('屋頂裂開，冷雨落上棋盤。你每說一次「最近太忙」，就有一格盤面被水沖掉。'),
          fox('忙可以暫時保護你不做決定。可它也會把機會、談判與離開的準備一起泡爛。'),
          fox('{{period}}內，哪一個動作最能改變盤面？不是最大，是最能留下選擇權。')
        ],
        choices: [
          choice('ask', '約一次正式談判', '用成果、範圍與下一步說話。', fox('「把要求寫成能回答的句子，別只把委屈帶進去。」'), { scores: { visible: 3 } }),
          choice('portfolio', '整理可攜成果與履歷', '先替出口鋪路，不必立刻走。', fox('「很好。出口存在後，你的語氣會先變。」'), { scores: { move: 4 } }),
          choice('stop', '停止一項無名救火', '讓系統第一次感受到你的容量有邊界。', fox('「空出來的不是時間，是價格。」'), { scores: { borrowed: 2, move: 1 }, behavior: { change: 1 } }),
          choice('rest', '先把身體拉回可判斷狀態', '疲憊時的選擇容易只想逃。', fox('「可以。但替休息定結束日，別讓它變成新的等待。」'), { scores: { stuck: 1, move: 1 }, behavior: { restraint: 1 } })
        ]
      },
      {
        id: 'career.turn', phase: '反轉', layout: 'ritual', deep: true, kicker: '業之卷・將軍以前', title: '你不是盤上的棋。',
        art: art('assets/images/active/02_career/career_new_01.webp', 'assets/images/active/02_career/career_015.webp', 'right', '45% 50%', '50% 22%', '棋手反轉'),
        beats: [
          narrator('九尾抬起整張棋盤。盤底不是桌面，而是一雙雙手——每一雙都在等你替它完成最後一步。'),
          fox('你以為自己是被困住的棋。其實更多時候，你是那隻總會伸出去、讓所有棋局繼續運作的手。'),
          fox('不可取代聽起來像讚美。若它只讓你更難離開，那就是一只鍍金的籠。'),
          narrator('她把唯一的黑棋放進你掌心。上面終於刻出你的名字。')
        ],
        choices: [
          choice('keep', '握住黑棋', '先建立自己的籌碼與出口。', fox('「這一手不必宣布。真正的選擇權，通常先在暗處長。」'), { scores: { move: 3, visible: 1 }, behavior: { agency: 2 } }),
          choice('table', '把棋放回桌面中央', '要求交換，而不是默默承受。', fox('「讓所有人都看見它。接下來，誰想移動你，就先談價格。」'), { scores: { visible: 3 }, behavior: { challenge: 1 } }),
          choice('pocket', '先藏進袖裡', '尚未到攤牌時，但停止無準備。', fox('「忍住立刻證明自己。這次讓準備比情緒先到。」'), { scores: { move: 2 }, behavior: { restraint: 2 } })
        ]
      },
      {
        id: 'career.last-proof', phase: '判讀', layout: 'split', deep: true, kicker: '業之卷・最後一手', title: '若什麼都不變，代價是什麼？',
        art: art('assets/images/active/02_career/career_020_wide_v39.webp', 'assets/images/active/02_career/career_020.webp', 'left', '62% 50%', '50% 20%', '最後棋局'),
        beats: [
          narrator('她沒有催你落子，只把燈一盞盞吹熄。每熄一盞，棋盤上就少一條原本能走的路。'),
          fox('留下也可以。命館不崇拜離職。'),
          fox('但你要知道自己用什麼交換穩定，又準備在什麼徵兆出現時移動。沒有條件的留下，才叫被困。')
        ],
        choices: [
          choice('condition', '我能說出留下的條件', '報酬、權限、成長或時間必須有一項變真。', fox('「那就替條件定日期。模糊的承諾不算落子。」'), { scores: { visible: 2 }, behavior: { control: 1 } }),
          choice('exit-signal', '我能說出離開的訊號', '重複失信、健康惡化或機會成本到線。', fox('「界線一旦可辨認，恐懼就不再替你決定。」'), { scores: { move: 2 }, behavior: { agency: 1 } }),
          choice('none', '我只是一直撐', '承認目前沒有策略。', fox('「這句不好聽，卻能救你。從今天開始把撐拆成一個可結束的計畫。」'), { scores: { stuck: 3 }, behavior: { change: 1 } })
        ]
      },
      { id: 'career.result', type: 'result', phase: '判詞', kicker: '業之卷・九尾判讀', title: '棋局終於輪到你落子。', art: art('assets/images/active/02_career/career_new_02.webp', 'assets/images/active/02_career/career_016.webp', 'left', '63% 48%', '50% 20%', '業卷判讀') },
      {
        id: 'career.ritual', type: 'ritual', phase: '收卷', layout: 'ritual', kicker: '業之卷・署名', title: '黑棋只能落一次。',
        art: art('assets/images/active/02_career/career_008.webp', 'assets/images/active/02_career/career_017.webp', 'left', '58% 50%', '50% 21%', '玄棋署名'),
        beats: [fox('選的不是職涯終點，是你下一次不再消失的方式。')],
        choices: [
          choice('center', '把黑棋落在盤中央', '公開自己的角色與交換條件。', fox('「中央不是權力，是所有人都不能再假裝沒看見。」'), { flags: { careerRitual: 'center' } }),
          choice('pocket', '收進袖中，帶走', '先準備可攜成果與出口。', fox('「出口不必立刻用。它先替你把背挺直。」'), { flags: { careerRitual: 'pocket' } }),
          choice('remove', '拿走一枚不屬於你的棋', '停止一項長期無名救火。', fox('「盤面缺了一角，真正該負責的人才終於現形。」'), { flags: { careerRitual: 'remove' } })
        ]
      },
      { id: 'career.ending', type: 'ending', phase: '餘韻', kicker: '業之卷・封局', title: '這一局不再替你決定。', art: art('assets/images/active/07_shared/SHARED_close_gaze_v44.webp', 'assets/images/active/02_career/career_016.webp', 'left', '65% 48%', '50% 18%', '封局凝視') }
    ],
    results: {
      visible: { title: '可見槓桿', verdict: '你不是沒有價值；你的下一步是讓價值能被指認、交換與帶走。', lines: ['盤面已有能談判的成果，只差你停止把自己藏在「大家一起」後面。', '近期適合談角色、權限或報酬，但必須帶著紀錄而不是只帶感受。'], sign: '有人會再次把高難度任務交給你，或主動詢問你對下一步的看法。', action: '整理三項可量化成果，提出一次包含範圍、資源與日期的正式對話。', caution: '曝光不是邀功；只有空話的曝光才是。' },
      borrowed: { title: '成果被借名', verdict: '系統依賴你，卻尚未被迫承認依賴的價格。', lines: ['你做得越穩，別人越容易把你的貢獻當成背景。', '問題不是再更努力，而是讓範圍、署名與交換留下痕跡。'], sign: '你會再次被稱讚可靠，同時接到沒有新增資源的責任。', action: '下一次加工作時，先確認優先順序、擁有者與成果呈現方式，再承諾交付。', caution: '「只有你能做」若沒有交換，往往只是更好聽的佔用。' },
      stuck: { title: '鍍金困局', verdict: '穩定正在用你的疲憊支付，選擇權因為太忙而縮小。', lines: ['你未必該立刻離開，但不能再用忙碌拖延所有準備。', '現在最危險的不是失敗，而是半年後仍只能重複同一句「再撐一下」。'], sign: '同樣的救火會再次出現，且被當成理所當然。', action: '為每週固定保留一段不可被工作侵占的準備時間，先完成一項可攜成果。', caution: '疲憊時別做豪賭；也別讓疲憊替你永遠不賭。' },
      move: { title: '出口已亮', verdict: '你的命盤不是要你逃，而是提醒你已開始累積能移動的籌碼。', lines: ['機會不一定來自公開求職，也可能是合作、介紹或角色重組。', '先讓準備成熟，再決定留下談條件或真正轉身。'], sign: '近期會出現一個外部詢問、舊人脈回頭，或讓你重新估價自己的訊號。', action: '更新一份對外可用的作品／履歷，並和一位可信任的人確認市場位置。', caution: '別為了證明勇敢而倉促離開；有選擇才是這卷的重點。' }
    },
    ritualEndings: {
      center: '玄棋落在中央，名字朝上。下一次交換不再能繞過你本人。',
      pocket: '棋子在袖中發熱。你沒有立刻離開，卻第一次帶著出口回到原位。',
      remove: '盤面少了一枚替人救火的棋。真正的責任沿著空位，回到原本的手上。'
    }
  };

  const life = {
    id: 'life', label: '命之卷', door: '命之門', glyph: '命', relic: '照身鏡片',
    accent: '#64dec4', rgb: '100, 222, 196', audio: 'assets/audio/life.ogg', deepAudio: 'assets/audio/life_deep.ogg',
    teaser: '她不預言災厄，只找哪一部分的你一直被留在鏡外。',
    scoreKeys: ['restore', 'boundary', 'drain', 'transition'],
    scenes: [
      {
        id: 'life.threshold', phase: '照水', layout: 'ritual', kicker: '命之卷・水庭', title: '先看倒影，不看臉。',
        art: art('assets/images/active/03_life/LIFE_01_water_reflection_v39.webp', 'assets/images/active/03_life/life_019.webp', 'left', '54% 50%', '50% 22%', '水庭倒影'),
        beats: [
          narrator('月光落在水庭。九尾坐在水面中央，倒影卻比她多出一條尾巴。'),
          fox('{{name}}，你問運勢以前，我先問身體。最近醒來時，哪一種感覺最先到？'),
          fox('別回答「還好」。那兩個字在命館裡沒有影子。')
        ],
        choices: [
          choice('heavy', '累，像沒真正睡過', '恢復跟不上消耗。', fox('「疲憊若每天準時出現，就不是意志力問題。」'), { scores: { drain: 3 } }),
          choice('tight', '緊，還沒起床就在趕', '神經一直處於預備狀態。', fox('「你的身體比行程更早知道：界線不夠。」'), { scores: { boundary: 3 } }),
          choice('empty', '空，不知道今天為何開始', '方向與意義正在轉換。', fox('「空不是壞兆。它有時是舊生活裝不回去了。」'), { scores: { transition: 3 } }),
          choice('okay', '其實平穩，只想知道趨勢', '基礎尚穩，適合微調。', fox('「能說平穩而不心虛，這卷會比你想的溫柔。」'), { scores: { restore: 3 } })
        ]
      },
      {
        id: 'life.shadow', phase: '照影', layout: 'observation', kicker: '命之卷・紙門', title: '影子慢了半拍。',
        art: art('assets/images/active/03_life/LIFE_02_paperdoor_shadow_v39.webp', 'assets/images/active/03_life/life_016.webp', 'left', '54% 50%', '50% 22%', '紙門遲影'),
        beats: [
          narrator('你走過紙門，影子卻停在門後。它抬手的時間，比你慢了整整一個呼吸。'),
          fox('它不是鬼。是你每次說「先把事情做完」時，被留在原地的那一部分。'),
          fox('最近哪一件事最常讓你把自己往後排？')
        ],
        choices: [
          choice('others', '別人的情緒與需求', '總先穩住別人，再處理自己。', fox('「照顧沒有錯。沒有結束時間的照顧，才會吃掉你。」'), { scores: { boundary: 3 }, behavior: { hold: 1 } }),
          choice('work', '工作與責任', '停下來就有罪惡感。', fox('「你的休息正在接受工作審批。」'), { scores: { drain: 3 } }),
          choice('uncertainty', '未確定的未來', '腦中一直模擬最壞情況。', fox('「預演災難能讓你忙，卻不一定讓你安全。」'), { scores: { transition: 2, drain: 1 } }),
          choice('habit', '只是習慣這樣活', '模式久到看不見起點。', fox('「習慣是最安靜的咒。幸好它也最怕被叫出名字。」'), { scores: { boundary: 1, transition: 2 } })
        ]
      },
      {
        id: 'life.room', phase: '入室', layout: 'whisper', kicker: '命之卷・潮氣', title: '她讓你坐下，卻不准你休息。',
        art: art('assets/images/active/03_life/LIFE_wet_corridor_v44.webp', 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp', 'left', '61% 50%', '50% 21%', '潮濕長廊'),
        beats: [
          narrator('長廊像剛洗過。她背對你鬆開濕髮，衣料沿肩滑下，卻沒有回頭確認你在看哪裡。'),
          fox('你以為休息是什麼都不做。可真正的休息，是身體不用一邊躺著、一邊監視所有會出事的東西。'),
          fox('若現在給你半天沒有義務的時間，你會怎麼用？')
        ],
        choices: [
          choice('sleep', '先睡到自然醒', '身體債務已經很明顯。', fox('「那就別再把睡眠當成做完所有事後才配拿的獎勵。」'), { scores: { restore: 3, drain: 1 } }),
          choice('alone', '想一個人，不回訊息', '需要的是邊界與安靜。', fox('「你要的不是消失，是暫時不用被任何人取用。」'), { scores: { boundary: 3 } }),
          choice('go-out', '想離開熟悉環境', '轉場有助於看見新的方向。', fox('「換景不等於逃。看你回來後，是否願意改一件事。」'), { scores: { transition: 3 } }),
          choice('dont-know', '我甚至不知道想做什麼', '過度消耗會讓欲望先失聲。', fox('「那就先恢復感覺，不急著恢復效率。」'), { scores: { drain: 3 } })
        ]
      },
      {
        id: 'life.mirror', phase: '異象', layout: 'observation', kicker: '命之卷・碎鏡', title: '鏡子碎了，臉卻完整。',
        art: art('assets/images/active/03_life/LIFE_broken_mirror_v44.webp', 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp', 'right', '42% 50%', '50% 26%', '碎鏡室'),
        beats: [
          narrator('地板散滿鏡片。每一片都照出同一張平靜的臉，只有最小的一片正在哭。'),
          fox('你沒有壞掉。你只是把每種不方便的感覺，分別藏進不同角落。'),
          fox('挑一片。哪一句最近最像你沒說出口的話？')
        ],
        choices: [
          choice('enough', '我真的已經夠累了', '停止和疲憊辯論。', fox('鏡片的霧退了一層。「承認不是投降，是停止浪費力氣假裝。」'), { scores: { drain: 3, restore: 1 } }),
          choice('no', '我其實不想再答應', '界線比善解人意更晚出聲。', fox('「不想，是資訊。你不必先證明對方有罪。」'), { scores: { boundary: 4 } }),
          choice('different', '我想換一種活法', '舊秩序已經不再合身。', fox('「先換一個固定動作。命運不需要一次換完。」'), { scores: { transition: 4 } }),
          choice('fine', '我怕只是自己太脆弱', '把需求誤認成缺陷。', fox('「脆弱若能每天準時發作，多半是在替現實報時。」'), { scores: { drain: 2, boundary: 1 } })
        ]
      },
      {
        id: 'life.double', phase: '鏡妖', layout: 'whisper', kicker: '命之卷・第二張臉', title: '倒影開始替你回答。',
        art: art('assets/images/active/03_life/LIFE_03_mirror_double_face_v39.webp', 'assets/images/active/03_life/LIFE_03_mirror_double_face_mobile.webp', 'left', '57% 50%', '50% 22%', '鏡中雙身'),
        beats: [
          narrator('九尾身後的鏡中，多出一個和你一樣的人。每當你想說不，它便微笑著替你答應。'),
          player('它是什麼？'),
          fox('是那個相信「只要我夠好用，就不會被丟下」的你。'),
          fox('它很勤勞，也很可憐。更麻煩的是——身邊的人早已學會先問它。')
        ],
        choices: [
          choice('face', '讓倒影看著我', '承認它曾經保護你。', fox('「別恨它。謝完以後，告訴它現在可以下班了。」'), { scores: { restore: 2, boundary: 1 }, behavior: { trust: 1 } }),
          choice('turn', '把鏡子轉過去', '先停止自動答應。', fox('「很好。不是所有問題都需要立刻給答案。」'), { scores: { boundary: 3 }, behavior: { restraint: 2 } })
        ]
      },
      {
        id: 'life.cost', phase: '恐兆', layout: 'evidence', deep: true, kicker: '命之卷・身體記帳', title: '代價已經開始收。',
        art: art('assets/images/active/03_life/life_003.webp', 'assets/images/active/03_life/life_020.webp', 'left', '59% 50%', '50% 22%', '身體命燈'),
        beats: [
          narrator('鏡片依序亮起：睡眠、食慾、肩頸、耐心。每一盞都比上一盞更暗。'),
          fox('這不是醫療診斷。若有持續不適，你需要真正的專業協助，不是狐火。'),
          fox('但命盤能提醒你：身體已經在替一段失衡的生活付錢。你最常忽略哪個訊號？')
        ],
        choices: [
          choice('sleep-signal', '睡眠變差', '入睡、夜醒或醒來仍累。', fox('「先把它當成警報，不是個性。」'), { scores: { drain: 3 } }),
          choice('mood-signal', '情緒變薄，一點事就耗盡', '可用能量已經太少。', fox('「你不是突然難相處，是沒有餘裕再替所有事緩衝。」'), { scores: { restore: 1, drain: 2 } }),
          choice('body-signal', '身體反覆緊繃或不舒服', '需要休息，也可能需要就醫。', fox('「別用占卜替代檢查。真正照顧自己，有時非常不神秘。」'), { scores: { restore: 3 } }),
          choice('numb', '我已經沒什麼感覺', '麻木本身也是訊號。', fox('「沒有感覺，不等於沒有代價。」'), { scores: { transition: 1, drain: 3 } })
        ]
      },
      {
        id: 'life.turn', phase: '反轉', layout: 'ritual', deep: true, kicker: '命之卷・鏡外人', title: '被留下的不是影子。',
        art: art('assets/images/active/03_life/life_mirror_double_face.webp', 'assets/images/active/03_life/life_mirror_mismatch.webp', 'left-top', '50% 46%', '50% 24%', '鏡外反轉'),
        beats: [
          narrator('九尾把碎鏡拼回去。鏡中出現完整的你；站在鏡外的身體反而開始透明。'),
          fox('你一直以為真正的自己被困在裡面。錯了。'),
          fox('鏡裡那個會笑、會答應、會把一切撐住的人，才是你做給世界看的替身。'),
          fox('真正的你，已經在鏡外等很久了。')
        ],
        choices: [
          choice('touch', '把手貼上鏡外的自己', '先把感覺接回來。', fox('透明的指尖慢慢有了溫度。「回來不必一次完成。」'), { scores: { restore: 3 }, behavior: { trust: 1 } }),
          choice('break', '打碎替身那一面', '停止自動扮演永遠能撐的人。', fox('「碎得很好看。但明天要用一個真實的『不』接住它。」'), { scores: { boundary: 3, transition: 1 }, behavior: { change: 1 } }),
          choice('ask-time', '問自己需要多久', '把期限從別人的耐心拿回來。', fox('「答案不是快一點。是你願意每天還一小部分回去。」'), { scores: { restore: 2, transition: 1 }, behavior: { agency: 1 } })
        ]
      },
      {
        id: 'life.last-proof', phase: '判讀', layout: 'split', deep: true, kicker: '命之卷・今夜以後', title: '先改哪一個固定動作？',
        art: art('assets/images/active/03_life/life_new_01.webp', 'assets/images/active/03_life/life_019.webp', 'right-top', '60% 18%', '50% 18%', '命卷回身'),
        beats: [
          narrator('她把四片鏡放在你面前：睡、拒絕、求助、離開。每片都只亮一角。'),
          fox('不要發誓從此好好愛自己。那句太大，明天就會碎。'),
          fox('挑一個在{{period}}內能被看見、能被完成、也能被你保護的動作。')
        ],
        choices: [
          choice('sleep', '固定一段真正睡眠', '不是補償，是底線。', fox('「先讓身體相信夜晚不必值班。」'), { scores: { restore: 3 } }),
          choice('delay', '所有額外請求延後回答', '把自動答應改成主動選擇。', fox('「一句『我明天回覆』，能救回很多被偷走的命。」'), { scores: { boundary: 3 } }),
          choice('support', '找一個真實的人求助', '朋友、家人或專業支持。', fox('「讓別人做一小段，世界不會因此倒下。」'), { scores: { restore: 2 }, behavior: { trust: 1 } }),
          choice('change-step', '完成一次轉換準備', '報名、預約、整理或提出。', fox('「不必先知道整條路。下一塊石板夠了。」'), { scores: { transition: 3 } })
        ]
      },
      { id: 'life.result', type: 'result', phase: '判詞', kicker: '命之卷・九尾判讀', title: '鏡子把你放回來了。', art: art('assets/images/active/03_life/life_014.webp', 'assets/images/active/03_life/life_019.webp', 'left', '62% 50%', '50% 22%', '命卷判讀') },
      {
        id: 'life.ritual', type: 'ritual', phase: '收卷', layout: 'ritual', kicker: '命之卷・照身', title: '碎片不能照全身。',
        art: art('assets/images/active/03_life/LIFE_broken_mirror_v44.webp', 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp', 'right', '42% 50%', '50% 26%', '照身碎片'),
        beats: [fox('所以只選一小塊帶走。今晚不要求完整，只要求真。')],
        choices: [
          choice('moon', '讓碎片照一次月光', '提醒自己：恢復不是偷懶。', fox('「月光不催花開。它只讓你知道夜還在走。」'), { flags: { lifeRitual: 'moon' } }),
          choice('turn-down', '把鏡面朝下收進袖中', '停止隨時檢查自己夠不夠好。', fox('「有些夜晚，不照也不會消失。」'), { flags: { lifeRitual: 'turn-down' } }),
          choice('door', '把碎片留在門縫', '讓下一個「不」替你守門。', fox('「門不需要生氣，才能保持關閉。」'), { flags: { lifeRitual: 'door' } })
        ]
      },
      { id: 'life.ending', type: 'ending', phase: '餘韻', kicker: '命之卷・鏡息', title: '影子終於和你同時回身。', art: art('assets/images/active/07_shared/ENDING_moon_recline_v44.webp', 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp', 'left', '64% 50%', '50% 23%', '鏡息餘韻') }
    ],
    results: {
      restore: { title: '回身復位', verdict: '你的底盤仍穩，近期最重要的是主動恢復，而不是等撐不住才停。', lines: ['這不是大凶，是身體與注意力正在要求被放回優先序。', '小幅但固定的恢復會比一次性逃離更有效。'], sign: '睡眠或情緒在規律休息後明顯改善，判斷力也會回來。', action: '連續七天保護一段固定睡眠或無輸入時間，不拿它交換臨時需求。', caution: '休息若仍在處理訊息，只是換姿勢工作。' },
      boundary: { title: '界線失血', verdict: '消耗的核心不是事情太多，而是太多事情能直接穿過你的門。', lines: ['你把立即回應當成善良，把沒有容量仍答應當成可靠。', '近期運勢改善的關鍵，是延後回答與允許別人失望。'], sign: '當你第一次沒有立刻接住，某些關係會短暫不舒服，真正重要的關係則會調整。', action: '所有額外請求先回「我確認後答覆」，至少留十分鐘再決定。', caution: '界線不是懲罰；不必等對方做錯才有資格說不。' },
      drain: { title: '命燈透支', verdict: '你的身體已經在替長期失衡記帳，現在不適合再靠意志力加碼。', lines: ['持續疲憊、麻木或易怒不是性格缺陷。', '若不適持續或加劇，請把專業醫療／心理協助放在占卜之前。'], sign: '同樣的壓力源會很快再出現，讓你看見哪一段消耗最固定。', action: '取消或延後一項非必要負擔，並安排真實休息；需要時預約專業協助。', caution: '命館不能診斷，也不能替代治療。' },
      transition: { title: '舊殼將退', verdict: '空與不確定不是失敗，而是原本的生活方式已經裝不下你。', lines: ['你正在過渡期，過早逼自己給完整答案只會再套回舊殼。', '先做一個可逆的小實驗，讓身體與現實一起提供資訊。'], sign: '你會反覆被某個新方向、場域或生活節奏吸引。', action: '在{{period}}內完成一次低風險試走：詢問、體驗、短期安排或小型改變。', caution: '轉換不是把所有東西丟掉；先保留能帶你過河的部分。' }
    },
    ritualEndings: {
      moon: '鏡片接住一點月光。它沒有照出未來，只照出一張終於不必證明的臉。',
      'turn-down': '鏡面朝下躺在袖中。今夜剩下的路，不再需要你隨時檢查自己。',
      door: '碎片卡進門縫。門外的需求仍在，卻第一次不能直接走進你的身體。'
    }
  };

  const forbidden = {
    id: 'forbidden', label: '禁之卷', door: '禁之門', glyph: '禁', relic: '無主狐面',
    accent: '#b987ff', rgb: '185, 135, 255', audio: 'assets/audio/forbidden.ogg', deepAudio: 'assets/audio/forbidden_deep.ogg',
    teaser: '她不問吉凶，只認那個在不同關係裡反覆出現的動作。',
    scoreKeys: ['repeat', 'control', 'avoid', 'break'],
    scenes: [
      {
        id: 'forbidden.threshold', phase: '禁門', layout: 'ritual', kicker: '禁之卷・無名符', title: '這一卷不問對象。',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_01_talisman_wall_fullbody_v39.webp', 'assets/images/active/04_forbidden/forbidden_018.webp', 'left', '56% 50%', '50% 20%', '禁門符牆'),
        beats: [
          narrator('符牆上沒有姓名，只有重複的句子。九尾站在中央，尾尖逐一抹去主詞。'),
          fox('愛情、工作、家人、朋友——若同一個痛在不同地方長出來，問題通常不只在別人。'),
          fox('{{name}}，這卷會比較近。你隨時可以停，但別一邊進來、一邊假裝沒有選。')
        ],
        choices: [
          choice('enter', '親手推開禁門', '知道可以停，也知道此刻是自己選的。', fox('門在你掌下發出像呼吸的聲音。「記住，是你推的。」'), { behavior: { agency: 1, approach: 1 } }),
          choice('rule', '先問停下的方法', '任何誘惑都必須保留退出權。', fox('她指向你身後。「說『到這裡』。我會停。能問這句，很好。」'), { behavior: { control: 2, challenge: 1 } })
        ]
      },
      {
        id: 'forbidden.pattern', phase: '認痕', layout: 'split', kicker: '禁之卷・第一道重複', title: '哪一幕總會再出現？',
        art: art('assets/images/active/04_forbidden/forbidden_005.webp', 'assets/images/active/04_forbidden/forbidden_016.webp', 'left', '59% 50%', '50% 21%', '禁門長街'),
        beats: [
          narrator('四扇小門同時打開，裡面站著不同的人，卻用同一種方式背對你。'),
          fox('別找最壞的人。找你每次都會走到的那一幕。')
        ],
        choices: [
          choice('chase', '對方一遠，我就更用力靠近', '用投入換安全感。', fox('「你追的有時不是人，是距離縮短那一瞬間的止痛。」'), { scores: { repeat: 3 } }),
          choice('test', '我會試探，看對方會不會追', '用不說清楚換控制感。', fox('「試探能證明對方怕不怕失去，不能證明對方懂不懂你。」'), { scores: { control: 3 } }),
          choice('leave', '一靠太近，我就想消失', '先退出以避免被看穿。', fox('「你不是不想要，是怕需要一旦被看見，就能被傷。」'), { scores: { avoid: 3 } }),
          choice('endure', '我忍到極限才一次翻桌', '界線太晚出現，只剩爆炸。', fox('「你把每個小小的『不』存成最後一刀。」'), { scores: { break: 3 } })
        ]
      },
      {
        id: 'forbidden.wrist', phase: '束腕', layout: 'ritual', kicker: '禁之卷・狐索', title: '她先綁住你的手，沒有綁緊。',
        art: art(v49('forbidden_red_thread'), 'assets/images/active/04_forbidden/FORBIDDEN_02_player_wrist_bound_mobile.webp', 'left-top', '55% 28%', '50% 27%', '狐索束腕', 'bottom', { heroPresence: 'large' }),
        beats: [
          narrator('紅線繞過手腕，鬆得足以抽出。九尾卻故意把繩結放在你看得到的地方。'),
          fox('真正的困住，往往不是不能走。是你想先等一個更漂亮、更不內疚、更能被所有人理解的離開理由。'),
          fox('現在你要怎麼做？')
        ],
        choices: [
          choice('pull-free', '直接抽手', '不等她批准。', fox('線落地。「很好。能走的人，才有資格談留下。」'), { scores: { break: 2 }, behavior: { agency: 2 } }),
          choice('ask', '看著她說：鬆開', '練習直接提出界線。', fox('她立刻解開。「你看，清楚並不會讓世界立刻報復你。」'), { scores: { control: 1, break: 1 }, behavior: { challenge: 1 } }),
          choice('wait', '不動，先看她想做什麼', '把風險交給觀察。', fox('她沒有收緊，只低聲問：「你是不是總要確定別人有多壞，才准自己走？」'), { scores: { repeat: 2, avoid: 1 }, behavior: { wait: 1 } })
        ]
      },
      {
        id: 'forbidden.bait', phase: '誘惑', layout: 'whisper', kicker: '禁之卷・近火', title: '她知道你最容易在哪裡鬆口。',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_soft_bait_v44.webp', 'assets/images/active/04_forbidden/forbidden_009.webp', 'right', '43% 48%', '50% 20%', '禁火近影'),
        beats: [
          narrator('九尾靠近，眼神柔下來。她沒有碰你，濕亮的肌膚與慢下來的呼吸卻像一個被精準設計的承諾。'),
          fox('看著我。想靠近沒有錯。被身體說服也沒有錯。'),
          fox('錯的是把強烈感覺當成可靠證據，然後怪自己為什麼又走進同一扇門。'),
          fox('你最容易被哪一種感覺留下？')
        ],
        choices: [
          choice('desired', '被強烈渴望', '強度讓你暫時不懷疑自己。', fox('「被要得很急，和被放得很穩，是兩種命。」'), { scores: { repeat: 2 } }),
          choice('needed', '被需要、被依賴', '有用讓你覺得不會被丟下。', fox('「若愛只在你供應時存在，它愛的可能是功能。」'), { scores: { control: 1, repeat: 2 } }),
          choice('mystery', '若即若離的神秘感', '不確定讓注意力被綁住。', fox('「你把焦慮誤認成化學反應的時候，最危險也最迷人。」'), { scores: { avoid: 1, repeat: 2 } }),
          choice('rescue', '對方只有我能理解', '拯救感掩蓋了交換不平衡。', fox('「理解不是責任。尤其不是無限責任。」'), { scores: { break: 1, repeat: 2 } })
        ]
      },
      {
        id: 'forbidden.mask', phase: '異象', layout: 'observation', kicker: '禁之卷・狐面', title: '面具後沒有第二張臉。',
        art: art(v49('forbidden_fox_mask'), 'assets/images/active/04_forbidden/forbidden_014.webp', 'right-top', '54% 27%', '50% 20%', '狐面揭露', 'bottom', { heroPresence: 'large' }),
        beats: [
          narrator('她把狐面貼在臉側。面具裡傳出的不是陌生聲音，而是你曾經說過的每一句「沒關係」。'),
          player('它怎麼會知道？'),
          fox('因為每一次不舒服，你都先替別人找理由。久了，理由長出一張比你更會說話的臉。'),
          fox('聽。它正在挑一句你最常用的。')
        ],
        choices: [
          choice('busy', '對方只是忙，不是故意的', '替反覆缺席先解釋。', fox('面具笑了。「原因可以解釋行為，不能替代改變。」'), { scores: { repeat: 3 } }),
          choice('sensitive', '可能是我太敏感', '先懷疑自己的感受。', fox('「敏感不是判決。它是資訊，值得被查證。」'), { scores: { avoid: 2, control: 1 } }),
          choice('last', '再給最後一次', '最後一次反覆延長。', fox('「沒有條件與日期的最後一次，只是下一次的別名。」'), { scores: { repeat: 2, break: 1 } }),
          choice('handle', '我自己能處理', '拒絕讓需求被看見。', fox('「能處理，不代表只能由你處理。」'), { scores: { avoid: 3 } })
        ]
      },
      {
        id: 'forbidden.mirror', phase: '貼身', layout: 'whisper', deep: true, kicker: '禁之卷・第二張狐面', title: '她讓你看見自己也會誘惑。',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_mirror_gaze_v44.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'left', '65% 48%', '50% 19%', '鏡火凝視'),
        beats: [
          narrator('鏡中不只九尾。你看見自己也曾沉默、消失、故作不在意，只為逼對方先暴露。'),
          fox('別急著把自己判成壞人。控制通常是害怕失去後，長出來的假盔甲。'),
          fox('但害怕能解釋，不代表別人必須一直被你考。'),
          narrator('她的指尖擦過鏡面，倒影裡的你終於抬眼。')
        ],
        choices: [
          choice('admit', '承認我也會試探', '停止只在對方身上找模式。', fox('「承認不是自責，是終於有一半的局面能由你改。」'), { scores: { control: 3, break: 1 }, behavior: { agency: 1 } }),
          choice('difference', '我只是在保護自己', '看保護何時變成懲罰。', fox('「保護自己會說界線；懲罰別人會讓對方猜。」'), { scores: { control: 2, avoid: 1 } })
        ]
      },
      {
        id: 'forbidden.threat', phase: '恐兆', layout: 'evidence', deep: true, kicker: '禁之卷・重演廊', title: '門後站著四個不同的人。',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_03_neck_shadow_threat_v39.webp', 'assets/images/active/04_forbidden/forbidden_018.webp', 'right-top', '58% 18%', '50% 18%', '重演廊'),
        beats: [
          narrator('四個人依序轉身：一個冷淡、一個依賴、一個失約、一個總在你要走時變得溫柔。'),
          fox('那些人不是同一個人。你也不是每次都無辜。'),
          fox('真正重複的，是哪一個時刻你明明看見了，卻決定先不要相信自己的眼睛？')
        ],
        choices: [
          choice('first-miss', '第一次失約後沒有修復', '事件發生，責任卻被略過。', fox('「錯一次不是模式。沒有修復，才讓下一次有路。」'), { scores: { repeat: 3 } }),
          choice('boundary-joke', '我的界線被當成玩笑', '需求被聽見卻未被尊重。', fox('「一個人可以不理解；不能在你說明後仍把它踩成樂趣。」'), { scores: { break: 3 } }),
          choice('only-when-leave', '只有我要走時才改變', '危機換來短期靠近。', fox('「那不是穩定改變，是關係的止血反射。」'), { scores: { repeat: 2, control: 1 } }),
          choice('my-silence', '我從未把真實需求說清楚', '承認對方可能一直在猜。', fox('「很好。這一卷終於不是審判，是責任回到兩邊。」'), { scores: { avoid: 2, break: 1 }, behavior: { agency: 1 } })
        ]
      },
      {
        id: 'forbidden.turn', phase: '反轉', layout: 'ritual', deep: true, kicker: '禁之卷・面具認主', title: '狐面不是她的。',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_dark_gaze_v44.webp', 'assets/images/active/04_forbidden/forbidden_013.webp', 'right-top', '40% 18%', '50% 18%', '面具認主'),
        beats: [
          narrator('狐面從九尾手中滑落，卻沒有掉地。它沿紅線停在你面前，內側刻著你的字跡。'),
          fox('它不是要證明你才是問題。'),
          fox('它只是在提醒：只要你每次都用同一種方式求安全，不同的人也能被你帶進相似的結局。'),
          narrator('她終於站遠了一點。沒有誘惑，也沒有恐嚇；只剩你的手要不要伸出去。')
        ],
        choices: [
          choice('hold-mask', '接住面具', '承認模式屬於自己可改的部分。', fox('「拿穩。屬於你的，才有可能由你放下。」'), { scores: { break: 3 }, behavior: { agency: 2, change: 1 } }),
          choice('leave-mask', '讓它懸在原地', '尚未準備承擔全部，但不再否認。', fox('「可以。看見而不立刻表演改變，也比新的誓言誠實。」'), { scores: { avoid: 1, break: 1 }, behavior: { restraint: 1 } }),
          choice('ask-fox', '問她為何也戴過', '把她從審判者拉回角色。', [narrator('她沉默得比任何判詞都久。'), fox('「因為懂得誘惑的人，多半先學會了怎麼害怕被留下。」')], { behavior: { trust: 2, challenge: 1 } })
        ]
      },
      {
        id: 'forbidden.last-proof', phase: '判讀', layout: 'split', deep: true, kicker: '禁之卷・停止重演', title: '下一次，要在哪裡換動作？',
        art: art('assets/images/active/04_forbidden/FORBIDDEN_seated_bait_v44.webp', 'assets/images/active/04_forbidden/forbidden_023.webp', 'left', '64% 48%', '50% 18%', '禁卷最後一問'),
        beats: [
          narrator('九尾斜坐在燈影裡，這次沒有收起美貌，也沒有拿它當答案。'),
          fox('慾望可以留下。喜歡危險也不是罪。'),
          fox('你只需要在最熟悉的那個瞬間，做一個和以前不同的動作。哪一個？')
        ],
        choices: [
          choice('say', '直接說需求，不再試探', '把猜測改成可回答的句子。', fox('「答案可能不好聽，但至少不再由恐懼代寫。」'), { scores: { control: 1, break: 3 } }),
          choice('pause', '強烈時先等一晚', '讓身體退潮後再判斷可靠。', fox('「熱可以是真的。可靠要等到熱退後還在。」'), { scores: { repeat: 1, break: 2 }, behavior: { restraint: 1 } }),
          choice('leave-early', '第一個界線被踩時就處理', '不把小小的不留到最後一刀。', fox('「先說、再看修復；不是等到恨夠了才走。」'), { scores: { break: 3 } }),
          choice('stay', '靠近時不再突然消失', '用誠實替代退避。', fox('「可以害怕，仍然說你需要慢一點。那不叫弱。」'), { scores: { avoid: 3, break: 1 }, behavior: { trust: 1 } })
        ]
      },
      { id: 'forbidden.result', type: 'result', phase: '判詞', kicker: '禁之卷・九尾判讀', title: '面具終於肯認主。', art: art('assets/images/active/04_forbidden/FORBIDDEN_mirror_gaze_v44.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'left', '65% 48%', '50% 18%', '禁卷判讀') },
      {
        id: 'forbidden.ritual', type: 'ritual', phase: '收卷', layout: 'ritual', kicker: '禁之卷・卸面', title: '別把面具交給下一個人。',
        art: art('assets/images/active/04_forbidden/forbidden_007.webp', 'assets/images/active/04_forbidden/forbidden_014.webp', 'right-bottom', '50% 50%', '50% 20%', '卸下面具'),
        beats: [fox('你可以保留慾望、神秘與危險感。只把那個讓你失去選擇的動作留下。')],
        choices: [
          choice('name', '在面具內側寫下模式', '替重複取名，下一次才認得。', fox('「被叫出名字的咒，力量會先少一半。」'), { flags: { forbiddenRitual: 'name' } }),
          choice('remove', '摘下，但不交給任何人', '責任留在自己，罪名不丟給別人。', fox('「這才是卸面。不是換一張更無辜的臉。」'), { flags: { forbiddenRitual: 'remove' } }),
          choice('burn-edge', '只燒掉面具的一角', '保留慾望，切斷舊反應。', fox('「不必把自己燒乾淨。只要讓舊動作再也戴不穩。」'), { flags: { forbiddenRitual: 'burn-edge' } })
        ]
      },
      { id: 'forbidden.ending', type: 'ending', phase: '餘韻', kicker: '禁之卷・門後無人', title: '這次沒有誰替你背罪。', art: art('assets/images/active/04_forbidden/FORBIDDEN_mirror_gaze_v44.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'left', '65% 48%', '50% 18%', '門後餘火') }
    ],
    results: {
      repeat: { title: '強度成癮', verdict: '你容易把不確定帶來的強烈感，誤認成關係特別深。', lines: ['距離一拉開，注意力就被綁住；對方一靠近，警報暫停，像終於得到答案。', '真正要看的不是高峰，而是平靜時是否仍有尊重、修復與穩定。'], sign: '下一次強烈靠近很可能發生在你準備退開之後。', action: '遇到強烈回流時延後一晚決定，只記對方是否提出具體修復與持續行動。', caution: '心跳很真；它不能單獨證明安全。' },
      control: { title: '試探之面', verdict: '你用不說、退開或考驗換安全，卻讓關係只能靠猜。', lines: ['試探能短暫確認對方會不會追，不能建立長期可依靠的理解。', '你可以保留謹慎，但要讓界線與需求變成明話。'], sign: '你會再次想用冷淡或消失確認對方在不在乎。', action: '把試探改寫成一句可回答的需求；說完允許對方自由回答。', caution: '控制能減少意外，也會減少真正的相遇。' },
      avoid: { title: '近身退避', verdict: '你不是不需要關係；你害怕需要一旦被看見，就能被拒絕或利用。', lines: ['因此你常在最接近時撤退，留下對方與自己一起猜。', '近期的改變不是逼自己留下，而是在退前先說明真實狀態。'], sign: '一段關係或合作會在變得更具體時讓你突然想抽離。', action: '想消失時先留一句真話：「我需要慢一點，但不是不在乎。」', caution: '慢是界線；失聯是讓別人替你承受恐懼。' },
      break: { title: '斷咒之手', verdict: '你已能看見重複發生在哪個瞬間，近期有機會真正換一次動作。', lines: ['改變不靠更狠的誓言，而靠在舊反應出現時做一個較小、較早、較清楚的選擇。', '這一次不需要等到痛夠深，才證明離開或設限合理。'], sign: '熟悉的模式會再出現一次，像故意測試你是否認得。', action: '預先寫下那一刻的新動作：說清楚、延後、求助或離開；出現時照做一次。', caution: '不要把看懂模式變成新的自責。責任是可改，不是全錯。' }
    },
    ritualEndings: {
      name: '你在狐面內側寫下那個重複。下次它再出現，不必等到結局才認得。',
      remove: '面具留在你手裡，沒有被交給任何一個舊人。責任留下，罪名卻散了。',
      'burn-edge': '狐火只咬掉面具一角。慾望仍在，舊反應卻再也無法完整遮住你的眼睛。'
    }
  };

  const periodFrames = {
    week: {
      label: '七日問期', timing: '第 2—6 天最容易出現徵兆',
      rule: '只看一次立即反應與一個能被確認的動作；七天之外不在本牒內。'
    },
    month: {
      label: '一月問期', timing: '第二週前後會出現一次轉折',
      rule: '只看一輪靠近、交換、耗損或修復；一個月之外仍保持封印。'
    },
    season: {
      label: '三月問期', timing: '前四週先顯影，第二至第三月才定形',
      rule: '只看一個完整循環是否改變；三個月之外不替你假裝確定。'
    }
  };

  const routeSystems = {
    love: {
      method: '緣脈繫線', instrument: '未結紅線', question: '誰靠近、誰續上、誰只在你要離開時拉緊。',
      ritualNames: { unknotted: '未結腕線', 'mirror-cut': '鏡前斷餘', 'door-knot': '門環留線' },
      branchLines: {
        mutual: '你前面留下的不是幻想：至少有一個具體動作由另一端完成。下一步要驗證的，是它能不能持續。',
        reclaim: '每次你退開，另一端才發熱。今晚這不是浪漫線索，而是一種回收距離的節奏。',
        projection: '你記得的細節沒有錯；命線警告的是，你很容易替細節補上對方沒承諾的結局。',
        alone: '線一直很漂亮，因為你沒有讓它掉下去。可真正的兩人關係，不該只靠一隻手維持形狀。'
      },
      futures: {
        mutual: { week: '一次具體邀約、補上時間或主動延續會出現；重點是對方是否自行把安排完成。', month: '關係有機會從曖昧進到一次可命名的安排；若仍只談感受不談位置，熱度會停在原地。', season: '能否穩定，不看告白濃度，而看三個月內是否形成雙方都主動的固定節奏。' },
        reclaim: { week: '你一降低主動，對方可能很快回來確認你是否還在；先別把回頭當成前進。', month: '一次熟悉的拉近—停住會重演；若沒有日期、安排或承擔，答案仍是回收距離。', season: '關係若不改節奏，三個月內會在相同位置再繞一圈；真正轉機只來自你停止替每次回流加上新意義。' },
        projection: { week: '訊息、眼神或一句貼心話會再次讓你想補完整個故事；只記實際行動，答案會變得很快。', month: '細節仍會有溫度，但一個月內是否出現可驗證安排，才決定它是關係還是片段。', season: '想像若被停止餵養，三個月內會留下真正願意走近的人；其餘的美好不必被否定，只需回到它原本的大小。' },
        alone: { week: '停止主動後，空白會比平常更安靜；這份安靜本身就是本次問期的重要答案。', month: '你會遇到一次想替沉默重新開門的衝動；若忍住，關係是否有另一雙腳印會很清楚。', season: '三個月內若仍只有你維持節奏，這條線不會自己變成命定；改變會先表現在你把時間還給自己。' }
      }
    },
    career: {
      method: '玄棋署名', instrument: '署名玄棋', question: '成果落在哪一格、最後刻誰的名字、交換是否留下籌碼。',
      ritualNames: { center: '玄棋居中', pocket: '袖中藏棋', remove: '撤去無名棋' },
      branchLines: {
        visible: '你的盤面不是沒有位置，而是需要把「大家都知道」換成能被引用、複述與談判的證據。',
        borrowed: '棋不是被吃掉，是落地時被換了名字。若你不在成果完成前署名，完成後再解釋會更難。',
        stuck: '你不是不夠努力；你忙到所有動作都只能維持今天，沒有一手替明天留下選擇。',
        move: '你已經在移動，只是還不必急著宣布。命盤要看的是準備是否長到足以保護你。'
      },
      futures: {
        visible: { week: '一次報告、回顧或臨時救場會成為署名機會；先說清你的角色，再交付成果。', month: '你會遇到可談資源、範圍或職責的窗口；若只接受讚美，盤面不會真正移位。', season: '三個月內可見度能轉成職責或報酬，但前提是持續留下數字、作品與決策紀錄。' },
        borrowed: { week: '有人會再次用「團隊」概括你做的核心部分；用一句中性事實把名字放回去。', month: '一次成果歸屬會決定後續資源落點；不要等到評價結束後才補充自己的部分。', season: '若署名仍被借走，三個月內工作量會增、議價權不會同步；轉折在你讓貢獻變成可攜證據。' },
        stuck: { week: '新的急件會來測試你是否又把自己的準備往後移；先保住一段不可挪用的時間。', month: '忙碌會出現一次短暫空隙；若沒有預先決定要用它完成什麼，空隙仍會被雜務吞回去。', season: '三個月內不宜只靠忍耐等環境變好；先完成一件能離開原位置仍成立的成果，盤面才會鬆。' },
        move: { week: '一個資訊、邀請或作品回應會讓路變具體；先確認條件，不急著公開。', month: '新角色或外部機會會要求你證明可攜價值；準備好的案例比更多口頭承諾有效。', season: '三個月內適合完成一次有退路的轉換；先算現金、時間與能力缺口，再決定是否落子。' }
      }
    },
    life: {
      method: '水鏡照息', instrument: '回身鏡片', question: '身體先在哪裡示警、什麼耗損被正常化、哪一道界線能讓你回身。',
      ritualNames: { moon: '月下照鏡', 'turn-down': '覆鏡入袖', door: '門縫留光' },
      branchLines: {
        restore: '水鏡沒有叫你逃走。它只指出：恢復必須被固定安排，不能再靠偶爾倒下換來。',
        boundary: '耗損不只來自工作量，而是每一個本可拒絕、延後或分配的入口都沒有門。',
        drain: '你已把疲憊活成背景噪音。最危險的不是累，是你開始把失去感覺誤認成適應。',
        transition: '舊節奏正在失效，但新節奏還沒站穩。這不是退步，是轉換期需要更清楚的支點。'
      },
      futures: {
        restore: { week: '睡眠、食慾或注意力會先回一點；不要立刻拿剛恢復的力氣去補更多事情。', month: '一個固定休息或無輸入時段會明顯改善判斷；恢復若只發生在崩潰後，效果不會留下。', season: '三個月內可建立更穩定的節奏，但需要把恢復當成日程，不是完成所有事後的獎勵。' },
        boundary: { week: '一個臨時要求會讓你立刻感到身體緊繃；先延後回答，辨認那是不是你的責任。', month: '界線說出口後，至少一段關係或合作會重新分配；短暫不舒服不等於你做錯。', season: '三個月內若能固定關閉一個耗損入口，精神與時間會開始回流；若所有門仍開著，疲憊只會換形式。' },
        drain: { week: '最先出現的不是大事，而是遲鈍、易怒或失去興趣；把它當訊號，不要當個性。', month: '耗損會逼出一次不得不停下的時刻；在它替你決定前，先減少一項固定負荷。', season: '若持續忽略，三個月內可能以失眠、情緒波動或判斷下降提醒你；這不是醫療診斷，持續不適應尋求專業協助。' },
        transition: { week: '舊安排會再失效一次，提醒你不能只靠更用力回到原狀。', month: '一個新節奏會試著成形，但需要你容許效率暫時下降；先穩定，再優化。', season: '三個月內適合完成一次生活結構的換軌；成功不是回到以前，而是新方式開始可持續。' }
      }
    },
    forbidden: {
      method: '狐面逆問', instrument: '缺角狐面', question: '哪一刻慾望變成試探、哪一種恐懼總換一張臉回來。',
      ritualNames: { name: '面內題名', remove: '卸面留手', 'burn-edge': '狐火缺角' },
      branchLines: {
        repeat: '你追逐的不全是人，而是忽冷忽熱解除焦慮的那一瞬。高峰很真，卻不能替平靜作證。',
        control: '你把需要藏起來，再用退開測量對方會不會追。這能測出焦慮，測不出理解。',
        avoid: '你在最接近時撤退，不是因為沒有感覺，而是感覺一旦被看見，就可能被拒絕。',
        break: '你已認得咒語開始的第一句。真正的斷咒不在最後一刀，而在第一次不舒服時就換動作。'
      },
      futures: {
        repeat: { week: '一次突然靠近會在你準備退開時發生；等熱度退一晚，再看修復是否仍存在。', month: '熟悉的高低差會再走一輪；若平靜時沒有尊重與安排，強烈只是在替不穩定上色。', season: '三個月內若只追高峰，模式會換人不換結局；真正的新局從你不再把焦慮叫成命定開始。' },
        control: { week: '你會想用冷淡、消失或一句反話確認在乎；把它改成可回答的需求。', month: '一次直接表達會讓關係立刻變清楚；答案未必甜，但比長期猜測更能保護你。', season: '三個月內控制感若降低，真正可靠與只會追逐的人會自然分開；不要用新試探驗證舊結論。' },
        avoid: { week: '靠近變具體時，你會先想撤；離開前留一句真話，別讓沉默替你決定。', month: '一段關係或合作會要求更明確的位置；慢可以，但要讓對方知道你仍在選擇。', season: '三個月內若能在退前說明，關係品質會明顯分流；能尊重節奏的人才值得繼續靠近。' },
        break: { week: '舊模式會故意以很熟悉的形式再出現一次；你只需要比上次早一步說明或停止。', month: '一個小而清楚的新動作會改變整段互動，不必等到痛夠深才證明界線合理。', season: '三個月內可完成一次真正斷咒：不是再也不被誘惑，而是被誘惑時仍保有選擇。' }
      }
    }
  };

  const branchTrials = {
    love: {
      id: 'love.pulse-trial', phase: '近身驗脈', layout: 'ritual', deep: true,
      kicker: '緣之卷・掌心脈線', title: '她把紅線拉到你面前。',
      art: art('assets/images/active/01_love/love_012.webp', 'assets/images/active/01_love/LOVE_lips_mobile.webp', 'right-bottom', '50% 48%', '52% 18%', '月下紅線'),
      beats: [
        narrator('她沒有綁住你，只把那條發亮的紅線從指間慢慢拉開，另一端停在你面前。'),
        fox('別把靠近當獎賞。現在想像對方真的站在你面前——你最需要對方做什麼，才不必再猜？'),
        fox('只准選一個。想要全部，通常是因為你一樣都沒有拿穩。')
      ],
      choices: [
        choice('ask-place', '說清楚我的位置', '要一個能被回答的關係名稱與安排。', fox('「好。名字不是束縛；只是不再讓你永遠活在省略號裡。」'), { behavior: { agency: 2 }, scores: { mutual: 1, projection: 1 } }),
        choice('ask-action', '讓對方完成下一次靠近', '停止替另一端安排。', fox('「把線放桌上。真想來的人，不會需要你隔空拉完。」'), { behavior: { restraint: 2 }, scores: { reclaim: 1, alone: 1 } }),
        choice('ask-truth', '承認對方現在給不起', '不把缺席翻譯成命運考驗。', fox('她的指腹輕壓你的脈搏。「痛不是輸。一直不肯命名，才會讓它沒有出口。」'), { behavior: { change: 2 }, scores: { alone: 2 } })
      ], branchEcho: true
    },
    career: {
      id: 'career.stake-trial', phase: '奪子驗局', layout: 'ritual', deep: true,
      kicker: '業之卷・只留一手', title: '她終於把棋子推給你。',
      art: art('assets/images/active/02_career/CAREER_chess_oracle.webp', 'assets/images/active/02_career/CAREER_wine_mobile.webp', 'right-top', '47% 50%', '50% 22%', '九尾玄棋'),
      beats: [
        narrator('九尾沒有寫字。她用兩指夾起唯一刻著你名字的玄棋，放在你手背。'),
        fox('{{period}}內，你只能走一手。不是最努力的一手，是走完後會改變議價位置的一手。'),
        fox('選錯不會死。一直不落子，盤面才會替你決定。')
      ],
      choices: [
        choice('stake-name', '讓一項成果正式署名', '留下可被轉述、引用與帶走的證據。', fox('「棋落在名字上。下一次別只說我們，要說清你完成了哪一刀。」'), { scores: { visible: 3 }, behavior: { agency: 1 } }),
        choice('stake-term', '用新增責任換條件', '時間、權限、職稱或報酬至少換一樣。', fox('「這才叫交換。只有責任增加，不叫機會。」'), { scores: { borrowed: 1, visible: 2 }, behavior: { challenge: 1 } }),
        choice('stake-exit', '完成一件可攜成果', '先準備退路，不急著宣布。', fox('「把路做出來，再決定要不要走。這不是背叛，是選擇權。」'), { scores: { move: 3 }, behavior: { restraint: 1, change: 1 } })
      ], branchEcho: true
    },
    life: {
      id: 'life.body-trial', phase: '回身驗息', layout: 'observation', deep: true,
      kicker: '命之卷・身體先答', title: '鏡片只照你最先緊繃的地方。',
      art: art('assets/images/active/03_life/life_002.webp', 'assets/images/active/03_life/LIFE_recline_mobile.webp', 'left-top', '50% 46%', '50% 20%', '月下回身驗息'),
      beats: [
        narrator('她把冰冷鏡片貼近你的腕內。水紋沒有映出疾病，只映出你每次勉強自己時最先收緊的地方。'),
        fox('命館不替你診斷。持續不適要找專業的人。今晚我只問：那個訊號出現時，你通常還會多撐多久？'),
        fox('你選的不是休息方式，是下一次要在哪一刻相信自己。')
      ],
      choices: [
        choice('body-pause', '第一次出現就停十分鐘', '先讓訊號被聽見，不等它提高音量。', fox('「十分鐘不會救你一生，卻能阻止你每次都到倒下才承認。」'), { scores: { restore: 3 }, behavior: { restraint: 1 } }),
        choice('body-door', '先關掉一個固定入口', '通知、要求或一段無限待命。', fox('「不是所有門都要永遠關。能關上，才叫門。」'), { scores: { boundary: 3 }, behavior: { agency: 1 } }),
        choice('body-help', '讓一個人知道我撐不住', '把求助變成具體分配，不只傾訴。', fox('「說累不是求助。說出要對方接哪一件，才是。」'), { scores: { drain: 1, transition: 2 }, behavior: { trust: 1 } })
      ], branchEcho: true
    },
    forbidden: {
      id: 'forbidden.heat-trial', phase: '狐火逼近', layout: 'whisper', deep: true,
      kicker: '禁之卷・不准閉眼', title: '她把危險停在最後一寸。',
      art: art('assets/images/active/04_forbidden/FORBIDDEN_mask.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'left-top', '58% 48%', '50% 18%', '狐面逼近'),
      beats: [
        narrator('狐火封住退路。她貼近到呼吸能被分辨，狐面卻擋在你們之間，沒有碰你。'),
        fox('想要可以很強。今晚真正的禁忌不是慾望，是你又準備用熟悉的方式失去選擇。'),
        fox('若我現在忽然抽離，你第一個動作會是什麼？')
      ],
      choices: [
        choice('heat-chase', '立刻追上去問清楚', '焦慮要求現在就解除。', fox('「記住這股衝動。下次先等它退潮，再判斷對方值不值得追。」'), { scores: { repeat: 2, control: 1 }, behavior: { approach: 1 } }),
        choice('heat-freeze', '裝作完全不在乎', '先退開，逼對方暴露。', fox('「那不是冷靜，是把問題換成考試。你可以直接說你不喜歡突然消失。」'), { scores: { control: 2, avoid: 1 }, behavior: { retreat: 1 } }),
        choice('heat-name', '說出我現在被勾起了什麼', '承認慾望，也保留停止權。', fox('狐面裂了一線。「能命名慾望的人，比假裝沒有的人更不容易被它帶走。」'), { scores: { break: 3 }, behavior: { agency: 1, trust: 1 } })
      ], branchEcho: true
    }
  };

  const trialVariantArt = {
    love: {
      mutual: art('assets/images/active/01_love/love_012.webp', 'assets/images/active/01_love/LOVE_lips_mobile.webp', 'right-bottom', '50% 48%', '52% 18%', '掌心脈線・雙向'),
      reclaim: art('assets/images/active/01_love/love_022_wide_v39.webp', 'assets/images/active/01_love/love_022.webp', 'right-top', '63% 48%', '50% 20%', '掌心脈線・回流'),
      projection: art('assets/images/active/01_love/love_017.webp', 'assets/images/active/01_love/love_020.webp', 'left-top', '61% 50%', '50% 25%', '掌心脈線・空鏡'),
      alone: art('assets/images/active/01_love/love_015.webp', 'assets/images/active/01_love/love_020.webp', 'left-top', '61% 50%', '50% 23%', '掌心脈線・單手')
    },
    career: {
      visible: art('assets/images/active/02_career/CAREER_chess_oracle.webp', 'assets/images/active/02_career/CAREER_wine_mobile.webp', 'right-top', '47% 50%', '50% 22%', '玄棋・署名'),
      borrowed: art('assets/images/active/02_career/career_019_wide_v39.webp', 'assets/images/active/02_career/career_019.webp', 'right-top', '40% 50%', '50% 22%', '玄棋・借名'),
      stuck: art('assets/images/active/02_career/CAREER_03_rain_standing_pressure_v39.webp', 'assets/images/active/02_career/CAREER_03_rain_standing_pressure_mobile.webp', 'right-top', '47% 50%', '50% 24%', '玄棋・困局'),
      move: art('assets/images/active/02_career/career_new_01.webp', 'assets/images/active/02_career/career_020.webp', 'left-top', '62% 50%', '50% 22%', '玄棋・移位')
    },
    life: {
      restore: art('assets/images/active/03_life/life_002.webp', 'assets/images/active/03_life/LIFE_recline_mobile.webp', 'left-top', '50% 46%', '50% 20%', '水鏡・復位'),
      boundary: art('assets/images/active/03_life/LIFE_shards.webp', 'assets/images/active/03_life/life_020.webp', 'right-top', '40% 50%', '50% 22%', '水鏡・界線'),
      drain: art('assets/images/active/03_life/life_new_01.webp', 'assets/images/active/03_life/LIFE_recline_mobile.webp', 'left-top', '61% 50%', '50% 20%', '水鏡・耗損'),
      transition: art('assets/images/active/03_life/life_new_02.webp', 'assets/images/active/03_life/life_019.webp', 'right-top', '40% 50%', '50% 20%', '水鏡・換軌')
    },
    forbidden: {
      repeat: art('assets/images/active/04_forbidden/FORBIDDEN_wet_gaze.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'right-top', '47% 48%', '50% 18%', '狐面・回流'),
      control: art('assets/images/active/04_forbidden/FORBIDDEN_mask.webp', 'assets/images/active/04_forbidden/forbidden_020.webp', 'left-top', '58% 48%', '50% 18%', '狐面・試探'),
      avoid: art('assets/images/active/04_forbidden/FORBIDDEN_close_left.webp', 'assets/images/active/04_forbidden/forbidden_023.webp', 'right-top', '42% 48%', '50% 18%', '狐面・退避'),
      break: art('assets/images/active/04_forbidden/FORBIDDEN_seated_right.webp', 'assets/images/active/04_forbidden/forbidden_023.webp', 'left-top', '60% 48%', '50% 18%', '狐面・斷咒')
    }
  };

  Object.entries(routeSystems).forEach(([id, system]) => {
    const route = { love, career, life, forbidden }[id];
    Object.assign(route, system);
    branchTrials[id].variantArt = trialVariantArt[id];
    const resultIndex = route.scenes.findIndex(scene => scene.type === 'result');
    route.scenes.splice(resultIndex, 0, branchTrials[id]);
    route.scenes.filter(scene => ['驗證', '異象', '反轉', '判讀', '恐兆'].includes(scene.phase)).forEach(scene => { scene.branchEcho = true; });
  });

  career.scenes.find(scene => scene.id === 'career.pressure').art.side = 'right-top';
  career.scenes.find(scene => scene.id === 'career.pressure').art.desktopFocus = '47% 50%';
  love.scenes.find(scene => scene.type === 'ending').art = art('assets/images/active/01_love/love_016.webp', 'assets/images/active/01_love/love_020.webp', 'right-top', '50% 50%', '50% 28%', '雨夜收線');
  career.scenes.find(scene => scene.type === 'ending').art = art('assets/images/active/08_props/FX_empty_gate.png', 'assets/images/active/02_career/career_016.webp', 'left-top', '50% 50%', '50% 25%', '棋局散場');
  life.scenes.find(scene => scene.type === 'ending').art = art('assets/images/active/08_props/FX_empty_mirror_hall.png', 'assets/images/active/03_life/life_020.webp', 'left-top', '50% 50%', '50% 25%', '水鏡空廊');
  forbidden.scenes.find(scene => scene.type === 'ending').art = art('assets/images/active/08_props/FX_empty_torii.png', 'assets/images/active/04_forbidden/forbidden_018.webp', 'left-top', '50% 50%', '50% 24%', '禁門天明');

  const routeLookup = { love, career, life, forbidden };
  const routeScene = (routeId, sceneId) => routeLookup[routeId].scenes.find(scene => scene.id === sceneId);
  const patchRouteArt = (routeId, sceneId, patch) => {
    const scene = routeScene(routeId, sceneId);
    if (!scene) return;
    scene.art = { ...scene.art, ...patch };
  };
  const focusTowardFace = focus => `${String(focus || '50% 50%').split(/\s+/)[0]} 18%`;
  const keyCloseScenes = new Set([
    'love.face', 'love.proximity', 'career.stake-trial',
    'forbidden.bait', 'forbidden.mask', 'forbidden.mirror', 'forbidden.heat-trial'
  ]);

  Object.values(routeLookup).forEach(route => route.scenes.forEach(scene => {
    // V58：保留每一幕已人工校正的焦點，不再把全站人物一律強制拉到臉部 18%。
    // 只有真正的近身鏡頭才標記 large；其他畫面尊重原圖構圖與場景語意。
    scene.art.heroPresence = scene.type === 'ending' ? 'empty' : (keyCloseScenes.has(scene.id) ? 'large' : (scene.art.heroPresence || 'medium'));
    Object.values(scene.variantArt || {}).forEach(variant => {
      variant.heroPresence = variant.heroPresence || 'large';
    });
  }));

  // 手機只使用直式構圖；桌機仍維持 V45 的橫式母圖。
  patchRouteArt('love', 'love.threshold', { mobile: v46('LOVE_01_rain_bridge_invite_mobile'), mobileFocus: '50% 18%' });
  patchRouteArt('love', 'love.proximity', { mobile: v46('LOVE_03_close_face_bait_mobile'), mobileFocus: '50% 16%', heroPresence: 'large' });
  patchRouteArt('love', 'love.pulse-trial', { mobile: v46('LOVE_03_close_face_bait_mobile'), mobileFocus: '50% 16%', heroPresence: 'large' });
  patchRouteArt('career', 'career.threshold', { mobile: v46('CAREER_01_fan_command_mobile'), mobileFocus: '50% 18%' });
  patchRouteArt('career', 'career.turn', { mobile: 'assets/images/active/02_career/career_020.webp', mobileFocus: '50% 18%' });
  patchRouteArt('life', 'life.threshold', { mobile: v46('LIFE_01_water_reflection_mobile'), mobileFocus: '50% 18%' });
  patchRouteArt('life', 'life.shadow', { mobile: v46('LIFE_02_paperdoor_shadow_mobile'), mobileFocus: '50% 18%' });
  patchRouteArt('forbidden', 'forbidden.threshold', { mobile: v46('FORBIDDEN_01_talisman_wall_fullbody_mobile'), mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.pattern', { mobile: v46('FORBIDDEN_VERIFY_01_patterns_converge_mobile'), mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.bait', { mobile: v46('FORBIDDEN_03_neck_shadow_threat_mobile'), mobileFocus: '50% 15%', heroPresence: 'large' });
  patchRouteArt('forbidden', 'forbidden.mirror', { mobile: 'assets/images/active/04_forbidden/forbidden_023.webp', mobileFocus: '50% 17%', heroPresence: 'large' });
  patchRouteArt('forbidden', 'forbidden.threat', { mobile: v46('FORBIDDEN_VERIFY_03_reality_threshold_mobile'), mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.turn', { mobile: v46('FORBIDDEN_VERIFY_02_break_the_loop_mobile'), mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.last-proof', { mobile: v46('FORBIDDEN_VERIFY_03_reality_threshold_mobile'), mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.heat-trial', { mobile: v46('FORBIDDEN_03_neck_shadow_threat_mobile'), mobileFocus: '50% 15%', heroPresence: 'large' });
  patchRouteArt('forbidden', 'forbidden.result', { mobile: 'assets/images/active/04_forbidden/forbidden_023.webp', mobileFocus: '50% 17%' });
  patchRouteArt('forbidden', 'forbidden.ritual', { mobile: v46('FORBIDDEN_VERIFY_02_break_the_loop_mobile'), mobileFocus: '50% 17%' });

  // V52：逐幕依人物與道具實際位置指定桌機文字安全區；新增左下／右下，避免壓住主角與互動物件。
  const desktopSafeSide = {
    love: {
      'love.threshold': 'left', 'love.face': 'left-top', 'love.question': 'right-top', 'love.wrist': 'left-top',
      'love.evidence': 'right-top', 'love.thread-room': 'right', 'love.proximity': 'left', 'love.silence': 'left-bottom',
      'love.turn': 'left', 'love.last-proof': 'right-bottom', 'love.pulse-trial': 'right-bottom', 'love.result': 'left',
      'love.ritual': 'right', 'love.ending': 'right-top'
    },
    career: {
      'career.threshold': 'right', 'career.name': 'right', 'career.black-piece': 'left-top', 'career.exchange': 'right',
      'career.borrowed': 'left-top', 'career.pressure': 'right-top', 'career.turn': 'right', 'career.last-proof': 'right',
      'career.stake-trial': 'right-top', 'career.result': 'right', 'career.ritual': 'left', 'career.ending': 'left-top'
    },
    life: {
      'life.threshold': 'left-top', 'life.shadow': 'left', 'life.room': 'left', 'life.mirror': 'right',
      'life.double': 'bottom', 'life.cost': 'left', 'life.turn': 'left-top', 'life.last-proof': 'bottom',
      'life.body-trial': 'left-top', 'life.result': 'right', 'life.ritual': 'right', 'life.ending': 'left-top'
    },
    forbidden: {
      'forbidden.threshold': 'left', 'forbidden.pattern': 'left', 'forbidden.wrist': 'left-top', 'forbidden.bait': 'right',
      'forbidden.mask': 'left-top', 'forbidden.mirror': 'left', 'forbidden.threat': 'right-top', 'forbidden.turn': 'right-top',
      'forbidden.last-proof': 'left', 'forbidden.heat-trial': 'left-top', 'forbidden.result': 'left', 'forbidden.ritual': 'right-bottom',
      'forbidden.ending': 'left-top'
    }
  };
  Object.entries(desktopSafeSide).forEach(([routeId, map]) => {
    Object.entries(map).forEach(([sceneId, side]) => patchRouteArt(routeId, sceneId, { side }));
  });

  // 四卷的關鍵試煉：玩家選完後，畫面立即改成對應的現實驗證圖。
  const trialReactionArt = {
    love: [
      art(v46('LOVE_VERIFY_01_next_time_proof_desktop'), v46('LOVE_VERIFY_01_next_time_proof_mobile'), 'right-top', '50% 27%', '50% 18%', '緣脈驗證・留下下一次', 'bottom', { heroPresence: 'medium' }),
      art(v46('LOVE_VERIFY_02_fact_or_script_desktop'), v46('LOVE_VERIFY_02_fact_or_script_mobile'), 'left-top', '50% 27%', '50% 18%', '緣脈驗證・事實與想像', 'bottom', { heroPresence: 'large' }),
      art(v46('LOVE_VERIFY_03_release_or_hold_desktop'), v46('LOVE_VERIFY_03_release_or_hold_mobile'), 'left-top', '50% 27%', '50% 18%', '緣脈驗證・放手或續線', 'bottom', { heroPresence: 'medium' })
    ],
    career: [
      art(v46('CAREER_VERIFY_01_achievement_proof_desktop'), v46('CAREER_VERIFY_01_achievement_proof_mobile'), 'left-top', '50% 27%', '50% 18%', '玄棋驗證・成果署名', 'bottom', { heroPresence: 'large' }),
      art(v46('CAREER_VERIFY_03_negotiate_terms_desktop'), v46('CAREER_VERIFY_03_negotiate_terms_mobile'), 'left-top', '50% 27%', '50% 18%', '玄棋驗證・交換條件', 'bottom', { heroPresence: 'large' }),
      art(v46('CAREER_VERIFY_02_ally_door_desktop'), v46('CAREER_VERIFY_02_ally_door_mobile'), 'left-top', '50% 27%', '50% 18%', '玄棋驗證・可攜出口', 'bottom', { heroPresence: 'medium' })
    ],
    life: [
      art(v46('LIFE_VERIFY_01_close_the_noise_desktop'), v46('LIFE_VERIFY_01_close_the_noise_mobile'), 'right-top', '50% 27%', '50% 18%', '水鏡驗證・關掉雜音', 'bottom', { heroPresence: 'large' }),
      art(v46('LIFE_VERIFY_02_return_the_burden_desktop'), v46('LIFE_VERIFY_02_return_the_burden_mobile'), 'left-top', '50% 27%', '50% 18%', '水鏡驗證・歸還負擔', 'bottom', { heroPresence: 'medium' }),
      art(v46('LIFE_VERIFY_03_choose_yourself_desktop'), v46('LIFE_VERIFY_03_choose_yourself_mobile'), 'left-top', '50% 27%', '50% 18%', '水鏡驗證・先選自己', 'bottom', { heroPresence: 'medium' })
    ],
    forbidden: [
      art(v46('FORBIDDEN_VERIFY_01_patterns_converge_desktop'), v46('FORBIDDEN_VERIFY_01_patterns_converge_mobile'), 'left-top', '50% 27%', '50% 18%', '狐面驗證・模式匯流', 'bottom', { heroPresence: 'large' }),
      art(v46('FORBIDDEN_VERIFY_02_break_the_loop_desktop'), v46('FORBIDDEN_VERIFY_02_break_the_loop_mobile'), 'right-top', '50% 27%', '50% 18%', '狐面驗證・中斷重演', 'bottom', { heroPresence: 'large' }),
      art(v46('FORBIDDEN_VERIFY_03_reality_threshold_desktop'), v46('FORBIDDEN_VERIFY_03_reality_threshold_mobile'), 'left-top', '50% 27%', '50% 18%', '狐面驗證・現實門檻', 'bottom', { heroPresence: 'medium' })
    ]
  };
  Object.entries(trialReactionArt).forEach(([routeId, reactions]) => {
    branchTrials[routeId].choices.forEach((item, index) => { item.reactionArt = reactions[index]; });
  });

  // 變化試煉的手機圖也改成直式，不再以橫圖硬裁。
  const trialMobileArt = {
    love: ['LOVE_VERIFY_01_next_time_proof_mobile', 'LOVE_VERIFY_02_fact_or_script_mobile', 'LOVE_VERIFY_03_release_or_hold_mobile', 'LOVE_03_close_face_bait_mobile'],
    career: ['CAREER_VERIFY_01_achievement_proof_mobile', 'CAREER_VERIFY_03_negotiate_terms_mobile', 'CAREER_01_fan_command_mobile', 'CAREER_VERIFY_02_ally_door_mobile'],
    life: ['LIFE_VERIFY_01_close_the_noise_mobile', 'LIFE_VERIFY_02_return_the_burden_mobile', 'LIFE_VERIFY_03_choose_yourself_mobile', 'LIFE_01_water_reflection_mobile'],
    forbidden: ['FORBIDDEN_VERIFY_01_patterns_converge_mobile', 'FORBIDDEN_VERIFY_02_break_the_loop_mobile', 'FORBIDDEN_VERIFY_03_reality_threshold_mobile', 'FORBIDDEN_03_neck_shadow_threat_mobile']
  };
  Object.entries(trialVariantArt).forEach(([routeId, variants]) => {
    Object.values(variants).forEach((variant, index) => {
      variant.mobile = v46(trialMobileArt[routeId][index]);
      variant.mobileFocus = '50% 17%';
      variant.heroPresence = 'large';
    });
  });

  // V49：全站不再使用刮除；禁卷與第五卷都改為點觸／落印互動。
  const forbiddenScratchScene = routeScene('forbidden', 'forbidden.mask');
  delete forbiddenScratchScene.type;
  forbiddenScratchScene.art = art(
    v49('forbidden_fox_mask'),
    'assets/images/active/04_forbidden/forbidden_014.webp',
    'left-top', '54% 27%', '50% 17%', '狐面揭露', 'bottom',
    { heroPresence: 'large' }
  );
  delete forbiddenScratchScene.scratch;

  const finale = {
    id: 'finale', label: '真命卷', accent: '#f0c981', rgb: '240, 201, 129', audio: 'assets/audio/ending.ogg',
    scenes: [
      {
        id: 'finale.gate', phase: '第五門', layout: 'ritual', kicker: '四卷已齊・無字之門', title: '四扇門之外，多了一道縫。',
        art: art('assets/images/active/05_fifth/ending_003.webp', 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp', 'left-top', '50% 50%', '50% 24%', '無字之門'),
        beats: [
          narrator('四件命痕同時發熱。四扇門沒有合成答案，反而把九尾身後的牆照成一扇沒有名字的門。'),
          fox('「……不對。」她沒有笑。這道門，今晚本來不該存在。'),
          fox('紅線、玄棋、鏡片、狐面都在發熱。不是在叫你回頭——它們在指向我。'),
          narrator('她把手放上門，卻等你先推。')
        ]
      },
      {
        id: 'finale.relics', phase: '取證', kicker: '真命卷・四痕上桌', title: '她把你帶回來的東西一件件拆開。',
        art: art('assets/images/active/05_fifth/finale_four_relics.webp', 'assets/images/active/07_shared/shared_005.webp', 'left-top', '50% 50%', '50% 21%', '四痕上桌'),
        beats: [
          narrator('未結紅線、署名玄棋、回身鏡片與缺角狐面依序落桌。每一件都保留你當時選擇的痕跡。'),
          oracle('命種決定你先看見什麼；問期決定今晚能說到哪裡；真正改寫結果的，是你在事件裡留下的行痕。'),
          fox('{{relics}}'),
          fox('我沒有替你挑這四件。它們是你親手留下的口供。')
        ]
      },
      {
        id: 'finale.verdicts', type: 'four-verdicts', phase: '合判', kicker: '真命卷・四卷互證', title: '四個答案，指向同一個習慣。',
        art: art('assets/images/active/05_fifth/finale_uncontrolled.webp', 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp', 'left-top', '50% 46%', '50% 20%', '四卷互證・九尾失控')
      },
      {
        id: 'finale.cross', phase: '反證', layout: 'evidence', kicker: '真命卷・九尾反問', title: '「如果我是錯的，你敢證明嗎？」',
        art: art('assets/images/active/03_life/life_mirror_mismatch.webp', 'assets/images/active/04_forbidden/forbidden_023.webp', 'left-top', '50% 50%', '50% 18%', '鏡中伏筆回返'),
        beats: [
          fox('{{echo}}'),
          narrator('她沒有把這句話說成定罪。反而將四件命痕推回你面前，容許你反駁。'),
          fox('現在挑一卷。哪一份判詞最可能被你帶進現實、證明命館看錯？')
        ],
        choices: [
          choice('prove-love', '緣之卷', '讓另一端用行動證明，不再替它補完。', fox('「很好。若對方真的走完那半步，我會親手改掉判詞。」'), { flags: { finaleChallenge: 'love' }, behavior: { agency: 1 } }),
          choice('prove-career', '業之卷', '讓成果與名字落在同一格。', fox('「帶著證據回來。別只帶新的疲憊。」'), { flags: { finaleChallenge: 'career' }, behavior: { challenge: 1 } }),
          choice('prove-life', '命之卷', '讓恢復成為結構，不靠崩潰批准。', fox('「若你的身體先安靜下來，我願意承認它比命卷更早知道答案。」'), { flags: { finaleChallenge: 'life' }, behavior: { restraint: 1 } }),
          choice('prove-forbidden', '禁之卷', '讓慾望留下，舊反應不再接管。', fox('「這個最難。不是不再心動，是心動時仍知道門在哪裡。」'), { flags: { finaleChallenge: 'forbidden' }, behavior: { change: 1 } })
        ]
      },
      {
        id: 'finale.confession', phase: '坦白', kicker: '真命卷・九尾失言', title: '「我確實需要你。」',
        art: art('assets/images/active/07_shared/SHARED_recline.webp', 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp', 'right-top', '49% 51%', '50% 24%', '九尾失言'),
        beats: [
          narrator('她第一次沒有隔著桌子、鏡面或狐火。衣袖滑落時，她沒有整理，也沒有把靠近當成答案。'),
          fox('四道命痕能鬆開我的封印。這是真的。'),
          fox('我讓你走完四卷，起初確實有私心。每一次你願意把真話留下，這間館就替我鬆一根鎖。'),
          narrator('她牽你的手貼上封印。掌心很熱，力道卻停在你隨時能抽回的位置。'),
          fox('後來我開始害怕的，不是你不替我開門。是門開了，你就沒有理由再回來。')
        ]
      },
      {
        id: 'finale.seal-test', type: 'seal-test', phase: '逼近', kicker: '真命卷・封印索命', title: '狐火要你立刻替她決定。',
        art: art(v49('final_seal_form'), 'assets/images/active/04_forbidden/forbidden_020.webp', 'left-top', '57% 30%', '50% 18%', '第五印形成', 'bottom', { heroPresence: 'large' })
      },
      { id: 'finale.question', type: 'true-question', phase: '第五問', kicker: '真命卷・只問你', title: '這次，沒有別人的名字。', art: art('assets/images/active/07_shared/SHARED_close.webp', 'assets/images/active/07_shared/shared_001.webp', 'left-top', '50% 62%', '50% 34%', '第五問', 'bottom', { heroPresence: 'large' }) },
      {
        id: 'finale.choice', type: 'final-choice', phase: '最後選擇', layout: 'ritual', kicker: '真命卷・天亮以前', title: '答案、她，或一條沒人替你命名的路。',
        art: art('assets/images/active/05_fifth/final_seal_touch.webp', 'assets/images/active/05_fifth/final_seal_touch.webp', 'left-top', '50% 58%', '50% 42%', '天亮前的選擇', 'bottom', { heroPresence: 'large' })
      },
      {
        id: 'finale.withdrawal', phase: '抽離', kicker: '真命卷・她忽然不見了', title: '房間只剩一截還在發熱的紅線。',
        art: art('assets/images/active/05_fifth/final_refuse_room.webp', 'assets/images/active/05_fifth/final_refuse_room.webp', 'left-top', '50% 50%', '50% 46%', '空室餘線', 'bottom', { heroPresence: 'empty' }),
        beats: [
          narrator('狐火熄滅得沒有預告。你才眨眼，九尾、尾影與呼吸聲都從房間抽走。'),
          narrator('桌上只剩四件命痕、一截紅線，和一張還沒乾的手書。門外天將亮，命館第一次顯得像從未有人住過。'),
          fox('「別回頭找我。先把那張紙讀完。」'),
          narrator('聲音從很遠的門後傳來。這一次，她沒有用靠近換你繼續。')
        ]
      },
      { id: 'finale.ending', type: 'final-ending', phase: '秘密結局', kicker: '櫻隱命館・真結', title: '她回來，親手展開總命牒。', art: art(v49('final_scroll_desktop'), 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp', 'bottom', '50% 50%', '50% 55%', '九尾親手展開總命牒', 'bottom', { heroPresence: 'large', scrollBoxDesktop: { x: .24, y: .70, w: .52, h: .16, rotate: 0 }, scrollBoxMobile: { x: .22, y: .64, w: .56, h: .20, rotate: 0 } }) }
    ],
    patterns: {
      wait: { title: '候命之痕', verdict: '你常把決定權留給別人，再把漫長等待解釋成體貼。', event: '一個遲遲未定的人或安排會再次要求你保留位置。', action: '替自己寫下期限，期限前只說一次需求；到期後用行動作答。', caution: '等待本身不會自動變成深情、忠誠或好機會。' },
      hold: { title: '承接之痕', verdict: '你總在事情快掉下去時伸手，久了別人忘了那原本不是你的東西。', event: '有人會以「只有你做得到」把責任放回你手上。', action: '接之前先問範圍、期限與交換；至少退回一項不屬於你的責任。', caution: '被需要會帶來位置感，也可能掩蓋交換失衡。' },
      approach: { title: '先行之痕', verdict: '你不怕靠近，怕的是走近後只看見自己留下的腳印。', event: '一段關係或合作會給你一次主動開門的機會。', action: '開一次門，然後停下；看對方能否完成剩下的距離。', caution: '勇敢不是永遠先走，也包括看見沒有人跟上。' },
      retreat: { title: '退潮之痕', verdict: '你很會在受傷前抽離，也因此讓真實答案常停在門外。', event: '當事情變得具體，你會再次想消失或改口說不重要。', action: '退前留一句真話與可接受的節奏，讓界線代替失聯。', caution: '慢是選擇；讓所有人猜，會把恐懼交給別人承擔。' },
      challenge: { title: '問刃之痕', verdict: '你能逼真相說清楚，真正的考驗是清楚後不再重問。', event: '一個模糊承諾會被你追問到出現明確答案。', action: '只追問一次，記下答案，下一步照它做而不是繼續辯論。', caution: '分析可以延長安全感，也可以延長你不必行動的時間。' },
      agency: { title: '回手之痕', verdict: '四卷都看見你把決定從別人與命運手裡拿回來。', event: '一個原本由別人決定的局面會出現可由你先動的缺口。', action: '選最小、最具體、可在本問期完成的一步，做完後再看局面。', caution: '掌握自己不是控制所有結果，而是知道結果不好時你仍能怎麼做。' },
      change: { title: '換軌之痕', verdict: '你不是只想知道，而是已準備停止一個總讓你回到原地的動作。', event: '舊模式會以幾乎相同的形式再出現一次，像最後確認你是否認得。', action: '預先寫下新動作，在第一個徵兆出現時就做，不等情緒升到最高。', caution: '改變不必戲劇化；夠早、夠小、做得出來才有力量。' },
      trust: { title: '交手之痕', verdict: '你願意把手交出去，正在學會信任不等於替別人承擔。', event: '有人會要求你相信，但證據尚未完全跟上。', action: '給一次有限、可撤回的信任，同時保留驗證與停止權。', caution: '信任需要風險；沒有邊界的交付只會讓你失去判斷。' },
      restraint: { title: '停燄之痕', verdict: '你忍住立即反應時，現實第一次有機會自己說話。', event: '焦慮會催你立刻傳訊、答應、修復或逃離。', action: '先留一晚或一個完整呼吸週期，再處理真正還存在的問題。', caution: '暫停不是拖延；若期限過後仍不處理，就會重新變成逃避。' },
      control: { title: '鎖局之痕', verdict: '你想先知道全部才肯動；命館看見你其實更需要一條能承受未知的界線。', event: '一個資訊不完整的局面會逼你想測試、追問或預先安排所有結果。', action: '先定「發生什麼我就停」的界線，再允許事情自己走一段。', caution: '安全不是每次都猜中，而是猜錯時仍知道出口。' }
    },
    endings: {
      complete: { title: '完成第五印', art: art(v49('final_complete'), v49('final_complete'), 'left-top', '54% 30%', '50% 25%', '第五印完成', 'bottom', { heroPresence: 'large' }), line: '第五印安靜下來。門縫第一次滲進不是狐火的光，她也第一次沒有把顫抖藏進笑裡。', actor: '「原來被放走，比困住別人更可怕。先別急著替我找理由……讓我自己走到門外。」' },
      'scroll-only': { title: '只留命牒', art: art(v49('final_scroll_only'), v49('final_scroll_only'), 'left-top', '55% 28%', '50% 26%', '第五印留卷', 'bottom', { heroPresence: 'large' }), line: '第五印離開她，落在命牒上。你沒有替她決定自由該長成什麼樣子。', actor: '「你肯幫我，卻不替我決定。真討厭……這樣我就沒有理由怪你了。」' },
      refuse: { title: '拒絕完成封印', art: art(v49('final_refuse'), v49('final_refuse'), 'left-top', '58% 42%', '50% 34%', '第五印停筆', 'bottom', { heroPresence: 'medium' }), line: '你抽回手，距離在你們之間重新長出來。九尾沒有追，紅線也沒有再動。', actor: '「你終於沒有因為誰需要，就立刻把自己交出去。這次是我教你的，所以我沒有資格生氣。」' }
    },
    rewards: [
      { src: 'assets/images/active/07_shared/SHARED_recline.webp', mobile: 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp', title: '真結・只為走完全卷的人' },
      { src: 'assets/images/active/07_shared/ENDING_recline.webp', mobile: 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp', title: '真結・月下餘韻' }
    ]
  };

  const finaleScene = id => finale.scenes.find(scene => scene.id === id);
  const finaleLargeScenes = new Set(['finale.verdicts', 'finale.cross', 'finale.confession', 'finale.seal-test', 'finale.question', 'finale.choice']);
  finale.scenes.forEach(scene => {
    // V58：第五卷也尊重每張插畫原本的人工焦點，不再全卷強制往臉部裁切。
    scene.art.heroPresence = ['finale.withdrawal', 'finale.ending'].includes(scene.id) ? 'empty' : (finaleLargeScenes.has(scene.id) ? 'large' : 'medium');
  });
  finaleScene('finale.relics').art.mobile = v46('HOME_03_fivearts_overview_mobile');
  finaleScene('finale.relics').art.mobileFocus = '50% 18%';
  finaleScene('finale.confession').art.mobile = 'assets/images/active/03_life/LIFE_recline_mobile.webp';
  finaleScene('finale.confession').art.mobileFocus = '50% 18%';
  finaleScene('finale.question').art.mobile = 'assets/images/active/07_shared/SHARED_fullbody_mobile.webp';
  finaleScene('finale.question').art.mobileFocus = '50% 17%';

  const finaleSafeSide = {
    'finale.gate': 'right-top', 'finale.relics': 'right-top', 'finale.verdicts': 'left-top',
    'finale.cross': 'left-top', 'finale.confession': 'left-top', 'finale.seal-test': 'left-top',
    'finale.question': 'left-top', 'finale.choice': 'right-top', 'finale.withdrawal': 'left-top', 'finale.ending': 'bottom'
  };
  Object.entries(finaleSafeSide).forEach(([sceneId, side]) => { finaleScene(sceneId).art.side = side; });

  // V49：真命卷完全取消刮除，最後以第五印點觸落印完成。
  const finaleScratchScene = finaleScene('finale.seal-test');
  finaleScratchScene.art = art(
    v49('final_seal_form'),
    'assets/images/active/04_forbidden/forbidden_020.webp',
    'left-top', '57% 30%', '50% 16%', '第五印形成', 'bottom',
    { heroPresence: 'large' }
  );
  delete finaleScratchScene.scratch;

  // ===== V54：五卷差異化演出＋全面去說明化＋第五卷伏筆回收 =====
  const rewriteSceneV54 = (routeId, sceneId, patch) => {
    const scene = routeScene(routeId, sceneId);
    if (scene) Object.assign(scene, patch);
    return scene;
  };
  const rewriteChoicesV54 = (routeId, sceneId, rows) => {
    const scene = routeScene(routeId, sceneId);
    if (!scene?.choices) return;
    rows.forEach(([id, patch]) => {
      const item = scene.choices.find(choiceItem => choiceItem.id === id);
      if (item) Object.assign(item, patch);
    });
  };

  // 分支判詞不再像系統分析一樣插進每個畫面；各卷改由自己的道具與九尾反應回照。
  Object.values(routeLookup).forEach(route => route.scenes.forEach(scene => { scene.branchEcho = false; }));

  // --- 緣之卷：靠近、距離、紅線。保持親密，但再縮短解說語氣。 ---
  rewriteSceneV54('love', 'love.turn', {
    beats: [
      narrator('紅線穿過鏡面，纏回你的倒影。更奇怪的是，有一小截線沒有回到你手上，反而悄悄往九尾袖口收。'),
      fox('還有一個人你一直沒有問——那個相信只要再懂事一點、再少要一點，就能換來確定的你。'),
      fox('看清楚。困住你的，不全是對方。')
    ]
  });
  rewriteSceneV54('love', 'love.ritual', {
    beats: [fox('別替判詞發誓。只選一個你明天真的做得出來的收尾。')]
  });
  rewriteChoicesV54('love', 'love.ritual', [
    ['unknotted', { label: '先別剪。看它會不會自己鬆。', hint: '不追，也不逃。' }],
    ['mirror-cut', { label: '把那個沒有期限的「也許」剪掉。', hint: '人可以留下，幻想先停。' }],
    ['door-knot', { label: '把線留在門環。', hint: '真想進來的人，自己敲門。' }]
  ]);
  patchRouteArt('love', 'love.ending', { side: 'left-top' });

  // --- 業之卷：像一局棋。用落子、翻牌、署名取代心理教材語氣。 ---
  rewriteSceneV54('career', 'career.threshold', {
    title: '今晚不算你多努力。',
    beats: [
      narrator('黑子堆成你做過的事；白子刻著別人的名字。九尾沒有讓你坐下，只把棋盤轉向你。'),
      fox('{{name}}，我只看一件事——你做完的東西，最後留下誰的名字？')
    ]
  });
  rewriteChoicesV54('career', 'career.threshold', [
    ['position', { label: '我要位置，不只要更多事。', hint: '讓我的話能改變盤面。' }],
    ['money', { label: '我要交換，不只一句「辛苦了」。', hint: '責任有價格。' }],
    ['exit', { label: '我想先把出口做出來。', hint: '不一定立刻走。' }],
    ['breath', { label: '我只想先喘一口氣。', hint: '這局已經太久沒停。' }]
  ]);
  rewriteSceneV54('career', 'career.name', {
    title: '翻一張。別說「大家一起」。',
    beats: [
      narrator('完成、解危、救場。三張成果牌背面各黏著一個名字。'),
      fox('最近那件最難的事，介紹給別人時——誰先被提到？')
    ]
  });
  rewriteChoicesV54('career', 'career.name', [
    ['mine', { label: '先說到我的名字。', hint: '角色與成果都說得清。' }],
    ['boss', { label: '先說上級或團隊。', hint: '我做的部分被藏在後面。' }],
    ['hidden', { label: '大家知道是我，紙上沒有。', hint: '口碑有，證據沒有。' }],
    ['unclear', { label: '連我自己都說不清。', hint: '忙碌把成果沖散了。' }]
  ]);
  rewriteSceneV54('career', 'career.black-piece', {
    title: '這枚棋，離開公司還算你的嗎？',
    beats: [
      narrator('她把所有有名字的棋推遠，只留下你面前那枚空白玄棋。'),
      fox('如果你明天不在，哪一樣還跟你走？別說「經驗」。拿得出來的才算。')
    ]
  });
  rewriteChoicesV54('career', 'career.black-piece', [
    ['asset', { label: '我有拿得出去的成果。', hint: '作品、數字、能力都能指給人看。' }],
    ['relationship', { label: '我帶得走的是信任與關係。', hint: '但它還沒有被寫成籌碼。' }],
    ['nothing', { label: '幾乎都留在原位置。', hint: '我替公司變強，自己卻沒打包。' }],
    ['plan', { label: '我正在偷偷準備。', hint: '先長出口，不急著宣布。' }]
  ]);
  rewriteSceneV54('career', 'career.exchange', {
    title: '「只有你能做。」你要拿什麼換？',
    beats: [
      narrator('她把新任務推過來，扇骨壓著最上面那張。'),
      fox('先別被那句話哄到。下一次責任加到你身上，你要拿什麼回來？')
    ]
  });
  rewriteChoicesV54('career', 'career.exchange', [
    ['terms', { label: '先談優先順序和交換。', hint: '多一件，就要少一件或多一樣。' }],
    ['accept', { label: '我通常先接，再想辦法。', hint: '可靠，也最容易被算成無限容量。' }],
    ['refuse', { label: '我會直接說不。', hint: '先守住容量。' }],
    ['document', { label: '我接，但把範圍和成果寫下來。', hint: '讓救場留下名字。' }]
  ]);
  rewriteSceneV54('career', 'career.borrowed', {
    title: '你的棋，落地時換了名字。',
    beats: [
      narrator('棋盤細響。你做過的事一枚枚落下，刻上的卻不是你的姓。'),
      player('為什麼沒有我的？'),
      fox('因為你總在最後一句說「沒關係，大家一起的」。'),
      narrator('一枚沒有名字的棋忽然朝九尾袖口滾去。她用扇骨壓住，像不想讓你看見。')
    ]
  });
  rewriteChoicesV54('career', 'career.borrowed', [
    ['claim', { label: '把我的名字寫回去。', hint: '不搶功，只停止消失。' }],
    ['fear', { label: '我怕這樣看起來很愛邀功。', hint: '我更怕別人因此不舒服。' }]
  ]);
  rewriteSceneV54('career', 'career.pressure', {
    title: '忙，是最好用的拖延。',
    beats: [
      narrator('雨落上棋盤。每說一次「最近太忙」，就有一條原本能走的路被水沖淡。'),
      fox('{{period}}內，你只准走一手。不是最勇敢的一手，是走完後真的多一個選擇的一手。')
    ]
  });
  rewriteSceneV54('career', 'career.turn', {
    title: '「不可取代」很好聽。',
    beats: [
      narrator('她抬起整張棋盤。盤底是一雙雙等你伸出去的手。'),
      fox('好聽到你差點忘了問——為什麼每次都是你留下？'),
      narrator('她把唯一刻著你名字的黑棋塞進你掌心。')
    ]
  });
  rewriteSceneV54('career', 'career.last-proof', {
    title: '留下可以。先把代價說出來。',
    beats: [
      narrator('她沒有催你落子，只一盞盞吹熄棋盤旁的燈。'),
      fox('哪一個訊號再出現，你就不再把它叫成「再撐一下」？')
    ]
  });
  rewriteSceneV54('career', 'career.stake-trial', {
    title: '只走一手。',
    beats: [
      narrator('九尾把刻著你名字的玄棋放在你手背。'),
      fox('{{period}}內，只選一手。走完後，盤面要真的少一個人能假裝沒看見你。')
    ]
  });
  rewriteChoicesV54('career', 'career.stake-trial', [
    ['stake-name', { label: '把一項成果署上我的名字。', hint: '讓證據能離開房間。' }],
    ['stake-term', { label: '新增責任以前，先開價。', hint: '時間、權限、職稱、報酬至少換一樣。' }],
    ['stake-exit', { label: '做出一件帶得走的成果。', hint: '先把出口做真。' }]
  ]);
  patchRouteArt('career', 'career.result', { side: 'left-top' });

  Object.assign(career.results.visible, {
    verdict: '你的名字不是沒有位置，是你總等別人替它寫上去。',
    lines: ['盤面已經有能談的成果。', '下一次別只說「我們」，把你完成的那一刀說清楚。'],
    action: '挑三項成果，寫成數字、範圍與你的角色；帶著它去談一次真正的交換。',
    caution: '看見自己，不等於搶走別人的光。'
  });
  Object.assign(career.results.borrowed, {
    verdict: '大家很依賴你，卻還沒被迫承認依賴的價格。',
    lines: ['你做得越穩，越容易被當成背景。', '下一次先把名字和範圍留下，再把成果交出去。'],
    action: '新增工作前先問：誰負責、誰署名、什麼要被延後。',
    caution: '「只有你能做」不是報酬。'
  });
  Object.assign(career.results.stuck, {
    verdict: '你不是走不了，是忙到沒有一隻手能替自己收行李。',
    lines: ['穩定正在用你的疲憊付款。', '最危險的不是今天很累，是半年後你還只剩「再撐一下」。'],
    action: '每週保住一段不救火的時間，只做一件能帶離原位置的成果。',
    caution: '先恢復判斷，再決定要不要翻桌。'
  });
  Object.assign(career.results.move, {
    verdict: '出口已經亮了。現在不需要表演勇敢，只需要把它做真。',
    lines: ['外面的路可能先以合作、詢問或舊人脈出現。', '先確認條件，再決定留下談價，還是真的走。'],
    action: '更新一份能直接拿出去的作品或履歷，找一個可信任的人替你估一次價。',
    caution: '有出口，才有真正的留下。'
  });

  // --- 命之卷：讓鏡子與身體先說話。少解釋，多異常。 ---
  rewriteSceneV54('life', 'life.threshold', {
    title: '先別問運。你醒來的第一秒呢？',
    beats: [
      narrator('月光落進水庭。九尾的倒影比她多出一條尾巴。'),
      fox('{{name}}，別先說「還好」。早上睜眼那一刻，你的身體先說什麼？')
    ]
  });
  rewriteChoicesV54('life', 'life.threshold', [
    ['heavy', { label: '累。像根本沒睡過。', hint: '身體先醒，力氣沒有。' }],
    ['tight', { label: '緊。還沒下床就開始趕。', hint: '今天還沒來，警報先來了。' }],
    ['empty', { label: '空。我不知道今天為什麼開始。', hint: '舊節奏好像裝不回去了。' }],
    ['okay', { label: '其實平穩。我只是想看看。', hint: '沒有大火，也可以照鏡。' }]
  ]);
  rewriteSceneV54('life', 'life.shadow', {
    title: '你的影子晚了一個呼吸。',
    beats: [
      narrator('你走過紙門，影子卻留在門後。它慢了一拍才抬手。'),
      fox('每次你說「先把事情做完」，它就被留在原地。最近誰總排在你前面？')
    ]
  });
  rewriteSceneV54('life', 'life.room', {
    title: '坐下。別急著把休息也做成任務。',
    beats: [
      narrator('她讓你坐下，自己卻靠在潮濕的木柱旁看你。'),
      fox('如果現在真的沒有人能叫你，你第一件想做的事是什麼？不是應該，是想。')
    ]
  });
  rewriteSceneV54('life', 'life.mirror', {
    title: '挑一片。哪一句你一直沒說？',
    beats: [
      narrator('鏡子碎了一地。大部分碎片都在笑，最小的一片卻在哭。'),
      fox('別替它解釋。直接念出來。')
    ]
  });
  rewriteSceneV54('life', 'life.double', {
    title: '倒影替你先答應了。',
    beats: [
      narrator('你還沒開口，鏡子裡的你已經笑著點頭。'),
      player('它為什麼總比我快？'),
      fox('因為它一直相信：只要夠好用，就不會被丟下。'),
      narrator('九尾轉身時，鏡中的她卻慢了一拍。她立刻用袖口遮住那一角。')
    ]
  });
  rewriteSceneV54('life', 'life.cost', {
    title: '有些燈，已經暗很久了。',
    beats: [
      narrator('睡眠、食慾、肩頸、耐心。四盞鏡燈依序亮起，其中一盞幾乎熄了。'),
      fox('持續不舒服要找真正的醫師，不要拿狐火當診斷。今晚我只問——哪一盞你最常假裝沒看見？')
    ]
  });
  rewriteSceneV54('life', 'life.turn', {
    title: '鏡裡那個「永遠能撐」的，才是替身。',
    beats: [
      narrator('碎鏡拼回去。鏡裡的你完整，站在鏡外的身體卻開始透明。'),
      fox('你一直以為真正的自己被困在裡面。其實外面這個，才等你很久了。')
    ]
  });
  rewriteSceneV54('life', 'life.last-proof', {
    title: '不要發誓愛自己。做一件明天看得見的事。',
    beats: [
      narrator('四片鏡擺在你面前：睡、拒絕、求助、離開。'),
      fox('{{period}}內，挑一片。夠小、做得完，而且不准拿去交換新的責任。')
    ]
  });
  rewriteSceneV54('life', 'life.body-trial', {
    title: '身體先答。',
    beats: [
      narrator('冰冷鏡片靠近腕內。水紋停在你每次勉強自己時最先收緊的位置。'),
      fox('那個訊號再出現時，你願意比以前早多久相信它？')
    ]
  });

  Object.assign(life.results.restore, {
    verdict: '你的底盤還在。別等倒下，才准自己停。',
    lines: ['真正缺的不是一場逃跑，是固定被保護的恢復。', '剛回來的力氣，不要立刻拿去多扛一件事。'],
    action: '連續七天保住一段睡眠或無輸入時間，誰來都不拿它交換。',
    caution: '一邊休息一邊待命，身體知道你沒有真的下班。'
  });
  Object.assign(life.results.boundary, {
    verdict: '不是事情都太多，是太多事情不用敲門就能進來。',
    lines: ['你把立刻回應活成善良。', '下一步不是變冷，是讓別人先等你回答。'],
    action: '所有額外請求先回「我確認後再答」，哪怕只晚十分鐘。',
    caution: '你不必等對方做錯，才有資格關門。'
  });
  Object.assign(life.results.drain, {
    verdict: '你已經把疲憊活成背景。這才是最需要被看見的地方。',
    lines: ['麻木、易怒、失去興趣，都不是值得硬撐的勳章。', '若不適持續或加劇，先找專業協助，不要等命館替你批准。'],
    action: '先拿掉一項固定負擔，安排真實休息；需要時預約專業協助。',
    caution: '意志力不能替身體無限墊款。'
  });
  Object.assign(life.results.transition, {
    verdict: '你不是壞掉，是原來那種活法已經裝不下你。',
    lines: ['現在逼自己立刻給完整答案，只會又套回舊殼。', '先試一個可以回頭的小改變，讓身體跟現實一起回答。'],
    action: '在{{period}}內做一次低風險試走：詢問、體驗、短期安排或小型改變。',
    caution: '換軌不是把全部燒掉。先保留能帶你過河的東西。'
  });

  // --- 禁之卷：危險、誘惑、界線。選項像動作，不像測驗。 ---
  rewriteSceneV54('forbidden', 'forbidden.threshold', {
    title: '這一卷，不問誰。',
    beats: [
      narrator('符牆上的名字被九尾一個個抹掉，只剩相同的句子反覆出現。'),
      fox('{{name}}，我只問你：每次走到同一個地方，你的手會做什麼？'),
      fox('要進來就自己推門。想停，就說「到這裡」。')
    ]
  });
  rewriteChoicesV54('forbidden', 'forbidden.threshold', [
    ['enter', { label: '我自己推門。', hint: '知道能停，所以才進去。' }],
    ['rule', { label: '先告訴我，怎麼停。', hint: '誘惑可以有，出口不能藏。' }]
  ]);
  rewriteSceneV54('forbidden', 'forbidden.pattern', {
    title: '別找最壞的人。找最熟的那一幕。',
    beats: [
      narrator('四扇小門同時打開。裡面的人都不一樣，轉身離開的姿勢卻一模一樣。'),
      fox('哪一幕，你已經看過不只一次？')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.wrist', {
    title: '我沒有綁緊。',
    beats: [
      narrator('紅線繞過手腕，鬆得一抽就能離開。繩結故意停在你看得到的地方。'),
      fox('別等一個漂亮到所有人都同意的離開理由。現在，你的手要做什麼？')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.bait', {
    title: '她知道你最容易在哪裡鬆口。',
    beats: [
      narrator('九尾貼近，卻偏偏沒有碰你。'),
      fox('想靠近沒有錯。只是下一次心跳很快時，別急著把它叫成答案。'),
      fox('哪一種感覺最容易讓你留下？')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.mask', {
    title: '狐面裡，是你自己的聲音。',
    beats: [
      narrator('面具貼近耳側，裡面反覆說著你曾經講過的「沒關係」。'),
      player('它怎麼會知道？'),
      fox('因為你每次不舒服，都先替別人把理由說完。聽——它又要挑一句了。')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.mirror', {
    title: '鏡子裡，你也會讓別人猜。',
    beats: [
      narrator('鏡中不只九尾。你看見自己沉默、消失、故作不在意，只為等對方先暴露。'),
      fox('別急著罵自己。先承認：害怕失去時，你也會把愛變成考試。')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.threat', {
    title: '四個人。四張臉。同一個瞬間。',
    beats: [
      narrator('冷淡、依賴、失約、在你要走時忽然溫柔。四個人依序轉身。'),
      fox('真正重複的不是那些人。是哪一刻你明明看見了，卻先叫自己不要相信？')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.turn', {
    title: '狐面不是她的。',
    beats: [
      narrator('狐面從九尾手中滑落，沿紅線停在你面前。內側是你的字跡。'),
      fox('我不是要把罪推給你。'),
      fox('我只想讓你認得：不同的人，也可能被你用同一種求安全的方法帶進同一個結局。')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.last-proof', {
    title: '下一次，只換第一個動作。',
    beats: [
      narrator('她沒有收起美貌，也沒有再拿它當答案。'),
      fox('慾望可以留。危險感也可以留。只把第一個熟悉的舊動作換掉。你要換哪一個？')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.heat-trial', {
    title: '最後一寸，她忽然停了。',
    beats: [
      narrator('狐火封住背後。她靠近到呼吸清楚可辨，狐面卻停在你們之間。'),
      fox('如果我現在突然抽離，你第一個動作會是什麼？別想漂亮答案。')
    ]
  });
  rewriteSceneV54('forbidden', 'forbidden.ritual', {
    beats: [fox('別把自己燒乾淨。只留下那個你不想再重演的動作。')]
  });

  Object.assign(forbidden.results.repeat, {
    verdict: '你容易愛上那個「警報終於停了」的瞬間。',
    lines: ['距離一拉開，你就被綁住；對方一靠近，世界忽然安靜。', '高峰很真，卻不能替平靜時的尊重作證。'],
    action: '下一次強烈回流時晚一晚再決定，只看修復有沒有留到熱度退後。',
    caution: '心跳是真的。安全還需要別的證據。'
  });
  Object.assign(forbidden.results.control, {
    verdict: '你把需要藏起來，再用退開測量對方會不會追。',
    lines: ['試探能測出焦慮，測不出理解。', '真正的改變不是更會忍，是把那句想讓對方猜的話直接說出來。'],
    action: '把下一次試探改成一句可回答的需求，說完讓對方自由回答。',
    caution: '讓人猜，會讓兩個人的恐懼一起寫劇本。'
  });
  Object.assign(forbidden.results.avoid, {
    verdict: '你不是不需要靠近。你是怕需要一旦被看見，就能被拒絕。',
    lines: ['所以最接近時，你反而最想消失。', '不用逼自己留下，只要在退以前把真話留在房間。'],
    action: '想消失時先說：「我需要慢一點，但不是不在乎。」',
    caution: '慢是界線；失聯會讓別人替你承受未知。'
  });
  Object.assign(forbidden.results.break, {
    verdict: '你已經認得咒語開始的第一句。這一次不用等到最後一刀。',
    lines: ['真正的斷咒很小，也很早。', '第一個不舒服出現時，就換一個動作。'],
    action: '預先寫下那個新動作：說清楚、延後、求助或離開；舊場景再來時做一次。',
    caution: '看懂模式不是新的罪名，是多一個可以改的地方。'
  });

  // 每一卷的命牒右側改成不同的「九尾演出」，不是五次同一張持筆圖。
  career.destinyVisual = { image: 'assets/images/active/02_career/career_destiny_wide.webp', caption: '她沒有急著寫。先把那枚刻著你名字的棋放在紙邊。', theme: 'career', focus: '50% 50%' };
  life.destinyVisual = { image: 'assets/images/active/03_life/life_destiny_wide.webp', caption: '她讓月光先照過鏡片，才讓第一行字浮上紙面。', theme: 'life', focus: '50% 50%' };
  forbidden.destinyVisual = { image: 'assets/images/active/04_forbidden/forbidden_destiny_wide.webp', caption: '狐面被她壓在桌角。這一次，紙上只留下你自己的動作。', theme: 'forbidden', focus: '50% 50%' };
  love.destinyVisual = { image: 'assets/images/active/01_love/love_destiny_wide.webp', caption: '她提起筆，紅線從筆桿一路垂到紙邊。', theme: 'love', focus: '50% 50%' };

  // --- 第五卷：前四卷伏筆回收。除最後三選一外，不再做額外問卷。 ---
  Object.assign(finaleScene('finale.gate'), {
    kicker: '四卷已封・第五道裂縫',
    title: '牆上，本來沒有第五扇門。',
    beats: [
      narrator('紅線、玄棋、鏡片與狐面同時發熱。四道光沒有指向你，反而一起刺向九尾身後。'),
      narrator('牆面裂開一條細縫。門後沒有字，也沒有卷名。'),
      fox('……不對。'),
      fox('今晚本來沒有第五卷。')
    ]
  });
  Object.assign(finaleScene('finale.relics'), {
    kicker: '第五卷・四痕回流',
    title: '這一次，它們在認她。',
    beats: [
      narrator('紅線先朝九尾手腕收緊；玄棋翻面，沒有刻你的名字；鏡片裡，她的倒影慢了一拍；狐面自己裂開一道細縫。'),
      fox('別碰。'),
      narrator('這是今晚第一次，她不是叫你靠近，而是真的要你停下。')
    ]
  });
  Object.assign(finaleScene('finale.cross'), {
    kicker: '第五卷・不是你的口供',
    title: '四卷一直還在記另一個人。',
    beats: [
      narrator('你以為前四卷只在讀你。現在四件命痕同時轉向九尾。'),
      fox('……我確實讀懂了你。那些判詞沒有作假。'),
      fox('但我漏說了一件事。每次你把真話留在命館，這裡也替我鬆開一道鎖。')
    ],
    choices: []
  });
  Object.assign(finaleScene('finale.confession'), {
    kicker: '第五卷・九尾失言',
    title: '「我確實需要你。」',
    beats: [
      narrator('她第一次沒有隔著桌、鏡或狐火。'),
      fox('起初我讓你走四卷，確實有私心。'),
      fox('後來我怕的卻不是你不替我開門——是門真的開了，你就沒有理由再回來。'),
      narrator('她把你的手帶到封印前，卻在最後一寸自己先停住。')
    ]
  });
  Object.assign(finaleScene('finale.cross').art, { desktop: 'assets/images/active/03_life/life_mirror_mismatch.webp', mobile: 'assets/images/active/03_life/life_mirror_mismatch.webp', side: 'left-top', desktopFocus: '50% 48%', mobileFocus: '50% 28%', heroPresence: 'medium' });
  finaleScene('finale.confession').art.side = 'left-top';
  finaleScene('finale.seal-test').art.side = 'left-top';
  finaleScene('finale.question').art.side = 'left-top';
  finaleScene('finale.choice').art.side = 'left-top';

  // ===== V55：依實機截圖重新校正安全區。文字不能遮住主角、鏡面或主要道具。 =====
  patchRouteArt('life', 'life.last-proof', { side: 'right-bottom' });
  patchRouteArt('life', 'life.result', { side: 'left-bottom' });
  patchRouteArt('career', 'career.stake-trial', { side: 'right-bottom' });
  patchRouteArt('forbidden', 'forbidden.ritual', { side: 'left-top' });
  finaleScene('finale.confession').art.side = 'right-top';

  // 第五卷後段保持右上／左下交替，讓主角與第五印始終有完整舞台。
  finaleScene('finale.seal-test').art.side = 'left-bottom';
  finaleScene('finale.question').art.side = 'left-top';
  finaleScene('finale.choice').art.side = 'left-bottom';


  // ===== V57：回到 V55 穩定視覺，只做已確認的圖文配對、版位與代名詞修正。 =====
  // 新圖只放在它真正能說明劇情的場景；手機仍保留既有直式素材，避免橫圖硬裁。
  patchRouteArt('career', 'career.borrowed', {
    desktop: 'assets/images/active/02_career/career_borrowed_evidence.webp',
    side: 'right-top',
    desktopFocus: '50% 46%',
    heroPresence: 'medium'
  });
  Object.assign(routeScene('career', 'career.borrowed'), {
    title: '成果還在。名字卻被壓到下面。',
    beats: [
      narrator('九尾把成果牌推到你面前。棋盤、卷宗和印記都還在，唯獨你的名字被壓在最底下。'),
      player('所以不是沒人看見？'),
      fox('看見和留下你的名字，是兩回事。你每次把最後一句讓出去，別人就替你把位置坐滿。'),
      narrator('她的指尖停在那枚紅印上，沒有替你翻面。')
    ]
  });

  patchRouteArt('career', 'career.stake-trial', {
    desktop: 'assets/images/active/02_career/career_stake_plan.webp',
    side: 'right-bottom',
    desktopFocus: '50% 48%',
    heroPresence: 'medium'
  });
  Object.assign(routeScene('career', 'career.stake-trial'), {
    title: '只走一手。',
    beats: [
      narrator('九尾把整張盤面攤開，只用指尖點住其中一個位置。'),
      fox('{{period}}內，只選一手。不是做更多，而是做完後，盤面上少一個人能假裝沒看見你。')
    ]
  });

  patchRouteArt('life', 'life.mirror', {
    desktop: 'assets/images/active/03_life/life_cracked_mirror.webp',
    side: 'left-top',
    desktopFocus: '50% 48%',
    heroPresence: 'medium'
  });
  patchRouteArt('life', 'life.double', {
    desktop: 'assets/images/active/03_life/life_mirror_mismatch.webp',
    side: 'left-bottom',
    desktopFocus: '50% 50%',
    heroPresence: 'medium'
  });
  Object.assign(routeScene('life', 'life.double'), {
    title: '她已經轉身。鏡裡的她沒有。',
    beats: [
      narrator('九尾朝月色轉過身。古鏡裡的她卻仍面向你，掌心纏著一條鏡外不存在的紅線。'),
      player('……她還在看我。'),
      fox('什麼？'),
      narrator('你再看回鏡面時，那雙眼睛才慢了一拍移開。九尾沒有回頭。')
    ]
  });

  patchRouteArt('forbidden', 'forbidden.result', {
    desktop: 'assets/images/active/04_forbidden/forbidden_mask_verdict_wide.webp',
    side: 'left-top',
    desktopFocus: '58% 45%',
    heroPresence: 'large'
  });

  // 第五卷：先讓四卷痕跡真正同框，再讓第五印在九尾面前失控形成。
  Object.assign(finaleScene('finale.relics').art, {
    desktop: 'assets/images/active/05_fifth/finale_four_relics.webp',
    mobile: 'assets/images/active/05_fifth/finale_four_relics.webp',
    side: 'left-top',
    desktopFocus: '50% 48%',
    mobileFocus: '50% 30%',
    heroPresence: 'medium'
  });
  Object.assign(finaleScene('finale.relics'), {
    kicker: '第五卷・四痕回流',
    title: '四卷留下的東西，同時回來了。',
    beats: [
      narrator('紅線、玄棋、鏡片與狐面依序浮起。它們沒有彼此碰觸，卻同時朝九尾偏轉。'),
      fox('……等等。'),
      narrator('她第一次沒有立刻替你解釋。')
    ]
  });

  Object.assign(finaleScene('finale.verdicts').art, {
    desktop: 'assets/images/active/05_fifth/finale_uncontrolled.webp',
    mobile: 'assets/images/active/05_fifth/finale_uncontrolled.webp',
    side: 'left-top',
    desktopFocus: '50% 48%',
    mobileFocus: '50% 30%',
    heroPresence: 'medium'
  });
  Object.assign(finaleScene('finale.verdicts'), {
    kicker: '真命卷・四卷互證',
    title: '這一次，它們在認她。'
  });

  // 最新實機回饋：第五問的近景人物不能被文字蓋住。
  finaleScene('finale.question').art.side = 'left-top';

  // V58：以 V55 的穩定視覺為基底。命牒採滿版九尾場景＋左側大命牒，不再做左右硬切版型。
  // 三種結局的背景全部指向實際存在且語意相符的正式素材。
  Object.assign(finale.endings.complete.art, {
    desktop: 'assets/images/active/05_fifth/final_complete_dawn.webp',
    mobile: 'assets/images/active/05_fifth/final_complete_dawn.webp',
    side: 'right-top', desktopFocus: '48% 48%', mobileFocus: '44% 28%'
  });
  Object.assign(finale.endings['scroll-only'].art, {
    desktop: 'assets/images/active/05_fifth/finale_destiny.webp',
    mobile: 'assets/images/active/05_fifth/finale_destiny.webp',
    side: 'left-top', desktopFocus: '50% 50%', mobileFocus: '50% 34%'
  });
  Object.assign(finale.endings.refuse.art, {
    desktop: 'assets/images/active/05_fifth/final_refuse_room.webp',
    mobile: 'assets/images/active/05_fifth/final_refuse_room.webp',
    side: 'left-top', desktopFocus: '50% 50%', mobileFocus: '50% 42%', heroPresence: 'empty'
  });


  // ===== V58 FINAL VISUAL LOCK =====
  // 交付前最終鎖定：同一幕的故事、圖片、文字安全區與角色比例必須一致。
  // 不再由舊版通用補丁覆蓋這些人工逐幕校正。
  Object.assign(routeScene('love', 'love.evidence').art, { side: 'left-bottom', desktopFocus: '50% 50%', heroPresence: 'large' });
  Object.assign(routeScene('love', 'love.ritual').art, { side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium' });
  Object.assign(routeScene('love', 'love.pulse-trial').art, {
    desktop: 'assets/images/active/01_love/love_012.webp', side: 'right-bottom', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(routeScene('love', 'love.ending').art, {
    desktop: 'assets/images/active/01_love/love_016.webp', side: 'right-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.love.variantArt.mutual, {
    desktop: 'assets/images/active/01_love/love_011.webp', mobile: 'assets/images/active/01_love/love_011.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '43% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.love.variantArt.projection, {
    desktop: 'assets/images/active/01_love/love_017.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.love.variantArt.alone, {
    desktop: 'assets/images/active/01_love/love_024.webp', side: 'right-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });

  Object.assign(routeScene('career', 'career.black-piece').art, {
    desktop: 'assets/images/active/02_career/career_002.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(routeScene('career', 'career.last-proof').art, {
    desktop: 'assets/images/active/02_career/career_001.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });

  Object.assign(routeScene('life', 'life.mirror').art, { side: 'left-bottom', desktopFocus: '50% 50%', heroPresence: 'medium' });
  Object.assign(routeScene('life', 'life.double').art, { side: 'right-bottom', desktopFocus: '50% 50%', heroPresence: 'medium' });
  Object.assign(routeScene('life', 'life.turn').art, { side: 'right-bottom', desktopFocus: '50% 50%', heroPresence: 'medium' });
  Object.assign(routeScene('life', 'life.last-proof').art, {
    desktop: 'assets/images/active/03_life/life_009.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(routeScene('life', 'life.body-trial').art, {
    desktop: 'assets/images/active/03_life/life_016.webp', mobile: 'assets/images/active/03_life/life_016.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '64% 28%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.life.variantArt.restore, {
    desktop: 'assets/images/active/03_life/life_008.webp', mobile: 'assets/images/active/03_life/life_008.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '65% 30%', heroPresence: 'medium'
  });

  Object.assign(routeScene('forbidden', 'forbidden.ritual').art, {
    desktop: 'assets/images/active/04_forbidden/forbidden_007.webp', side: 'right-bottom', desktopFocus: '50% 50%', heroPresence: 'large'
  });

  Object.assign(finaleScene('finale.gate').art, {
    desktop: 'assets/images/active/05_fifth/ending_003.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(finaleScene('finale.relics').art, {
    desktop: 'assets/images/active/05_fifth/finale_four_relics.webp', side: 'left-top', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(finaleScene('finale.verdicts').art, {
    desktop: 'assets/images/active/05_fifth/finale_uncontrolled.webp', side: 'left-bottom', desktopFocus: '50% 50%', heroPresence: 'large'
  });
  Object.assign(finaleScene('finale.cross').art, {
    desktop: 'assets/images/active/03_life/life_mirror_mismatch.webp', side: 'right-bottom', desktopFocus: '50% 50%', heroPresence: 'medium'
  });
  Object.assign(finaleScene('finale.question').art, {
    side: 'left-top', desktopFocus: '50% 57%', heroPresence: 'large'
  });
  Object.assign(finaleScene('finale.withdrawal').art, {
    desktop: 'assets/images/active/05_fifth/final_refuse_room.webp', mobile: 'assets/images/active/05_fifth/final_refuse_room.webp',
    side: 'left-top', desktopFocus: '50% 50%', mobileFocus: '50% 42%', heroPresence: 'empty'
  });

  // V58 mobile/reaction visual lock: avoid repeating the same illustration on several pages.
  Object.assign(routeScene('love', 'love.proximity').art, {
    mobile: 'assets/images/active/01_love/LOVE_close_reach_v44.webp', mobileFocus: '58% 22%'
  });
  Object.assign(routeScene('love', 'love.pulse-trial').art, {
    mobile: 'assets/images/active/01_love/love_012.webp', mobileFocus: '47% 25%'
  });
  Object.assign(routeScene('love', 'love.silence').art, {
    mobile: 'assets/images/active/01_love/love_015.webp', mobileFocus: '61% 24%'
  });
  Object.assign(routeScene('love', 'love.ritual').art, {
    mobile: 'assets/images/active/08_props/FX_004.png', mobileFocus: '50% 50%'
  });
  Object.assign(routeScene('love', 'love.ending').art, {
    mobile: 'assets/images/active/01_love/love_016.webp', mobileFocus: '57% 24%'
  });
  const loveFaceWithdraw = routeScene('love', 'love.face').choices.find(item => item.id === 'withdraw-hand');
  if (loveFaceWithdraw?.reactionArt) Object.assign(loveFaceWithdraw.reactionArt, {
    desktop: 'assets/images/active/01_love/love_019.webp', mobile: 'assets/images/active/01_love/love_019.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '58% 25%', heroPresence: 'medium'
  });

  Object.assign(routeScene('career', 'career.exchange').art, {
    mobile: 'assets/images/active/02_career/career_003.webp', mobileFocus: '50% 28%'
  });
  Object.assign(routeScene('career', 'career.borrowed').art, {
    mobile: 'assets/images/active/02_career/career_borrowed_evidence.webp', mobileFocus: '52% 28%'
  });
  Object.assign(routeScene('career', 'career.result').art, {
    mobile: 'assets/images/active/02_career/career_new_02.webp', mobileFocus: '56% 24%'
  });
  Object.assign(routeScene('career', 'career.ending').art, {
    mobile: 'assets/images/active/08_props/FX_empty_gate.png', mobileFocus: '50% 42%'
  });

  Object.assign(routeScene('life', 'life.room').art, {
    mobile: 'assets/images/active/03_life/LIFE_wet_corridor_v44.webp', mobileFocus: '66% 24%'
  });
  Object.assign(routeScene('life', 'life.mirror').art, {
    mobile: 'assets/images/active/03_life/life_cracked_mirror.webp', mobileFocus: '53% 26%'
  });
  Object.assign(routeScene('life', 'life.turn').art, {
    mobile: 'assets/images/active/03_life/life_mirror_double_face.webp', mobileFocus: '53% 24%'
  });
  Object.assign(routeScene('life', 'life.last-proof').art, {
    mobile: 'assets/images/active/03_life/life_009.webp', mobileFocus: '62% 26%'
  });
  Object.assign(routeScene('life', 'life.result').art, {
    mobile: 'assets/images/active/03_life/life_014.webp', mobileFocus: '55% 24%'
  });
  Object.assign(routeScene('life', 'life.ritual').art, {
    mobile: 'assets/images/active/03_life/LIFE_broken_mirror_v44.webp', mobileFocus: '55% 25%'
  });

  Object.assign(routeScene('forbidden', 'forbidden.threat').art, {
    mobile: 'assets/images/active/04_forbidden/FORBIDDEN_03_neck_shadow_threat_mobile.webp', mobileFocus: '50% 18%'
  });
  Object.assign(routeScene('forbidden', 'forbidden.turn').art, {
    mobile: 'assets/images/active/04_forbidden/FORBIDDEN_dark_gaze_v44.webp', mobileFocus: '53% 22%'
  });
  Object.assign(routeScene('forbidden', 'forbidden.last-proof').art, {
    mobile: 'assets/images/active/04_forbidden/FORBIDDEN_seated_bait_v44.webp', mobileFocus: '55% 24%'
  });
  Object.assign(routeScene('forbidden', 'forbidden.ritual').art, {
    mobile: 'assets/images/active/04_forbidden/forbidden_007.webp', mobileFocus: '58% 24%'
  });

  // V58 branch/mobile uniqueness lock: no ordinary scene should repeat an earlier illustration.
  Object.assign(branchTrials.career.variantArt.visible, {
    desktop: 'assets/images/active/02_career/career_007.webp', mobile: 'assets/images/active/02_career/career_007.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '66% 27%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.career.variantArt.stuck, {
    desktop: 'assets/images/active/02_career/career_005.webp', mobile: 'assets/images/active/02_career/career_005.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '40% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.career.variantArt.move, {
    desktop: 'assets/images/active/02_career/career_012.webp', mobile: 'assets/images/active/02_career/career_012.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '50% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.life.variantArt.boundary, {
    desktop: 'assets/images/active/03_life/life_013.webp', mobile: 'assets/images/active/03_life/life_013.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '40% 25%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.forbidden.variantArt.repeat, {
    desktop: 'assets/images/active/04_forbidden/forbidden_012.webp', mobile: 'assets/images/active/04_forbidden/forbidden_012.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '35% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.forbidden.variantArt.avoid, {
    desktop: 'assets/images/active/04_forbidden/forbidden_022.webp', mobile: 'assets/images/active/04_forbidden/forbidden_022.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '35% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.forbidden.variantArt.break, {
    desktop: 'assets/images/active/04_forbidden/forbidden_new_03.webp', mobile: 'assets/images/active/04_forbidden/forbidden_new_03.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '45% 25%', heroPresence: 'medium'
  });

  // Mobile scene mapping follows the same semantic art as desktop unless a dedicated crop is clearly better.
  Object.assign(routeScene('love', 'love.turn').art, {
    mobile: 'assets/images/active/01_love/love_003.webp', mobileFocus: '56% 24%'
  });
  Object.assign(branchTrials.love.variantArt.alone, {
    mobile: 'assets/images/active/01_love/love_024.webp', mobileFocus: '58% 24%'
  });

  Object.assign(routeScene('career', 'career.black-piece').art, {
    mobile: 'assets/images/active/02_career/career_002.webp', mobileFocus: '58% 24%'
  });
  Object.assign(routeScene('career', 'career.last-proof').art, {
    mobile: 'assets/images/active/02_career/career_001.webp', mobileFocus: '58% 24%'
  });

  Object.assign(routeScene('life', 'life.ending').art, {
    mobile: 'assets/images/active/08_props/FX_empty_mirror_hall.png', mobileFocus: '50% 44%'
  });
  Object.assign(branchTrials.life.variantArt.transition, {
    mobile: 'assets/images/active/03_life/life_new_02.webp', mobileFocus: '55% 25%'
  });

  Object.assign(routeScene('forbidden', 'forbidden.bait').art, {
    mobile: 'assets/images/active/04_forbidden/FORBIDDEN_soft_bait_v44.webp', mobileFocus: '56% 24%'
  });
  Object.assign(routeScene('forbidden', 'forbidden.heat-trial').art, {
    mobile: 'assets/images/active/04_forbidden/FORBIDDEN_mask.webp', mobileFocus: '56% 23%'
  });
  Object.assign(routeScene('forbidden', 'forbidden.result').art, {
    mobile: 'assets/images/active/04_forbidden/forbidden_mask_verdict_wide.webp', mobileFocus: '55% 25%'
  });

  Object.assign(finaleScene('finale.gate').art, {
    mobile: 'assets/images/active/05_fifth/ending_003.webp', mobileFocus: '55% 25%'
  });
  Object.assign(finaleScene('finale.question').art, {
    mobile: 'assets/images/active/07_shared/SHARED_close.webp', mobileFocus: '58% 20%'
  });

  // V58 final duplicate-prevention lock for reactions and mobile crops.
  Object.assign(branchTrials.forbidden.variantArt.control, {
    desktop: 'assets/images/active/04_forbidden/forbidden_new_01.webp', mobile: 'assets/images/active/04_forbidden/forbidden_new_01.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '62% 22%', heroPresence: 'large'
  });

  const loveFaceTouch = routeScene('love', 'love.face').choices.find(item => item.id === 'touch-cheek');
  if (loveFaceTouch?.reactionArt) Object.assign(loveFaceTouch.reactionArt, {
    mobile: loveFaceTouch.reactionArt.desktop, mobileFocus: '58% 21%'
  });
  const loveFacePause = routeScene('love', 'love.face').choices.find(item => item.id === 'stop-before-lips');
  if (loveFacePause?.reactionArt) Object.assign(loveFacePause.reactionArt, {
    mobile: loveFacePause.reactionArt.desktop, mobileFocus: '58% 20%'
  });

  // If a mobile verification image would repeat the branch image the player just saw,
  // use the distinct verification desktop artwork and crop it deliberately instead.
  const distinctReactionMobile = [
    ['love', 0, '50% 24%'], ['love', 1, '50% 24%'], ['love', 2, '50% 24%'],
    ['career', 1, '50% 24%'],
    ['life', 2, '50% 24%'],
    ['forbidden', 0, '50% 24%'], ['forbidden', 1, '50% 24%']
  ];
  distinctReactionMobile.forEach(([routeId, index, mobileFocus]) => {
    const reactionArt = branchTrials[routeId]?.choices?.[index]?.reactionArt;
    if (reactionArt?.desktop) Object.assign(reactionArt, { mobile: reactionArt.desktop, mobileFocus });
  });
  Object.assign(routeScene('forbidden', 'forbidden.mask').art, {
    mobile: routeScene('forbidden', 'forbidden.mask').art.desktop, mobileFocus: '55% 22%'
  });

  // V58 high-resolution branch lock: keep result art sharp and semantically distinct.
  Object.assign(branchTrials.love.variantArt.reclaim, {
    desktop: 'assets/images/active/01_love/love_017.webp', mobile: 'assets/images/active/01_love/love_017.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '60% 25%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.love.variantArt.projection, {
    desktop: 'assets/images/active/01_love/love_009.webp', mobile: 'assets/images/active/01_love/love_009.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '58% 24%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.career.variantArt.borrowed, {
    desktop: 'assets/images/active/02_career/career_009.webp', mobile: 'assets/images/active/02_career/career_009.webp',
    side: 'right-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '58% 25%', heroPresence: 'medium'
  });

  // V58 final panel-safe lock: text never covers the heroine or the action that carries the scene.
  Object.assign(branchTrials.career.variantArt.borrowed, { side: 'left-top', desktopFocus: '50% 50%' });
  Object.assign(branchTrials.life.variantArt.drain, {
    desktop: 'assets/images/active/03_life/life_002.webp', mobile: 'assets/images/active/03_life/life_002.webp',
    side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '62% 28%', heroPresence: 'medium'
  });
  Object.assign(branchTrials.life.variantArt.transition, { side: 'left-top', desktopFocus: '50% 50%' });

  // V58 story/image semantic lock: words must describe what the picture is actually showing.
  const fifthGate = finaleScene('finale.gate');
  fifthGate.title = '四道門之外，多了一道沒有名字的鳥居。';
  fifthGate.beats = [
    narrator('紅線、玄棋、鏡片與狐面同時發熱。四道光沒有指向你，反而一起偏向九尾身後。'),
    narrator('她回頭時，夜色裡多出一列原本不存在的鳥居。最深處沒有卷名，只有一道細光。'),
    fox('「……不對。」'),
    fox('「今晚本來沒有第五卷。」')
  ];

  const fifthConfession = finaleScene('finale.confession');
  fifthConfession.beats = [
    narrator('她沒有再隔著桌、鏡或狐火。反而側身倚回榻上，第一次把那份從容放得很低。'),
    fox('「我確實需要你。」'),
    fox('「起初讓你走四卷，我有私心。後來我怕的卻不是你不替我開門——是門真的開了，你就沒有理由再回來。」'),
    narrator('她沒有伸手拉你。只是看著你，讓那句話自己留在兩人之間。')
  ];

  // The body-trial now uses an image where she actually holds a mirror, so the action and visual agree.
  const bodyTrial = routeScene('life', 'life.body-trial');
  bodyTrial.title = '鏡面只照你最先緊繃的地方。';
  bodyTrial.beats = [
    narrator('她把小鏡舉到月光下，鏡光沒有替你找病名，只在你每次勉強自己時最先收緊的位置停了一下。'),
    fox('狐火不替醫師看病。若不適持續，就去找真正能幫你的人。'),
    fox('今晚我只問：那個訊號一出現，你還要多撐多久，才肯相信自己？')
  ];

  window.SHRINE_STORY = {
    version: 58,
    routeOrder: ['love', 'career', 'life', 'forbidden'],
    routes: { love, career, life, forbidden },
    finale,
    periodFrames,
    speakers: { fox: '九尾', narrator: '', player: '你', oracle: '命卷' },
    cover: {
      art: art(v47('OPENING_01_door_eyes_desktop'), v47('OPENING_01_door_eyes_mobile'), 'left-top', '50% 18%', '50% 12%', '雨夜門縫', 'bottom', { heroPresence: 'medium' })
    },
    intake: [
      {
        id: 'intake.age', type: 'age-gate', phase: '門縫', kicker: '九尾之契・成年門檻', title: '門縫裡，只有一隻眼睛。',
        art: art(v47('OPENING_01_door_eyes_desktop'), v47('OPENING_01_door_eyes_mobile'), 'left-top', '50% 18%', '50% 12%', '九尾在門縫確認來客', 'bottom', { heroPresence: 'large' }),
        beats: [fox('很好。這座命館不替未成年的客人落筆。'), fox('若你還沒成年，現在鬆手。我不會記住你。')]
      },
      {
        id: 'intake.name', type: 'profile-name', phase: '入館', kicker: '九尾之契・第一道脈', title: '「先別給我真名。」',
        art: art(v47('OPENING_02_pulse_alias_desktop'), v47('OPENING_02_pulse_alias_mobile'), 'right-top', '50% 16%', '50% 13%', '九尾握住玩家手腕寫下假名', 'bottom', { heroPresence: 'large' }),
        beats: [narrator('她握住你的手腕，拇指壓在脈搏上；另一根手指慢慢沿著掌心寫字。'), fox('給我一個今晚能貼著你耳邊叫的名字。叫到它時，你要記得回頭。')]
      },
      {
        id: 'intake.birth', type: 'profile-birth', phase: '起盤', kicker: '九尾之契・第二道脈', title: '她把三枚銅錢推到你指下。',
        art: art(v49('birth_coin_desktop'), v46('HOME_01_coin_pause_mobile'), 'left-top', '58% 24%', '50% 16%', '三枚銅錢起盤', 'bottom', { heroPresence: 'large' }),
        beats: [fox('{{name}}，年、月、日一枚一枚來。別急，我想看每一枚落下後，你的命氣先往哪裡偏。')]
      },
      {
        id: 'intake.horizon', type: 'profile-horizon', phase: '問期', kicker: '九尾之契・第三道脈', title: '「你要我陪你看到哪裡？」',
        art: art('assets/images/active/08_props/fx_006.webp', v46('HOME_03_fivearts_overview_mobile'), 'left-top', '51% 18%', '50% 16%', '五術問期', 'bottom', { heroPresence: 'medium' }),
        beats: [fox('七天，能驗一個動作；一個月，能看一次靠近有沒有留下；三個月，才看得出你是否真的換了走法。別選好聽的，選你願意回來對答案的距離。')]
      },
      {
        id: 'intake.omen', type: 'profile-omen', phase: '狐火', kicker: '九尾之契・盲選', title: '三團狐火，只准憑直覺碰一團。',
        art: art(v46('RITUAL_01_three_foxes_desktop'), 'assets/images/active/00_home/RITUAL_01_three_foxes_mobile.webp', 'left-top', '51% 18%', '50% 16%', '三狐盲選', 'bottom', { heroPresence: 'large' }),
        beats: [narrator('蒼、幽、血三色狐火浮在水面。她沒有解釋象徵，只觀察你的手先往哪裡動。')]
      }
    ],
    hub: {
      art: art('assets/images/active/00_home/HUB_four_doors_desktop_v44.webp', 'assets/images/active/00_home/HUB_four_doors_mobile_v44.webp', 'bottom', '50% 50%', '50% 33%', '四道實門')
    },
    scrollArt: art(v49('final_scroll_desktop'), 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp', 'bottom', '50% 50%', '50% 55%', '九尾將命牒完全展開', 'bottom', { heroPresence: 'large', scrollBoxDesktop: { x: .37, y: .66, w: .46, h: .18, rotate: 0 }, scrollBoxMobile: { x: .22, y: .64, w: .56, h: .20, rotate: 0 } }),
    totalScrollArt: art(v49('final_scroll_desktop'), 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp', 'bottom', '50% 50%', '50% 55%', '九尾親手書寫總命牒', 'bottom', { heroPresence: 'large', scrollBoxDesktop: { x: .24, y: .70, w: .52, h: .16, rotate: 0 }, scrollBoxMobile: { x: .22, y: .64, w: .56, h: .20, rotate: 0 } }),
    palettes: {
      none: { accent: '#ee668e', rgb: '238, 102, 142' },
      love: { accent: love.accent, rgb: love.rgb },
      career: { accent: career.accent, rgb: career.rgb },
      life: { accent: life.accent, rgb: life.rgb },
      forbidden: { accent: forbidden.accent, rgb: forbidden.rgb },
      finale: { accent: finale.accent, rgb: finale.rgb }
    }
  };
})();
