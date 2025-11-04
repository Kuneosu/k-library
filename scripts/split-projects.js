const fs = require('fs');
const path = require('path');

// projects.json 읽기
const projectsPath = path.join(__dirname, '../data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// projects 폴더 생성
const projectsDir = path.join(__dirname, '../data/projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// 각 프로젝트를 개별 파일로 저장
projects.forEach(project => {
  // 파일명: 프로젝트 이름을 kebab-case로 변환
  const fileName = project.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-')      // 공백을 하이픈으로
    .replace(/--+/g, '-')      // 연속 하이픈을 하나로
    .trim();

  const filePath = path.join(projectsDir, `${fileName}.json`);

  fs.writeFileSync(filePath, JSON.stringify(project, null, 2), 'utf-8');
  console.log(`✅ Created: ${fileName}.json`);
});

console.log(`\n📦 Total: ${projects.length} project files created`);
console.log(`📁 Location: data/projects/`);
