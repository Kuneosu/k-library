"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

// 간단한 User 타입 정의 (Supabase User 대체)
interface User {
  id: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 개발 환경 전용 관리자 이메일 목록
const ADMIN_EMAILS = [
  'kks92155784@gmail.com',
  // 필요시 추가 관리자 이메일 추가
]

// 개발 환경 전용 간단한 비밀번호 (환경 변수로 관리)
const DEV_PASSWORD = process.env.NEXT_PUBLIC_DEV_ADMIN_PASSWORD || 'admin123'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 개발 환경에서만 관리자 권한 활성화
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isAdmin = isDevelopment && user ? ADMIN_EMAILS.includes(user.email || '') : false

  useEffect(() => {
    // 로컬 스토리지에서 세션 복원 (개발 환경 전용)
    const loadSession = () => {
      if (!isDevelopment) {
        setLoading(false)
        return
      }

      const savedUser = localStorage.getItem('dev_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          localStorage.removeItem('dev_user')
        }
      }
      setLoading(false)
    }

    loadSession()
  }, [isDevelopment])

  const signIn = async (email: string, password: string) => {
    // 프로덕션 환경에서는 로그인 비활성화
    if (!isDevelopment) {
      return {
        error: {
          message: '관리자 기능은 개발 환경에서만 사용 가능합니다.'
        }
      }
    }

    // 개발 환경: 간단한 비밀번호 인증
    if (password !== DEV_PASSWORD) {
      return {
        error: {
          message: '비밀번호가 올바르지 않습니다.'
        }
      }
    }

    if (!ADMIN_EMAILS.includes(email)) {
      return {
        error: {
          message: '관리자 권한이 없는 이메일입니다.'
        }
      }
    }

    const newUser = {
      id: crypto.randomUUID(),
      email
    }

    setUser(newUser)
    localStorage.setItem('dev_user', JSON.stringify(newUser))

    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('dev_user')
  }

  const value = {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}