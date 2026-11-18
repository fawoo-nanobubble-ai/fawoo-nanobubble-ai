# ECC 스킬 사용 안내

ECC(github.com/affaan-m/ECC, MIT, v2.2.3) 중 화우나노텍 업무에 쓰는 스킬 22개와 에이전트 5개만 골라 `.claude/`에 넣었다. 저장소에 들어 있으므로 이 저장소로 여는 모든 클라우드 세션에서 설치 없이 바로 쓴다.

## 왜 전체 설치를 안 했나

| 항목 | 전체 플러그인(`ecc@ecc`) | 이 저장소 선별본 |
|---|---|---|
| 스킬 / 에이전트 | 425 / 72 | 22 / 5 |
| 매 세션 상시 토큰 | 약 49,700 (`claude plugin details ecc@ecc` 측정, 2026-11-18) | 약 3,200 (설명문 12,674자 ÷ 4, 추정치) |
| 훅(hook, 도구 호출마다 자동 실행되는 스크립트) | 8종 (PreToolUse·SessionStart 등) | 없음 |
| 내용 | Kotlin·Django·홈랩·헬스케어 등 개발 스택 위주 | 리서치·경쟁분석·IR·콘텐츠·특허/논문·자동매매 보안 |
| 클라우드 세션 유지 | `/plugin` 미지원, 홈 폴더 매번 초기화 | git에 있으므로 유지 |

## 상황별로 부르는 법

| 하고 싶은 일 | 스킬 | 예시 요청 |
|---|---|---|
| 시장 규모·경쟁사·기술 스캔 | `market-research` | "CO₂ 나노버블 폐수 중화 시장 규모와 경쟁 기술 조사해줘" |
| 경쟁 분석 3단계 | `competitive-platform-analysis` → `benchmark-methodology` → `competitive-report-structure` | "산업용 나노버블 발생기 경쟁사 선정부터 보고서까지" |
| 애매한 의사결정(go/no-go) | `council` | "CCU 콘크리트 vs 농업 관수, 내년 주력 하나만 고르면?" |
| 신사업 아이디어 검증 | `product-lens` | "나노버블 양식장 사업 PRODUCT-BRIEF 만들어줘" |
| 최신 사실 확인 리서치 | `research-ops` | "2026년 국내 CCU 인증 제도 현황" |
| 논문 검색·리뷰 | `scientific-db-openalex-database`, `scientific-thinking-literature-review` | "나노버블 안정성 논문 2020년 이후 정리" |
| 논문·제안서 평가 | `scientific-thinking-scholar-evaluation` | "이 프리프린트 근거 수준 평가해줘" |
| 미국 특허 조회 | `scientific-db-uspto-database` | "CO₂ 나노버블 중화 관련 미국 특허 선행조사" |
| IR·피치덱·투자 메모 | `investor-materials` | "투자 원페이저 초안" |
| 장문 글 / 채널별 콘텐츠 | `article-writing`, `content-engine` | "백서 요약을 블로그용으로" |
| **X·링크드인 게시** | `fawoo-social-post`(자체) → `brand-voice` → `crosspost` → `x-api` / `social-publisher` | "CO₂ 중화 결과 X랑 링크드인에 올리자" |
| 자동매매 봇 보안 점검 | `llm-trading-agent-security` | "선물 자동매매 봇 키 관리·손실 한도 점검" |
| AI 시스템 비용 줄이기 | `cost-aware-llm-pipeline` | "모델 라우팅으로 API 비용 줄이는 구조" |
| 코드 짜기 전 기존 도구 찾기 / 테스트 먼저 | `search-first`, `tdd-workflow` | "백테스트 모듈 TDD로" |

에이전트(`.claude/agents/`): `planner`(작업 계획), `architect`(시스템 설계), `security-reviewer`(보안 점검), `marketing-agent`(캠페인·카피), `seo-specialist`(기술 SEO 점검). "planner 에이전트로 계획 세워줘"처럼 이름을 부르면 된다.

## X·링크드인 게시 흐름

`fawoo-social-post`가 입구다. ECC 스킬들은 범용이라 화우나노텍 수치 규칙을 모르므로, 이 자체 스킬이 순서를 강제한다.

```text
원문(README·백서·보도자료) → 수치 검증표(CLAUDE.md 3절) → 말투(brand-voice)
→ 채널별 문안(crosspost) → 사용자 승인 → 게시(수동 / x-api / social-publisher)
```

| 게시 경로 | 필요한 것 | 권장 |
|---|---|---|
| 수동 붙여넣기 | 없음 | 첫 배포 |
| X API (`x-api`) | X 개발자 계정·쓰기 권한 앱·OAuth 키 | 정기 게시가 잦아지면 |
| SocialClaw (`social-publisher`) | 외부 유료 서비스 가입, 계정 연결을 제3자에 위탁 | 예약·다채널이 필요할 때, 대표 승인 후 |

## 쓸 때 지킬 것

- **IR·투자 자료 결과물은 커밋하지 않는다**(CLAUDE.md 1절). `investor-materials` 출력은 Drive `FAWOO_ARCHIVE`에 저장한다.
- 스킬이 만든 수치도 CLAUDE.md 3절 원출처 표를 따른다. 표에 없는 값은 `[미검증]`.
- 원문이 영어라도 결과물은 한국어로 받는다.
- API 키가 필요한 스킬: `scientific-db-uspto-database`(USPTO/PatentsView 키), `scientific-db-openalex-database`(키 없이도 동작, 있으면 한도 상향). 키는 채팅에 붙이지 말고 환경 설정의 네트워크 시크릿으로 넣는다.
- 일부 스킬 본문에 `/save-session`, `/browser-qa` 같은 ECC 명령이 나오지만 여기엔 설치하지 않았다. 무시해도 된다.

## 내 PC(로컬 Claude Code)에 전체 설치하려면

로컬 터미널에서 Claude Code를 열고:

```text
/plugin marketplace add https://github.com/affaan-m/ECC
/plugin install ecc@ecc
```

이 저장소 폴더에서 전체 플러그인까지 켜면 같은 이름 스킬이 두 번 잡힌다. 둘 중 하나만 쓴다.

## 스킬 추가·업데이트

1. `git clone --depth 1 https://github.com/affaan-m/ECC` 후 `skills/<이름>`을 `.claude/skills/<이름>`으로 복사
2. 같은 폴더에 `LICENSE`(ECC MIT 원문)와 `SOURCE.txt`(주소·커밋) 추가
3. 기존 스킬과 이름이 겹치면 넣지 않는다(`code-review`, `deep-research`, `seo`, `design-system` 등은 이미 다른 출처가 있음)
4. 이 표와 CLAUDE.md 7절을 같이 고친다

현재 커밋: `3f14a103a8694e51c1df9a806217a6d0b5f7a6f7` (2026-11-17)
