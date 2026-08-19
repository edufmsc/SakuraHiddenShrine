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

  const findFinaleScene = sceneId => {
    const scenes = STORY.finale?.scenes;
    if (!Array.isArray(scenes)) return null;
    return scenes.find(scene => scene?.id === sceneId) || null;
  };

  const findChoice = (scene, choiceId) => {
    if (!Array.isArray(scene?.choices)) return null;
    return scene.choices.find(choice => choice?.id === choiceId) || null;
  };

  const patchArt = (scene, patch) => {
    if (!scene?.art) return;
    Object.assign(scene.art, patch);
  };

  // ---------------------------------------------------------------------------
  // 緣之卷｜已確認可安全落地
  // ---------------------------------------------------------------------------

  // 01 love.threshold：手機改回與桌機真正配對的直式版本。
  {
    const scene = findScene('love', 'love.threshold');
    patchArt(scene, {
      mobile: 'assets/images/active/01_love/LOVE_01_rain_bridge_invite_mobile.webp',
      mobileFocus: '50% 22%'
    });
  }

  // 02 love.face：修掉「碰臉頰」反應手機圖誤接到 love.evidence 證據圖的錯配。
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

  // 05 love.evidence：既有 VERIFY_01 證據圖。
  {
    const scene = findScene('love', 'love.evidence');
    patchArt(scene, {
      desktop: 'assets/images/active/01_love/LOVE_VERIFY_01_next_time_proof_desktop.webp',
      mobile: 'assets/images/active/01_love/LOVE_VERIFY_01_next_time_proof_mobile.webp',
      side: 'left',
      mobileSide: 'bottom',
      desktopFocus: '58% 48%',
      mobileFocus: '50% 22%',
      galleryTitle: '下一次的證據'
    });
  }

  // A01 love.silence：正式專用「單方仍在接線」圖。
  {
    const scene = findScene('love', 'love.silence');
    patchArt(scene, {
      desktop: 'assets/images/active/01_love/LOVE_SILENCE_01_one_sided_thread_desktop.webp',
      mobile: 'assets/images/active/01_love/LOVE_SILENCE_01_one_sided_thread_mobile.webp',
      side: 'left-bottom',
      mobileSide: 'bottom',
      desktopFocus: '59% 50%',
      mobileFocus: '50% 32%',
      galleryTitle: '沉默之後・單方紅線'
    });
  }

  // A02 love.turn：正式「紅線從鏡後繞回玩家」反轉圖。
  {
    const scene = findScene('love', 'love.turn');
    patchArt(scene, {
      desktop: 'assets/images/active/01_love/LOVE_TURN_01_thread_bites_back_desktop.webp',
      mobile: 'assets/images/active/01_love/LOVE_TURN_01_thread_bites_back_mobile.webp',
      side: 'left',
      mobileSide: 'bottom',
      desktopFocus: '57% 49%',
      mobileFocus: '50% 31%',
      galleryTitle: '紅線反咬'
    });
  }

  // A03 love.result：緣卷專用命牒背景。
  {
    const scene = findScene('love', 'love.result');
    patchArt(scene, {
      desktop: 'assets/images/active/01_love/LOVE_RESULT_01_destiny_scroll_desktop.webp',
      mobile: 'assets/images/active/01_love/LOVE_RESULT_01_destiny_scroll_mobile.webp',
      desktopFocus: '50% 50%',
      mobileFocus: '50% 35%',
      galleryTitle: '緣卷・九尾手書命牒'
    });
  }

  // A04 love.ritual：九尾＋玩家手＋紅線儀式正式圖，不再使用純道具 FX_004。
  {
    const scene = findScene('love', 'love.ritual');
    patchArt(scene, {
      desktop: 'assets/images/active/01_love/LOVE_RITUAL_01_seal_thread_desktop.webp',
      mobile: 'assets/images/active/01_love/LOVE_RITUAL_01_seal_thread_mobile.webp',
      side: 'left',
      mobileSide: 'bottom',
      desktopFocus: '58% 50%',
      mobileFocus: '50% 31%',
      galleryTitle: '封線儀式'
    });
  }

  // ---------------------------------------------------------------------------
  // 業之卷｜正式生成圖接回
  // ---------------------------------------------------------------------------

  // A05 career.borrowed：成果仍在、署名／印章被換的證據圖。
  {
    const scene = findScene('career', 'career.borrowed');
    patchArt(scene, {
      desktop: 'assets/images/active/02_career/CAREER_BORROWED_01_name_swap_proof_desktop.webp',
      mobile: 'assets/images/active/02_career/CAREER_BORROWED_01_name_swap_proof_mobile.webp',
      side: 'right-top',
      mobileSide: 'bottom',
      desktopFocus: '49% 50%',
      mobileFocus: '50% 30%',
      galleryTitle: '成果借名・證據'
    });
  }

  // A06 career.result：業卷專用命牒背景。
  {
    const scene = findScene('career', 'career.result');
    patchArt(scene, {
      desktop: 'assets/images/active/02_career/CAREER_RESULT_01_destiny_scroll_desktop.webp',
      mobile: 'assets/images/active/02_career/CAREER_RESULT_01_destiny_scroll_mobile.webp',
      desktopFocus: '50% 50%',
      mobileFocus: '50% 35%',
      galleryTitle: '業卷・九尾手書命牒'
    });
  }

  // ---------------------------------------------------------------------------
  // 命之卷｜專用手機圖＋正式生成圖
  // ---------------------------------------------------------------------------

  {
    const scene = findScene('life', 'life.threshold');
    patchArt(scene, {
      mobile: 'assets/images/active/03_life/LIFE_01_water_reflection_mobile.webp',
      mobileFocus: '50% 22%'
    });
  }

  {
    const scene = findScene('life', 'life.shadow');
    patchArt(scene, {
      mobile: 'assets/images/active/03_life/LIFE_02_paperdoor_shadow_mobile.webp',
      mobileFocus: '50% 22%'
    });
  }

  {
    const scene = findScene('life', 'life.room');
    patchArt(scene, {
      mobile: 'assets/images/active/03_life/LIFE_recline_mobile_v44.webp',
      mobileFocus: '50% 21%'
    });
  }

  // A07 life.turn：鏡內完整替身／鏡外真身的正式反轉圖。
  {
    const scene = findScene('life', 'life.turn');
    patchArt(scene, {
      desktop: 'assets/images/active/03_life/LIFE_TURN_01_mirror_substitute_desktop.webp',
      mobile: 'assets/images/active/03_life/LIFE_TURN_01_mirror_substitute_mobile.webp',
      side: 'left-top',
      mobileSide: 'bottom',
      desktopFocus: '52% 48%',
      mobileFocus: '50% 31%',
      galleryTitle: '鏡外人・替身反轉'
    });
  }

  // A08 life.result：命卷專用命牒背景。
  {
    const scene = findScene('life', 'life.result');
    patchArt(scene, {
      desktop: 'assets/images/active/03_life/LIFE_RESULT_01_destiny_scroll_desktop.webp',
      mobile: 'assets/images/active/03_life/LIFE_RESULT_01_destiny_scroll_mobile.webp',
      desktopFocus: '50% 50%',
      mobileFocus: '50% 35%',
      galleryTitle: '命卷・九尾手書命牒'
    });
  }

  // ---------------------------------------------------------------------------
  // 禁之卷｜既有配對修正＋正式生成圖
  // ---------------------------------------------------------------------------

  {
    const scene = findScene('forbidden', 'forbidden.threshold');
    patchArt(scene, {
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_01_talisman_wall_fullbody_mobile.webp',
      mobileFocus: '50% 20%'
    });
  }

  {
    const scene = findScene('forbidden', 'forbidden.pattern');
    patchArt(scene, {
      desktop: 'assets/images/active/04_forbidden/FORBIDDEN_VERIFY_01_patterns_converge_desktop.webp',
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_VERIFY_01_patterns_converge_mobile.webp',
      galleryTitle: '重複模式匯聚'
    });
  }

  {
    const scene = findScene('forbidden', 'forbidden.threat');
    patchArt(scene, {
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_03_neck_shadow_threat_mobile.webp',
      mobileFocus: '50% 18%'
    });
  }

  // A09 forbidden.turn：狐面沿紅線認主、九尾退遠。
  {
    const scene = findScene('forbidden', 'forbidden.turn');
    patchArt(scene, {
      desktop: 'assets/images/active/04_forbidden/FORBIDDEN_TURN_01_mask_recognizes_player_desktop.webp',
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_TURN_01_mask_recognizes_player_mobile.webp',
      side: 'left-top',
      mobileSide: 'bottom',
      desktopFocus: '51% 48%',
      mobileFocus: '50% 31%',
      galleryTitle: '面具認主'
    });
  }

  // A10 forbidden.result：禁卷專用命牒背景。
  {
    const scene = findScene('forbidden', 'forbidden.result');
    patchArt(scene, {
      desktop: 'assets/images/active/04_forbidden/FORBIDDEN_RESULT_01_destiny_scroll_desktop.webp',
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_RESULT_01_destiny_scroll_mobile.webp',
      desktopFocus: '50% 50%',
      mobileFocus: '50% 35%',
      galleryTitle: '禁卷・九尾手書命牒'
    });
  }

  // A11 forbidden.ending：真正的門後無人／天將亮收尾。
  {
    const scene = findScene('forbidden', 'forbidden.ending');
    patchArt(scene, {
      desktop: 'assets/images/active/04_forbidden/FORBIDDEN_ENDING_01_empty_gate_desktop.webp',
      mobile: 'assets/images/active/04_forbidden/FORBIDDEN_ENDING_01_empty_gate_mobile.webp',
      side: 'left-bottom',
      mobileSide: 'bottom',
      desktopFocus: '56% 50%',
      mobileFocus: '50% 31%',
      galleryTitle: '門後無人・餘火將熄'
    });
  }

  // ---------------------------------------------------------------------------
  // 真命卷｜正式終局生成圖
  // ---------------------------------------------------------------------------

  // A12 finale.gate：第五門＋四痕同時指向九尾。
  {
    const scene = findFinaleScene('finale.gate');
    patchArt(scene, {
      desktop: 'assets/images/active/05_fifth/FINALE_GATE_01_fifth_door_desktop.webp',
      mobile: 'assets/images/active/05_fifth/FINALE_GATE_01_fifth_door_mobile.webp',
      side: 'left-top',
      mobileSide: 'bottom',
      desktopFocus: '51% 49%',
      mobileFocus: '50% 30%',
      galleryTitle: '無字第五門'
    });
  }

  // A13 finale.confession：九尾脆弱坦白＋玩家手與第五印。
  {
    const scene = findFinaleScene('finale.confession');
    patchArt(scene, {
      desktop: 'assets/images/active/05_fifth/FINALE_CONFESSION_01_vulnerable_seal_desktop.webp',
      mobile: 'assets/images/active/05_fifth/FINALE_CONFESSION_01_vulnerable_seal_mobile.webp',
      side: 'right-top',
      mobileSide: 'bottom',
      desktopFocus: '51% 47%',
      mobileFocus: '50% 29%',
      galleryTitle: '九尾失言・脆弱封印'
    });
  }

  // A14 finale.seal-test：桌機保留原圖，手機換正式第五印直式圖。
  {
    const scene = findFinaleScene('finale.seal-test');
    patchArt(scene, {
      mobile: 'assets/images/active/05_fifth/FINALE_SEAL_TEST_01_uncontrolled_seal_mobile.webp',
      mobileFocus: '50% 32%',
      galleryTitle: '第五印失控形成'
    });
  }

  // finale.choice：已知 desktop focus 過低，先維持第一輪修正。
  {
    const scene = findFinaleScene('finale.choice');
    patchArt(scene, {
      desktopFocus: '50% 42%',
      mobileFocus: '50% 42%'
    });
  }

  // A15 finale.ending：真結總命牒新圖。renderFinale 會優先讀 STORY.totalScrollArt，
  // 因此 scene.art 與 totalScrollArt 都要一起換，避免最後仍回到舊 FINAL_SCROLL。
  {
    const scene = findFinaleScene('finale.ending');
    const finalPatch = {
      desktop: 'assets/images/active/06_ending/FINALE_ENDING_01_final_destiny_scroll_desktop.webp',
      mobile: 'assets/images/active/06_ending/FINALE_ENDING_01_final_destiny_scroll_mobile.webp',
      side: 'bottom',
      mobileSide: 'bottom',
      desktopFocus: '50% 50%',
      mobileFocus: '50% 38%',
      galleryTitle: '真結・總命牒'
    };
    patchArt(scene, finalPatch);
    if (STORY.totalScrollArt) Object.assign(STORY.totalScrollArt, finalPatch);
  }

  // 將實作狀態掛在 STORY 上，方便 console / 後續檢查；不影響既有流程。
  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    applied: true,
    revision: '2026-08-19-e',
    changes: [
      'love.threshold.mobile-pair',
      'love.face.touch-mobile-fix',
      'love.question.copy',
      'love.evidence.verify-01',
      'love.silence.final-art',
      'love.turn.final-art',
      'love.result.final-art',
      'love.ritual.final-art',
      'career.borrowed.final-art',
      'career.result.final-art',
      'life.threshold.mobile-pair',
      'life.shadow.mobile-pair',
      'life.room.mobile-pair',
      'life.turn.final-art',
      'life.result.final-art',
      'forbidden.threshold.mobile-pair',
      'forbidden.pattern.patterns-converge',
      'forbidden.threat.mobile-pair',
      'forbidden.turn.final-art',
      'forbidden.result.final-art',
      'forbidden.ending.final-art',
      'finale.gate.final-art',
      'finale.confession.final-art',
      'finale.seal-test.mobile-final-art',
      'finale.choice.desktop-focus',
      'finale.ending.total-scroll-final-art'
    ]
  };
})();
