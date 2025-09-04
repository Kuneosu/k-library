"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Plus, Trash2 } from 'lucide-react'
import { DeveloperProfile } from '@/types'
import { updateDeveloperProfileWithSkills } from '@/lib/database'

interface EditProfileModalProps {
  profile: DeveloperProfile | null
  onClose: () => void
  onSuccess: () => void
}

interface SkillGroup {
  category: string
  items: string[]
}

export default function EditProfileModal({ profile, onClose, onSuccess }: EditProfileModalProps) {
  const [formData, setFormData] = useState<DeveloperProfile>({
    id: '',
    name: '',
    title: '',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    website: '',
    location: '',
    experience: 0,
    skills: [],
    currentFocus: []
  })
  
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([])
  const [currentFocusItems, setCurrentFocusItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        name: profile.name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        email: profile.email || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        website: profile.website || ''
      })
      setSkillGroups(profile.skills || [])
      setCurrentFocusItems(profile.currentFocus || [])
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedProfile = {
        ...formData,
        skills: skillGroups,
        currentFocus: currentFocusItems
      }

      const result = await updateDeveloperProfileWithSkills(formData.id, updatedProfile)

      if (!result) {
        throw new Error('프로필 업데이트에 실패했습니다')
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('프로필 업데이트 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkillGroup = () => {
    setSkillGroups([...skillGroups, { category: '', items: [''] }])
  }

  const removeSkillGroup = (index: number) => {
    setSkillGroups(skillGroups.filter((_, i) => i !== index))
  }

  const updateSkillGroup = (index: number, field: 'category', value: string) => {
    const updated = [...skillGroups]
    updated[index] = { ...updated[index], [field]: value }
    setSkillGroups(updated)
  }

  const addSkillItem = (groupIndex: number) => {
    const updated = [...skillGroups]
    updated[groupIndex].items.push('')
    setSkillGroups(updated)
  }

  const removeSkillItem = (groupIndex: number, itemIndex: number) => {
    const updated = [...skillGroups]
    updated[groupIndex].items = updated[groupIndex].items.filter((_, i) => i !== itemIndex)
    setSkillGroups(updated)
  }

  const updateSkillItem = (groupIndex: number, itemIndex: number, value: string) => {
    const updated = [...skillGroups]
    updated[groupIndex].items[itemIndex] = value
    setSkillGroups(updated)
  }

  const addCurrentFocus = () => {
    setCurrentFocusItems([...currentFocusItems, ''])
  }

  const removeCurrentFocus = (index: number) => {
    setCurrentFocusItems(currentFocusItems.filter((_, i) => i !== index))
  }

  const updateCurrentFocus = (index: number, value: string) => {
    const updated = [...currentFocusItems]
    updated[index] = value
    setCurrentFocusItems(updated)
  }

  if (!profile) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-card border border-border rounded-2xl shadow-2xl max-w-4xl w-full my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold">프로필 수정</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">이름 *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">직책 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">소개</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">웹사이트 URL</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>


            {/* Current Focus */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium">현재 관심 분야</label>
                <button
                  type="button"
                  onClick={addCurrentFocus}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {currentFocusItems.map((focus, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={focus}
                      onChange={(e) => updateCurrentFocus(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="관심 분야 입력"
                    />
                    <button
                      type="button"
                      onClick={() => removeCurrentFocus(index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium">기술 스택</label>
                <button
                  type="button"
                  onClick={addSkillGroup}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
                >
                  카테고리 추가
                </button>
              </div>
              <div className="space-y-4">
                {skillGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="text"
                        value={group.category}
                        onChange={(e) => updateSkillGroup(groupIndex, 'category', e.target.value)}
                        className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                        placeholder="카테고리명"
                      />
                      <button
                        type="button"
                        onClick={() => addSkillItem(groupIndex)}
                        className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSkillGroup(groupIndex)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {group.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => updateSkillItem(groupIndex, itemIndex, e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            placeholder="기술 입력"
                          />
                          <button
                            type="button"
                            onClick={() => removeSkillItem(groupIndex, itemIndex)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="submit"
              form="edit-profile-form"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  저장
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}