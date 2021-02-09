import React, { FunctionComponent, useLayoutEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import * as B from '../../util/theme/base'
import { differenceInMinutes, format, isValid } from 'date-fns'
import { calculcateTotalSets, ucFirst } from '../../util/helpers'
import { ScreenRoute } from '../../navigation/navigationConstants'
import DataTable from '../../components/DataTable'
import * as S from './styled'
import theme from '../../util/theme'
import ExerciseTable from './ExerciseTable'
import CustomButton from '../../components/atoms/CustomButton'

type OwnProps = CompleteWorkout
type Props = OwnProps

export const WorkoutDetailsScreen: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const workout: CompleteWorkout = route.params
  const [modalVisible, setModalVisible] = useState(null)

  const handleEditWorkout = () => {
    navigation.navigate(ScreenRoute.EDIT_WORKOUT, { workout })
  }

  const handleModal = (index) => {
    modalVisible === index ? setModalVisible('') : setModalVisible(index)
  }

  let startDate, endDate
  isValid(new Date(workout.start)) && (startDate = new Date(workout.start))
  isValid(new Date(workout.end)) && (endDate = new Date(workout.end))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <S.TouchableOpacity onPress={handleEditWorkout}>
          <S.Text>EDIT</S.Text>
        </S.TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <ScrollView style={{ backgroundColor: theme.background.color }}>
      <B.BaseContainer>
        <B.Text
          style={{
            paddingLeft: 2,
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.primary.onColor,
          }}
        >
          GENERAL INFO
        </B.Text>
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 20,
            borderWidth: 1,
            borderColor: theme.primary.weaker,
            borderRadius: 16,
          }}
        >
          <B.FlexRow
            style={{
              borderBottomWidth: 1,
              borderColor: theme.primary.weaker,
            }}
          >
            {workout.type && (
              <B.FlexRow>
                <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                  Workout type: {ucFirst(workout.type)}{' '}
                </B.Text>
              </B.FlexRow>
            )}
            <B.FlexRow>
              <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                Sets: {calculcateTotalSets(workout)}{' '}
              </B.Text>
            </B.FlexRow>
          </B.FlexRow>

          <B.Spacer h={4} />
          <B.FlexRow
            style={{
              borderBottomWidth: 1,
              borderColor: theme.primary.weaker,
            }}
          >
            <B.FlexRow>
              <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                Grade: {workout.grade}/10
              </B.Text>
            </B.FlexRow>

            {startDate && endDate && (
              <B.FlexRow>
                <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                  Duration: {differenceInMinutes(endDate, startDate)} min
                </B.Text>
              </B.FlexRow>
            )}
          </B.FlexRow>

          <B.Spacer h={4} />
          <B.FlexRow
            style={{
              borderBottomWidth: 1,
              borderColor: theme.primary.weaker,
            }}
          >
            {startDate && (
              <B.FlexRow>
                <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                  Start: {format(startDate, 'dd MMM yy HH:mm')}
                </B.Text>
              </B.FlexRow>
            )}

            {endDate && (
              <B.FlexRow>
                <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                  End: {format(endDate, 'dd MMM yy HH:mm')}
                </B.Text>
              </B.FlexRow>
            )}
          </B.FlexRow>
        </View>
        <View>
          {workout.exercises &&
            workout.exercises.map((exercise, i) => (
              <View key={exercise + String(i)}>
                <B.Spacer h={24} />
                <B.FlexRow
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  <B.Text
                    style={{
                      paddingLeft: 2,
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: theme.primary.onColor,
                    }}
                  >
                    {exercise.tool.toUpperCase()} {exercise.name.toUpperCase()}
                  </B.Text>
                  <B.Spacer w={8} />
                  <CustomButton
                    title="details..."
                    variant="details"
                    width={72}
                    onPress={() => handleModal(i)}
                  />
                </B.FlexRow>
                <B.Spacer h={2} />
                <Modal
                  visible={i === modalVisible}
                  transparent={true}
                  animationType="slide"
                >
                  <TouchableOpacity
                    onPress={() => handleModal(i)}
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.darkWeaker,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: 300,
                        height: 200,
                        borderRadius: 8,
                        padding: 16,
                        backgroundColor: theme.primary.color,
                        elevation: 5,
                      }}
                    >
                      <B.Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        {ucFirst(exercise.tool)} {exercise.name} details
                      </B.Text>
                      {exercise.exerciseType ? (
                        <View style={{ flexDirection: 'row' }}>
                          <B.Text>
                            Focus: {ucFirst(exercise.exerciseType)}{' '}
                          </B.Text>
                        </View>
                      ) : null}

                      {exercise.duration ? (
                        <B.Text>Duration: {exercise.duration} min</B.Text>
                      ) : null}

                      {exercise.calories ? (
                        <B.Text>Calories burned: {exercise.calories} </B.Text>
                      ) : null}
                      <View style={{ flexDirection: 'row' }}>
                        {(exercise.secondaryMuscles[0].length > 0 ||
                          exercise.mainMuscle.length > 0) && (
                          <B.Text>Muscles: </B.Text>
                        )}
                        {exercise.mainMuscle.length > 0 ? (
                          <B.Text>
                            {ucFirst(String(exercise.mainMuscle))}
                            {exercise.secondaryMuscles && ','}
                          </B.Text>
                        ) : null}

                        {exercise.secondaryMuscles[0].length > 0 &&
                          exercise.secondaryMuscles.map((muscle, y) => (
                            <View key={JSON.stringify(muscle + String(y))}>
                              <B.Text>
                                {' '}
                                {ucFirst(String(muscle))}
                                {exercise.secondaryMuscles.length - 1 > y
                                  ? ','
                                  : '.'}
                              </B.Text>
                            </View>
                          ))}
                      </View>

                      {exercise.compound && <B.Text>Compound movement</B.Text>}
                      {exercise.unilateral && (
                        <B.Text>Unilateral movement</B.Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </Modal>
                {/* <DataTable data={exercise.sets} /> */}
                <ExerciseTable
                  data={exercise.sets}
                  headers={['WEIGHT', 'REPS', 'REST', 'TIME']}
                />
              </View>
            ))}
        </View>
      </B.BaseContainer>
    </ScrollView>
  )
}

export default WorkoutDetailsScreen
