import React, { FunctionComponent, useState } from 'react'
import { Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { signup } from '../../redux/auth/actions'
import axios from 'axios'
import * as S from './styled'
import { saveData } from '../../util/asyncStorage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Navigation } from '../../navigation/Navigation'

type OwnProps = {}

type Props = OwnProps

export const SignupScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const route = useRoute()
  const navigation = useNavigation()
  // const user = useSelector((state) => state.user)

  // const bypassLogin = () => {
  //   setUsername('Sergej')
  //   setPassword('12345678')
  // }

  const postSubmit = async () => {
    try {
      const loginStatus = await axios.post(
        // 'http://localhost:5000/api/v1/auth/login',
        'http://10.0.2.2:5000/api/v1/auth/signup',
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
      //Redirect to somewhere
    } catch (err) {
      console.log(err)
    }
  }
  const goToLogin = () => {
    navigation.navigate('login')
  }
  return (
    <S.Container>
      <Text> Email </Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text> Username </Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text> Password </Text>
      <TextInput value={password} onChangeText={setPassword} />

      <TouchableOpacity onPress={postSubmit}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToLogin}>
        <Text>Already have an account?</Text>
      </TouchableOpacity>
    </S.Container>
  )
}

export default SignupScreen
