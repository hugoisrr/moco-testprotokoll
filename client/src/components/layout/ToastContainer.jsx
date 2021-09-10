import React, { useState, useContext, useEffect } from 'react';
import {
  ToastContainer as ToastContainerBootstrap,
  Toast,
} from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const ToastContainer = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { messageObject, clearMessage } = assignmentContext;
  const [show, setShow] = useState(false);

  useEffect(() => {
    messageObject.message !== null ? setShow(true) : setShow(false);
  }, [messageObject.message]);

  const closeToastMessage = () => {
    clearMessage();
    setShow(false);
  };

  const { type, message } = messageObject;

  const renderToastHeader = (variant) => {
    switch (variant) {
      case 'danger':
        return (
          <Toast.Header>
            <i
              className='fas fa-exclamation-triangle fa-lg'
              style={{ color: 'red' }}
            ></i>{' '}
            <strong className='me-auto'>Ops, es liegt ein Fehler vor!</strong>
          </Toast.Header>
        );

      case 'success':
        return (
          <Toast.Header>
            <i
              className='fas fa-check-circle fa-lg'
              style={{ color: 'green' }}
            ></i>{' '}
            <strong className='me-auto'>Erfolgsmeldung vom Server.</strong>
          </Toast.Header>
        );

      case 'info':
        return (
          <Toast.Header>
            <i
              className='fas fa-info-circle fa-lg'
              style={{ color: 'CornflowerBlue' }}
            ></i>{' '}
            <strong className='me-auto'>Information Meldung vom Server.</strong>
          </Toast.Header>
        );

      default:
        return '';
    }
  };

  return (
    <ToastContainerBootstrap
      className='p-3'
      position={'bottom-end'}
      style={{ zIndex: 11 }}
    >
      {show === true && (
        <Toast onClose={closeToastMessage} delay={6250} bg={type} autohide>
          {renderToastHeader(type)}
          <Toast.Body className={'text-white'}>
            Der Server hat folgende Nachricht gesendet:{' '}
            <strong>{message}</strong>
          </Toast.Body>
        </Toast>
      )}
    </ToastContainerBootstrap>
  );
};

export default ToastContainer;
