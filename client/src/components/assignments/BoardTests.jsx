import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AssignmentContext from '../../context/assignments/assignmentContext';
import BootstrapTable from 'react-bootstrap-table-next';
import { tableTestProtocols } from './TableTestProtocols';
import { columns } from './ColumnsSerialNumber';
import ModalTestProtocol from './ModalTestProtocol';

const BoardTests = () => {
  const { id } = useParams();
  const [modalTestProtocolShow, setModalTestProtocolShow] = useState(false);
  const [newModalTestProtocol, setNewModalTestProtocol] = useState(false);
  const assignmentContext = useContext(AssignmentContext);
  const { assignmentSelected, getAssignmentById } = assignmentContext;

  useEffect(() => {
    getAssignmentById(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newModalTestProtocol) {
      setModalTestProtocolShow(true);
    }
  }, [newModalTestProtocol]);

  if (assignmentSelected === null) {
    return (
      <BoardTestsContent>
        <div className='d-flex justify-content-center'>
          <Spinner animation='grow' className='mt-4'></Spinner>
        </div>
      </BoardTestsContent>
    );
  } else {
    const { number, boards } = assignmentSelected;
    return (
      <BoardTestsContent>
        <Row className='justify-content-between mb-3'>
          <Col className='col-6'>
            <h2>
              Testprotokolle des Auftrags - <b>{number}</b>
            </h2>
          </Col>
          <Col className='col-2'>
            <Button
              variant='outline-primary'
              onClick={() => setModalTestProtocolShow(true)}
            >
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
            expandRow={tableTestProtocols}
          />
        )}
        <ModalTestProtocol
          show={modalTestProtocolShow}
          setNewModal={(value) => setNewModalTestProtocol(value)}
          onHide={() => setModalTestProtocolShow(false)}
          assignmentId={id}
        />
      </BoardTestsContent>
    );
  }
};

const BoardTestsContent = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default BoardTests;
