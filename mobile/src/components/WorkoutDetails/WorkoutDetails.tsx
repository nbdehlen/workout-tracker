import React, { FunctionComponent, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import { deleteWorkout } from '../../redux/requests/actions'
import { FlexCol, FlexRow, Spacer } from '../../util/theme/base'
import { differenceInMinutes, format, isValid } from 'date-fns'
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
  const [modalVisible, setModalVisible] = useState(null)

  const handleEditWorkout = () => {
    const isEdit = true
    navigation.navigate('workoutEdit', { workout })
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

  const handleModal = (index) => {
    modalVisible === index ? setModalVisible('') : setModalVisible(index)
  }

  let startDate, endDate
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
                  <TouchableOpacity onPress={() => handleModal(i)}>
                    <Text> {modalVisible === i ? 'Close' : 'Details...'} </Text>
                  </TouchableOpacity>
                </FlexRow>

                {/* Not sure why && isn't working here */}
              </FlexRow>
              {i === modalVisible && (
                <FlexCol style={{ justifyContent: 'flex-start' }}>
                  <FlexRow>
                    {exercise.exerciseType ? (
                      <Text>Focus: {ucFirst(exercise.exerciseType)} </Text>
                    ) : null}
                  </FlexRow>

                  {exercise.duration ? (
                    <Text> {exercise.duration} </Text>
                  ) : null}

                  <FlexRow>
                    <Text>Muscles: </Text>
                    {exercise.mainMuscle ? (
                      <Text>
                        {ucFirst(exercise.mainMuscle)}
                        {exercise.secondaryMuscles && ','}
                      </Text>
                    ) : null}

                    {exercise.secondaryMuscles &&
                      exercise.secondaryMuscles.map((muscle, y) => (
                        <Text>
                          {' '}
                          {ucFirst(muscle)}
                          {exercise.secondaryMuscles.length - 1 > y ? ',' : '.'}
                        </Text>
                      ))}
                  </FlexRow>

                  {exercise.compound && <Text>Compound movement</Text>}
                  {exercise.unilateral && <Text>Unilateral</Text>}
                  {exercise.calories && (
                    <Text>Calories burned: {exercise.calories} </Text>
                  )}
                  <Spacer h={4} />
                </FlexCol>
              )}
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
