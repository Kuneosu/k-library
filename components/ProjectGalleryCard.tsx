"use client"

import { motion } from 'framer-motion'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { Project } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import NextImage from 'next/image'

interface ProjectGalleryCardProps {
  project: Project
  index: number
  onViewDetails: (project: Project) => void
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
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

export default function ProjectGalleryCard({ project, index, onViewDetails, onEdit, onDelete }: ProjectGalleryCardProps) {
  const { isAdmin } = useAuth()
  const hasImage = project.screenshots.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetails(project)}
    >
      {/* Image Container - 4:3 Aspect Ratio */}
      <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
        {hasImage ? (
          <>
            <NextImage
              src={project.screenshots[0]}
              alt={`${project.name} 스크린샷`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay with hover effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            
            {/* View Details Button - appears on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails(project)
                }}
              >
                <Eye className="w-4 h-4" />
                자세히 보기
              </motion.button>
            </motion.div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted to-muted/50">
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full ${categoryColors[project.category]} mx-auto mb-2 flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {project.name.charAt(0)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">No Image</p>
            </div>
          </div>
        )}

        {/* Admin Controls - positioned absolutely */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(project)
              }}
              className="p-1.5 bg-blue-500/90 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
              className="p-1.5 bg-red-500/90 text-white rounded-lg hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="삭제"
            >
              <Trash2 className="w-3 h-3" />
            </motion.button>
          </div>
        )}

        {/* Category indicator */}
        <div className="absolute top-2 left-2">
          <span className={`inline-block w-3 h-3 rounded-full ${categoryColors[project.category]}`} />
        </div>
      </div>

      {/* Content - Only Title */}
      <div className="p-4">
        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          v{project.version}
        </p>
      </div>
    </motion.div>
  )
}