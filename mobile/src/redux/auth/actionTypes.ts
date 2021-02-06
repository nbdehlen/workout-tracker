export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'

export type UserState = {
  username: string
  isLoggedIn: boolean
  xAccessToken: string
}

export type UserSignupState = {
  email: string
  username: string
  password: string
}

export type LoginActionType = {
  type: typeof LOGIN
  payload: UserState
}
export type SignupActionType = {
  type: typeof SIGNUP
  payload: UserSignupState
}
export type LogoutActionType = {
  type: typeof LOGOUT
  payload: UserState
}

export type AuthActionTypes = LoginActionType | LogoutActionType
