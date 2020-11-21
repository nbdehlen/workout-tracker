import React, { FunctionComponent, useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Text, TextInput, TouchableOpacity, Button, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { workoutTemplate } from '../../api/helpers'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'

type OwnProps = Exercises[]

type Props = OwnProps

export const Exercises: FunctionComponent<Exercises> = (exercises) => {
  // fo
  return (
    <View>
      {exercises.map((exercise, i) => (
        <View key={i}>
          <TextInput value={exercise.exerciseType} />
          <TextInput value={exercise.name} />
          <TextInput value={exercise.compound} />
          <TextInput value={exercise.mainMuscle} />
          <TextInput value={exercise.secondaryMuscles} />
          <TextInput value={exercise.calories} />
          <TextInput value={exercise.tool} />
          <TextInput value={exercise.unilateral} />
          {exercise.sets.map((set, y) => (
            <View key={y}>
              <TextInput value={set.weight} />
              <TextInput value={set.reps} />
              <TextInput value={set.rest} />
              <TextInput value={set.time} />
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default Exercises
