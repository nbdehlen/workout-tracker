import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  UserSignupState,
  UserState,
} from './actionTypes'

export const login = (data: UserState) => ({
  type: LOGIN,
  payload: data,
})

export const logout = () => ({
  type: LOGOUT,
})

export const signup = (data: UserSignupState) => ({
  type: SIGNUP,
  payload: data,
})
