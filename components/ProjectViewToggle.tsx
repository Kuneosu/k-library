"use client"

import { motion } from 'framer-motion'
import { Grid3X3, List, Table } from 'lucide-react'

export type ViewMode = 'list' | 'gallery' | 'table'

interface ProjectViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export default function ProjectViewToggle({ viewMode, onViewModeChange }: ProjectViewToggleProps) {
  const viewModes = [
    { id: 'list' as ViewMode, icon: List, label: '리스트' },
    { id: 'gallery' as ViewMode, icon: Grid3X3, label: '갤러리' },
    { id: 'table' as ViewMode, icon: Table, label: '테이블' },
  ]

  return (
    <div className="flex items-center bg-secondary/50 rounded-lg p-1">
      {viewModes.map((mode) => {
        const Icon = mode.icon
        const isActive = viewMode === mode.id
        
        return (
          <motion.button
            key={mode.id}
            onClick={() => onViewModeChange(mode.id)}
            className={`
              relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${isActive 
                ? 'text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
            whileHover={{ scale: isActive ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeViewMode"
                className="absolute inset-0 bg-primary rounded-md"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10 hidden sm:inline">{mode.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}