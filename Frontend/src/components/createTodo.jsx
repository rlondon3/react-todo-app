import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';

const CreateTodo = ({ preventDuplicates, filterTodos, todosB, setTodoB, addTodo }) => {

  function handleChange(e) {
    const t = e.target.value;
    const date = moment().format('L');
    const todoArr = {
      name: t,
      date_created: date
    };
    setTodoB(todoArr)
    filterTodos(t.toLowerCase())
  };

  function handleSubmit(e) {
    e.preventDefault();

    const input = document.getElementById('todoInput')
    const todosArray = [...todosB];

    for (let i = 0; i < todosArray.length; i++) {
      if (input.value === todosArray[i].name) {
        return preventDuplicates();
      }
    } 

    if (e.key === 'Enter') return input.value;
    input.value = '';
    addTodo()
    
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

export default CreateTodo;


