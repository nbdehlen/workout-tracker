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
// type SecondaryMuscles = String[][]

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

  // useEffect(() => {
  //   populateSecondaryMuscles()
  // }, [])

  console.log('secondaryMuscles: ' + secondaryMuscles)

  const handlePostWorkout = (e, name) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)
    setPostWorkout((prevState) => ({
      ...prevState,
      [name]: e.nativeEvent.text,
    }))
    console.log(postWorkout)
  }

  const handlePostExercises = (e, name, i) => {
    console.log('e', e)
    setPostExercises((prevState) => ({
      ...prevState,
      exercises: [
        ...prevState.exercises.slice(0, i),
        {
          ...prevState.exercises[i],
          [name]: typeof e === 'boolean' ? e : e.nativeEvent.text,
        },
        ...prevState.exercises.slice(i + 1, +2),
      ],
    }))
    console.log(postExercises)
  }

  const handlePostSets = (e, name, i, y) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)
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
        //SHOULDNT THIS BE .LENGTH INSTEAD OF +2 ??
      ],
    }))
    for (let g = 0; postExercises.exercises.length > g; g++) {
      console.log(postExercises.exercises[g].sets)
    }
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
    // get correct exercise from i
    // if muscle exists in secondary muscles array - remove, else add

    // console.log(secondaryMuscles.length)
    if (secondaryMuscles[i]) {
      console.log('in if')
      // console.log(secondaryMuscles[i])
      if (secondaryMuscles[i].includes(muscle)) {
        console.log('in if -> if')
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
        console.log('in if -> else')
        // setSecondaryMuscles([
        //   ...secondaryMuscles[i],
        //   secondaryMuscles.push(muscle),
        // ])
        // setSecondaryMuscles([
        //   ...secondaryMuscles.slice(0, i),
        //   [secondaryMuscles[i], secondaryMuscles[i].push(muscle)],
        //   ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
        // ])
        setSecondaryMuscles([
          ...secondaryMuscles,
          secondaryMuscles[i].push(muscle),
        ])
      }
    } else {
      console.log('in else')
      setSecondaryMuscles([
        ...secondaryMuscles.slice(0, i),
        secondaryMuscles[i].push(muscle),
        // ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
      ])
    }
    // for (let q = 0; q < secondaryMuscles.length; q++) {
    //   for (let p = 0; p < secondaryMuscles[q].length; p++) {
    //     console.log(secondaryMuscles[q][p])
    //   }
    // }
    // console.log(secondaryMuscles)
    console.log(secondaryMuscles[i])
    // console.log(typeof secondaryMuscles)
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
              name="type"
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
            <View key={uuidv4()}>
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
                {/* itemStyle not working!!! */}
                {bodyParts.map((muscle) =>
                  mainMuscle[i] === muscle ? (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={uuidv4()}
                      color="blue"
                    />
                  ) : (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={uuidv4()}
                      color="black"
                    />
                  )
                )}
              </Picker>
              <Text> {mainMuscle[i]} </Text>

              <Text> Secondary Targets (multiple): </Text>
              {/* handlePostSecondaryMuscles               */}
              {/* value={exercise.secondaryMuscles} */}
              {/* name="secondaryMuscles" */}
              <Picker
                // selectedValue={
                //   secondaryMuscles
                //     ? (secondaryMuscles[i] as ReactText) || 'n/a'
                //     : 'n/a'
                // }
                selectedValue={'select'}
                // selectedValue={'select'}
                style={{ height: 50, width: 100 }}
                onValueChange={(muscle) =>
                  handlePostSecondaryMuscles(muscle, i)
                }
                // mode="dropdown"
              >
                {/* itemStyle not working!!! */}
                {/* {bodyParts.map((muscle) => {
                  if (secondaryMuscles[i]?.length > 0) {
                    secondaryMuscles[i].includes(muscle) ? (
                      <Item
                        label={muscle}
                        value={exercise.secondaryMuscles}
                        key={uuidv4()}
                        color="blue"
                      />
                    ) : null
                  }
                  return (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={uuidv4()}
                      color="black"
                    />
                  )
                })} */}
                {bodyParts.map((muscle) =>
                  secondaryMuscles[i].includes(muscle) ? (
                    <Item
                      label={muscle}
                      value={muscle}
                      key={uuidv4()}
                      color="blue"
                    />
                  ) : (
                    <Item label={muscle} value={muscle} key={uuidv4()} />
                  )
                )}
              </Picker>

              <View>
                {secondaryMuscles[i].map((muscle) => (
                  <Text> {muscle} </Text>
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
                    <View key={uuidv4()}>
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
