(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  if (!STORY?.routes || !STORY?.finale) {
    console.warn('[Interaction V1] SHRINE_STORY 尚未載入，略過互動覆寫。');
    return;
  }

  const findRouteScene = (routeId, sceneId) =>
    STORY.routes?.[routeId]?.scenes?.find(scene => scene?.id === sceneId) || null;

  const findFinaleScene = sceneId =>
    STORY.finale?.scenes?.find(scene => scene?.id === sceneId) || null;

  const findChoice = (scene, choiceId) =>
    scene?.choices?.find(choice => choice?.id === choiceId) || null;

  const cloneArt = (base, patch = {}) => ({ ...(base || {}), ...patch });

  // ---------------------------------------------------------------------------
  // 緣卷｜文圖動作一致
  // ---------------------------------------------------------------------------
  {
    const scene = findRouteScene('love', 'love.silence');
    if (scene) {
      scene.title = '你沒有伸手。另一端會自己接回來嗎？';
      scene.beats = [
        { speaker: 'narrator', text: '紅線忽然熄滅。你沒有伸手去把它接回來；幾秒後，遠處那一端只亮回一小截。' },
        { speaker: 'fox', text: '「先別把亮起叫成修復。我只看另一個人有沒有真的把關係往前接。」' }
      ];
    }
  }

  // 原本選項寫「停在唇前」，但現有反應圖的手勢落在眼下／臉側。
  // 不再硬把錯圖叫成唇前：改成「停在臉前、不碰」，保留真正的行為差異。
  {
    const scene = findRouteScene('love', 'love.face');
    const touch = findChoice(scene, 'touch-cheek');
    const pause = findChoice(scene, 'stop-before-lips');
    const withdraw = findChoice(scene, 'withdraw-hand');

    if (scene) {
      scene.kicker = '緣之卷・臉前一寸';
      scene.title = '她把距離交給你。';
      scene.beats = [
        { speaker: 'narrator', text: '她牽起你的手，停在自己臉前。最後那一寸，她沒有替你完成。' },
        { speaker: 'fox', text: '「別先討好我。碰、停、收回——你第一個動作，比答案誠實。」' }
      ];
    }

    if (touch) {
      touch.label = '指尖碰她的臉頰';
      touch.hint = '直接碰到，確認她有沒有退開。';
      touch.reaction = [
        { speaker: 'narrator', text: '指腹碰上她的臉頰。她沒有迎上來，只把重量很輕地留在那裡。' },
        { speaker: 'fox', text: '「想確認就碰。但別把我沒有躲，提前翻譯成永遠。」' }
      ];
      if (touch.reactionArt) {
        touch.reactionArt.mobile = 'assets/images/active/01_love/love_face_touch.webp';
        touch.reactionArt.mobileFocus = '50% 24%';
        touch.reactionArt.galleryTitle = '臉頰回應';
      }
    }

    if (pause) {
      pause.label = '停在她臉前，不碰';
      pause.hint = '承認想靠近，但把最後一寸留給她。';
      pause.reaction = [
        { speaker: 'narrator', text: '你的手停在她眼下與臉側前方，沒有碰上去。她也沒有追著你的指尖靠近。' },
        { speaker: 'fox', text: '「會停，不代表退縮。你是在看——另一個人會不會也走自己的那一步。」' }
      ];
      if (pause.reactionArt) {
        pause.reactionArt.mobile = 'assets/images/active/01_love/LOVE_lips_mobile.webp';
        pause.reactionArt.mobileFocus = '50% 22%';
        pause.reactionArt.galleryTitle = '臉前停手';
      }
    }

    if (withdraw) {
      withdraw.label = '碰到以前，把手收回';
      withdraw.hint = '不讓心跳替你把靠近寫成承諾。';
    }
  }

  // 業卷借名：把「成果仍在、署名被換」講清楚。
  {
    const scene = findRouteScene('career', 'career.borrowed');
    if (scene) {
      scene.title = '成果還是你的。署名卻換成了別人。';
      scene.beats = [
        { speaker: 'narrator', text: '棋盤、卷宗與成果牌一樣不少；你做過的那一格還亮著，最上面的名字卻不是你。' },
        { speaker: 'player', text: '所以不是沒人看見？' },
        { speaker: 'fox', text: '「看見，和把名字留給你，是兩回事。你每次把最後一句讓出去，別人就替你把位置坐滿。」' }
      ];
    }
  }

  // ---------------------------------------------------------------------------
  // 禁卷｜把心理問卷感改成「四象判讀」，所有四選題桌機固定 2×2。
  // ---------------------------------------------------------------------------
  ['forbidden.pattern', 'forbidden.bait', 'forbidden.mask', 'forbidden.threat', 'forbidden.last-proof'].forEach(sceneId => {
    const scene = findRouteScene('forbidden', sceneId);
    if (scene?.choices?.length === 4) scene.layout = 'split';
  });

  {
    const scene = findRouteScene('forbidden', 'forbidden.pattern');
    if (scene) {
      scene.kicker = '禁之卷・四象認痕';
      scene.title = '哪一道命痕，總會換個人再出現？';
      scene.beats = [
        { speaker: 'narrator', text: '不同的名字在四道門後輪流轉身。九尾沒有問誰傷你最深，只把重複的動作留在燈下。' },
        { speaker: 'fox', text: '「禁卷不抓兇手，只認重演。選你最熟的那一象。」' }
      ];
    }
  }

  {
    const scene = findRouteScene('forbidden', 'forbidden.bait');
    if (scene) {
      scene.kicker = '禁之卷・近火四象';
      scene.title = '哪一種命感，最容易讓你把警報聽成心跳？';
      scene.beats = [
        { speaker: 'narrator', text: '九尾靠近，卻刻意停在不碰你的距離。這一問不算你喜歡誰，只算哪種感覺最容易偷走判斷。' },
        { speaker: 'fox', text: '「強烈不是凶兆，依賴也不是。真正要看的，是你在哪一種感覺裡最容易把選擇權交出去。」' },
        { speaker: 'oracle', text: '禁判｜選最像你過去的，不選最好聽的。' }
      ];

      const patches = {
        desired: {
          label: '欲象｜被強烈渴望',
          hint: '強度一高，你就暫時不懷疑自己。',
          reaction: [{ speaker: 'fox', text: '「禁判・欲象。被要得很急，和被放得很穩，是兩種命。」' }]
        },
        needed: {
          label: '需象｜被需要、被依賴',
          hint: '有用，讓你覺得自己不會被丟下。',
          reaction: [{ speaker: 'fox', text: '「禁判・需象。若靠近只在你供應時存在，它要的可能是功能，不是你。」' }]
        },
        mystery: {
          label: '迷象｜若即若離',
          hint: '不確定讓注意力被綁得更緊。',
          reaction: [{ speaker: 'fox', text: '「禁判・迷象。焦慮最像心動的時候，也最容易把你留在門口。」' }]
        },
        rescue: {
          label: '救象｜只有我懂對方',
          hint: '拯救感讓不平衡看起來像深情。',
          reaction: [{ speaker: 'fox', text: '「禁判・救象。理解不是無限責任，更不是拿自己去填別人的缺口。」' }]
        }
      };
      Object.entries(patches).forEach(([id, patch]) => {
        const item = findChoice(scene, id);
        if (item) Object.assign(item, patch);
      });
    }
  }

  // 禁卷判讀畫面不需要「霧化審判室」感；保持正式結果圖清晰，文字只靠局部暗部閱讀。
  {
    const scene = findRouteScene('forbidden', 'forbidden.result');
    if (scene?.art) {
      Object.assign(scene.art, {
        side: 'left-top',
        mobileSide: 'bottom',
        desktopFocus: '50% 50%',
        mobileFocus: '50% 34%',
        galleryTitle: '禁卷・九尾判讀'
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 第五卷
  // ---------------------------------------------------------------------------
  {
    const scene = findFinaleScene('finale.cross');
    if (scene?.art) {
      Object.assign(scene.art, {
        desktop: 'assets/images/active/05_fifth/finale_four_relics.webp',
        mobile: 'assets/images/active/05_fifth/finale_four_relics.webp',
        desktopFocus: '52% 48%',
        mobileFocus: '52% 34%',
        galleryTitle: '第五卷・四痕反證',
        heroPresence: 'medium',
        needsDedicatedArt: true
      });
    }
  }

  // 緣卷封線：三個選擇至少使用三種不同視覺語意。
  {
    const scene = findRouteScene('love', 'love.ritual');
    if (scene?.art && Array.isArray(scene.choices)) {
      const unknotted = findChoice(scene, 'unknotted');
      const mirrorCut = findChoice(scene, 'mirror-cut');
      const doorKnot = findChoice(scene, 'door-knot');

      if (unknotted) {
        unknotted.reactionArt = cloneArt(scene.art, {
          desktop: 'assets/images/active/01_love/LOVE_VERIFY_03_release_or_hold_desktop.webp',
          mobile: 'assets/images/active/01_love/LOVE_VERIFY_03_release_or_hold_mobile.webp',
          side: 'left-top', mobileSide: 'bottom',
          desktopFocus: '52% 48%', mobileFocus: '50% 25%',
          galleryTitle: '封線反應・腕線鬆開', heroPresence: 'medium'
        });
      }
      if (mirrorCut) {
        mirrorCut.reactionArt = cloneArt(scene.art, {
          desktop: 'assets/images/active/01_love/LOVE_empty_threads.webp',
          mobile: 'assets/images/active/01_love/love_020.webp',
          side: 'left-top', mobileSide: 'bottom',
          desktopFocus: '50% 46%', mobileFocus: '50% 24%',
          galleryTitle: '封線反應・鏡前斷線', heroPresence: 'empty'
        });
      }
      if (doorKnot) {
        doorKnot.reactionArt = cloneArt(scene.art, {
          galleryTitle: '封線反應・門環留線',
          desktopFocus: '62% 49%', mobileFocus: '50% 32%'
        });
      }
    }
  }

  // 真命卷第五印：真正兩選一行為試探。
  {
    const scene = findFinaleScene('finale.seal-test');
    if (scene?.art) {
      delete scene.type;
      scene.layout = 'ritual';
      scene.beats = [
        { speaker: 'narrator', text: '四卷殘痕在她身前合成第五印。狐火猛地亮起，像在催你立刻把手按下去。' },
        { speaker: 'fox', text: '「別碰。」' },
        { speaker: 'oracle', text: '真命判｜這一問不看你救不救她，只看你能不能在最想立刻做點什麼時，仍保留自己的手。' },
        { speaker: 'narrator', text: '她自己退了半步。這一次，命館不替你決定要不要靠近。' }
      ];
      scene.choices = [
        {
          id: 'hover-seal',
          label: '把手停在第五印前。',
          hint: '不碰，只看它會不會自己逼近。',
          reaction: [
            { speaker: 'narrator', text: '你的手停在光外。第五印往前顫了一下，卻沒有越過你留下的距離。' },
            { speaker: 'fox', text: '「很好。想靠近，和替我完成，是兩件事。」' }
          ],
          effects: { behavior: { restraint: 2, agency: 1 } },
          reactionArt: cloneArt(scene.art, {
            galleryTitle: '第五印・停在光外', desktopFocus: '56% 34%', mobileFocus: '50% 34%', needsDedicatedArt: true
          })
        },
        {
          id: 'withdraw-seal',
          label: '把手收回來。',
          hint: '不替她，也不替狐火做決定。',
          reaction: [
            { speaker: 'narrator', text: '你把手收回。狐火沒有追上來，九尾也沒有再把你的手牽回去。' },
            { speaker: 'fox', text: '「這才像你自己的手。」' }
          ],
          effects: { behavior: { agency: 2, restraint: 1 } },
          reactionArt: cloneArt(scene.art, {
            galleryTitle: '第五印・收回自己的手', desktopFocus: '57% 31%', mobileFocus: '50% 31%', needsDedicatedArt: true
          })
        }
      ];
    }
  }

  // Finale 三分支真正留下不同後果。
  {
    const endings = STORY.finale.endings || {};
    if (endings.complete) {
      Object.assign(endings.complete, {
        line: '第五印真正落下時，狐火沒有爆開，反而一盞盞熄成普通晨光。她站在門前，第一次沒有任何鎖鏈替她決定留下或離開。',
        actor: '「原來自由不是門開了就知道往哪走。別替我選……讓我自己走第一步。」'
      });
      endings.complete.art = cloneArt(endings.complete.art, {
        desktop: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        mobile: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '54% 42%', mobileFocus: '50% 30%',
        galleryTitle: '第五印完成・門外初光', heroPresence: 'large'
      });
    }
    if (endings['scroll-only']) {
      Object.assign(endings['scroll-only'], {
        line: '第五印離開她的身體，落在命牒最後一頁。封印沒有替她解開，你也沒有把新的選擇強加到她身上。兩個人第一次只是站在同一個答案前。',
        actor: '「你肯幫我，卻不替我決定。這比直接救我更難欠。」'
      });
      endings['scroll-only'].art = cloneArt(endings['scroll-only'].art, {
        desktop: 'assets/images/active/05_fifth/final_scroll_desktop.webp',
        mobile: 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '50% 33%',
        galleryTitle: '第五印只留命牒', heroPresence: 'large'
      });
    }
    if (endings.refuse) {
      Object.assign(endings.refuse, {
        line: '你抽回手。第五印停在半空，距離重新長回你們之間。九尾沒有追，也沒有讓紅線替她求你。門內只剩那個由你親手保留下來的「不」。',
        actor: '「你終於沒有因為誰需要，就立刻把自己交出去。這一次，我不追。」'
      });
      endings.refuse.art = cloneArt(endings.refuse.art, {
        desktop: 'assets/images/active/05_fifth/final_refuse_room.webp',
        mobile: 'assets/images/active/05_fifth/final_refuse_room.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '55% 48%', mobileFocus: '50% 30%',
        galleryTitle: '第五印停筆・抽回手', heroPresence: 'empty'
      });
    }
  }

  // 移除會把三個最終選擇強迫收成同一個「九尾消失」的共用 withdrawal。
  {
    const scenes = STORY.finale.scenes;
    const index = scenes.findIndex(scene => scene?.id === 'finale.withdrawal');
    if (index >= 0) scenes.splice(index, 1);
  }

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    interactionRevision: '2026-09-14-a',
    interactionChanges: [
      'love.face.action-copy-aligned-to-art',
      'love.face.no-lips-mismatch',
      'career.borrowed.semantic-copy-lock',
      'forbidden.four-choice-scenes-grid-layout',
      'forbidden.bait.four-omen-divination-copy',
      'forbidden.result.clear-reading-layout',
      'love.ritual.reaction-images-separated',
      'finale.seal-test.behavior-choice',
      'finale.seal-test.oracle-framing',
      'finale.choice.branch-copy-separated',
      'finale.choice.remove-forced-withdrawal'
    ]
  };
})();