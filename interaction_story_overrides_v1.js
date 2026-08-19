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
  // 緣卷沉默：新正式圖沒有畫出玩家手，因此把敘事焦點明確放在「玩家沒有伸手，
  // 遠端是否真的自行把關係接回現實」。不要求圖片硬演不存在的玩家手。
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

  // ---------------------------------------------------------------------------
  // 業卷借名：正式圖偏策略證據桌，靠一句更直接的畫面描述把「成果仍在、署名被換」
  // 釘死，避免玩家把它只看成一般棋局。
  // ---------------------------------------------------------------------------
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
  // 緣卷封線：三個選擇都必須先留在同一幕看見立即反應，再進入 ending。
  // 目前沒有三張專用 reaction 圖，因此保留正式封線主圖，以不同焦點＋不同反應文字處理，
  // 不借用其他劇情圖片造成語意錯配。
  // ---------------------------------------------------------------------------
  {
    const scene = findRouteScene('love', 'love.ritual');
    if (scene?.art && Array.isArray(scene.choices)) {
      const variants = {
        unknotted: {
          galleryTitle: '封線反應・未結腕線',
          desktopFocus: '60% 54%',
          mobileFocus: '50% 38%'
        },
        'mirror-cut': {
          galleryTitle: '封線反應・鏡前斷餘',
          desktopFocus: '54% 49%',
          mobileFocus: '50% 34%'
        },
        'door-knot': {
          galleryTitle: '封線反應・門環留線',
          desktopFocus: '62% 49%',
          mobileFocus: '50% 32%'
        }
      };

      Object.entries(variants).forEach(([choiceId, artPatch]) => {
        const item = findChoice(scene, choiceId);
        if (!item) return;
        item.reactionArt = cloneArt(scene.art, artPatch);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 真命卷第五印：由原本線性說明頁改成真正的行為試探。
  // 兩個動作都留下 behavior，但都不會提前替九尾完成第五印；真正三路結局仍在 finale.choice。
  // ---------------------------------------------------------------------------
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
            galleryTitle: '第五印・停在光外',
            desktopFocus: '56% 34%',
            mobileFocus: '50% 34%'
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
            galleryTitle: '第五印・收回自己的手',
            desktopFocus: '57% 31%',
            mobileFocus: '50% 31%'
          })
        }
      ];
    }
  }

  // ---------------------------------------------------------------------------
  // finale.choice：三分支改成 Repo 內確實存在的資產。
  // 「只留命牒」已有真正直式舊資產 FINAL_SCROLL_portrait，手機直接使用；
  // complete / refuse 目前沒有語意正確的直式專圖，仍使用原分支圖，由 UI 層在手機完整 contain，
  // 絕不拿不相干的直式劇情圖冒充另一個結局。
  // ---------------------------------------------------------------------------
  {
    const endings = STORY.finale.endings || {};
    if (endings.complete) {
      endings.complete.art = cloneArt(endings.complete.art, {
        desktop: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        mobile: 'assets/images/active/05_fifth/final_complete_dawn.webp',
        side: 'left-top',
        mobileSide: 'bottom',
        desktopFocus: '54% 42%',
        mobileFocus: '50% 30%',
        galleryTitle: '第五印完成・門外初光',
        heroPresence: 'large'
      });
    }
    if (endings['scroll-only']) {
      endings['scroll-only'].art = cloneArt(endings['scroll-only'].art, {
        desktop: 'assets/images/active/05_fifth/final_scroll_desktop.webp',
        mobile: 'assets/images/active/05_fifth/FINAL_SCROLL_portrait.webp',
        side: 'left-top',
        mobileSide: 'bottom',
        desktopFocus: '50% 50%',
        mobileFocus: '50% 33%',
        galleryTitle: '第五印只留命牒',
        heroPresence: 'large'
      });
    }
    if (endings.refuse) {
      endings.refuse.art = cloneArt(endings.refuse.art, {
        desktop: 'assets/images/active/05_fifth/final_refuse_room.webp',
        mobile: 'assets/images/active/05_fifth/final_refuse_room.webp',
        side: 'left-top',
        mobileSide: 'bottom',
        desktopFocus: '55% 48%',
        mobileFocus: '50% 30%',
        galleryTitle: '第五印停筆・抽回手',
        heroPresence: 'empty'
      });
    }
  }

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    interactionRevision: '2026-08-19-b',
    interactionChanges: [
      'love.silence.semantic-copy-lock',
      'career.borrowed.semantic-copy-lock',
      'love.ritual.three-reaction-states',
      'finale.seal-test.behavior-choice',
      'finale.choice.fix-missing-reaction-assets',
      'finale.choice.scroll-only-portrait-mobile'
    ]
  };
})();
