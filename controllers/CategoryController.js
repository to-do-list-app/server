require("dotenv").config();
const { Category } = require("../models");

class CategoryController {
  static async findCategories(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await Category.findAll({
        where: { user_id: id },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { category, color } = req.body;

      const data = await Category.create({
        user_id: id,
        category,
        color,
      });
      res
        .status(201)
        .json({ ...data.dataValues, message: "Successfully add category!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { categoryId } = req.params;
      const { category, color } = req.body;

      const findCategory = await Category.findOne({
        where: { id: categoryId, user_id: id },
      });

      if (findCategory) {
        const data = await Category.update(
          {
            category,
            color,
          },
          { where: { id: categoryId, user_id: id } }
        );
        res.status(200).json({ message: "Successfully update category!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { categoryId } = req.params;

      const findCategory = await Category.findOne({
        where: { id: categoryId, user_id: id },
      });

      if (findCategory) {
        const data = await Category.destroy({
          where: { id: categoryId, user_id: id },
        });
        res.status(200).json({ message: "Successfully delete category!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
