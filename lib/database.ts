import { typedSupabase } from './supabase'
import { Project, DeveloperProfile as DeveloperProfileType } from '@/types'
import { Database } from './supabase'

type DeveloperProfileRow = Database['public']['Tables']['developer_profiles']['Row']
type DeveloperProfileWithSkills = DeveloperProfileRow & {
  skills: Database['public']['Tables']['skills']['Row'][]
}

// Supabase 데이터를 DeveloperProfile 타입으로 변환하는 함수
function mapSupabaseToDeveloperProfile(row: DeveloperProfileWithSkills): DeveloperProfileType {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    bio: row.bio || '',
    email: row.email,
    github: row.github || '',
    linkedin: row.linkedin || undefined,
    website: row.website || undefined,
    location: '', // Not in database schema
    skills: row.skills
      .sort((a, b) => a.display_order - b.display_order)
      .map(skill => ({
        category: skill.category,
        items: skill.items
      })),
    experience: 0, // Will be calculated from career_start_date
    projectsCompleted: 0, // Will be calculated from projects
    currentFocus: row.current_focus
  }
}

// Supabase 데이터를 Project 타입으로 변환하는 함수
function mapSupabaseToProject(row: any): Project {
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

// Project 타입을 Supabase Insert 타입으로 변환하는 함수
function mapProjectToSupabase(project: Partial<Omit<Project, 'id'>>): any {
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

// 모든 프로젝트 가져오기
export async function getAllProjects(): Promise<Project[]> {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      throw error
    }

    return data.map(mapSupabaseToProject)
  } catch (error) {
    console.error('Error in getAllProjects:', error)
    throw error
  }
}

// ID로 특정 프로젝트 가져오기
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // 프로젝트를 찾을 수 없음
      }
      console.error('Error fetching project:', error)
      throw error
    }

    return mapSupabaseToProject(data)
  } catch (error) {
    console.error('Error in getProjectById:', error)
    throw error
  }
}

// 새 프로젝트 생성
export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .insert(mapProjectToSupabase(project))
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      throw error
    }

    return mapSupabaseToProject(data)
  } catch (error) {
    console.error('Error in createProject:', error)
    throw error
  }
}

// 프로젝트 업데이트
export async function updateProject(id: string, updates: Partial<Omit<Project, 'id'>>): Promise<Project> {
  try {
    const supabaseUpdates = mapProjectToSupabase(updates)
    
    const { data, error } = await typedSupabase
      .from('projects')
      // @ts-ignore - Supabase type inference issue with partial updates
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      throw error
    }

    return mapSupabaseToProject(data)
  } catch (error) {
    console.error('Error in updateProject:', error)
    throw error
  }
}

// 프로젝트 삭제
export async function deleteProject(id: string): Promise<void> {
  try {
    const { error } = await typedSupabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in deleteProject:', error)
    throw error
  }
}

// 카테고리별 프로젝트 가져오기
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects by category:', error)
      throw error
    }

    return data.map(mapSupabaseToProject)
  } catch (error) {
    console.error('Error in getProjectsByCategory:', error)
    throw error
  }
}

// 상태별 프로젝트 가져오기
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects by status:', error)
      throw error
    }

    return data.map(mapSupabaseToProject)
  } catch (error) {
    console.error('Error in getProjectsByStatus:', error)
    throw error
  }
}

