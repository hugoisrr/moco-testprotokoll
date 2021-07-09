import React, { Fragment, useContext } from 'react';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns } from './ColumnsAssignment';

const Assignments = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;

  return (
    <Fragment>
      {assignments !== null && assignments.length === 0 ? (
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
};

export default Assignments;
