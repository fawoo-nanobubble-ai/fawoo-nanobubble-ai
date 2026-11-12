# CLAUDE.md

## YouTube 스킬 (`/yt-*`, `.claude/skills/yt-*`)

- 결과물은 한국어로 쓴다. 스킬 원문이 영어여도 대본·제목·설명·답글은 한국어로 낸다.
- 말투 파일(voice.md)은 `~/.claude/youtube/voice.md`를 먼저 찾고, 없으면 이 레포의
  `.claude/youtube/voice.md`를 읽는다. voice.md를 새로 쓰거나 고칠 때는 레포 파일에 저장하고
  `~/.claude/youtube/voice.md`에도 복사한다(클라우드 세션은 홈 폴더가 매번 초기화된다).
- `hookscore.py`는 영어 단어 목록으로 점수를 매긴다. 한국어 훅은 영어로 옮긴 문장으로 채점하고,
  그 점수는 참고용이라고 밝힌다.
- 사용 안내: `docs/youtube-skills-guide.md`