// 프로젝트 통계 가져오기
export async function getProjectStats() {
  try {
    const { data, error } = await typedSupabase
      .from('projects')
      .select('status')

    if (error) {
      console.error('Error fetching project stats:', error)
      throw error
    }

    const stats = {
      total: data.length,
      active: 0,
      completed: 0,
      maintenance: 0,
      archived: 0,
      inProgress: 0,
    }

    data.forEach((project: { status: string }) => {
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
    // 개발자 프로필과 관련된 스킬을 함께 조회
    const { data: profileData, error: profileError } = await typedSupabase
      .from('developer_profiles')
      .select(`
        *,
        skills (*)
      `)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (profileError) {
      console.error('개발자 프로필 조회 실패:', profileError)
      return null
    }

    const rawProfile = profileData as DeveloperProfileWithSkills
    
    // 완료된 프로젝트 개수 가져오기
    const { data: completedProjects } = await typedSupabase
      .from('projects')
      .select('id')
      .eq('status', 'Completed')

    // 경력 계산 (career_start_date부터 현재까지)
    const careerStartDate = new Date(rawProfile.career_start_date)
    const now = new Date()
    const diffInYears = (now.getTime() - careerStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    
    // DeveloperProfile 타입으로 변환
    const profile = mapSupabaseToDeveloperProfile(rawProfile)
    profile.experience = Math.max(0, Math.round(diffInYears * 10) / 10) // 소수점 1자리까지
    profile.projectsCompleted = completedProjects?.length || 0
    
    return profile
  } catch (error) {
    console.error('개발자 프로필 조회 중 오류:', error)
    return null
  }
}

// 개발자 프로필 생성
export async function createDeveloperProfile(
  profile: Database['public']['Tables']['developer_profiles']['Insert']
): Promise<DeveloperProfileRow | null> {
  try {
    const { data, error } = await typedSupabase
      .from('developer_profiles')
      .insert(profile as any)
      .select()
      .single()

    if (error) {
      console.error('개발자 프로필 생성 실패:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('개발자 프로필 생성 중 오류:', error)
    return null
  }
}

// 개발자 프로필 업데이트
export async function updateDeveloperProfile(
  id: string,
  updates: Database['public']['Tables']['developer_profiles']['Update']
): Promise<DeveloperProfileRow | null> {
  try {
    const { data, error } = await typedSupabase
      .from('developer_profiles')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('개발자 프로필 업데이트 실패:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('개발자 프로필 업데이트 중 오류:', error)
    return null
  }
}

// 스킬 생성
export async function createSkill(
  skill: Database['public']['Tables']['skills']['Insert']
): Promise<Database['public']['Tables']['skills']['Row'] | null> {
  try {
    const { data, error } = await typedSupabase
      .from('skills')
      .insert(skill)
      .select()
      .single()

    if (error) {
      console.error('스킬 생성 실패:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('스킬 생성 중 오류:', error)
    return null
  }
}

// 스킬 업데이트
export async function updateSkill(
  id: string,
  updates: Database['public']['Tables']['skills']['Update']
): Promise<Database['public']['Tables']['skills']['Row'] | null> {
  try {
    const { data, error } = await typedSupabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('스킬 업데이트 실패:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('스킬 업데이트 중 오류:', error)
    return null
  }
}

// 스킬 삭제
export async function deleteSkill(id: string): Promise<boolean> {
  try {
    const { error } = await typedSupabase
      .from('skills')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('스킬 삭제 실패:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('스킬 삭제 중 오류:', error)
    return false
  }
}

// 프로필 업데이트 (프로젝트와 동일한 방식)
export async function updateDeveloperProfileWithSkills(
  profileId: string,
  profileData: Partial<DeveloperProfileType>
): Promise<DeveloperProfileType | null> {
  try {
    // 1. 프로필 기본 정보 업데이트
    const { error: profileError } = await typedSupabase
      .from('developer_profiles')
      .update({
        name: profileData.name,
        title: profileData.title,
        bio: profileData.bio,
        email: profileData.email,
        github: profileData.github,
        linkedin: profileData.linkedin,
        website: profileData.website,
        current_focus: profileData.currentFocus,
        updated_at: new Date().toISOString()
      })
      .eq('id', profileId)

    if (profileError) {
      console.error('프로필 업데이트 실패:', profileError)
      return null
    }

    // 2. 기존 스킬 삭제
    const { error: deleteSkillsError } = await typedSupabase
      .from('skills')
      .delete()
      .eq('profile_id', profileId)

    if (deleteSkillsError) {
      console.error('기존 스킬 삭제 실패:', deleteSkillsError)
      return null
    }

    // 3. 새 스킬 추가
    if (profileData.skills && profileData.skills.length > 0) {
      const skillsData = profileData.skills.map((skillGroup, index) => ({
        profile_id: profileId,
        category: skillGroup.category,
        items: skillGroup.items,
        display_order: index + 1
      }))

      const { error: skillsError } = await typedSupabase
        .from('skills')
        .insert(skillsData)

      if (skillsError) {
        console.error('새 스킬 추가 실패:', skillsError)
        return null
      }
    }

    // 4. 업데이트된 프로필 반환
    return await getDeveloperProfileWithSkills()
  } catch (error) {
    console.error('프로필 업데이트 중 오류:', error)
    return null
  }
}

// 프로필별 스킬 조회
export async function getSkillsByProfile(profileId: string) {
  try {
    const { data, error } = await typedSupabase
      .from('skills')
      .select('*')
      .eq('profile_id', profileId)
      .order('display_order')

    if (error) {
      console.error('스킬 조회 실패:', error)
      return []
    }

    return data
  } catch (error) {
    console.error('스킬 조회 중 오류:', error)
    return []
  }
}