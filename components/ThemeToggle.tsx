"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-theme-toggle]')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
    )
  }

  const themes = [
    { key: 'light', icon: Sun, label: '라이트' },
    { key: 'dark', icon: Moon, label: '다크' },
    { key: 'system', icon: Monitor, label: '시스템' },
  ]

  const currentTheme = themes.find(t => t.key === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  const handleThemeSelect = (themeKey: string) => {
    setTheme(themeKey)
    setIsOpen(false)
  }

  return (
    <div className="relative" data-theme-toggle>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`테마 선택 (현재: ${currentTheme.label})`}
      >
        <CurrentIcon className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-32 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          >
            {themes.map((themeOption) => {
              const IconComponent = themeOption.icon
              const isSelected = theme === themeOption.key
              
              return (
                <motion.button
                  key={themeOption.key}
                  onClick={() => handleThemeSelect(themeOption.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors relative ${
                    isSelected 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-secondary/50 text-foreground'
                  }`}
                  whileHover={{ backgroundColor: 'hsl(var(--secondary))' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium flex-1">{themeOption.label}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}