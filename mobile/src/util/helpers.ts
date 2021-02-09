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

export const arrayTextFormat = (arr: string[], cutOff = 100): string => {
  let returnStr = ''

  arr.map((str, i) => {
    if (returnStr.length + 3 <= cutOff && arr.length - 1 === i) {
      returnStr += '...'
    } else if (returnStr.length + str.length <= cutOff) {
      if (
        arr.length - 1 !== i &&
        returnStr.length + str.length + arr[i + 1].length <= cutOff
      ) {
        returnStr += ucFirst(str) + ', '
      } else if (
        arr.length - 1 !== i &&
        returnStr.length + str.length <= cutOff
      ) {
        returnStr += ucFirst(str)
      }
    }
  })

  return returnStr
}
