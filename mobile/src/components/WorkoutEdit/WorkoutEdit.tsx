import React, { FunctionComponent } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

type OwnProps = WorkoutData
type Props = OwnProps

export const WorkoutEdit: FunctionComponent<Props> = () => {
  const route = useRoute()
  console.log('route.params', route.params)
  const workout: WorkoutData = route.params
  //add screens and stack for add and edit in stack navigation
  // or navigate inside workoutDetails?

  return (
    <View>
      <View>
        <Text> Type: {workout.type} </Text>
      </View>
      <View>
        <Text> Start: {workout.start} </Text>
      </View>
      <View>
        <Text> End: {workout.end} </Text>
      </View>
      <View>
        <Text> Length: len of workout </Text>
      </View>
      <View>
        <Text> {workout.grade} </Text>
      </View>
      <View>
        {workout.exercises
          ? workout.exercises.map((exercise) => (
              <View>
                <Text> {exercise.name} </Text>
                <Text> {exercise.name} </Text>
                <Text> {exercise.exerciseType} </Text>
                <Text> {exercise.compound} </Text>
                <Text> {exercise.duration} </Text>
                <Text> {exercise.mainMuscle} </Text>
                <Text> {exercise.secondaryMuscles} </Text>

                {exercise.sets.map((set) => (
                  <View>
                    <Text> {set.weight} </Text>
                    <Text> {set.reps} </Text>
                    <Text> {set.rest} </Text>
                    <Text> {set.time} </Text>
                  </View>
                ))}
                <Text> {exercise.tool} </Text>
                <Text> {exercise.unilateral} </Text>
                <Text> {exercise.calories} </Text>
              </View>
            ))
          : null}
      </View>
    </View>
  )
}

export default WorkoutEdit
