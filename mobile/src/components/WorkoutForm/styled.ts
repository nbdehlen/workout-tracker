import styled from 'styled-components/native'
import theme from '../../util/theme'

export const Container = styled.View``

export const ItemSelectContainer = styled.View`
  background-color: red;
`

export const ItemContainer = styled.View``

export const RightHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`

export const SaveButton = styled.TouchableOpacity`
  padding: 16px;
  margin: -16px;
`

export const DeleteButton = styled.TouchableOpacity`
  padding: 16px;
  margin: -16px;
`
export const Text = styled.Text`
  color: ${theme.neutral_1};
  font-size: 16px;
`
