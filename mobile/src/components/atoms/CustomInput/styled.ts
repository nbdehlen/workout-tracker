import styled, { css } from 'styled-components/native'
import theme from '../../../util/theme'

const underlineContainerStyle = css`
  border-width: 0px;
  border-color: ${theme.primary.onColor};
  border-radius: 0px;
  border-bottom-width: 2px;
  justify-content: flex-end;
`
const underlineTextInputStyle = css`
  padding-top: 2px;
  padding-bottom: 0px;
  font-size: 16px;
`
export const Container = styled.View`
  border-width: 1px;
  border-color: ${theme.neutral_2};
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  ${({ variant }) => variant === 'underline' && underlineContainerStyle}
`
export const TextInput = styled.TextInput`
  width: 100%;
  margin-left: 8px;
  color: ${theme.neutral_1};
  ${({ variant }) => variant === 'underline' && underlineTextInputStyle}
`
export const Text = styled.Text`
  color: ${theme.neutral_2};
  font-size: 13px;
  margin-bottom: 2px;
  ${({ variant }) => variant === 'underline' && `margin-bottom: 2px`};
`
export const IconWrapper = styled.View`
  margin-left: 12px;
  ${({ variant }) => variant === 'default' && `justify-content: center;`};
`
