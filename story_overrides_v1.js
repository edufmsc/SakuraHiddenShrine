(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  if (!STORY?.routes) {
    console.warn('[Scene Lock V1] SHRINE_STORY 尚未載入，略過覆寫。');
    return;
  }

  const findScene = (routeId, sceneId) => {
    const scenes = STORY.routes?.[routeId]?.scenes;
    if (!Array.isArray(scenes)) return null;
    return scenes.find(scene => scene?.id === sceneId) || null;
  };

  const findChoice = (scene, choiceId) => {
    if (!Array.isArray(scene?.choices)) return null;
    return scene.choices.find(choice => choice?.id === choiceId) || null;
  };

  // ---------------------------------------------------------------------------
  // 緣之卷｜已確認可安全落地
  // ---------------------------------------------------------------------------

  // 01 love.threshold：手機改回與桌機真正配對的直式版本。
  {
    const scene = findScene('love', 'love.threshold');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/01_love/LOVE_01_rain_bridge_invite_mobile.webp';
      scene.art.mobileFocus = '50% 22%';
    }
  }

  // 02 love.face：修掉「碰臉頰」反應手機圖誤接到 love.evidence 證據圖的錯配。
  // 在專屬 touch mobile 尚未驗收前，先使用同一近身場景的安全直式版本。
  {
    const scene = findScene('love', 'love.face');
    const touch = findChoice(scene, 'touch-cheek');
    if (touch?.reactionArt) {
      touch.reactionArt.mobile = 'assets/images/active/01_love/LOVE_03_close_face_bait_mobile.webp';
      touch.reactionArt.mobileFocus = '50% 14%';
    }
  }

  // 03 love.question：改成玩家自然說出口的繁中句子，移除教材式 hint。
  {
    const scene = findScene('love', 'love.question');
    const patches = {
      near: { label: '如果我不再往前，對方還會靠近嗎？', hint: '' },
      return: { label: '為什麼每次都要等我真的走了，對方才回頭？', hint: '' },
      details: { label: '那些我一直記得的細節……真的是答案嗎？', hint: '' },
      wait: { label: '我還要替這條線留位置多久？', hint: '' }
    };

    Object.entries(patches).forEach(([choiceId, patch]) => {
      const target = findChoice(scene, choiceId);
      if (target) Object.assign(target, patch);
    });
  }

  // 05 love.evidence：改用 repo 內既有 VERIFY_01 桌機／手機配對證據圖。
  {
    const scene = findScene('love', 'love.evidence');
    if (scene?.art) {
      Object.assign(scene.art, {
        desktop: 'assets/images/active/01_love/LOVE_VERIFY_01_next_time_proof_desktop.webp',
        mobile: 'assets/images/active/01_love/LOVE_VERIFY_01_next_time_proof_mobile.webp',
        side: 'left',
        mobileSide: 'bottom',
        desktopFocus: '58% 48%',
        mobileFocus: '50% 22%',
        galleryTitle: '下一次的證據'
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 命之卷｜專用手機圖已存在，修掉泛用圖錯配
  // ---------------------------------------------------------------------------

  // 01 life.threshold：水庭倒影使用真正配對直式圖。
  {
    const scene = findScene('life', 'life.threshold');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/03_life/LIFE_01_water_reflection_mobile.webp';
      scene.art.mobileFocus = '50% 22%';
    }
  }

  // 02 life.shadow：紙門遲影使用真正配對直式圖。
  {
    const scene = findScene('life', 'life.shadow');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/03_life/LIFE_02_paperdoor_shadow_mobile.webp';
      scene.art.mobileFocus = '50% 22%';
    }
  }

  // 03 life.room：保留 V58 原本設計過的獨立直式休息構圖，避免後段覆寫成桌機橫圖。
  {
    const scene = findScene('life', 'life.room');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp';
      scene.art.mobileFocus = '50% 21%';
    }
  }

  // ---------------------------------------------------------------------------
  // 禁之卷｜明確配對素材與語意一致的現有圖先落地
  // ---------------------------------------------------------------------------

  // 01 forbidden.threshold：符牆桌機已有專用直式配對圖，不再借 forbidden_018。
  {
    const scene = findScene('forbidden', 'forbidden.threshold');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/04_forbidden/FORBIDDEN_01_talisman_wall_fullbody_mobile.webp';
      scene.art.mobileFocus = '50% 20%';
    }
  }

  // 02 forbidden.pattern：active 內已有名稱與故事完全對應的 patterns_converge 桌機／手機圖。
  // 先從「必生圖」降為「現圖替換後實機驗收」，若像素檢查仍無法表現多門／多人重演再生新圖。
  {
    const scene = findScene('forbidden', 'forbidden.pattern');
    if (scene?.art) {
      Object.assign(scene.art, {
        desktop: 'assets/images/active/04_forbidden/FORBIDDEN_VERIFY_01_patterns_converge_desktop.webp',
        mobile: 'assets/images/active/04_forbidden/FORBIDDEN_VERIFY_01_patterns_converge_mobile.webp',
        galleryTitle: '重複模式匯聚'
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 真命卷｜已知焦點問題先修，不先重生主圖
  // ---------------------------------------------------------------------------

  // finale.choice：原桌機 focus=50% 58% 會把完整頭臉裁得過低。
  // 先拉回 42%，與手機既有焦點一致；待實機再做最後微調。
  {
    const scene = STORY.finale?.scenes?.find(item => item?.id === 'finale.choice');
    if (scene?.art) {
      scene.art.desktopFocus = '50% 42%';
      scene.art.mobileFocus = '50% 42%';
    }
  }

  // 將實作狀態掛在 STORY 上，方便 console / 後續檢查；不影響既有流程。
  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    applied: true,
    revision: '2026-08-19-c',
    changes: [
      'love.threshold.mobile-pair',
      'love.face.touch-mobile-fix',
      'love.question.copy',
      'love.evidence.verify-01',
      'life.threshold.mobile-pair',
      'life.shadow.mobile-pair',
      'life.room.mobile-pair',
      'forbidden.threshold.mobile-pair',
      'forbidden.pattern.patterns-converge',
      'finale.choice.desktop-focus'
    ]
  };
})();
