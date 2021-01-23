import React, { FunctionComponent } from 'react'
import { TouchableOpacityProps, ViewProps } from 'react-native'
import { Icons } from '../../../assets'
import theme from '../../../util/theme'
import * as S from './styled'

type OwnProps = {
  title: string
  width?: string
  icon?: string
  variant?: 'default' | 'outline'
}

type Props = OwnProps & ViewProps & TouchableOpacityProps

export const CustomButton: FunctionComponent<Props> = ({
  title,
  width = '100%',
  icon,
  variant = 'default',
  ...touchableProps
}) => {
  const ChosenIcon = Icons[icon]

  return (
    <S.Touchable width={width} variant={variant} {...touchableProps}>
      <S.Text variant={variant}>{title}</S.Text>
      {icon && (
        <S.IconWrapper>
          <ChosenIcon fill={theme.primary.onColor} height={20} width={20} />
        </S.IconWrapper>
      )}
    </S.Touchable>
  )
}

export default CustomButton
