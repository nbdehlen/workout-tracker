import styled from 'styled-components/native'
import theme from '../../../util/theme'

export const Container = styled.View`
  border-width: 1px;
  border-color: ${theme.neutral_2};
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const TextInput = styled.TextInput`
  width: 100%;
  margin-left: 8px;
  color: ${theme.neutral_1};
`
export const Text = styled.Text`
  margin-bottom: 8px;
  color: ${theme.neutral_2};
  font-size: 12px;
`
export const IconWrapper = styled.View`
  margin-left: 12px;
`
