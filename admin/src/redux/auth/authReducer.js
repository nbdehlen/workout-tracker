import { LOGIN } from "./actionTypes"

const initialState = {
  username: "",
  isLoggedIn: false,
  xAccessToken: "",
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.payload.username,
        isLoggedIn: true,
        xAccessToken: action.payload.xAccessToken,
        roles: action.payload.roles,
      }
    default:
      return state
  }
}

export default authReducer
