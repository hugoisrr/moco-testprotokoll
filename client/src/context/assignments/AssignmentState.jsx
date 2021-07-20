import React, { useReducer } from 'react';
import axios from 'axios';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  BOARD_ERROR,
  GET_ASSIGNMENTS,
} from '../types';
import {
  booleanConverter,
  testProtocolResult,
} from '../../helper/helperFunctions';

const AssignmentState = (props) => {
  const initialState = { assignments: null, error: null };

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Get List of Assignments, sorted by most resent
  const getAssignments = async () => {
    try {
      const res = await axios.get('/api/assignment');

      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  const getAssignmentSelected = (assignmentId) => {
    // return 'Hola';
    return state.assignments.filter(
      (assignment) => assignment._id === assignmentId
    );
  };

  // Add Assignment
  const addAssignment = async (assignment) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/assignment', assignment, config);

      dispatch({
        type: ADD_ASSIGNMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Assignment
  const deleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`/api/assignment/${assignmentId}`);
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
        error: state.error,
        addAssignment,
        getAssignments,
        getAssignmentSelected,
        deleteAssignment,
        addTestedBoardToAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
