import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({ user: authReducer })

export default rootReducer
