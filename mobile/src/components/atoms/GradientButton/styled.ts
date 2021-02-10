import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import theme from '../../../util/theme'

export const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`
export const Text = styled.Text`
  font-size: 20px;
  color: ${theme.primary.color};
`
export const GradientContainer = styled(LinearGradient)`
  border-width: 2px;
  border-radius: 100px;
  border-color: ${theme.primary.color};
  padding: 8px 16px;
  width: ${({ width }) => width};
`
