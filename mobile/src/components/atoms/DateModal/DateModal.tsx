import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from 'react'
import { Modal, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import * as S from './styled'
import * as B from '../../../util/theme/base'
import DatePicker from 'react-native-date-picker'
import theme from '../../../util/theme'

type OwnProps = {
  label: string
  title: any
  date: any
  stateKey: any
  state: any
  setState: Dispatch<SetStateAction<any>>
}

type Props = OwnProps

export const DateModal: FunctionComponent<Props> = ({
  label,
  title,
  stateKey,
  date,
  state,
  setState,
}) => {
  const [showStart, setShowStart] = useState(false)
  return (
    <>
      <Text
        style={{
          fontSize: 12,
          paddingBottom: 8,
          color: theme.neutral_2,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => setShowStart(true)}
        style={{
          paddingLeft: 2,
          justifyContent: 'flex-end',
          borderRadius: 0,
          backgroundColor: theme.primary.color,
          borderWidth: 0,
          borderBottomWidth: 2,
          borderColor: theme.primary.onColor,
        }}
      >
        <B.Text style={{ fontSize: 16 }}>{title}</B.Text>
      </TouchableOpacity>

      <Modal visible={showStart} transparent={true} animationType="slide">
        <TouchableOpacity
          onPress={() => setShowStart(false)}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              borderRadius: 8,
              padding: 16,
              backgroundColor: theme.primary.color,
              elevation: 5,
            }}
          >
            <DatePicker
              fadeToColor={theme.primary.color}
              textColor={theme.neutral_1}
              mode="datetime"
              minimumDate={new Date(Date.now() - 60 * 60 * 1000 * 24 * 365)}
              maximumDate={new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)}
              date={date}
              onDateChange={(date) =>
                setState({
                  ...state,
                  [stateKey]: date,
                })
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default DateModal
