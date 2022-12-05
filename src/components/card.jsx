import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TodoTable from './table';
import logo from '../img/logo192.png'
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

function TodoCard() {
    const [time, setTime] = useState(moment().format('LTS'))

    useEffect(() => {
        const timer = setInterval(() => setTime(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000 );

        return function cleanUp() {
            clearInterval(timer)
        }
      }, [time]);
  return (
    <Card className="text-center">
      <Card.Header style={{ backgroundColor: '#61DBFB', fontSize: '20px', fontWeight: '700', color: 'white'}}>{time}</Card.Header>
      <Card.Body>
        <Card.Title><img src={logo} alt='Logo' style={{ width: 100, height: 100 }} /> To Do App</Card.Title>
          <TodoTable />
        <Button variant="success">Get Next Todo</Button>
      </Card.Body>
      <Card.Footer style={{ backgroundColor: '#61DBFB'}} className="text-muted">Next Todo Due: 'DATE GOES HERE' </Card.Footer>
    </Card>
  );
}

export default TodoCard;