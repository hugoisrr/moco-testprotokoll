import React, { useReducer } from 'react';
import axios from 'axios';
import AssignmentContext from './assignmentContext';
import assignmentReducer from './assignmentReducer';
import {
  ADD_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  CLEAR_ERROR,
  CLEAR_ASSIGNMENT_SELECTED,
  ADD_TESTED_BOARD_TO_ASSIGNMENT,
  ADD_NEW_TESTED_BOARD_TO_ASSIGNMENT,
  ASSIGNMENT_ERROR,
  PATH_NOT_VALID_ERROR,
  BOARD_ERROR,
  GET_ASSIGNMENTS,
  GET_ASSIGNMENT,
  GET_STORAGE_PATH,
  SET_STORAGE_PATH,
} from '../types';
import { booleanConverter } from '../../helper/helperFunctions';

const AssignmentState = (props) => {
  const initialState = {
    assignments: null,
    error: null,
    assignmentSelected: null,
    fileStoragePath: '',
  };

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
        payload: err,
      });
    }
  };

  // Get file storage path from the server
  const getFileStoragePath = async () => {
    try {
      const res = await axios.get('/api/textFile');

      dispatch({
        type: GET_STORAGE_PATH,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err,
      });
    }
  };

  // Set new storage path to a JSON file in the server
  const setNewStoragePath = async (filesLocationAddress) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post(
        '/api/textFile',
        JSON.stringify({ filesLocationAddress }),
        config
      );

      dispatch({
        type: SET_STORAGE_PATH,
        payload: filesLocationAddress,
      });
    } catch (error) {
      dispatch({
        type: PATH_NOT_VALID_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  // Get Assignment selected by ID
  const getAssignmentById = async (assignmentId) => {
    try {
      const res = await axios.get(`/api/assignment/${assignmentId}`);
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ASSIGNMENT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // before calling another assignment, we clear the previous assignment selected
  const clearAssignmentSelected = () => {
    dispatch({
      type: CLEAR_ASSIGNMENT_SELECTED,
      payload: null,
    });
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
        payload: err.response.data.message,
      });
    }
  };

  // Clear error message from the server
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
      payload: null,
    });
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
        payload: err,
      });
    }
  };

  // Add Board to an Assignment
  const addTestedBoardToAssignment = async ({
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

    testProtocol = {
      ...testProtocol,
      temperature,
      voltageValue,
      tester,
      assignmentId,
    };

    // Create new tested Board to be added to an assignment

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const boardData = { serialNumber };

    try {
      // Add board to boardsArray of Assignment
      const res = await axios.post(
        `/api/board/${assignmentId}`,
        boardData,
        config
      );
      // Add Testprotocol to the board
      const resTestProtocol = await axios.post(
        `/api/test-protocol/${res.data.board._id}`,
        testProtocol,
        config
      );

      res.data.boardExists
        ? dispatch({
            type: ADD_TESTED_BOARD_TO_ASSIGNMENT,
            payload: {
              board: resTestProtocol.data.board,
              testProtocol: resTestProtocol.data.testProtocol,
            },
          })
        : dispatch({
            type: ADD_NEW_TESTED_BOARD_TO_ASSIGNMENT,
            payload: {
              board: resTestProtocol.data.board,
            },
          });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments: state.assignments,
        error: state.error,
        assignmentSelected: state.assignmentSelected,
        fileStoragePath: state.fileStoragePath,
        addAssignment,
        getAssignments,
        getAssignmentById,
        getFileStoragePath,
        setNewStoragePath,
        clearError,
        clearAssignmentSelected,
        deleteAssignment,
        addTestedBoardToAssignment,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
