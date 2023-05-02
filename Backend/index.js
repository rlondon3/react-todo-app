const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoList = require('./routes/todos');
const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 5000;
const db = process.env.MONGODB_URL;

mongoose.connect(db)
.then(() => console.log('Connected to To Do App Database. Hooray!'))
.catch((err) => console.error(`Could not connect to database: ${err}`));


const app = express();
app.use(express.json());
//Enable Body Parse
app.use(express.urlencoded({ extended: false }));

// Enable Cors
app.use(cors());

app.use('/api/todos', todoList)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.json({message: 'Hello! Im the React To Do App Backend...'})
})