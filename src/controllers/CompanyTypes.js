import db from "../models";
import generic from "../helpers/Generic";
import { UniqueConstraintError } from "sequelize";

export default class CompanyTypes {
  static async getCompanyTypes(req, res) {
    try {
      const response = await db["CompanyTypes"].findAll({ order: [["slug", "ASC"]] });
      return res.status(200).json({ result: response });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, no company types found" });
    }
  }

  static async addType(req, res) {
    try {
      const response = await db['CompanyTypes'].create({
        name: req.body.name,
        description: req.body.description,
        slug: generic.generateSlug_companyTypes(req.body.name),
        image: req.body.image
      });
      return res.status(200).send({ message: response });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res.status(409).send({
          error:
            "This type already exist!!!!",
          field: error.errors[0].path
        });
      }
      return res.status(400).send({ message: "Sorry, Failed to add company type at moment" });
    }
  }

  static async editType(req, res) {
    try {
      const update = await db["CompanyTypes"].update((req.body), {
          where: { id: req.body.id}
        });
      return update ? res.status(200).json({ result: "Edited Successfully" })
        : res.status(404).json({ error: "Sorry, No record edited" });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async removeType(req, res) {
    try {
      const response = await db["CompanyTypes"].destroy({
          where: { id: req.query.type }
        })
      if (response) {
        return res.status(200).json({ message: "Type Removed" })
      } else {
        return res.status(200).json({ message: "Type not yet added" })
      }
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Failed to remove company type at moment" });
    }
  }
}