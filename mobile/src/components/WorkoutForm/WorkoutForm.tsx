import React, { FunctionComponent, useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Switch,
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
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
  postNewWorkout,
} from '../../redux/requests/actions'
import { format } from 'date-fns'
import { Icons } from '../../assets'
import * as B from '../../util/theme/base'
import { Spacer } from '../../util/theme/base'
import CustomButton from '../atoms/CustomButton'
import * as S from './styled'
import theme from '../../util/theme'
import { ScreenRoute } from '../../navigation/navigationConstants'
import { MainState } from '../../redux/store'
import CountButton from '../atoms/CountButton'
import DateModal from '../atoms/DateModal'
import CustomInput from '../atoms/CustomInput'
import { arrayTextFormat, ucFirst } from '../../util/helpers'

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
  const { xAccessToken } = useSelector((state: MainState) => state.user)
  const [postWorkout, setPostWorkout] = useState<CompleteWorkout>({
    _id: workout._id,
    type: workout.type,
    start: workout.start,
    // grade: workout.grade,
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
            dispatch(deleteWorkout(workout._id, xAccessToken))
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

  const Item = Picker.Item

  const handlePostWorkout = (e, name: string) => {
    console.log(name, e?.nativeEvent?.text)
    setPostWorkout({
      ...postWorkout,
      [name]: e.nativeEvent.text,
    })
  }

  const handlePostWorkoutDate = (date, key) => {
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
  }

  const handlePostMainMuscle = (muscle: string, i: number) => {
    setMainMuscle([
      ...mainMuscle.slice(0, i),
      (mainMuscle[i] = muscle),
      ...mainMuscle.slice(i + 1, mainMuscle.length),
    ])
  }

  const handlePostSecondaryMuscles = (muscle: string, i: number) => {
    if (secondaryMuscles[i] && secondaryMuscles[i].includes(muscle)) {
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
      setSecondaryMuscles([
        ...secondaryMuscles.slice(0, i),
        [...secondaryMuscles[i], muscle],
        ...secondaryMuscles.slice(i + 1, secondaryMuscles.length),
      ])
    }
  }

  // const handleWorkoutGrade = (grade: number) => {
  //   if (grade >= 0 && grade <= 10) {
  //     setPostWorkout({
  //       ...postWorkout,
  //       grade: String(grade),
  //     })
  //   }
  // }

  const [workoutGrade, setWorkoutGrade] = useState<number>(
    Number(workout.grade) || 0
  )

  const submitForm = () => {
    const { _id, end, start, type } = postWorkout

    const mainMuscleValidation = (mainMuscle) => {
      return mainMuscle.length > 0 ? mainMuscle : ''
    }

    const secondaryMusclesValidation = (secondaryMuscles) => {
      return secondaryMuscles[0].length > 0 ? secondaryMuscles : ['']
    }

    const fullWorkout = {
      _id,
      end,
      grade: String(workoutGrade),
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
      ? dispatch(editWorkout(_id, xAccessToken, fullWorkout))
      : dispatch(postNewWorkout(xAccessToken, fullWorkout))
    // TODO: toast saved etc
    navigation.navigate(ScreenRoute.WORKOUTS)
  }

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

  const [toggleMuscle, setToggleMuscle] = useState({
    mainMuscle: null,
    secondaryMuscles: null,
  })

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <S.BaseContainer>
          <B.Text
            style={{
              color: theme.primary.onColor,
              fontWeight: 'bold',
            }}
          >
            WORKOUT DETAILS
          </B.Text>
          <B.Spacer h={2} />
          <S.CardView>
            <B.FlexRow style={{ justifyContent: 'space-between' }}>
              <B.FlexCol>
                <CustomInput
                  label="Workout type"
                  variant="underline"
                  placeholder="Gym"
                  value={postWorkout.type}
                  // name="type"
                  onChange={(e: React.ChangeEvent) =>
                    handlePostWorkout(e, 'type')
                  }
                  style={{
                    width: '100%',
                  }}
                />
              </B.FlexCol>
              <Spacer w={40} />
              <B.FlexCol
                style={
                  {
                    // alignItems: 'center',
                  }
                }
              >
                <B.Text
                  style={{
                    fontSize: 12,
                    paddingBottom: 4,
                    color: theme.neutral_2,
                  }}
                >
                  Grade
                </B.Text>
                <CountButton
                  counterMin={0}
                  counterMax={10}
                  count={workoutGrade}
                  setCount={setWorkoutGrade}
                  suffix="/10"
                />
              </B.FlexCol>
            </B.FlexRow>
            <Spacer h={16} />
            <B.FlexRow>
              <B.FlexCol>
                <DateModal
                  label="Start"
                  title={
                    postWorkout?.start
                      ? format(new Date(postWorkout.start), 'dd MMM HH:mm')
                      : format(Date.now(), 'dd MMM HH:mm')
                  }
                  stateKey="start"
                  date={
                    postWorkout?.start
                      ? new Date(postWorkout.start)
                      : new Date(Date.now())
                  }
                  state={postWorkout}
                  setState={setPostWorkout}
                />
              </B.FlexCol>
              <Spacer w={40} />
              <B.FlexCol>
                <DateModal
                  label="End"
                  title={
                    postWorkout?.end
                      ? format(
                          new Date(new Date(postWorkout.end)),
                          'dd MMM HH:mm'
                        )
                      : format(new Date(Date.now()), 'dd MMM HH:mm')
                  }
                  stateKey="end"
                  date={
                    postWorkout?.end
                      ? new Date(postWorkout.end)
                      : new Date(Date.now())
                  }
                  state={postWorkout}
                  setState={setPostWorkout}
                />
              </B.FlexCol>
            </B.FlexRow>
            <Spacer h={16} />
          </S.CardView>
          <Spacer h={32} />
          <View>
            {exercises.map((exercise, i) => (
              <View key={'exercise' + i}>
                <B.FlexRow>
                  <B.Text
                    style={{
                      color: theme.primary.onColor,
                      fontWeight: 'bold',
                    }}
                  >
                    EXERCISE {i + 1}
                  </B.Text>
                  <TouchableOpacity onPress={() => removeExercise(i)}>
                    <Icons.X width={24} height={24} fill="red" />
                  </TouchableOpacity>
                </B.FlexRow>
                <Spacer h={2} />
                <S.CardView>
                  <B.FlexRow>
                    <B.FlexCol>
                      <CustomInput
                        value={exercise.tool}
                        // name="tool"
                        onChange={(e) => handlePostExercises(e, 'tool', i)}
                        variant="underline"
                        label="Tool"
                        placeholder="Barbell"
                      />
                    </B.FlexCol>
                    <Spacer w={40} />
                    <B.FlexCol>
                      <CustomInput
                        value={exercise.name}
                        // name="name"
                        onChange={(e) => handlePostExercises(e, 'name', i)}
                        variant="underline"
                        label="Movement"
                        placeholder="Row"
                      />
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={24} />
                  <B.FlexRow>
                    <B.FlexCol>
                      <CustomInput
                        value={exercise.exerciseType}
                        // name="exerciseType"
                        onChange={(e) =>
                          handlePostExercises(e, 'exerciseType', i)
                        }
                        variant="underline"
                        label="Exercise type"
                        placeholder="Strength"
                      />
                    </B.FlexCol>
                    <Spacer w={40} />
                    <B.FlexCol style={{ flex: 1 }}>
                      <CustomInput
                        label="Duration"
                        variant="underline"
                        placeholder="120s  s/m"
                        value={exercise.duration}
                        // name="duration"
                        onChange={(e) => handlePostExercises(e, 'duration', i)}
                      />
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={24} />
                  <B.FlexRow>
                    <B.FlexCol style={{ flex: 1 }}>
                      <CustomInput
                        label="Calories"
                        variant="underline"
                        placeholder="134"
                        value={exercise.calories}
                        // name="calories"
                        onChange={(
                          e: NativeSyntheticEvent<TextInputChangeEventData>
                        ) => handlePostExercises(e, 'calories', i)}
                      />
                    </B.FlexCol>
                    <Spacer w={40} />
                    <B.FlexCol>
                      <B.FlexRow
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                          // justifyContent: 'space-between',
                        }}
                      >
                        <B.Text
                          style={{
                            fontSize: 13,
                            paddingBottom: 4,
                            color: theme.neutral_2,
                            width: 67,
                          }}
                        >
                          Compound
                        </B.Text>
                        <Switch
                          value={exercise.compound}
                          // name="compound"
                          onValueChange={(e: boolean) =>
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
                            fontSize: 13,
                            paddingBottom: 4,
                            color: theme.neutral_2,
                            width: 67,
                          }}
                        >
                          Unilateral
                        </B.Text>
                        <Switch
                          value={exercise.unilateral}
                          // name="unilateral"
                          onValueChange={(e: boolean) =>
                            handlePostExercises(e, 'unilateral', i)
                          }
                        />
                      </B.FlexRow>
                    </B.FlexCol>
                  </B.FlexRow>
                  <Spacer h={24} />
                  <B.FlexRow>
                    <B.FlexCol>
                      <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                        Main muscle
                      </B.Text>
                      <TouchableOpacity
                        onPress={() => {
                          let toggle = toggleMuscle.mainMuscle === i ? null : i
                          setToggleMuscle({
                            mainMuscle: toggle,
                            secondaryMuscles: null,
                          })
                        }}
                        style={{
                          flexDirection: 'row',
                          borderBottomWidth: 2,
                          paddingLeft: 4,
                          paddingBottom: 2,
                          marginTop: 8,
                          borderColor: theme.primary.onColor,
                        }}
                      >
                        {mainMuscle[i].length > 1 ? (
                          <B.Text>{ucFirst(mainMuscle[i] as string)}</B.Text>
                        ) : (
                          <B.Text style={{ color: theme.placeholder }}>
                            Upper chest
                          </B.Text>
                        )}
                        <View style={{}}>
                          <Icons.CaretDown
                            style={{ marginLeft: 8 }}
                            width={24}
                            height={24}
                            fill={theme.primary.onColor}
                          />
                        </View>
                      </TouchableOpacity>
                    </B.FlexCol>

                    <Spacer w={40} />

                    <B.FlexCol>
                      <B.Text style={{ fontSize: 13, color: theme.neutral_2 }}>
                        Secondary muscles
                      </B.Text>
                      <TouchableOpacity
                        onPress={() => {
                          let toggle =
                            toggleMuscle.secondaryMuscles === i ? null : i
                          setToggleMuscle({
                            mainMuscle: null,
                            secondaryMuscles: toggle,
                          })
                        }}
                        style={{
                          flexDirection: 'row',
                          borderBottomWidth: 2,
                          paddingLeft: 4,
                          paddingBottom: 2,
                          marginTop: 8,
                          borderColor: theme.primary.onColor,
                        }}
                      >
                        {secondaryMuscles[i].length > 0 &&
                        arrayTextFormat(secondaryMuscles[i], 15) !== '...' ? (
                          <B.Text>
                            {arrayTextFormat(secondaryMuscles[i], 15)}
                          </B.Text>
                        ) : (
                          <B.Text style={{ color: theme.placeholder }}>
                            Triceps...
                          </B.Text>
                        )}
                        <View style={{}}>
                          <Icons.CaretDown
                            style={{ marginLeft: 8 }}
                            width={24}
                            height={24}
                            fill={theme.primary.onColor}
                          />
                        </View>
                      </TouchableOpacity>
                    </B.FlexCol>
                  </B.FlexRow>

                  {toggleMuscle.mainMuscle === i && (
                    <>
                      <Spacer h={12} />
                      <B.FlexRow style={{ flexWrap: 'wrap' }}>
                        {bodyParts.map((muscle) => (
                          <View key={muscle + i + 'primary'}>
                            <TouchableOpacity
                              onPress={() =>
                                handlePostMainMuscle(muscle as string, i)
                              }
                            >
                              <View
                                style={{
                                  borderColor:
                                    mainMuscle[i] === muscle
                                      ? theme.primary.onColor
                                      : theme.neutral_2,
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  paddingHorizontal: 8,
                                  paddingVertical: 2,
                                  marginVertical: 4,
                                  marginHorizontal: 2,
                                }}
                              >
                                <B.Text
                                  style={{
                                    color:
                                      mainMuscle[i] === muscle
                                        ? theme.primary.onColor
                                        : theme.neutral_2,
                                  }}
                                >
                                  {muscle && ucFirst(muscle)}
                                </B.Text>
                              </View>
                            </TouchableOpacity>
                            <Spacer w={8} />
                          </View>
                        ))}
                      </B.FlexRow>
                    </>
                  )}
                  {toggleMuscle.secondaryMuscles === i && (
                    <>
                      <Spacer h={12} />
                      <B.FlexRow style={{ flexWrap: 'wrap' }}>
                        {bodyParts.map((muscle) => (
                          <View key={muscle + i + 'secondary'}>
                            <TouchableOpacity
                              onPress={() =>
                                handlePostSecondaryMuscles(muscle as string, i)
                              }
                            >
                              <View
                                style={{
                                  borderColor: secondaryMuscles[i].includes(
                                    muscle
                                  )
                                    ? theme.primary.onColor
                                    : theme.neutral_2,
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  paddingHorizontal: 8,
                                  paddingVertical: 2,
                                  marginVertical: 4,
                                  marginHorizontal: 2,
                                }}
                              >
                                <B.Text
                                  style={{
                                    color: secondaryMuscles[i].includes(muscle)
                                      ? theme.primary.onColor
                                      : theme.neutral_2,
                                  }}
                                >
                                  {muscle && ucFirst(muscle)}
                                </B.Text>
                              </View>
                            </TouchableOpacity>
                            <Spacer w={8} />
                          </View>
                        ))}
                      </B.FlexRow>
                    </>
                  )}

                  <Spacer h={40} />
                  <View>
                    <B.FlexRow>
                      <Spacer w={24} />
                      <B.FlexCol />
                      <B.FlexCol style={{ alignItems: 'center' }}>
                        <B.Text
                          style={{
                            flex: 1,
                            fontSize: 13,
                            color: theme.neutral_2,
                          }}
                        >
                          WEIGHT
                        </B.Text>
                      </B.FlexCol>
                      <Spacer w={8} />
                      <B.FlexCol style={{ alignItems: 'center' }}>
                        <B.Text
                          style={{
                            flex: 1,
                            fontSize: 13,
                            color: theme.neutral_2,
                          }}
                        >
                          REPS
                        </B.Text>
                      </B.FlexCol>

                      <Spacer w={8} />
                      <B.FlexCol style={{ alignItems: 'center' }}>
                        <B.Text
                          style={{
                            flex: 1,
                            fontSize: 13,
                            color: theme.neutral_2,
                          }}
                        >
                          REST
                        </B.Text>
                      </B.FlexCol>
                      <Spacer w={8} />
                      <B.FlexCol style={{ alignItems: 'center' }}>
                        <B.Text
                          style={{
                            flex: 1,
                            fontSize: 13,
                            color: theme.neutral_2,
                          }}
                        >
                          TIME
                        </B.Text>
                      </B.FlexCol>
                      <Spacer w={8} />
                    </B.FlexRow>
                    {exercise.sets &&
                      exercise.sets.map((set, y) => (
                        <View key={JSON.stringify(set + String(y))}>
                          <B.FlexRow>
                            <TouchableOpacity
                              onPress={() => removeSet(i, y)}
                              style={{
                                width: 24,
                                justifyContent: 'center',
                              }}
                            >
                              <Icons.Dash width={24} height={24} fill="red" />
                            </TouchableOpacity>
                            <Spacer w={8} />
                            <B.FlexCol
                              style={{
                                justifyContent: 'center',
                              }}
                            >
                              <B.Text
                                style={{
                                  color: theme.neutral_2,
                                  // fontWeight: 'bold',
                                  fontSize: 13,
                                }}
                              >
                                SET {y + 1}:
                              </B.Text>
                            </B.FlexCol>
                            <B.FlexCol>
                              <CustomInput
                                variant="underline"
                                value={String(set.weight)}
                                // name="weight"
                                onChange={(
                                  e: NativeSyntheticEvent<
                                    TextInputChangeEventData
                                  >
                                ) => handlePostSets(e, 'weight', i, y)}
                                style={{
                                  flex: 1,
                                }}
                              />
                            </B.FlexCol>
                            <Spacer w={8} />
                            <B.FlexCol>
                              <CustomInput
                                variant="underline"
                                value={String(set.reps)}
                                // name="reps"
                                onChange={(e) =>
                                  handlePostSets(e, 'reps', i, y)
                                }
                                style={{
                                  flex: 1,
                                }}
                              />
                            </B.FlexCol>
                            <Spacer w={8} />
                            <B.FlexCol>
                              <CustomInput
                                variant="underline"
                                value={set.rest}
                                // name="rest"
                                onChange={(e) =>
                                  handlePostSets(e, 'rest', i, y)
                                }
                                style={{
                                  flex: 1,
                                }}
                              />
                            </B.FlexCol>
                            <Spacer w={8} />
                            <B.FlexCol>
                              <CustomInput
                                variant="underline"
                                value={set.time}
                                // name="time"
                                onChange={(e) =>
                                  handlePostSets(e, 'time', i, y)
                                }
                                style={{
                                  flex: 1,
                                }}
                              />
                            </B.FlexCol>
                          </B.FlexRow>
                          <Spacer h={8} />
                        </View>
                      ))}
                    <Spacer h={32} />
                    <B.FlexRow style={{ justifyContent: 'center' }}>
                      <CustomButton
                        title="Add Set"
                        onPress={() => addSet(i)}
                        icon="PlusCircle"
                        width="55%"
                        fontSize={16}
                      />
                    </B.FlexRow>
                    <Spacer h={12} />
                  </View>
                </S.CardView>
                <Spacer h={24} />
              </View>
            ))}
            <B.FlexRow style={{ justifyContent: 'center' }}>
              <CustomButton
                title="Add Exercise"
                onPress={addExercise}
                icon="PlusCircle"
                fontSize={16}
              />
            </B.FlexRow>
            {!isEdit && (
              <>
                <Spacer h={24} />
                <CustomButton title="Submit" onPress={submitForm} />
                <Spacer h={24} />
              </>
            )}
          </View>
        </S.BaseContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default WorkoutForm
