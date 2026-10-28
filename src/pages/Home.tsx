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
      <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 px-8 py-16 text-white shadow-lg sm:px-12">
        <span className="mb-4 block h-1 w-12 rounded bg-accent" />
        <p className="text-sm font-medium tracking-wide text-navy-200">{siteInfo.university}</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{siteInfo.labName}</h1>
        <p className="mt-6 max-w-2xl text-lg text-navy-100">{siteInfo.intro}</p>
      </section>

      <section className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shortcuts.map((s) => (
          <Link key={s.to} to={s.to} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md">
            <p className="font-semibold text-navy-900">{s.title} <span className="text-accent transition group-hover:translate-x-1 inline-block">→</span></p>
            <p className="text-sm text-slate-600">{s.desc}</p>
          </Link>
        ))}
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <Card><h2 className="mb-4 text-lg font-bold text-navy-900">최근 연구</h2><RecentResearch /></Card>
        <Card><h2 className="mb-4 text-lg font-bold text-navy-900">최근 토론</h2><RecentPosts /></Card>
      </div>
    </>
  )
}
