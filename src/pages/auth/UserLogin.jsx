import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShell from '../../components/AuthShell'
import { useAuth } from '../../context/AuthContext'

const UserLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const next = new URLSearchParams(location.search).get('next') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login({ type: 'user', email, password })
      navigate(next)
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title='User Login'
      subtitle='Welcome back — access your bookings and profile.'
      footer={
        <div className='flex items-center justify-between'>
          <span>Don&apos;t have an account?</span>
          <Link className='text-primary font-medium hover:underline' to={`/signup?next=${encodeURIComponent(next)}`}>
            Create one
          </Link>
        </div>
      }
    >
      <form onSubmit={onSubmit} className='space-y-4'>
        <div>
          <label className='text-sm text-gray-600'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all'
            placeholder='you@example.com'
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
          Admin?{' '}
          <Link className='text-primary font-medium hover:underline' to={`/admin/login?next=${encodeURIComponent(next)}`}>
            Login here
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}

export default UserLogin

