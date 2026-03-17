import api from '../axios'

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface User {
  id: number
  email: string
  name: string | null
}

export const login = async (email: string, password: string): Promise<Tokens> => {
  const response = await api.post('/auth/login', { email, password })
  return response.data as Tokens
}

export const register = async (name: string, email: string, password: string): Promise<Tokens> => {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data as Tokens
}

export const refreshTokens = async (refreshToken: string): Promise<Tokens> => {
  const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
  return response.data as Tokens
}

export const logout = async (accessToken: string): Promise<void> => {
  await api.post('/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getMe = async (accessToken: string): Promise<User> => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data as User
}
