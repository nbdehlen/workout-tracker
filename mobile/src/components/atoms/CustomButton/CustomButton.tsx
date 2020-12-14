import React, { FunctionComponent } from 'react'
import { Text, TouchableOpacityProps, ViewProps } from 'react-native'
import * as S from './styled'

type OwnProps = {
  title: string
}

type Props = OwnProps & ViewProps & TouchableOpacityProps

export const CustomButton: FunctionComponent<Props> = ({
  title,
  ...touchableProps
}) => {
  return (
    <S.Container {...touchableProps}>
      <S.Text>{title}</S.Text>
    </S.Container>
  )
}

export default CustomButton
