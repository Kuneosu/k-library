-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    start_date DATE NOT NULL,
    end_date DATE,
    version TEXT NOT NULL DEFAULT '1.0.0',
    category TEXT NOT NULL CHECK (category IN ('Web', 'Mobile', 'Library', 'API', 'Tool', 'Game', 'Other')),
    status TEXT NOT NULL CHECK (status IN ('Active', 'In Progress', 'Completed', 'Maintenance', 'Archived')),
    size TEXT NOT NULL CHECK (size IN ('Small', 'Medium', 'Large', 'Enterprise')),
    github_url TEXT,
    vercel_url TEXT,
    npm_url TEXT,
    demo_url TEXT,
    features TEXT[] NOT NULL DEFAULT '{}',
    screenshots TEXT[] NOT NULL DEFAULT '{}',
    highlights TEXT[],
    challenges TEXT[],
    learnings TEXT[],
    stars INTEGER DEFAULT 0,
    downloads INTEGER DEFAULT 0,
    contributors INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Projects are viewable by everyone"
ON projects FOR SELECT
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_start_date ON projects(start_date);
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- Create developer_profiles table
CREATE TABLE developer_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    email TEXT NOT NULL,
    github TEXT,
    linkedin TEXT,
    website TEXT,
    career_start_date DATE NOT NULL,
    current_focus TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES developer_profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    items TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger for developer_profiles
CREATE TRIGGER update_developer_profiles_updated_at 
    BEFORE UPDATE ON developer_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create updated_at trigger for skills
CREATE TRIGGER update_skills_updated_at 
    BEFORE UPDATE ON skills 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for developer_profiles
ALTER TABLE developer_profiles ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security (RLS) for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for developer_profiles
CREATE POLICY "Developer profiles are viewable by everyone"
ON developer_profiles FOR SELECT
USING (true);

-- Create policies for skills
CREATE POLICY "Skills are viewable by everyone"
ON skills FOR SELECT
USING (true);

-- Create indexes for developer_profiles
CREATE INDEX idx_developer_profiles_email ON developer_profiles(email);
CREATE INDEX idx_developer_profiles_created_at ON developer_profiles(created_at);

-- Create indexes for skills
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_display_order ON skills(display_order);

