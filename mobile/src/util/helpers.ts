export const ucFirst = (str: string): string => {
  if (!str) {
    return str
  } else if (str.length <= 1) {
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

export const arrayTextFormat = (arr: string[], cutOff = 100): string =>
  arr
    .map((s) => ucFirst(s))
    .join(', ')
    .slice(2, cutOff) + '...'
