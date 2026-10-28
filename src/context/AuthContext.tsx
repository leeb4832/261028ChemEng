import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authService } from '../services'
import type { Role, User } from '../types'

interface AuthValue {
  user: User | null
  signIn: (demoRole?: Role) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => authService.onAuthChange(setUser), [])

  const value: AuthValue = {
    user,
    signIn: (demoRole) => authService.signInWithGoogle(demoRole),
    signOut: () => authService.signOut(),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthProvider 안에서만 사용할 수 있습니다.')
  return ctx
}
