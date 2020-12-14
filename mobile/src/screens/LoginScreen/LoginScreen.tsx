import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, CircleView } from 'styled-native-kit'
import Login from '../../components/Login'
import { Spacer } from '../../util/theme/base'

type OwnProps = {}

type Props = OwnProps

const LoginScreen: FunctionComponent<Props> = () => {
  return (
    <ScrollView>
      <Spacer h={16} />
      <View style={{ alignItems: 'center' }}>
        <CircleView size={240} color="red">
          <Text centered uppercase fontSize={26} color="white">
            Login screen!
          </Text>
        </CircleView>
      </View>
      <Login />
    </ScrollView>
  )
}

export default LoginScreen
