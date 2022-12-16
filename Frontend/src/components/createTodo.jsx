import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateTodo = ({ value, todos, todo, setTodos, setTodo }) => {
  
  function addTodo() {
    const todoArray = [...todos];

    if (!todo) {
      document.getElementById('todoInput').style.borderColor = 'red';
      document.getElementById('todoInput').classList = 'form-control shadow-none';
      return;
    } else {
      document.getElementById('todoInput').style.removeProperty('border-color');
      document.getElementById('todoInput').classList = 'form-control';
      if (todos.indexOf(todo) === -1) {
        todoArray.push(todo);
        setTodos(todoArray);
      }
    }
  }

  function filterTodos(t) {
    const table = document.getElementById('todoTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
      if (tr[i]) {
        if (tr[i].id.toLowerCase() === document.getElementById('todoInput').value.toLowerCase()) {
          tr[i].style.backgroundColor = 'rgb(184, 201, 204)';
        } else if (document.getElementById('todoInput').value === '') {
          tr[i].style.backgroundColor = '';
        } else if (tr[i].id.toLowerCase() !== document.getElementById('todoInput').value.toLowerCase()) {
          tr[i].style.backgroundColor = ''; 
        }
      }
    }
  }

  function handleChange(e) {
    const t = e.target.value;
    setTodo(t);
    filterTodos(t.toLowerCase())
  };

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

export default CreateTodo;


