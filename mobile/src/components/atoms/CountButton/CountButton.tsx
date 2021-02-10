import React, { FunctionComponent, SetStateAction, Dispatch } from 'react'
import { Text, View, ViewProps, TouchableOpacity } from 'react-native'
import { Icons } from '../../../assets'
import { readData } from '../../../util/asyncStorage'
import theme from '../../../util/theme'

type OwnProps = {
  arrows?: boolean
  counterMin: number
  counterMax: number
  suffix?: string
  count: number
  setCount: Dispatch<SetStateAction<number>>
}

type Props = OwnProps & ViewProps

const CountButton: FunctionComponent<Props> = ({
  arrows = false,
  counterMin,
  counterMax,
  suffix,
  count,
  setCount,
  ...viewProps
}) => {
  const handleCount = (cnt: number) => {
    if (cnt >= counterMin && cnt <= 10) {
      setCount(cnt)
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      {...viewProps}
    >
      {arrows && (
        <TouchableOpacity onPress={() => handleCount(count - 1)}>
          <Icons.CaretLeft
            height={32}
            width={32}
            color={theme.primary.onColor}
          />
        </TouchableOpacity>
      )}
      {!arrows && (
        <TouchableOpacity onPress={() => handleCount(count - 1)}>
          <Icons.MinusSquare
            fill={theme.primary.onColor}
            width={28}
            height={28}
          />
        </TouchableOpacity>
      )}
      {!arrows && (
        <View
          style={{
            minWidth: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: theme.neutral_1, fontSize: 16 }}>
            {count}
            {suffix && suffix}
          </Text>
        </View>
      )}
      {arrows && (
        <Text style={{ color: theme.neutral_1, fontSize: 24 }}>
          {count}
          <Text style={{ fontSize: 14 }}> {suffix && suffix}</Text>
        </Text>
      )}
      {!arrows && (
        <TouchableOpacity onPress={() => handleCount(count + 1)}>
          <Icons.PlusSquare
            fill={theme.primary.onColor}
            width={28}
            height={28}
          />
        </TouchableOpacity>
      )}
      {arrows && (
        <TouchableOpacity onPress={() => handleCount(count + 1)}>
          <Icons.CaretRight
            height={32}
            width={32}
            color={theme.primary.onColor}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default CountButton
