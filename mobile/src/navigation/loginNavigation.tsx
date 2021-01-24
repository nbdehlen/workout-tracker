import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import { ScreenRoute } from './navigationConstants'

type OwnProps = {}

type Props = OwnProps

const Stack = createStackNavigator()

export const LoginNavigation: FunctionComponent<Props> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenRoute.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ScreenRoute.SIGNUP} component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default LoginNavigation
