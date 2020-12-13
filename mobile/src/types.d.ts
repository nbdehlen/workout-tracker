type CompleteWorkout = {
  _id?: string
  type?: string
  start?: string
  grade?: string
  exercises?: Exercise[]
  end?: string
}

type WorkoutData = {
  // data: [
  // {
  _id?: string
  type: string
  start: string
  grade?: string
  exercises?: [
    {
      exerciseType?: string
      name?: string
      compound?: boolean
      mainMuscle?: MainMuscle
      secondaryMuscles?: SecondaryMuscles
      tool?: string
      unilateral?: boolean
      sets?: [
        {
          weight?: number
          reps?: number
          rest?: string
          time?: string
        }
      ]
      duration?: string
      calories?: number
    }
  ]
  end?: string
  // }
  // ]
}

type Workout = {
  _id?: string
  type: string
  start: string
  grade?: string
  end?: string
}

type ExerciseObject = {
  exercises: Exercise[]
}

type Exercise = {
  exerciseType?: string
  name?: string
  compound?: boolean
  mainMuscle?: MainMuscle
  secondaryMuscles?: SecondaryMuscles
  tool?: string
  unilateral?: boolean
  duration?: string
  calories?: string
  sets?: Sets[]
}

type Sets = {
  weight?: string
  reps?: string
  rest?: string
  time?: string
}

type MainMuscle = string[]

type SecondaryMuscles = string[][]
