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
import { Spacer } from '../../util/theme/base'
import CustomButton from '../../components/atoms/CustomButton'

type OwnProps = {}

type Props = OwnProps

export const SignupScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const route = useRoute()
  const navigation = useNavigation()

  const postSubmit = async () => {
    try {
      const loginStatus = await axios.post(
        // 'http://10.0.2.2:5000/api/v1/auth/signup',
        `${constants.baseUrl}/api/v1/auth/signup`,
        {
          email,
          username,
          password,
        }
      )
      setUsername('')
      setPassword('')
      console.log(loginStatus)
      dispatch(signup(loginStatus.data))
      saveData('user', loginStatus.data)
      //toast message
      navigation.navigate(ScreenRoute.LOGIN)
    } catch (err) {
      console.log(err)
    }
  }
  const goToLogin = () => {
    navigation.navigate(ScreenRoute.LOGIN)
  }
  return (
    <S.Container style={{ padding: 16 }}>
      <Text> Email </Text>
      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="john@doe.com"
      />
      <Spacer h={8} />
      <Text> Username </Text>
      <CustomInput
        value={username}
        onChangeText={setUsername}
        placeholder="MacGyver75"
      />
      <Spacer h={8} />
      <Text> Password </Text>
      <CustomInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Super secret password"
      />
      <Spacer h={16} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CustomButton onPress={postSubmit} title="Signup" />
        <Spacer h={16} />
        <TouchableOpacity onPress={goToLogin}>
          <Text style={{ color: 'red' }}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </S.Container>
  )
}

export default SignupScreen
