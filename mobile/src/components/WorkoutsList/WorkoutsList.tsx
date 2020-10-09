// import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  GestureResponderEvent,
} from 'react-native'
// import { View } from 'styled-native-kit'
import { useNavigation } from '@react-navigation/native'

type OwnProps = {
  data: WorkoutData[]
}

type Props = OwnProps

export const WorkoutsList: FunctionComponent<Props> = ({ data }) => {
  const navigation = useNavigation()

  const workoutDetails = (workout: WorkoutData) => {
    navigation.navigate('workoutDetails', workout)
    // navigate in stack to workout details page
    console.log(workout)
  }

  const addWorkout = () => {
    navigation.navigate('workoutAdd')
    // navigate in stack to workout details page
    // console.log(workout)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <TouchableOpacity onPress={addWorkout}>
        <Text> ADD </Text>
      </TouchableOpacity>

      {data.map((workout) => (
        <TouchableOpacity
          key={workout._id}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() => workoutDetails(workout)}
        >
          <View>
            <Text> {workout.type} </Text>
          </View>
          <View>
            <Text> {workout.start} </Text>
          </View>
          {/* use moment or something to display it nicely */}
          <View>
            <Text> {workout.end ? 'calc length of workout' : 'na'} </Text>
          </View>

          {/* {entry.exercises
            ? entry.exercises.map((exercise) => <Text> {exercise} </Text>)
            : null} */}
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default WorkoutsList
