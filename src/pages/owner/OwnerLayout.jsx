import React from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { useAuth } from '../../context/AuthContext'

const OwnerLayout = () => {
  const navigate = useNavigate()
  const { session, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 max-lg:w-20 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-4 lg:px-5 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={assets.logo} alt="Logo" className="h-8 group-hover:opacity-90 transition-opacity" />
          </Link>
        </div>

        <nav className="p-3 flex-1 overflow-y-auto">
          {ownerMenuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/owner'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img src={isActive ? link.coloredIcon : link.icon} alt="" className="h-5 w-5 shrink-0" />
                  <span className="max-lg:sr-only">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
          <div>
            <p className="font-semibold text-slate-900">Admin dashboard</p>
            <p className="text-xs text-slate-500">Manage cars and bookings</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 hidden sm:inline truncate max-w-[180px]">{session?.email}</span>
            <button
              onClick={() => { logout(); navigate('/admin/login') }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default OwnerLayout
