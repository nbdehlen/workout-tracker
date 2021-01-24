import React, { FunctionComponent } from 'react'
import { ViewProps, TextInputProps, View } from 'react-native'
import { Icons } from '../../../assets'
import theme from '../../../util/theme'
import * as S from './styled'

type OwnProps = {
  label?: string
  icon?: string
}

type Props = OwnProps & ViewProps & TextInputProps

const CustomInput: FunctionComponent<Props> = ({
  label,
  icon,
  ...textInputProps
}) => {
  const ChosenIcon = Icons[icon]
  return (
    <View>
      {!!label && <S.Text> {label} </S.Text>}
      <S.Container ViewProps>
        {icon && (
          <S.IconWrapper>
            <ChosenIcon fill={theme.primary.onColor} height={20} width={20} />
          </S.IconWrapper>
        )}
        <S.TextInput {...textInputProps} />
      </S.Container>
    </View>
  )
}

export default CustomInput
