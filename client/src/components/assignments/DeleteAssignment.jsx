import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// import AssignmentContext from '../../context/assignments/assignmentContext';
import ModalDeleteAssignment from './ModalDeleteAssignment';

const DeleteAssignment = ({ assignmentId }) => {
  const [modalShow, setModalShow] = useState(false);

  // const assignmentContext = useContext(AssignmentContext);
  return (
    <Fragment>
      <Link
        onClick={() => setModalShow(true)}
        style={{ color: 'red' }}
        to={'/'}
      >
        <i className='far fa-trash-alt fa-lg'></i>
      </Link>
      <ModalDeleteAssignment
        show={modalShow}
        onHide={() => setModalShow(false)}
        assignmentId={assignmentId}
      />
    </Fragment>
  );
};

export default DeleteAssignment;
