export type ProjectCategory = 'Web' | 'Mobile' | 'Library' | 'API' | 'Tool' | 'Game' | 'Other'

export type ProjectStatus = '진행중' | '개발중' | '완료' | '유지보수' | '보관'

export type ProjectSize = 'Small' | 'Medium' | 'Large' | 'Enterprise'

export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  techStack: string[]
  startDate: string
  endDate?: string
  version: string
  category: ProjectCategory
  status: ProjectStatus
  size: ProjectSize
  githubUrl?: string
  vercelUrl?: string
  npmUrl?: string
  demoUrl?: string
  features: string[]
  screenshots: string[]
  highlights?: string[]
  challenges?: string[]
  learnings?: string[]
  contributors?: number
  stars?: number
  downloads?: number
}

export interface DeveloperProfile {
  name: string
  title: string
  bio: string
  avatar?: string
  email: string
  github: string
  linkedin?: string
  twitter?: string
  website?: string
  skills: {
    category: string
    items: string[]
  }[]
  experience: number // years
  projectsCompleted: number
  currentFocus: string[]
}