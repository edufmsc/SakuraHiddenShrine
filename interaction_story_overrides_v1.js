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
  // 緣卷封線：三個選擇都必須先留在同一幕看見「立即反應」，
  // 再進入 ending，而不是點完選項直接跳頁。
  // 目前尚未有三張專用 reaction 圖，因此保留正式主圖，以不同焦點＋反應文字完成第一版互動；
  // 不借用其他劇情圖片，避免語意錯配。
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
  // 玩家可以把手停在印前、或直接收手；兩個動作都會留下 behavior，
  // 但都不會在這裡替九尾完成封印，真正的三路結局仍留在 finale.choice。
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
  // finale.choice 三分支原設定引用不存在的 final_complete.webp / final_scroll_only.webp /
  // final_refuse.webp。改成 Repo 內確實存在的正式資產，避免最後選擇出現 404 缺圖。
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
        mobileFocus: '50% 38%',
        galleryTitle: '第五印完成・門外初光',
        heroPresence: 'large'
      });
    }
    if (endings['scroll-only']) {
      endings['scroll-only'].art = cloneArt(endings['scroll-only'].art, {
        desktop: 'assets/images/active/05_fifth/final_scroll_desktop.webp',
        mobile: 'assets/images/active/05_fifth/final_scroll_desktop.webp',
        side: 'left-top',
        mobileSide: 'bottom',
        desktopFocus: '50% 50%',
        mobileFocus: '50% 44%',
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
        mobileFocus: '50% 44%',
        galleryTitle: '第五印停筆・抽回手',
        heroPresence: 'empty'
      });
    }
  }

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    interactionRevision: '2026-08-19-a',
    interactionChanges: [
      'love.ritual.three-reaction-states',
      'finale.seal-test.behavior-choice',
      'finale.choice.fix-missing-reaction-assets'
    ]
  };
})();
