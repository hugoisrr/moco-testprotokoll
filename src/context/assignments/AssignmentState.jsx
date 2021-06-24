import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import { assignments } from '../../assignmentsData';
import { ADD_ASSIGNMENT, ADD_TESTED_BOARD_TO_ASSIGNMENT } from '../types';

const AssignmentState = (props) => {
  const initialState = { assignments };

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Add Assignment
  const addAssignment = (assignment) => {
    assignment.id = uuid();
    assignment.boards = [];
    dispatch({ type: ADD_ASSIGNMENT, payload: assignment });
  };

  // Add Board to an Assignment
  const addTestedBoardToAssignment = (testedBoard) => {
    console.dir(testedBoard);
    // dispatch({ type: ADD_TESTED_BOARD_TO_ASSIGNMENT, payload: testedBoard });
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
        addAssignment,
        addTestedBoardToAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
