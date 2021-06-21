import React, { Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';

const BoardTests = () => {
  const { id } = useParams();
  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;
  const assignment = assignments.find((a) => a.id === parseInt(id));
  const columns = [
    {
      dataField: 'serialNumber',
      text: 'Seriennummern',
      sort: true,
    },
    {
      dataField: 'tester',
      text: 'Prüfer',
      sort: true,
    },
    {
      dataField: 'result',
      text: 'Ergebnis',
      sort: true,
    },
    {
      dataField: 'timestamp',
      text: 'Datum',
      sort: true,
    },
    {
      text: 'Protokoll',
    },
  ];

  return (
    <Fragment>
      <h1>Protokolltests der Auftrag {assignment.number}</h1>
      <BootstrapTable
        keyField='serialNumber'
        data={assignment.boards}
        columns={columns}
      />
    </Fragment>
  );
};

export default BoardTests;
