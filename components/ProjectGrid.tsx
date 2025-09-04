"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, ProjectCategory, ProjectStatus } from '@/types'
import ProjectCard from './ProjectCard'
import ProjectListCard from './ProjectListCard'
import ProjectGalleryCard from './ProjectGalleryCard'
import ProjectTableView from './ProjectTableView'
import ProjectViewToggle, { ViewMode } from './ProjectViewToggle'
import ProjectFilter from './ProjectFilter'
import ProjectModal from './ProjectModal'
import EditProjectModal from './EditProjectModal'
import DeleteProjectModal from './DeleteProjectModal'

interface ProjectGridProps {
  projects: Project[]
  onProjectUpdated?: () => void
}

export default function ProjectGrid({ projects, onProjectUpdated }: ProjectGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All')
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'All'>('All')
  const [selectedTech, setSelectedTech] = useState<string[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deletingProject, setDeletingProject] = useState<Project | null>(null)

  // Extract all unique technologies from projects
  const availableTech = useMemo(() => {
    const techSet = new Set<string>()
    projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet).sort()
  }, [projects])

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = project.name.toLowerCase().includes(query)
        const matchesDescription = project.description.toLowerCase().includes(query)
        const matchesTech = project.techStack.some(tech => 
          tech.toLowerCase().includes(query)
        )
        if (!matchesName && !matchesDescription && !matchesTech) {
          return false
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false
      }

      // Status filter
      if (selectedStatus !== 'All' && project.status !== selectedStatus) {
        return false
      }

      // Tech stack filter
      if (selectedTech.length > 0) {
        const hasSelectedTech = selectedTech.some(tech =>
          project.techStack.includes(tech)
        )
        if (!hasSelectedTech) {
          return false
        }
      }

      return true
    })
  }, [projects, searchQuery, selectedCategory, selectedStatus, selectedTech])

  return (
    <div>
      <ProjectFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedTech={selectedTech}
        setSelectedTech={setSelectedTech}
        availableTech={availableTech}
      />

      {/* Results count and View Toggle */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-muted-foreground">
          {filteredProjects.length}개의 프로젝트
          {filteredProjects.length !== projects.length && (
            <span> (총 {projects.length}개 중)</span>
          )}
        </p>
        <ProjectViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </motion.div>

      {/* Project Views */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${viewMode}-view`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {viewMode === 'list' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    index={index}
                    onViewDetails={setSelectedProject}
                    onEdit={setEditingProject}
                    onDelete={setDeletingProject}
                  />
                ))}
              </div>
            )}
            
            {viewMode === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProjects.map((project, index) => (
                  <ProjectGalleryCard
                    key={project.id}
                    project={project}
                    index={index}
                    onViewDetails={setSelectedProject}
                    onEdit={setEditingProject}
                    onDelete={setDeletingProject}
                  />
                ))}
              </div>
            )}
            
            {viewMode === 'table' && (
              <ProjectTableView
                projects={filteredProjects}
                onViewDetails={setSelectedProject}
                onEdit={setEditingProject}
                onDelete={setDeletingProject}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground mb-4">검색 조건에 맞는 프로젝트를 찾을 수 없습니다.</p>
            <motion.button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
                setSelectedStatus('All')
                setSelectedTech([])
              }}
              className="text-primary hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              모든 필터 초기화
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSuccess={() => {
          setEditingProject(null)
          onProjectUpdated?.()
        }}
      />

      {/* Delete Project Modal */}
      <DeleteProjectModal
        project={deletingProject}
        onClose={() => setDeletingProject(null)}
        onSuccess={() => {
          setDeletingProject(null)
          onProjectUpdated?.()
        }}
      />
    </div>
  )
}