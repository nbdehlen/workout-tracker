import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  IS_EDITING,
  CANCEL_EDITING,
  CANCEL_EDIT,
} from './actionTypes';

// export const addUser = (post) => ({
//   type: ADD_POST,
//   payload: post,
// });

// export const deleteUser = (post) => ({
//   type: DELETE_POST,
//   payload: post,
// });

// export const editUser = (post) => ({
//   type: EDIT_POST,
//   payload: post,
// });

export const isEditing = (user) => ({
  type: IS_EDITING,
  payload: user,
});

export const cancelEditing = (user) => ({
  type: CANCEL_EDITING,
  payload: user,
});

// export const cancelEdit = (post) => ({
//   type: CANCEL_EDIT,
//   payload: post,
// });
