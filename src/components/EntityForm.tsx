// 관리자용 입력 폼. 항목 정의(fields)만 바꿔서 여러 곳에서 재사용합니다.
import { useState, type FormEvent } from 'react'
import { Button } from './ui'
import { isSafeUrl } from '../utils/format'

export interface FormField {
  name: string
  label: string
  kind: 'text' | 'textarea' | 'number' | 'url' | 'select'
  options?: string[]
  required?: boolean
  hint?: string
}

export type FormValues = Record<string, string>

interface Props {
  fields: FormField[]
  initial: FormValues
  submitLabel: string
  onSubmit: (values: FormValues) => Promise<void>
  onCancel: () => void
}

const inputClass = 'w-full rounded-md border border-slate-300 px-3 py-2 focus:border-navy-600 focus:outline-none'

export default function EntityForm({ fields, initial, submitLabel, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<FormValues>(initial)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    for (const f of fields) {
      const v = (values[f.name] ?? '').trim()
      if (f.required && !v) return setError(`'${f.label}' 항목을 입력해 주세요.`)
      if (f.kind === 'url' && v && !isSafeUrl(v)) return setError(`'${f.label}'은(는) http:// 또는 https:// 로 시작하는 주소여야 합니다.`)
    }
    setBusy(true)
    setError(null)
    try {
      await onSubmit(values)
    } catch (err) {
      setError(err instanceof Error ? err.message : '저장하지 못했습니다.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-navy-200 bg-navy-50 p-5">
      {fields.map((f) => (
        <label key={f.name} className="block text-sm font-medium text-slate-700">
          {f.label}{f.required && <span className="text-red-600"> *</span>}
          {f.kind === 'textarea' ? (
            <textarea className={`${inputClass} mt-1 font-normal`} rows={4} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
          ) : f.kind === 'select' ? (
            <select className={`${inputClass} mt-1 font-normal`} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)}>
              {f.options?.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input className={`${inputClass} mt-1 font-normal`} type={f.kind === 'number' ? 'number' : 'text'} value={values[f.name] ?? ''} onChange={(e) => set(f.name, e.target.value)} />
          )}
          {f.hint && <span className="mt-1 block text-xs font-normal text-slate-500">{f.hint}</span>}
        </label>
      ))}
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>{busy ? '저장 중…' : submitLabel}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>취소</Button>
      </div>
    </form>
  )
}
