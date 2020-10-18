import React, { FunctionComponent, useState, useEffect, ReactText } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
  TouchableOpacity,
  Button,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Keyboard,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  workoutTemplate,
  exercisesTemplate,
  bodyParts,
  populateSecondaryMuscles,
} from '../../api/helpers'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as S from '../../util/theme/base'
import * as SS from './styled'
import { Picker } from '@react-native-community/picker'
import { v4 as uuidv4 } from 'uuid'

type OwnProps = WorkoutData
type Props = OwnProps

type MainMuscle = String[]

export const WorkoutAdd: FunctionComponent<Props> = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const workout: WorkoutData = route.params
  const user = useSelector((state) => state.user)
  const [postWorkout, setPostWorkout] = useState(workoutTemplate)
  const [postExercises, setPostExercises] = useState(exercisesTemplate)
  const [mainMuscle, setMainMuscle] = useState<MainMuscle>([])
  const [secondaryMuscles, setSecondaryMuscles] = useState(
    populateSecondaryMuscles(postExercises.exercises)
  )
  const { exercises } = postExercises
  const Item = Picker.Item as any

  const handlePostWorkout = (e, name) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)

    setPostWorkout({
      ...postWorkout,
      [name]: e.nativeEvent.text,
    })
  }

  const handlePostExercises = (e, name, i) => {
    setPostExercises({
      exercises: [
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          [name]: typeof e === 'boolean' ? e : e.nativeEvent.text,
        },
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
  }

  const handlePostSets = (e, name, i, y) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)
    setPostExercises({
      ...postExercises,
      exercises: [
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          sets: [
            ...exercises[i].sets.splice(0, y),
            { ...exercises[i].sets[y], [name]: e.nativeEvent.text },
            ...exercises[i].sets.splice(y + 1, exercises[i].sets.length),
          ],
        },
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
  }

  const handlePostMainMuscle = (muscle, i) => {
    console.log(muscle)
    setMainMuscle([
      ...mainMuscle.slice(0, i),
      (mainMuscle[i] = muscle),
      ...mainMuscle.slice(i + 1, mainMuscle.length),
    ])
    console.log(mainMuscle)
  }

  const handlePostSecondaryMuscles = (muscle, i) => {
    if (secondaryMuscles[i].includes(muscle)) {
      console.log('in if')
      const muscleIndex = secondaryMuscles[i].indexOf(muscle)

      setSecondaryMuscles([
        ...secondaryMuscles.slice(0, i),
        [
          ...secondaryMuscles[i].slice(0, muscleIndex),
          ...secondaryMuscles[i].slice(
            muscleIndex + 1,
            secondaryMuscles[i].length
          ),
        ],
        ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
      ])
    } else {
      console.log('in else')

      setSecondaryMuscles([
        ...secondaryMuscles,
        secondaryMuscles[i].push(muscle),
      ])
    }
    console.log(secondaryMuscles[i])
  }

  const submitForm = () => {
    const { _id, end, grade, start, type } = postWorkout

    const fullWorkout = {
      _id,
      end,
      grade,
      start,
      type,
      exercises: postExercises.exercises.map((exercise, i) => ({
        exerciseType: exercise.exerciseType,
        name: exercise.name,
        compound: exercise.compound,
        mainMuscle: mainMuscle[i],
        secondaryMuscles: secondaryMuscles[i],
        tool: exercise.tool,
        unilateral: exercise.unilateral,
        sets: exercise.sets.map((set) => ({
          weight: set.weight,
          reps: set.reps,
          rest: set.rest,
          time: set.time,
        })),
        length: exercise.length,
        calories: exercise.calories,
      })),
    }

    console.log(fullWorkout)
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <S.ContainerRow>
          <S.ContainerRow>
            <Text> Workout type </Text>
            <S.TextInput
              value={postWorkout.type}
              name="type"
              onChange={(e) => handlePostWorkout(e, 'type')}
            />
          </S.ContainerRow>
          <S.ContainerRow>
            <Text> Grade </Text>
            <S.TextInput
              value={postWorkout.grade}
              name="grade"
              onChange={(e) => handlePostWorkout(e, 'grade')}
            />
          </S.ContainerRow>
          <S.ContainerRow>
            <Text> Start </Text>
            <S.TextInput
              value={postWorkout.start}
              name="start"
              onChange={(e) => handlePostWorkout(e, 'start')}
            />
          </S.ContainerRow>
          <S.ContainerRow>
            <Text> End </Text>
            <S.TextInput
              value={postWorkout.end}
              name="end"
              onChange={(e) => handlePostWorkout(e, 'end')}
            />
          </S.ContainerRow>
        </S.ContainerRow>
        <View>
          {exercises.map((exercise, i) => (
            <View key={'exercise' + i}>
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
              <Switch
                value={exercise.compound}
                name="compound"
                onValueChange={(e) => handlePostExercises(e, 'compound', i)}
              />

              <Text> Main Target (single): </Text>
              <Picker
                selectedValue={'select'}
                style={{ height: 50, width: 100 }}
                onValueChange={(muscle) => handlePostMainMuscle(muscle, i)}
                // mode="dropdown"
              >
                {bodyParts.map((muscle) =>
                  mainMuscle[i] === muscle ? (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={JSON.stringify(muscle + 'mainMatch')}
                      color="blue"
                    />
                  ) : (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={JSON.stringify(muscle + 'main')}
                      color="black"
                    />
                  )
                )}
              </Picker>
              <Text> {mainMuscle[i]} </Text>

              <Text> Secondary Targets (multiple): </Text>
              <Picker
                selectedValue={'select'}
                style={{ height: 50, width: 100 }}
                onValueChange={(muscle) =>
                  handlePostSecondaryMuscles(muscle, i)
                }
              >
                {bodyParts.map((muscle) =>
                  secondaryMuscles[i].includes(muscle) ? (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={JSON.stringify(muscle + 'secondaryMatch')}
                      color="blue"
                    />
                  ) : (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={JSON.stringify(muscle + 'secondary')}
                    />
                  )
                )}
              </Picker>

              <View>
                {secondaryMuscles[i].map((muscle) => (
                  <Text key={JSON.stringify(muscle + 'displaySecondary')}>
                    {muscle}
                  </Text>
                ))}
              </View>

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
              <Switch
                value={exercise.unilateral}
                name="unilateral"
                onValueChange={(e) => handlePostExercises(e, 'unilateral', i)}
              />

              {exercise?.sets
                ? exercise.sets.map((set, y) => (
                    <View key={JSON.stringify(set + String(y))}>
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

        <TouchableOpacity onPress={submitForm}>
          <Text> Print complete form </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutAdd
