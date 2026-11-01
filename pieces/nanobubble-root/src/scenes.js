// =====================================================================
//  SCENES — nanobubble root. One sketchbook page, one jar; the camera dives into the water and back out.
//  World coords 1080x1920; time TT on 2s; ev / popS / springMove for events. Captions are screen-space (DEFER).
// =====================================================================
const JAR = { x0: 250, x1: 750, top: 560, bot: 1220, water: 660 };
const ROOT_HAIR = [618, 948];                     // where the nanobubble parks
const HERO_R = 26;
const HERO_HOME = [700, 1040], HERO_PARK = [652, 958];

// ---- the jar, the net cup, the water
function jarPts() {
  const { x0, x1, top, bot } = JAR;
  return [[x0, top], [x0, bot - 40], ...arcPts(x0 + 40, bot - 40, 40, Math.PI, Math.PI / 2, 6).reverse().map(([x, y]) => [x, y]),
    [x1 - 40, bot], ...arcPts(x1 - 40, bot - 40, 40, Math.PI / 2, 0, 6), [x1, top]];
}
function waterPts() {
  const { x0, x1, bot, water } = JAR, P = [];
  for (let i = 0; i <= 16; i++) { const x = lerp(x0 + 4, x1 - 4, i / 16); P.push([x, water + 5 * Math.sin(i * 1.3 + TT * 2.2)]); }
  return [...P, [x1 - 4, bot - 6], [x0 + 4, bot - 6]];
}
function drawJar() {
  const { x0, x1, top, bot } = JAR;
  smudge(500, bot + 22, 300, 26, 0.35, 0);                                             // its shadow on the desk
  gpencil([[90, bot + 18], [420, bot + 14], [760, bot + 20], [990, bot + 16]], { key: 'desk', w: 3, a: 0.7 });
  const WP = waterPts();
  gfill(WP, SK.glass, { a: 0.22, off: [5, 4], key: 'waterf' });
  ctx.save(); gclip(WP); ghatch(x0, JAR.water, x1, bot, { ang: 0.08, gap: 34, col: SK.graphL, w: 1.6, a: 0.35, key: 'waterh' }); ctx.restore();
  gline(WP.slice(0, 17), { key: 'surface', w: 3.4, amp: 1.2, second: false, step: 10 });
  gline(jarPts(), { key: 'jar', w: 6 });
  gline([[x0 - 18, top], [x1 + 18, top]], { key: 'lip', w: 6, second: false });
  gpencil([[x0 + 34, top + 60], [x0 + 30, top + 360]], { key: 'shine1', w: 3, a: 0.55, passes: 1 });   // glass shine
  gpencil([[x0 + 54, top + 90], [x0 + 52, top + 200]], { key: 'shine2', w: 2.4, a: 0.45, passes: 1 });
  // the net cup the sprout sits in
  const cup = [[410, 520], [590, 520], [570, 640], [430, 640]];
  gfill(cup, SK.sheet, { off: [0, 0], key: 'cupf', a: 0.9 });
  ctx.save(); gclip(cup); ghatch(400, 520, 600, 640, { ang: 0.8, gap: 16, col: SK.graph, w: 2, a: 0.5, key: 'cuph' }); ghatch(400, 520, 600, 640, { ang: -0.8, gap: 16, col: SK.graph, w: 2, a: 0.5, key: 'cuph2' }); ctx.restore();
  gline(cup, { closed: true, key: 'cup', w: 4.5 });
}

// ---- the roots: graphite while it can't breathe, inked over once it gets oxygen
const ROOTS = [
  [[500, 640], [492, 720], [508, 820], [496, 930], [512, 1040], [504, 1130]],
  [[498, 760], [440, 830], [404, 920], [390, 1010]],
  [[506, 850], [560, 890], [600, 930], ROOT_HAIR, [640, 1010], [650, 1080]],
  [[500, 980], [450, 1040], [430, 1110]],
  [[492, 700], [560, 740], [590, 800]],
];
function drawRoots() {
  const cu = TIMELINE.cues, grow = ev(cu.root, 0.75), inked = ev(cu.gift, 0.9);
  ROOTS.forEach((P, i) => {
    const part = clamp(grow * 1.6 - i * 0.12);
    gpencil(P, { key: 'rootp' + i, w: i ? 3.2 : 4.4, a: 0.8, part });
    if (inked > 0) gline(P, { key: 'root' + i, w: i ? 4.4 : 6, part: clamp(inked * 1.4 - i * 0.1) });
  });
  // new root hairs, written on after the gift
  const hp = ev(cu.hairs, 0.75);
  if (hp > 0) ROOTS.forEach((P, i) => {
    const R = RNG('hairs', i), Q = resample(P, false, 34);
    for (let j = 1; j < Q.length - 1; j++) {
      const [x, y] = Q[j], s = j % 2 ? 1 : -1, len = 14 + R.r(0, 12);
      gline([[x, y], [x + s * len, y + len * 0.6]], { key: 'hair' + i + '_' + j, w: 2.4, second: false, amp: 0.4, step: 5, part: clamp(hp * 1.8 - j * 0.06) });
    }
  });
}

