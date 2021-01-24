import React, { FunctionComponent, useState } from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/actions'
import axios from 'axios'
import * as S from './styled'
import { saveData } from '../../util/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import constants from '../../api/constants'
import CustomInput from '../atoms/CustomInput'
import { Spacer } from '../../util/theme/base'
import CustomButton from '../atoms/CustomButton'
import { ScreenRoute } from '../../navigation/navigationConstants'
import GradientButton from '../atoms/GradientButton'
import theme from '../../util/theme'

type OwnProps = {}

type Props = OwnProps

export const Login: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const bypassLogin = () => {
    setUsername('Sergej')
    setPassword('12345678')
  }

  const postSubmit = async () => {
    try {
      const loginStatus = await axios.post(
        // 'http://10.0.2.2:5000/api/v1/auth/login',
        `${constants.baseUrl}/api/v1/auth/login`,
        {
          username,
          password,
        }
      )
      setUsername('')
      setPassword('')
      console.log(loginStatus)
      dispatch(login(loginStatus.data))
      saveData('user', loginStatus.data)
    } catch (err) {
      console.log(err)
    }
  }

  const goToSignup = () => {
    navigation.navigate(ScreenRoute.SIGNUP)
  }

  return (
    <S.Container>
      <CustomInput
        label="Username"
        icon="User"
        value={username}
        onChangeText={setUsername}
        placeholder="MacGyver75"
        placeholderTextColor={theme.neutral_2}
      />
      <Spacer h={12} />
      <CustomInput
        label="Password"
        icon="Lock"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Super secret password"
        placeholderTextColor={theme.neutral_2}
      />
      <Spacer h={16} />
      <S.ButtonContainer>
        <GradientButton
          onPress={postSubmit}
          onLongPress={bypassLogin}
          title="Login"
          width="60%"
        />
        <Spacer h={16} />
        <CustomButton
          onPress={goToSignup}
          variant="clear"
          title="Don't have an account yet? Sign up!"
          width="80%"
        />
      </S.ButtonContainer>
    </S.Container>
  )
}

export default Login
