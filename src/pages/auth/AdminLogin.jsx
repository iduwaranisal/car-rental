import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShell from '../../components/AuthShell'
import { useAuth } from '../../context/AuthContext'

const AdminLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const next = new URLSearchParams(location.search).get('next') || '/owner'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login({ type: 'admin', email, password })
      navigate(next)
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title='Admin Login'
      subtitle='Sign in to manage cars and bookings.'
      footer={
        <div className='flex items-center justify-between'>
          <span>Need an admin account?</span>
          <Link className='text-primary font-medium hover:underline' to={`/admin/signup?next=${encodeURIComponent(next)}`}>
            Create one
          </Link>
        </div>
      }
    >
      <form onSubmit={onSubmit} className='space-y-4'>
        <div>
          <label className='text-sm text-gray-600'>Admin email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all'
            placeholder='admin@example.com'
            required
          />
        </div>
        <div>
          <label className='text-sm text-gray-600'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all'
            placeholder='••••••••'
            required
          />
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button
          disabled={loading}
          className='w-full px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold shadow-md shadow-primary/20 disabled:opacity-60 transition-all'
        >
          {loading ? 'Signing in…' : 'Login'}
        </button>

        <div className='text-xs text-gray-500'>
          User?{' '}
          <Link className='text-primary font-medium hover:underline' to={`/login?next=${encodeURIComponent('/')}`}>
            Go to user login
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}

export default AdminLogin

