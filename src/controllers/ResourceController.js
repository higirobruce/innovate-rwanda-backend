import db from "../models";

export default class ResourceController {
  static async getResources(req, res) {
    try {
      const response = await db["Resource"].findAll({order: [["title", "ASC"]]});
      return res.status(200).json({ result: response });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, no resources found" });
    }
  }

  static async addResource(req, res) {
    try {
      const response = await db['Resource'].create(req.body);
      return res.status(200).send({ message: response });
    } catch (error) {
      return res.status(400).send({ message: "Sorry, Failed to add resource at moment" });
    }
  }

  static async editResource(req, res) {
    try {
      const update = await db["Resource"].update((req.body), {
          where: { id: req.body.id }
        });
      return update ? res.status(200).json({ result: "Edited Successfully" })
                    : res.status(404).json({ error: "Sorry, No record edited" });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async removeResource(req, res) {
    try {
      const response = await db["Resource"].destroy({
          where: { id: req.query.resourceId },
        })
      if (response) {
        return res.status(200).json({ message: "Resource Removed" })
      } else {
        return res.status(200).json({ message: "Resource not yet added" })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Failed to remove resource at moment" });
    }
  }
}
