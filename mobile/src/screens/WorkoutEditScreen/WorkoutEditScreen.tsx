import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import WorkoutForm from '../../components/WorkoutForm'
import { useRoute } from '@react-navigation/native'

type OwnProps = {}
type Props = OwnProps

const WorkoutEditScreen: FunctionComponent<Props> = () => {
  const route = useRoute()
  const { workout } = route.params

  return (
    <View style={{ flex: 1 }}>
      <WorkoutForm workout={workout} isEdit={true} />
    </View>
  )
}

export default WorkoutEditScreen
