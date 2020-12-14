import React, { FunctionComponent } from 'react'
import { TextInput, ViewProps, TextInputProps } from 'react-native'
import * as S from './styled'

type OwnProps = {}

type Props = OwnProps & ViewProps & TextInputProps

const CustomInput: FunctionComponent<Props> = ({ ...textInputProps }) => {
  return (
    <S.Container>
      <S.TextInput {...textInputProps} />
    </S.Container>
  )
}

export default CustomInput
