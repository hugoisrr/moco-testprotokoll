/* eslint-disable import/no-anonymous-default-export */
import { ADD_ASSIGNMENT, ADD_TESTED_BOARD_TO_ASSIGNMENT } from '../types';

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
