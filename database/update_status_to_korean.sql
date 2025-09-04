-- 기존 Supabase 테이블의 status 컬럼을 한국어로 업데이트하는 SQL

-- 1. 기존 CHECK 제약조건 제거
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

-- 2. 기존 데이터를 한국어로 변경 (제약조건 추가 전에 먼저 실행)
UPDATE projects SET status = '진행중' WHERE status = 'Active';
UPDATE projects SET status = '개발중' WHERE status = 'In Progress';
UPDATE projects SET status = '완료' WHERE status = 'Completed';
UPDATE projects SET status = '유지보수' WHERE status = 'Maintenance';
UPDATE projects SET status = '보관' WHERE status = 'Archived';

-- 3. 새로운 한국어 CHECK 제약조건 추가
ALTER TABLE projects ADD CONSTRAINT projects_status_check 
CHECK (status IN ('진행중', '개발중', '완료', '유지보수', '보관'));

-- 4. 업데이트 결과 확인
SELECT name, status FROM projects ORDER BY created_at DESC;