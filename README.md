# 🎨 K Library - Developer Projects Showcase

매주/매일 진행하는 사이드 프로젝트와 토이 프로젝트들을 체계적으로 관리하고 전시할 수 있는 프로젝트 라이브러리 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🏠 개발자 프로필
- 개발자 소개 및 기술 스택 전시
- 소셜 링크 및 연락처 정보
- 프로젝트 통계 대시보드
- 현재 관심 분야 표시

### 📱 프로젝트 관리
- 10개의 샘플 프로젝트 포함
- 카테고리별 분류 (Web, Mobile, Library, API, Tool, Game, Other)
- 프로젝트 상태 관리 (Active, In Progress, Completed, Maintenance, Archived)
- GitHub, Vercel, npm 링크 지원

### 🔍 검색 및 필터링
- 실시간 텍스트 검색
- 카테고리별 필터링
- 프로젝트 상태별 필터링
- 기술 스택별 필터링
- 필터 초기화 기능

### 🎯 프로젝트 상세보기
- 모달 형태의 상세 정보
- 프로젝트 통계 (스타, 다운로드, 기여자 수)
- 주요 기능 및 하이라이트
- 도전과제 및 배운 점
- 외부 링크 버튼

### 🌓 테마 시스템
- 라이트/다크/시스템 모드 지원
- 부드러운 테마 전환 애니메이션
- 사용자 선택 기억

### 🗄️ 데이터베이스 기능
- Supabase PostgreSQL 연동
- 실시간 데이터 동기화
- CRUD 작업 완전 지원
- Row Level Security (RLS) 적용
- 타입 안전성 보장

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Theme**: next-themes
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 🚀 시작하기

### 전제 조건

- Node.js 18 이상
- npm 또는 yarn
- Supabase 계정 (데이터베이스 연동용)

### 설치

1. 의존성 설치
```bash
npm install
```

2. 환경 변수 설정
```bash
# .env.example을 복사하여 .env.local 생성
cp .env.example .env.local
```

`.env.local` 파일에 실제 Supabase 정보를 입력하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Supabase 데이터베이스 설정
   - `database/schema.sql` 파일의 SQL을 Supabase SQL Editor에서 실행
   - 샘플 데이터가 자동으로 삽입됩니다

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
k-library/
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── DeveloperProfile.tsx # 개발자 프로필 컴포넌트
│   ├── ProjectCard.tsx      # 프로젝트 카드 컴포넌트
│   ├── ProjectFilter.tsx    # 필터링 컴포넌트
│   ├── ProjectGrid.tsx      # 프로젝트 그리드 컴포넌트
│   ├── ProjectModal.tsx     # 프로젝트 상세 모달
│   ├── ThemeToggle.tsx      # 테마 토글 버튼
│   └── providers/
│       └── ThemeProvider.tsx
├── data/
│   └── mockData.ts          # 샘플 데이터
├── database/
│   └── schema.sql           # Supabase 데이터베이스 스키마
├── lib/
│   ├── supabase.ts          # Supabase 클라이언트 설정
│   └── database.ts          # 데이터베이스 CRUD 함수
├── types/
│   └── index.ts             # 타입 정의
├── utils/
│   └── dateUtils.ts         # 날짜 유틸리티 함수
├── .env.example             # 환경변수 예시 파일
└── README.md
```

## 🎨 디자인 특징

- **모던 미니멀 디자인**: 깔끔하고 직관적인 인터페이스
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환
- **접근성 준수**: WCAG 가이드라인 준수
- **컬러 시스템**: 일관된 컬러 팔레트와 의미있는 색상 사용

## 📊 샘플 데이터

프로젝트에는 10개의 다양한 샘플 프로젝트가 포함되어 있습니다:

1. **TaskFlow Pro** - 프로젝트 관리 도구 (웹)
2. **CodeSnippets CLI** - 코드 스니펫 관리 CLI (도구)
3. **React Component Library** - UI 컴포넌트 라이브러리 (라이브러리)
4. **AI Chat Interface** - AI 채팅 인터페이스 (웹)
5. **Mobile Weather App** - 날씨 예보 앱 (모바일)
6. **GraphQL API Gateway** - API 게이트웨이 (API)
7. **Pixel Art Editor** - 픽셀 아트 에디터 (도구)
8. **Markdown Blog Engine** - 블로그 엔진 (웹)
9. **WebSocket Game Server** - 게임 서버 (게임)
10. **Data Visualization Dashboard** - 데이터 시각화 (웹)

## 🔧 커스터마이징

### 개발자 정보 수정

`data/mockData.ts` 파일에서 `developerProfile` 객체를 수정하세요:

```typescript
export const developerProfile: DeveloperProfile = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  // ... 기타 정보
}
```

### 프로젝트 데이터 수정

같은 파일에서 `projects` 배열을 수정하여 본인의 프로젝트를 추가하세요:

```typescript
export const projects: Project[] = [
  {
    id: "1",
    name: "Your Project",
    description: "Project description...",
    // ... 기타 정보
  },
  // ... 더 많은 프로젝트
]
```

## 🌐 배포

이 프로젝트는 Vercel에서 쉽게 배포할 수 있도록 구성되어 있습니다:

1. GitHub에 레포지토리 생성
2. Vercel에서 프로젝트 import
3. 자동 배포 완료

## 📄 라이선스

MIT License

## 🤝 기여

이 프로젝트에 기여하고 싶으시다면:

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Made with ❤️ and Next.js**