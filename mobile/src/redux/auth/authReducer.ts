import { Reducer } from 'redux'
import { AuthActionTypes, LOGIN, LOGOUT, UserState } from './actionTypes'

const initialState: UserState = {
  username: '',
  isLoggedIn: false,
  xAccessToken: '',
}

// TODO: SIGNUP? get rid of any here
const authReducer: Reducer<UserState, AuthActionTypes | any> = (
  state: UserState = initialState,
  action: AuthActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.payload.username,
        isLoggedIn: true,
        xAccessToken: action.payload.xAccessToken,
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default authReducer
