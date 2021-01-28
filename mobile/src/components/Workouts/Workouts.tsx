import React, { FunctionComponent, useState, useEffect } from 'react'
import { FETCH_WORKOUTS, WORKOUT } from '../../redux/requests/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { Query } from '@redux-requests/react'
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
  // TODO: Pull down to refresh?

  useEffect(() => {
    dispatch(fetchWorkouts(user.xAccessToken))
  }, [])

  if (loading) {
    return <Text>Loading</Text>
  }
  return (
    <>
      {/* <Query
        type={WORKOUT}
        errorComponent={RequestError}
        noDataMessage={<Text> No logged workouts. </Text>}
      >
        {({ data }) => <WorkoutsList workouts={data} />}
      </Query> */}
      {data && <WorkoutsList workouts={data} />}
    </>
  )
}

export default Workouts
