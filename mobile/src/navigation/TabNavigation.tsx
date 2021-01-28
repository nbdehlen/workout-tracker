import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import WelcomeScreen from '../screens/WelcomeScreen'
import WorkoutNavigation from './workoutNavigation'
import React, { FunctionComponent } from 'react'
import SettingsScreen from '../screens/SettingsScreen'
import { Icons } from '../assets'
import { ScreenRoute, StackRoute } from './navigationConstants'
import WorkoutAddScreen from '../screens/WorkoutAddScreen'
import theme from '../util/theme'

type OwnProps = {}

type Props = OwnProps

export const TabNavigation: FunctionComponent<Props> = ({}) => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === ScreenRoute.ADD_WORKOUT) {
            return focused ? (
              <Icons.Add fill={theme.gradient.start} height="32" width="32" />
            ) : (
              <Icons.Add fill={theme.neutral_1} height="32" width="32" />
            )
          } else if (route.name === ScreenRoute.SETTINGS) {
            return focused ? (
              <Icons.Settings
                fill={theme.gradient.start}
                height="28"
                width="28"
              />
            ) : (
              <Icons.Settings fill={theme.neutral_1} height="28" width="28" />
            )
          } else if (route.name === StackRoute.WORKOUT) {
            return focused ? (
              <Icons.List fill={theme.gradient.start} height="32" width="32" />
            ) : (
              <Icons.List fill={theme.neutral_1} height="32" width="32" />
            )
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          height: 53,
          backgroundColor: theme.dark,
          paddingTop: 6,
          paddingBottom: 2,
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 13,
        },
        inactiveTintColor: theme.neutral_1,
        activeTintColor: theme.primary.onColor,
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
