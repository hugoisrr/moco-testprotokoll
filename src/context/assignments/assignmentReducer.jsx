/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ASSIGNMENT,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  BOARD_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };

    case ADD_TESTED_BOARD_TO_ASSIGNMENT:
      const assignment = state.assignments.find(
        (assignment) => assignment.id === action.payload.assignmentId
      );
      assignment.boards = [...assignment.boards, action.payload.board];
      return {
        ...state,
      };

    case ASSIGNMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case BOARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
