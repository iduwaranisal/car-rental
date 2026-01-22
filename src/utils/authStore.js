const USERS_KEY = 'auth.users'
const ADMINS_KEY = 'auth.admins'
const SESSION_KEY = 'auth.session'

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function getArray(key) {
  return safeParse(localStorage.getItem(key), [])
}

function setArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr))
}

export function getSession() {
  return safeParse(localStorage.getItem(SESSION_KEY), null)
}

export function setSession(session) {
  if (!session) {
    localStorage.removeItem(SESSION_KEY)
    return
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function signup({ type, name, email, password }) {
  const key = type === 'admin' ? ADMINS_KEY : USERS_KEY
  const list = getArray(key)
  const exists = list.some((u) => String(u.email).toLowerCase() === String(email).toLowerCase())
  if (exists) throw new Error('Email already exists')

  const user = {
    id: `${type}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`,
    type,
    name: name?.trim() || (type === 'admin' ? 'Admin' : 'User'),
    email: email.trim(),
    // NOTE: demo only; replace with real backend auth.
    password,
    createdAt: new Date().toISOString(),
  }

  setArray(key, [user, ...list])
  setSession({ id: user.id, type: user.type, name: user.name, email: user.email })
  return user
}

export function login({ type, email, password }) {
  const key = type === 'admin' ? ADMINS_KEY : USERS_KEY
  const list = getArray(key)
  const user = list.find((u) => String(u.email).toLowerCase() === String(email).toLowerCase())
  if (!user || user.password !== password) throw new Error('Invalid credentials')

  setSession({ id: user.id, type: user.type, name: user.name, email: user.email })
  return user
}

export function logout() {
  setSession(null)
}

