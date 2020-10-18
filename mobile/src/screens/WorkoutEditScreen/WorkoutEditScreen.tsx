import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'

type OwnProps = {}

type Props = OwnProps

const WorkoutEditScreen: FunctionComponent<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text> Workout Edit </Text>
    </View>
  )
}

export default WorkoutEditScreen
