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
    `block rounded px-3 py-2 ${isActive ? 'bg-navy-600 font-semibold' : 'hover:bg-navy-700'}`

  return (
    <header className="bg-navy-800 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold" onClick={() => setOpen(false)}>{siteInfo.labName}</Link>
        <button className="rounded border border-white/40 px-3 py-1 md:hidden" aria-label="메뉴 열기" aria-expanded={open} onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-14 z-10 bg-navy-800 px-4 pb-4 md:static md:flex md:items-center md:gap-6 md:p-0`}>
          <nav className="md:flex md:gap-1" onClick={() => setOpen(false)}>
            {menus.map((m) => <NavLink key={m.to} to={m.to} className={linkClass}>{m.label}</NavLink>)}
          </nav>
          <div className="mt-2 border-t border-white/20 pt-2 text-sm md:mt-0 md:border-0 md:pt-0" onClick={() => setOpen(false)}>
            {user ? (
              <div className="flex flex-wrap items-center gap-2">
                <span>{user.name} <span className="rounded bg-white/15 px-2 py-0.5 text-xs">{roleLabel[user.role]}</span></span>
                <button onClick={signOut} className="rounded border border-white/40 px-2 py-1 hover:bg-navy-700">로그아웃</button>
              </div>
            ) : (
              <Link to="/login" className="rounded border border-white/40 px-3 py-1 hover:bg-navy-700">로그인</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
