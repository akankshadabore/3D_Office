const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  }
}

export async function login(email, password) {

  console.log('API: Logging in with', email)

  return {
    user: { id: 'u1', name: email.split('@')[0], email },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  }
}

export async function get(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: getHeaders(),
  })
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`)
  return res.json()
}

export async function post(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${endpoint} failed: ${res.status}`)
  return res.json()
}
