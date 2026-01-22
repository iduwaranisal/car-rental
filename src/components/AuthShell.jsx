import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="inline-block">
            <img src={assets.logo} alt="LankaRide" className="h-9 hover:opacity-90 transition-opacity" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-slate-500 text-sm mt-1.5">{subtitle}</p>}
          </div>

          {children}

          {footer && (
            <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600">{footer}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthShell
