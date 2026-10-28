// 가짜 로그인 (Phase 1 전용). 역할별 데모 사용자 3명
import type { Role, User } from '../../types'
import type { AuthService } from '../types'

export const demoUsers: Record<Role, User> = {
  admin: { uid: 'u-admin', name: '김교수', email: 'prof@example.com', role: 'admin' },
  member: { uid: 'u-member', name: '이학생', email: 'student@example.com', role: 'member' },
  pending: { uid: 'u-pending', name: '박신입', email: 'newbie@example.com', role: 'pending' },
}

let current: User | null = null
const listeners = new Set<(user: User | null) => void>()
const notify = () => listeners.forEach((cb) => cb(current))

export const mockAuthService: AuthService = {
  async signInWithGoogle(demoRole: Role = 'member') {
    current = demoUsers[demoRole]
    notify()
  },
  async signOut() {
    current = null
    notify()
  },
  onAuthChange(callback) {
    listeners.add(callback)
    callback(current)
    return () => {
      listeners.delete(callback)
    }
  },
}
