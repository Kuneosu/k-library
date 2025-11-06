import { Project, DeveloperProfile as DeveloperProfileType } from '@/types'
import profileData from '@/data/profile.json'
import skillsData from '@/data/skills.json'
import projectsData from '@/data/projects/index'

// JSON 데이터 타입
type ProjectRow = typeof projectsData[0]
type ProfileRow = typeof profileData
type SkillRow = typeof skillsData[0]

// JSON 데이터를 Project 타입으로 변환하는 함수
function mapJsonToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    longDescription: row.long_description || undefined,
    techStack: row.tech_stack || [],
    startDate: row.start_date,
    endDate: row.end_date || undefined,
    version: row.version,
    category: row.category,
    status: row.status,
    size: row.size,
    githubUrl: row.github_url || undefined,
    vercelUrl: row.vercel_url || undefined,
    npmUrl: row.npm_url || undefined,
    demoUrl: row.demo_url || undefined,
    features: row.features || [],
    screenshots: row.screenshots || [],
    highlights: row.highlights || undefined,
    challenges: row.challenges || undefined,
    learnings: row.learnings || undefined,
    stars: row.stars || undefined,
    downloads: row.downloads || undefined,
    contributors: row.contributors || undefined,
  }
}

// JSON 데이터를 DeveloperProfile 타입으로 변환하는 함수
function mapJsonToDeveloperProfile(profile: ProfileRow, skills: SkillRow[]): DeveloperProfileType {
  // 경력 계산 (career_start_date부터 현재까지)
  const careerStartDate = new Date(profile.career_start_date)
  const now = new Date()
  const diffInYears = (now.getTime() - careerStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)

  // 완료된 프로젝트 개수 계산
  const completedProjectsCount = projectsData.filter(p => p.status === '완료').length

  return {
    id: profile.id,
    name: profile.name,
    title: profile.title,
    bio: profile.bio || '',
    email: profile.email,
    github: profile.github || '',
    linkedin: profile.linkedin || undefined,
    website: profile.website || undefined,
    location: '', // Not in database schema
    skills: skills
      .sort((a, b) => a.display_order - b.display_order)
      .map(skill => ({
        category: skill.category,
        items: skill.items
      })),
    experience: Math.max(0, Math.round(diffInYears * 10) / 10), // 소수점 1자리까지
    projectsCompleted: completedProjectsCount,
    currentFocus: profile.current_focus
  }
}

// Project 타입을 JSON 형태로 변환하는 함수
function mapProjectToJson(project: Partial<Omit<Project, 'id'>>): any {
  const result: any = {}

  if (project.name !== undefined) result.name = project.name
  if (project.description !== undefined) result.description = project.description || null
  if (project.longDescription !== undefined) result.long_description = project.longDescription || null
  if (project.techStack !== undefined) result.tech_stack = project.techStack
  if (project.startDate !== undefined) result.start_date = project.startDate
  if (project.endDate !== undefined) result.end_date = project.endDate || null
  if (project.version !== undefined) result.version = project.version
  if (project.category !== undefined) result.category = project.category
  if (project.status !== undefined) result.status = project.status
  if (project.size !== undefined) result.size = project.size
  if (project.githubUrl !== undefined) result.github_url = project.githubUrl || null
  if (project.vercelUrl !== undefined) result.vercel_url = project.vercelUrl || null
  if (project.npmUrl !== undefined) result.npm_url = project.npmUrl || null
  if (project.demoUrl !== undefined) result.demo_url = project.demoUrl || null
  if (project.features !== undefined) result.features = project.features
  if (project.screenshots !== undefined) result.screenshots = project.screenshots || []
  if (project.highlights !== undefined) result.highlights = project.highlights || null
  if (project.challenges !== undefined) result.challenges = project.challenges || null
  if (project.learnings !== undefined) result.learnings = project.learnings || null
  if (project.stars !== undefined) result.stars = project.stars || null
  if (project.downloads !== undefined) result.downloads = project.downloads || null
  if (project.contributors !== undefined) result.contributors = project.contributors || null

  return result
}

// JSON 파일 업데이트는 수동으로만 가능
// 개발 환경에서 데이터 수정 시 data/*.json 파일을 직접 편집하세요

// =========== Project Functions ===========

// 모든 프로젝트 가져오기
export async function getAllProjects(): Promise<Project[]> {
  try {
    // created_at 기준 내림차순 정렬
    const sortedProjects = [...projectsData].sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    return sortedProjects.map(mapJsonToProject)
  } catch (error) {
    console.error('Error in getAllProjects:', error)
    throw error
  }
}

