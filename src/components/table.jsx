import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Input from './input';
import ToDoModal from './modal'
import Moment from 'react-moment';
import 'moment-timezone';
import React, { useState, useEffect } from 'react';

const TodoTable = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [checked, setChecked] = useState(false);
    const [buttons, showButtons] = useState(false)
    const [show, setShow] = useState(false);
    const [thisTodo, setThisTodo] = useState("");

    
    const date = new Date();

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
    
    function getTodo() {
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

    const toggleCheck = (inputName) => {
      showButtons(!buttons)
      setChecked((prevState) => {
        const newState = { ...prevState };
        newState[inputName] = !prevState[inputName];
        return newState;
      });
    };
    
    const editTodos = (t) => {
      setThisTodo(t)
      setShow(true);
      if (todos[todos.indexOf(t)] === t ) {
        setThisTodo(t)
      }
      console.log(thisTodo, todos[todos.indexOf(thisTodo)], 'todoss')
    }

    const allChecked = (value) => {
      setIsChecked(value);
      
      setChecked((prevState) => {
        const newState = { ...prevState };
        for (const inputName in newState) {
          newState[inputName] = value;
        }
        return newState;
      });
    };


    useEffect(() => {
      let allChecked = true;
      for (const inputName in checked) {
        if (checked[inputName] === false) {
          allChecked = false;
        }
      }
      if (allChecked) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }, [checked]);

  return (
    <>
    <Input 
    handleChange={handleChange}
    value={todo || ""}
    getTodo={getTodo}
    filterTodos={filterTodos}
    />

    <Table id='todoTable'>
      <thead>
        <tr id='header'>
          <th>
          <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`}>
          <Form.Check 
            type={type}
            id='checkAll'
            label={`Select All Todos`}
            onChange={(e) => allChecked(e.target.checked)}
            checked={isChecked}
          />
        </div>
      ))}
    </Form>
        </th>
          <th>TO DO</th>
          {(isChecked  || checked) ? <><th>EDIT TODO</th><th>DELETE TODO</th></> :  null}
        </tr>
      </thead>
      <tbody>
        {todos.map((t) => (
        <tr key={todos.indexOf(t)} id={todos[todos.indexOf(t)]}>
          <ToDoModal
            thisTodo={thisTodo}
            id={`${todos[todos.indexOf(t)]}`}
            editTodos={editTodos}
            show={show}
            setShow={setShow}
          />
          <td>
        <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check 
            type={type}
            id={`${todos[todos.indexOf(t)]}`}
            label={`Select Todo From `}
            onChange={() => toggleCheck(t)}
            checked={checked[t]}
          />
          <Moment format="MM/DD/YYYY">{date}</Moment>
        </div>
      ))}
    </Form>
        </td>
        <td>{t}</td>
        {(isChecked || checked[t]) ? <>
        <td><Button variant="warning" onClick={() => editTodos(t)}>Edit</Button>{' '}</td>
        <td><Button variant="danger">Delete</Button>{' '}</td></> :  null}
        </tr>))}
      </tbody>
    </Table>
    </>
  );
}

export default TodoTable;