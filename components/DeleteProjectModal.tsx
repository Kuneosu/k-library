"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Trash2 } from 'lucide-react'
import { deleteProject } from '@/lib/database'
import { Project } from '@/types'

interface DeleteProjectModalProps {
  project: Project | null
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteProjectModal({ project, onClose, onSuccess }: DeleteProjectModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = async () => {
    if (!project) return
    
    // 프로젝트 이름 확인
    if (confirmText !== project.name) {
      setError('프로젝트 이름이 일치하지 않습니다.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await deleteProject(project.id)
      onSuccess()
    } catch (err) {
      console.error('프로젝트 삭제 실패:', err)
      setError('프로젝트 삭제에 실패했습니다.')
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="bg-background border border-border rounded-xl w-full max-w-md shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">프로젝트 삭제</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Warning Message */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-400 mb-2">⚠️ 주의사항</h3>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• 이 작업은 되돌릴 수 없습니다</li>
                <li>• 프로젝트의 모든 데이터가 영구적으로 삭제됩니다</li>
                <li>• 백업이 없다면 복구할 수 없습니다</li>
              </ul>
            </div>

            {/* Project Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">삭제할 프로젝트:</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">이름:</span> {project.name}</p>
                <p><span className="font-medium">설명:</span> {project.description}</p>
                <p><span className="font-medium">카테고리:</span> {project.category}</p>
                <p><span className="font-medium">상태:</span> {project.status}</p>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                삭제를 확인하려면 프로젝트 이름을 정확히 입력하세요:
              </label>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {project.name}
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value)
                    setError('')
                  }}
                  placeholder="프로젝트 이름을 입력하세요"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-muted transition-colors text-center font-medium"
                disabled={loading}
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={loading || confirmText !== project.name}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {loading ? '삭제 중...' : '영구 삭제'}
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              이 작업은 되돌릴 수 없습니다. 신중히 결정해주세요.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}