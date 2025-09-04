import { Project, DeveloperProfile } from '@/types'

export const developerProfile: DeveloperProfile = {
  name: "김권수 (Kuneosu)",
  title: "Full-Stack Developer & Creative Technologist",
  bio: "주간/일일 사이드 프로젝트로 기술의 경계를 탐험하는 개발자입니다. 실용적이고 창의적인 솔루션을 만들어내는 것을 즐깁니다.",
  email: "kuneosu@example.com",
  github: "https://github.com/kuneosu",
  linkedin: "https://linkedin.com/in/kuneosu",
  website: "https://kuneosu.dev",
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB"]
    },
    {
      category: "DevOps",
      items: ["Docker", "Vercel", "GitHub Actions", "AWS", "Nginx"]
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Figma", "Postman", "Jest"]
    }
  ],
  experience: 5, // This will be calculated automatically
  projectsCompleted: 47,
  currentFocus: ["AI Integration", "Web3", "Design Systems", "Performance Optimization"]
}

export const projects: Project[] = [
  {
    id: "1",
    name: "TaskFlow Pro",
    description: "강력한 칸반 보드와 타임라인 뷰를 제공하는 프로젝트 관리 도구",
    longDescription: "TaskFlow Pro는 개발 팀을 위한 종합적인 프로젝트 관리 솔루션입니다. 직관적인 칸반 보드, 간트 차트, 실시간 협업 기능을 제공합니다.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Socket.io"],
    startDate: "2024-01-15",
    endDate: "2024-03-20",
    version: "2.1.0",
    category: "Web",
    status: "Completed",
    size: "Large",
    githubUrl: "https://github.com/kdeveloper/taskflow-pro",
    vercelUrl: "https://taskflow-pro.vercel.app",
    features: [
      "실시간 협업",
      "칸반 보드",
      "간트 차트",
      "시간 추적",
      "팀 대시보드",
      "알림 시스템"
    ],
    screenshots: ["/screenshots/taskflow1.png", "/screenshots/taskflow2.png"],
    highlights: ["10,000+ 활성 사용자", "99.9% 가동 시간", "4.8★ 사용자 평점"],
    challenges: ["실시간 동기화 구현", "대용량 데이터 최적화"],
    stars: 856,
    contributors: 12
  },
  {
    id: "2",
    name: "CodeSnippets CLI",
    description: "터미널에서 코드 스니펫을 관리하고 공유하는 CLI 도구",
    techStack: ["Node.js", "TypeScript", "Commander.js", "Chalk", "SQLite"],
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    version: "1.5.2",
    category: "Tool",
    status: "Maintenance",
    size: "Small",
    githubUrl: "https://github.com/kdeveloper/codesnippets-cli",
    npmUrl: "https://www.npmjs.com/package/codesnippets-cli",
    features: [
      "스니펫 저장/검색",
      "카테고리 관리",
      "클라우드 동기화",
      "구문 강조"
    ],
    screenshots: [],
    downloads: 5420,
    stars: 234
  },
  {
    id: "3",
    name: "React Component Library",
    description: "재사용 가능한 React UI 컴포넌트 라이브러리",
    longDescription: "프로덕션 레디 React 컴포넌트 모음으로, 접근성과 커스터마이징에 중점을 둔 디자인 시스템입니다.",
    techStack: ["React", "TypeScript", "Styled Components", "Storybook", "Jest", "Rollup"],
    startDate: "2023-11-10",
    endDate: "2024-01-30",
    version: "3.2.1",
    category: "Library",
    status: "Active",
    size: "Medium",
    githubUrl: "https://github.com/kdeveloper/react-components",
    npmUrl: "https://www.npmjs.com/package/@kdeveloper/react-components",
    demoUrl: "https://react-components-docs.vercel.app",
    features: [
      "50+ UI 컴포넌트",
      "완벽한 타입스크립트 지원",
      "다크 모드 지원",
      "접근성 준수",
      "테마 커스터마이징"
    ],
    screenshots: ["/screenshots/components1.png"],
    downloads: 18500,
    stars: 1203
  },
  {
    id: "4",
    name: "AI Chat Interface",
    description: "OpenAI API를 활용한 지능형 채팅 인터페이스",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Vercel AI SDK", "Tailwind CSS"],
    startDate: "2024-03-01",
    status: "In Progress",
    version: "0.8.0",
    category: "Web",
    size: "Medium",
    githubUrl: "https://github.com/kdeveloper/ai-chat",
    vercelUrl: "https://ai-chat-demo.vercel.app",
    features: [
      "스트리밍 응답",
      "대화 히스토리",
      "프롬프트 템플릿",
      "다중 모델 지원"
    ],
    screenshots: [],
    stars: 567
  },
  {
    id: "5",
    name: "Mobile Weather App",
    description: "React Native로 개발한 날씨 예보 애플리케이션",
    techStack: ["React Native", "TypeScript", "Expo", "Redux Toolkit", "Weather API"],
    startDate: "2024-01-05",
    endDate: "2024-02-10",
    version: "1.2.0",
    category: "Mobile",
    status: "Completed",
    size: "Small",
    githubUrl: "https://github.com/kdeveloper/weather-app",
    features: [
      "실시간 날씨 정보",
      "7일 예보",
      "위치 기반 서비스",
      "푸시 알림"
    ],
    screenshots: [],
    stars: 89
  },
  {
    id: "6",
    name: "GraphQL API Gateway",
    description: "마이크로서비스를 위한 GraphQL API 게이트웨이",
    techStack: ["Node.js", "GraphQL", "Apollo Server", "Redis", "Docker"],
    startDate: "2023-12-01",
    endDate: "2024-01-20",
    version: "2.0.0",
    category: "API",
    status: "Maintenance",
    size: "Large",
    githubUrl: "https://github.com/kdeveloper/graphql-gateway",
    features: [
      "스키마 스티칭",
      "캐싱 전략",
      "레이트 리미팅",
      "모니터링 대시보드"
    ],
    screenshots: [],
    stars: 445
  },
  {
    id: "7",
    name: "Pixel Art Editor",
    description: "브라우저 기반 픽셀 아트 에디터",
    techStack: ["Vue 3", "TypeScript", "Canvas API", "Pinia", "Vite"],
    startDate: "2024-02-20",
    endDate: "2024-03-15",
    version: "1.0.0",
    category: "Tool",
    status: "Completed",
    size: "Medium",
    githubUrl: "https://github.com/kdeveloper/pixel-editor",
    vercelUrl: "https://pixel-editor.vercel.app",
    features: [
      "레이어 시스템",
      "커스텀 팔레트",
      "애니메이션 지원",
      "이미지 익스포트"
    ],
    screenshots: [],
    stars: 678
  },
  {
    id: "8",
    name: "Markdown Blog Engine",
    description: "MDX 기반 정적 블로그 엔진",
    techStack: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "ContentLayer"],
    startDate: "2024-01-25",
    endDate: "2024-02-05",
    version: "1.1.0",
    category: "Web",
    status: "Active",
    size: "Small",
    githubUrl: "https://github.com/kdeveloper/blog-engine",
    vercelUrl: "https://my-blog.vercel.app",
    features: [
      "MDX 지원",
      "코드 하이라이팅",
      "RSS 피드",
      "SEO 최적화",
      "다크 모드"
    ],
    screenshots: [],
    stars: 234
  },
  {
    id: "9",
    name: "WebSocket Game Server",
    description: "실시간 멀티플레이어 게임을 위한 WebSocket 서버",
    techStack: ["Node.js", "WebSocket", "Redis", "TypeScript", "Docker"],
    startDate: "2024-03-10",
    status: "In Progress",
    version: "0.5.0",
    category: "Game",
    size: "Medium",
    githubUrl: "https://github.com/kdeveloper/game-server",
    features: [
      "룸 매니징",
      "매치메이킹",
      "상태 동기화",
      "스케일링 지원"
    ],
    screenshots: [],
    stars: 156
  },
  {
    id: "10",
    name: "Data Visualization Dashboard",
    description: "D3.js를 활용한 인터랙티브 데이터 시각화 대시보드",
    techStack: ["React", "D3.js", "TypeScript", "Redux", "Material-UI"],
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    version: "1.3.0",
    category: "Web",
    status: "Completed",
    size: "Medium",
    githubUrl: "https://github.com/kdeveloper/data-viz",
    vercelUrl: "https://data-viz-dashboard.vercel.app",
    features: [
      "실시간 데이터 업데이트",
      "커스터마이즈 가능한 차트",
      "데이터 필터링",
      "CSV 익스포트"
    ],
    screenshots: [],
    stars: 892
  }
]