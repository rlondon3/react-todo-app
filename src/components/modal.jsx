import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UrgencySwitch from './radio';
import Calendar from 'react-calendar';
import Moment from 'react-moment';
import 'moment-timezone';

const ToDoModal = ({ thisTodo, show, setShow, func }) => {
    const [date, setDate] = useState(new Date());
    const [checked, setChecked] = useState(false)
    const [editTodo, setEditTodo] = useState({
        todo_name: "",
        todo_date: "",
        todo_note: "",
        isUrgent: ""
    });
    const handleClose = (e) => {
        setShow(false);
        handleSubmit(e)
    };
    func(editTodo)
   
    const updateToDo = e => {
        const fields = e.target.name;
        setEditTodo(existingVal => ({
            ...existingVal,
            [fields]: e.target.value,
            todo_date: date,
        }))
    }

    function toggleChecked() {
        setChecked(!checked);
        setEditTodo(existingVal => ({
            ...existingVal,
            isUrgent: checked
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(editTodo, 'edited')
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
                placeholder={(thisTodo) ? thisTodo : editTodo.todo_name}
                autoFocus
                onChange={updateToDo}
              />
              <br />
              <Form.Label>Due Date: <Moment format="MM/DD/YYYY">{date}</Moment></Form.Label>
              <Calendar
                name='todo_date'
                value={date}
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

export default ToDoModal;