import constants from '../../api/constants'
import {
  FETCH_WORKOUTS,
  POST_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
} from './actionTypes'

//had issues setting baseURL, will try something different later
//304 not modified every fkn time
export const fetchWorkouts = (token) => ({
  type: FETCH_WORKOUTS,
  // headers: { 'x-access-token': token },
  request: {
    url: `${constants.baseUrl}/api/v1/user/workouts`,
    method: 'GET',
    headers: { 'x-access-token': token },
  },
})

export const postNewWorkout = (token, workout) => ({
  type: POST_WORKOUT,
  request: {
    url: `${constants.baseUrl}/api/v1/user/workout`,
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
      url: `${constants.baseUrl}/api/v1/user/workout/${id}`,
      method: 'PATCH',
      headers: { 'x-access-token': token },
      data: workout,
    },
  }
}

export const deleteWorkout = (id, token) => ({
  type: DELETE_WORKOUT,
  request: {
    url: `${constants.baseUrl}/api/v1/user/workout/${id}`,
    method: 'DELETE',
    headers: { 'x-access-token': token },
  },
})
