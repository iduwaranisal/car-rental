import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets, menuLinks } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ setShowLogin }) => {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn, isAdmin, session, logout } = useAuth()
  const isHome = location.pathname === '/'

  // Close menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = searchQuery.trim()
    if (query) {
      navigate(`/cars?q=${encodeURIComponent(query)}`)
      setSearchQuery('')
      setOpen(false)
    } else {
      navigate('/cars')
      setOpen(false)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-3.5 text-slate-700 border-b border-slate-200/80 backdrop-blur-md transition-all ${isHome ? 'bg-slate-50/95' : 'bg-white/95 shadow-sm'
          }`}
      >
        <Link to="/" className="shrink-0 z-50 relative">
          <img src={assets.logo} alt="LankaRide" className="h-7 sm:h-8 md:h-9" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center gap-6 lg:gap-8">
          {menuLinks
            .filter((link) => !(isAdmin && link.path === '/my-bookings'))
            .map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 w-64 h-10 pl-4 pr-2 rounded-full border border-slate-200 bg-white/80 text-slate-500 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30 transition-all">
            <img src={assets.search_icon} alt="" className="w-4 h-4 shrink-0 opacity-70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-slate-400"
              placeholder="Search cars..."
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-primary hover:bg-primary-dull text-white rounded-lg text-xs font-medium transition-colors"
            >
              Search
            </button>
          </form>

          <button
            onClick={() => navigate('/owner')}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
          >
            Dashboard
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 truncate max-w-[120px]">
                {session?.name}{isAdmin ? ' (Admin)' : ''}
              </span>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary hover:bg-primary-dull text-white shadow-sm hover:shadow transition-all"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 -mr-2 rounded-lg text-slate-600 hover:bg-slate-100 z-50 relative"
          aria-label="Toggle menu"
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt=""
            className="w-5 h-5"
          />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-[57px] right-0 bottom-0 w-full max-w-sm bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out sm:hidden overflow-y-auto ${open ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 h-11 pl-4 pr-2 rounded-xl border-2 border-slate-200 bg-white text-slate-500 focus-within:border-primary transition-all">
            <img src={assets.search_icon} alt="" className="w-4 h-4 shrink-0 opacity-70" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm outline-none placeholder-slate-400"
              placeholder="Search cars..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-dull text-white rounded-lg text-xs font-medium transition-colors"
            >
              Search
            </button>
          </form>

          {/* Menu Links */}
          <div className="flex flex-col space-y-1">
            {menuLinks
              .filter((link) => !(isAdmin && link.path === '/my-bookings'))
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${location.pathname === link.path
                      ? 'text-primary bg-primary/5'
                      : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
          </div>

          {/* Dashboard & Auth */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <button
              onClick={() => {
                navigate('/owner')
                setOpen(false)
              }}
              className="w-full px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors text-left"
            >
              Dashboard
            </button>

            {isLoggedIn ? (
              <div className="space-y-3">
                <div className="px-4 py-2 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500">Logged in as</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {session?.name}{isAdmin ? ' (Admin)' : ''}
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                    setOpen(false)
                  }}
                  className="w-full px-4 py-3 text-base font-medium rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login')
                  setOpen(false)
                }}
                className="w-full px-4 py-3.5 text-base font-semibold rounded-xl bg-primary hover:bg-primary-dull text-white shadow-md transition-all"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar