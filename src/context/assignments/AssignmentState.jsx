import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import { assignments } from '../../assignmentsData';
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

const AssignmentState = (props) => {
  const initialState = { assignments };

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Add Assignment
  const addAssignment = (assignment) => {
    assignment.id = uuid();
    assignment.boards = [];
    dispatch({ type: ADD_ASSIGNMENT, payload: assignment });
  };
  // Delete Assignment
  // Update Assignment
  // Add Board
  // Set Current Board
  // Clear Current Board

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
        addAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
