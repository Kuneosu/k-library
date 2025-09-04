/**
 * 경력 시작일부터 현재까지의 경력을 계산합니다.
 * @param startDate 경력 시작일 (YYYY-MM-DD 형태 또는 Date 객체)
 * @returns 경력 기간 문자열 (예: "4개월", "1년 2개월")
 */
export function calculateExperience(startDate: string | Date): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const now = new Date()
  
  // 연도와 월 계산
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  
  // 월이 음수인 경우 조정
  if (months < 0) {
    years--
    months += 12
  }
  
  // 현재 일이 시작일보다 이전이면 한 달 빼기
  if (now.getDate() < start.getDate()) {
    months--
    if (months < 0) {
      years--
      months += 12
    }
  }
  
  // 결과 문자열 생성
  if (years === 0) {
    return `${months}개월`
  } else if (months === 0) {
    return `${years}년`
  } else {
    return `${years}년 ${months}개월`
  }
}

/**
 * 경력을 숫자로 반환합니다 (년 단위, 소수점 1자리)
 * @param startDate 경력 시작일
 * @returns 경력 (년 단위)
 */
export function calculateExperienceInYears(startDate: string | Date): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const now = new Date()
  
  const diffInMilliseconds = now.getTime() - start.getTime()
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  
  return Math.round(diffInYears * 10) / 10 // 소수점 1자리까지
}