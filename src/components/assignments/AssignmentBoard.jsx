import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';

const AssignmentBoard = ({ assignment }) => {
  const { number, boards } = assignment;
  return (
    <Fragment>
      <Card>
        <Card.Header as='h5'>{number}</Card.Header>
        <Card.Body>
          <Card.Title>Leiterplattentests</Card.Title>
          {/* <Button variant="primary">Neuer test</Button> */}
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default AssignmentBoard;
