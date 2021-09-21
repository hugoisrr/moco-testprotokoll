import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
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
  GET_ASSIGNMENTS,
  GET_ASSIGNMENT,
  GET_STORAGE_PATH,
  SET_STORAGE_PATH,
  CLEAR_MESSAGE,
  SET_MESSAGE,
  SET_TESTER,
  CLEAR_TESTER,
} from '../types';
import { booleanConverter } from '../../helper/helperFunctions';

const AssignmentState = (props) => {
  const initialState = {
    assignments: null,
    error: null,
    assignmentSelected: null,
    fileStoragePath: '',
    tester: '',
    messageObject: {
      type: null,
      message: null,
    },
  };

  const server = process.env.REACT_APP_SERVER_IP_ADDRESS; // server ip address

  const serverErrorMessage = (err) => {
    return {
      type: 'danger',
      message:
        err.response !== undefined ? err.response.data.message : 'Server Error',
    };
  };

  let history = useHistory();

  const [state, dispatch] = useReducer(assignmentReducer, initialState);

  // Get List of Assignments, sorted by most resent
  const getAssignments = async () => {
    try {
      const res = await axios.get(`${server}/api/assignment`);

      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
      });
    }
  };

  // Get file storage path from the server
  const getFileStoragePath = async () => {
    try {
      const res = await axios.get(`${server}/api/textFile`);

      dispatch({
        type: GET_STORAGE_PATH,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
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
        `${server}/api/textFile`,
        JSON.stringify({ filesLocationAddress }),
        config
      );

      dispatch({
        type: SET_STORAGE_PATH,
        payload: filesLocationAddress,
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
      });
    }
  };

  // Get Assignment selected by ID
  const getAssignmentById = async (assignmentId) => {
    try {
      const res = await axios.get(`${server}/api/assignment/${assignmentId}`);
      dispatch({
        type: GET_ASSIGNMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
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
      const res = await axios.post(
        `${server}/api/assignment`,
        assignment,
        config
      );

      dispatch({
        type: ADD_ASSIGNMENT,
        payload: res.data,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: {
          type: 'success',
          message: 'Neue Auftrag erstellt',
        },
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
      });
    }
  };

  // Clear error message from the server
  // FIXME delete method and error variable from the state
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR,
      payload: null,
    });
  };

  // Clear messages sent from the server
  const clearMessage = () => {
    dispatch({
      type: CLEAR_MESSAGE,
      payload: {
        type: null,
        message: null,
      },
    });
  };

  // Delete Assignment
  const deleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`${server}/api/assignment/${assignmentId}`);
      dispatch({
        type: DELETE_ASSIGNMENT,
        payload: assignmentId,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: {
          type: 'info',
          message: 'Auftrag gelöscht.',
        },
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
      });
    }
  };

  /* Set tester from ModelTestProtocol  */

  const setTester = (tester) => {
    try {
      if (tester !== '') {
        dispatch({
          type: SET_TESTER,
          payload: tester,
        });
      }
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
      });
    }
  };

  /* Clear tester -> '' when creates a New TestProtocol or changer of tester */

  const clearTester = () => {
    try {
      dispatch({
        type: CLEAR_TESTER,
        payload: '',
      });
    } catch (err) {
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
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
        `${server}/api/board/${assignmentId}`,
        boardData,
        config
      );
      // Add Testprotocol to the board
      const resTestProtocol = await axios.post(
        `${server}/api/test-protocol/${res.data.board._id}`,
        testProtocol,
        config
      );

      /**
       * if the Board added to the Assignment already exists, (meaning: that
       * the Board was already tested by its test failed or simply the Board
       * was tested again), then the type ADD_TESTED_BOARD_TO _ASSIGNMENT is fired,
       * else a new Board was created in the server and added to the Assignment
       * along with its test protocol.
       */

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

      // Set success message
      dispatch({
        type: SET_MESSAGE,
        payload: {
          type: 'success',
          message: 'Neues Testprotokoll hinzugefügt.',
        },
      });
    } catch (err) {
      /**
       * if status response is 406 'Not Acceptable',
       * (meaning that the serial number of the Board, doesn't
       * match with the Assignment number), then App redirects
       * to the Home page.
       */

      if (err.response.status === 406) {
        history.push('/');
      }
      dispatch({
        type: SET_MESSAGE,
        payload: serverErrorMessage(err),
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
        messageObject: state.messageObject,
        tester: state.tester,
        addAssignment,
        clearMessage,
        getAssignments,
        getAssignmentById,
        getFileStoragePath,
        setNewStoragePath,
        clearError,
        clearAssignmentSelected,
        deleteAssignment,
        addTestedBoardToAssignment,
        setTester,
        clearTester,
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentState;
