import React, { FunctionComponent, ReactText, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  workoutTemplate,
  exercisesTemplate,
  bodyParts,
  populateSecondaryMuscles,
  emptyExercise,
  emptySet,
  populateMainMuscle,
} from '../../api/helpers'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as S from '../../util/theme/base'
import * as SS from './styled'
import { Picker } from '@react-native-community/picker'
import { v4 as uuidv4 } from 'uuid'

type OwnProps = {
  workout: CompleteWorkout
  // exercises?: Exercise[]
  // sets?: Sets[]
  // mainMuscle?: MainMuscle
  // secondaryMuscles?: SecondaryMuscles
}
type Props = OwnProps

type MainMuscle = String[]

type ExerciseObj = {
  exercises: Exercise[]
}

export const WorkoutForm: FunctionComponent<Props> = ({ workout }) => {
  console.log('workout', workout)
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  // const workout: WorkoutData = route.params
  // const user = useSelector((state) => state.user)

  const [postWorkout, setPostWorkout] = useState<CompleteWorkout>({
    _id: workout._id,
    type: workout.type,
    start: workout.start,
    grade: workout.grade,
    end: workout.end,
  })

  const [postExercises, setPostExercises] = useState<ExerciseObject>({
    exercises: workout.exercises,
  })

  const [mainMuscle, setMainMuscle] = useState<MainMuscle>(
    populateMainMuscle(workout.exercises)
  )
  const [secondaryMuscles, setSecondaryMuscles] = useState<SecondaryMuscles>(
    populateSecondaryMuscles(workout.exercises)
  )

  const { exercises } = postExercises

  const Item = Picker.Item as any

  const handlePostWorkout = (e, name: string) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)
    setPostWorkout({
      ...postWorkout,
      [name]: e.nativeEvent.text,
    })
  }

  const handlePostExercises = (e, name: string, i: number) => {
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

  const addExercise = () => {
    secondaryMuscles.push([])
    setPostExercises({
      exercises: [...exercises, emptyExercise],
    })
  }

  const removeExercise = (i: number) => {
    setPostExercises({
      exercises: [
        ...exercises.slice(0, i),
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
  }

  const changeOrderExercise = () => {
    //will have to look into this
  }

  const addSet = (i: number) => {
    // add set to exercise
    setPostExercises({
      ...postExercises,
      exercises: [
        ...exercises.slice(0, i),
        { ...exercises[i], sets: [...exercises[i].sets, emptySet] },
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
    // postExercises.exercises[i].sets.push(emptySet)
    console.log(exercises[i].sets)
  }

  const removeSet = (i: number, y: number) => {
    setPostExercises({
      ...postExercises,
      exercises: [
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          sets: [
            ...exercises[i].sets.slice(0, y),
            ...exercises[i].sets.slice(y + 1, exercises[i].sets.length),
          ],
        },
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
    console.log(exercises[i].sets)
  }

  const changeOrderSet = (i: number, y: number) => {
    //will have to look into this
  }

  const handlePostSets = (e, name: string, i: number, y: number) => {
    console.log(name)
    console.log(e?.nativeEvent?.text)
    setPostExercises({
      ...postExercises,
      exercises: [
        ...exercises.slice(0, i),
        {
          ...exercises[i],
          sets: [
            ...exercises[i].sets.slice(0, y),
            { ...exercises[i].sets[y], [name]: e.nativeEvent.text },
            ...exercises[i].sets.slice(y + 1, exercises[i].sets.length),
          ],
        },
        ...exercises.slice(i + 1, exercises.length),
      ],
    })
    console.log(postExercises.exercises[i].sets)
  }

  const handlePostMainMuscle = (muscle: string, i: number) => {
    console.log(muscle)
    setMainMuscle([
      ...mainMuscle.slice(0, i),
      (mainMuscle[i] = muscle),
      ...mainMuscle.slice(i + 1, mainMuscle.length),
    ])
    console.log(mainMuscle)
  }

  const handlePostSecondaryMuscles = (muscle: string, i: number) => {
    if (secondaryMuscles[i] && secondaryMuscles[i].includes(muscle)) {
      console.log('in if')
      const muscleIndex = secondaryMuscles[i].indexOf(muscle)
      setSecondaryMuscles([
        ...secondaryMuscles.slice(0, i),
        [
          ...secondaryMuscles[i].slice(0, muscleIndex),
          ...secondaryMuscles[i].slice(
            muscleIndex + 1,
            // secondaryMuscles[i].length
            muscleIndex + 2
          ),
        ],
        ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
      ])
    } else {
      console.log('in else')
      setSecondaryMuscles([
        ...secondaryMuscles.slice(0, i),
        [...secondaryMuscles[i], muscle],
        ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
      ])
    }
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
        duration: exercise.duration,
        calories: exercise.calories,
      })),
    }
    console.log(fullWorkout)
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        {/* <S.ContainerRow> */}
        <S.ContainerCol>
          <Text> Workout type </Text>
          <S.TextInput
            value={postWorkout.type}
            name="type"
            onChange={(e) => handlePostWorkout(e, 'type')}
          />
        </S.ContainerCol>
        <S.ContainerCol>
          <Text> Grade </Text>
          <S.TextInput
            value={postWorkout.grade}
            name="grade"
            onChange={(e) => handlePostWorkout(e, 'grade')}
          />
        </S.ContainerCol>
        <S.ContainerCol>
          <Text> Start </Text>
          <S.TextInput
            value={postWorkout.start}
            name="start"
            onChange={(e) => handlePostWorkout(e, 'start')}
          />
        </S.ContainerCol>
        <S.ContainerCol>
          <Text> End </Text>
          <S.TextInput
            value={postWorkout.end}
            name="end"
            onChange={(e) => handlePostWorkout(e, 'end')}
          />
        </S.ContainerCol>
        {/* </S.ContainerRow> */}
        <View>
          {exercises.map((exercise, i) => (
            <View key={'exercise' + i}>
              <S.ContainerCol>
                <Text> Exercise type: </Text>
                <S.TextInput
                  value={exercise.exerciseType}
                  name="exerciseType"
                  onChange={(e) => handlePostExercises(e, 'exerciseType', i)}
                />
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Exercise {i + 1} : </Text>
                <TouchableOpacity onPress={() => removeExercise(i)}>
                  <Text>Remove Exercise</Text>
                </TouchableOpacity>

                <S.TextInput
                  value={exercise.name}
                  name="name"
                  onChange={(e) => handlePostExercises(e, 'name', i)}
                />
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Compound: </Text>
                <Switch
                  value={exercise.compound}
                  name="compound"
                  onValueChange={(e) => handlePostExercises(e, 'compound', i)}
                />
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Main Target (single): </Text>
                <Picker
                  selectedValue={'select'}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(muscle) =>
                    handlePostMainMuscle(muscle as string, i)
                  }
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
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Secondary Targets (multiple): </Text>
                <Picker
                  selectedValue={'select'}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(muscle) =>
                    handlePostSecondaryMuscles(muscle as string, i)
                  }
                >
                  {bodyParts.map((muscle) =>
                    // console.log('secondaryMuscles[i]', secondaryMuscles[i]),
                    // console.log(
                    //   'secondaryMuscles[i].length',
                    //   secondaryMuscles[i].length
                    // ),
                    // console.log(typeof secondaryMuscles[i]),
                    // console.log(secondaryMuscles),
                    secondaryMuscles[i] &&
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
                  {secondaryMuscles[i] &&
                    secondaryMuscles[i].map((muscle: ReactText) => (
                      <Text key={JSON.stringify(muscle + 'displaySecondary')}>
                        {muscle}
                      </Text>
                    ))}
                </View>
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Duration: </Text>
                <S.TextInput
                  value={exercise.duration}
                  name="duration"
                  onChange={(e) => handlePostExercises(e, 'duration', i)}
                />
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Calories: </Text>
                <S.TextInput
                  value={exercise.calories}
                  name="calories"
                  onChange={(e) => handlePostExercises(e, 'calories', i)}
                />
              </S.ContainerCol>
              <S.ContainerCol>
                <Text> Tool: </Text>
                <S.TextInput
                  value={exercise.tool}
                  name="tool"
                  onChange={(e) => handlePostExercises(e, 'tool', i)}
                />
              </S.ContainerCol>
              <Text> Unilateral </Text>
              <Switch
                value={exercise.unilateral}
                name="unilateral"
                onValueChange={(e) => handlePostExercises(e, 'unilateral', i)}
              />

              <TouchableOpacity onPress={() => addSet(i)}>
                <Text>Add set</Text>
              </TouchableOpacity>
              {exercise.sets &&
                exercise.sets.map((set, y) => (
                  <View key={JSON.stringify(set + String(y))}>
                    <TouchableOpacity onPress={() => removeSet(i, y)}>
                      <Text>Remove set</Text>
                    </TouchableOpacity>

                    <Text> Set {y + 1} </Text>
                    <S.ContainerCol>
                      <Text> Weight: </Text>
                      <S.TextInput
                        value={String(set.weight)}
                        name="weight"
                        onChange={(e) => handlePostSets(e, 'weight', i, y)}
                      />
                    </S.ContainerCol>
                    <S.ContainerCol>
                      <Text> Reps </Text>
                      <S.TextInput
                        value={String(set.reps)}
                        name="reps"
                        onChange={(e) => handlePostSets(e, 'reps', i, y)}
                      />
                    </S.ContainerCol>
                    <S.ContainerCol>
                      <Text> Rest </Text>
                      <S.TextInput
                        value={set.rest}
                        name="rest"
                        onChange={(e) => handlePostSets(e, 'rest', i, y)}
                      />
                    </S.ContainerCol>
                    <S.ContainerCol>
                      <Text> Time </Text>
                      <S.TextInput
                        value={set.time}
                        name="time"
                        onChange={(e) => handlePostSets(e, 'time', i, y)}
                      />
                    </S.ContainerCol>
                  </View>
                ))}
            </View>
          ))}
          <TouchableOpacity onPress={addExercise}>
            <Text> Add Exercise </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submitForm}>
          <Text> Print complete form </Text>
        </TouchableOpacity>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutForm
