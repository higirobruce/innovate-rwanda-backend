import db from "../models";

export default class EvenController {
  static async eventPost(req, res) {
    console.log(req.body)
    try {
      const response = await db['Event'].create(req.body);
      if (response) {
        return res.status(200).send({
          message: "Event submitted",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Event not submitted at this moment" });
    }
  }

  static async approveOrDeclineEventPost(req, res) {
    // To do: Do more here, once approved send notifications
    try {
      const update = await db['Event']
        .update(
          { status: req.body.decision },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      return update
        ? res.status(200).json({
          message: req.body.decision
        })
        : res.status(404).json({
          error: "Sorry, Approval/Decline failed",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getApprovedEventsList(req, res) {
    try {
      const eventPosts = await db["Event"].findAll({
        where: {
          status: "approved",
        },
        order: [['createdAt', 'DESC']],
        raw: true,
      });
      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({
          result: eventPosts,
        });
      }
      return res.status(404).json({
        result: [],
        error: "No event found at this moment",
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "No events found at this moment" });
    }
  }

  static async getEventsListPerCompany(req, res) {
    try {
      // companyId is slug
      const eventPosts = await db['Event']
        .findAll({
          where: {
            companyId: req.params.companyId,
          },
          order: [['createdAt', 'DESC']]
        });
      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({
          result: eventPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Event Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of events not got at this moment" });
    }
  }

  static async getEventsList(req, res) {
    try {
      var eventPosts;
      if (req.params.status == "all") {
        eventPosts = await db['Event']
          .findAll({
            order: [['createdAt', 'DESC']]
          });
      } else {
        eventPosts = await db['Event']
          .findAll({
            where: {
              status: req.params.status,
            },
            order: [['createdAt', 'DESC']]
          });
      }
      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({
          result: eventPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Event Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Events not got at this moment" });
    }
  }

  static async getEventInfo(req, res) {
    try {
      const event = await db["Event"]
        .findOne({
          where: {
            id: req.params.eventId,
          },
          raw: true,
        });
      return event
        ? res.status(200).json({
          result: event
        })
        : res.status(404).json({
          error: "Sorry, Event not found",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Event not found" });
    }
  }

  static async editEventInfo(req, res) {
    try {
      const update = await db["Event"]
        .update((req.body), {
          where: {
            id: req.body.eventId
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

  static async deleteEvent(req, res) {
    try {
      const response = await db['Event']
        .update(
          { status: "deleted" },
          {
            where: {
              id: req.body.eventId,
            },
          }
        );
      return response
        ? res.status(200).json({
          message: "Deleted Successfully"
        })
        : res.status(404).json({
          error: "Sorry, No record deleted"
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getEventsFiltered(req, res) {
    try {
      const filterBy = req.body.filterBy;
      const filterValue = req.body.filterValue;
      var eventPosts;
      if (filterBy == "company") {
        eventPosts = await db['Event']
          .findAll({
            where: {
              companyId: filterValue,
              status: "approved"
            },
            order: [['eventDate', 'DESC']]
          });
      } else if (filterBy == "topic") {
        let likeOp = db.Op.like;
        eventPosts = await db['Event']
          .findAll({
            where: {
              status: "approved",
              tags: {
                [likeOp]: "%" + filterValue + "%"
              }
            },
            order: [['eventDate', 'DESC']]
          });
      } else if (filterBy == "year") {
        let andOp = db.Op.and;
        eventPosts = await db['Event']
          .findAll({
            where: {
              status: "approved",
              andOp: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Event"."eventDate")'), filterValue)
            },
            order: [['updatedAt', 'DESC']]
          });
      }
      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({
          result: eventPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Event Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Events not got at this moment" });
    }
  }

  static async getEventsSorted(req, res) {
    try {
      const sortBy = req.body.sortBy;
      const sortValue = req.body.sortValue;
      var eventPosts;
      if (sortBy == "date") {
        if (sortValue == "desc" || sortValue == "asc") {
          eventPosts = await db['Event']
            .findAll({
              where: {
                status: "approved"
              },
              order: [['eventDate', sortValue]]
            });
        }
      } else if (sortBy == "title") {
        eventPosts = await db['Event']
          .findAll({
            where: {
              status: "approved"
            },
            order: [['title', sortValue]]
          });
      }
      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({
          result: eventPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Event Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Events not got at this moment" });
    }
  }
}
