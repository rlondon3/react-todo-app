const express = require('express');
const {Todo, handleErrors} = require('../models/todo');


const router = express.Router();

//Get all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort('todo');
    res.send(todos)
});
//Get todo with detail
router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    (!todo) ? res.status(404).send('This todo was not found.') : res.send(todo);
});
//Create Todo
router.post('/', async (req, res) => {
    const result = handleErrors(req.body);

    if (result.error)  return res.status(400).send(result.error.details[0].message);

    const todo = new Todo({
        name: req.body.name,
        due_date: req.body.due_date,
        todo_detail: req.body.todo_detail,
        is_urgent: req.body.is_urgent
    });
    await todo.save();
    res.send(todo);
});
//Update Todo
router.put('/:id', async (req, res) => {
    const result = handleErrors(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const todo = await Todo.findByIdAndUpdate(
        req.params.id, 
        {
            name: req.body.name,
            due_date: req.body.due_date,
            todo_detail: req.body.todo_detail,
            is_urgent: req.body.is_urgent
        },
        {
            new: true
        }
    );

    if (!todo) return res.status(404).send('Todo was not found!');
    res.send(todo);
});
//Delete todo
router.delete('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    if (!todo) return res.status(404).send('Todo does not exist!');
    res.send(todo);
})


module.exports = router;