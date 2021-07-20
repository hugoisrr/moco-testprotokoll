import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import DeleteAssignment from '../components/assignments/DeleteAssignment';

export function boardsNumberAssignment(boardsArray) {
  return boardsArray.length;
}

export function actionButtons(value, row, index) {
  // console.log({ value, row, index });
  return (
    <Row className='justify-content-center'>
      <Col md='auto'>
        <OverlayTrigger
          overlay={
            <Tooltip id='tooltip-disable'>Leiterplatten anzeigen</Tooltip>
          }
        >
          <Link to={`/boardTest/${value}`}>
            <i className='far fa-list-alt fa-lg'></i>
          </Link>
        </OverlayTrigger>
      </Col>
      <Col md='auto'>
        <DeleteAssignment assignmentId={value} assignmentNumber={row.number} />
      </Col>
    </Row>
  );
}
