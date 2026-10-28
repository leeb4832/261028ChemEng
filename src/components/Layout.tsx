import { Outlet } from 'react-router-dom'
import Header from './Header'
import { siteInfo } from '../siteInfo'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <Outlet />
      </main>
      <footer className="bg-navy-900 py-8 text-center text-sm text-navy-200">
        {siteInfo.university} {siteInfo.labName}
      </footer>
    </div>
  )
}
