import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
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
  const assignmentContext = useContext(AssignmentContext);
  const { assignmentSelected, getAssignmentById, error } = assignmentContext;

  useEffect(() => {
    getAssignmentById(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (newModal) {
      setModalShow(true);
    }
  }, [newModal]);

  console.log({ assignmentSelected });

  if (assignmentSelected === null && error === null) {
    return (
      <BoardTestsContent>
        <div className='d-flex justify-content-center'>
          <Spinner animation='grow' className='mt-4'></Spinner>
        </div>
      </BoardTestsContent>
    );
  } else if (error !== null) {
    return (
      <BoardTestsContent>
        <Row className='justify-content-center'>
          <Col lg='7'>
            <Alert variant='danger'>
              <Alert.Heading>Fehler vom Server.</Alert.Heading>
              <p>
                Der Server hat versucht, die Daten mit der ID <b>{id}</b>{' '}
                abzurufen, hat aber folgenden Fehler gefunden: <b>{error}</b>
              </p>
              <hr />
              <p className='mb-0'>
                Bitte wenden Sie sich an den Administrator.
              </p>
            </Alert>
          </Col>
        </Row>
      </BoardTestsContent>
    );
  } else {
    const { number, boards } = assignmentSelected;
    return (
      <Fragment>
        <Row className='justify-content-between mb-3'>
          <Col className='col-6'>
            <h2>
              Testprotokollen der Auftrag - <b>{number}</b>
            </h2>
          </Col>
          <Col className='col-2'>
            <Button
              variant='outline-primary'
              onClick={() => setModalShow(true)}
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
  }
};

const BoardTestsContent = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default BoardTests;
