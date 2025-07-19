import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthService } from '../services/authService'

// 用户信息接口
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  memberLevel: string
  memberPoints: number
  balance: number
  totalOrders: number
  memberExpDate: string
  createdAt: string
  role?: 'USER' | 'ADMIN'
}

// 认证上下文接口
export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 认证提供者组件属性
interface AuthProviderProps {
  children: ReactNode
}

// 认证提供者组件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 计算是否已认证
  const isAuthenticated = !!user

  // 初始化时检查认证状态
  useEffect(() => {
    const initAuth = async () => {
      const token = AuthService.getAuthToken()
      
      if (token) {
        try {
          // 检查是否是管理员token
          if (token.startsWith('admin-token-')) {
            // 恢复管理员用户状态
            const adminUser: User = {
              id: 'admin-001',
              name: 'admin',
              email: 'admin@admin.com',
              phone: '13800138000',
              avatar: '',
              memberLevel: 'ADMIN',
              memberPoints: 0,
              balance: 0,
              totalOrders: 0,
              memberExpDate: '2099-12-31',
              createdAt: new Date().toISOString(),
              role: 'ADMIN'
            }
            console.log('恢复管理员状态:', adminUser)
            setUser(adminUser)
          } else {
            // 普通用户token验证
            const response = await AuthService.getCurrentUser(token)
            if (response.data) {
              setUser(response.data as User)
            } else {
              AuthService.clearAuthToken()
            }
          }
        } catch (error) {
          console.error('认证初始化失败:', error)
          AuthService.clearAuthToken()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // 登录函数
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // 检查是否是管理员账户
      if (email === 'admin' && password === '123456') {
        // 创建管理员用户对象
        const adminUser: User = {
          id: 'admin-001',
          name: 'admin',
          email: 'admin@admin.com',
          phone: '13800138000',
          avatar: '',
          memberLevel: 'ADMIN',
          memberPoints: 0,
          balance: 0,
          totalOrders: 0,
          memberExpDate: '2099-12-31',
          createdAt: new Date().toISOString(),
          role: 'ADMIN'
        }
        
        // 设置一个管理员专用的token
        AuthService.setAuthToken('admin-token-' + Date.now())
        setUser(adminUser)
        console.log('管理员登录成功:', adminUser)
        return true
      }
      
      // 普通用户登录逻辑
      const response = await AuthService.login({ email, password }) 
      if (response.status === 200 && response.token) {
        AuthService.setAuthToken(response.token)
        if (response.data) {
          console.log('登录成功:', response.data)
          setUser(response.data as User)
        }
        return true
      }
      return false
    } catch (error) {
      console.error('登录失败:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // 登出函数
  const logout = async () => {
    try {
      await AuthService.logout()
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      AuthService.clearAuthToken()
      setUser(null)
    }
  }

  // 更新用户信息
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
