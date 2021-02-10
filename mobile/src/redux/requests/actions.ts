import {
  FETCH_WORKOUTS,
  POST_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
} from './actionTypes'

export const fetchWorkouts = (xAccessToken) => ({
  type: FETCH_WORKOUTS,
  request: {
    url: '/api/v1/user/workouts',
    method: 'GET',
    headers: { 'x-access-token': xAccessToken },
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

export const editWorkout = (id, xAccessToken, workout) => ({
  type: EDIT_WORKOUT,
  request: {
    url: `/api/v1/user/workout/${id}`,
    method: 'PATCH',
    headers: { 'x-access-token': xAccessToken },
    data: workout,
  },
})

export const deleteWorkout = (id, xAccessToken) => ({
  type: DELETE_WORKOUT,
  request: {
    url: `/api/v1/user/workout/${id}`,
    method: 'DELETE',
    headers: { 'x-access-token': xAccessToken },
  },
})
