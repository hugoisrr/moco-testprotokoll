import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Assignments from '../assignments/Assignments';
import AssignmentForm from '../assignments/AssignmentForm';

const Home = () => {
  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <h1>Auftrag hinzufügen</h1>
              <AssignmentForm />
            </Col>
            <Col>
              <h3>Liste der Aufträge</h3>
              <Assignments />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
