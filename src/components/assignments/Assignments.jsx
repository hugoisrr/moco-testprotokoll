import React, { Fragment, useContext } from 'react';
import { Table } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';
import { Link } from 'react-router-dom';

const Assignments = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;

  if (assignments !== null && assignments.length === 0) {
    return <h4>Es gibt keine Aufträgen</h4>;
  }

  return (
    <Fragment>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th className='text-center'>Auftrag</th>
            <th className='text-center'>Anzahl Tests</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <th className='text-center'>{assignment.number}</th>
              <th className='text-center'>{assignment.boards.length}</th>
              <th className='text-center'>
                <Link to={`/boardTest/${assignment.id}`}>
                  <i className='far fa-list-alt fa-lg'></i>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Assignments;
