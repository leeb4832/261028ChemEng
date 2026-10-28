// 토론처럼 구성원 전용인 화면을 감싸는 문지기.
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { ButtonLink, Card } from './ui'

export default function RequireMember({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <h2 className="mb-2 text-lg font-semibold text-navy-800">로그인이 필요합니다</h2>
        <p className="mb-4 text-slate-600">토론 게시판은 연구실 구성원만 이용할 수 있습니다.</p>
        <ButtonLink to="/login">로그인하러 가기</ButtonLink>
      </Card>
    )
  }
  if (user.role === 'pending') {
    return (
      <Card className="mx-auto max-w-md text-center">
        <h2 className="mb-2 text-lg font-semibold text-navy-800">승인 대기 중</h2>
        <p className="text-slate-600">교수님의 승인을 기다리는 중입니다.</p>
        <p className="mt-1 text-sm text-slate-500">승인이 완료되면 토론 게시판을 이용할 수 있습니다.</p>
      </Card>
    )
  }
  return <>{children}</>
}
