import React, { FunctionComponent, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, TextInput, TouchableOpacity, Button, View, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

type OwnProps = WorkoutData
type Props = OwnProps

export const WorkoutDetails: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const workout: WorkoutData = route.params

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
                <Text> {exercise.length} </Text>
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
    </ScrollView>
  )
}

export default WorkoutDetails
