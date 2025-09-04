"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Globe, Mail, Code2, Calendar, Award } from 'lucide-react'
import { DeveloperProfile as ProfileType } from '@/types'
import { calculateExperience } from '@/utils/dateUtils'

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
  // 경력 시작일 (2024년 8월 1일)
  const careerStartDate = '2024-08-01'
  const calculatedExperience = calculateExperience(careerStartDate)
  
  const socialLinks = [
    { icon: Github, href: profile.github, label: 'GitHub' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
    { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: profile.twitter, label: 'Twitter' },
    { icon: Globe, href: profile.website, label: 'Website' },
  ].filter(link => link.href)

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
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
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
              value={calculatedExperience}
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