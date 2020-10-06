type WorkoutData = {
  // data: [
  // {
  _id: string
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
      unilateral?: string
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
