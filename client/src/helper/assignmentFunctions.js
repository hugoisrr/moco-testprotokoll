import { Link } from 'react-router-dom';
import DeleteAssignment from '../components/assignments/DeleteAssignment';

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
  return <DeleteAssignment assignmentId={cell} />;
}
