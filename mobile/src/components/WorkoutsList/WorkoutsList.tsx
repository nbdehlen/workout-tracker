import React, { FunctionComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ucFirst } from '../../util/helpers'
import { differenceInMinutes, format, isValid } from 'date-fns'

type OwnProps = {
  workouts: CompleteWorkout[]
}

type Props = OwnProps

export const WorkoutsList: FunctionComponent<Props> = ({ workouts }) => {
  const navigation = useNavigation()

  const workoutDetails = (workout: CompleteWorkout) => {
    navigation.navigate('workoutDetails', workout)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {workouts.map((workout) => (
        <TouchableOpacity
          key={workout._id}
          style={{ flex: 1, flexDirection: 'row' }}
          onPress={() => workoutDetails(workout)}
        >
          {isValid(new Date(workout.start)) && (
            <View>
              <Text>{format(new Date(workout.start), 'do MMM')} </Text>
            </View>
          )}

          <View>
            <Text>{ucFirst(workout.type)} </Text>
          </View>

          {isValid(new Date(workout.end)) && isValid(new Date(workout.start)) && (
            <View>
              <Text>
                {differenceInMinutes(
                  new Date(workout.end),
                  new Date(workout.start)
                )}
                min
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default WorkoutsList
