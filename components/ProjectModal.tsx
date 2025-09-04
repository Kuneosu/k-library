"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, Package, Calendar, Star, Download, Users, Clock, CheckCircle, AlertCircle, Image } from 'lucide-react'
import { Project } from '@/types'
import NextImage from 'next/image'
import ImageViewer from './ImageViewer'
import SwipeableImageGallery from './SwipeableImageGallery'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const statusIcons = {
  '진행중': CheckCircle,
  '개발중': Clock,
  '완료': CheckCircle,
  '유지보수': AlertCircle,
  '보관': X,
}

const statusColors = {
  '진행중': 'text-green-500',
  '개발중': 'text-blue-500',
  '완료': 'text-gray-500',
  '유지보수': 'text-yellow-500',
  '보관': 'text-red-500',
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imageViewerIndex, setImageViewerIndex] = useState(0)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)

  if (!project) return null

  const openImageViewer = (index: number) => {
    setImageViewerIndex(index)
    setIsImageViewerOpen(true)
  }

  const links = [
    { icon: Github, url: project.githubUrl, label: 'GitHub 저장소' },
    { icon: ExternalLink, url: project.vercelUrl || project.demoUrl, label: '라이브 데모' },
    { icon: Package, url: project.npmUrl, label: 'NPM 패키지' },
  ].filter(link => link.url)

  const StatusIcon = statusIcons[project.status]

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <span className="px-2 py-1 text-sm bg-primary/20 text-primary rounded-full">
                  {project.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <StatusIcon className={`w-4 h-4 ${statusColors[project.status]}`} />
                <span>{project.status}</span>
                <span>•</span>
                <span>v{project.version}</span>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Project Screenshots */}
              {project.screenshots.length > 0 && (
                <SwipeableImageGallery
                  images={project.screenshots}
                  projectName={project.name}
                  onImageClick={openImageViewer}
                />
              )}
              
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">프로젝트 소개</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Links */}
              {links.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">링크</h3>
                  <div className="flex flex-wrap gap-3">
                    {links.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">시작일</p>
                  <p className="font-semibold">{new Date(project.startDate).toLocaleDateString('ko-KR')}</p>
                </div>
                {project.endDate && (
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <CheckCircle className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">완료일</p>
                    <p className="font-semibold">{new Date(project.endDate).toLocaleDateString('ko-KR')}</p>
                  </div>
                )}
                {project.stars && (
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <Star className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">스타</p>
                    <p className="font-semibold">{project.stars}</p>
                  </div>
                )}
                {project.downloads && (
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <Download className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">다운로드</p>
                    <p className="font-semibold">{project.downloads.toLocaleString()}</p>
                  </div>
                )}
                {project.contributors && (
                  <div className="bg-secondary/50 rounded-lg p-4 text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">기여자</p>
                    <p className="font-semibold">{project.contributors}</p>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold mb-3">기술 스택</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">주요 기능</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">하이라이트</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Learnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">도전과제</h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.learnings && project.learnings.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">배운 점</h3>
                    <ul className="space-y-2">
                      {project.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Image Viewer */}
      <ImageViewer
        images={project.screenshots}
        initialIndex={imageViewerIndex}
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        projectName={project.name}
      />
    </>
  )
}