import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UrgencySwitch from './urgency';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'moment-timezone';

const ToDoDetail = ({ todosB, thisTodo, show, setShow, editTodo, setEditTodo, editTodos }) => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState(thisTodo.due_date);
    
    const handleClose = (e) => {
        setShow(false);
        handleSubmit(e);
    };

    const updateToDo = e => {
        const fields = e.target.name;
        setEditTodo(existingVal => ({
            ...existingVal,
            [fields]: e.target.value,
            due_date: value,
        }));

        console.log(editTodo, 'update')
    }
    function toggleChecked() {
        setChecked(!checked);
        setEditTodo(existingVal => ({
            ...existingVal,
            isUrgent: checked
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        for (let i = 0; i < todosB.length; i++) {
          const index = todosB.indexOf(thisTodo);
          if (editTodo.todo_name === todosB[index].name) {
            return editTodos(editTodo, thisTodo);
          } else if (todosB[i].name !== editTodo.todo_name) {
            editTodos(editTodo, thisTodo);
          }else if (todosB[i].name === editTodo.todo_name) {
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
                name='name'
                type="text"
                placeholder={thisTodo.name}
                autoFocus
                onChange={updateToDo}
              />
              <br />
              {
              (thisTodo.due_date !== null) ? 
              <Form.Label>Current Due Date: {moment(thisTodo.due_date).format('L')}</Form.Label> :
              <Form.Label>Set Due Date: {moment(value).format('L')}</Form.Label>
              }
              <Calendar
                name='todo_date'
                defaultValue={(thisTodo.due_date !== null) ? new Date(thisTodo.due_date) : value}
                value={value}
                onChange={(value) => setValue(value)}
              />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>To Do Notes:</Form.Label>
              <Form.Control 
              as="textarea" 
              name='todo_detail'
              rows={3}
              placeholder={(thisTodo.todo_note === null) ? "No Important Details" : thisTodo.todo_note}
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