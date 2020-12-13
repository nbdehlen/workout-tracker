import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WorkoutsScreen from '../screens/WorkoutsScreen'
import WorkoutAddScreen from '../screens/WorkoutAddScreen'
import WorkoutEditScreen from '../screens/WorkoutEditScreen'
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen'
import { ScreenRoute } from './navigationConstants'
type OwnProps = {}

type Props = OwnProps

const Stack = createStackNavigator()

export const WorkoutNavigation: FunctionComponent<Props> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name={ScreenRoute.WORKOUTS}
        component={WorkoutsScreen}
        options={{ headerShown: true, title: 'Workout log' }}
      />
      <Stack.Screen
        name={ScreenRoute.WORKOUT_DETAILS}
        component={WorkoutDetailsScreen}
        options={{ headerShown: true, title: 'Workout details' }}
      />
      <Stack.Screen
        name={ScreenRoute.EDIT_WORKOUT}
        component={WorkoutEditScreen}
        options={{ headerShown: true, title: 'Edit workout' }}
      />
      <Stack.Screen
        name={ScreenRoute.ADD_WORKOUT}
        component={WorkoutAddScreen}
        options={{ headerShown: true, title: 'Add workout' }}
      />
    </Stack.Navigator>
  )
}

export default WorkoutNavigation
