import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

type OwnProps = {}

type Props = OwnProps

const Stack = createStackNavigator()

export const LoginNavigation: FunctionComponent<Props> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: true, title: 'Login' }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ headerShown: true, title: 'Signup' }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigation
