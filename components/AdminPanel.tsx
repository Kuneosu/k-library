"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import AdminLogin from './AdminLogin'

export default function AdminPanel() {
  const { user, isAdmin, signOut } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      setShowDropdown(false)
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  if (!user) {
    return (
      <>
        <motion.button
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">관리자</span>
        </motion.button>
        
        <AdminLogin 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Shield className="w-4 h-4" />
        <span className="hidden sm:inline">관리자</span>
      </motion.button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50"
          >
            {/* User Info */}
            <div className="px-4 py-3 border-b border-border">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium break-all">{user.email}</p>
                  <p className="text-xs text-muted-foreground">관리자</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}