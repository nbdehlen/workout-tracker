import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { Text, CircleView } from 'styled-native-kit'
import Login from '../../components/Login'

type OwnProps = {}

type Props = OwnProps

const LoginScreen: FunctionComponent<Props> = () => {
  return (
    <View>
      <CircleView size={240} color="red">
        <Text centered uppercase fontSize={26} color="white">
          Login screen!
        </Text>
      </CircleView>
      <Login />
    </View>
  )
}

export default LoginScreen
