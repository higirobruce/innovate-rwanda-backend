import db from "../models";

export default class BusinessActivities {
  static async getBusinessActivities(req, res) {
    try {
      const response = await db["BusinessActivities"].findAll({ order: [["name", "ASC"]] });
      return res.status(200).json({ result: response });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, no business activities found" });
    }
  }
  static async addActivity(req, res) {
    try {
      const response = await db['BusinessActivities'].create(req.body);
      return res.status(200).send({ message: response });
    } catch (error) {
      return res.status(400).send({ message: "Sorry, Failed to add business activity at moment" });
    }
  }

  static async editActivity(req, res) {
    try {
      const update = await db["BusinessActivities"].update((req.body), {
        where: { id: req.body.id },
      });
      return update ? res.status(200).json({ result: "Edited Successfully" })
                    : res.status(404).json({ error: "Sorry, No record edited" });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async removeActivity(req, res) {
    try {
      const activityId = req.query.activityId;

      await db["ActivitiesOfCompany"].destroy({
        where: { activityId: activityId }
      });

      await db["AudienceForPost"].destroy({
        where: { activityId: activityId }
      });

      await db["Company"].update(
        { businessActivityId: null }, { where: { businessActivityId: activityId } }
      );

      const response = await db["BusinessActivities"].destroy({
        where: { id: activityId }
      });
      
      if (response === 1) {
        return res.status(200).json({ message: "Activity Removed" })
      } else {
        return res.status(200).json({ message: "Activity not yet added" })
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({ message: "Sorry, Failed to remove business activity at moment" });
    }
  }
}
