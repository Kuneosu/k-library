// 이 파일은 scripts/generate-projects-index.js에 의해 자동 생성됩니다.
// 수동으로 편집하지 마세요.

// 프로젝트 배열로 export
export const projects = [
  {
    "id": "ae54c5db-af8e-4b33-b4d7-8fef8c1f7025",
    "name": "대진 도우미",
    "description": "간편한 대진표 생성 및 경기 관리 앱",
    "long_description": "대진 도우미는 대회나 친선 경기 준비를 간편하게 도와주는 대진표 생성 앱입니다.\n복잡한 설정 없이, 종목과 방식만 선택하면 자동으로 대진표가 만들어지고, 경기 결과 입력만으로 실시간 순위가 집계됩니다.\n선수 목록은 그룹(폴더) 단위로 저장할 수 있어, 다음 대회 준비도 훨씬 수월해집니다.\n생성된 대진표와 순위표는 이미지로 캡처하여 친구나 팀원과 쉽게 공유할 수 있습니다.\n서버를 사용하지 않고, 기기 내 데이터베이스로만 작동하여 오프라인에서도 완벽하게 이용할 수 있어요.",
    "tech_stack": [
      "Dart",
      "Flutter",
      "Get It",
      "GoRouter",
      "Drift (SQLite)",
      "Clean Architecture",
      "MVVM",
      "Cursor",
      "Android",
      "iOS",
      "Figma",
      "Confluence",
      "Jira"
    ],
    "start_date": "2025-04-14",
    "end_date": "2025-05-07",
    "version": "1.2518.8",
    "category": "Mobile",
    "status": "완료",
    "size": "Large",
    "github_url": "https://github.com/Kuneosu/bracket_helper",
    "vercel_url": null,
    "npm_url": null,
    "demo_url": "https://play.google.com/store/apps/details?id=com.kuneosu.bracket_helper",
    "features": [
      "대진표 생성 : 3‑단계 마법사로 대회 정보·선수·대진표 설정",
      "\"선수 관리 : 선수 목록 저장",
      "폴더별 그룹 관리",
      "빠른 불러오기\"",
      "\"대진표 편집 : 자동 생성·드래그&드롭 수정",
      "랜덤 재생성\"",
      "\"경기 진행 : 점수 입력",
      "실시간 순위 계산",
      "다중 정렬\"",
      "공유 : 대진표·순위표 이미지 캡처 후 시스템 공유",
      "완전 오프라인 : Drift(SQLite) 로컬 DB — 서버 불필요"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/1.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/2.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/3.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/4.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/5.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/6.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/bracket-helper/7.png?raw=true"
    ],
    "highlights": null,
    "challenges": null,
    "learnings": null,
    "stars": 0,
    "downloads": 382,
    "contributors": 1,
    "created_at": "2025-09-05 00:34:15.8831+00",
    "updated_at\r": "2025-09-05 01:10:57.048305+00"
  },
  {
    "id": "CA5E0B93-C8A6-4C17-82F7-3AE11C540B92",
    "name": "dep-clean",
    "description": "CLI tool to find and delete dependency/cache directories like node_modules, venv, __pycache__",
    "long_description": "node_modules, venv, __pycache__ 등 다양한 언어/프레임워크의 의존성 및 캐시 디렉토리를 검색하고 선택적으로 삭제할 수 있는 CLI 도구입니다. 인터랙티브 체크박스 UI를 통해 삭제할 디렉토리를 개별 선택할 수 있으며, 디스크 공간을 효율적으로 관리할 수 있습니다.",
    "tech_stack": [
      "TypeScript 5",
      "Commander 12",
      "Inquirer 9",
      "Chalk 5",
      "Ora 8",
      "Node.js"
    ],
    "start_date": "2026-01-20",
    "end_date": "2026-01-20",
    "version": "1.1.2",
    "category": "Tool",
    "status": "완료",
    "size": "Small",
    "github_url": "https://github.com/Kuneosu/dep-clean",
    "vercel_url": null,
    "npm_url": "https://www.npmjs.com/package/@kuneosu/dep-clean",
    "demo_url": null,
    "features": [
      "다양한 언어/프레임워크 의존성 디렉토리 자동 감지 (Node.js, Python, Java, Rust, Go, Ruby, PHP, .NET, iOS/macOS)",
      "인터랙티브 체크박스 UI로 삭제할 디렉토리 개별 선택",
      "디렉토리별 용량 표시 및 총 절약 공간 계산",
      "특정 타입만 삭제 또는 제외 옵션 (--only, --exclude)",
      "Dry-run 모드로 미리보기 지원"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/dep-clean/1.png?raw=true"
    ],
    "highlights": [
      "다중 언어/프레임워크 지원으로 통합 의존성 관리 가능",
      "직관적인 인터랙티브 선택 UI 제공",
      "디스크 공간 시각화로 효율적인 정리 지원"
    ],
    "challenges": [
      "다양한 운영체제에서의 파일 시스템 호환성 처리",
      "대용량 디렉토리 스캔 시 성능 최적화"
    ],
    "learnings": [
      "Commander.js를 활용한 CLI 도구 개발",
      "Inquirer.js로 인터랙티브 터미널 UI 구현",
      "Node.js 파일 시스템 API 활용"
    ],
    "stars": 20,
    "downloads": 336,
    "contributors": 1,
    "created_at": "2026-01-20 00:00:00.000000+00",
    "updated_at": "2026-01-20 00:00:00.000000+00"
  },
  {
    "id": "bb3fee80-ae47-49b9-a19b-b84baa92322b",
    "name": "K Library - Developer Projects Showcasee",
    "description": "개발 프로젝트를 체계적으로 관리하고 전시하는 포트폴리오 라이브러리",
    "long_description": "사이드 프로젝트와 토이 프로젝트들을 체계적으로 관리하고 전시하는 개인 프로젝트 라이브러리입니다. 다중 뷰 시스템, 고급 이미지 갤러리, 관리자 시스템 등 현대적인 웹 애플리케이션의 모든 기능을 갖춘 포트폴리오 플랫폼입니다.",
    "tech_stack": [
      "Vibe Coding",
      "Claude Code",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Portal",
      "GitHub JSON Storage",
      "OpenAI API"
    ],
    "start_date": "2025-09-04",
    "end_date": "2025-09-04",
    "version": "1.0.0",
    "category": "Web",
    "status": "진행중",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/k-library",
    "vercel_url": "https://k-library.vercel.app/",
    "npm_url": null,
    "demo_url": "https://k-library.vercel.app/",
    "features": [
      "다중 뷰 프로젝트 관리 (리스트/갤러리/테이블)",
      "React Portal 기반 모달 시스템",
      "드래그 스크롤 이미지 갤러리",
      "풀스크린 이미지 뷰어",
      "GitHub JSON 기반 데이터 저장 및 버전 관리",
      "개발 환경 전용 관리자 시스템 (localStorage 인증)",
      "AI 기반 프로젝트 생성 기능 (OpenAI API)",
      "실시간 검색 및 필터링",
      "라이트/다크 테마 시스템",
      "완전 반응형 디자인",
      "TypeScript 타입 안전성"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/logo.png?raw=true"
    ],
    "highlights": [
      "Supabase에서 GitHub JSON으로 성공적인 마이그레이션 - 데이터베이스 없이 정적 사이트 구현",
      "Git 기반 데이터 관리 워크플로우: JSON 편집 → Git Commit → Vercel 자동 배포",
      "개발/프로덕션 환경 분리: 개발 환경에서만 AI 프로젝트 생성 및 관리 기능 제공",
      "React Portal을 활용한 모달 z-index 문제 해결",
      "Framer Motion을 이용한 자연스러운 드래그 스크롤 구현",
      "Next.js 15 App Router와 TypeScript 완벽 통합",
      "3가지 뷰 모드로 사용자 경험 최적화"
    ],
    "challenges": [
      "Supabase에서 GitHub JSON으로 전환: 데이터베이스 의존성 완전 제거 및 타입 안전성 유지",
      "CSV to JSON 변환: PostgreSQL 배열 형식, 이스케이프 문자, 멀티라인 필드 파싱 문제 해결",
      "개별 프로젝트 파일 관리: projects/ 폴더에 각 프로젝트를 독립 JSON 파일로 분리 관리",
      "React Portal의 document.body 렌더링으로 인한 z-index 충돌",
      "Framer Motion PanInfo를 활용한 터치/마우스 이벤트 통합",
      "Next.js 빌드 시 ESLint/TypeScript 설정 최적화",
      "이미지 비율 문제로 인한 다중 뷰 시스템 필요성"
    ],
    "learnings": [
      "데이터베이스 없는 정적 사이트 아키텍처: GitHub을 데이터 저장소로 활용하는 혁신적 접근",
      "CSV 파싱의 복잡성: PostgreSQL/JSON 배열 형식, 따옴표 이스케이핑, 멀티라인 처리 완전 이해",
      "모듈형 데이터 구조: 개별 JSON 파일 관리로 Git diff 최적화 및 유지보수성 향상",
      "환경 기반 기능 분리: process.env.NODE_ENV 활용한 개발/프로덕션 차별화 전략",
      "React Portal 활용법과 모달 렌더링 최적화",
      "Framer Motion의 고급 제스처 및 애니메이션 기법",
      "Next.js 15의 새로운 기능과 성능 최적화",
      "사용자 경험 개선을 위한 인터페이스 설계"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2025-09-04 04:41:50.738476+00",
    "updated_at\r": "2025-09-04 23:53:17.640913+00"
  },
  {
    "id": "26016AD2-C6FC-4D69-934F-B8B5BCD03DCD",
    "name": "make-slide",
    "description": "AI presentation skill — generate single-file HTML slides with 10 themes, 4 layouts, PPTX export, and auto image search",
    "long_description": "AI 코딩 에이전트(Claude Code, Gemini CLI, Codex, Cursor 등)가 단일 HTML 파일로 고품질 프레젠테이션을 생성하는 범용 스킬. 사전 제작된 10개 테마 템플릿을 참조하여 토큰 효율적이고 일관된 품질의 슬라이드를 제로 의존성으로 생성합니다.",
    "tech_stack": [
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "start_date": "2026-03-18",
    "end_date": "2026-03-25",
    "version": "2.3.1",
    "category": "Tool",
    "status": "완료",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/make-slide",
    "vercel_url": "https://make-slide.vercel.app",
    "npm_url": "https://www.npmjs.com/package/make-slide",
    "demo_url": null,
    "features": [
      "10개 프로페셔널 테마 (다크, 라이트, 기업용, 그라디언트 등)",
      "단일 HTML 파일 출력 — 빌드 불필요, 브라우저에서 바로 열기",
      "발표자 노트 (프레젠터 모드, S키)",
      "PDF 출력 (Ctrl+P, @media print 스타일)",
      "4가지 레이아웃 스타일 (Centered, Wide, Split, Editorial)",
      "PPTX(PowerPoint) 변환 지원",
      "Unsplash 자동 이미지 검색 및 배치",
      "CSS-Only 차트 (바 차트, 프로그레스 링, KPI 카드)",
      "키보드 내비게이션 및 터치/스와이프 지원",
      "npx make-slide init으로 간편 설치"
    ],
    "screenshots": [],
    "highlights": [
      "AI 에이전트를 위한 디자인 시스템 — 토큰 절약하면서 일관된 품질 보장",
      "Claude Code, Gemini CLI, Codex, Cursor 등 다양한 AI 도구 호환",
      "npx 한 줄 명령으로 모든 AI 코딩 환경에 스킬 설치"
    ],
    "challenges": [
      "10개 테마 각각의 디자인 일관성 유지하면서 다양한 슬라이드 타입 지원",
      "단일 HTML 파일 내에 모든 CSS/JS를 인라인으로 포함하면서 성능 최적화",
      "PPTX 변환 시 HTML 레이아웃과 시각적 일관성 유지"
    ],
    "learnings": [
      "AI 에이전트의 토큰 효율성을 위한 레퍼런스 기반 생성 패턴 설계",
      "다중 AI 도구 환경(Claude, Gemini, Codex, Cursor)에서의 호환성 확보 전략",
      "제로 의존성 단일 파일 프레젠테이션 아키텍처 구축"
    ],
    "stars": 66,
    "downloads": 350,
    "contributors": 1,
    "created_at": "2026-03-18 00:00:00.000000+00",
    "updated_at": "2026-03-25 00:00:00.000000+00"
  },
  {
    "id": "BDA41C8D-4AC4-4ED1-A2B2-01445BCAB5D2",
    "name": "Multi-Agent System (MAS)",
    "description": "Multi-Agent System with Claude Code - Orchestrated AI agents for software development",
    "long_description": "AI 에이전트들이 협업하여 소프트웨어 개발을 자동화하는 시스템. 9개의 전문 AI 에이전트(orchestrator, requirement-analyst, ux-designer, tech-architect, planner, test-designer, developer, reviewer, documenter)가 파일 기반 IPC로 통신하며 협력합니다.",
    "tech_stack": [
      "Node.js",
      "Bash",
      "Claude Code",
      "tmux",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "start_date": "2025-11-21",
    "end_date": "2026-01-21",
    "version": "1.0.0",
    "category": "Tool",
    "status": "완료",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/Claude-Multi-Agent-System",
    "vercel_url": null,
    "npm_url": null,
    "demo_url": null,
    "features": [
      "9개 전문 AI 에이전트 협업 시스템",
      "TDD 방식 개발 파이프라인 (Test Designer → Developer → Reviewer)",
      "웹 대시보드로 실시간 모니터링",
      "에이전트별 Claude 모델 설정 (opus/sonnet/haiku)",
      "파일 기반 IPC로 안정적인 에이전트 간 통신"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/multi-agent-system/1.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/multi-agent-system/2.png?raw=true"
    ],
    "highlights": [
      "Claude Code 기반 멀티 에이전트 오케스트레이션 구현",
      "tmux를 활용한 병렬 에이전트 관리",
      "실시간 웹 대시보드 모니터링 시스템"
    ],
    "challenges": [
      "여러 AI 에이전트 간 효과적인 통신 프로토콜 설계",
      "파일 기반 IPC로 안정적인 시그널 처리 구현",
      "다양한 실행 모드(터미널/대시보드, 수동/자동) 지원"
    ],
    "learnings": [
      "멀티 에이전트 시스템 아키텍처 설계",
      "tmux 세션 프로그래매틱 제어",
      "Claude Code를 활용한 AI 에이전트 개발"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2025-11-21 00:00:00.000000+00",
    "updated_at": "2026-01-21 00:00:00.000000+00"
  },
  {
    "id": "7f8e9a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b",
    "name": "P-write-vacy",
    "description": "프라이버시를 보호하는 텍스트 에디터 - 옆에서 보는 사람으로부터 글을 보호합니다",
    "long_description": "커서 주변만 선명하게 표시하고 나머지는 블러 처리하여 어깨 너머 훔쳐보기(shoulder surfing)로부터 작성 중인 글을 보호하는 프라이버시 중심 텍스트 에디터. Electron 데스크톱 앱으로 제공되며 파일 관리, 마크다운 지원, 커스터마이징 가능한 포커스 영역 등의 기능을 제공합니다.",
    "tech_stack": [
      "React 19",
      "TypeScript",
      "Electron 39",
      "Vite 7",
      "TailwindCSS",
      "React Markdown",
      "remark-gfm",
      "react-i18next",
      "Jest",
      "electron-builder"
    ],
    "start_date": "2025-11-05",
    "end_date": "2025-11-13",
    "version": "1.0.0-beta",
    "category": "Tool",
    "status": "완료",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/P-write-vacy",
    "vercel_url": null,
    "npm_url": null,
    "demo_url": null,
    "features": [
      "프라이버시 모드 - 커서 주변만 선명하게 표시하고 나머지는 블러 처리 (타원형/원형)",
      "실시간 포커스 추적 - 텍스트 입력 시 커서를 자동으로 따라가는 포커스 영역",
      "파일 탐색기 - 폴더/파일 생성/수정/삭제, 다중 선택, 드래그 앤 드롭",
      "자동 저장 - 파일 수정 시 1초 후 자동 저장 및 상태 표시",
      "마크다운 지원 - GitHub Flavored Markdown 렌더링 및 편집 모드 전환",
      "프리셋 시스템 - 최대 3개의 포커스 설정 프리셋 저장/로드",
      "다국어 지원 - 한국어/영어 지원 (react-i18next)",
      "온보딩 화면 - 4페이지 인터랙티브 가이드 (키보드 네비게이션 지원)",
      "Toast 알림 시스템 - 성공/에러/정보/경고 메시지 표시",
      "에러 바운더리 - React 에러 자동 감지 및 복구",
      "저장 상태 표시 - 저장 중/저장 완료/저장 실패 상태 시각화",
      "키보드 단축키 - 프라이버시 모드 토글, 파일 탐색기 열기, 포커스 크기 조절",
      "커스터마이징 - 포커스 크기/모양, 블러 색상/투명도/강도, 배경/텍스트 색상",
      "Apple 공증 - Developer ID Application 인증서로 코드 서명 및 notarization 완료",
      "보안 강화 - 파일 경로 검증, 파일 크기 제한 (100MB), DevTools 프로덕션 제거"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/p-write-vacy/1.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/p-write-vacy/2.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/p-write-vacy/3.png?raw=true"
    ],
    "highlights": [
      "어깨 너머 훔쳐보기(shoulder surfing) 방지를 위한 독특한 UX",
      "순수 브라우저 API(Selection API, ContentEditable) 활용",
      "Electron으로 네이티브 데스크톱 앱 경험 제공",
      "대규모 리팩토링 - FileExplorer 1,497줄 → 330줄 (78% 감소, 11개 모듈 분리)",
      "포괄적인 테스트 - Jest 106개 테스트, 89% 커버리지 달성",
      "Apple 공증 완료 - Developer ID Application 인증서로 정식 배포 준비",
      "다국어 지원 - react-i18next 기반 한국어/영어 완벽 지원"
    ],
    "challenges": [
      "contenteditable 요소에서 커서 위치 실시간 추적",
      "프라이버시 모드 전환 시 자연스러운 블러 애니메이션 구현",
      "파일 탐색기 키보드 단축키와 에디터 입력 이벤트 충돌 해결",
      "FileExplorer 대규모 리팩토링 - 1,497줄을 11개 모듈로 분리하며 타입 안전성 100% 유지",
      "Apple Developer ID Application 인증서 발급 및 notarization 설정",
      "react-i18next 기반 다국어 지원 구현 (컴포넌트 전역 번역)",
      "Jest 테스트 환경 구축 및 89% 커버리지 달성 (106개 테스트)",
      "온보딩 페이지에서 macOS 윈도우 드래그 영역 설정"
    ],
    "learnings": [
      "React에서 contenteditable 요소 제어 및 Selection API 활용",
      "Electron 데스크톱 앱 개발 및 IPC 통신 보안 (경로 검증, 파일 크기 제한)",
      "TypeScript strict 모드에서의 타입 안전성 100% 확보",
      "electron-builder를 통한 크로스 플랫폼 빌드 자동화",
      "대규모 컴포넌트 리팩토링 - 단일 파일(1,497줄)을 11개 모듈로 분리",
      "Custom Hooks 패턴 활용 - 6개 hooks로 로직 분리 및 재사용성 향상",
      "Jest 테스트 환경 구축 - React Testing Library, 89% 커버리지 달성",
      "Apple Developer ID Application 인증서 발급 및 notarization 프로세스",
      "react-i18next를 통한 다국어 지원 구현 (namespace, context 활용)",
      "Toast 알림 시스템 구현 - Context API 기반 전역 상태 관리",
      "Error Boundary 패턴 - React 에러 감지 및 graceful degradation",
      "macOS 윈도우 커스터마이징 - WebkitAppRegion을 통한 드래그 영역 설정"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2025-11-05 00:00:00.000000+00",
    "updated_at": "2025-11-13 00:00:00.000000+00"
  },
  {
    "id": "FD81F953-2191-4B21-A64D-67080F494012",
    "name": "project-capture",
    "description": "웹 앱 라우트를 분석하고 캡처 범위와 로그인 방식을 확인한 뒤 Playwright로 화면 캡처 리포트를 생성하는 Codex 스킬 및 CLI 도구입니다.",
    "long_description": "웹 프로젝트를 분석해 화면 후보를 찾고, 캡처 범위와 로그인 방식을 사용자에게 확인한 뒤 Playwright로 선택된 화면을 캡처하는 AI 에이전트용 스킬이자 CLI 도구입니다. Codex 스킬로 사용할 수 있고, npm 패키지와 standalone script 형태로 Claude Code, Gemini CLI 등 다른 AI 코딩 도구에서도 활용할 수 있습니다.",
    "tech_stack": [
      "Node.js 18",
      "JavaScript",
      "Python 3",
      "Playwright",
      "npm",
      "Codex Skill"
    ],
    "start_date": "2026-06-04",
    "end_date": "2026-06-04",
    "version": "0.1.0",
    "category": "Tool",
    "status": "완료",
    "size": "Small",
    "github_url": "https://github.com/Kuneosu/project-capture",
    "vercel_url": null,
    "npm_url": "https://www.npmjs.com/package/project-capture",
    "demo_url": null,
    "features": [
      "프로젝트 구조 분석을 통한 웹 화면 후보 탐색",
      "Next.js, Remix, React Router, 일반 SPA 라우트 패턴 분석",
      "캡처 전 전체, 핵심 도메인, 특정 도메인, 수동 지정 등 범위 선택",
      "로그인 필요 여부 감지 및 수동 로그인, 환경변수 로그인 지원",
      "동적 라우트 샘플 확인 후 캡처 또는 제외 처리",
      "전체 스크롤 길이 캡처와 지정한 viewport 기준 캡처 선택",
      "Playwright 기반 스크린샷 저장 및 Markdown/JSON 리포트 생성",
      "npx project-capture init으로 Codex, Claude 계열 에이전트 환경에 설치"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/project-capture/1.png?raw=true"
    ],
    "highlights": [
      "AI 에이전트가 화면 캡처 전에 프로젝트를 분석하고 사용자에게 범위를 확인하는 안전한 워크플로우 제공",
      "Codex 스킬과 npm CLI를 함께 제공해 여러 AI 코딩 도구와 일반 터미널에서 재사용 가능",
      "로그인, 동적 라우트, 캡처 방식처럼 자동화가 불안정해지기 쉬운 지점을 명시적 확인 단계로 분리"
    ],
    "challenges": [
      "프레임워크별 라우트 구조가 달라 정적 분석 기반의 best-effort 탐색 규칙 설계 필요",
      "로그인, SSO, OTP, 동적 라우트처럼 자동화가 어려운 화면을 안전하게 처리하는 정책 정리",
      "Codex 스킬 형식과 다른 AI 에이전트 및 npm CLI 사용 방식을 동시에 지원하는 배포 구조 구성"
    ],
    "learnings": [
      "AI 에이전트 스킬을 단순 지침서가 아니라 실행 가능한 CLI와 함께 배포하는 구조 설계",
      "Playwright 캡처 자동화에서 전체 페이지와 viewport 캡처 요구를 명확히 분리하는 방식",
      "Codex 외 Claude Code, Gemini CLI 등에서도 사용할 수 있는 에이전트 친화적 설치 흐름 구성"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2026-06-04 00:00:00.000000+00",
    "updated_at": "2026-06-04 00:00:00.000000+00"
  },
  {
    "id": "80834673-0852-473c-9eed-a660b7a9c71b",
    "name": "Rubik's Cube 3D Web Application",
    "description": "웹 브라우저에서 실행되는 고성능 3D 루빅스 큐브 시뮬레이터",
    "long_description": "Three.js와 React를 사용하여 실제 큐브와 동일한 조작감을 제공하며, 스피드큐빙 타이머와 랭킹 시스템을 포함한 종합 플랫폼입니다.",
    "tech_stack": [
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "React",
      "TypeScript",
      "Supabase",
      "Vite",
      "Vibe Coding"
    ],
    "start_date": "2025-09-11",
    "end_date": "2025-09-16",
    "version": "1.0.0",
    "category": "Web",
    "status": "완료",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/rubiks-cube",
    "vercel_url": "https://rubiks-cube-sandy.vercel.app/",
    "npm_url": null,
    "demo_url": null,
    "features": [
      "3D 루빅스 큐브 시뮬레이션",
      "스피드큐빙 타이머 (ms 정밀도)",
      "16-카메라 그리드 네비게이션",
      "QWEASD 직관적인 키보드 조작",
      "온라인 랭킹 시스템",
      "25수 랜덤 섞기",
      "실시간 히스토리 추적",
      "물리 기반 렌더링 (PBR)",
      "영어/한국어 다국어 지원"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/rubiks-cube/01.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/rubiks-cube/02.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/rubiks-cube/03.png?raw=true"
    ],
    "highlights": [
      "60+ FPS 실시간 3D 렌더링 구현",
      "부드러운 애니메이션 최적화",
      "카메라 상대적 회전 시스템으로 직관적 조작",
      "Supabase 기반 실시간 온라인 랭킹 시스템",
      "27개 큐블렛 인스턴싱으로 메모리 최적화",
      "물리 기반 재질과 실시간 그림자 구현",
      "i18n 기반 영어/한국어 다국어 지원으로 글로벌 사용자 경험 제공"
    ],
    "challenges": [
      "Three.js에서 카메라 상대적 큐브 회전 로직 구현",
      "React Three Fiber와 GSAP 애니메이션 동기화",
      "큐브 해결 상태 실시간 검증 알고리즘 최적화",
      "27개 큐블렛의 복잡한 상태 관리",
      "TypeScript에서 Three.js 객체 타입 정의"
    ],
    "learnings": [
      "React Three Fiber를 활용한 선언적 3D 프로그래밍",
      "GSAP과 Three.js 통합으로 부드러운 애니메이션 구현",
      "복잡한 3D 수학 연산과 쿼터니언 회전 처리",
      "WebGL 최적화 기법과 인스턴싱 활용법",
      "사용자 경험 중심의 인터랙션 디자인"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2025-09-16 04:02:25.040727+00",
    "updated_at\r": "2025-09-16 04:12:09.226861+00"
  },
  {
    "id": "54617469-e974-4c54-bec8-9611ebe5a75d",
    "name": "Standby Screen",
    "description": "시계부터 알림까지, 나만의 대기 화면. 잠금·충전·가로 자세에 맞춰 열리는 Android 스탠바이 앱.",
    "long_description": "놓아둔 Android 기기를 나만의 시계·정보 화면으로 바꾸는 Kotlin · Jetpack Compose 기반 개인용 실험 프로젝트입니다. 잠금·충전·가로 자세가 모두 갖춰지면 스탠바이가 열리고, 하나라도 해제되면 닫힙니다. 시계와 사진, GIF, 알림, 출퇴근 게이지를 원하는 위치에 배치하고 여러 디자인을 프리셋으로 저장할 수 있습니다. Android 12 이상을 지원하며 Galaxy Z Fold6에서 검증했습니다. 특정 기종에 한정하지 않는 앱을 지향하며, 현재는 Android 구현을 제공합니다. iOS 확장은 검토 단계입니다. 첫 번째 이미지는 생성한 소개 배너이고, 나머지 네 장은 Fold6 검사 앱에서 촬영한 실제 화면입니다.",
    "tech_stack": [
      "Kotlin 2",
      "Jetpack Compose",
      "Material 3",
      "Android SDK 36",
      "AndroidX Window 1",
      "DataStore 1",
      "Gradle 9",
      "JUnit 4"
    ],
    "start_date": "2026-10-29",
    "end_date": "2026-10-29",
    "version": "0.13.0",
    "category": "Mobile",
    "status": "개발중",
    "size": "Medium",
    "github_url": "https://github.com/Kuneosu/standby-aos",
    "vercel_url": null,
    "npm_url": null,
    "demo_url": null,
    "features": [
      "잠금·외부 전원·가로 자세를 함께 감지하는 자동 실행과 조건 해제 시 자동 종료",
      "시계·날짜·배터리·버튼의 위치, 크기, 색상, 정렬, 내부 여백 편집",
      "사진 배경과 여러 GIF 배치, GIF별 재생 속도·반복·투명도 설정",
      "전체 화면 편집, 겹친 요소 목록 선택, 가장자리 맞춤과 중앙 정렬 가이드",
      "여러 디자인의 프리셋 저장·순환과 선택한 요소의 공통 배치",
      "선택한 앱의 알림 누적, 앱별 펼침·접힘, 내용 공개 범위와 기록 삭제 설정",
      "출근 시각 선택·수정, 근무 진행률과 예정 퇴근 표시, 완료 폭죽과 자동 퇴근",
      "유리 스타일 밝기 슬라이더와 수동 적색 야간 모드"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/standby-screen/1.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/standby-screen/2.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/standby-screen/3.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/standby-screen/4.png?raw=true",
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/standby-screen/5.png?raw=true"
    ],
    "highlights": [
      "사용하지 않는 시간을 시계·사진·알림을 보는 개인화 화면으로 전환",
      "실제 가로 화면에서 요소를 편집하고 프리셋 간 배치를 공유",
      "알림 기록 삭제와 원본 앱 알림을 분리하고 표시 내용을 앱별로 선택",
      "일반 사용 앱과 검사 앱의 패키지를 분리해 실기기 검증 기록 관리"
    ],
    "challenges": [
      "Android 백그라운드 실행 제약과 잠금·충전·자세 변화에 따른 진입·종료 처리",
      "Fold의 화면 크기 변화, 요소 겹침, 정렬과 내부 여백을 고려한 편집 좌표 관리",
      "앱별 알림 중복·누적·펼침 상태와 개인정보 표시 범위 관리",
      "출근 시각 변경, 퇴근 예정 시각 계산, 완료 처리와 재진입 상태의 일관성 유지"
    ],
    "learnings": [
      "Jetpack Compose에서 드래그·크기 조절·제스처와 화면 상태를 연결하는 방법",
      "Android 생명주기와 화면·전원·잠금 상태를 함께 다루는 조건 기반 실행 설계",
      "DataStore와 로컬 저장소를 활용한 프리셋·알림·근무 상태 보존",
      "단위 검사와 실제 기기의 잠금·충전·자세 검증을 구분하고 증거를 남기는 방법"
    ],
    "stars": 0,
    "downloads": 0,
    "contributors": 1,
    "created_at": "2026-10-29 00:00:00.000000+00",
    "updated_at": "2026-10-29 00:00:00.000000+00"
  },
  {
    "id": "fc871c5b-ee68-4049-8ff6-b934ecb9e27f",
    "name": "Starvalley Food CLI",
    "description": "Star Valley 구내식당 메뉴 조회 CLI 도구입니다. Claude CLI 기반 완전 자동화 아키텍처로 전환하여 더욱 효율적이고 경제적인 솔루션을 제공합니다.",
    "long_description": "Star Valley Food CLI는 Star Valley 구내식당의 일일 메뉴를 터미널에서 손쉽게 조회할 수 있는 Node.js 기반 CLI 도구입니다. Claude AI를 활용한 완전 자동화 시스템으로 카카오 채널의 메뉴 이미지를 분석하여 텍스트로 변환하고, npm 패키지로 전 세계 어디서든 실시간 조회가 가능합니다.",
    "tech_stack": [
      "Vibe Coding",
      "Claude Code",
      "Node.js",
      "JavaScript",
      "GitHub Actions",
      "Google Gemini API"
    ],
    "start_date": "2025-09-01",
    "end_date": "2025-09-03",
    "version": "3.4.2",
    "category": "Library",
    "status": "완료",
    "size": "Small",
    "github_url": "https://github.com/Kuneosu/Starvalley_food?tab=readme-ov-file",
    "vercel_url": null,
    "npm_url": "https://www.npmjs.com/package/starvalley-food",
    "demo_url": null,
    "features": [
      "GitHub Actions 자동화: 정해진 시간에 자동으로 메뉴 업데이트 및 배포",
      "완전 자동화 파이프라인: 웹 스크래핑 → Gemini API 분석 → GitHub 배포까지 원 스크립트 실행",
      "실시간 메뉴 조회: st-food today 한 줄로 구내식당 메뉴를 1초 내 터미널에서 확인",
      "글로벌 npm 패키지: npm install -g starvalley-food로 전 세계 어디서든 설치 및 사용 가능",
      "다양한 출력 형태: 일반 텍스트, JSON, 상세/간단 모드 등 유연한 출력 옵션"
    ],
    "screenshots": [
      "https://github.com/Kuneosu/image-repo/blob/main/k-library/st-food.png?raw=true"
    ],
    "highlights": [
      "Gemini 2.0 Flash API 한글 OCR: 95%+ 정확도로 카카오 채널 메뉴 이미지를 텍스트로 변환하며 비용 효율적",
      "GitHub Actions 스케줄링: 매일 정해진 시간에 자동으로 메뉴를 업데이트하여 항상 최신 정보 제공",
      "초간소화 시스템: 스크립트 하나로 모든 과정이 실행되어 아주 쉽게 메뉴 데이터 업데이트",
      "GitHub 인프라 활용: 안정적인 데이터 저장소 및 CDN을 통한 빠른 전 세계 접근",
      "CLI 도구의 완성도: 에러 핸들링, 로딩 스피너, 색상 출력 등 사용자 경험 최적화"
    ],
    "challenges": [
      "웹 스크래핑 불안정성: 카카오 채널 구조 변경 시 스크래핑 로직 실패 위험성 해결",
      "AI 분석 신뢰성: 이미지 품질이나 메뉴 형식 변화에 따른 OCR 정확도 유지",
      "\"에러 복구 메커니즘: 네트워크 오류",
      "API 실패",
      "권한 문제 등 다양한 실패 시나리오 대응\"",
      "\"크로스 플랫폼 호환성: macOS",
      "Windows",
      "Linux 환경에서의 Cron 작업 및 권한 설정 차이\""
    ],
    "learnings": [
      "GitHub Actions CI/CD: 스케줄 기반 자동화 워크플로우 구축과 비용 효율적인 운영 방법",
      "AI 모델 비교 및 전환: GPT-4o-mini에서 Gemini 2.0 Flash로 전환하여 성능과 비용 효율성 개선",
      "자동화의 가치: 사람이 개입할 포인트를 최소화 시켜 안정성과 효율성을 향상",
      "npm 생태계 활용: 글로벌 패키지 배포를 통해 로컬 도구를 전 세계 사용자에게 제공하는 방법",
      "GitHub을 DB처럼 활용: 버전 관리 시스템을 실시간 데이터 저장소로 활용하는 창의적 접근",
      "사용자 중심 CLI 설계: 직관적인 명령어 구조와 풍부한 피드백으로 개발자 경험(DX) 최적화"
    ],
    "stars": 0,
    "downloads": 639,
    "contributors": 1,
    "created_at": "2025-09-04 09:16:56.534236+00",
    "updated_at\r": "2025-09-04 23:53:47.371797+00"
  }
] as const;

export default projects;
