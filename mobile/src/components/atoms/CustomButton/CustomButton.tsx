import React, { FunctionComponent } from 'react'
import { TouchableOpacityProps, ViewProps } from 'react-native'
import { Icons } from '../../../assets'
import theme from '../../../util/theme'
import * as S from './styled'

type OwnProps = {
  title: string
  width?: string
  icon?: string
  variant?: 'default' | 'outline' | 'clear'
  fontSize?: number
  iconSize?: number
}

type Props = OwnProps & ViewProps & TouchableOpacityProps

export const CustomButton: FunctionComponent<Props> = ({
  title,
  width = '100%',
  icon,
  variant = 'default',
  fontSize,
  iconSize,
  ...touchableProps
}) => {
  const ChosenIcon = Icons[icon]

  return (
    <S.Touchable width={width} variant={variant} {...touchableProps} ViewProps>
      <S.Text variant={variant} fontSize={fontSize}>
        {title}
      </S.Text>
      {icon && (
        <S.IconWrapper>
          <ChosenIcon
            fill={theme.primary.onColor}
            height={iconSize || 24}
            width={iconSize || 24}
          />
        </S.IconWrapper>
      )}
    </S.Touchable>
  )
}

export default CustomButton
