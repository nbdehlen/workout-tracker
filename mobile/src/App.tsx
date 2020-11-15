import React, { FunctionComponent, useEffect, useState } from 'react'
import { View } from 'react-native'
import { navigationRef } from './util/navigationService'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WelcomeScreen from './screens/WelcomeScreen'
import loginNavigation from './navigation/loginNavigation'
import workoutNavigation from './navigation/workoutNavigation'
import { Navigation } from './navigation/Navigation'

declare const global: { HermesInternal: null | {} }

type OwnProps = {}
type Props = OwnProps

// const Tab = createBottomTabNavigator()

const App: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <NavigationContainer ref={navigationRef}>
        <Navigation />
      </NavigationContainer>
    </View>
  )
}

export default App
