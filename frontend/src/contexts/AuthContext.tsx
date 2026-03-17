import { createContext, useContext, useState, type ReactNode } from 'react'
import { login as loginApi, register as registerApi, logout as logoutApi, getMe as getMeApi, type Tokens, type User } from '../api/endpoints/auth'

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('access_token')
  })
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      try {
        const userData = await getMeApi(accessToken)
        setUser(userData)
      } catch {
        setUser(null)
      }
    }
  }

  const login = async (email: string, password: string) => {
    const tokens: Tokens = await loginApi(email, password)
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    setIsAuthenticated(true)
    await fetchUser()
  }

  const logout = async () => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      try {
        await logoutApi(accessToken)
      } catch {
        // Ignore logout errors
      }
    }
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    setIsAuthenticated(false)
  }

  const register = async (name: string, email: string, password: string) => {
    const tokens: Tokens = await registerApi(name, email, password)
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    setIsAuthenticated(true)
    await fetchUser()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
