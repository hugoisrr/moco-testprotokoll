import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import { assignments } from '../../assignmentsData';
import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  BOARD_ERROR,
} from '../types';
import {
  booleanConverter,
  testProtocolResult,
} from '../../helper/helperFunctions';

const AssignmentState = (props) => {
  const initialState = { assignments };

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Add Assignment
  const addAssignment = (assignment) => {
    try {
      assignment.id = uuid(); // add a generic id to the assignment
      assignment.boards = []; // add an empty array of boards to the assignment
      dispatch({ type: ADD_ASSIGNMENT, payload: assignment });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Assignment
  const deleteAssignment = (assignmentId) => {
    try {
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: assignmentId,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Board to an Assignment
  const addTestedBoardToAssignment = ({
    activeDisplay,
    alarmSequence,
    assignmentId,
    functionKeyboard,
    hallSensors,
    increaseSpeedEngine,
    individualPhases,
    lightsUpLED,
    rotateShaft,
    serialNumber,
    switchCommutation,
    temperature,
    tester,
    voltageValue,
  }) => {
    // testProtocol Object created to be added to the new tested Board
    let testProtocol = {
      activeDisplay,
      lightsUpLED,
      alarmSequence,
      functionKeyboard,
      rotateShaft,
      hallSensors,
      individualPhases,
      switchCommutation,
      increaseSpeedEngine,
    };

    // Convert to numeric values
    temperature = Number(temperature);
    voltageValue = Number(voltageValue);
    tester = Number(tester);

    // Convert to boolean values
    testProtocol = booleanConverter(testProtocol);

    // Create new tested Board to be added to an assignment
    const board = {
      serialNumber,
      tester,
      timestamp: Math.round(+new Date() / 1000),
      result: testProtocolResult(testProtocol, temperature, voltageValue),
      testProtocol: { ...testProtocol, temperature, voltageValue },
    };

    try {
      dispatch({
        type: ADD_TESTED_BOARD_TO_ASSIGNMENT,
        payload: { board, assignmentId },
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
        addAssignment,
        deleteAssignment,
        addTestedBoardToAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
