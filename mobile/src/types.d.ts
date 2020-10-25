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
      mainMuscle?: string
      secondaryMuscles?: string[]
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
      length?: string
      calories?: number
    }
  ]
  end?: string
  // }
  // ]
}

type ExerciseObject = {
  exercises: Exercise[]
}

type Exercise = {
  exerciseType?: string
  name?: string
  compound?: boolean
  mainMuscle?: string
  secondaryMuscles?: string[]
  tool?: string
  unilateral?: boolean
  length?: string
  calories?: string
  sets?: Sets[]
}

type Sets = {
  weight?: string
  reps?: string
  rest?: string
  time?: string
}
