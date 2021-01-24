import React, { FunctionComponent } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Icons } from '../../assets'
import CustomButton from '../../components/atoms/CustomButton'
import { logout } from '../../redux/auth/actions'
import { clearStorage } from '../../util/asyncStorage'
import theme from '../../util/theme'
import { BaseContainer, Spacer } from '../../util/theme/base'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps

export const SettingsScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    dispatch(logout())
    clearStorage()
  }

  return (
    <BaseContainer style={{ flexGrow: 1 }}>
      <Spacer h={16} />
      <S.Container>
        <Spacer h={32} />
        <S.IconContainer>
          <Icons.User fill={theme.neutral_2} height="80" width="80" />
        </S.IconContainer>
        <Spacer h={12} />
        <S.Text>
          Logged in as<S.BoldText>{` ${user.username}`}</S.BoldText>
        </S.Text>
        <Spacer h={24} />
        <CustomButton
          onPress={handleLogout}
          title="Logout"
          width="60%"
          variant="default"
        />
        <Spacer h={20} />
      </S.Container>
    </BaseContainer>
  )
}

export default SettingsScreen
