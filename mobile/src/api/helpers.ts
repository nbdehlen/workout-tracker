import React, { FunctionComponent } from 'react'
import { View, TextInput } from 'react-native'

const formAddSet = () => {}

export const workoutTemplate = {
  _id: '',
  type: '',
  start: '',
  grade: '',
  // exercises: [
  //   {
  //     exerciseType: '',
  //     name: '',
  //     compound: false,
  //     mainMuscle: '',
  //     secondaryMuscles: [''],
  //     tool: '',
  //     unilateral: false,
  //     sets: [{ weight: '0', reps: '0', rest: '', time: '' }],
  //     length: '',
  //     calories: '0',
  //   },
  // ],
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
      //   },
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

export const bodyParts = [
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
  'n/a',
]

const formDataBuilder = (workout: WorkoutData) => {
  // const { exercises } = workout
  // const { sets } = workout.exercises
}
