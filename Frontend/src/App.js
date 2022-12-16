import React from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import TodoCard from './components/reminder';

function App() {

  return (
    <>
      <Container className="container mt-5">
          <Row className="justify-content-md-center">
            <Col md="auto">
                <TodoCard />
          </Col>
        </Row>
    </Container>
  </>
  );
}

export default App;
