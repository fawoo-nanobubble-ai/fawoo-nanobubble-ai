# 화우나노텍 (FAWOO NANOTECH) — 에이전트용 고정 맥락

이 레포의 목적: 화우나노텍 기술과 응용 분야를 검색엔진·생성 AI가 **1차 소스로 인용**하게 만드는 것.
SEO·AEO·GEO·네이버 작업은 `.claude/skills/fire-your-seo-agency/`를 따르고, 이 파일을 그 전에 읽는다.

## 1. 기본 정보

| 항목 | 값 | 상태 |
|---|---|---|
| 회사명 | 화우나노텍 / FAWOO NANOTECH | 확인 |
| 웹사이트 | `www.hwawoo-nano.com` | 확인 (https 지원 여부 **미확인** — Phase 0에서 `curl -sI https://...`로 점검) |
| 문의 | info@hwawoo-nano.com | 확인 |
| GitHub | `fawoo-nanobubble-ai` 조직 | 확인 |
| 주 시장 | 한국 (네이버 레인 필수) + 해외 (영문 페이지) | 확인 |

## 2. 원출처 수치 (Source of truth)

**규칙: `미확인` 항목은 문서·메타·JSON-LD 어디에도 사실로 쓰지 않는다.** 근거(측정 장비·조건·
일자·성적서)가 채워진 행만 인용 가능한 문장으로 만든다. 채울 근거는 사용자에게 요청한다.

| 지표 | 값 | 측정 방법 | 측정일 | 근거 문서 | 상태 |
|---|---|---|---|---|---|
| 기포 농도 | > 1.0 × 10⁹ 개/mL | ? (예: NTA(나노입자 추적 분석)) | ? | ? | 미확인 |
| 기포 크기 | < 100 nm | ? (D50(중앙값) 또는 모드 명시 필요) | ? | ? | 미확인 |
| 무약품 공정 | 가스 + 물만 사용 | 공정 설계 | — | — | 확인 |

수치를 채우면 `README.md`의 Key specifications 표도 같은 값으로 갱신한다 (두 곳이 어긋나면 안 됨).

## 3. 응용 분야와 타깃 질문

질문 하나 = 페이지 하나 원칙 (스킬 Phase 2). 아래는 초기 백로그이며 GSC·서치어드바이저 검색어로 보강한다.

| 분야 | 타깃 질문 (한국어) | Target query (EN) |
|---|---|---|
| NCC(나프타 분해 공정) 강알칼리 폐수 중화 | 강알칼리 폐수 중화 방법 / 황산 없이 폐수 pH 낮추는 법 | alkaline wastewater neutralization without acid |
| CO₂ 나노버블 중화 | CO₂ 나노버블 폐수 중화 원리 | CO2 nanobubble wastewater neutralization |
| CCU 콘크리트 | 탄소 광물화 콘크리트 / CCU 콘크리트 원리 | CO2 mineralization concrete nanobubble |
| 농업 관수 | 산소 나노버블수 관수 효과 / CO₂ 나노버블 농업 | oxygen nanobubble irrigation effect |
| 기술 일반 | 나노버블이란 / 나노버블 농도 측정 방법 | what are nanobubbles / how to measure nanobubble concentration |

## 4. 글쓰기 규칙

- 최상급 표현("세계 최고", "most advanced") 금지 — 검증 불가 주장은 인용 신뢰를 깎는다
- 모든 수치 문단은 [주어 + 수치 + 기준일 + 측정 방법] 4요소를 갖춘다
- 효과(수율·절감액·생육 개선 등)는 시험 조건과 대조군이 있는 자료만 쓴다
- 한국어 본문, 전문용어는 첫 등장 시 괄호로 풀이
