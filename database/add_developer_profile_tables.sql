-- 개발자 프로필 테이블 추가 SQL

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