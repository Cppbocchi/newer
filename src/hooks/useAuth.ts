import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import type { AuthContextType } from '../contexts/AuthContext'

// 使用认证上下文的Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export type { AuthContextType }
