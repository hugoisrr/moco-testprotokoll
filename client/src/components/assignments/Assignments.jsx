import React, { Fragment, useEffect, useContext } from 'react';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { Spinner } from 'react-bootstrap';
import { columns } from './ColumnsAssignment';

const Assignments = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { assignments, getAssignments, clearAssignmentSelected } =
    assignmentContext;

  useEffect(() => {
    clearAssignmentSelected();
    getAssignments();
    // eslint-disable-next-line
  }, []);

  if (assignments !== null) {
    return (
      <Fragment>
        {assignments.length === 0 ? (
          <h4>Es gibt keine Aufträgen</h4>
        ) : (
          <BootstrapTable
            keyField='number'
            data={assignments}
            columns={columns}
          />
        )}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div className='d-flex justify-content-center'>
          <Spinner animation='grow' className='mt-4'></Spinner>
        </div>
      </Fragment>
    );
  }
};

export default Assignments;
