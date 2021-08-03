/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ASSIGNMENT,
  GET_ASSIGNMENTS,
  GET_ASSIGNMENT,
  GET_STORAGE_PATH,
  CLEAR_ERROR,
  DELETE_ASSIGNMENT,
  CLEAR_ASSIGNMENT_SELECTED,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ADD_NEW_TESTED_BOARD_TO_ASSIGNMENT,
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

    // get file storage path from the server
    case GET_STORAGE_PATH:
      return {
        ...state,
        fileStoragePath: action.payload,
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

    // Add new board with its test to an assignment
    case ADD_NEW_TESTED_BOARD_TO_ASSIGNMENT:
      const assignmentSelected = state.assignmentSelected;
      assignmentSelected.boards = [
        ...assignmentSelected.boards,
        action.payload.board,
      ];
      return {
        ...state,
        assignmentSelected,
      };

    // Add new Test to a board that was already tested in an assignment
    case ADD_TESTED_BOARD_TO_ASSIGNMENT:
      const assignmentSel = state.assignmentSelected;
      assignmentSel.boards.map((board) => {
        if (board._id === action.payload.board._id) {
          board.testProtocols.push(action.payload.testProtocol);
        }
        return board;
      });
      return {
        ...state,
        assignmentSelected: assignmentSel,
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
