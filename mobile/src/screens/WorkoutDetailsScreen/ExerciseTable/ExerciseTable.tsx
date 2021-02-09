import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import * as S from './styled'
import * as B from '../../../util/theme/base'
import theme from '../../../util/theme'

type OwnProps = {
  data: Sets[]
  headers?: string[]
}

type Props = OwnProps

export const ExerciseTable: FunctionComponent<Props> = ({ data, headers }) => (
  <B.CardView
    style={{
      paddingHorizontal: 16,
      paddingTop: 12,
      borderWidth: 1,
      borderColor: theme.primary.weaker,
    }}
  >
    <B.FlexRow>
      <B.FlexCol></B.FlexCol>
      {headers &&
        headers.map((header) => (
          <B.FlexCol style={{ alignItems: 'center' }}>
            <B.Text
              style={{
                fontSize: 13,
                // fontWeight: 'bold',
                color: theme.neutral_2,
              }}
            >
              {header}
            </B.Text>
          </B.FlexCol>
        ))}
    </B.FlexRow>
    {data.map((e, i) => {
      return (
        <>
          <B.FlexRow
            style={{
              borderBottomWidth: 1,
              // borderColor: theme.placeholder,
              borderColor: theme.primary.weaker,
              alignItems: 'flex-end',
            }}
          >
            <B.FlexCol>
              <B.Text
                style={{
                  fontSize: 13,
                  color: theme.neutral_2,
                  // fontWeight: 'bold',
                }}
              >
                SET {i + 1}
              </B.Text>
            </B.FlexCol>
            <B.FlexCol style={{ alignItems: 'center' }}>
              <B.Text style={{ fontSize: 14 }}>{e.weight}</B.Text>
            </B.FlexCol>
            <B.FlexCol style={{ alignItems: 'center' }}>
              <B.Text style={{ fontSize: 14 }}>{e.reps}</B.Text>
            </B.FlexCol>
            <B.FlexCol style={{ alignItems: 'center' }}>
              <B.Text style={{ fontSize: 14 }}>{e.rest}</B.Text>
            </B.FlexCol>
            <B.FlexCol style={{ alignItems: 'center' }}>
              <B.Text style={{ fontSize: 14 }}>{e.time}</B.Text>
            </B.FlexCol>
          </B.FlexRow>
          <B.Spacer h={4} />
        </>
      )
    })}
    <B.Spacer h={16} />
  </B.CardView>
)

export default ExerciseTable