// ---- the sprout: u = 0 sagging, 1 standing
function leafPts(x, y, len, ang, wid = 0.36) {
  const P = [];
  for (let i = 0; i <= 12; i++) { const s = i / 12; P.push([s * len, Math.sin(Math.PI * s) * len * wid * (1 - 0.3 * s)]); }
  for (let i = 11; i > 0; i--) { const s = i / 12; P.push([s * len, -Math.sin(Math.PI * s) * len * wid * 0.8 * (1 - 0.3 * s)]); }
  return xform(P, x, y, ang);
}
function drawSprout(u) {
  const top = [500 + 120 * (1 - u), 340 + 120 * (1 - u)], mid = [500 + 60 * (1 - u), 430 + 20 * (1 - u)];
  const stem = [[500, 530], mid, top];
  const L = leafPts(top[0], top[1], 130, lerp(Math.PI * 0.62, Math.PI * 1.18, u) + 0.05 * Math.sin(TT * 3));
  const R2 = leafPts(top[0], top[1], 140, lerp(Math.PI * 0.42, -Math.PI * 0.2, u) - 0.05 * Math.sin(TT * 3 + 1));
  [L, R2].forEach((P, i) => {
    gfill(P, SK.sheet, { off: [0, 0], key: 'leaff' + i, a: 0.95 });
    ctx.save(); gclip(P); ghatch(top[0] - 160, top[1] - 160, top[0] + 160, top[1] + 160, { ang: i ? -0.7 : 0.7, gap: 11, col: SK.graph, w: 2, a: lerp(0.65, 0.4, u), key: 'leafh' + i }); ctx.restore();
    gline(P, { closed: true, key: 'leaf' + i, w: 5 });
    const tip = P[12]; gline([top, [lerp(top[0], tip[0], 0.8), lerp(top[1], tip[1], 0.8)]], { key: 'vein' + i, w: 2.4, second: false, step: 6 });
  });
  gline(stem, { key: 'stem', w: 6.5 });
  return top;
}

// ---- big bubbles: drawn, rise, pop at the surface
function bigBubble(x, y0, r, t0, key) {
  const cu = TIMELINE.cues, t1 = t0 + 0.25, tPop = t1 + cu.rise;
  if (TT < t0) return;
  if (TT < tPop) {
    const k = EZ.i2(seg(TT, t1, tPop)), y = lerp(y0, JAR.water + r * 0.4, k), x2 = x + 10 * Math.sin(TT * 9 + r);
    const P = loopPts(x2, y, r, r * (1 - 0.08 * k), 0.08);
    gfill(P, SK.sheet, { a: 0.5, off: [0, 0], key: key + 'f' });
    gpencil(P, { closed: true, key: key + 'p', w: 2.4, a: 0.7, part: ev(t0, 0.2) });
    if (TT >= t0 + 0.15) gline(P, { key: key, w: 4, part: ev(t0 + 0.15, 0.15) });
    gline(arcPts(x2 - r * 0.3, y - r * 0.3, r * 0.45, Math.PI * 1.1, Math.PI * 1.45, 5), { key: key + 'sh', w: 3, second: false, step: 5 });
    return;
  }
  const k = ev(tPop, 0.4);
  if (k < 1) {
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI * 0.95 + i / 6 * Math.PI * 0.9, r0 = r * (0.5 + 0.9 * k), r1 = r0 + 18 + 10 * (i % 2);
      gline([[x + Math.cos(a) * r0, JAR.water + Math.sin(a) * r0], [x + Math.cos(a) * r1, JAR.water + Math.sin(a) * r1]], { key: key + 'pop' + i, w: 3.4, second: false, step: 6 });
    }
    handLetter('뽁!', x + r * 0.2, JAR.water - r - 30 - 30 * k, 54, { col: SK.graph, key: key + 'bang', reveal: ev(tPop, 0.06) });
  }
}

