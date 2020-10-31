import React, { FunctionComponent, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from '@react-navigation/native'
import {
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
  Switch,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

type OwnProps = CompleteWorkout
type Props = OwnProps

export const WorkoutDetails: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const workout: CompleteWorkout = route.params
  console.log('route.params', route.params)

  //add screens and stack for add and edit in stack navigation
  // or navigate inside workoutDetails?

  const addWorkoutHandler = () => {}

  const editWorkout = () => {
    navigation.navigate('workoutEdit', workout)
    // navigate in stack to workout details page
    console.log(workout)
  }

  return (
    <ScrollView>
      <TouchableOpacity onPress={editWorkout}>
        <Text>EDIT</Text>
      </TouchableOpacity>
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
          ? workout.exercises.map((exercise, i) => (
              <View key={JSON.stringify(exercise + String(i))}>
                <Text>
                  Exercise {i + 1}: {exercise.name}
                </Text>
                <Text> {exercise.exerciseType} </Text>
                <Text> {exercise.compound} </Text>
                <Text> {exercise.duration} </Text>
                <Text> {exercise.mainMuscle} </Text>
                <Text> {exercise.secondaryMuscles} </Text>

                {exercise.sets.map((set) => (
                  <View key={uuidv4()}>
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
    </ScrollView>
  )
}

export default WorkoutDetails
