import { useState } from 'react'
import { Link } from 'react-router-dom'
import RequireMember from '../components/RequireMember'
import { EmptyState, StatusView } from '../components/StatusView'
import { ButtonLink, PageTitle, Pagination } from '../components/ui'
import { useAsync } from '../hooks/useAsync'
import { dataService } from '../services'
import { formatDate } from '../utils/format'

const PAGE_SIZE = 10

function PostList() {
  const [page, setPage] = useState(1)
  // 무료 한도를 아끼기 위해 최근 100개까지만 가져오고, 10개씩 나눠서 보여줍니다.
  const { data, loading, error, reload } = useAsync(
    () => dataService.posts.list({ limit: 100, sortBy: 'createdAt', desc: true }),
    [],
  )
  const posts = data ?? []
  const shown = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <StatusView loading={loading} error={error} onRetry={reload}>
      {posts.length === 0 ? (
        <EmptyState message="아직 글이 없습니다. 첫 글을 남겨 보세요." />
      ) : (
        <>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {shown.map((p) => (
              <li key={p.id}>
                <Link to={`/discussions/${p.id}`} className="block px-4 py-3 hover:bg-navy-50">
                  <p className="font-medium text-navy-900">
                    {p.title} {p.commentCount > 0 && <span className="text-sm text-navy-600">[{p.commentCount}]</span>}
                  </p>
                  <p className="text-sm text-slate-500">{p.authorName} · {formatDate(p.createdAt)} · 댓글 {p.commentCount}개</p>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination page={page} total={posts.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </>
      )}
    </StatusView>
  )
}

export default function Discussions() {
  return (
    <>
      <PageTitle title="토론" desc="연구실 구성원끼리 자유롭게 의견을 나누는 공간입니다." />
      <RequireMember>
        <div className="mb-4 text-right"><ButtonLink to="/discussions/new">글쓰기</ButtonLink></div>
        <PostList />
      </RequireMember>
    </>
  )
}
