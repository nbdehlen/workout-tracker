import React, { FunctionComponent } from 'react'
import { View, TextInput } from 'react-native'

const formAddSet = () => {}

export const workoutTemplate = {
  _id: '',
  type: '',
  start: '',
  grade: '',
  exercises: [
    {
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
    },
  ],
  end: '',
}

export const exercisesTemplate = {
  exercises: [
    {
      exerciseType: 'general',
      name: '',
      compound: 'false',
      mainMuscle: '',
      secondaryMuscles: [''],
      tool: '',
      unilateral: 'false',
      sets: [{ weight: '0', reps: '0', rest: '', time: '' }],
      length: '',
      calories: '0',
      //   },
    },
    {
      exerciseType: 'faaaaaaaaaaaaat',
      name: '',
      compound: false,
    },
  ],
}

const formDataBuilder = (workout: WorkoutData) => {
  // const { exercises } = workout
  // const { sets } = workout.exercises
}
