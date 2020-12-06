import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import Workouts from '../../components/Workouts'
import { ScrollView } from 'react-native-gesture-handler'

type OwnProps = {}

type Props = OwnProps

const WorkoutsScreen: FunctionComponent<Props> = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Workouts />
    </ScrollView>
  )
}

export default WorkoutsScreen
