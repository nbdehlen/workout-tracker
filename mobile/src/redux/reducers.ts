import AsyncStorage from '@react-native-community/async-storage'
import { persistCombineReducers } from 'redux-persist'
import { miscReducer, MiscState } from './misc'
import { requestsReducer, RequestsState } from './requests/reducer'

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['user', 'filters', 'developer'],
}

export type MainState = {
    misc: MiscState
    requests: RequestsState
}

export default persistCombineReducers<MainState>(persistConfig, {
    misc: miscReducer as any,
    requests: requestsReducer,
})

// Consider doing this from scratch