// ID로 특정 프로젝트 가져오기
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = projectsData.find(p => p.id === id)
    return project ? mapJsonToProject(project) : null
  } catch (error) {
    console.error('Error in getProjectById:', error)
    throw error
  }
}

// 새 프로젝트 생성 (수동으로만 가능 - data/projects.json 파일을 직접 편집하세요)
export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  throw new Error('프로젝트 생성은 data/projects.json 파일을 직접 편집하여 수행하세요.')
}

// 프로젝트 업데이트 (수동으로만 가능)
export async function updateProject(id: string, updates: Partial<Omit<Project, 'id'>>): Promise<Project> {
  throw new Error('프로젝트 수정은 data/projects.json 파일을 직접 편집하여 수행하세요.')
}

// 프로젝트 삭제 (수동으로만 가능)
export async function deleteProject(id: string): Promise<void> {
  throw new Error('프로젝트 삭제는 data/projects.json 파일을 직접 편집하여 수행하세요.')
}

// 카테고리별 프로젝트 가져오기
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const filteredProjects = projectsData
      .filter(p => p.category === category)
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        return dateB - dateA
      })

    return filteredProjects.map(mapJsonToProject)
  } catch (error) {
    console.error('Error in getProjectsByCategory:', error)
    throw error
  }
}

// 상태별 프로젝트 가져오기
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  try {
    const filteredProjects = projectsData
      .filter(p => p.status === status)
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        return dateB - dateA
      })

    return filteredProjects.map(mapJsonToProject)
  } catch (error) {
    console.error('Error in getProjectsByStatus:', error)
    throw error
  }
}

// 프로젝트 통계 가져오기
export async function getProjectStats() {
  try {
    const stats = {
      total: projectsData.length,
      active: 0,
      completed: 0,
      maintenance: 0,
      archived: 0,
      inProgress: 0,
    }

    projectsData.forEach((project) => {
      switch (project.status) {
        case '진행중':
          stats.active++
          break
        case '완료':
          stats.completed++
          break
        case '유지보수':
          stats.maintenance++
          break
        case '보관':
          stats.archived++
          break
        case '개발중':
          stats.inProgress++
          break
      }
    })

    return stats
  } catch (error) {
    console.error('Error in getProjectStats:', error)
    throw error
  }
}

// =========== Developer Profile Functions ===========

// 개발자 프로필과 스킬 정보를 함께 가져오는 함수
export async function getDeveloperProfileWithSkills(): Promise<DeveloperProfileType | null> {
  try {
    return mapJsonToDeveloperProfile(profileData, skillsData)
  } catch (error) {
    console.error('개발자 프로필 조회 중 오류:', error)
    return null
  }
}

// 개발자 프로필 생성 (수동으로만 가능)
export async function createDeveloperProfile(profile: any): Promise<any | null> {
  throw new Error('프로필 생성은 data/profile.json 파일을 직접 편집하여 수행하세요.')
}

// 개발자 프로필 업데이트 (수동으로만 가능)
export async function updateDeveloperProfile(id: string, updates: any): Promise<any | null> {
  throw new Error('프로필 수정은 data/profile.json 파일을 직접 편집하여 수행하세요.')
}

// 스킬 생성 (수동으로만 가능)
export async function createSkill(skill: any): Promise<any | null> {
  throw new Error('스킬 생성은 data/skills.json 파일을 직접 편집하여 수행하세요.')
}

// 스킬 업데이트 (수동으로만 가능)
export async function updateSkill(id: string, updates: any): Promise<any | null> {
  throw new Error('스킬 수정은 data/skills.json 파일을 직접 편집하여 수행하세요.')
}

// 스킬 삭제 (수동으로만 가능)
export async function deleteSkill(id: string): Promise<boolean> {
  throw new Error('스킬 삭제는 data/skills.json 파일을 직접 편집하여 수행하세요.')
}

// 프로필 업데이트 (수동으로만 가능)
export async function updateDeveloperProfileWithSkills(
  profileId: string,
  profileData: Partial<DeveloperProfileType>
): Promise<DeveloperProfileType | null> {
  throw new Error('프로필 수정은 data/profile.json 및 data/skills.json 파일을 직접 편집하여 수행하세요.')
}

// 프로필별 스킬 조회
export async function getSkillsByProfile(profileId: string) {
  try {
    return skillsData
      .filter(s => s.profile_id === profileId)
      .sort((a, b) => a.display_order - b.display_order)
  } catch (error) {
    console.error('스킬 조회 중 오류:', error)
    return []
  }
}
