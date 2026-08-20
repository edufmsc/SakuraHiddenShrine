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

  // 第五卷反證：不再直接重用前面命卷的鏡室背景。
  // 使用第五卷自己的「四痕上桌」視覺，讓玩家一眼知道已進入真命卷反證階段。
  {
    const scene = findFinaleScene('finale.cross');
    if (scene?.art) {
      Object.assign(scene.art, {
        desktop: 'assets/images/active/05_fifth/finale_four_relics.webp',
        mobile: 'assets/images/active/05_fifth/finale_four_relics.webp',
        desktopFocus: '52% 48%',
        mobileFocus: '52% 34%',
        galleryTitle: '第五卷・四痕反證',
        heroPresence: 'medium'
      });
    }
  }

  // 緣卷封線：三個選擇都先留在同一幕看立即反應。
  {
    const scene = findRouteScene('love', 'love.ritual');
    if (scene?.art && Array.isArray(scene.choices)) {
      const variants = {
        unknotted: { galleryTitle: '封線反應・未結腕線', desktopFocus: '60% 54%', mobileFocus: '50% 38%' },
        'mirror-cut': { galleryTitle: '封線反應・鏡前斷餘', desktopFocus: '54% 49%', mobileFocus: '50% 34%' },
        'door-knot': { galleryTitle: '封線反應・門環留線', desktopFocus: '62% 49%', mobileFocus: '50% 32%' }
      };
      Object.entries(variants).forEach(([choiceId, artPatch]) => {
        const item = findChoice(scene, choiceId);
        if (item) item.reactionArt = cloneArt(scene.art, artPatch);
      });
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
          reactionArt: cloneArt(scene.art, { galleryTitle: '第五印・停在光外', desktopFocus: '56% 34%', mobileFocus: '50% 34%' })
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
          reactionArt: cloneArt(scene.art, { galleryTitle: '第五印・收回自己的手', desktopFocus: '57% 31%', mobileFocus: '50% 31%' })
        }
      ];
    }
  }

  // Finale 三分支使用 Repo 內確實存在的資產。
  {
    const endings = STORY.finale.endings || {};
    if (endings.complete) {
      endings.complete.art = cloneArt(endings.complete.art, {
        desktop: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        mobile: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '54% 42%', mobileFocus: '50% 30%',
        galleryTitle: '第五印完成・門外初光', heroPresence: 'large'
      });
    }
    if (endings['scroll-only']) {
      endings['scroll-only'].art = cloneArt(endings['scroll-only'].art, {
        desktop: 'assets/images/active/05_fifth/final_scroll_desktop.webp',
        mobile: 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '50% 33%',
        galleryTitle: '第五印只留命牒', heroPresence: 'large'
      });
    }
    if (endings.refuse) {
      endings.refuse.art = cloneArt(endings.refuse.art, {
        desktop: 'assets/images/active/05_fifth/final_refuse_room.webp',
        mobile: 'assets/images/active/05_fifth/final_refuse_room.webp',
        side: 'left-top', mobileSide: 'bottom', desktopFocus: '55% 48%', mobileFocus: '50% 30%',
        galleryTitle: '第五印停筆・抽回手', heroPresence: 'empty'
      });
    }
  }

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    interactionRevision: '2026-08-20-a',
    interactionChanges: [
      'love.silence.semantic-copy-lock',
      'career.borrowed.semantic-copy-lock',
      'finale.cross.fifth-volume-art',
      'love.ritual.three-reaction-states',
      'finale.seal-test.behavior-choice',
      'finale.choice.fix-missing-reaction-assets',
      'finale.choice.scroll-only-portrait-mobile'
    ]
  };
})();