// ---- the hero: the oxygen nanobubble (terracotta, the only colour)
function heroAt() {
  const cu = TIMELINE.cues;
  const bob = [7 * Math.sin(B * 0.55), 6 * Math.cos(B * 0.43)];               // Brownian wobble, on 2s, never rising
  const x = springTrack([[cu.hero, HERO_HOME[0]], [cu.drift, HERO_PARK[0]]], { k: 12, d: 7 });
  const y = springTrack([[cu.hero, HERO_HOME[1]], [cu.drift, HERO_PARK[1]]], { k: 12, d: 7 });
  const still = TT >= cu.hush && TT < cu.gift;                                   // holds its breath in the hush
  return [x + (still ? 0 : bob[0]), y + (still ? 0 : bob[1])];
}
function drawHero() {
  const cu = TIMELINE.cues;
  if (TT < cu.hero) return;
  const [x, y] = heroAt();
  if (TT < cu.heroInk) {                                                       // pencilled in first
    const P = loopPts(x, y, HERO_R, HERO_R, 0.1);
    gpencil(P, { closed: true, key: 'herop', w: 2, a: 0.8, part: ev(cu.hero, 0.4) });
    return;
  }
  const give = ev(cu.gift, 0.2), sq = Math.sin(Math.PI * ev(cu.gift, 0.3));
  const hop = Math.sin(Math.PI * ev(cu.gift + 0.5, 0.25)) + Math.sin(Math.PI * ev(cu.gift + 1.0, 0.25));
  const mood = TT < cu.pass ? 'calm' : TT < cu.pass + 0.75 ? 'wow' : TT < cu.gift ? 'calm' : 'happy';
  const look = TT >= cu.pass && TT < cu.pass + 0.75 ? [-0.6, -1] : TT >= cu.drift ? [-1, -0.3] : [-0.3, 0.2];
  doodleHero(x, y - 10 * hop, HERO_R * (1 - 0.12 * give), { key: 'hero', mood, look, sx: 1 + 0.18 * sq, sy: 1 - 0.18 * sq });
  // its name, in graphite: O2
  if (TT < cu.gift) { handLetter('O', x - 14, y - 52, 52, { col: SK.graph, key: 'o2o', jit: 0.6, reveal: ev(cu.heroInk, 0.15) }); handLetter('2', x + 12, y - 40, 32, { col: SK.graph, key: 'o2n', jit: 0.6, reveal: ev(cu.heroInk + 0.08, 0.1) }); }
  // the gift: oxygen dots stream from the bubble into the root
  if (TT >= cu.gift && TT < cu.gift + 1.0) {
    const k = ev(cu.gift, 1.0);
    for (let i = 0; i < 6; i++) {
      const f = clamp(k * 1.6 - i * 0.1), px = lerp(x - 14, ROOT_HAIR[0] + 4, f), py = lerp(y, ROOT_HAIR[1] + (i - 2.5) * 6, f) - 14 * Math.sin(Math.PI * f);
      if (f > 0 && f < 1) { ctx.fillStyle = SK.terra; ctx.beginPath(); ctx.arc(px, py, 3.2, 0, TAU); ctx.fill(); }
    }
    sparkle(ROOT_HAIR[0] - 6, ROOT_HAIR[1] - 4, 22, ev(cu.gift, 0.4), 'givespk');
  }
}

// ---- background life
function ant(x, y, s, key) {
  for (let i = 0; i < 3; i++) { ctx.fillStyle = SK.ink; ctx.beginPath(); ctx.ellipse(x + (i - 1) * 11 * s, y - 6 * s, (i === 1 ? 5 : 6.5) * s, 5 * s, 0, 0, TAU); ctx.fill(); }
  const k = B % 2 ? 1 : -1;
  for (let i = 0; i < 3; i++) gline([[x + (i - 1) * 8 * s, y - 4 * s], [x + (i - 1) * 8 * s + k * (i % 2 ? 5 : -5) * s, y + 3 * s]], { w: 1.8 * s, key: key + i, amp: 0.3, second: false, step: 4 });
}
function marginLife() {
  [[110, 560, 0], [160, 780, 1], [930, 820, 2]].forEach(([x, y, i]) => doodleStar(x, y, 22 + 6 * ((B + i) % 3 === 0), 'mstar' + i, { w: 3.2 }));
  ant(790 + 14 * TT, JAR.bot + 15, 1.4, 'ant');
  // a tiny graphite fleck drifting in the water: the water is alive too
  for (let i = 0; i < 4; i++) { const R = RNG('fleck', i), fx = R.r(300, 700), fy = R.r(760, 1180) - 12 * TT * (0.3 + R.f() * 0.4); if (fy > JAR.water + 20) gpencil(loopPts(fx, fy, 4, 4, 0.1), { closed: true, key: 'fl' + i, w: 1.6, a: 0.5, passes: 1 }); }
}

