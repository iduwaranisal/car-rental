import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSession, login as storeLogin, logout as storeLogout, signup as storeSignup } from '../utils/authStore'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [session, setSessionState] = useState(null)

  useEffect(() => {
    setSessionState(getSession())
  }, [])

  const value = useMemo(() => {
    return {
      session,
      isLoggedIn: !!session,
      isAdmin: session?.type === 'admin',
      isUser: session?.type === 'user',
      login: (payload) => {
        const u = storeLogin(payload)
        setSessionState(getSession())
        return u
      },
      signup: (payload) => {
        const u = storeSignup(payload)
        setSessionState(getSession())
        return u
      },
      logout: () => {
        storeLogout()
        setSessionState(getSession())
      },
    }
  }, [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

