---
name: fawoo-video
description: 화우나노텍 홍보·기술 설명·투자 IR용 영상을 만들 때 Remotion / HyperFrames / OpenMontage 중 무엇을 쓸지 고르고, 화우나노텍 브랜드와 수치 규칙을 적용해 바로 제작에 들어가는 라우터. "영상 만들어줘", "홍보 영상", "숏폼", "릴스", "설명 영상", "모션그래픽", "자막 넣어줘", "IR 영상", "제품 소개 영상" 류 요청에 먼저 사용. Use for any FAWOO NANOTECH video, motion graphic, explainer, short-form or captioned clip request.
---

# FAWOO 영상 제작 라우터

세 도구 모두 "AI가 코드를 써서 영상을 만든다"는 점은 같다. 차이는 무엇으로 그리느냐, 얼마나 자동화돼 있느냐다.

| 도구 | 그리는 방식 | 강점 | 비용·라이선스 | 이 저장소에서 진입점 |
|---|---|---|---|---|
| **HyperFrames** (HeyGen) | HTML + CSS + GSAP(애니메이션 라이브러리) | 모션그래픽, 숫자 카운트업, 설명 영상, 자막. 한글 렌더 확인됨 | Apache-2.0, 회사 규모 무관 무료 | `/hyperframes` |
| **Remotion** | React(웹 UI 프레임워크) 컴포넌트 | 데이터 주입 템플릿 대량 생산(같은 틀에 값만 바꿔 100편) | 3인 이하 무료, **4인 이상 회사는 유료** (Creators $25/좌석/월) | `/remotion-best-practices` |
| **OpenMontage** | 위 두 렌더러 + 스톡 영상·TTS(음성합성)·AI 영상 생성 파이프라인 | 대본→내레이션→소스 수집→편집→자막까지 전 과정 자동 | AGPL-3.0, 생성 API는 사용량 과금(키 없으면 무료 경로) | `video/OpenMontage` 별도 작업공간 |

## 고르는 규칙

1. **기본은 HyperFrames.** 30초~2분짜리 기술 설명, 수치 강조, 로고 스팅, 자막 영상은 전부 여기서 끝난다. 무료이고 라이선스 걱정이 없다.
2. **Remotion은 두 경우만.** ① 이미 Remotion 프로젝트가 있다 ② 같은 템플릿에 현장별 데이터(예: 고객사별 pH·CO₂ 저감량)를 넣어 수십 편을 찍어낸다. 회사 규모상 상업 사용 전 라이선스를 먼저 확인한다.
3. **OpenMontage는 "실사 영상 + 내레이션"이 필요할 때.** 다큐 톤, 스톡 푸티지 몽타주, AI 생성 영상 클립, 다국어 더빙. 이 저장소 안에서 돌리지 말고 `video/OpenMontage`에서 새 세션으로 연다.
4. 애매하면 HyperFrames로 시작한다. 나중에 OpenMontage가 HyperFrames 결과물을 그대로 가져다 쓸 수 있다.

## 화우나노텍 콘텐츠 규칙

