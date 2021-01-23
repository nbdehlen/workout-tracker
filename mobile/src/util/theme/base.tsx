import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { View } from 'react-native'

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
  background-color: #add8e6;
  border-width: 1px;
  border-style: solid;
  width: 50%;
`

export const text = styled.View``

type Spacings = {
  h?: number
  w?: number
}

export const Spacer: FunctionComponent<Spacings> = ({ h, w }) => {
  return <View style={{ height: h, width: w }} />
}

// Padding container
