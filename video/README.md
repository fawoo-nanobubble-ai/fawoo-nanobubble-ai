# 영상 제작 스킬

이 저장소에서 Claude Code를 열면 아래 스킬이 자동으로 잡힌다. 플러그인 세 개는 `.claude/settings.json`에 프로젝트 단위로 등록돼 있어서, 처음 열 때 "이 마켓플레이스를 신뢰하겠냐"는 확인만 한 번 누르면 된다.

| 스킬 | 호출 | 용도 | 상업 이용 | 추가 비용 |
|---|---|---|---|---|
| 하이퍼프레임 (HeyGen) | `/hyperframes` | 자막·도형·이미지 모션그래픽, 릴스, 제품 설명 영상 | 가능 (Apache-2.0) | 없음 |
| 레모 오퍼스카 | `/lemo-opuscar` | 수채화·수묵화 등 43가지 필름 스타일 단편 | 가능 (MIT) | 없음 |
| 콜라주 B-roll | `/collage-broll-explainers` | 신문 콜라주 질감의 5초 보조 화면 | 가능 (MIT) | 이미지·영상·음성 생성 API 사용료 |
| 애니메이트 (cth9191) | `/animate` | 레퍼런스 이미지·영상으로 스타일을 맞춘 설명 애니메이션 (스케치북·컷페이퍼·아이소메트릭 등 7종 내장), 스토리보드 승인 후 MP4로 출력 (9:16·1:1·4:5·16:9) | 가능 (MIT) | 없음 |
| 손그림 카툰 | `/clawd-animation` | 붓 그림 캐릭터 애니메이션 (표정 31종) | 코드는 가능 (MIT), 캐릭터는 아래 주의 참고 | 없음 |

## 필요한 프로그램

- Node.js 22 이상, ffmpeg (레모 오퍼스카는 ffmpeg 7 이상), Python 3.11 이상
- 맥: `brew install node ffmpeg python`
- 손그림 카툰은 Chrome이 있어야 한다
- 애니메이트는 전역 Playwright가 있어야 한다: `npm i -g playwright && npx playwright install chromium`. 내레이션의 단어별 타이밍을 맞추려면 `pip install faster-whisper`도 깐다(선택)

## 첫 영상 예시

```
/hyperframes 로 9:16 세로 릴스용 10초 영상 만들어줘.
첫 화면에 "나노버블 3가지 효과" 제목이 튀어나오고,
1~3번 항목이 하나씩 위로 올라오게 해줘. 배경은 남색, 강조색은 하늘색.
```

```
/lemo-opuscar 수채화 스타일로 30초 영상. 주제는 산소 나노버블수로 키운 딸기 농장의 하루.
```

## 주의

- **콜라주 B-roll**은 MaxFusion(`.mcp.json`에 등록, 처음 쓸 때 로그인) 또는 Google AI Studio + ElevenLabs API 키가 필요하다. 쓴 만큼 과금된다.
- **손그림 카툰**의 주인공 Clawd는 Anthropic의 마스코트다. 회사 홍보물에는 화우나노텍 캐릭터로 바꿔서 쓴다. 키트는 `video/claude-animation-base/`에 있다.
- **원테이크(onetake)는 넣지 않았다.** PolyForm Noncommercial 라이선스라서 회사 홍보 영상에는 쓸 수 없다. 개인 용도로만 쓸 거라면 본인 PC에서 따로 설치한다:
  `git clone https://github.com/feitangyuan/onetake.git ~/.claude/skills/onetake`
- 하이퍼프레임은 기본적으로 사용 통계를 HeyGen에 보낸다. 이 저장소에서는 `.claude/settings.json`에서 `HYPERFRAMES_NO_TELEMETRY=1`로 꺼 두었다.