-- Insert sample data
INSERT INTO projects (
    name, description, long_description, tech_stack, start_date, end_date, version, category, status, size,
    github_url, vercel_url, npm_url, demo_url, features, screenshots, highlights, challenges, learnings,
    stars, downloads, contributors
) VALUES 
(
    'TaskFlow Pro',
    '강력한 칸반 보드와 타임라인 뷰를 제공하는 프로젝트 관리 도구',
    'TaskFlow Pro는 개발 팀을 위한 종합적인 프로젝트 관리 솔루션입니다. 직관적인 칸반 보드, 간트 차트, 실시간 협업 기능을 제공합니다.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Socket.io'],
    '2024-01-15',
    '2024-03-20',
    '2.1.0',
    'Web',
    'Completed',
    'Large',
    'https://github.com/kuneosu/taskflow-pro',
    'https://taskflow-pro.vercel.app',
    null,
    null,
    ARRAY['실시간 협업', '칸반 보드', '간트 차트', '시간 추적', '팀 대시보드', '알림 시스템'],
    ARRAY['/screenshots/taskflow1.png', '/screenshots/taskflow2.png'],
    ARRAY['10,000+ 활성 사용자', '99.9% 가동 시간', '4.8★ 사용자 평점'],
    ARRAY['실시간 동기화 구현', '대용량 데이터 최적화'],
    null,
    856,
    null,
    12
),
(
    'CodeSnippets CLI',
    '터미널에서 코드 스니펫을 관리하고 공유하는 CLI 도구',
    null,
    ARRAY['Node.js', 'TypeScript', 'Commander.js', 'Chalk', 'SQLite'],
    '2024-02-01',
    '2024-02-15',
    '1.5.2',
    'Tool',
    'Maintenance',
    'Small',
    'https://github.com/kuneosu/codesnippets-cli',
    null,
    'https://www.npmjs.com/package/codesnippets-cli',
    null,
    ARRAY['스니펫 저장/검색', '카테고리 관리', '클라우드 동기화', '구문 강조'],
    ARRAY[]::TEXT[],
    null,
    null,
    null,
    234,
    5420,
    null
),
(
    'React Component Library',
    '재사용 가능한 React UI 컴포넌트 라이브러리',
    '프로덕션 레디 React 컴포넌트 모음으로, 접근성과 커스터마이징에 중점을 둔 디자인 시스템입니다.',
    ARRAY['React', 'TypeScript', 'Styled Components', 'Storybook', 'Jest', 'Rollup'],
    '2023-11-10',
    '2024-01-30',
    '3.2.1',
    'Library',
    'Active',
    'Medium',
    'https://github.com/kuneosu/react-components',
    null,
    'https://www.npmjs.com/package/@kuneosu/react-components',
    'https://react-components-docs.vercel.app',
    ARRAY['50+ UI 컴포넌트', '완벽한 타입스크립트 지원', '다크 모드 지원', '접근성 준수', '테마 커스터마이징'],
    ARRAY['/screenshots/components1.png'],
    null,
    null,
    null,
    1203,
    18500,
    null
),
(
    'AI Chat Interface',
    'OpenAI API를 활용한 지능형 채팅 인터페이스',
    null,
    ARRAY['Next.js', 'TypeScript', 'OpenAI API', 'Vercel AI SDK', 'Tailwind CSS'],
    '2024-03-01',
    null,
    '0.8.0',
    'Web',
    'In Progress',
    'Medium',
    'https://github.com/kuneosu/ai-chat',
    'https://ai-chat-demo.vercel.app',
    null,
    null,
    ARRAY['스트리밍 응답', '대화 히스토리', '프롬프트 템플릿', '다중 모델 지원'],
    ARRAY[]::TEXT[],
    null,
    null,
    null,
    567,
    null,
    null
),
(
    'Mobile Weather App',
    'React Native로 개발한 날씨 예보 애플리케이션',
    null,
    ARRAY['React Native', 'TypeScript', 'Expo', 'Redux Toolkit', 'Weather API'],
    '2024-01-05',
    '2024-02-10',
    '1.2.0',
    'Mobile',
    'Completed',
    'Small',
    'https://github.com/kuneosu/weather-app',
    null,
    null,
    null,
    ARRAY['실시간 날씨 정보', '7일 예보', '위치 기반 서비스', '푸시 알림'],
    ARRAY[]::TEXT[],
    null,
    null,
    null,
    89,
    null,
    null
);

-- Insert developer profile data
INSERT INTO developer_profiles (
    name, title, bio, email, github, website, linkedin, career_start_date, current_focus
) VALUES (
    '김권수 (Kuneosu)',
    'Full-Stack Developer & Creative Technologist',
    '주간/일일 사이드 프로젝트로 기술의 경계를 탐험하는 개발자입니다. 실용적이고 창의적인 솔루션을 만들어내는 것을 즐깁니다.',
    'kks92155784@gmail.com',
    'https://github.com/kuneosu',
    'https://kimkwonsu.notion.site',
    'https://linkedin.com/in/kuneosu',
    '2024-08-01',
    ARRAY['AI Integration', 'Web3', 'Design Systems', 'Performance Optimization']
);

-- Insert skills data (using the profile_id from the inserted profile)
WITH profile_data AS (
    SELECT id FROM developer_profiles WHERE email = 'kks92155784@gmail.com'
)
INSERT INTO skills (profile_id, category, items, display_order) VALUES
(
    (SELECT id FROM profile_data),
    'Frontend',
    ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'],
    1
),
(
    (SELECT id FROM profile_data),
    'Backend',
    ARRAY['Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
    2
),
(
    (SELECT id FROM profile_data),
    'DevOps',
    ARRAY['Docker', 'Vercel', 'GitHub Actions', 'AWS', 'Nginx'],
    3
),
(
    (SELECT id FROM profile_data),
    'Tools',
    ARRAY['Git', 'VS Code', 'Figma', 'Postman', 'Jest'],
    4
);