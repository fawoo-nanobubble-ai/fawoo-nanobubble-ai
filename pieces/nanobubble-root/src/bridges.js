// =====================================================================
//  ERAS, CAMERAS, BRIDGES — nanobubble root (read by kit/morph.js). One era, no morphs, no cuts.
// =====================================================================
const ERA_BG = ['#f2ead8'];
const CAM_CLOSE = { z: 2.6, p: [600, 930], to: [540, 820] };
function pieceCam(era, t) {
  const cu = TIMELINE.cues;
  if (t < cu.pushIn) return camMix(CAM0, camOf({ z: 1.06, p: [500, 760], to: [500, 760] }), EZ.io(seg(t, 0, cu.pushIn)));   // a slow lean
  const lean = camOf({ z: 1.06, p: [500, 760], to: [500, 760] });
  if (t < cu.pullBack) return camMix(lean, camOf(CAM_CLOSE), EZ.io(seg(t, cu.pushIn, cu.pushEnd)));                       // the dive
  return camMix(camOf(CAM_CLOSE), CAM0, EZ.io(seg(t, cu.pullBack, cu.pullEnd)));                                           // back out
}
const BRIDGES = [];
