const fs = require('fs');
const path = require('path');

// CSV 파일을 JSON으로 변환하는 함수 (개선된 버전)
function csvToJson(csvText) {
  const lines = csvText.split('\n');
  if (lines.length === 0) return [];

  // 첫 줄에서 헤더 추출
  const headers = parseCSVLine(lines[0]);
  const result = [];

  let i = 1;
  while (i < lines.length) {
    if (!lines[i].trim()) {
      i++;
      continue;
    }

    let row = lines[i];
    let fieldCount = countFields(row);

    // 필드가 부족하면 다음 줄들을 합침 (멀티라인 처리)
    while (fieldCount < headers.length && i + 1 < lines.length) {
      i++;
      row += '\n' + lines[i];
      fieldCount = countFields(row);
    }

    const values = parseCSVLine(row);
    if (values.length > 0) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = parseValue(values[j] || '');
      }
      result.push(obj);
    }

    i++;
  }

  return result;
}

// CSV 라인 파싱 (quoted 필드 처리)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quotes
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  // 마지막 필드 추가
  result.push(current);
  return result;
}

// 필드 개수 세기
function countFields(line) {
  let count = 1;
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      count++;
    }
  }

  return count;
}

// 값 파싱 (JSON 배열, 숫자, null 등 처리)
function parseValue(value) {
  value = value.trim();

  // 빈 값은 null
  if (value === '') return null;

  // PostgreSQL 배열 형식 변환: {a,b,c} → ["a","b","c"]
  if (value.startsWith('{') && value.endsWith('}')) {
    const items = value.slice(1, -1).split(',').map(item => {
      let trimmed = item.trim();
      // 앞뒤 따옴표 제거
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        trimmed = trimmed.slice(1, -1);
      }
      return trimmed;
    });
    return items.filter(item => item !== '');
  }

  // JSON 배열 파싱 시도
  if (value.startsWith('[') && value.endsWith(']')) {
    // 콤마로 분리하여 배열로 변환
    const items = value.slice(1, -1).split(',').map(item => {
      let trimmed = item.trim();
      // 앞뒤 따옴표 제거
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        trimmed = trimmed.slice(1, -1);
      }
      return trimmed;
    });
    return items.filter(item => item !== '');
  }

  // 숫자인 경우
  if (!isNaN(value) && value !== '') {
    return Number(value);
  }

  return value;
}

// 프로젝트 데이터 변환
const projectsCsv = fs.readFileSync(
  path.join(__dirname, '../data/projects_rows.csv'),
  'utf-8'
);
const projects = csvToJson(projectsCsv);

// 개발자 프로필 데이터 변환
const profilesCsv = fs.readFileSync(
  path.join(__dirname, '../data/developer_profiles_rows.csv'),
  'utf-8'
);
const profiles = csvToJson(profilesCsv);

// 스킬 데이터 변환
const skillsCsv = fs.readFileSync(
  path.join(__dirname, '../data/skills_rows.csv'),
  'utf-8'
);
const skills = csvToJson(skillsCsv);

// JSON 파일로 저장
fs.writeFileSync(
  path.join(__dirname, '../data/projects.json'),
  JSON.stringify(projects, null, 2),
  'utf-8'
);

fs.writeFileSync(
  path.join(__dirname, '../data/profile.json'),
  JSON.stringify(profiles[0], null, 2), // 프로필은 단일 객체
  'utf-8'
);

fs.writeFileSync(
  path.join(__dirname, '../data/skills.json'),
  JSON.stringify(skills, null, 2),
  'utf-8'
);

console.log('✅ CSV to JSON conversion completed!');
console.log(`📦 Projects: ${projects.length} items`);
console.log(`👤 Profile: 1 item`);
console.log(`🎯 Skills: ${skills.length} items`);
