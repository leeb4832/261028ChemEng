import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DiscussionDetail from './pages/DiscussionDetail'
import DiscussionNew from './pages/DiscussionNew'
import Discussions from './pages/Discussions'
import Home from './pages/Home'
import Login from './pages/Login'
import Members from './pages/Members'
import NotFound from './pages/NotFound'
import Research from './pages/Research'
import AdminUsers from './pages/AdminUsers'
import Teaching from './pages/Teaching'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/discussions/new" element={<DiscussionNew />} />
        <Route path="/discussions/:id" element={<DiscussionDetail />} />
        <Route path="/members" element={<Members />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
