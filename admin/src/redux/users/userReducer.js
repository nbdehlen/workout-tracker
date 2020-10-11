import { IS_EDITING, CANCEL_EDITING } from './actionTypes';

const initialState = {
  isEditing: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_EDITING:
      // console.log('is editing');
      // console.log(state);
      console.log('action.payload userReducer', action.payload);
      return {
        ...action.payload,
        isEditing: true,
      };
    case CANCEL_EDITING:
      // console.log('is editing');
      // console.log(state);
      console.log('action.payload userReducer', action.payload);
      return {
        // ...action.payload,
        isEditing: false,
      };
    default:
      return state;
  }
};

export default userReducer;
