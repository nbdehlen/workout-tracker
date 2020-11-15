import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { navigationRef } from '../util/navigationService'
import LoginNavigation from './loginNavigation'
import WorkoutNavigation from './workoutNavigation'
import React, { FunctionComponent } from 'react'
import SettingsScreen from '../screens/SettingsScreen'

type OwnProps = {}

type Props = OwnProps

export const TabNavigation: FunctionComponent<Props> = ({}) => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WelcomeScreen} />
      <Tab.Screen name="Login" component={LoginNavigation} />
      <Tab.Screen name="Workout" component={WorkoutNavigation} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
