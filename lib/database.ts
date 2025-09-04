import { typedSupabase } from './supabase'
import { Project } from '@/types'

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
        case 'Active':
          stats.active++
          break
        case 'Completed':
          stats.completed++
          break
        case 'Maintenance':
          stats.maintenance++
          break
        case 'Archived':
          stats.archived++
          break
        case 'In Progress':
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