-- 프로필 업데이트를 위한 RLS 정책 추가

-- developer_profiles 테이블에 UPDATE 정책 추가
CREATE POLICY "Developer profiles can be updated by everyone"
ON developer_profiles FOR UPDATE
USING (true);

-- skills 테이블에 INSERT/UPDATE/DELETE 정책 추가  
CREATE POLICY "Skills can be inserted by everyone"
ON skills FOR INSERT
WITH CHECK (true);

CREATE POLICY "Skills can be updated by everyone"
ON skills FOR UPDATE
USING (true);

CREATE POLICY "Skills can be deleted by everyone"
ON skills FOR DELETE
USING (true);

-- projects 테이블에도 동일한 정책 추가 (일관성을 위해)
CREATE POLICY "Projects can be inserted by everyone"
ON projects FOR INSERT
WITH CHECK (true);

CREATE POLICY "Projects can be updated by everyone"
ON projects FOR UPDATE
USING (true);

CREATE POLICY "Projects can be deleted by everyone"
ON projects FOR DELETE
USING (true);