// ---- the pencil prop: it follows whatever is being drawn
function drawPencilProp() {
  const cu = TIMELINE.cues;
  let tip = null;
  if (TT >= cu.root && TT < cu.root + 0.8) tip = writeEnd(ROOTS[0], ev(cu.root, 0.75));
  else if (TT >= cu.hero - 0.1 && TT < cu.heroInk + 0.3) { const [x, y] = heroAt(); tip = writeEnd(closeP(loopPts(x, y, HERO_R, HERO_R, 0.1)), ev(cu.hero, 0.4)); }
  if (tip) pencilTool(tip[0], tip[1], -0.75 + 0.08 * Math.sin(B * 1.7), TT > cu.pushIn ? 0.55 : 1);
}

// ---- captions: hand lettering is the narrator (screen space, absolute times)
function capDraw(t0, t1, lines, hi = [], o = {}) {
  if (TT < t0 || TT >= t1) return;
  const size = o.size ?? 116, y0 = o.y ?? 1340, lh = size * 1.08;
  lines.forEach((line, li) => {
    const y = y0 + li * lh, font = skFont(size, 'hand'), xs = glyphX(line, font), x0 = CX - xs[xs.length - 1] / 2;
    for (const [hl, word] of hi) if (hl === li) { const k = line.indexOf(word); if (k >= 0) highlight(x0 + xs[k], x0 + xs[k + word.length], y - size * 0.26, size * 0.5, ev(t0 + 0.45 + li * 0.25, 0.25), { key: 'caph' + li + line }); }
    handLetter(line, CX, y, size, { reveal: ev(t0 + li * 0.25, 0.4), key: 'cap' + li + line, stroke: size * 0.03 });
  });
}
function sign(t0) {
  if (TT < t0) return;
  const size = 132, y = 1400;
  const [x0, x1] = handLetter('화우나노텍', CX, y, size, { reveal: ev(t0, 0.6), key: 'sign', stroke: size * 0.035 });
  underline(x0, x1, y + 26, { col: SK.red, w: 6, key: 'signu', part: ev(t0 + 0.6, 0.3) });
}
const cap = (...a) => { const f = () => capDraw(...a); if (DEFER) DEFER.push(f); else f(); };
const signCap = (t) => { const f = () => sign(t); if (DEFER) DEFER.push(f); else f(); };

// ---- the one era: the jar on the page
function sceneJar() {
  const cu = TIMELINE.cues;
  sketchPage({ grid: 'dots' });
  marginLife();
  drawJar();
  drawRoots();
  [[360, 1120, 42, cu.b1, 'bb1'], [450, 1170, 34, cu.b2, 'bb2'], [610, 1110, 46, cu.b3, 'bb3']].forEach(([x, y, r, t, k]) => bigBubble(x, y, r, t, k));
  bigBubble(625, 1080, 40, cu.pass - 0.25, 'bbpass');                         // the one that zips past the hero
  if (TT >= cu.sweat && TT < cu.pushIn + 0.4) for (let i = 0; i < 2; i++) sweat(470 - i * 16, 690 + i * 10, (TT - cu.sweat) * 1.2 % 1 + i * 0.3, 'rsw' + i);
  const stand = springMove(cu.stand, 0, 1, SPRING.heavy) * (TT >= cu.stand ? 1 : 0);
  const sag = TT < cu.droop ? 0.35 : 0.35 * (1 - ev(cu.droop, 0.5));         // it sags as the line is spoken
  const top = drawSprout(Math.max(sag, stand));
  if (TT >= cu.check) checkMark(top[0] + 150, top[1] - 10, 1.4, ev(cu.check, 0.3));
  drawHero();
  drawPencilProp();
  cap(0.4, 2.1, ['뿌리도 숨을 쉰다'], [[0, '숨']]);
  cap(2.1, 4.65, ['큰 기포는', '금방 터진다'], [[1, '터진다']]);
  cap(4.65, 7.6, ['나노버블은', '물속에 머문다'], [[1, '머문다']]);
  cap(7.6, 10.45, ['뿌리 곁에', '산소를 채운다'], [[1, '산소']]);
  cap(10.45, 12.2, ['뿌리가 다시', '숨쉰다'], [[1, '숨쉰다']]);
  signCap(cu.sign);
}
