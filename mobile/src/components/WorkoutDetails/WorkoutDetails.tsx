import React, { FunctionComponent, useState, useEffect } from 'react'
import { FETCH_WORKOUTS } from '../../redux/requests/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { Query, Mutation } from '@redux-requests/react'
import { fetchWorkouts } from '../../redux/requests/actions'
import axios from 'axios'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Text, TextInput, TouchableOpacity, Button, View } from 'react-native'
import WorkoutsList from '../WorkoutsList/WorkoutsList'

type OwnProps = WorkoutData
type Props = OwnProps

export const WorkoutDetails: FunctionComponent<Props> = () => {
  const route = useRoute()
  const workout: WorkoutData = route.params

  console.log('                 in workoutDetails                 ', workout)
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
        <Text> Length: {'len of workout'} </Text>
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
    </View>
  )
}

export default WorkoutDetails
