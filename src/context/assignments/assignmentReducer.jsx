/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ASSIGNMENT,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  BOARD_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // add an assignment to the array of state assignments
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };

    // find the current assignment from the array of state assignments and then add the current tested board to the array of boards
    case ADD_TESTED_BOARD_TO_ASSIGNMENT:
      const assignment = state.assignments.find(
        (assignment) => assignment.id === action.payload.assignmentId
      );
      assignment.boards = [...assignment.boards, action.payload.board];
      return {
        ...state,
      };

    // In case of an assignment error, show error
    case ASSIGNMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // In case of a board error, show error
    case BOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
