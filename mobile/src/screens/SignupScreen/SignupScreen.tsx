import React, { FunctionComponent, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { signup } from '../../redux/auth/actions'
import axios from 'axios'
import * as S from './styled'
import { saveData } from '../../util/asyncStorage'
import { useNavigation, useRoute } from '@react-navigation/native'
import constants from '../../api/constants'
import { ScreenRoute } from '../../navigation/navigationConstants'
import CustomInput from '../../components/atoms/CustomInput'
import { BaseContainer, Spacer } from '../../util/theme/base'
import CustomButton from '../../components/atoms/CustomButton'
import theme from '../../util/theme'
import GradientButton from '../../components/atoms/GradientButton'
import { ScrollView } from 'react-native-gesture-handler'

type OwnProps = {}

type Props = OwnProps

export const SignupScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const postSubmit = async () => {
    try {
      const loginStatus = await axios.post(
        `${constants.baseUrl}/api/v1/auth/signup`,
        {
          email,
          username,
          password,
        }
      )
      setUsername('')
      setPassword('')
      dispatch(signup(loginStatus.data))
      await saveData('user', loginStatus.data)
      //TODO: toast message
      navigation.navigate(ScreenRoute.LOGIN)
    } catch (err) {
      console.log(err)
    }
  }
  const goToLogin = () => {
    navigation.navigate(ScreenRoute.LOGIN)
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background.color }}>
      <BaseContainer>
        <View style={{ alignItems: 'center', height: 240 }}></View>
        <S.Container>
          <CustomInput
            icon="Email"
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="john@doe.com"
            placeholderTextColor={theme.neutral_2}
          />
          <Spacer h={16} />
          <CustomInput
            icon="User"
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="MacGyver75"
            placeholderTextColor={theme.neutral_2}
          />
          <Spacer h={16} />
          <CustomInput
            icon="Lock"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Super secret password"
            placeholderTextColor={theme.neutral_2}
          />
          <Spacer h={16} />
          <S.ButtonContainer>
            <GradientButton onPress={postSubmit} title="Signup" width="60%" />
            <Spacer h={16} />
            <CustomButton
              onPress={goToLogin}
              variant="clear"
              title="Already have an account? Login!"
            />
          </S.ButtonContainer>
        </S.Container>
      </BaseContainer>
    </ScrollView>
  )
}

export default SignupScreen
