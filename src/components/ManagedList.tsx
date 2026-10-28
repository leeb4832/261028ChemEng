// 목록 + (관리자일 때만) 추가/수정/삭제 버튼. 연구·수업·구성원 화면에서 공통으로 사용합니다.
import { useState, type ReactNode } from 'react'
import EntityForm, { type FormField, type FormValues } from './EntityForm'
import { EmptyState, StatusView } from './StatusView'
import { Button } from './ui'
import { useAuth } from '../context/AuthContext'
import { useAsync } from '../hooks/useAsync'
import type { Collection, CreateInput, Entity, ListOptions } from '../services/types'

interface Props<T extends Entity> {
  heading?: string
  addLabel: string
  emptyText: string
  collection: Collection<T>
  listOptions?: ListOptions<T>
  fields: FormField[]
  toForm: (item: T) => FormValues
  fromForm: (values: FormValues) => CreateInput<T>
  emptyForm: FormValues
  renderItem: (item: T) => ReactNode
  /** 검색어와 맞는 항목인지 판단 (없으면 검색 안 함) */
  matches?: (item: T, query: string) => boolean
  query?: string
  grid?: boolean
}

export default function ManagedList<T extends Entity>(p: Props<T>) {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const { data, loading, error, reload } = useAsync(
    () => p.collection.list(p.listOptions),
    [p.collection, JSON.stringify(p.listOptions)],
  )
  const [editing, setEditing] = useState<T | 'new' | null>(null)

  const q = (p.query ?? '').trim().toLowerCase()
  const items = (data ?? []).filter((item) => !q || !p.matches || p.matches(item, q))

  async function save(values: FormValues) {
    if (editing === 'new') await p.collection.create(p.fromForm(values))
    else if (editing) await p.collection.update(editing.id, p.fromForm(values))
    setEditing(null)
    reload()
  }

  async function remove(item: T) {
    if (!window.confirm('정말 삭제할까요? 되돌릴 수 없습니다.')) return
    try {
      await p.collection.delete(item.id)
      reload()
    } catch (e) {
      window.alert(e instanceof Error ? e.message : '삭제하지 못했습니다.')
    }
  }

  return (
    <section className="mb-14">
      <div className="mb-4 flex items-center justify-between">
        {p.heading ? <h2 className="text-xl font-bold text-navy-900">{p.heading}</h2> : <span />}
        {isAdmin && !editing && <Button onClick={() => setEditing('new')}>+ {p.addLabel}</Button>}
      </div>

      {editing && (
        <div className="mb-6">
          <EntityForm
            fields={p.fields}
            initial={editing === 'new' ? p.emptyForm : p.toForm(editing)}
            submitLabel={editing === 'new' ? '추가' : '수정 저장'}
            onSubmit={save}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      <StatusView loading={loading} error={error} onRetry={reload}>
        {items.length === 0 ? (
          <EmptyState message={q ? '검색 결과가 없습니다.' : p.emptyText} />
        ) : (
          <ul className={p.grid ? 'grid gap-4 sm:grid-cols-2' : 'space-y-3'}>
            {items.map((item) => (
              <li key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md">
                {p.renderItem(item)}
                {isAdmin && (
                  <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                    <Button variant="outline" className="!px-3 !py-1" onClick={() => setEditing(item)}>수정</Button>
                    <Button variant="danger" className="!px-3 !py-1" onClick={() => remove(item)}>삭제</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </StatusView>
    </section>
  )
}
