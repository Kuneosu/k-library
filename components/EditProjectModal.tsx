"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Save } from 'lucide-react'
import { updateProject } from '@/lib/database'
import { Project, ProjectCategory, ProjectStatus, ProjectSize } from '@/types'

interface EditProjectModalProps {
  project: Project | null
  onClose: () => void
  onSuccess: () => void
}

const categories: ProjectCategory[] = ['Web', 'Mobile', 'Library', 'API', 'Tool', 'Game', 'Other']
const statuses: ProjectStatus[] = ['진행중', '개발중', '완료', '유지보수', '보관']
const sizes: ProjectSize[] = ['Small', 'Medium', 'Large', 'Enterprise']

export default function EditProjectModal({ project, onClose, onSuccess }: EditProjectModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    techStack: [''],
    startDate: '',
    endDate: '',
    version: '1.0.0',
    category: 'Web' as ProjectCategory,
    status: 'In Progress' as ProjectStatus,
    size: 'Medium' as ProjectSize,
    githubUrl: '',
    vercelUrl: '',
    npmUrl: '',
    demoUrl: '',
    features: [''],
    screenshots: [''],
    highlights: [''],
    challenges: [''],
    learnings: [''],
    stars: 0,
    downloads: 0,
    contributors: 1,
  })

  // 프로젝트 데이터로 폼 초기화
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        longDescription: project.longDescription || '',
        techStack: project.techStack.length > 0 ? project.techStack : [''],
        startDate: project.startDate,
        endDate: project.endDate || '',
        version: project.version,
        category: project.category,
        status: project.status,
        size: project.size,
        githubUrl: project.githubUrl || '',
        vercelUrl: project.vercelUrl || '',
        npmUrl: project.npmUrl || '',
        demoUrl: project.demoUrl || '',
        features: project.features.length > 0 ? project.features : [''],
        screenshots: project.screenshots.length > 0 ? project.screenshots : [''],
        highlights: project.highlights && project.highlights.length > 0 ? project.highlights : [''],
        challenges: project.challenges && project.challenges.length > 0 ? project.challenges : [''],
        learnings: project.learnings && project.learnings.length > 0 ? project.learnings : [''],
        stars: project.stars || 0,
        downloads: project.downloads || 0,
        contributors: project.contributors || 1,
      })
    }
  }, [project])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      return {
        ...prev,
        [field]: currentArray.map((item: string, i: number) => 
          i === index ? value : item
        )
      }
    })
  }

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      return {
        ...prev,
        [field]: [...currentArray, '']
      }
    })
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[]
      return {
        ...prev,
        [field]: currentArray.filter((_: any, i: number) => i !== index)
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return
    
    setLoading(true)
    setError('')

    try {
      // 빈 값들을 필터링하고 데이터 정리
      const updateData: Partial<Omit<Project, 'id'>> = {
        ...formData,
        longDescription: formData.longDescription || undefined,
        endDate: formData.endDate || undefined,
        githubUrl: formData.githubUrl || undefined,
        vercelUrl: formData.vercelUrl || undefined,
        npmUrl: formData.npmUrl || undefined,
        demoUrl: formData.demoUrl || undefined,
        techStack: formData.techStack.filter(tech => tech.trim() !== ''),
        features: formData.features.filter(feature => feature.trim() !== ''),
        screenshots: formData.screenshots.filter(screenshot => screenshot.trim() !== ''),
        highlights: formData.highlights.filter(highlight => highlight.trim() !== '').length > 0 
          ? formData.highlights.filter(highlight => highlight.trim() !== '') 
          : undefined,
        challenges: formData.challenges.filter(challenge => challenge.trim() !== '').length > 0
          ? formData.challenges.filter(challenge => challenge.trim() !== '')
          : undefined,
        learnings: formData.learnings.filter(learning => learning.trim() !== '').length > 0
          ? formData.learnings.filter(learning => learning.trim() !== '')
          : undefined,
        stars: formData.stars || undefined,
        downloads: formData.downloads || undefined,
        contributors: formData.contributors || undefined,
      }

      await updateProject(project.id, updateData)
      onSuccess()
    } catch (err) {
      console.error('프로젝트 수정 실패:', err)
      setError('프로젝트 수정에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="bg-background border border-border rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl my-8 mx-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">프로젝트 수정</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form - 기존 AddProjectModal과 동일하지만 데이터가 미리 채워짐 */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">프로젝트 이름 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">버전</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => handleInputChange('version', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">간단한 설명 *</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">상세 설명</label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => handleInputChange('longDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">카테고리</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">상태</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">크기</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">시작일 *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">완료일</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Demo URL</label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => handleInputChange('demoUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vercel URL</label>
                <input
                  type="url"
                  value={formData.vercelUrl}
                  onChange={(e) => handleInputChange('vercelUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">NPM URL</label>
                <input
                  type="url"
                  value={formData.npmUrl}
                  onChange={(e) => handleInputChange('npmUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Array Fields */}
            {[
              { key: 'techStack', label: '기술 스택 *' },
              { key: 'features', label: '주요 기능 *' },
              { key: 'screenshots', label: '스크린샷 URL' },
              { key: 'highlights', label: '하이라이트' },
              { key: 'challenges', label: '도전 과제' },
              { key: 'learnings', label: '배운 점' },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium">{label}</label>
                {(formData[key as keyof typeof formData] as string[]).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange(key, index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder={`${label} ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(key, index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      disabled={(formData[key as keyof typeof formData] as string[]).length <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem(key)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {label} 추가
                </button>
              </div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stars</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stars}
                  onChange={(e) => handleInputChange('stars', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Downloads</label>
                <input
                  type="number"
                  min="0"
                  value={formData.downloads}
                  onChange={(e) => handleInputChange('downloads', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Contributors</label>
                <input
                  type="number"
                  min="1"
                  value={formData.contributors}
                  onChange={(e) => handleInputChange('contributors', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                disabled={loading}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.description}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? '수정 중...' : '프로젝트 수정'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}