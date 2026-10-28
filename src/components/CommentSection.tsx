import { useState, type FormEvent } from 'react'
import { StatusView, EmptyState } from './StatusView'
import { Button } from './ui'
import { useAuth } from '../context/AuthContext'
import { useAsync } from '../hooks/useAsync'
import { dataService } from '../services'
import type { Post } from '../types'
import { formatDate } from '../utils/format'

/** 댓글 목록 + 작성. 댓글 수가 바뀌면 게시글의 commentCount도 갱신합니다. */
export default function CommentSection({ post }: { post: Post }) {
  const { user } = useAuth()
  const { data, loading, error, reload } = useAsync(
    () => dataService.comments.list({ filter: { postId: post.id }, sortBy: 'createdAt', limit: 200 }),
    [post.id],
  )
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function syncCount() {
    const all = await dataService.comments.list({ filter: { postId: post.id }, limit: 200 })
    await dataService.posts.update(post.id, { commentCount: all.length })
    reload()
  }

  async function add(e: FormEvent) {
    e.preventDefault()
    if (!user || !text.trim()) return
    setBusy(true)
    setFormError(null)
    try {
      await dataService.comments.create({
        postId: post.id, content: text.trim(), authorId: user.uid, authorName: user.name,
        createdAt: new Date().toISOString(),
      })
      setText('')
      await syncCount()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '댓글을 저장하지 못했습니다.')
    }
    setBusy(false)
  }

  async function remove(id: string) {
    if (!window.confirm('댓글을 삭제할까요?')) return
    try {
      await dataService.comments.delete(id)
      await syncCount()
    } catch (err) {
      window.alert(err instanceof Error ? err.message : '삭제하지 못했습니다.')
    }
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold text-navy-800">댓글 {data?.length ?? 0}</h2>
      <StatusView loading={loading} error={error} onRetry={reload}>
        {data?.length ? (
          <ul className="mb-6 space-y-3">
            {data.map((c) => (
              <li key={c.id} className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-sm text-slate-500">{c.authorName} · {formatDate(c.createdAt)}</p>
                <p className="whitespace-pre-wrap">{c.content}</p>
                {(user?.uid === c.authorId || user?.role === 'admin') && (
                  <button onClick={() => remove(c.id)} className="mt-1 text-sm text-red-600 hover:underline">삭제</button>
                )}
              </li>
            ))}
          </ul>
        ) : <div className="mb-6"><EmptyState message="아직 댓글이 없습니다." /></div>}
      </StatusView>
      <form onSubmit={add} className="space-y-2">
        <textarea
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy-600 focus:outline-none"
          rows={3} placeholder="댓글을 입력하세요" value={text} onChange={(e) => setText(e.target.value)}
        />
        {formError && <p className="text-sm text-red-600" role="alert">{formError}</p>}
        <Button type="submit" disabled={busy || !text.trim()}>{busy ? '등록 중…' : '댓글 등록'}</Button>
      </form>
    </section>
  )
}
