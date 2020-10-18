import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'

type OwnProps = {}

type Props = OwnProps

const WorkoutAddScreen: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text> Workout Add </Text>
    </View>
  )
}

export default WorkoutAddScreen
