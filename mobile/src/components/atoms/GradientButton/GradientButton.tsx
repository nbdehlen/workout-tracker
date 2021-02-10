import React, { FunctionComponent } from 'react'
import { TouchableOpacityProps } from 'react-native'
import theme from '../../../util/theme'
import * as S from './styled'

type OwnProps = {
  title: string
  width?: string
}

type Props = OwnProps & TouchableOpacityProps

export const GradientButton: FunctionComponent<Props> = ({
  title,
  width = '100%',
  ...touchableProps
}) => {
  return (
    <S.GradientContainer
      width={width}
      colors={[theme.gradient.start, theme.gradient.end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <S.Touchable {...touchableProps}>
        <S.Text>{title}</S.Text>
      </S.Touchable>
    </S.GradientContainer>
  )
}
export default GradientButton
