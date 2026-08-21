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

  // 緣卷沉默：把畫面語意固定在「玩家沒有伸手，另一端是否自行接回」。
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

  // 緣卷近身：桌機原本就有三張不同反應圖；手機先停止三個選項共用同一張。
  // 目前沒有三張全新的正式 9:16，因此先使用 Repo 內既有、語意相符的各自畫面，
  // 後續若補正式直式圖，只需替換 mobile 路徑，不必再改流程。
  {
    const scene = findRouteScene('love', 'love.face');
    const touch = findChoice(scene, 'touch-cheek');
    const pause = findChoice(scene, 'stop-before-lips');
    if (touch?.reactionArt) {
      touch.reactionArt.mobile = 'assets/images/active/01_love/love_face_touch.webp';
      touch.reactionArt.mobileFocus = '50% 24%';
      touch.reactionArt.galleryTitle = '臉頰回應';
    }
    if (pause?.reactionArt) {
      pause.reactionArt.mobile = 'assets/images/active/01_love/LOVE_lips_mobile.webp';
      pause.reactionArt.mobileFocus = '50% 22%';
      pause.reactionArt.galleryTitle = '唇前停手';
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

  // 第五卷反證：先保留第五卷專屬四痕畫面，但標記為待補獨立反證圖。
  // 不再退回命卷鏡室，避免跨卷視覺倒退。
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

  // 緣卷封線：不再讓三個選項只是同一張圖換焦點。
  // 「鬆線」改用放手/續線驗證圖；「剪斷」改用空線圖；「留在門環」才保留儀式主圖。
  // 三個選項至少會出現三種不同視覺語意，不再造成「我明明選了不同選項但畫面沒變」。
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

  // Finale 三分支使用 Repo 內確實存在的資產，並讓三條路真的留下不同後果。
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

  // 原本三種最終選擇反應完都會被迫進入同一個「九尾消失」場景，
  // 造成 complete / scroll-only 也像 refuse 一樣被硬收成同一結局。
  // 移除這個共用 withdrawal，三條反應完成後直接進總命牒；差異保留在玩家真正做出的選擇裡。
  {
    const scenes = STORY.finale.scenes;
    const index = scenes.findIndex(scene => scene?.id === 'finale.withdrawal');
    if (index >= 0) scenes.splice(index, 1);
  }

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    interactionRevision: '2026-08-21-a',
    interactionChanges: [
      'love.silence.semantic-copy-lock',
      'love.face.mobile-reactions-separated',
      'career.borrowed.semantic-copy-lock',
      'finale.cross.fifth-volume-art-needs-dedicated',
      'love.ritual.reaction-images-separated',
      'finale.seal-test.behavior-choice',
      'finale.seal-test.dedicated-reaction-art-still-needed',
      'finale.choice.branch-copy-separated',
      'finale.choice.remove-forced-withdrawal',
      'finale.choice.scroll-only-portrait-mobile'
    ]
  };
})();
