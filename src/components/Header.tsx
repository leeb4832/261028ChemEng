import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { siteInfo } from '../siteInfo'
import { roleLabel } from '../utils/format'

const menus = [
  { to: '/research', label: '연구' },
  { to: '/teaching', label: '수업' },
  { to: '/discussions', label: '토론' },
  { to: '/members', label: '구성원' },
]

export default function Header() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block border-b-2 px-3 py-2 transition ${isActive ? 'border-accent font-semibold text-navy-900' : 'border-transparent text-slate-600 hover:text-navy-800'}`

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold tracking-tight text-navy-900" onClick={() => setOpen(false)}>{siteInfo.labName}</Link>
        <button className="rounded-md border border-slate-300 px-3 py-1 text-navy-800 md:hidden" aria-label="메뉴 열기" aria-expanded={open} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full z-10 border-b border-slate-200 bg-white px-4 pb-4 md:static md:border-0 md:bg-transparent md:flex md:items-center md:gap-6 md:p-0`}>
          <nav className="md:flex md:gap-1" onClick={() => setOpen(false)}>
            {menus.map((m) => <NavLink key={m.to} to={m.to} className={linkClass}>{m.label}</NavLink>)}
          </nav>
          <div className="mt-2 border-t border-slate-200 pt-2 text-sm text-slate-700 md:mt-0 md:border-0 md:pt-0" onClick={() => setOpen(false)}>
            {user ? (
              <div className="flex flex-wrap items-center gap-2">
                <span>{user.name} <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-700">{roleLabel[user.role]}</span></span>
                <button onClick={signOut} className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50">로그아웃</button>
              </div>
            ) : (
              <Link to="/login" className="rounded-md bg-navy-700 px-3 py-1 text-white hover:bg-navy-800">로그인</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
