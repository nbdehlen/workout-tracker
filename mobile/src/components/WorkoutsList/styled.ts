import styled from 'styled-components/native'
import theme from '../../util/theme'
import { BaseContainer as Base } from '../../util/theme/base'

export const Container = styled.View``
export const BaseContainer = styled(Base)`
  display: flex;
  padding: 16px;
`
export const Text = styled.Text`
  color: ${theme.neutral_1};
`
export const HiglightText = styled.Text`
  font-size: 24px;
  color: ${theme.primary.onColor};
`
export const CardView = styled.View`
  padding: 16px;
  border-radius: 16px;
  background-color: ${theme.primary.color};
`
export const CardTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
`
export const DateHeaderView = styled.View`
  width: 100%;
  border-color: rgba(255, 255, 255, 0.2);
  border-bottom-width: 1;
`
export const CardColOne = styled.View`
  display: flex;
  flex: 1;
`
export const CardColTwo = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
`
export const CardColThree = styled.View`
  display: flex;
  flex: 1;
  align-items: flex-end;
`
