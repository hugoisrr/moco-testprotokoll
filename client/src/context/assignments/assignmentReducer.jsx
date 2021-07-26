/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ASSIGNMENT,
  GET_ASSIGNMENTS,
  GET_ASSIGNMENT,
  CLEAR_ERROR,
  DELETE_ASSIGNMENT,
  CLEAR_ASSIGNMENT_SELECTED,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  BOARD_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    // get list of assignments added
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
      };

    // get assignment by Id
    case GET_ASSIGNMENT:
      return {
        ...state,
        assignmentSelected: action.payload,
        error: null,
      };

    case CLEAR_ASSIGNMENT_SELECTED:
      return {
        ...state,
        assignmentSelected: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // add an assignment to the array of state assignments
    case ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [action.payload, ...state.assignments],
      };

    // delete an assignment from the array of state assignments
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignments: state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        ),
      };

    // find the current assignment from the array of state assignments and then add the current tested board to the array of boards
    case ADD_TESTED_BOARD_TO_ASSIGNMENT:
      const assignment = state.assignments.find(
        (assignment) => assignment._id === action.payload.assignment._id
      );
      assignment.boards = [...assignment.boards, action.payload.board];
      return {
        ...state,
        assignmentSelected: assignment,
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
