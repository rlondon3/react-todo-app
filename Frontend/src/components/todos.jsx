import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import 'moment-timezone';


const Todos = ({ todos, getThisTodo, dateCreated }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleCheck = (inputName) => {
    //showButtons(!buttons)
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

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
            <th>EDIT TODO</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
          <tr key={todos.indexOf(t)} id={todos[todos.indexOf(t)]}>
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
            <Moment format="MM/DD/YYYY" utc>{dateCreated}</Moment>
          </div>
        ))}
      </Form>
          </td>
          <td>{t}</td>
          <td><Button variant="warning" onClick={() => getThisTodo(t)}>Edit</Button>{' '}</td>
          </tr>))}
        </tbody>
      </Table>
    </>
  );
}

export default Todos;