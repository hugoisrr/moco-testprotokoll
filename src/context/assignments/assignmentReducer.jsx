/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  ADD_BOARD,
  SET_CURRENT_BOARD,
  CLEAR_CURRENT_BOARD,
  FILTER_ASSIGNMENTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };
    default:
      return state;
  }
};
