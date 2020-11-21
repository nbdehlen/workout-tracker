import React, { FunctionComponent } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'
import WorkoutForm from '../../components/WorkoutForm'
import { useNavigation, useRoute } from '@react-navigation/native'

type OwnProps = {}
type Props = OwnProps

const WorkoutEditScreen: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { workout } = route.params
  console.log('route.params editScreen', route.params)

  return (
    <View style={{ flex: 1 }}>
      <WorkoutForm workout={workout} isEdit={true} />
    </View>
  )
}

export default WorkoutEditScreen
