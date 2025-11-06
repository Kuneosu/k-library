const fs = require('fs');
const path = require('path');

// data/projects 디렉토리 경로
const projectsDir = path.join(__dirname, '../data/projects');

// 모든 JSON 파일 읽기
const files = fs.readdirSync(projectsDir)
  .filter(file => file.endsWith('.json') && file !== 'project-example.json')
  .sort();

// 모든 프로젝트 데이터 로드
const projectsData = files.map(file => {
  const filePath = path.join(projectsDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
});

// index.ts 내용 생성 (JSON 데이터를 직접 포함)
const indexContent = `// 이 파일은 scripts/generate-projects-index.js에 의해 자동 생성됩니다.
// 수동으로 편집하지 마세요.

// 프로젝트 배열로 export
export const projects = ${JSON.stringify(projectsData, null, 2)} as const;

export default projects;
`;

// index.ts 파일 작성
const indexPath = path.join(projectsDir, 'index.ts');
fs.writeFileSync(indexPath, indexContent, 'utf-8');

console.log('✅ data/projects/index.ts 파일이 생성되었습니다.');
console.log(`📦 ${files.length}개의 프로젝트 파일을 로드했습니다:`);
files.forEach(file => console.log(`   - ${file}`));
