"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react'
import { ProjectCategory, ProjectStatus } from '@/types'
import TechStackSelectModal from './TechStackSelectModal'

interface ProjectFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: ProjectCategory | 'All'
  setSelectedCategory: (category: ProjectCategory | 'All') => void
  selectedStatus: ProjectStatus | 'All'
  setSelectedStatus: (status: ProjectStatus | 'All') => void
  selectedTech: string[]
  setSelectedTech: (tech: string[]) => void
  availableTech: string[]
  selectedYear: string
  setSelectedYear: (year: string) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
  selectedDay: string
  setSelectedDay: (day: string) => void
}

const categories: (ProjectCategory | 'All')[] = ['All', 'Web', 'Mobile', 'Library', 'API', 'Tool', 'Game', 'Other']
const statuses: (ProjectStatus | 'All')[] = ['All', '진행중', '개발중', '완료', '유지보수', '보관']

export default function ProjectFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedTech,
  setSelectedTech,
  availableTech,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
}: ProjectFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTechModalOpen, setIsTechModalOpen] = useState(false)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setSelectedTech([])
    setSelectedYear('')
    setSelectedMonth('')
    setSelectedDay('')
  }

  const hasFilters = searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedTech.length > 0 || selectedYear || selectedMonth || selectedDay

  // 필터 요약 생성
  const getFilterSummary = () => {
    const parts: string[] = []
    if (selectedCategory !== 'All') parts.push(selectedCategory)
    if (selectedStatus !== 'All') parts.push(selectedStatus)
    if (selectedTech.length > 0) {
      parts.push(selectedTech.length <= 2 ? selectedTech.join(', ') : `${selectedTech.slice(0, 2).join(', ')} 외 ${selectedTech.length - 2}개`)
    }
    if (selectedYear || selectedMonth || selectedDay) {
      const dateParts = []
      if (selectedYear) dateParts.push(`${selectedYear}년`)
      if (selectedMonth) dateParts.push(`${parseInt(selectedMonth)}월`)
      if (selectedDay) dateParts.push(`${parseInt(selectedDay)}일`)
      parts.push(dateParts.join(' '))
    }
    return parts
  }

  const filterSummary = getFilterSummary()

  const removeTech = (tech: string) => {
    setSelectedTech(selectedTech.filter(t => t !== tech))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl mb-8"
    >
      {/* 헤더: 검색창 + 필터 토글 버튼 (항상 표시) */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* 검색 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="프로젝트명, 설명, 기술스택으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* 필터 토글 버튼 */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isExpanded || hasFilters
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">필터</span>
            {hasFilters && !isExpanded && (
              <span className="w-2 h-2 bg-primary-foreground rounded-full" />
            )}
          </motion.button>
        </div>

        {/* 필터 요약 (접힌 상태에서 적용된 필터 표시) */}
        <AnimatePresence>
          {!isExpanded && filterSummary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2 flex-wrap"
            >
              <span className="text-xs text-muted-foreground">적용됨:</span>
              {filterSummary.map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {item}
                </span>
              ))}
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                초기화
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 확장 영역: 카테고리, 상태, 날짜, 기술 스택 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-border space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">카테고리</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">상태</label>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <motion.button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          selectedStatus === status
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">날짜 필터</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    >
                      <option value="">연도</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i
                        return (
                          <option key={year} value={year.toString()}>
                            {year}년
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    >
                      <option value="">월</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, '0')
                        return (
                          <option key={month} value={month}>
                            {i + 1}월
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                    >
                      <option value="">일</option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = (i + 1).toString().padStart(2, '0')
                        return (
                          <option key={day} value={day}>
                            {i + 1}일
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium mb-2">기술 스택</label>
                <div className="flex flex-wrap items-center gap-2">
                  {/* 기술 스택 선택 버튼 */}
                  <motion.button
                    onClick={() => setIsTechModalOpen(true)}
                    className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    기술 스택 선택
                    {selectedTech.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                        {selectedTech.length}
                      </span>
                    )}
                  </motion.button>

                  {/* 선택된 기술 태그 */}
                  {selectedTech.map((tech) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(tech)}
                        className="hover:bg-primary/20 rounded p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* 초기화 버튼 */}
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    필터 초기화
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech Stack Modal */}
      <TechStackSelectModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
        availableTech={availableTech}
        selectedTech={selectedTech}
        onConfirm={setSelectedTech}
      />
    </motion.div>
  )
}
