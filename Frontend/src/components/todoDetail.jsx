import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UrgencySwitch from './urgency';
import Calendar from 'react-calendar';
import moment from 'moment/moment';
import 'moment-timezone';

const ToDoDetail = ({ value, checked, todosB, thisTodo, show, setShow, setChecked, setThisTodo, setTodosB, setValue, preventDuplicates, checkInput, updateToDo, handleUpdate}) => {
    
    const handleClose = (e) => {
        setShow(false);
    };
    
    function onChange (e) {
      const fields = e.target.name;
      setChecked(!checked);
      setThisTodo(existingVal => ({
          ...existingVal,
          [fields]: e.target.value,
          due_date: value,
          is_urgent: !checked
      }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        
        const input = document.getElementById('updateName');
        const id = input.id
        const todosArray = [...todosB];
        const index = todosArray.findIndex(obj => obj.id === thisTodo.id);

        for (let i = 0; i < todosArray.length; i++) {
          if (todosArray[i].id !== thisTodo.id) {
            if (todosArray[i].name === thisTodo.name) {
              preventDuplicates();
              return checkInput(id);
            }
          }
        }
        handleUpdate();
        todosArray.splice(index, 1, thisTodo);
        setTodosB(todosArray);
        handleClose(e);
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
            <Form.Group className="mb-3" controlId="updateName">
              <Form.Label>To Do:</Form.Label>
              <Form.Control
                name='name'
                type="text"
                placeholder={thisTodo.name}
                autoFocus
                onChange={onChange}
              />
              <br />
              {
              (thisTodo.due_date !== null) ? 
              <Form.Label>Current Due Date: {moment(thisTodo.due_date).format('L')}</Form.Label> :
              <Form.Label>Set Due Date: {moment(value).format('L')}</Form.Label>
              }
              <Calendar
                name='todo_date'
                //defaultValue={(thisTodo.due_date !== null) ? new Date(thisTodo.due_date) : value}
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
              name='todo_note'
              rows={3}
              placeholder={(thisTodo.todo_note === null) ? "No Important Details" : thisTodo.todo_note}
              onChange={onChange}
               />
            </Form.Group>
          </Form>
          <UrgencySwitch
          onChange={onChange}
          updateToDo={updateToDo}
          checked={checked}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save To Do
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ToDoDetail;