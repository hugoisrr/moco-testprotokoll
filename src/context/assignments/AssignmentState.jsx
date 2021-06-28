import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import { assignments } from '../../assignmentsData';
import {
  ADD_ASSIGNMENT,
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
      assignment.id = uuid();
      assignment.boards = [];
      dispatch({ type: ADD_ASSIGNMENT, payload: assignment });
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

    temperature = Number(temperature);
    voltageValue = Number(voltageValue);
    tester = Number(tester);

    testProtocol = booleanConverter(testProtocol);

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
        addTestedBoardToAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
