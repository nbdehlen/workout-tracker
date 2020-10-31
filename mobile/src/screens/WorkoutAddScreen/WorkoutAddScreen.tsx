import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'
import WorkoutForm from '../../components/WorkoutForm'
import {
  emptyExercise,
  workoutTemplate,
  completeWorkout,
} from '../../api/helpers'

type OwnProps = {}

type Props = OwnProps

const WorkoutAddScreen: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text> Workout Add </Text>
      <WorkoutForm workout={completeWorkout} />
    </View>
  )
}

export default WorkoutAddScreen
