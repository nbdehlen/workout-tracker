import { FETCH_WORKOUTS } from './actionTypes'

export const fetchWorkouts = (token) => ({
  type: FETCH_WORKOUTS,
  // headers: { 'x-access-token': token },
  request: {
    url: 'http://10.0.2.2:5000/api/v1/user/workouts',
    method: 'GET',
    headers: { 'x-access-token': token },
  },
})
