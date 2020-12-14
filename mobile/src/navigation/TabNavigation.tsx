import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import WelcomeScreen from '../screens/WelcomeScreen'
import { navigationRef } from '../util/navigationService'
import LoginNavigation from './loginNavigation'
import WorkoutNavigation from './workoutNavigation'
import React, { FunctionComponent } from 'react'
import SettingsScreen from '../screens/SettingsScreen'
import { Icons } from '../assets'
import WorkoutsScreen from '../screens/WorkoutsScreen'
import { ScreenRoute, StackRoute } from './navigationConstants'
import WorkoutAddScreen from '../screens/WorkoutAddScreen'

type OwnProps = {}

type Props = OwnProps

export const TabNavigation: FunctionComponent<Props> = ({}) => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // let iconName

          // iconName = focused
          //   ? console.log(iconName, focused)
          //   : console.log(iconName, focused)

          if (route.name === ScreenRoute.ADD_WORKOUT) {
            return focused ? (
              <Icons.Add fill="#007bff" height="32" width="32" />
            ) : (
              <Icons.Add fill="grey" height="32" width="32" />
            )
          } else if (route.name === ScreenRoute.SETTINGS) {
            return focused ? (
              <Icons.Settings fill="#007bff" height="28" width="28" />
            ) : (
              <Icons.Settings fill="grey" height="28" width="28" />
            )
          } else if (route.name === StackRoute.WORKOUT) {
            return focused ? (
              <Icons.List fill="#007bff" height="32" width="32" />
            ) : (
              <Icons.List fill="grey" height="32" width="32" />
            )
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name={ScreenRoute.WELCOME}
        component={WelcomeScreen}
        options={{ title: 'Welcome' }}
      />
      <Tab.Screen
        name={ScreenRoute.ADD_WORKOUT}
        component={WorkoutAddScreen}
        options={{ title: 'Workout' }}
      />
      {/* <Tab.Screen
        name={StackRoute.AUTH}
        component={LoginNavigation}
        options={{ title: 'Login' }}
      /> */}
      <Tab.Screen
        name={StackRoute.WORKOUT}
        component={WorkoutNavigation}
        options={{ title: 'Workouts' }}
      />
      <Tab.Screen
        name={ScreenRoute.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  )
}
