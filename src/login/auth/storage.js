import { Token } from '@/http'

export const setToken = token => Token(token)
export const getToken = () => localStorage.getItem('token')
