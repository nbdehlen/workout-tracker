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

type Exercises = [
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
