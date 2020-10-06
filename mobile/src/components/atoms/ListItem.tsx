import React, { FunctionComponent, useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
// import { View } from 'styled-native-kit'

type OwnProps = {
  data: [
    {
      _id: string
      type: string
      start: string
      end: string
      exercises: string[]
    }
  ]
}

type Props = OwnProps

export const ListItems: FunctionComponent<Props> = ({ data }) => {
  return (
    <View>
      {data.map((entry) => (
        <View key={entry._id}>
          <Text> {entry.type} </Text>
          <Text> {entry.start} </Text>
          <Text> {entry.end} </Text>
          <Text> {entry.exercises} </Text>
        </View>
      ))}
    </View>
  )
}

export default ListItems
