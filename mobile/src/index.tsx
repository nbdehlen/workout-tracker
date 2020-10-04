import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-gesture-handler'
import { store, persistor } from './redux/store'
import App from './App'

type Props = {}

class AppWrapper extends Component<Props> {
  // onBeforeLift() {
  // change things such as language before app loads
  // }

  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate persistor={persistor} onBeforeLift={this.onBeforeLift}> */}
        <App />
        {/* </PersistGate> */}
      </Provider>
    )
  }
}

export default AppWrapper
