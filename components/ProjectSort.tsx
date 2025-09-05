"use client"

import { ArrowUpDown, Calendar, Download, Type } from 'lucide-react'

export type SortOption = 'date-asc' | 'date-desc' | 'downloads' | 'name'

interface ProjectSortProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export default function ProjectSort({ sortBy, onSortChange }: ProjectSortProps) {
  const sortOptions: { value: SortOption; label: string; icon: any }[] = [
    { value: 'date-desc', label: '최신순', icon: Calendar },
    { value: 'date-asc', label: '오래된순', icon: Calendar },
    { value: 'downloads', label: '다운로드순', icon: Download },
    { value: 'name', label: '이름순', icon: Type },
  ]

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <ArrowUpDown className="w-4 h-4" />
        <span>정렬</span>
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}