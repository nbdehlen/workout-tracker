import React, { FunctionComponent, useLayoutEffect } from 'react'
import { CenteredFillView, Text, CircleView } from 'styled-native-kit'
import { View } from 'react-native'
import WorkoutForm from '../../components/WorkoutForm'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { deleteWorkout } from '../../redux/requests/actions'
import { useDispatch, useSelector } from 'react-redux'
import WorkoutsScreen from '../WorkoutsScreen'

type OwnProps = {}
type Props = OwnProps

const WorkoutEditScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector((state) => state.user)
  const route = useRoute()
  const { workout } = route.params
  console.log('route.params editScreen', route.params)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            dispatch(deleteWorkout(workout._id, user.xAccessToken))
            navigation.navigate('workout')
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <View style={{ flex: 1 }}>
      <WorkoutForm workout={workout} isEdit={true} />
    </View>
  )
}

export default WorkoutEditScreen
