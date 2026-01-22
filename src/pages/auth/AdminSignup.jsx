import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthShell from '../../components/AuthShell'
import { useAuth } from '../../context/AuthContext'

const AdminSignup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const next = new URLSearchParams(location.search).get('next') || '/owner'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      signup({ type: 'admin', name, email, password })
      navigate(next)
    } catch (err) {
      setError(err?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title='Create admin account'
      subtitle='This is a demo-only admin signup (stored locally).'
      footer={
        <div className='flex items-center justify-between'>
          <span>Already an admin?</span>
          <Link className='text-primary font-medium hover:underline' to={`/admin/login?next=${encodeURIComponent(next)}`}>
            Login
          </Link>
        </div>
      }
    >
      <form onSubmit={onSubmit} className='space-y-4'>
        <div>
          <label className='text-sm text-gray-600'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='mt-1.5 w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all'
            placeholder='Admin name'
            required
          />
        </div>
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
            placeholder='Min 6 chars (demo)'
            minLength={6}
            required
          />
        </div>

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button
          disabled={loading}
          className='w-full px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold shadow-md shadow-primary/20 disabled:opacity-60 transition-all'
        >
          {loading ? 'Creating…' : 'Create admin'}
        </button>
      </form>
    </AuthShell>
  )
}

export default AdminSignup

