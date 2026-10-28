import { useNavigate } from 'react-router-dom'
import { Button, Card, PageTitle } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import type { Role } from '../types'

const demoButtons: { role: Role; label: string }[] = [
  { role: 'admin', label: '교수(admin)로 입장' },
  { role: 'member', label: '학생(member)으로 입장' },
  { role: 'pending', label: '승인대기(pending)로 입장' },
]

export default function Login() {
  const { user, signIn, signOut } = useAuth()
  const navigate = useNavigate()

  async function enter(role: Role) {
    await signIn(role)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md">
      <PageTitle title="로그인" />
      <Card>
        <p className="mb-1 rounded bg-amber-50 px-3 py-2 text-sm text-amber-800">
          개발용 화면입니다. 실제 Google 로그인은 다음 단계에서 연결됩니다.
        </p>
        <p className="my-4 text-sm text-slate-600">체험할 역할을 골라 주세요.</p>
        <div className="flex flex-col gap-2">
          {demoButtons.map((b) => (
            <Button key={b.role} variant={b.role === 'admin' ? 'primary' : 'outline'} onClick={() => enter(b.role)}>{b.label}</Button>
          ))}
        </div>
        {user && (
          <p className="mt-4 text-center text-sm text-slate-500">
            현재 {user.name}님으로 로그인됨 · <button className="underline" onClick={signOut}>로그아웃</button>
          </p>
        )}
      </Card>
    </div>
  )
}
