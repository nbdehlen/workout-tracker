import React, { FunctionComponent, useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
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
import * as S from '../../util/theme/base'

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

  const handlePostSets = (e, name, i, y) => {
    console.log(name)
    console.log(e.nativeEvent.text)
    setPostExercises((prevState) => ({
      ...prevState,
      exercises: [
        ...prevState.exercises.slice(0, i),
        {
          ...prevState.exercises[i],
          sets: [
            ...prevState.exercises[i].sets.splice(0, y),
            { ...prevState.exercises[i].sets[y], [name]: e.nativeEvent.text },
            ...prevState.exercises[i].sets.splice(y + 1, +2),
          ],
        },
        ...prevState.exercises.slice(i + 1, +2),
      ],
    }))
    for (let g = 0; postExercises.exercises.length > g; g++) {
      console.log(postExercises.exercises[g].sets)
    }
  }

  //   const handlePostSets = (e, name, i, y) => {
  //     console.log(name)
  //     console.log(e.nativeEvent.text)
  //     setPostExercises((prevState) => ({
  //       ...prevState,
  //       exercises: [
  //         ...prevState.exercises.slice(0, i),
  //         { ...prevState.exercises[i], ...prevState.exercises[i].sets: [
  //         ...prevState.exercises[i].sets.splice(0, y),
  //         {...prevState.exercises[i].sets[y], [name]: e.nativeEvent.text },
  //         ...prevState.exercises[i].sets.splice(y+1, +2)

  // ] }
  //         ...prevState.exercises.slice(i + 1, +2),
  //       ]
  //     }))
  //     console.log(postExercises)
  //   }

  // const handlePostExercises = (e, name) => {
  //   console.log(name)
  //   console.log(e.nativeEvent.text)
  //   setPostExercises((prevState) => ({
  //     ...prevState,
  //     [name]: e.nativeEvent.text,
  //   }))
  //   console.log(postExercises)
  // }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <S.ContainerRow>
          <Text> Workout type </Text>
          <S.TextInput
            value={postWorkout.type}
            name="type"
            onChange={(e) => handlePostWorkout(e, 'type')}
          />
        </S.ContainerRow>
        <View>
          {exercises.map((exercise, i) => (
            <View key={i}>
              <Text> Exercise type: </Text>
              <S.TextInput
                value={exercise.exerciseType}
                name="exerciseType"
                onChange={(e) => handlePostExercises(e, 'exerciseType', i)}
              />
              <Text> Exercise {i + 1} : </Text>
              <S.TextInput
                value={exercise.name}
                name="name"
                onChange={(e) => handlePostExercises(e, 'name', i)}
              />
              <Text> Compound: </Text>
              <S.TextInput
                value={exercise.compound}
                name="compound"
                onChange={(e) => handlePostExercises(e, 'compound', i)}
              />

              <Text> Main Target: </Text>
              <S.TextInput
                value={exercise.mainMuscle}
                name="mainMuscle"
                onChange={(e) => handlePostExercises(e, 'mainMuscle', i)}
              />
              <Text> Secondary Targets: </Text>
              <S.TextInput
                value={exercise.secondaryMuscles}
                name="secondaryMuscles"
              />
              <Text> Calories: </Text>
              <S.TextInput
                value={exercise.calories}
                name="calories"
                onChange={(e) => handlePostExercises(e, 'calories', i)}
              />
              <Text> Tool: </Text>
              <S.TextInput
                value={exercise.tool}
                name="tool"
                onChange={(e) => handlePostExercises(e, 'tool', i)}
              />
              <Text> Unilateral </Text>
              <S.TextInput
                value={exercise.unilateral}
                name="unilateral"
                onChange={(e) => handlePostExercises(e, 'unilateral', i)}
              />
              {exercise?.sets
                ? exercise.sets.map((set, y) => (
                    <View key={y}>
                      <Text> Weight: </Text>
                      <S.TextInput
                        value={set.weight}
                        name="weight"
                        onChange={(e) => handlePostSets(e, 'weight', i, y)}
                      />
                      <Text> Reps </Text>
                      <S.TextInput
                        value={set.reps}
                        name="reps"
                        onChange={(e) => handlePostSets(e, 'reps', i, y)}
                      />
                      <Text> Rest </Text>
                      <S.TextInput
                        value={set.rest}
                        name="rest"
                        onChange={(e) => handlePostSets(e, 'rest', i, y)}
                      />
                      <Text> Time </Text>
                      <S.TextInput
                        value={set.time}
                        name="time"
                        onChange={(e) => handlePostSets(e, 'time', i, y)}
                      />
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
