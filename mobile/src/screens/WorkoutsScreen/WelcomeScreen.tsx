import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'
import Workouts from '../../components/Workouts'

type OwnProps = {}

type Props = OwnProps

const WelcomeScreen: FunctionComponent<Props> = () => {
  return (
    <View>
      <Workouts />
    </View>
  )
}

export default WelcomeScreen
