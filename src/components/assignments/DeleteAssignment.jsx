import React, { Fragment, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AssignmentContext from '../../context/assignments/assignmentContext';
import ModalDeleteAssignment from './ModalDeleteAssignment';

const DeleteAssignment = () => {
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);

  const assignmentContext = useContext(AssignmentContext);
  return (
    <Fragment>
      <Link to={`/`}>
        <span style={{ color: 'red' }}>
          <i className='far fa-trash-alt fa-lg'></i>
        </span>
      </Link>
      <ModalDeleteAssignment
        show={modalShow}
        onHide={() => setModalShow(false)}
        assignmentId={id}
      />
    </Fragment>
  );
};

export default DeleteAssignment;
