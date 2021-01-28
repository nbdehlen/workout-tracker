import React, { FunctionComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ucFirst } from '../../util/helpers'
import { differenceInMinutes, format, isValid } from 'date-fns'
import { ScreenRoute } from '../../navigation/navigationConstants'
import { BaseContainer, Spacer } from '../../util/theme/base'
import theme from '../../util/theme'
import * as S from './styled'
import WorkoutIcon from '../../screens/WorkoutsScreen/utils/WorkoutIcon'

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
    <BaseContainer style={{ flex: 1, flexDirection: 'column', padding: 16 }}>
      {workouts.map((workout) => (
        <>
          <View
            style={{
              padding: 16,
              borderRadius: 16,
              backgroundColor: theme.primary.color,
            }}
          >
            <TouchableOpacity
              key={workout._id}
              style={{ flex: 1, flexDirection: 'column' }}
              onPress={() => workoutDetails(workout)}
            >
              {isValid(new Date(workout.start)) && (
                <View
                  style={{
                    width: '100%',
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderBottomWidth: 1,
                  }}
                >
                  <S.Text>{format(new Date(workout.start), 'MMMM dd')} </S.Text>
                </View>
              )}
              <Spacer h={4} />
              <View>
                <S.Text>{ucFirst(workout.type)} </S.Text>

                <WorkoutIcon workoutType={workout.type} />
              </View>
              {isValid(new Date(workout.end)) &&
                isValid(new Date(workout.start)) && (
                  <View>
                    <S.Text>
                      {differenceInMinutes(
                        new Date(workout.end),
                        new Date(workout.start)
                      )}
                      min
                    </S.Text>
                  </View>
                )}
            </TouchableOpacity>
          </View>
          <Spacer h={12} />
        </>
      ))}
    </BaseContainer>
  )
}

export default WorkoutsList
