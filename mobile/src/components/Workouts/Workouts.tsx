import React, { FunctionComponent, useState, useEffect } from 'react'
import { FETCH_WORKOUTS } from '../../redux/requests/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { Query, Mutation } from '@redux-requests/react'
import { fetchWorkouts } from '../../redux/requests/actions'
import axios from 'axios'
import { Text, TextInput, TouchableOpacity, Button } from 'react-native'
import ListItem from '../atoms/ListItem'

type OwnProps = {}

type Props = OwnProps

const RequestError = () => (
  <Text>There was some error during fetching. Please try again.</Text>
)

export const Workouts: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  console.log(user.xAccessToken)

  useEffect(() => {
    dispatch(fetchWorkouts(user.xAccessToken))
  }, [])

  return (
    <>
      <Query
        type={FETCH_WORKOUTS}
        errorComponent={RequestError}
        noDataMessage={<Text>There is no entity currently.</Text>}
      >
        {({ data }) => <ListItem data={data} />}
      </Query>
      {/* <Text> query goes here </Text> */}
    </>
  )
}

export default Workouts
