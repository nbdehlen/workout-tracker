import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import theme from '.'

export const baseline = 8

export const FlexRow = styled.View`
  flex: 1;
  flex-direction: row;
`

export const FlexCol = styled.View`
  flex: 1;
  flex-direction: column;
`

export const FatText = styled.Text`
  font-size: 20;
  font-weight: bold;
  flex-direction: row;
`
export const TextInput = styled.TextInput`
  background-color: ${theme.background.color};
  color: ${theme.neutral_1};
  border-width: 1px;
  border-style: solid;
  width: 50%;
  font-size: 16px;
  border-radius: 12px;
  padding-left: 8px;
`
export const Text = styled.Text`
  color: ${theme.neutral_1};
  font-size: 16px;
`
type Spacings = {
  h?: number
  w?: number
}

export const Spacer: FunctionComponent<Spacings> = ({ h, w }) => (
  <View style={{ height: h, width: w }} />
)

export const BaseContainer = styled.View`
  flex: 1;
  padding: ${baseline * 2}px;
  padding-top: ${baseline * 4}px;
  background-color: ${theme.background.color};
`
export const Label = styled.Text`
  font-size: 12;
  padding-bottom: 8;
  color: ${theme.neutral_2};
`

export const CardView = styled.View`
  padding-bottom: 0px;
  border-radius: 16px;
  background-color: ${theme.primary.color};
`
