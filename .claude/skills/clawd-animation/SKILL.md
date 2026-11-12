---
name: clawd-animation
description: Hand-painted (p5.brush) cartoon animation of the Clawd mascot with 31 emotions, rendered to MP4 by code. Use when asked for a 손그림 카툰, 붓 그림 애니메이션, 마스코트 애니메이션, or a Clawd animation.
---

# Clawd hand-painted animation

The kit lives in `video/claude-animation-base/` (vendored from JohnHeibel/ClaudeAnimationBase, MIT). Work inside that folder.

1. Read `video/claude-animation-base/ANIMATION_GUIDE.md` in full before writing any scene, and look at `docs/emotions.jpg` and `docs/views.jpg`.
2. If `video/claude-animation-base/node_modules` is missing, run `npm install` there.
3. `render.mjs` needs Chrome or Chromium. If none is found, pass `--chrome=<path>` or set `CHROME_PATH` (in Claude Code cloud sessions: `CHROME_PATH=/opt/pw-browsers/chromium`). Machines without a GPU, cloud sessions included, time out on `window.ready` unless you add `--soft-gl`, so call `node render.mjs --clip --out=out/video.mp4 --soft-gl` directly instead of the npm scripts.
4. Write scenes in `src/scenes/`, then render from the kit folder with `npm run sheet` (still frames) or `npm run video` (MP4 into `out/`).
5. Start with 10–15 second clips; render time grows with length.

Clawd is Anthropic's mascot. For 화우나노텍 marketing, swap in the company's own character rather than publishing Clawd as a brand asset.
