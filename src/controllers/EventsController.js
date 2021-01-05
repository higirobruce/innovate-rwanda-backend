import db from "../models";
import notification from "../helpers/Notification";
import generic from "../helpers/Generic";

export default class EvenController {
  static async eventPost(req, res) {
    try {
      const activities = req.body.activities;
      const fields = req.body;
      const author = req.user;
      const event = await db['Event'].create({
        title: fields.title,
        description: fields.description,
        companyId: author.companyId,
        author: author.id,
        category: fields.category,
        eventDate: fields.eventDate,
        eventTime: fields.eventTime,
        flyer: fields.flyer,
        status: fields.status
      });
      if (event) {
        var activitiesToLoad = new Array();
        for (var i = 0; i < activities.length; i++) {
          activitiesToLoad.push({ typeOfPost: 'event', postId: event.id, activityId: activities[i] });
        }
        if (activitiesToLoad.length > 0) {
          await db['AudienceForPost'].bulkCreate(activitiesToLoad);
        }
        return res.status(200).send({
          message: "Event post saved"
        });
      } else {
        return res.status(404).send({
          message: "Event posting failed"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " Event not submitted at this moment" });
    }
  }

  static async approveOrDeclineEventPost(req, res) {
    const decision = req.body.decision;
    await db["Event"].findOne({ where: { id: req.body.id, status: { [db.Op.not]: decision } }, attributes: ["id", "title", "description", "flyer", "companyId"] })
      .then((event) => {
        if (event) {
          const response = event.update({ status: decision });
          if (response) {
            if (decision == "approved") {
              const parameters = { id: req.body.id, title: event.title, description: event.description, file_name: event.flyer, format: "Event", companyId: event.companyId };
              notification.notify("post approval", parameters, function (resp) {
                return res.status(200).json({ message: resp });
              });
            } else {
              res.status(200).json({ message: "Event " + decision })
            }
          } else {
            res.status(404).json({ message: "Action Failed" });
          }
        } else {
          res.status(404).json({ message: "Event could have been already treated" });
        }
      }).catch((err) => {
        console.log(err)
        return res.status(400).send({ message: "Sorry, Action failed" });
      })
  }

  static async manageEventPost(req, res) {
    const decision = req.body.decision;
    await db["Event"].findOne({ where: { id: req.body.id, status: { [db.Op.not]: decision } }, attributes: ["id", "title", "description", "flyer", "companyId","messages"] })
      .then((event) => {
        if (event) {
          var response;
          if (req.body.message) {
            if (event.messages) {
              event.messages[event.messages.length] = req.body.message;
            } else {
              event.messages = [];
              event.messages[0] = req.body.message;
            }
            response = event.update({ status: decision, messages: event.messages });
          } else {
            response = event.update({ status: decision });
          }
          if (response) {
            if (decision == "approved") {
              const parameters = { id: req.body.id, title: event.title, description: event.description, file_name: event.flyer, format: "Event", companyId: event.companyId };
              notification.notify("post approval", parameters, function (resp) {
                return res.status(200).json({ message: resp });
              });
            } else {
              res.status(200).json({ message: "Event " + decision })
            }
          } else {
            res.status(404).json({ message: "Action Failed" });
          }
        } else {
          res.status(404).json({ message: "Event could have been already treated" });
        }
      }).catch((err) => {
        console.log(err)
        return res.status(400).send({ message: "Sorry, Action failed" });
      })
  }

  static async getApprovedEventsList(req, res) {
    try {
      const eventPosts = await db["Event"].findAll({
        where: {
          status: "approved",
        },
        include: [
          { model: db["Company"], attributes: [["coName", "companyName"]] },
          { model: db["User"], attributes: ["firstName", "lastName"] },
          {
            model: db["AudienceForPost"],
            attributes: [["activityId", "activity"]],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Event.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'event'
                )
              ],
            },
            include: [{
              model: db["BusinessActivities"],
              attributes: ["name"],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.activityId'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                  ),],
              },
            }]
          }
        ],
        order: [['createdAt', 'DESC']],
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
      const eventPosts = await db['Event']
        .findAll({
          where: {
            companyId: req.params.companyId,
            status: {
              [db.Op.not]: "deleted"
            },
          },
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"],
              attributes: [["activityId", "activity"]],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Event.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'event'
                  )
                ],
              },
              include: [{
                model: db["BusinessActivities"],
                attributes: ["name"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    ),],
                },
              }]
            }
          ],
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
            include: [
              { model: db["Company"], attributes: [["coName", "companyName"]] },
              { model: db["User"], attributes: ["firstName", "lastName"] },
              {
                model: db["AudienceForPost"],
                attributes: [["activityId", "activity"]],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Event.id'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts.postId')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.typeOfPost'),
                      db.Op.eq,
                      'event'
                    )
                  ],
                },
                include: [{
                  model: db["BusinessActivities"],
                  attributes: ["name"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                      ),],
                  },
                }]
              }
            ],
            order: [['createdAt', 'DESC']]
          });
      } else {
        eventPosts = await db['Event']
          .findAll({
            where: {
              status: req.params.status,
            },
            include: [
              { model: db["Company"], attributes: [["coName", "companyName"]] },
              { model: db["User"], attributes: ["firstName", "lastName"] },
              {
                model: db["AudienceForPost"],
                attributes: [["activityId", "activity"]],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Event.id'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts.postId')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.typeOfPost'),
                      db.Op.eq,
                      'event'
                    )
                  ],
                },
                include: [{
                  model: db["BusinessActivities"],
                  attributes: ["name"],
                  on: {
                    [db.Op.and]: [
                      db.sequelize.where(
                        db.sequelize.col('AudienceForPosts.activityId'),
                        db.Op.eq,
                        db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                      ),],
                  },
                }]
              }
            ],
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
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"],
              attributes: [["activityId", "activity"]],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Event.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'event'
                  )
                ],
              },
              include: [{
                model: db["BusinessActivities"],
                attributes: ["name"],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.activityId'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts->BusinessActivity.id')
                    ),],
                },
              }]
            }
          ],
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

  static async deleteEvent(req, res) {
    try {
      const response = await db['Event']
        .update(
          { status: "deleted" },
          {
            where: {
              id: req.query.eventId,
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
      const filterBy = req.query.filterBy;
      const filterValue = req.query.filterValue.trim();
      var eventPosts;
      if (filterBy == "company") {
        eventPosts = await db['Event'].findAll({
          where: { companyId: filterValue, status: "approved" },
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ], order: [['eventDate', 'DESC']]
        });
      } else if (filterBy == "company-type") {
        var companiesId;
        await generic.getCompaniesIdPerType(filterValue, function (theCompanies) {
          companiesId = theCompanies.map(company => company.id);
        })
        eventPosts = await db['Event'].findAll({
          where: { companyId: { [db.Op.in]: companiesId }, status: "approved" },
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ], order: [['eventDate', 'DESC']]
        });
      } else if (filterBy == "topic") {
        var eventsId;
        await generic.getPostsIdPerActivity("event", filterValue, function (theEventsId) {
          eventsId = theEventsId.map(postId => postId.postId);
        })
        eventPosts = await db['Event'].findAll({
          where: { id: { [db.Op.in]: eventsId }, status: "approved" },
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ], order: [['eventDate', 'DESC']]
        });
      } else if (filterBy == "year") {
        eventPosts = await db['Event'].findAll({
          where: { status: "approved", andOp: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Event"."eventDate")'), filterValue) },
          include: [
            { model: db["Company"], attributes: [["coName", "companyName"]] },
            { model: db["User"], attributes: ["firstName", "lastName"] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            }
          ], order: [['updatedAt', 'DESC']]
        });
      }

      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({ result: eventPosts });
      } else {
        return res.status(404).json({ result: [], error: "No Event Posts found" });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Events not got at this moment" });
    }
  }

  static async getEventsSorted(req, res) {
    try {
      const sortBy = req.query.sortBy;
      const sortValue = req.query.sortValue.trim();
      var eventPosts;

      if (sortBy == "date") {
        if (sortValue == "desc" || sortValue == "asc") {
          eventPosts = await db['Event'].findAll({
            where: { status: "approved" },
            include: [
              { model: db["Company"], attributes: [["coName", "companyName"]] },
              { model: db["User"], attributes: ["firstName", "lastName"] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')] },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
                }]
              }
            ], order: [['eventDate', sortValue]]
          });
        }
      } else if (sortBy == "title") {
        if (sortValue == "desc" || sortValue == "asc") {
          eventPosts = await db['Event'].findAll({
            where: { status: "approved" },
            include: [
              { model: db["Company"], attributes: [["coName", "companyName"]] },
              { model: db["User"], attributes: ["firstName", "lastName"] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Event.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'event')], },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
                }]
              }
            ], order: [['title', sortValue]]
          });
        }
      }

      if (eventPosts && eventPosts.length > 0) {
        return res.status(200).json({ result: eventPosts });
      } else {
        return res.status(404).json({ result: [], error: "No Event Posts found" });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Events not got at this moment" });
    }
  }

  static async searchForEvents(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchForEvents(searchValue, function (result) {
      return res.status(result[0]).send(result[1]);
    })
  }
}
