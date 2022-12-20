const mongoose = require('mongoose');
const Joi = require('joi');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: String,
    },
    todo_detail: {
        type: String,
        minlength: 0,
        maxlength: 250
    },
    is_urgent: {
        type: Boolean,
    }
});

const Todo= mongoose.model('Todo', todoSchema);

function handleErrors(todo) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        due_date: Joi.string(),
        todo_detail: Joi.string(),
        is_urgent: Joi.boolean()
    });
    return schema.validate(todo);
}

exports.todoSchema = todoSchema;
exports.Todo = Todo;
exports.handleErrors = handleErrors;
