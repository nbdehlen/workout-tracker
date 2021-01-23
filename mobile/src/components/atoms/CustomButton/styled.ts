import styled, { css } from 'styled-components/native'
import theme from '../../../util/theme'

const defaultStyle = css`
  background-color: ${theme.primary.onColor};
  border-color: ${theme.primary.color};
`
const outlineStyle = css`
  background-color: ${theme.primary.color};
  border-color: ${theme.primary.onColor};
`
export const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 100px;
  padding: 8px 16px;
  width: ${({ width }) => width};
  ${({ variant }) => variant === 'outline' && outlineStyle};
  ${({ variant }) => variant === 'default' && defaultStyle};
`
export const Text = styled.Text`
  font-size: 20px;
  color: ${({ variant }) =>
    variant === 'outline' ? theme.primary.onColor : theme.primary.color};
`
export const IconWrapper = styled.View`
  position: absolute;
  right: 0;
  margin-right: 12px;
  border-width: 1px;
  border-color: ${theme.primary.onColor};
  border-radius: 100px;
`