- **수치는 출처가 있는 것만 쓴다.** 저장소 `README.md` 기준 공개 수치: 나노버블 밀도 1.0×10⁹ 개/mL 이상, 버블 크기 100nm 이하 균일 분포. 그 밖의 수치(중화 효율, CO₂ 고정량, 수확량 증가율 등)는 사용자에게 근거 자료를 받기 전에는 화면에 넣지 않는다.
- 전문용어는 화면 자막에서 한 번은 풀어 쓴다. 예: `CCU(탄소 포집·활용)`, `NCC(나프타 분해 설비)`.
- 기본 톤: 짙은 남색 배경(#04121f~#0b3b5c) + 흰 글자 + 시안 포인트. 브랜드 가이드가 따로 오면 그쪽이 우선.
- 기본 규격: 가로 1920×1080(웹·IR), 세로 1080×1920(릴스·쇼츠). 요청에 플랫폼이 있으면 그에 맞춘다.
- 글은 사람이 쓴 것처럼. 과장 형용사("혁신적인", "놀라운") 금지, 숫자와 동사로 말한다.

## 바로 쓰는 요청 예시

```
/hyperframes 화우나노텍 나노버블 기술 30초 설명 영상. 세로 1080x1920.
장면: ① 물방울 확대 → ② 100nm 이하 버블 크기 비교(머리카락 굵기 대비) → ③ 1.0×10⁹/mL 카운트업 → ④ 적용 분야 3개(강알칼리 폐수 중화, CCU 콘크리트, 농업 관수) → ⑤ 로고·문의처.
```

```
/remotion-create 고객사별 CO₂ 나노버블 적용 결과 카드 영상 템플릿. props로 회사명·적용 전후 수치를 받는다.
```

```
(video/OpenMontage 에서) 화우나노텍 강알칼리 폐수 중화 기술을 소개하는 75초 다큐 톤 영상. 실사 스톡 영상만, 한국어 내레이션, 차분한 음악.
```

## 내레이션(음성): VoiceStudio

영상에 사람 목소리 내레이션이 필요하면 `/voicestudio` 스킬을 쓴다. VoiceStudio는 내 PC에서 돌아가는 무료 음성 복제·TTS(텍스트→음성) 앱이다(AGPL-3.0, 로컬 처리라 음성 데이터가 외부로 나가지 않는다).

- 설치(내 PC, 1회): macOS/Linux `curl -fsSL https://voicestudio.sh/install | sh` · Windows PowerShell `irm https://voicestudio.sh/install | iex` · 또는 [Releases](https://github.com/debpalash/VoiceStudio/releases/latest)에서 설치 파일.
- 하드웨어: NVIDIA GPU(CUDA)·Apple Silicon은 가속, GPU 없으면 CPU로 느리게 동작(여유 디스크 CPU 약 5GB, CUDA 약 9GB). 기본 모델 최초 다운로드 약 2.3GB. CPU 노트북에서 한국어 복제는 MOSS-TTS-Nano 엔진이 가볍다.
- 포트: 기본 3900. Windows가 예약한 포트면 앱이 4900 등으로 옮기므로 MCP 주소도 맞춰 바꾼다. 확인: `irm http://127.0.0.1:3900/health`
- Claude Code 연결(앱 실행 중일 때): `claude mcp add -s user --transport http voicestudio http://127.0.0.1:3900/mcp/ --header "X-OmniVoice-Client-Id: claude-code"`
- 흐름: 대표·담당자 음성 3초 이상 깨끗한 샘플 → 음성 프로필 저장 → 대본을 WAV로 생성 → HyperFrames/Remotion 타임라인에 오디오로 배치(`/hyperframes-audio`).
- **본인 동의를 받은 목소리만 복제한다.** 제3자 음성 무단 복제는 퍼블리시티권·개인정보 문제가 된다.
- 앱이 꺼져 있거나 Claude Code 클라우드 세션이면 `localhost:3900`에 닿지 않는다. 이때는 대본·자막까지만 만들고, 음성 생성은 로컬에서 한다.

## 실행 환경 메모

- 로컬 PC: Node 22+, FFmpeg 필요. `bash scripts/setup-video-tools.sh --check`로 점검.
- OpenMontage 설치: `bash scripts/setup-video-tools.sh` (→ `video/OpenMontage`, git에는 올라가지 않음).
- Claude Code 클라우드 세션처럼 CDN이 막힌 환경에서는:
  - HyperFrames: `<script src="https://cdn.jsdelivr.net/...gsap...">`가 로드 실패한다. `npm i gsap` 후 `node_modules/gsap/dist/gsap.min.js`를 프로젝트 안으로 복사해 상대경로로 참조한다.
  - Remotion: 브라우저 자동 다운로드가 실패한다. `--browser-executable=/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`을 넘긴다.
- 렌더 결과(`*.mp4`)와 `node_modules/`는 커밋하지 않는다.

## 출처

- Remotion 스킬: https://github.com/remotion-dev/skills (`remotion-*` 12개)
- HyperFrames 스킬: https://github.com/heygen-com/hyperframes (`hyperframes*`, `general-video`, `motion-graphics` 등 21개)
- OpenMontage: https://github.com/calesthio/OpenMontage
- VoiceStudio 스킬: https://github.com/debpalash/VoiceStudio (`voicestudio`)
- 각 스킬 폴더의 `SOURCE.txt`에 커밋 해시 기록.
