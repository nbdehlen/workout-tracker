import React, { FunctionComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ucFirst } from '../../util/helpers'
import { differenceInMinutes, format, isValid } from 'date-fns'
import { ScreenRoute } from '../../navigation/navigationConstants'
import { Spacer } from '../../util/theme/base'
type OwnProps = {
  workouts: CompleteWorkout[]
}

type Props = OwnProps

export const WorkoutsList: FunctionComponent<Props> = ({ workouts }) => {
  const navigation = useNavigation()

  const workoutDetails = (workout: CompleteWorkout) => {
    navigation.navigate(ScreenRoute.WORKOUT_DETAILS, workout)
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 16 }}>
      {workouts.map((workout) => (
        <View>
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
            {isValid(new Date(workout.end)) &&
              isValid(new Date(workout.start)) && (
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
          <Spacer h={12} />
        </View>
      ))}
    </View>
  )
}

export default WorkoutsList
