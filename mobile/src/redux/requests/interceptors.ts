import { FETCH_WORKOUTS } from './actionTypes'

export const onRequest = (request, action, store) => {
  // store.dispatch(incrementRequestCounter());
  return request
}

export const onSuccess = (response, action, store) => {
  console.log('in onSuccess')
  // store.dispatch(incrementResponseCounter());
  return response
}

export const onError = async (error, action, store) => {
  console.log('in onError')
  if (
    error.response &&
    error.response.status === 404 &&
    action.type === FETCH_WORKOUTS
  ) {
    const response = await store.dispatch({
      // ...fetchWorkouts(),
      // Initially would fetch a error photo to display
      meta: { silent: true, runOnSuccess: false, runOnRequest: false },
    })

    if (response.data) {
      return { data: response.data }
    }
  }

  // store.dispatch(incrementErrorCounter());
  throw error
}
