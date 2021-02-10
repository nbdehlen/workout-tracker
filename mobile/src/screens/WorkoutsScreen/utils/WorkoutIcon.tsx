import React, { FunctionComponent } from 'react'
import { Icons } from '../../../assets'
import theme from '../../../util/theme'

const workoutMatch = {
  gym: ['gym', 'workout', 'strength', 'weights'],
  run: ['running', 'run', 'jogging', 'jog', 'sprint', 'sprints'],
  cycle: ['cycle', 'cycling', 'bicycle', 'bicycling'],
}

const workoutTypeFinder = (workoutType) => {
  for (const [key, val] of Object.entries(workoutMatch)) {
    if (val.includes(workoutType.toLowerCase())) {
      return Icons[key.charAt(0).toUpperCase() + key.slice(1)]
    }
  }
  return Icons.Sport
}

type Props = {
  workoutType: string
}

const WorkoutIcon: FunctionComponent<Props> = ({ workoutType }) => {
  const Icon = workoutTypeFinder(workoutType)
  return (
    <>
      <Icon fill={theme.primary.onColor} height={36} width={36} />
    </>
  )
}

export default WorkoutIcon
