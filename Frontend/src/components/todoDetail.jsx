import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UrgencySwitch from './urgency';
import Calendar from 'react-calendar';
import Moment from 'react-moment';
import 'moment-timezone';

const ToDoDetail = ({ todos, thisTodo, show, setShow, editTodo, setEditTodo, editTodos, date, setDate, updateToDo }) => {
    const [checked, setChecked] = useState(false);
    
    const handleClose = (e) => {
        setShow(false);
        handleSubmit(e);
    };

    function toggleChecked() {
        setChecked(!checked);
        setEditTodo(existingVal => ({
            ...existingVal,
            isUrgent: checked
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        for (let i = 0; i < todos.length; i++) {
          const index = todos.indexOf(thisTodo);
          if (editTodo.todo_name === todos[index]) {
            return editTodos(editTodo, thisTodo);
          } else if (todos[i] !== editTodo.todo_name) {
            editTodos(editTodo, thisTodo);
          }else if (todos[i] === editTodo.todo_name) {
            return alert('Todo Already Exists!');
          } 
        }
    }
      
  return (
    <>
      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>To Do Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
          onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>To Do:</Form.Label>
              <Form.Control
                name='todo_name'
                type="text"
                placeholder={thisTodo}
                autoFocus
                onChange={updateToDo}
              />
              <br />
              <Form.Label>Due Date: <Moment format="MM/DD/YYYY" utc>{editTodo.date}</Moment></Form.Label>
              <Calendar
                name='todo_date'
                value={new Date(editTodo.date)}
                onChange={setDate}
              />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>To Do Notes:</Form.Label>
              <Form.Control 
              as="textarea" 
              name='todo_note'
              rows={3}
              placeholder={editTodo.todo_note}
              onChange={updateToDo}
               />
            </Form.Group>
          </Form>
          <UrgencySwitch
          handleChange={toggleChecked}
          updateToDo={updateToDo}
          value={checked}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save To Do
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToDoDetail;