import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'

type OwnProps = {}

type Props = OwnProps

const WelcomeScreen: FunctionComponent<Props> = () => {
  return (
    <CenteredFillView>
      <CircleView size={240} color="purple">
        <Text centered uppercase fontSize={26} color="white">
          Welcome screen!
        </Text>
      </CircleView>
    </CenteredFillView>
  )
}

export default WelcomeScreen
