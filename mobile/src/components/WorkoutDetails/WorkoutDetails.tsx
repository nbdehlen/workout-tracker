import React, { FunctionComponent, useLayoutEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { deleteWorkout } from '../../redux/requests/actions'
import { FlexRow, Spacer } from '../../util/theme/base'
import { differenceInMinutes, format, isValid } from 'date-fns'
import { ucFirst } from '../../util/helpers'
import DataTable from './DataTable'

type OwnProps = CompleteWorkout
type Props = OwnProps

export const WorkoutDetails: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector((state) => state.user)
  console.log('route.params', route.params)
  const workout: CompleteWorkout = route.params
  const [modalVisible, setModalVisible] = useState(null)

  const handleEditWorkout = () => {
    navigation.navigate('workoutEdit', { workout })
  }

  const calculcateTotalSets = () => {
    let count = 0
    workout.exercises.forEach((exercise) => {
      count += exercise.sets.length
    })
    return count
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
        <TouchableOpacity onPress={handleEditWorkout}>
          <Text>EDIT</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <ScrollView>
      <FlexRow>
        {workout.type && (
          <FlexRow>
            <Text>Workout type: {ucFirst(workout.type)} </Text>
          </FlexRow>
        )}

        <FlexRow>
          <Text>Sets: {calculcateTotalSets()} </Text>
        </FlexRow>
      </FlexRow>

      <FlexRow>
        <FlexRow>
          <Text>Grade: {workout.grade}/10</Text>
        </FlexRow>

        {startDate && endDate && (
          <FlexRow>
            <Text>Duration: {differenceInMinutes(endDate, startDate)} min</Text>
          </FlexRow>
        )}
      </FlexRow>

      <FlexRow>
        {startDate && (
          <FlexRow>
            <Text>Start: {format(startDate, 'HH:mm do MMM yy')}</Text>
          </FlexRow>
        )}

        {endDate && (
          <FlexRow>
            <Text>End: {format(endDate, 'HH:mm do MMM yy')}</Text>
          </FlexRow>
        )}
      </FlexRow>
      <Spacer h={8} />
      <View>
        {workout.exercises &&
          workout.exercises.map((exercise, i) => (
            <View key={exercise + String(i)}>
              <FlexRow>
                <FlexRow style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {ucFirst(exercise.tool)} {exercise.name}
                  </Text>
                  <Spacer w={8} />
                  <TouchableOpacity
                    onPress={() => handleModal(i)}
                    style={{
                      borderRadius: 8,
                      borderColor: 'black',
                      paddingHorizontal: 4,
                      borderWidth: 1,
                    }}
                  >
                    <Text>details...</Text>
                  </TouchableOpacity>
                </FlexRow>

                {/* Not sure why && isn't working here */}
              </FlexRow>
              {/* {i === modalVisible && ( */}
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
                    backgroundColor: 'rgba(255,255,255,0.6)',
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
                      backgroundColor: '#f1eeee',
                      elevation: 5,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                      {ucFirst(exercise.tool)} {exercise.name} details
                    </Text>
                    {exercise.exerciseType ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Text>Focus: {ucFirst(exercise.exerciseType)} </Text>
                      </View>
                    ) : null}

                    {exercise.duration ? (
                      <Text>Duration: {exercise.duration} min</Text>
                    ) : null}

                    {exercise.calories ? (
                      <Text>Calories burned: {exercise.calories} </Text>
                    ) : null}
                    <View style={{ flexDirection: 'row' }}>
                      {(exercise.secondaryMuscles[0].length > 0 ||
                        exercise.mainMuscle.length > 0) && (
                        <Text>Muscles: </Text>
                      )}
                      {exercise.mainMuscle.length > 0 ? (
                        <Text>
                          {ucFirst(exercise.mainMuscle)}
                          {exercise.secondaryMuscles && ','}
                        </Text>
                      ) : null}

                      {exercise.secondaryMuscles[0].length > 0 &&
                        exercise.secondaryMuscles.map((muscle, y) => (
                          <View key={JSON.stringify(muscle + String(y))}>
                            <Text>
                              {' '}
                              {ucFirst(muscle)}
                              {exercise.secondaryMuscles.length - 1 > y
                                ? ','
                                : '.'}
                            </Text>
                          </View>
                        ))}
                    </View>

                    {exercise.compound && <Text>Compound movement</Text>}
                    {exercise.unilateral && <Text>Unilateral movement</Text>}
                  </View>
                </TouchableOpacity>
              </Modal>
              <FlexRow>
                <DataTable data={exercise.sets} />
              </FlexRow>
              <Spacer h={4} />
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

export default WorkoutDetails
