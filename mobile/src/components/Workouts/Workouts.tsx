import React, { FunctionComponent, useState, useEffect } from 'react'
import { FETCH_WORKOUTS } from '../../redux/requests/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorkouts } from '../../redux/requests/actions'
import { Text } from 'react-native'
import WorkoutsList from '../WorkoutsList/WorkoutsList'
import { getQuerySelector } from '@redux-requests/core'

type OwnProps = {}

type Props = OwnProps

const RequestError = () => (
  //TODO: replace with global component
  <Text>There was some error during fetching. Please try again.</Text>
)

export const Workouts: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { data, loading, error, pristine } = useSelector(
    getQuerySelector({ type: FETCH_WORKOUTS })
  )

  useEffect(() => {
    dispatch(fetchWorkouts(user.xAccessToken))
  }, [])

  if (loading) {
    return <Text>Loading</Text>
  }
  return <>{data && <WorkoutsList workouts={data} />}</>
}

export default Workouts
