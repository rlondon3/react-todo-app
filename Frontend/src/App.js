import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import logo from './img/logo192.png';
import moment from 'moment/moment';
import axios from 'axios';
import './App.css';
import Todos from './components/todos';
import CreateTodo from './components/createTodo';
import ToDoDetail from './components/todoDetail';

function App() {
  const initialState = {
    date_created: "",
    due_date: "",
    is_urgent: "",
    name: "",
    todo_detail: "",
    id: ""
  };
  
  const [time, setTime] = useState(moment().format('LTS'));
  const [show, setShow] = useState(false);
  const [todosB, setTodosB] = useState([]);
  const [todoB, setTodoB] = useState("");
  const [editTodo, setEditTodo] = useState("");
  //const [buttons, showButtons] = useState(false)
  
  const [thisTodo, setThisTodo] = useState("");
  
  
  const addTodo = () => {
    const todosArrayB = [...todosB]
      if (todosB.indexOf(todoB) === -1) {
        todosArrayB.push(todoB);
        setTodosB(todosArrayB);
        if (todoB !== "" ){
          axios.post('http://localhost:5001/api/todos', {
            name: todoB.name,
          })
          .then(function (response) {
            console.log(response.status, 'To Do Added!');
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }
    

  const getThisTodo = (t) => {
    if (todosB[todosB.indexOf(t)] === t ) {
      setShow(true);
      setThisTodo(t)
    }
  }

  const editTodos = (edited, orginTodo) => {
    let rows = document.getElementById('todoTable').rows;
    const index = todosB.indexOf(orginTodo);
    for (let i = 0; i <= todosB.length; i++) {
      if (edited.todo_name === todosB[index].name || edited.todo_name === "") {
        if (rows[i].id === orginTodo) {
          return rows[i].cells[1].innerHTML = `${orginTodo}`
        }
      } else if (todosB[i].name !== edited.todo_name) {
        if (rows[i].id === orginTodo) {
          let todosArray = [...todosB];
          let index = todosArray.indexOf(orginTodo)
          
          rows[i].cells[1].innerHTML = edited.todo_name;
          todosArray.splice(index, 1, edited.todo_name);
          return setTodosB(todosArray);
        }
      } else if (todosB[i].name === edited.todo_name) {
        return;
      }
    }
  }

  const handleDelete = (t) => {
    const todosArray = [...todosB]
    for (let i = 0; i <= t.length; i++) {
      const checkedTodo = document.getElementById('todoTable').rows[i + 1].children[0].children[0].children[0].children[0].children[0];
        if (checkedTodo.checked === true) {
          todosArray.forEach(t => {
            if (t === checkedTodo.id) {
              todosArray.splice(todosArray.indexOf(t), 1)
            }
          })
          setTodosB(todosArray)
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
      async function fetchTodos() {
        try {
          const response = await axios.get("http://localhost:5001/api/todos");
          const fetchedTodosB = [...todosB];  

          response.data.forEach((todo) => {
            fetchedTodosB.push({
              id: todo._id,
              name: todo.name,
              date_created: todo.date_created,
              todo_note: (!todo.todo_detail) ? null : todo.todo_detail,
              due_date: (!todo.due_date) ? null : todo.due_date,
              isUrgent: (!todo.is_urgent) ? null : todo.is_urgent,
            });
          });
          
          setTodosB(fetchedTodosB);
        } catch (error) {
          console.error(error);
        }
      }

      fetchTodos();
      // eslint-disable-next-line
    }, []); 

  return (
    <>
    {initialState && (
      <Container className="container mt-5">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card className="text-center">
                <Card.Header style={{ backgroundColor: '#61DBFB', fontSize: '20px', fontWeight: '700', color: 'white'}}>{time}</Card.Header>
                  <Card.Body>
                    <Card.Title><img src={logo} alt='Logo' style={{ width: 100, height: 100 }} /> To Do App</Card.Title>
                      <CreateTodo
                      value={todoB || ""}
                      todoB={todoB}
                      setTodoB={setTodoB}
                      addTodo={addTodo}
                      />
                      <ToDoDetail
                      thisTodo={thisTodo}
                      todosB={todosB}
                      editTodos={editTodos}
                      editTodo={editTodo}
                      setEditTodo={setEditTodo}
                      show={show}
                      setShow={setShow}
                      />
                      <Todos 
                      todosB={todosB}
                      editTodo={editTodo}
                      getThisTodo={getThisTodo}
                      />
                      <Button variant="danger" style={{backgroundColor: '#dc3545'}} onClick={() => handleDelete(todosB)}>Delete</Button>
                  </Card.Body>
                <Card.Footer style={{ backgroundColor: '#61DBFB'}} className="text-muted">Hello</Card.Footer>
              </Card>
            </Col>
        </Row>
    </Container>
    )}
  </>
  );
}

export default App;
