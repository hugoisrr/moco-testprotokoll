import React, { Fragment, useContext, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const Assignments = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;

  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Auftrag</th>
            <th>Platinentest</th>
            <th>Anzahl Tests</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <th>{assignment.number}</th>
              <th>
                <Button variant='primary' onClick={handleShow}>
                  <i className='fas fa-clipboard-list'></i> Tests
                </Button>
              </th>
              <th>{assignment.boards.length}</th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Assignments;
