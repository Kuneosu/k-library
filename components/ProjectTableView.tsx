"use client"

import { motion } from 'framer-motion'
import { Github, ExternalLink, Package, Calendar, Star, Download, Users, Eye, Edit2, Trash2, ArrowUpDown } from 'lucide-react'
import { Project } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

interface ProjectTableViewProps {
  projects: Project[]
  onViewDetails: (project: Project) => void
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
}

type SortField = 'name' | 'category' | 'status' | 'startDate' | 'version' | 'stars'
type SortDirection = 'asc' | 'desc'

const statusColors = {
  '진행중': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  '개발중': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  '완료': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  '유지보수': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  '보관': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

const categoryColors = {
  'Web': 'bg-blue-500',
  'Mobile': 'bg-green-500',
  'Library': 'bg-purple-500',
  'API': 'bg-orange-500',
  'Tool': 'bg-cyan-500',
  'Game': 'bg-pink-500',
  'Other': 'bg-gray-500',
}

export default function ProjectTableView({ projects, onViewDetails, onEdit, onDelete }: ProjectTableViewProps) {
  const { isAdmin } = useAuth()
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedProjects = [...projects].sort((a, b) => {
    let valueA: any
    let valueB: any

    switch (sortField) {
      case 'name':
        valueA = a.name.toLowerCase()
        valueB = b.name.toLowerCase()
        break
      case 'category':
        valueA = a.category
        valueB = b.category
        break
      case 'status':
        valueA = a.status
        valueB = b.status
        break
      case 'startDate':
        valueA = new Date(a.startDate)
        valueB = new Date(b.startDate)
        break
      case 'version':
        valueA = a.version
        valueB = b.version
        break
      case 'stars':
        valueA = a.stars || 0
        valueB = b.stars || 0
        break
      default:
        return 0
    }

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:bg-muted/50 p-2 rounded-md transition-colors w-full text-left"
    >
      {children}
      <ArrowUpDown className="w-3 h-3 opacity-50" />
    </button>
  )

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full bg-card rounded-xl border border-border overflow-hidden">
        {/* Table Header */}
        <div className="bg-muted/30 border-b border-border">
          <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
            <div className="col-span-3">
              <SortButton field="name">프로젝트명</SortButton>
            </div>
            <div className="col-span-2">
              <SortButton field="category">카테고리</SortButton>
            </div>
            <div className="col-span-1">
              <SortButton field="status">상태</SortButton>
            </div>
            <div className="col-span-2">기술 스택</div>
            <div className="col-span-1">
              <SortButton field="startDate">시작일</SortButton>
            </div>
            <div className="col-span-1">
              <SortButton field="version">버전</SortButton>
            </div>
            <div className="col-span-1">
              <SortButton field="stars">스타</SortButton>
            </div>
            <div className="col-span-1">액션</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {sortedProjects.map((project, index) => {
            const links = [
              { icon: Github, url: project.githubUrl, label: 'GitHub' },
              { icon: ExternalLink, url: project.vercelUrl || project.demoUrl, label: 'Demo' },
              { icon: Package, url: project.npmUrl, label: 'npm' },
            ].filter(link => link.url)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onViewDetails(project)}
              >
                {/* Project Name */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <h3 className="font-medium text-foreground line-clamp-1">{project.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="text-sm text-muted-foreground">{project.category}</span>
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>

                {/* Tech Stack */}
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={`${project.id}-tech-${techIndex}`}
                        className="px-1.5 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 2 && (
                      <span className="px-1.5 py-0.5 text-xs rounded bg-muted text-muted-foreground">
                        +{project.techStack.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Start Date */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">
                      {new Date(project.startDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\./g, '.').replace(/ /g, '')}
                      {project.endDate && (
                        <> ~ {new Date(project.endDate).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: '2-digit', 
                          day: '2-digit'
                        }).replace(/\./g, '.').replace(/ /g, '')}</>
                      )}
                    </span>
                  </div>
                </div>

                {/* Version */}
                <div className="col-span-1">
                  <span className="text-sm text-muted-foreground">v{project.version}</span>
                </div>

                {/* Stars */}
                <div className="col-span-1">
                  {project.stars && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3" />
                      {project.stars}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex items-center gap-1">
                    {/* Links */}
                    {links.slice(0, 2).map((link, linkIndex) => (
                      <motion.a
                        key={`${project.id}-link-${linkIndex}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                        title={link.label}
                      >
                        <link.icon className="w-3 h-3" />
                      </motion.a>
                    ))}
                    
                    {/* View Details */}
                    <motion.button
                      className="p-1 rounded hover:bg-secondary transition-colors text-primary"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="자세히 보기"
                    >
                      <Eye className="w-3 h-3" />
                    </motion.button>

                    {/* Admin Controls */}
                    {isAdmin && (
                      <>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            onEdit?.(project)
                          }}
                          className="p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-blue-500"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="수정"
                        >
                          <Edit2 className="w-3 h-3" />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete?.(project)
                          }}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title="삭제"
                        >
                          <Trash2 className="w-3 h-3" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}