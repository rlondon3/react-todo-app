import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Input = ({ handleChange, value, addTodo }) => {
  
  function handleSubmit(e) {
    e.preventDefault();
    addTodo();
    
    if (e.key === 'Enter') return value;
    document.getElementById('todoInput').value = '';
  }
  return (
    <>
    <Container className="container">
      <Row className="justify-content-md-center">
        <Col md="auto">
      <Form
      onSubmit={(e) => handleSubmit(e)}
      >
      <InputGroup className="my-3">
        <Form.Control
          id='todoInput'
          variant='warning'
          placeholder="Enter A Todo"
          aria-label="Todo"
          aria-describedby="basic-addon1"
          onChange={(e) => handleChange(e)}
        />
      </InputGroup>
      </Form>
      </Col>
      </Row>
      </Container>
    </>
  );
}

export default Input;


