import styled from 'styled-components'
import React, { FunctionComponent } from 'react'

export const ContainerRow = styled.View`
  flex: 1;
  background-color: #f9f9f9;
`

export const ContainerCol = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #f9f9f9;
`

export const FatText = styled.Text`
  font-size: 20;
  font-weight: bold;
  flex-direction: row;
`
export const TextInput = styled.TextInput`
  background-color: #add8e6;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
`

type Spacings = {
  h?: number
  w?: number
}

export const Space: FunctionComponent<Spacings> = ({}) => {}
