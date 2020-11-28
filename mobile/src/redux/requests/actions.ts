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
    url: 'http://10.0.2.2:5000/api/v1/user/workouts',
    method: 'GET',
    headers: { 'x-access-token': token },
  },
})

export const postNewWorkout = (token, workout) => ({
  type: POST_WORKOUT,
  request: {
    url: 'http://10.0.2.2:5000/api/v1/user/workout',
    method: 'POST',
    headers: { 'x-access-token': token },
    body: { workout },
  },
})

export const editWorkout = (id, token, workout) => ({
  type: EDIT_WORKOUT,
  request: {
    url: `http://10.0.2.2:5000/api/v1/user/workout/${id}`,
    method: 'PATCH',
    headers: { 'x-access-token': token },
    body: { workout },
  },
})

export const deleteWorkout = (id, token) => ({
  type: DELETE_WORKOUT,
  request: {
    url: `http://10.0.2.2:5000/api/v1/user/workout/${id}`,
    method: 'DELETE',
    headers: { 'x-access-token': token },
  },
})
