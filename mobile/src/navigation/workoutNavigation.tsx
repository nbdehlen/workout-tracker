import React, { FunctionComponent } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WorkoutsScreen from '../screens/WorkoutsScreen'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutEdit from '../components/WorkoutEdit'
import WorkoutForm from '../components/WorkoutForm/WorkoutForm'
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="workoutDetails"
        component={WorkoutDetails}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="workoutEdit"
        component={WorkoutEditScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="workoutAdd"
        component={WorkoutAddScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}

export default WorkoutNavigation
