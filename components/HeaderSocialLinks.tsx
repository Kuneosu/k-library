"use client"

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Mail, Globe, Copy, Check } from 'lucide-react'
import { DeveloperProfile } from '@/types'

interface HeaderSocialLinksProps {
  profile: DeveloperProfile | null
  isVisible: boolean
}

export default function HeaderSocialLinks({ profile, isVisible }: HeaderSocialLinksProps) {
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  
  if (!profile) return null

  const handleEmailClick = () => {
    setShowEmailPopup(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowEmailPopup(false)
    }
  }

  const links = [
    {
      icon: Github,
      href: profile.github,
      label: 'GitHub',
      action: 'link',
      show: !!profile.github
    },
    {
      icon: Mail,
      href: null,
      label: 'Email',
      action: 'email',
      show: !!profile.email
    },
    {
      icon: Globe,
      href: profile.website,
      label: 'Website', 
      action: 'link',
      show: !!profile.website
    }
  ].filter(link => link.show)

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {links.map((link, index) => {
              const Icon = link.icon
              return (
                <div key={link.label}>
                  {link.action === 'email' ? (
                    <motion.button
                      onClick={handleEmailClick}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 300 }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group"
                      title={link.label}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </motion.button>
                  ) : (
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + index * 0.1, type: "spring", stiffness: 300 }}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group"
                      title={link.label}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </motion.a>
                  )}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Email Popup Modal - Portal to body */}
      {showEmailPopup && typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="bg-background border border-border rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">이메일 주소</h3>
              </div>
              
              <div className="bg-muted/30 border border-border/50 rounded-lg p-4 mb-6">
                <p className="text-base font-mono text-foreground break-all">
                  {profile.email}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={copyEmail}
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex-1 font-medium"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>복사됨!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>이메일 복사</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-foreground font-medium sm:w-auto"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}