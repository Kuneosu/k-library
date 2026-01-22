"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Check } from 'lucide-react'

interface TechStackSelectModalProps {
  isOpen: boolean
  onClose: () => void
  availableTech: string[]
  selectedTech: string[]
  onConfirm: (tech: string[]) => void
}

export default function TechStackSelectModal({
  isOpen,
  onClose,
  availableTech,
  selectedTech,
  onConfirm,
}: TechStackSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [tempSelectedTech, setTempSelectedTech] = useState<string[]>(selectedTech)

  // 모달이 열릴 때 선택 상태 초기화
  const handleOpen = () => {
    setTempSelectedTech(selectedTech)
    setSearchQuery('')
  }

  // 검색 필터링
  const filteredTech = useMemo(() => {
    if (!searchQuery.trim()) return availableTech
    return availableTech.filter(tech =>
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [availableTech, searchQuery])

  const toggleTech = (tech: string) => {
    setTempSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const removeTech = (tech: string) => {
    setTempSelectedTech(prev => prev.filter(t => t !== tech))
  }

  const handleConfirm = () => {
    onConfirm(tempSelectedTech)
    onClose()
  }

  const handleCancel = () => {
    setTempSelectedTech(selectedTech)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        onAnimationStart={() => handleOpen()}
      >
        <motion.div
          className="bg-background border border-border rounded-xl w-full max-w-lg shadow-2xl max-h-[80vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
            <h2 className="text-lg font-semibold">기술 스택 선택</h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-4 overflow-hidden flex-1">
            {/* 검색 */}
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="기술 스택 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {/* 선택된 기술 스택 */}
            {tempSelectedTech.length > 0 && (
              <div className="shrink-0">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  선택됨 ({tempSelectedTech.length}):
                </label>
                <div className="flex flex-wrap gap-2">
                  {tempSelectedTech.map((tech) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-sm rounded-md"
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(tech)}
                        className="hover:bg-primary-foreground/20 rounded p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* 구분선 */}
            <div className="border-t border-border shrink-0" />

            {/* 기술 목록 */}
            <div className="overflow-y-auto flex-1 min-h-0">
              {filteredTech.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredTech.map((tech) => {
                    const isSelected = tempSelectedTech.includes(tech)
                    return (
                      <motion.button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                          isSelected
                            ? 'bg-primary/10 border-primary text-primary border'
                            : 'bg-secondary hover:bg-secondary/80 border border-transparent'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground/50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="truncate">{tech}</span>
                      </motion.button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  &quot;{searchQuery}&quot;에 해당하는 기술이 없습니다
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-border shrink-0">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              선택 완료
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
