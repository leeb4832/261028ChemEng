import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

export function PageTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-4">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">{title}</h1>
      {desc && <p className="mt-1 text-slate-600">{desc}</p>}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>
}

const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50'
const styles = {
  primary: `${base} bg-navy-700 text-white hover:bg-navy-800`,
  outline: `${base} border border-slate-300 text-slate-700 hover:bg-slate-50`,
  danger: `${base} border border-red-300 text-red-700 hover:bg-red-50`,
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof styles }) {
  return <button className={`${styles[variant]} ${className}`} {...rest} />
}

export function ButtonLink({ variant = 'primary', ...rest }: LinkProps & { variant?: keyof typeof styles }) {
  return <Link className={styles[variant]} {...rest} />
}

export function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="search" value={value} onChange={(e) => onChange(e.target.value)}
      placeholder="키워드로 검색"
      className="mb-6 w-full rounded-md border border-slate-300 px-3 py-2 sm:max-w-sm"
    />
  )
}

export function Pagination({ page, total, pageSize, onChange }: { page: number; total: number; pageSize: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / pageSize)
  if (pages <= 1) return null
  return (
    <div className="mt-6 flex items-center justify-center gap-3 text-sm">
      <Button variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>이전</Button>
      <span>{page} / {pages}</span>
      <Button variant="outline" disabled={page >= pages} onClick={() => onChange(page + 1)}>다음</Button>
    </div>
  )
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-navy-600 underline hover:text-navy-800">
      {children}
    </a>
  )
}
