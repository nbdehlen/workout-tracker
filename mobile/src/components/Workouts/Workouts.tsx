import React, { FunctionComponent, useState, useEffect } from 'react'
import { FETCH_WORKOUTS } from '../../redux/requests/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { Query, Mutation } from '@redux-requests/react'
import { fetchWorkouts } from '../../redux/requests/actions'
import { Text, TouchableOpacity } from 'react-native'
import WorkoutsList from '../WorkoutsList/WorkoutsList'
import { useNavigation } from '@react-navigation/native'

type OwnProps = {}

type Props = OwnProps

const RequestError = () => (
  //replace with global component
  <Text>There was some error during fetching. Please try again.</Text>
)

export const Workouts: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log(user.xAccessToken)
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(fetchWorkouts(user.xAccessToken))
  }, [])

  const addWorkout = () => {
    navigation.navigate('workoutAdd')
    // navigate in stack to workout details page
    // console.log(workout)
  }
  return (
    <>
      <TouchableOpacity onPress={addWorkout}>
        <Text> ADD </Text>
      </TouchableOpacity>

      <Query
        type={FETCH_WORKOUTS}
        errorComponent={RequestError}
        noDataMessage={<Text>There is no entity currently.</Text>}
      >
        {({ data }) => <WorkoutsList workouts={data} />}
      </Query>
    </>
  )
}

export default Workouts
