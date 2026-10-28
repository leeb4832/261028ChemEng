import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import RequireMember from '../components/RequireMember'
import { EmptyState, StatusView } from '../components/StatusView'
import { Button, ButtonLink } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useAsync } from '../hooks/useAsync'
import { dataService } from '../services'
import { formatDate } from '../utils/format'

function PostDetail({ id }: { id: string }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { data: post, loading, error, reload } = useAsync(() => dataService.posts.get(id), [id])

  async function remove() {
    if (!window.confirm('이 글을 삭제할까요? 되돌릴 수 없습니다.')) return
    try {
      await dataService.posts.delete(id)
      navigate('/discussions')
    } catch (err) {
      window.alert(err instanceof Error ? err.message : '삭제하지 못했습니다.')
    }
  }

  return (
    <StatusView loading={loading} error={error} onRetry={reload}>
      {!post ? (
        <EmptyState message="글을 찾을 수 없습니다. 삭제되었을 수 있어요." action={<ButtonLink to="/discussions">목록으로</ButtonLink>} />
      ) : (
        <article>
          <Link to="/discussions" className="text-sm text-navy-600 hover:underline">← 목록으로</Link>
          <h1 className="mt-2 text-2xl font-bold text-navy-900">{post.title}</h1>
          <p className="mb-6 mt-1 text-sm text-slate-500">{post.authorName} · {formatDate(post.createdAt)}</p>
          <p className="whitespace-pre-wrap border-y border-slate-200 py-6">{post.content}</p>
          {(user?.uid === post.authorId || user?.role === 'admin') && (
            <div className="mt-3 text-right"><Button variant="danger" onClick={remove}>글 삭제</Button></div>
          )}
          <CommentSection post={post} />
        </article>
      )}
    </StatusView>
  )
}

export default function DiscussionDetail() {
  const { id } = useParams<{ id: string }>()
  return <RequireMember>{id ? <PostDetail id={id} /> : null}</RequireMember>
}
