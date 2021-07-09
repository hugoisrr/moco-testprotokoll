import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { expandRowTestProtocol } from './ListTestProtocol';
import { columns } from './ColumnsTestProtocols';
import ModalTestProtocol from './ModalTestProtocol';

const BoardTests = () => {
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [newModal, setNewModal] = useState(false);

  useEffect(() => {
    if (newModal) {
      setModalShow(true);
    }
  }, [newModal]);

  const assignmentContext = useContext(AssignmentContext);
  const { assignments } = assignmentContext;
  const { number, boards } = assignments.find((a) => a.id === id);

  return (
    <Fragment>
      <Row className='justify-content-between mb-3'>
        <Col className='col-6'>
          <h2>Testprotokollen der Auftrag {number}</h2>
        </Col>
        <Col className='col-2'>
          <Button variant='outline-primary' onClick={() => setModalShow(true)}>
            Neuer Test
          </Button>
        </Col>
      </Row>
      {boards !== null && boards.length === 0 ? (
        <h4>Es gibt keine Tests</h4>
      ) : (
        <BootstrapTable
          keyField='serialNumber'
          data={boards}
          columns={columns}
          expandRow={expandRowTestProtocol}
        />
      )}
      <ModalTestProtocol
        show={modalShow}
        setNewModal={(value) => setNewModal(value)}
        onHide={() => setModalShow(false)}
        assignmentId={id}
      />
    </Fragment>
  );
};

export default BoardTests;
