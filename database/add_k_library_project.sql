-- K Library 프로젝트 데이터 추가 SQL

INSERT INTO projects (
    name,
    description,
    long_description,
    tech_stack,
    start_date,
    end_date,
    version,
    category,
    status,
    size,
    github_url,
    vercel_url,
    demo_url,
    features,
    screenshots,
    highlights,
    challenges,
    learnings,
    stars,
    downloads,
    contributors
) VALUES (
    'K Library - Developer Projects Showcase',
    '개발자 프로젝트를 체계적으로 관리하고 전시하는 포트폴리오 라이브러리',
    'Kuneosu의 사이드 프로젝트와 토이 프로젝트들을 체계적으로 관리하고 전시하는 개인 프로젝트 라이브러리입니다. 다중 뷰 시스템, 고급 이미지 갤러리, 관리자 시스템 등 현대적인 웹 애플리케이션의 모든 기능을 갖춘 포트폴리오 플랫폼입니다.',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'React Portal', 'PostgreSQL'],
    '2024-09-04',
    '2024-09-04',
    '1.0.0',
    'Web',
    '완료',
    'Medium',
    'https://github.com/Kuneosu/k-library',
    'https://k-library-cslbe5eb7-kuneosus-projects.vercel.app',
    'https://k-library-cslbe5eb7-kuneosus-projects.vercel.app',
    ARRAY[
        '다중 뷰 프로젝트 관리 (리스트/갤러리/테이블)',
        'React Portal 기반 모달 시스템',
        '드래그 스크롤 이미지 갤러리',
        '풀스크린 이미지 뷰어',
        'Supabase Authentication 관리자 시스템',
        '실시간 검색 및 필터링',
        '라이트/다크 테마 시스템',
        '완전 반응형 디자인',
        'TypeScript 타입 안전성',
        'PostgreSQL 데이터베이스 연동'
    ],
    ARRAY[
        'https://raw.githubusercontent.com/Kuneosu/k-library/main/public/screenshots/homepage.png',
        'https://raw.githubusercontent.com/Kuneosu/k-library/main/public/screenshots/gallery-view.png',
        'https://raw.githubusercontent.com/Kuneosu/k-library/main/public/screenshots/table-view.png',
        'https://raw.githubusercontent.com/Kuneosu/k-library/main/public/screenshots/project-detail.png',
        'https://raw.githubusercontent.com/Kuneosu/k-library/main/public/screenshots/admin-panel.png'
    ],
    ARRAY[
        'React Portal을 활용한 모달 z-index 문제 해결',
        'Framer Motion을 이용한 자연스러운 드래그 스크롤 구현',
        'Next.js 15 App Router와 TypeScript 완벽 통합',
        'Supabase Row Level Security 적용한 관리자 시스템',
        '3가지 뷰 모드로 사용자 경험 최적화'
    ],
    ARRAY[
        'React Portal의 document.body 렌더링으로 인한 z-index 충돌',
        'Framer Motion PanInfo를 활용한 터치/마우스 이벤트 통합',
        'Supabase TypeScript 타입 정의와 실제 스키마 간 불일치',
        'Next.js 빌드 시 ESLint/TypeScript 설정 최적화',
        '이미지 비율 문제로 인한 다중 뷰 시스템 필요성'
    ],
    ARRAY[
        'React Portal 활용법과 모달 렌더링 최적화',
        'Framer Motion의 고급 제스처 및 애니메이션 기법',
        'Next.js 15의 새로운 기능과 성능 최적화',
        'Supabase Authentication과 RLS 정책 구현',
        '사용자 경험 개선을 위한 인터페이스 설계'
    ],
    0,
    0,
    1
);