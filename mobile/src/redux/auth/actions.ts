import { LOGIN, LOGOUT, SIGNUP } from './actionTypes'

export const login = (data) => ({
  type: LOGIN,
  payload: data,
})

export const logout = () => ({
  type: LOGOUT,
})

export const signup = (data) => ({
  type: SIGNUP,
  payload: data,
})
