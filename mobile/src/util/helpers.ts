export const ucFirst = (str) => {
  if (!str) {
    return str
  }

  return str[0].toUpperCase() + str.slice(1)
}

export const calculcateTotalSets = (workout) => {
  let count = 0
  workout.exercises.map((exercise) => {
    count += exercise.sets.length
  })
  return count
}
