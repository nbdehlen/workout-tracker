// import React, { FunctionComponent, useState, useEffect } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native'
// import { Text, TextInput, TouchableOpacity, Button, View } from 'react-native'
// import { useDispatch, useSelector } from 'react-redux'
// import { workoutTemplate } from '../../api/helpers'
// import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'

// type OwnProps = WorkoutData
// type Props = OwnProps

// export const fffffffffffffff: FunctionComponent<Props> = () => {
//   const navigation = useNavigation()
//   const dispatch = useDispatch()
//   const route = useRoute()
//   const workout: WorkoutData = route.params
//   const user = useSelector((state) => state.user)
//   // const [postWorkout, setPostWorkout] = useState(workoutTemplate)

//   const initialValues = {
//     exercisesCount: '',
//     workout: workoutTemplate,
//   }

//   //add screens and stack for add and edit in stack navigation
//   // or navigate inside workoutDetails?ff

//   const onChangeExercises = (e, action, values, setValues) => {
//     //update dynamic form
//     const exercises = [...values.exercises]
//     const exercisesCount = e.nativeEvent.text || 0
//     const previousNumber = parseInt(field.value || '0')

//     if (action === 'ADD') {
//       exercises.push({
//         exerciseType: '',
//         name: '',
//         compound: false,
//         mainMuscle: '',
//         secondaryMuscles: [''],
//         tool: '',
//         unilateral: false,
//         sets: [{ weight: 0, reps: 0, rest: '', time: '' }],
//         length: '',
//         calories: 0,
//       })
//     } else {
//       for (let i = previousNumber; i >= exercisesCount; i--) {
//         exercises.splice(i, 1)
//       }
//     }
//     setValues({ ...values, exercises })
//     // call formik onChange method
//     // field.onChange(e)
//   }

//   const onSubmit = (fields) => {
//     // display form field values on success
//     // console.log('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
//     console.log(fields)
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={(values) => console.log(values)}
//     >
//       {({ errors, values, touched, setValues }) => (
//         <View>
//           {/* <Field name="exercisesCount">
//             {({ field }) => (
//               <select
//                 {...field}
//                 className={
//                   'form-control' +
//                   (errors.exercisesCount && touched.exercisesCount
//                     ? ' is-invalid'
//                     : '')
//                 }
//                 onChange={(e) => onChangeExercises(e, field, values, setValues)}
//               >
//                 <option value="" />
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
//                   <option key={i} value={i}>
//                     {i}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </Field> */}
//           <Button
//             title="ADD Field"
//             onPress={(e) => onChangeExercises(e, 'ADD', values, setValues)}
//           />

//           <ErrorMessage name="exercisesCount" />

//           <FieldArray name="exercises">
//             {() =>
//               values.workout.exercises.map((ex, i) => {
//                 // const exerciseErrors =
//                 //   (errors.workout.exercises?.length &&
//                 //     errors.workout.exercises[i]) ||
//                 //   {}
//                 // const exerciseTouched =
//                 //   (touched.workout.exercises?.length &&
//                 //     touched.workout.exercises[i]) ||
//                 //   {}
//                 return (
//                   <View key={i}>
//                     <Text>Exercise {i + 1}</Text>

//                     <Text>Name</Text>
//                     <TextInput
//                       name={ex.exerciseType}
//                       type="text"
//                       // className={
//                       //   'form-control' +
//                       //   (exerciseErrors.name && exerciseTouched.name
//                       //     ? ' is-invalid'
//                       //     : '')
//                       // }
//                     />
//                     <ErrorMessage
//                       name={`Exercises.${i}.name`}
//                       component="view"
//                       className="invalid-feedback"
//                     />

//                     {/* <View> */}
//                     <Text>Email</Text>
//                     <TextInput
//                       name={`Exercises.${i}.email`}
//                       type="text"
//                       // className={
//                       //   'form-control' +
//                       //   (exerciseErrors.exerciseType &&
//                       //   exerciseTouched.exerciseType
//                       //     ? ' is-invalid'
//                       //     : '')
//                       // }
//                     />
//                     <ErrorMessage
//                       name={`Exercises.${i}.email`}
//                       component="div"
//                       className="invalid-feedback"
//                     />
//                     {/* </View> */}
//                   </View>
//                 )
//               })
//             }
//           </FieldArray>

//           <Button onPress={onSubmit} title="Submit" />
//           {/* <button className="btn btn-secondary mr-1" type="reset">
//               Reset
//             </button> */}
//         </View>
//       )}
//     </Formik>
//   )
// }

// export default fffffffffff
