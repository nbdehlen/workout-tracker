import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Login from '../../components/Login'
import theme from '../../util/theme'
import { Spacer } from '../../util/theme/base'
import { BaseContainer } from '../../util/theme/base'

type OwnProps = {}

type Props = OwnProps

const LoginScreen: FunctionComponent<Props> = () => {
  return (
    <ScrollView style={{ backgroundColor: theme.background.color }}>
      <BaseContainer>
        <Spacer h={16} />
        <View style={{ alignItems: 'center', height: 240 }}></View>
        <Login />
      </BaseContainer>
    </ScrollView>
  )
}

export default LoginScreen
