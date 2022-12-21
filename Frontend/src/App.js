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
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(moment().format('LTS'));
  const [show, setShow] = useState(false);
  const [todosB, setTodosB] = useState([]);
  const [todoB, setTodoB] = useState("");
  const [checked, setChecked] = useState(false);
  
  const [thisTodo, setThisTodo] = useState("");
  
  function checkInput(inputId) {
    if (!todoB) {
      document.getElementById(`${inputId}`).style.borderColor = 'red';
      document.getElementById(`${inputId}`).classList = 'form-control shadow-none';
      return;
    } else {
      document.getElementById(`${inputId}`).style.removeProperty('border-color');
      document.getElementById(`${inputId}`).classList = 'form-control';
    }
  }

  function preventDuplicates() {
    const todosArray = [...todosB];
    for (let i = 0; i < todosArray.length; i++) {
      if (document.getElementById('todoInput').value === todosArray[i].name) {
        return alert('This To Do already exists. Please use another name.');
      } 
      if (todosArray[i].id !== thisTodo.id) {
        if (todosArray[i].name === thisTodo.name) {
          return alert('This To Do already exists. Please use another name.');
        }
      }
    }
    //addTodo();
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

    const updateToDo = e => {
     
    }
    const handleUpdate = () => {
      const todosArray = [...todosB]
      const index = todosArray.findIndex(obj => obj.id === thisTodo.id);
      console.log(thisTodo.due_date, todosArray[index].due_date)
      if (todosArray[index].name !== thisTodo.name || 
        todosArray[index].due_date !== thisTodo.due_date ||
        todosArray[index].todo_note !== thisTodo.todo_note ||
        todosArray[index].is_urgent !== thisTodo.is_urgent) {
          axios.put(`http://localhost:5001/api/todos/${thisTodo.id}`, {
            name: thisTodo.name,
            due_date: thisTodo.due_date,
            todo_detail: thisTodo.todo_note,
            is_urgent: thisTodo.is_urgent
          })
          .then(function (response) {
            console.log(response.status, 'To Do Updated!');
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }
    const handleDelete = (t) => {
      const todosArray = [...todosB]
      for (let i = 0; i <= t.length; i++) {
        const checkedTodo = document.getElementById('todoTable').rows[i + 1].children[0].children[0].children[0].children[0].children[0];
        console.log(checkedTodo, 'checked')
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
              is_urgent: (!todo.is_urgent) ? null : todo.is_urgent,
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
                      todoB={todoB}
                      todosB={todosB}
                      filterTodos={filterTodos}
                      setTodoB={setTodoB}
                      addTodo={addTodo}
                      preventDuplicates={preventDuplicates}
                      />
                      <ToDoDetail
                      value={value}
                      checked={checked}
                      thisTodo={thisTodo}
                      setThisTodo={setThisTodo}
                      todosB={todosB}
                      setTodosB={setTodosB}
                      show={show}
                      setChecked={setChecked}
                      setValue={setValue}
                      setShow={setShow}
                      checkInput={checkInput}
                      updateToDo={updateToDo}
                      preventDuplicates={preventDuplicates}
                      handleUpdate={handleUpdate}
                      />
                      <Todos 
                      todosB={todosB}
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
