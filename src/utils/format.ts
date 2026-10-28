import type { Role } from '../types'

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })

export const roleLabel: Record<Role, string> = {
  admin: '교수(관리자)',
  member: '구성원',
  pending: '승인대기',
}

/** http/https 주소만 링크로 허용 (javascript: 같은 위험한 주소 차단) */
export const isSafeUrl = (value: string) => /^https?:\/\/\S+$/i.test(value)
