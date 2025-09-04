-- 관리자용 RLS 정책 추가 SQL

-- 프로젝트 테이블에 관리자용 INSERT/UPDATE/DELETE 정책 추가
-- (기존 SELECT 정책은 유지)

-- 관리자만 프로젝트 삽입 가능
CREATE POLICY "Only admin can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 프로젝트 업데이트 가능
CREATE POLICY "Only admin can update projects"
ON projects FOR UPDATE
USING (auth.email() = 'kks92155784@gmail.com')
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 프로젝트 삭제 가능
CREATE POLICY "Only admin can delete projects"
ON projects FOR DELETE
USING (auth.email() = 'kks92155784@gmail.com');

-- 개발자 프로필 테이블에도 관리자용 정책 추가

-- 관리자만 개발자 프로필 삽입 가능
CREATE POLICY "Only admin can insert developer profiles"
ON developer_profiles FOR INSERT
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 개발자 프로필 업데이트 가능
CREATE POLICY "Only admin can update developer profiles"
ON developer_profiles FOR UPDATE
USING (auth.email() = 'kks92155784@gmail.com')
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 개발자 프로필 삭제 가능
CREATE POLICY "Only admin can delete developer profiles"
ON developer_profiles FOR DELETE
USING (auth.email() = 'kks92155784@gmail.com');

-- 스킬 테이블에도 관리자용 정책 추가

-- 관리자만 스킬 삽입 가능
CREATE POLICY "Only admin can insert skills"
ON skills FOR INSERT
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 스킬 업데이트 가능
CREATE POLICY "Only admin can update skills"
ON skills FOR UPDATE
USING (auth.email() = 'kks92155784@gmail.com')
WITH CHECK (auth.email() = 'kks92155784@gmail.com');

-- 관리자만 스킬 삭제 가능
CREATE POLICY "Only admin can delete skills"
ON skills FOR DELETE
USING (auth.email() = 'kks92155784@gmail.com');