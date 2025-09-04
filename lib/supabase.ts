import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 데이터베이스 타입 정의
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          long_description: string | null
          tech_stack: string[]
          start_date: string
          end_date: string | null
          version: string
          category: string
          status: string
          size: string
          github_url: string | null
          vercel_url: string | null
          npm_url: string | null
          demo_url: string | null
          features: string[]
          screenshots: string[]
          highlights: string[] | null
          challenges: string[] | null
          learnings: string[] | null
          stars: number | null
          downloads: number | null
          contributors: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          long_description?: string | null
          tech_stack: string[]
          start_date: string
          end_date?: string | null
          version: string
          category: string
          status: string
          size: string
          github_url?: string | null
          vercel_url?: string | null
          npm_url?: string | null
          demo_url?: string | null
          features: string[]
          screenshots?: string[]
          highlights?: string[] | null
          challenges?: string[] | null
          learnings?: string[] | null
          stars?: number | null
          downloads?: number | null
          contributors?: number | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          long_description?: string | null
          tech_stack?: string[]
          start_date?: string
          end_date?: string | null
          version?: string
          category?: string
          status?: string
          size?: string
          github_url?: string | null
          vercel_url?: string | null
          npm_url?: string | null
          demo_url?: string | null
          features?: string[]
          screenshots?: string[]
          highlights?: string[] | null
          challenges?: string[] | null
          learnings?: string[] | null
          stars?: number | null
          downloads?: number | null
          contributors?: number | null
        }
      }
    }
  }
}

// 타입이 지정된 Supabase 클라이언트
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey)