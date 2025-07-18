// API基础配置
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// 通用API请求函数
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  // 添加认证token（如果存在）
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// 用户注册DTO接口
export interface UserRegisterDTO {
  name: string
  email: string
  password: string
  phone: string
  avatarFileName?: string
}

// 用户登录DTO接口
export interface UserLoginDTO {
  email: string
  password: string
}

// API响应接口
export interface ApiResponse<T = unknown> {
  status: number
  message: string
  data?: T
  token?: string
}

// 认证API服务
export class AuthService {
  // 用户注册
  static async register(registerData: UserRegisterDTO): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
    })
  }

  // 用户登录
  static async login(loginData: UserLoginDTO): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    })
  }

  // 更新用户信息
  static async update(updateData: Partial<UserRegisterDTO>): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/user/update', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  }

  // 用户登出
  static async logout(): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/auth/logout', {
      method: 'POST',
    })
  }

  // 刷新token
  static async refreshToken(): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/auth/refresh', {
      method: 'POST',
    })
  }

  // 获取当前用户信息
  static async getCurrentUser(token: string): Promise<ApiResponse> {
    return apiRequest<ApiResponse>('/api/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }


  // 存储认证信息
  static setAuthToken(token: string): void {
    localStorage.setItem('authToken', token)
  }

  // 清除认证信息
  static clearAuthToken(): void {
    localStorage.removeItem('authToken')
  }

  // 获取认证token
  static getAuthToken(): string | null {
    console.log('获取token:', localStorage.getItem('authToken'))
    return localStorage.getItem('authToken')
  }
}

// 文件上传服务
export class FileService {
  // 上传头像
  static async uploadAvatar(file: File): Promise<ApiResponse<{ fileName: string; url: string }>> {
    const formData = new FormData()
    formData.append('avatar', file)

    return apiRequest<ApiResponse<{ fileName: string; url: string }>>('/api/upload/avatar', {
      method: 'POST',
      body: formData,
      headers: {}, // 不设置Content-Type，让浏览器自动设置multipart/form-data
    })
  }
}

export default AuthService
