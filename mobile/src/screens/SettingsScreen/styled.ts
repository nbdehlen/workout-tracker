import styled from 'styled-components/native'
import theme from '../../util/theme'

export const Container = styled.View`
  background-color: ${theme.primary.color};
  width: 100%;
  align-items: center;
  border-radius: 24px;
`
export const Text = styled.Text`
  color: ${theme.neutral_1};
  font-size: 16px;
`
export const BoldText = styled.Text`
  color: ${theme.neutral_1};
  font-size: 16px;
  font-weight: bold;
`
export const IconContainer = styled.View`
  border-radius: 12px;
  border-style: solid;
  border-width: 2px;
  border-color: ${theme.neutral_2};
  padding: 8px;
`
