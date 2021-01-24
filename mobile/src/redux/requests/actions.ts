import {
  FETCH_WORKOUTS,
  POST_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
} from './actionTypes'

export const fetchWorkouts = (token) => ({
  type: FETCH_WORKOUTS,
  request: {
    url: '/api/v1/user/workouts',
    method: 'GET',
    headers: { 'x-access-token': token },
  },
})

export const postNewWorkout = (token, workout) => ({
  type: POST_WORKOUT,
  request: {
    url: '/api/v1/user/workout',
    method: 'POST',
    headers: { 'x-access-token': token },
    data: workout,
  },
})

export const editWorkout = (id, token, workout) => {
  console.log(workout)
  return {
    type: EDIT_WORKOUT,
    request: {
      url: `/api/v1/user/workout/${id}`,
      method: 'PATCH',
      headers: { 'x-access-token': token },
      data: workout,
    },
  }
}

export const deleteWorkout = (id, token) => ({
  type: DELETE_WORKOUT,
  request: {
    url: `/api/v1/user/workout/${id}`,
    method: 'DELETE',
    headers: { 'x-access-token': token },
  },
})
