  // SCORE BODY — nanobubble root (inside buildScore(); see kit/score-head.js). D major, 120 BPM.
  // Thin and graphite-grey early, the hero's rising fifth when it appears, a hard stop before the gift,
  // the loudest stab + sub on the gift, a flat chord decaying under the signature.
  const T = TIMELINE, cu = T.cues;
  to = 'm';
  pad(0.0, 2.1, ['D3', 'A3'], 0.018, { type: 'triangle', cut: 700, att: 0.4, rel: 0.3 });                      // the sagging sprout: thin
  pad(2.0, 4.6, ['B2', 'Fs3', 'D4'], 0.026, { type: 'triangle', cut: 800, att: 0.2, rel: 0.25 });               // big bubbles
  pad(4.5, 9.6, ['D3', 'A3', 'E4', 'Fs4'], 0.034, { cut: 1100, att: 0.3, rel: 0.12, send: 0.35 });             // under the water
  for (let i = 0; i < 9; i++) pluck(4.75 + i * BEAT, nz(['D4', 'A4', 'Fs4', 'A4'][i % 4]), 0.08, (i % 2 ? 0.2 : -0.2), 0.28, 2600, 0.3);   // a slow walk
  [['D5', 0], ['A5', E8]].forEach(([n, dt]) => pluck(cu.heroInk + dt, nz(n), 0.2, 0.15, 0.5, 4200, 0.4));     // the hero's motif: a rising fifth
  [['D5', 0], ['A5', E8], ['D6', BEAT]].forEach(([n, dt]) => pluck(cu.drift + dt, nz(n), 0.14, 0.1, 0.45, 3800, 0.4));   // off it drifts
  // the hush: nothing sounds in [cu.hush, cu.gift)
  pluck(cu.gift, nz('D4'), 0.5, 0, 0.45, 5200, 0.2);                                                           // the gift: a chord stab
  pluck(cu.gift, nz('Fs4'), 0.42, -0.15, 0.45, 5200, 0.2);
  pluck(cu.gift, nz('A4'), 0.42, 0.15, 0.45, 5200, 0.2);
  pluck(cu.gift, nz('D5'), 0.36, 0, 0.45, 5200, 0.25);
  sub(cu.gift, 0.55);
  pad(cu.gift + 0.3, cu.stand, ['D2', 'A2', 'Fs3', 'A3', 'E4'], 0.03, { cut: 900, att: 0.5, rel: 0.6, send: 0.45 });   // flat chord after the hit
  pad(cu.stand, DURATION, ['D2', 'A2', 'Fs3', 'E4'], 0.009, { cut: 700, att: 0.4, rel: 1.2, send: 0.5 });          // then it decays
  [cu.gift + 0.5, cu.gift + 1.0].forEach((t, i) => pluck(t, nz(i ? 'A5' : 'Fs5'), 0.12, 0.2, 0.35, 3000, 0.3));      // its hops
  pluck(cu.check, nz('A5'), 0.07, 0.25, 0.4, 3600, 0.35);                                                      // the check mark
  to = 's';
  for (let i = 0; i < 10; i++) noiseHit(cu.root + i * E16, 0.06, 'bandpass', 3400 + (i % 3) * 300, 2, 0.04, -0.15);   // pencil: the root
  [cu.b1, cu.b2, cu.b3].forEach((t, i) => {                                                                    // big bubbles: drawn, rise, pop
    blip(t + 0.25, 260 + i * 40, 520 + i * 60, cu.rise, 0.025, -0.3 + i * 0.3);
    noiseHit(t + 0.25 + cu.rise, 0.05, 'bandpass', 1800 + i * 300, 3, 0.16, -0.3 + i * 0.3, 0.1);
    blip(t + 0.25 + cu.rise, 900 + i * 80, 1500, 0.06, 0.08, -0.3 + i * 0.3);
  });
  sweep(cu.pushIn, cu.pushEnd, 0.02, 2400, 400, 0);                                                            // the dive under water
  for (let i = 0; i < 8; i++) noiseHit(cu.hero + i * E16 / 2, 0.05, 'bandpass', 3800, 2, 0.04, 0.1);           // pencil: the hero
  blip(cu.pass, 300, 700, 0.9, 0.03, -0.2);                                                                   // the big one zips past
  noiseHit(cu.pass + 0.9, 0.05, 'bandpass', 2000, 3, 0.1, -0.2, 0.1);
  for (let i = 0; i < 10; i++) noiseHit(cu.hairs + i * E16, 0.05, 'bandpass', 4200, 2, 0.035, 0.1 * (i % 3 - 1));   // new root hairs written on
  for (let i = 0; i < 10; i++) noiseHit(cu.sign + i * E16, 0.06, 'bandpass', 3200 + (i % 2) * 400, 2, 0.025, 0);      // the signature
