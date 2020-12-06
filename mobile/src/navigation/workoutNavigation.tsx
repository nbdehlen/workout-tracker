import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WorkoutsScreen from '../screens/WorkoutsScreen'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutAddScreen from '../screens/WorkoutAddScreen'
import WorkoutEditScreen from '../screens/WorkoutEditScreen'

type OwnProps = {}

type Props = OwnProps

const Stack = createStackNavigator()

export const WorkoutNavigation: FunctionComponent<Props> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="workout"
        component={WorkoutsScreen}
        options={{ headerShown: true, title: 'Workout log' }}
      />
      <Stack.Screen
        name="workoutDetails"
        component={WorkoutDetails}
        options={{ headerShown: true, title: 'Workout details' }}
      />
      <Stack.Screen
        name="workoutEdit"
        component={WorkoutEditScreen}
        options={{ headerShown: true, title: 'Edit workout' }}
      />
      <Stack.Screen
        name="workoutAdd"
        component={WorkoutAddScreen}
        options={{ headerShown: true, title: 'Add workout' }}
      />
    </Stack.Navigator>
  )
}

export default WorkoutNavigation
