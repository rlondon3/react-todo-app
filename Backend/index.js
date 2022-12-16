const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoList = require('./routes/todos');
const cors = require('cors');

mongoose.connect('mongodb://localhost/todoApp')
.then(() => console.log('Connected to To Do App Database. Hooray!'))
.catch((err) => console.error(`Could not connect to database: ${err}`));

dotenv.config();
const port = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/todos', todoList)
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('Hello! Im the React To Do App Backend...')
})