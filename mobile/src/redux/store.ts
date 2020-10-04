import { createStore } from 'redux'
import rootReducer from './rootReducer'
import Reactotron from '../ReactotronConfig'
// import Reactotron from 'reactotron-react-native'

export const store = createStore(rootReducer, Reactotron.createEnhancer())

export default store
