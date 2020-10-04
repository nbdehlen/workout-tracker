import { LOGIN } from './actionTypes'

const initialState = {
  username: '',
  isLoggedIn: false,
  xAccessToken: '',
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('in LOGIN reducer')
      console.log(action.payload)
      return {
        username: action.payload.username,
        isLoggedIn: true,
        xAccessToken: action.payload.accessToken,
      }
    default:
      return state
  }
}

export default authReducer
