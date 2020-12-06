import React, { FunctionComponent, ReactText, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Platform,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  bodyParts,
  populateSecondaryMuscles,
  emptyExercise,
  emptySet,
  populateMainMuscle,
} from '../../api/helpers'
import * as S from '../../util/theme/base'
import { Picker } from '@react-native-community/picker'
import {
  editWorkout,
  fetchWorkouts,
  postNewWorkout,
} from '../../redux/requests/actions'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'

type OwnProps = {
  workout: CompleteWorkout
  isEdit: boolean
}
type Props = OwnProps

type MainMuscle = String[]

export const WorkoutForm: FunctionComponent<Props> = ({ workout, isEdit }) => {
  // console.log('workout', workout)
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  // console.log('user', user)
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

  const handlePostWorkoutDate = (date, key) => {
    console.log(date)
    setPostWorkout({
      ...postWorkout,
      [key]: date,
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

    const mainMuscleValidation = (mainMuscle) => {
      return mainMuscle.length > 0 ? mainMuscle : ''
    }

    const secondaryMusclesValidation = (secondaryMuscles) => {
      return secondaryMuscles[0].length > 0 ? secondaryMuscles : ['']
    }

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
        mainMuscle: mainMuscleValidation(mainMuscle[i]),
        secondaryMuscles: secondaryMusclesValidation(secondaryMuscles[i]),
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

    //MongoDB needs undefined to set default dates
    if (end.length < 1) {
      fullWorkout.end = undefined
    }
    if (start.length < 1) {
      fullWorkout.start = undefined
    }
    console.log(fullWorkout)

    isEdit
      ? dispatch(editWorkout(_id, user.xAccessToken, fullWorkout))
      : dispatch(postNewWorkout(user.xAccessToken, fullWorkout))
    dispatch(fetchWorkouts(user.xAccessToken))
  }

  const [showStart, setShowStart] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  // const [date, setDate] = useState(new Date(Date.now()))

  // const onChangeDatePicker = (event, selectedDate) => {
  //   const currentDate = selectedDate || date
  //   setShowStart(Platform.OS === 'ios')
  //   setDate(currentDate)
  // }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        {/* <S.ContainerRow> */}
        <S.FlexCol>
          <Text> Workout type </Text>
          <S.TextInput
            value={postWorkout.type}
            name="type"
            onChange={(e) => handlePostWorkout(e, 'type')}
          />
        </S.FlexCol>
        <S.FlexCol>
          <Text> Grade </Text>
          <S.TextInput
            value={String(postWorkout.grade)}
            name="grade"
            onChange={(e) => handlePostWorkout(e, 'grade')}
          />
        </S.FlexCol>
        <S.FlexCol>
          <TouchableOpacity onPress={() => setShowStart(!showStart)}>
            <Text>
              Start:{' '}
              {postWorkout.start
                ? format(
                    new Date(new Date(postWorkout.start)),
                    'HH:mm do MMM yy'
                  )
                : format(new Date(Date.now()), 'HH:mm do MMM yy')}
            </Text>
          </TouchableOpacity>

          {/*
          {show && (
            <>
              <Text>Im shown!</Text>
              <DateTimePicker
                value={date}
                mode="time"
                onChange={onChangeDatePicker}
                is24Hour={true}
                display="clock"
              />
            </>
          )} */}
          {showStart && (
            <DatePicker
              mode="datetime"
              date={
                postWorkout?.start
                  ? new Date(postWorkout.start)
                  : new Date(Date.now())
              }
              onDateChange={(date) => handlePostWorkoutDate(date, 'start')}
            />
          )}
          {/*
            <S.TextInput
            value={postWorkout.start}
            name="start"
            onChange={(e) => handlePostWorkout(e, 'start')}
          /> */}
        </S.FlexCol>
        <S.FlexCol>
          {/* <Text> End </Text>
          <S.TextInput
            value={postWorkout.end}
            name="end"
            onChange={(e) => handlePostWorkout(e, 'end')}
          /> */}
          <TouchableOpacity onPress={() => setShowEnd(!showEnd)}>
            <Text>
              End:{' '}
              {postWorkout.end
                ? format(new Date(new Date(postWorkout.end)), 'HH:mm do MMM yy')
                : format(
                    new Date(Date.now() + 60 * 60 * 1000),
                    'HH:mm do MMM yy'
                  )}
            </Text>
          </TouchableOpacity>
          {showEnd && (
            <DatePicker
              mode="datetime"
              date={
                postWorkout?.end
                  ? new Date(postWorkout.end)
                  : new Date(Date.now())
              }
              onDateChange={(date) => handlePostWorkoutDate(date, 'end')}
            />
          )}
        </S.FlexCol>
        {/* </S.ContainerRow> */}
        <View>
          {exercises.map((exercise, i) => (
            <View key={'exercise' + i}>
              <S.FlexCol>
                <Text> Exercise type: </Text>
                <S.TextInput
                  value={exercise.exerciseType}
                  name="exerciseType"
                  onChange={(e) => handlePostExercises(e, 'exerciseType', i)}
                />
              </S.FlexCol>
              <S.FlexCol>
                <Text> Exercise {i + 1} : </Text>
                <TouchableOpacity onPress={() => removeExercise(i)}>
                  <Text>Remove Exercise</Text>
                </TouchableOpacity>

                <S.TextInput
                  value={exercise.name}
                  name="name"
                  onChange={(e) => handlePostExercises(e, 'name', i)}
                />
              </S.FlexCol>
              <S.FlexCol>
                <Text> Compound: </Text>
                <Switch
                  value={exercise.compound}
                  name="compound"
                  onValueChange={(e) => handlePostExercises(e, 'compound', i)}
                />
              </S.FlexCol>
              <S.FlexCol>
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
              </S.FlexCol>
              <S.FlexCol>
                <Text> Secondary Targets (multiple): </Text>
                <Picker
                  selectedValue={'select'}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(muscle) =>
                    handlePostSecondaryMuscles(muscle as string, i)
                  }
                >
                  {bodyParts.map((muscle) =>
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
              </S.FlexCol>
              <S.FlexCol>
                <Text> Duration: </Text>
                <S.TextInput
                  value={exercise.duration}
                  name="duration"
                  onChange={(e) => handlePostExercises(e, 'duration', i)}
                />
              </S.FlexCol>
              <S.FlexCol>
                <Text> Calories: </Text>
                <S.TextInput
                  value={exercise.calories}
                  name="calories"
                  onChange={(e) => handlePostExercises(e, 'calories', i)}
                />
              </S.FlexCol>
              <S.FlexCol>
                <Text> Tool: </Text>
                <S.TextInput
                  value={exercise.tool}
                  name="tool"
                  onChange={(e) => handlePostExercises(e, 'tool', i)}
                />
              </S.FlexCol>
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
                    <S.FlexCol>
                      <Text> Weight: </Text>
                      <S.TextInput
                        value={String(set.weight)}
                        name="weight"
                        onChange={(e) => handlePostSets(e, 'weight', i, y)}
                      />
                    </S.FlexCol>
                    <S.FlexCol>
                      <Text> Reps </Text>
                      <S.TextInput
                        value={String(set.reps)}
                        name="reps"
                        onChange={(e) => handlePostSets(e, 'reps', i, y)}
                      />
                    </S.FlexCol>
                    <S.FlexCol>
                      <Text> Rest </Text>
                      <S.TextInput
                        value={set.rest}
                        name="rest"
                        onChange={(e) => handlePostSets(e, 'rest', i, y)}
                      />
                    </S.FlexCol>
                    <S.FlexCol>
                      <Text> Time </Text>
                      <S.TextInput
                        value={set.time}
                        name="time"
                        onChange={(e) => handlePostSets(e, 'time', i, y)}
                      />
                    </S.FlexCol>
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
        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutForm
