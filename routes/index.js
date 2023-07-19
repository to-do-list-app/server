const express = require('express');
const router = express.Router();

const userRouter = require('./user.js');
const todoRouter = require('./todo.js');
const categoryRouter = require('./category.js');

router.use(userRouter);
router.use(todoRouter);
router.use(categoryRouter);

module.exports = router;
