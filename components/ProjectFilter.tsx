"use client"

import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { ProjectCategory, ProjectStatus } from '@/types'

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
}

const categories: (ProjectCategory | 'All')[] = ['All', 'Web', 'Mobile', 'Library', 'API', 'Tool', 'Game', 'Other']
const statuses: (ProjectStatus | 'All')[] = ['All', 'Active', 'In Progress', 'Completed', 'Maintenance', 'Archived']

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
}: ProjectFilterProps) {
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedStatus('All')
    setSelectedTech([])
  }

  const hasFilters = searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' || selectedTech.length > 0

  const toggleTech = (tech: string) => {
    setSelectedTech(
      selectedTech.includes(tech)
        ? selectedTech.filter(t => t !== tech)
        : [...selectedTech, tech]
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6 mb-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5" />
        <h2 className="text-lg font-semibold">필터</h2>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
            초기화
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">검색</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="프로젝트명, 설명, 기술스택으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Tech Stack Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">기술 스택</label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {availableTech.map((tech) => (
              <motion.button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedTech.includes(tech)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}