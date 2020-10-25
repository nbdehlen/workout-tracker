import React, { FunctionComponent } from 'react'
import { View, TextInput } from 'react-native'

// SHOULD BE IN UTIL / HELPERS FORMHELPERS OR SMTN

const formAddSet = () => {}

export const workoutTemplate = {
  _id: '',
  type: '',
  start: '',
  grade: '',
  end: '',
}

export const exercisesTemplate = {
  exercises: [
    {
      exerciseType: 'general',
      name: '',
      compound: false,
      mainMuscle: '',
      secondaryMuscles: [''],
      tool: '',
      unilateral: false,
      sets: [{ weight: '0', reps: '0', rest: '', time: '' }],
      length: '',
      calories: '0',
    },
    {
      exerciseType: 'faaaaaaaaaaaaat',
      name: '',
      compound: false,
      unilateral: false,
      sets: [{ weight: '1000', reps: '0', rest: '', time: '' }],
    },
  ],
}

export const emptyExercise = {
  // exercises: [
  // {
  exerciseType: '',
  name: '',
  compound: false,
  mainMuscle: '',
  secondaryMuscles: [''],
  tool: '',
  unilateral: false,
  sets: [{ weight: '0', reps: '0', rest: '', time: '' }],
  length: '',
  calories: '0',
  // },
  // ],
}

export const emptySet = {
  weight: '0',
  reps: '0',
  rest: '',
  time: '',
}

export const bodyParts = [
  //REPLACE WITH KEY/VAL PAIRS
  'neck',
  'lats',
  'back',
  'quads',
  'hams',
  'calves',
  'biceps',
  'triceps',
  'forearms',
  'upper chest',
  'middle chest',
  'lower chest',
  'front delts',
  'middle delts',
  'rear delts',
  'traps',
  'glutes',
  'abs',
  'obliques',
  'select',
]

export const populateSecondaryMuscles = (exercises: any) => {
  let arr = []

  for (let i = 0; i < exercises.length; i++) {
    arr.push([])
  }
  return arr
}

const formDataBuilder = (workout: WorkoutData) => {
  // const { exercises } = workout
  // const { sets } = workout.exercises
}
