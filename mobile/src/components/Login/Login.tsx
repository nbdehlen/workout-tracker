import React, { FunctionComponent, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
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
      //Redirect to somewhere
    } catch (err) {
      console.log(err)
    }
  }

  const goToSignup = () => {
    navigation.navigate(ScreenRoute.SIGNUP)
  }

  return (
    <S.Container style={{ padding: 16 }}>
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
        <CustomButton
          onPress={postSubmit}
          onLongPress={bypassLogin}
          title="Login"
        />
        <Spacer h={16} />
        <TouchableOpacity onPress={goToSignup}>
          <Text style={{ color: 'red' }}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </S.Container>
  )
}

export default Login
