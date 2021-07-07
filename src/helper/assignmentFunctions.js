import { Link } from 'react-router-dom';
import ModalDeleteAssignment from './../components/assignments/ModalDeleteAssignment';

export function boardsNumberAssignment(boardsArray) {
  return boardsArray.length;
}

export function formatLinkTestsAssignment(cell) {
  return (
    <Link to={`/boardTest/${cell}`}>
      <i className='far fa-list-alt fa-lg'></i>
    </Link>
  );
}

export function formatLinkDeleteAssignment(cell) {
  return (
    <div>
      <Link to={`/`}>
        <span style={{ color: 'red' }}>
          <i className='far fa-trash-alt fa-lg'></i>
        </span>
      </Link>
      <ModalDeleteAssignment />
    </div>
  );
}
