import React, { FunctionComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/auth/actions'
import { clearStorage } from '../../util/asyncStorage'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const SettingsScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    clearStorage()
    console.log('in handleLogout')
  }

  return (
    <S.Container>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </S.Container>
  )
}

export default SettingsScreen
