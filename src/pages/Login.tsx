import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, PageTitle } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { isDemoMode } from '../services'
import type { Role } from '../types'

const demoButtons: { role: Role; label: string }[] = [
  { role: 'admin', label: '교수(admin)로 입장' },
  { role: 'member', label: '학생(member)으로 입장' },
  { role: 'pending', label: '승인대기(pending)로 입장' },
]

export default function Login() {
  const { user, signIn, signOut } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  async function enter(role?: Role) {
    setError(null)
    try {
      await signIn(role)
      navigate('/')
    } catch {
      setError('로그인하지 못했습니다. 팝업이 차단되지 않았는지 확인하고 다시 시도해 주세요.')
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <PageTitle title="로그인" />
      <Card>
        {isDemoMode ? (
          <>
            <p className="mb-1 rounded bg-amber-50 px-3 py-2 text-sm text-amber-800">
              데모 모드입니다. Firebase 설정이 없어 가짜 로그인을 사용합니다.
            </p>
            <p className="my-4 text-sm text-slate-600">체험할 역할을 골라 주세요.</p>
            <div className="flex flex-col gap-2">
              {demoButtons.map((b) => (
                <Button key={b.role} variant={b.role === 'admin' ? 'primary' : 'outline'} onClick={() => enter(b.role)}>{b.label}</Button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="mb-4 text-sm text-slate-600">
              Google 계정으로 로그인합니다. 처음 로그인하면 교수님의 승인을 기다리게 됩니다.
            </p>
            <Button className="w-full" onClick={() => enter()}>Google로 로그인</Button>
          </>
        )}
        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        {user && (
          <p className="mt-4 text-center text-sm text-slate-500">
            현재 {user.name}님으로 로그인됨 · <button className="underline" onClick={signOut}>로그아웃</button>
          </p>
        )}
      </Card>
    </div>
  )
}
