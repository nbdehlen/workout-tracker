import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WorkoutsScreen from '../screens/WorkoutsScreen'
import WorkoutAddScreen from '../screens/WorkoutAddScreen'
import WorkoutEditScreen from '../screens/WorkoutEditScreen'
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen'
import { ScreenRoute } from './navigationConstants'
import theme from '../util/theme'

type OwnProps = {}

type Props = OwnProps

const Stack = createStackNavigator()

export const WorkoutNavigation: FunctionComponent<Props> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.neutral_1,
        headerStyle: {
          backgroundColor: theme.dark,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          color: theme.gradient.start,
          fontSize: 16,
        },
      }}
      // TODO: hide workout log header?
    >
      <Stack.Screen
        name={ScreenRoute.WORKOUTS}
        component={WorkoutsScreen}
        options={{ headerShown: true, title: 'WORKOUT LOG' }}
      />
      <Stack.Screen
        name={ScreenRoute.WORKOUT_DETAILS}
        component={WorkoutDetailsScreen}
        options={{ headerShown: true, title: 'WORKOUT DETAILS' }}
      />
      <Stack.Screen
        name={ScreenRoute.EDIT_WORKOUT}
        component={WorkoutEditScreen}
        options={{ headerShown: true, title: 'EDIT WORKOUT' }}
      />
      <Stack.Screen
        name={ScreenRoute.ADD_WORKOUT}
        component={WorkoutAddScreen}
        options={{ headerShown: true, title: 'ADD WORKOUT' }}
      />
    </Stack.Navigator>
  )
}

export default WorkoutNavigation
