import React, { useReducer } from 'react';
import uuid from 'uuid';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
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
  const initialState = {
    assignments: [
      {
        assignmentNumber: '27617.30.001',
        boards: [
          {
            serialNumber: 'D500-0157_AC_27617-00248',
            timestamp: '1623929054965',
            tester: 465,
            result: 'NG',
          },
          {
            serialNumber: 'D500-0157_AC_27617-00249',
            timestamp: '1623929190620',
            tester: 465,
            result: 'OK',
          },
        ],
      },
      {
        assignmentNumber: '27618.30.001',
        boards: [
          {
            serialNumber: 'D500-0157_AC_27618-00248',
            timestamp: '1623929430931',
            tester: 465,
            result: 'NG',
          },
          {
            serialNumber: 'D500-0157_AC_27618-00249',
            timestamp: '1623929436195',
            tester: 465,
            result: 'OK',
          },
        ],
      },
    ],
  };

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Add Assignment
  // Delete Assignment
  // Update Assignment
  // Add Board
  // Set Current Board
  // Clear Current Board

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
