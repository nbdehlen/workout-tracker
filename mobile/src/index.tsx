import React, { FunctionComponent } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-gesture-handler'
import configureStore, { persistor } from './redux/store'
import App from './App'
import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))

const store = configureStore()

type Props = {}

const AppWrapper: FunctionComponent<Props> = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* onBeforeLift={this.onBeforeLift}> */}
        <App />
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper
