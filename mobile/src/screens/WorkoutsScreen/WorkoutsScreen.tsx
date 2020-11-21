import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'
import Workouts from '../../components/Workouts'

type OwnProps = {}

type Props = OwnProps

const WorkoutsScreen: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Workouts />
    </View>
  )
}

export default WorkoutsScreen
