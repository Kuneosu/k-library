"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import AddProjectModal from './AddProjectModal'

export default function AddProjectButton() {
  const { isAdmin } = useAuth()
  const [showModal, setShowModal] = useState(false)

  // 관리자가 아니면 렌더링하지 않음
  if (!isAdmin) {
    return null
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        <motion.div
          className="fixed bottom-6 right-20 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium pointer-events-none z-30 opacity-0 hover:opacity-100"
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          프로젝트 추가
        </motion.div>
      </AnimatePresence>

      {/* Add Project Modal */}
      <AddProjectModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false)
          // 페이지 새로고침으로 데이터 갱신
          window.location.reload()
        }}
      />
    </>
  )
}