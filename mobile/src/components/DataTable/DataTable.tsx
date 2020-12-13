import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
import { ucFirst } from '../../util/helpers'
import { FlexCol, FlexRow } from '../../util/theme/base'
import * as S from './styled'

type OwnProps = {
  data: any[]
  headers?: string[]
}

type Props = OwnProps

export const DataTable: FunctionComponent<Props> = ({ data, headers }) => {
  const dataTable: any = {}

  console.log('headers', headers)
  console.log(typeof headers)

  //set dataTable keys
  if (typeof headers !== 'undefined') {
    for (let i = 0; i < headers.length; i++) {
      dataTable[headers[i]] = []
    }
  } else {
    for (const key of Object.keys(data[0])) {
      if (key !== '_id' && key !== 'id') {
        dataTable[key] = []
      }
    }
  }

  //populate dataTable
  for (let i = 0; i < data.length; i++) {
    console.log('data[i]', data[i])
    for (const [dataKey, val] of Object.entries(data[i])) {
      for (const key of Object.keys(dataTable)) {
        if (dataKey === key) {
          dataTable[key].push(val)
        }
      }
    }
  }

  return (
    <>
      {Object.entries(dataTable).map((arr: any) => {
        return (
          <FlexCol key={arr}>
            <View>
              <Text>{ucFirst(arr[0])}</Text>
            </View>
            <FlexCol>
              {arr[1].map((val, index) => {
                return (
                  <FlexRow key={index}>
                    <Text>{val}</Text>
                  </FlexRow>
                )
              })}
            </FlexCol>
          </FlexCol>
        )
      })}
    </>
  )
}

export default DataTable
