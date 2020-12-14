import React, { FunctionComponent, useState } from 'react'
import { Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/auth/actions'
import axios from 'axios'
import * as S from './styled'
import { saveData } from '../../util/asyncStorage'
import { navigationRef } from '../../util/navigationService'
import { useNavigation } from '@react-navigation/native'
import constants from '../../api/constants'

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
    navigation.navigate('signup')
  }

  return (
    <S.Container>
      <Text> Username </Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text> Password </Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity onPress={postSubmit} onLongPress={bypassLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignup}>
        <Text>Create an account</Text>
      </TouchableOpacity>
    </S.Container>
  )
}

export default Login
