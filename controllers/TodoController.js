require("dotenv").config();
const { Todo, Category, TodoCategories } = require("../models");

class TodoController {
  static async findIncompleteTodos(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await Todo.findAll({
        where: { user_id: id, status: "incomplete" },
        include: [
          {
            model: Category,
            as: "TodoCategory",
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findCompleteTodos(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await Todo.findAll({
        where: { user_id: id, status: "complete" },
        include: [
          {
            model: Category,
            as: "TodoCategory",
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findImportantTodos(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await Todo.findAll({
        where: { user_id: id, status: "incomplete", priority: "important" },
        include: [
          {
            model: Category,
            as: "TodoCategory",
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createTodo(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { task, description, priority, status, due_date } = req.body;
      const data = await Todo.create({
        user_id: id,
        task,
        description,
        priority,
        status,
        due_date,
      });
      res
        .status(201)
        .json({ ...data.dataValues, message: "Successfully add todo!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { todoId } = req.params;
      const { task, description, priority, status, due_date } = req.body;

      const findTodo = await Todo.findOne({
        where: { id: todoId, user_id: id },
      });

      if (findTodo) {
        const data = await Todo.update(
          {
            task,
            description,
            priority,
            status,
            due_date,
          },
          {
            where: {
              id: todoId,
              user_id: id,
            },
          }
        );
        res.status(200).json({ message: "Successfully update todo!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { todoId } = req.params;

      const findTodo = await Todo.findOne({
        where: { id: todoId, user_id: id },
      });

      if (findTodo) {
        const data = await Todo.destroy({
          where: {
            id: todoId,
            user_id: id,
          },
        });
        res.status(200).json({ message: "Successfully delete todo!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { todoId } = req.params;
      const { category_id } = req.body;

      const findCategory = await TodoCategories.findOne({
        where: {
          todo_id: todoId,
          category_id,
        },
      });

      if (findCategory) {
        throw { name: "AlreadyExist" };
      } else {
        const data = await TodoCategories.create({
          todo_id: todoId,
          category_id,
        });
        res
          .status(201)
          .json({ ...data.dataValues, message: "Successfully add category!" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async removeCategory(req, res, next) {
    try {
      const { todoId, categoryId } = req.params;

      const findCategory = await TodoCategories.findOne({
        where: {
          todo_id: todoId,
          category_id: categoryId,
        },
      });

      if (findCategory) {
        const data = await TodoCategories.destroy({
          where: {
            todo_id: todoId,
            category_id: categoryId,
          },
        });
        res.status(200).json({ message: "Successfully remove category!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
