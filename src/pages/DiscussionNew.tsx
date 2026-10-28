import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import RequireMember from '../components/RequireMember'
import { Button, PageTitle } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { dataService } from '../services'

const inputClass = 'w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy-600 focus:outline-none'

function NewPostForm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!title.trim() || !content.trim()) return setError('제목과 내용을 모두 입력해 주세요.')
    setBusy(true)
    try {
      const post = await dataService.posts.create({
        title: title.trim(), content: content.trim(),
        authorId: user.uid, authorName: user.name,
        createdAt: new Date().toISOString(), commentCount: 0,
      })
      navigate(`/discussions/${post.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : '글을 저장하지 못했습니다.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input className={inputClass} placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className={inputClass} rows={10} placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>{busy ? '저장 중…' : '등록'}</Button>
        <Button type="button" variant="outline" onClick={() => navigate('/discussions')}>취소</Button>
      </div>
    </form>
  )
}

export default function DiscussionNew() {
  return (
    <>
      <PageTitle title="새 글 쓰기" />
      <RequireMember><NewPostForm /></RequireMember>
    </>
  )
}
