import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { calculcateTotalSets } from '../../util/helpers'
import { differenceInMinutes, format, isValid } from 'date-fns'
import { ScreenRoute } from '../../navigation/navigationConstants'
import { Spacer } from '../../util/theme/base'
import * as S from './styled'
import WorkoutIcon from '../../screens/WorkoutsScreen/utils/WorkoutIcon'
import * as B from '../../util/theme/base'

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
    <S.BaseContainer>
      {workouts.map((workout) => (
        <View key={workout._id}>
          <S.CardView>
            <S.CardTouchable onPress={() => workoutDetails(workout)}>
              {isValid(new Date(workout.start)) && (
                <S.DateHeaderView>
                  <S.Text>{format(new Date(workout.start), 'MMMM dd')} </S.Text>
                </S.DateHeaderView>
              )}
              <Spacer h={4} />
              <B.FlexRow>
                <S.CardColOne>
                  <WorkoutIcon workoutType={workout.type} />
                </S.CardColOne>
                <S.CardColTwo>
                  <S.Text>
                    <S.HiglightText>
                      {calculcateTotalSets(workout)}
                    </S.HiglightText>{' '}
                    Sets
                  </S.Text>
                </S.CardColTwo>
                <S.CardColThree>
                  {isValid(new Date(workout.end)) &&
                    isValid(new Date(workout.start)) && (
                      <S.Text>
                        <S.HiglightText>
                          {differenceInMinutes(
                            new Date(workout.end),
                            new Date(workout.start)
                          )}
                        </S.HiglightText>{' '}
                        Min
                      </S.Text>
                    )}
                </S.CardColThree>
              </B.FlexRow>
            </S.CardTouchable>
          </S.CardView>
          <Spacer h={12} />
        </View>
      ))}
    </S.BaseContainer>
  )
}

export default WorkoutsList
