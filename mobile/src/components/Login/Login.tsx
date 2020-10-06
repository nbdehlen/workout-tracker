import React, { FunctionComponent, useState } from 'react'
import { Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/actions'
import axios from 'axios'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const Login: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const user = useSelector((state) => state.user)

  const bypassLogin = () => {
    setUsername('modera')
    setPassword('12345678')
  }

  const postSubmit = async () => {
    try {
      const loginStatus = await axios.post(
        // 'http://localhost:5000/api/v1/auth/login',
        'http://10.0.2.2:5000/api/v1/auth/login',
        {
          username,
          password,
        }
      )
      setUsername('')
      setPassword('')
      console.log(loginStatus)
      dispatch(login(loginStatus.data))

      //Redirect to somewhere
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.Container>
      <Text> Username </Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text> Password </Text>
      <TextInput value={password} onChangeText={setPassword} />

      <TouchableOpacity onPress={postSubmit} onLongPress={bypassLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </S.Container>
  )
}

export default Login
