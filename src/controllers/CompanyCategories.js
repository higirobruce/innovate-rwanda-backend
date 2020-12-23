import db from "../models";

export default class CompanyCategories {
  static async getCompanyCategories(req, res) {
    try {
      const response = await db["CompanyCategories"].findAll({});
      return res.status(200).json({
        result: response,
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Sorry, no company categories found" });
    }
  }
  static async addCategory(req, res) {
    try {
      const response = await db['CompanyCategories'].create(req.body);
      return res.status(200).send({
        message: response,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Sorry, Failed to add company category at moment" });
    }
  }

  static async editCategory(req, res) {
    try {
      const update = await db["CompanyCategories"]
        .update((req.body), {
          where: {
            id: req.body.id
          },
        });
      return update
        ? res.status(200).json({
          result: "Edited Successfully"
        })
        : res.status(404).json({
          error: "Sorry, No record edited",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async removeCategory(req, res) {
    try {
      const response = await db["CompanyCategories"]
        .destroy({
          where: {
            id: req.query.categoryId
          },
        })
      if (response) {
        return res.status(200).json({
          message: "Category Removed"
        })
      } else {
        return res.status(200).json({
          message: "Category not yet added"
        })
      }
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Sorry, Failed to remove category at moment" });
    }
  }
}
