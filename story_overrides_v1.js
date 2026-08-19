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
  // 緣之卷｜Scene Lock V1 已確認、可先安全落地的項目
  // ---------------------------------------------------------------------------

  // 01 love.threshold
  // 原 V58 手機誤用 love_018.webp；改回真正與桌機配對的直式版本。
  {
    const scene = findScene('love', 'love.threshold');
    if (scene?.art) {
      scene.art.mobile = 'assets/images/active/01_love/LOVE_01_rain_bridge_invite_mobile.webp';
      scene.art.mobileFocus = '50% 22%';
    }
  }

  // 03 love.question
  // 把問卷式選項改成玩家真的會說出口的繁中句子；hint 不再教玩家怎麼分析。
  {
    const scene = findScene('love', 'love.question');
    const patches = {
      near: {
        label: '如果我不再往前，對方還會靠近嗎？',
        hint: ''
      },
      return: {
        label: '為什麼每次都要等我真的走了，對方才回頭？',
        hint: ''
      },
      details: {
        label: '那些我一直記得的細節……真的是答案嗎？',
        hint: ''
      },
      wait: {
        label: '我還要替這條線留位置多久？',
        hint: ''
      }
    };

    Object.entries(patches).forEach(([choiceId, patch]) => {
      const target = findChoice(scene, choiceId);
      if (target) Object.assign(target, patch);
    });
  }

  // 05 love.evidence
  // 現圖是近唇噤聲圖，與「最近三次下一次由誰真正留下」的證據故事不符。
  // 先改用 repo 內既有、已列為第一順位的 VERIFY_01 桌機／手機配對圖。
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

  // 將實作狀態掛在 STORY 上，方便 console / 後續檢查，完全不影響既有流程。
  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    applied: true,
    revision: '2026-08-19-a',
    changes: [
      'love.threshold.mobile-pair',
      'love.question.copy',
      'love.evidence.verify-01'
    ]
  };
})();
