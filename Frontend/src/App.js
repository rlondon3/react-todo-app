import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logo from './img/logo192.png';
import moment from 'moment/moment';
import './App.css';
import Todos from './components/todos';
import CreateTodo from './components/createTodo';
import ToDoDetail from './components/todoDetail';

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [time, setTime] = useState(moment().format('LTS'));
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState();
  const [editTodo, setEditTodo] = useState({
    todo_name: "",
    todo_date: "",
    todo_note: "",
    isUrgent: ""
});
  //const [buttons, showButtons] = useState(false)
  
  const [thisTodo, setThisTodo] = useState("");
  const [date, setDate] = useState(new Date());
  
  const fetchTodos = () => {
    fetch("http://localhost:5001")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message));
  }

  const getThisTodo = (t) => {
    if (todos[todos.indexOf(t)] === t ) {
      setThisTodo(t)
      setShow(true);
      setThisTodo(t)
    }
  }

  const editTodos = (edited, orginTodo) => {
    let rows = document.getElementById('todoTable').rows;
    const index = todos.indexOf(orginTodo);
    for (let i = 0; i <= todos.length; i++) {
      if (edited.todo_name === todos[index] || edited.todo_name === "") {
        if (rows[i].id === orginTodo) {
          return rows[i].cells[1].innerHTML = `${orginTodo}`
        }
      } else if (todos[i] !== edited.todo_name) {
        if (rows[i].id === orginTodo) {
          let todosArray = [...todos];
          let index = todosArray.indexOf(orginTodo)
          
          rows[i].cells[1].innerHTML = edited.todo_name;
          todosArray.splice(index, 1, edited.todo_name);
          return setTodos(todosArray);
        }
      } else if (todos[i] === edited.todo_name) {
        return;
      }
    }
  }

  const updateToDo = e => {
    const fields = e.target.name;
    setEditTodo(existingVal => ({
        ...existingVal,
        [fields]: e.target.value,
        todo_date: date,
    }))
}

  const handleDelete = (t) => {
    const todosArray = [...todos]
    for (let i = 0; i <= t.length; i++) {
      const checkedTodo = document.getElementById('todoTable').rows[i + 1].children[0].children[0].children[0].children[0].children[0];
        if (checkedTodo.checked === true) {
          todosArray.forEach(t => {
            if (t === checkedTodo.id) {
              todosArray.splice(todosArray.indexOf(t), 1)
            }
          })
          setTodos(todosArray)
        }
    }
  }


    useEffect(() => {
        const timer = setInterval(() => setTime(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000 );

        return function cleanUp() {
            clearInterval(timer)
        }
      }, [time]);

    useEffect(() => {
      fetchTodos();
    }, [])

  return (
    <>
      <Container className="container mt-5">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card className="text-center">
                <Card.Header style={{ backgroundColor: '#61DBFB', fontSize: '20px', fontWeight: '700', color: 'white'}}>{time}</Card.Header>
                  <Card.Body>
                    <Card.Title><img src={logo} alt='Logo' style={{ width: 100, height: 100 }} /> To Do App</Card.Title>
                      <CreateTodo
                      value={todo || ""}
                      todo={todo}
                      todos={todos}
                      setTodo={setTodo}
                      setTodos={setTodos}
                      />
                      <ToDoDetail
                      date={date}
                      setDate={setDate} 
                      thisTodo={thisTodo}
                      todos={todos}
                      editTodos={editTodos}
                      editTodo={editTodo}
                      setEditTodo={setEditTodo}
                      updateToDo={updateToDo}
                      show={show}
                      setShow={setShow}
                      />
                      <Todos 
                      todos={todos}
                      date={date}
                      getThisTodo={getThisTodo}
                      />
                      <Button variant="danger" style={{backgroundColor: '#dc3545'}} onClick={() => handleDelete(todos)}>Delete</Button>
                  </Card.Body>
                <Card.Footer style={{ backgroundColor: '#61DBFB'}} className="text-muted">{backendMessage}</Card.Footer>
              </Card>
            </Col>
        </Row>
    </Container>
  </>
  );
}

export default App;
