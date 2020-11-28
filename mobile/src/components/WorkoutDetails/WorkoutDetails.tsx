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
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { deleteWorkout } from '../../redux/requests/actions'
import { FlexCol, FlexRow, Spacer } from '../../util/theme/base'
import { differenceInMinutes, format, isValid, parseISO } from 'date-fns'
import { ucFirst } from '../../util/helpers'
import DataTable from './DataTable'

type OwnProps = CompleteWorkout
type Props = OwnProps

export const WorkoutDetails: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log('route.params', route.params)
  const workout: CompleteWorkout = route.params

  //add screens and stack for add and edit in stack navigation
  // or navigate inside workoutDetails?

  const handleEditWorkout = () => {
    const isEdit = true
    navigation.navigate('workoutEdit', { workout })
    // navigate in stack to workout details page
    console.log(workout)
  }

  const handleDeleteWorkout = () => {
    dispatch(deleteWorkout(workout._id, user.xAccessToken))
  }

  const calculcateTotalSets = () => {
    let count = 0
    workout.exercises.forEach((exercise) => {
      count += exercise.sets.length
    })
    return count
  }

  let startDate
  let endDate
  isValid(new Date(workout.start)) && (startDate = new Date(workout.start))
  isValid(new Date(workout.end)) && (endDate = new Date(workout.end))

  return (
    <ScrollView>
      <TouchableOpacity onPress={handleEditWorkout}>
        <Text>EDIT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDeleteWorkout}>
        <Text>Delete</Text>
      </TouchableOpacity>

      <FlexRow>
        {/* style={{ justifyContent: 'center' }} */}
        <View style={{ flex: 1 }}>
          <Text>Workout Type: {workout.type} </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Sets: {calculcateTotalSets()} </Text>
        </View>
      </FlexRow>

      <FlexRow>
        <View style={{ flex: 1 }}>
          <Text>Grade: {workout.grade}/10</Text>
        </View>

        {startDate && endDate && (
          <View style={{ flex: 1 }}>
            <Text>Duration: {differenceInMinutes(endDate, startDate)} min</Text>
          </View>
        )}
      </FlexRow>

      <FlexRow>
        {isValid(new Date(workout.start)) && (
          <View style={{ flex: 1 }}>
            <Text>
              Start: {format(new Date(workout.start), 'HH:mm do MMM yy')}
            </Text>
          </View>
        )}

        {isValid(new Date(workout.end)) && (
          <View style={{ flex: 1 }}>
            <Text>End: {format(new Date(workout.end), 'HH:mm do MMM yy')}</Text>
          </View>
        )}
      </FlexRow>
      {/* Dropdown for all exercise details like Barbell row ^ */}
      <Spacer h={16} />
      <View>
        {workout.exercises
          ? workout.exercises.map((exercise, i) => (
              <View key={exercise + String(i)}>
                <FlexRow>
                  <FlexCol>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                      {ucFirst(exercise.tool)} {exercise.name}
                    </Text>
                  </FlexCol>
                  <FlexCol>
                    <Text> Focus: {ucFirst(exercise.exerciseType)} </Text>
                  </FlexCol>
                </FlexRow>
                {/* <Text> {exercise.compound} </Text> */}
                <FlexRow>
                  <Text> {exercise.duration} </Text>
                  <Text>{ucFirst(exercise.mainMuscle)}</Text>
                  {exercise.secondaryMuscles.map((muscle) => (
                    <Text> {ucFirst(muscle)}</Text>
                  ))}
                </FlexRow>
                <FlexRow>
                  <DataTable data={exercise.sets} />
                </FlexRow>
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
