import styled, { css } from 'styled-components/native'
import theme from '../../../util/theme'

const touchDefaultStyle = css`
  background-color: ${theme.primary.onColor};
  border-color: ${theme.primary.color};
`
const touchOutlineStyle = css`
  background-color: ${theme.primary.color};
  border-color: ${theme.primary.onColor};
`
const touchClearStyle = css`
  background-color: transparent;
  border-width: 0px;
`
const textClearStyle = css`
  color: ${theme.neutral_1};
  font-size: 14px;
  text-decoration: underline;
`

const touchDetailsStyle = css`
  padding: 0;
  border-width: 1px;
  border-color: ${theme.primary.weaker};
`

const textDetailsStyle = css`
  color: ${theme.primary.onColor};
  font-size: 13px;
`

export const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 100px;
  padding: 8px 16px;
  width: ${({ width }) => width};
  ${({ variant }) => variant === 'outline' && touchDefaultStyle};
  ${({ variant }) => variant === 'default' && touchOutlineStyle};
  ${({ variant }) => variant === 'clear' && touchClearStyle};
  ${({ variant }) => variant === 'details' && touchDetailsStyle}
`
export const Text = styled.Text`
  font-size: 20px;
  ${({ variant }) => variant === 'outline' && `color: ${theme.primary.color}`};
  ${({ variant }) =>
    variant === 'default' && `color: ${theme.primary.onColor}`};
  ${({ variant }) => variant === 'clear' && textClearStyle};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}px`};
  ${({ variant }) => variant === 'details' && textDetailsStyle}
`
export const IconWrapper = styled.View`
  position: absolute;
  right: 0;
  margin-right: 12px;
  border-color: ${theme.primary.onColor};
  border-radius: 100px;
`
