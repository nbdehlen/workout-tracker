import React, { FunctionComponent, useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { workoutTemplate, exercisesTemplate } from '../../api/helpers'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'

type OwnProps = WorkoutData
type Props = OwnProps

export const WorkoutAdd: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const workout: WorkoutData = route.params
  const user = useSelector((state) => state.user)
  const [postWorkout, setPostWorkout] = useState(workoutTemplate)
  const [postExercises, setPostExercises] = useState(exercisesTemplate)
  // const exercises = postExercises
  const { exercises } = postExercises

  const initialValues = {
    exercisesCount: '',
    workout: workoutTemplate,
  }

  //add screens and stack for add and edit in stack navigation
  // or navigate inside workoutDetails?ff

  // const onChangeExercises = (e, action, values, setValues) => {
  //   if (action === 'ADD') {
  //     exercises.push({
  //       exerciseType: '',
  //       name: '',
  //       compound: false,
  //       mainMuscle: '',
  //       secondaryMuscles: [''],
  //       tool: '',
  //       unilateral: false,
  //       sets: [{ weight: 0, reps: 0, rest: '', time: '' }],
  //       length: '',
  //       calories: 0,
  //     })
  //   } else {
  //     for (let i = previousNumber; i >= exercisesCount; i--) {
  //       exercises.splice(i, 1)
  //     }
  //   }
  // }

  //  Object.keys(exercises[i]).find((val) => val === 'exerciseType')

  const handlePostWorkout = (e, name) => {
    console.log(name)
    console.log(e.nativeEvent.text)
    setPostWorkout((prevState) => ({
      ...prevState,
      [name]: e.nativeEvent.text,
    }))
    console.log(postWorkout)
  }

  const handlePostExercises = (e, name, i) => {
    console.log(name)
    console.log(e.nativeEvent.text)
    setPostExercises((prevState) => ({
      ...prevState,
      exercises: [
        ...prevState.exercises.slice(0, i),
        { ...prevState.exercises[i], [name]: e.nativeEvent.text },
        ...prevState.exercises.slice(i + 1, +2),
      ],
    }))
    console.log(postExercises)
  }

  // const handlePostExercises = (e, name) => {
  //   console.log(name)
  //   console.log(e.nativeEvent.text)
  //   setPostExercises((prevState) => ({
  //     ...prevState,
  //     [name]: e.nativeEvent.text,
  //   }))
  //   console.log(postExercises)
  // }

  //NO ERRORS ON THIS ONE, MAYBE USE FOR NESTED SETS?
  // const handlePostExercises = (e, name, i) => {
  //   console.log(name)
  //   console.log(e.nativeEvent.text)
  //   setPostExercises((prevState) => ({
  //     ...prevState,
  //     exercises: [
  //       ...prevState.slice(0, i),
  //       { [name]: e.nativeEvent.text },
  //       ...prevState.slice(i, +1),
  //       ,
  //     ],
  //   }))
  //   console.log(postWorkout)
  // }

  // const handlePostSets = (e, name, i) => {
  //   console.log(name)
  //   console.log(e.nativeEvent.text)
  //   setPostWorkout((prevState) => ({
  //     ...prevState,
  //     exercises: [
  //       ...prevState.exercises.slice(0, i),
  //     [name]: e.nativeEvent.text,
  //     ...prevState.exercises.slice(i, +1)
  //   ]
  //   }))
  //   console.log(postWorkout)
  // }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <Text> Workout type </Text>
          <TextInput
            value={postWorkout.type}
            name="type"
            onChange={(e) => handlePostWorkout(e, 'type')}
          />
        </View>
        <View>
          {exercises.map((exercise, i) => (
            <View key={i}>
              <Text> Exercise type: </Text>
              <TextInput
                value={exercise.exerciseType}
                name="exerciseType"
                onChange={(e) => handlePostExercises(e, 'exerciseType', i)}
              />
              <Text> Exercise: </Text>
              <TextInput
                value={exercise.name}
                name="name"
                onChange={(e) => handlePostExercises(e, 'name', i)}
              />

              <TextInput value={exercise.compound} name="compound" />

              <Text> Main muscle: </Text>
              <TextInput
                value={exercise.mainMuscle}
                name="mainMuscle"
                onChange={(e) => handlePostExercises(e, 'mainMuscle', i)}
              />
              <TextInput
                value={exercise.secondaryMuscles}
                name="secondaryMuscles"
              />
              <TextInput value={exercise.calories} name="calories" />
              <TextInput value={exercise.tool} name="tool" />
              <TextInput value={exercise.unilateral} name="unilateral" />
              {exercise?.sets
                ? exercise.sets.map((set, y) => (
                    <View key={y}>
                      <TextInput value={set.weight} name="weight" />
                      <TextInput value={set.reps} name="reps" />
                      <TextInput value={set.rest} name="rest" />
                      <TextInput value={set.time} name="time" />
                    </View>
                  ))
                : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutAdd
