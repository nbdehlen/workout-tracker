import React, { FunctionComponent } from 'react'
import { ViewProps, TextInputProps, View } from 'react-native'
import { Icons } from '../../../assets'
import theme from '../../../util/theme'
import * as S from './styled'

type OwnProps = {
  label?: string
  icon?: string
  variant?: 'default' | 'underline'
}

type Props = OwnProps & ViewProps & TextInputProps

const CustomInput: FunctionComponent<Props> = ({
  label,
  icon,
  variant = 'default',
  ...textInputProps
}) => {
  const ChosenIcon = Icons[icon]
  return (
    <View>
      {!!label && <S.Text variant={variant}> {label} </S.Text>}
      <S.Container variant={variant} ViewProps>
        {icon && (
          <S.IconWrapper variant={variant}>
            <ChosenIcon fill={theme.primary.onColor} height={20} width={20} />
          </S.IconWrapper>
        )}
        <S.TextInput
          variant={variant}
          {...textInputProps}
          placeholderTextColor="rgba(150,150,150,0.6)"
        />
      </S.Container>
    </View>
  )
}

export default CustomInput
