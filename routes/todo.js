const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/TodoController.js');
const authentication = require('../middlewares/authentication.js');

router.get('/api/todos/incomplete', authentication, TodoController.findIncompleteTodos);
router.get('/api/todos/complete', authentication, TodoController.findCompleteTodos);
router.get('/api/todos/important', authentication, TodoController.findImportantTodos);
router.get('/api/todos/:todoId', authentication, TodoController.findTodo);
router.post('/api/todos', authentication, TodoController.createTodo);
router.put('/api/todos/:todoId', authentication, TodoController.updateTodo);
router.delete('/api/todos/:todoId', authentication, TodoController.deleteTodo);
router.post('/api/todos/:todoId/category', authentication, TodoController.addCategory);
router.delete('/api/todos/:todoId/category/:categoryId', authentication, TodoController.removeCategory);

module.exports = router;
