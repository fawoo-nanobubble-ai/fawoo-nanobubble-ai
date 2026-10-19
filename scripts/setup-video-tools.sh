#!/usr/bin/env bash
# Remotion / HyperFrames / OpenMontage 영상 제작 환경 준비.
# 스킬 파일은 .claude/skills 에 이미 들어 있으므로, 여기서는 런타임과 OpenMontage 작업공간만 준비한다.
#   bash scripts/setup-video-tools.sh            # 점검 + OpenMontage 설치
#   bash scripts/setup-video-tools.sh --check    # 점검만
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OM_DIR="$ROOT/video/OpenMontage"
OM_REPO="https://github.com/calesthio/OpenMontage.git"

ok()   { printf '  [OK]   %s\n' "$1"; }
warn() { printf '  [WARN] %s\n' "$1"; }

echo "== 사전 요구사항"
if command -v node >/dev/null; then
  major="$(node -p 'process.versions.node.split(".")[0]')"
  if [ "$major" -ge 22 ]; then ok "Node $(node -v)"; else warn "Node $(node -v) — HyperFrames는 22 이상 필요"; fi
else
  warn "Node 없음 — https://nodejs.org (22 LTS 이상)"
fi
command -v ffmpeg  >/dev/null && ok "FFmpeg" || warn "FFmpeg 없음 — brew install ffmpeg / sudo apt install ffmpeg / winget install ffmpeg"
command -v python3 >/dev/null && ok "Python $(python3 -V | cut -d' ' -f2)" || warn "Python 3.10+ 없음 (OpenMontage 전용)"
command -v git     >/dev/null && ok "git" || warn "git 없음"

[ "${1:-}" = "--check" ] && exit 0

echo "== OpenMontage 작업공간 ($OM_DIR)"
if [ -d "$OM_DIR/.git" ]; then
  git -C "$OM_DIR" pull --ff-only
else
  mkdir -p "$(dirname "$OM_DIR")"
  git clone --depth 1 "$OM_REPO" "$OM_DIR"
fi

cd "$OM_DIR"
if command -v make >/dev/null; then
  make setup
else
  python3 -m venv .venv
  .venv/bin/python -m pip install -r requirements.txt
  (cd remotion-composer && npm install)
  [ -f .env ] || cp .env.example .env
fi

echo
echo "완료. OpenMontage는 별도 작업공간이다:"
echo "  cd video/OpenMontage && claude"
echo "API 키(선택)는 video/OpenMontage/.env 에 넣는다. 키가 없어도 무료 경로(스톡 영상·Piper TTS)로 동작."
