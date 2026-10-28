// 교수(admin) 전용: 가입한 사람의 역할을 바꿔 승인/거절합니다.
import { useState } from 'react'
import { EmptyState, StatusView } from '../components/StatusView'
import { PageTitle } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useAsync } from '../hooks/useAsync'
import { dataService } from '../services'
import type { Role } from '../types'
import { roleLabel } from '../utils/format'

const roles: Role[] = ['pending', 'member', 'admin']

export default function AdminUsers() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useAsync(
    () => (user?.role === 'admin' ? dataService.users.list({ limit: 200 }) : Promise.resolve([])),
    [user?.uid],
  )
  const [busyId, setBusyId] = useState<string | null>(null)

  if (user?.role !== 'admin') return <EmptyState message="교수(관리자)만 볼 수 있는 화면입니다." />

  async function change(id: string, value: string) {
    const role = roles.find((r) => r === value)
    if (!role) return
    setBusyId(id)
    try {
      await dataService.users.update(id, { role })
      reload()
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '변경하지 못했습니다.')
    }
    setBusyId(null)
  }

  const users = [...(data ?? [])].sort((a, b) => Number(b.role === 'pending') - Number(a.role === 'pending'))

  return (
    <>
      <PageTitle title="회원 관리" desc="가입한 사람의 역할을 정합니다. 승인대기 → 구성원으로 바꾸면 토론을 이용할 수 있습니다." />
      <StatusView loading={loading} error={error} onRetry={reload}>
        {users.length === 0 ? (
          <EmptyState message="가입한 회원이 없습니다." />
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {users.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-medium text-navy-900">{u.name}</p>
                  <p className="text-sm text-slate-500">{u.email}</p>
                </div>
                <select
                  value={u.role}
                  disabled={busyId === u.id || u.id === user.uid}
                  title={u.id === user.uid ? '본인의 역할은 바꿀 수 없습니다' : undefined}
                  onChange={(e) => change(u.id, e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-60"
                >
                  {roles.map((r) => <option key={r} value={r}>{roleLabel[r]}</option>)}
                </select>
              </li>
            ))}
          </ul>
        )}
      </StatusView>
    </>
  )
}
