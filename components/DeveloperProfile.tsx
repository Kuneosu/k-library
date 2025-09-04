"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe, Mail, Code2, Calendar, Award, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { DeveloperProfile as ProfileType } from '@/types'

interface DeveloperProfileProps {
  profile: ProfileType
  projectStats: {
    total: number
    active: number
    completed: number
    maintenance: number
  }
}

export default function DeveloperProfile({ profile, projectStats }: DeveloperProfileProps) {
  // Experience는 이미 데이터베이스에서 계산되어 전달됨
  const experienceText = profile.experience < 1 
    ? `${Math.floor(profile.experience * 12)}개월`
    : profile.experience % 1 === 0 
      ? `${profile.experience}년`
      : `${Math.floor(profile.experience)}년 ${Math.floor((profile.experience % 1) * 12)}개월`
  
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  
  const handleEmailClick = () => {
    setShowEmailPopup(true)
  }
  
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowEmailPopup(false)
    }
  }
  
  const socialLinks = [
    { icon: Github, href: profile.github, label: 'GitHub', action: 'link' },
    { icon: Mail, href: null, label: 'Email', action: 'email' },
    { icon: Globe, href: profile.website, label: 'Website', action: 'link' },
    { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn', action: 'disabled', disabled: true },
  ].filter(link => link.href || link.action === 'email' || link.disabled)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 md:p-12"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Profile Info */}
          <div className="flex-1">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-2 gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {profile.name}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {profile.title}
            </motion.p>
            <motion.p 
              className="text-base md:text-lg text-foreground/80 mb-6 max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {profile.bio}
            </motion.p>

            {/* Social Links */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  className={`relative ${link.disabled ? 'cursor-not-allowed' : ''}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {link.disabled && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                        준비중
                      </span>
                    </div>
                  )}
                  {link.action === 'email' ? (
                    <motion.button
                      onClick={handleEmailClick}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-colors"
                      whileHover={!link.disabled ? { scale: 1.05 } : {}}
                      whileTap={!link.disabled ? { scale: 0.95 } : {}}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </motion.button>
                  ) : (
                    <motion.a
                      href={link.disabled ? undefined : link.href || '#'}
                      target={link.disabled ? undefined : "_blank"}
                      rel={link.disabled ? undefined : "noopener noreferrer"}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border transition-colors ${
                        link.disabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-background/80'
                      }`}
                      whileHover={!link.disabled ? { scale: 1.05 } : {}}
                      whileTap={!link.disabled ? { scale: 0.95 } : {}}
                      onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Current Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">현재 관심 분야</h3>
              <div className="flex flex-wrap gap-2">
                {profile.currentFocus.map((focus, index) => (
                  <motion.span
                    key={focus}
                    className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    {focus}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatCard
              icon={Code2}
              label="총 프로젝트"
              value={projectStats.total}
              delay={0.6}
            />
            <StatCard
              icon={Award}
              label="완료된 프로젝트"
              value={projectStats.completed}
              delay={0.7}
            />
            <StatCard
              icon={Calendar}
              label="경력"
              value={experienceText}
              delay={0.8}
            />
            <StatCard
              icon={Code2}
              label="진행 중"
              value={projectStats.active}
              delay={0.9}
            />
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          className="mt-8 pt-8 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-4">기술 스택</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-md bg-background/50 backdrop-blur-sm border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Email Popup */}
      {showEmailPopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
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
                    <span>복사하기</span>
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
      )}
    </motion.section>
  )
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  delay 
}: { 
  icon: any
  label: string
  value: string | number
  delay: number 
}) {
  return (
    <motion.div
      className="bg-background/50 backdrop-blur-sm border border-border rounded-lg p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-primary" />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </motion.div>
  )
}