import React, { FunctionComponent } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import CustomButton from '../../components/atoms/CustomButton'
import { logout } from '../../redux/auth/actions'
import { clearStorage } from '../../util/asyncStorage'
import { BaseContainer } from '../../util/theme/base'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const SettingsScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    clearStorage()
  }

  return (
    <BaseContainer
      style={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}
    >
      <CustomButton
        onPress={handleLogout}
        title="Logout"
        width="60%"
        variant="default"
      />
    </BaseContainer>
  )
}

export default SettingsScreen
