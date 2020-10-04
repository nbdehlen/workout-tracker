import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { navigationRef } from './util/navigationService'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'

declare const global: { HermesInternal: null | {} }

type OwnProps = {}
type Props = OwnProps

const Tab = createBottomTabNavigator()

const App: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={WelcomeScreen} />
          {/* <Tab.Screen name="Login" component={LoginNavigation} /> */}
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}

export default App
