import React, { Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { expandRowTestProtocol } from './ListTestProtocol';
import { columns } from './ColumnsTestProtocols';

const BoardTests = () => {
  const { id } = useParams();
  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;
  const { number, boards } = assignments.find((a) => a.id === id);

  if (boards !== null && boards.length === 0) {
    return (
      <Fragment>
        <h1>Protokolltests der Auftrag {number}</h1>
        <h4>Es gibt keine Tests</h4>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <h1>Protokolltests der Auftrag {number}</h1>
      <BootstrapTable
        keyField='serialNumber'
        data={boards}
        columns={columns}
        expandRow={expandRowTestProtocol}
      />
    </Fragment>
  );
};

export default BoardTests;
