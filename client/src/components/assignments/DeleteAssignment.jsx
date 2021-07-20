import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ModalDeleteAssignment from './ModalDeleteAssignment';

const DeleteAssignment = ({ assignmentId }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <OverlayTrigger
        overlay={<Tooltip id='tooltip-disable'>Auftrag löschen</Tooltip>}
      >
        <Link
          onClick={() => setModalShow(true)}
          style={{ color: 'red' }}
          to={'/'}
        >
          <i className='far fa-trash-alt fa-lg'></i>
        </Link>
      </OverlayTrigger>
      <ModalDeleteAssignment
        show={modalShow}
        onHide={() => setModalShow(false)}
        assignmentId={assignmentId}
      />
    </Fragment>
  );
};

export default DeleteAssignment;
