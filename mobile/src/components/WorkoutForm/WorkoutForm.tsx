import React, {
  FunctionComponent,
  ReactText,
  useLayoutEffect,
  useState,
} from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  bodyParts,
  populateSecondaryMuscles,
  emptyExercise,
  emptySet,
  populateMainMuscle,
} from '../../api/helpers'
import { Picker } from '@react-native-picker/picker'
import {
  deleteWorkout,
  editWorkout,
  fetchWorkouts,
  postNewWorkout,
} from '../../redux/requests/actions'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import { Icons } from '../../assets'
import * as B from '../../util/theme/base'
import { Spacer } from '../../util/theme/base'
import CustomButton from '../atoms/CustomButton'
import * as S from './styled'
import theme from '../../util/theme'
import { ScreenRoute } from '../../navigation/navigationConstants'

type OwnProps = {
  workout: CompleteWorkout
  isEdit: boolean
}
type Props = OwnProps

type MainMuscle = String[]

export const WorkoutForm: FunctionComponent<Props> = ({ workout, isEdit }) => {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
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

  const handleDeleteWorkout = () => {
    Alert.alert(
      'Delete workout',
      'Are you sure you want to delete the workout?',
      [
        {
          text: 'Delete workout',
          onPress: () => {
            dispatch(deleteWorkout(workout._id, user.xAccessToken))
            navigation.navigate(ScreenRoute.WORKOUTS)
          },
        },
        {
          text: 'Cancel',
          // style: 'cancel',
        },
      ]
    )
  }

  const { exercises } = postExercises

  const Item = Picker.Item as any

  const handlePostWorkout = (e, name: string) => {
    console.log(name, e?.nativeEvent?.text)
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
          ...secondaryMuscles[i].slice(muscleIndex + 1, muscleIndex + 2),
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

  const handleWorkoutGrade = (grade) => {
    console.log('grade', grade)
    setPostWorkout({
      ...postWorkout,
      grade: String(grade),
    })
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
    isEdit
      ? dispatch(editWorkout(_id, user.xAccessToken, fullWorkout))
      : dispatch(postNewWorkout(user.xAccessToken, fullWorkout))
    // TODO: toast saved etc
    navigation.navigate(ScreenRoute.WORKOUTS)
  }

  const [showStart, setShowStart] = useState(false)
  const [showEnd, setShowEnd] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <S.RightHeaderContainer>
          <S.SaveButton onPress={submitForm}>
            <S.Text>SAVE</S.Text>
          </S.SaveButton>
          <Spacer w={24} />
          <S.DeleteButton onPress={handleDeleteWorkout}>
            <Icons.TrashCan fill={theme.neutral_1} />
          </S.DeleteButton>
        </S.RightHeaderContainer>
      ),
    })
  }, [navigation, submitForm])

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <S.BaseContainer>
          <S.CardView>
            <B.FlexRow style={{ justifyContent: 'space-between' }}>
              <B.FlexCol>
                <B.Text
                  style={{
                    fontSize: 12,
                    paddingBottom: 4,
                    color: theme.neutral_2,
                  }}
                >
                  Workout type
                </B.Text>
                <B.TextInput
                  value={postWorkout.type}
                  name="type"
                  onChange={(e) => handlePostWorkout(e, 'type')}
                  style={{ width: '100%' }}
                />
              </B.FlexCol>
              <Spacer w={12} />
              <B.FlexCol>
                <B.Text
                  style={{
                    fontSize: 12,
                    paddingBottom: 4,
                    color: theme.neutral_2,
                  }}
                >
                  Grade
                </B.Text>
                <Picker
                  selectedValue={postWorkout.grade || '5'}
                  style={{
                    // height: 50,
                    // width: 120,
                    color: theme.neutral_1,
                    backgroundColor: theme.background.color,
                  }}
                  // dropdownIconColor={theme.neutral_1}
                  onValueChange={handleWorkoutGrade}
                  // mode="dropdown"
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(
                    (grade) => (
                      <Item
                        label={grade + '/10'}
                        value={grade}
                        key={JSON.stringify(grade + 'grade')}
                        // itemStyle={{ color: theme.neutral_1 }}
                      />
                    )
                  )}
                </Picker>
              </B.FlexCol>
            </B.FlexRow>
            <B.FlexCol>
              <TouchableOpacity onPress={() => setShowStart(!showStart)}>
                <B.Text>
                  Start:{' '}
                  {postWorkout.start
                    ? format(
                        new Date(new Date(postWorkout.start)),
                        'HH:mm do MMM yy'
                      )
                    : format(new Date(Date.now()), 'HH:mm do MMM yy')}
                </B.Text>
              </TouchableOpacity>

              {showStart && (
                <DatePicker
                  mode="datetime"
                  minimumDate={new Date(Date.now() - 60 * 60 * 1000 * 24 * 365)}
                  maximumDate={new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)}
                  date={
                    postWorkout?.start
                      ? new Date(postWorkout.start)
                      : new Date(Date.now())
                  }
                  onDateChange={(date) => handlePostWorkoutDate(date, 'start')}
                />
              )}
              {console.log(
                'postWorkout.start',
                postWorkout.start,
                new Date(Date.now())
              )}
            </B.FlexCol>
            <B.FlexCol>
              <TouchableOpacity onPress={() => setShowEnd(!showEnd)}>
                <B.Text>
                  End:{' '}
                  {postWorkout.end
                    ? format(
                        new Date(new Date(postWorkout.end)),
                        'HH:mm do MMM yy'
                      )
                    : format(
                        new Date(Date.now() + 60 * 60 * 1000),
                        'HH:mm do MMM yy'
                      )}
                </B.Text>
              </TouchableOpacity>
              {showEnd && (
                <DatePicker
                  mode="datetime"
                  minimumDate={new Date(Date.now() - 60 * 60 * 1000 * 24 * 365)}
                  maximumDate={new Date(Date.now() + 60 * 60 * 1000 * 24 * 7)}
                  date={
                    postWorkout?.end
                      ? new Date(postWorkout.end)
                      : new Date(Date.now())
                  }
                  onDateChange={(date) => handlePostWorkoutDate(date, 'end')}
                />
              )}
            </B.FlexCol>
          </S.CardView>
          <Spacer h={16} />
          <View>
            {exercises.map((exercise, i) => (
              <View key={'exercise' + i}>
                <S.CardView>
                  <B.FlexRow style={{ justifyContent: 'space-between' }}>
                    <B.Text
                      style={{
                        color: theme.primary.onColor,
                        fontWeight: 'bold',
                      }}
                    >
                      {' '}
                      EXERCISE {i + 1}
                    </B.Text>
                    <TouchableOpacity onPress={() => removeExercise(i)}>
                      <B.Text style={{ color: 'red', fontWeight: 'bold' }}>
                        - Exercise
                      </B.Text>
                    </TouchableOpacity>
                  </B.FlexRow>
                  <Spacer h={8} />
                  <B.FlexRow>
                    <B.FlexCol style={{ flex: 1 }}>
                      <B.Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 4,
                          color: theme.neutral_2,
                        }}
                      >
                        Tool
                      </B.Text>
                      <B.TextInput
                        value={exercise.tool}
                        name="tool"
                        onChange={(e) => handlePostExercises(e, 'tool', i)}
                        style={{ width: '100%' }}
                      />
                    </B.FlexCol>
                    <Spacer w={12} />
                    <B.FlexCol>
                      <B.Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 4,
                          color: theme.neutral_2,
                        }}
                      >
                        Movement
                      </B.Text>
                      <B.TextInput
                        value={exercise.name}
                        name="name"
                        onChange={(e) => handlePostExercises(e, 'name', i)}
                        style={{ width: '100%' }}
                      />
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={12} />
                  <B.FlexRow>
                    <B.FlexCol>
                      <B.Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 4,
                          color: theme.neutral_2,
                        }}
                      >
                        Exercise type
                      </B.Text>
                      <B.TextInput
                        value={exercise.exerciseType}
                        name="exerciseType"
                        onChange={(e) =>
                          handlePostExercises(e, 'exerciseType', i)
                        }
                        style={{ width: '100%' }}
                      />
                    </B.FlexCol>
                    <Spacer w={12} />
                    <B.FlexCol style={{ flex: 1 }}>
                      <B.Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 4,
                          color: theme.neutral_2,
                        }}
                      >
                        Duration
                      </B.Text>
                      <B.TextInput
                        value={exercise.duration}
                        name="duration"
                        onChange={(e) => handlePostExercises(e, 'duration', i)}
                        style={{ width: '100%' }}
                      />
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={12} />
                  <B.FlexRow>
                    <B.FlexCol style={{ flex: 1 }}>
                      <B.Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 4,
                          color: theme.neutral_2,
                        }}
                      >
                        Calories
                      </B.Text>
                      <B.TextInput
                        value={exercise.calories}
                        name="calories"
                        onChange={(e) => handlePostExercises(e, 'calories', i)}
                        style={{ width: '100%' }}
                      />
                    </B.FlexCol>
                    <Spacer w={12} />
                    <B.FlexCol>
                      <B.FlexRow
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <B.Text
                          style={{
                            fontSize: 12,
                            paddingBottom: 4,
                            color: theme.neutral_2,
                          }}
                        >
                          Compound
                        </B.Text>
                        <Switch
                          value={exercise.compound}
                          name="compound"
                          onValueChange={(e) =>
                            handlePostExercises(e, 'compound', i)
                          }
                        />
                      </B.FlexRow>
                      <B.FlexRow
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <B.Text
                          style={{
                            fontSize: 12,
                            paddingBottom: 4,
                            color: theme.neutral_2,
                          }}
                        >
                          Unilateral
                        </B.Text>
                        <Switch
                          value={exercise.unilateral}
                          name="unilateral"
                          onValueChange={(e) =>
                            handlePostExercises(e, 'unilateral', i)
                          }
                        />
                      </B.FlexRow>
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={12} />
                  <B.FlexCol>
                    <B.Text> Main Target (single): </B.Text>
                    <Picker
                      selectedValue={'select'}
                      style={{ height: 50, width: 100, color: theme.neutral_1 }}
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
                    <B.Text> {mainMuscle[i]} </B.Text>
                  </B.FlexCol>
                  <B.FlexCol>
                    <B.Text> Secondary Targets (multiple): </B.Text>
                    <Picker
                      selectedValue={'select'}
                      style={{ height: 50, width: 100, color: theme.neutral_1 }}
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
                          <Text
                            key={JSON.stringify(muscle + 'displaySecondary')}
                          >
                            {muscle}
                          </Text>
                        ))}
                    </View>
                  </B.FlexCol>
                  <B.FlexRow>
                    <B.Text style={{ flex: 1 }}> WEIGHT </B.Text>
                    <Spacer w={8} />
                    <B.Text style={{ flex: 1 }}> REPS </B.Text>
                    <Spacer w={8} />
                    <B.Text style={{ flex: 1 }}> REST </B.Text>
                    <Spacer w={8} />
                    <B.Text style={{ flex: 1 }}> TIME </B.Text>
                  </B.FlexRow>
                  {exercise.sets &&
                    exercise.sets.map((set, y) => (
                      <View key={JSON.stringify(set + String(y))}>
                        <B.FlexRow style={{ justifyContent: 'space-between' }}>
                          <B.Text
                            style={{
                              color: theme.primary.onColor,
                              fontWeight: 'bold',
                            }}
                          >
                            {' '}
                            SET {y + 1}{' '}
                          </B.Text>

                          <TouchableOpacity onPress={() => removeSet(i, y)}>
                            <B.Text
                              style={{ color: 'red', fontWeight: 'bold' }}
                            >
                              - set
                            </B.Text>
                          </TouchableOpacity>
                        </B.FlexRow>

                        <B.FlexRow>
                          <B.TextInput
                            value={String(set.weight)}
                            name="weight"
                            onChange={(e) => handlePostSets(e, 'weight', i, y)}
                            style={{ flex: 1 }}
                          />
                          <Spacer w={8} />
                          <B.TextInput
                            value={String(set.reps)}
                            name="reps"
                            onChange={(e) => handlePostSets(e, 'reps', i, y)}
                            style={{ flex: 1 }}
                          />
                          <Spacer w={8} />
                          <B.TextInput
                            value={set.rest}
                            name="rest"
                            onChange={(e) => handlePostSets(e, 'rest', i, y)}
                            style={{ flex: 1 }}
                          />
                          <Spacer w={8} />
                          <B.TextInput
                            value={set.time}
                            name="time"
                            onChange={(e) => handlePostSets(e, 'time', i, y)}
                            style={{ flex: 1 }}
                          />
                        </B.FlexRow>
                        <Spacer h={8} />
                      </View>
                    ))}

                  <View>
                    <TouchableOpacity onPress={() => addSet(i)}>
                      <B.Text
                        style={{ color: 'lightgreen', fontWeight: 'bold' }}
                      >
                        + set
                      </B.Text>
                    </TouchableOpacity>
                  </View>
                </S.CardView>
                <Spacer h={16} />
              </View>
            ))}
            <CustomButton title="Add Exercise" onPress={addExercise} />
            <Spacer h={8} />
            <CustomButton title="Submit" onPress={submitForm} />
            <Spacer h={8} />
          </View>
        </S.BaseContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutForm
