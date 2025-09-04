# 🎨 K Library - Developer Projects Showcase

Kuneosu의 사이드 프로젝트와 토이 프로젝트들을 체계적으로 관리하고 전시하는 개인 프로젝트 라이브러리입니다.

## ✨ 주요 기능

### 🏠 개발자 프로필
- 개발자 소개 및 기술 스택 전시
- 소셜 링크 및 연락처 정보
- 프로젝트 통계 대시보드
- 현재 관심 분야 표시

### 📱 다중 뷰 프로젝트 관리
- **리스트 뷰**: 이미지 없는 깔끔한 카드 레이아웃
- **갤러리 뷰**: 4:3 비율 이미지 중심 디스플레이
- **테이블 뷰**: 모든 프로젝트 정보를 한눈에 볼 수 있는 정렬 가능한 테이블
- 카테고리별 분류 (Web, Mobile, Library, API, Tool, Game, Other)
- 프로젝트 상태 관리 (Active, In Progress, Completed, Maintenance, Archived)

### 🔐 관리자 시스템
- Supabase Authentication을 통한 보안 로그인
- React Portal 기반 모달 시스템 (z-index 최적화)
- 완전한 CRUD 프로젝트 관리 (추가/편집/삭제)
- 실시간 UI 업데이트

### 🖼️ 고급 이미지 시스템
- **드래그 스크롤**: 자연스러운 터치/마우스 드래그 기반 갤러리 탐색
- **풀스크린 이미지 뷰어**: 키보드 내비게이션, 썸네일 지원
- 반응형 이미지 최적화 (Next.js Image)
- 접근성 고려 (alt text, 적절한 대비)

### 🔍 검색 및 필터링
- 실시간 텍스트 검색
- 카테고리별 필터링
- 프로젝트 상태별 필터링
- 기술 스택별 필터링
- 필터 초기화 기능

### 🎯 프로젝트 상세보기
- 향상된 모달 인터페이스 (스와이프 가능한 이미지 갤러리)
- 프로젝트 통계 (GitHub 스타, npm 다운로드, 기여자 수)
- 주요 기능 및 하이라이트
- 도전과제 및 배운 점
- GitHub, Vercel, npm 외부 링크 지원

### 🌓 테마 시스템
- 라이트/다크/시스템 모드 지원
- 부드러운 테마 전환 애니메이션
- 사용자 선택 기억
- 완전한 다크모드 호환성

### 🗄️ 데이터베이스 기능
- Supabase PostgreSQL 연동
- 실시간 데이터 동기화
- CRUD 작업 완전 지원
- Row Level Security (RLS) 적용
- TypeScript 타입 안전성 보장

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Theme**: next-themes
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image
- **Deployment**: Vercel Ready

## 🚀 시작하기

### 전제 조건

- Node.js 18 이상
- npm 또는 yarn
- Supabase 계정 (데이터베이스 연동용)

### 설치

1. 저장소 클론
```bash
git clone https://github.com/Kuneosu/k-library.git
cd k-library
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
# .env.example을 복사하여 .env.local 생성
cp .env.example .env.local
```

`.env.local` 파일에 실제 Supabase 정보를 입력하세요:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Supabase 데이터베이스 설정
   - `database/schema.sql` 파일의 SQL을 Supabase SQL Editor에서 실행
   - `database/add_developer_profile_tables.sql` 실행 (개발자 프로필 테이블)
   - `database/admin_policies.sql` 실행 (관리자 권한 정책)

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
│   ├── globals.css          # 전역 스타일 (커스텀 스크롤바, 유틸리티)
│   ├── layout.tsx           # 루트 레이아웃
│   └── page.tsx             # 메인 페이지
├── components/
│   ├── AdminLogin.tsx       # 관리자 로그인 (React Portal)
│   ├── AdminPanel.tsx       # 관리자 패널
│   ├── AddProjectButton.tsx # 프로젝트 추가 플로팅 버튼
│   ├── AddProjectModal.tsx  # 프로젝트 추가 모달
│   ├── DeleteProjectModal.tsx # 프로젝트 삭제 확인 모달
│   ├── DeveloperProfile.tsx # 개발자 프로필 컴포넌트
│   ├── EditProjectModal.tsx # 프로젝트 편집 모달
│   ├── ImageViewer.tsx      # 풀스크린 이미지 뷰어
│   ├── ProjectCard.tsx      # 기본 프로젝트 카드
│   ├── ProjectGalleryCard.tsx # 갤러리 뷰 카드
│   ├── ProjectListCard.tsx  # 리스트 뷰 카드
│   ├── ProjectTableView.tsx # 테이블 뷰 컴포넌트
│   ├── ProjectFilter.tsx    # 필터링 컴포넌트
│   ├── ProjectGrid.tsx      # 다중 뷰 프로젝트 그리드
│   ├── ProjectModal.tsx     # 프로젝트 상세 모달
│   ├── ProjectViewToggle.tsx # 뷰 모드 전환 토글
│   ├── SwipeableImageGallery.tsx # 드래그 스크롤 이미지 갤러리
│   ├── ThemeToggle.tsx      # 테마 토글 버튼
│   └── providers/
│       └── ThemeProvider.tsx # 테마 공급자
├── contexts/
│   └── AuthContext.tsx      # 인증 컨텍스트
├── data/
│   └── mockData.ts          # 모든 데이터 정의
├── database/
│   ├── schema.sql           # 기본 데이터베이스 스키마
│   ├── add_developer_profile_tables.sql # 개발자 프로필 테이블
│   └── admin_policies.sql   # 관리자 권한 정책
├── lib/
│   ├── supabase.ts          # Supabase 클라이언트 설정
│   └── database.ts          # 데이터베이스 CRUD 함수
├── types/
│   └── index.ts             # TypeScript 타입 정의
├── utils/
│   └── dateUtils.ts         # 날짜 유틸리티 함수
├── .env.example             # 환경변수 예시 파일
└── README.md
```

## 🎨 디자인 특징

- **모던 미니멀 디자인**: 깔끔하고 직관적인 인터페이스
- **완전 반응형**: 모바일, 태블릿, 데스크톱 완벽 지원
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환
- **접근성 준수**: WCAG 가이드라인 준수, 키보드 내비게이션
- **일관된 디자인**: 체계적인 컬러 팔레트와 타이포그래피
- **성능 최적화**: Next.js Image, 지연 로딩, 코드 분할

## 🔧 커스터마이징

### 개발자 정보 수정

`data/mockData.ts` 파일에서 `developerProfile` 객체를 수정하세요:

```typescript
export const developerProfile: DeveloperProfile = {
  name: "Your Name",
  title: "Your Title", 
  bio: "Your bio...",
  email: "your.email@domain.com",
  github: "https://github.com/yourusername",
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
    techStack: ["React", "TypeScript", "..."],
    screenshots: ["image1.jpg", "image2.jpg"],
    githubUrl: "https://github.com/yourusername/project",
    // ... 기타 정보
  },
  // ... 더 많은 프로젝트
]
```

## 🌐 배포

이 프로젝트는 Vercel에서 쉽게 배포할 수 있도록 구성되어 있습니다:

1. GitHub 저장소와 연결
2. Vercel에서 프로젝트 import
3. 환경 변수 설정 (Supabase URL, API Key)
4. 자동 배포 완료

**Live Demo**: [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

---

**Made with ❤️ by Kuneosu using Next.js & Supabase**