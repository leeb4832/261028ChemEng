import { Link } from 'react-router-dom'
import { EmptyState, StatusView } from '../components/StatusView'
import { Card } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useAsync } from '../hooks/useAsync'
import { dataService } from '../services'
import { siteInfo } from '../siteInfo'
import { formatDate } from '../utils/format'

const shortcuts = [
  { to: '/research', title: '연구', desc: '연구 분야와 논문' },
  { to: '/teaching', title: '수업', desc: '강의 자료 모음' },
  { to: '/discussions', title: '토론', desc: '구성원 전용 게시판' },
  { to: '/members', title: '구성원', desc: '교수와 대학원생' },
]

function RecentResearch() {
  const { data, loading, error, reload } = useAsync(() => dataService.research.list({ limit: 3 }), [])
  return (
    <StatusView loading={loading} error={error} onRetry={reload}>
      {data?.length ? (
        <ul className="space-y-3">
          {data.map((r) => (
            <li key={r.id}><Link to="/research" className="font-medium text-navy-700 hover:underline">{r.title}</Link>
              <p className="text-sm text-slate-600">{r.description}</p></li>
          ))}
        </ul>
      ) : <EmptyState message="등록된 연구가 없습니다." />}
    </StatusView>
  )
}

function RecentPosts() {
  const { user } = useAuth()
  const canRead = user?.role === 'member' || user?.role === 'admin'
  const { data, loading, error, reload } = useAsync(
    () => (canRead ? dataService.posts.list({ limit: 3, sortBy: 'createdAt', desc: true }) : Promise.resolve([])),
    [canRead],
  )
  if (!canRead) return <EmptyState message="토론은 로그인한 구성원만 볼 수 있습니다." />
  return (
    <StatusView loading={loading} error={error} onRetry={reload}>
      {data?.length ? (
        <ul className="space-y-3">
          {data.map((p) => (
            <li key={p.id}><Link to={`/discussions/${p.id}`} className="font-medium text-navy-700 hover:underline">{p.title}</Link>
              <p className="text-sm text-slate-500">{p.authorName} · {formatDate(p.createdAt)}</p></li>
          ))}
        </ul>
      ) : <EmptyState message="아직 토론 글이 없습니다." />}
    </StatusView>
  )
}

export default function Home() {
  return (
    <>
      <section className="mb-12 rounded-lg bg-navy-50 px-6 py-10">
        <p className="text-sm font-medium text-navy-600">{siteInfo.university}</p>
        <h1 className="mt-1 text-3xl font-bold text-navy-900 sm:text-4xl">{siteInfo.labName}</h1>
        <p className="mt-4 max-w-2xl text-slate-700">{siteInfo.intro}</p>
      </section>

      <section className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shortcuts.map((s) => (
          <Link key={s.to} to={s.to} className="rounded-lg border border-slate-200 p-4 transition hover:border-navy-600 hover:shadow">
            <p className="font-semibold text-navy-800">{s.title}</p>
            <p className="text-sm text-slate-600">{s.desc}</p>
          </Link>
        ))}
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <Card><h2 className="mb-4 text-lg font-semibold text-navy-800">최근 연구</h2><RecentResearch /></Card>
        <Card><h2 className="mb-4 text-lg font-semibold text-navy-800">최근 토론</h2><RecentPosts /></Card>
      </div>
    </>
  )
}
