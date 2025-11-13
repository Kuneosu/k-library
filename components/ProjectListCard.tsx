"use client"

import { motion } from 'framer-motion'
import { Github, ExternalLink, Package, Calendar, Star, Download, Users, Eye, Edit2, Trash2 } from 'lucide-react'
import { Project } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

interface ProjectListCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
}

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

export default function ProjectListCard({ project, index, onViewDetails, onEdit, onDelete }: ProjectListCardProps) {
  const { isAdmin } = useAuth()
  const links = [
    { icon: Github, url: project.githubUrl, label: 'GitHub' },
    { icon: ExternalLink, url: project.vercelUrl || project.demoUrl, label: 'Demo' },
    { icon: Package, url: project.npmUrl, label: 'npm' },
  ].filter(link => link.url)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {project.name}
            </h3>
          </div>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            v{project.version}
          </div>
          
          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex items-center gap-1 ml-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(project)
                }}
                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="수정"
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(project)
                }}
                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="삭제"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map((tech, techIndex) => (
          <span
            key={`${project.id}-tech-${techIndex}`}
            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>
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
        {project.stars && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{project.stars}</span>
          </div>
        )}
        {project.downloads && (
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{project.downloads.toLocaleString()}</span>
          </div>
        )}
        {project.contributors && (
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{project.contributors}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* Links */}
        <div className="flex items-center gap-2">
          {links.map((link, linkIndex) => (
            <motion.a
              key={`${project.id}-link-${linkIndex}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <link.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        {/* View Details */}
        <motion.button
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-4 h-4" />
          <span>자세히</span>
        </motion.button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
    </motion.div>
  )
}