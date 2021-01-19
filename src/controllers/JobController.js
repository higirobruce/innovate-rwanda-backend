import db from "../models";
import notification from "../helpers/Notification";
import generic from "../helpers/Generic";

export default class JobController {
  static async jobPost(req, res) {
    try {
      const activities = req.body.activities;
      const fields = req.body;
      const author = req.user;
      const job = await db['Job'].create({
        title: fields.title,
        description: fields.description,
        companyId: author.companyId,
        category: fields.category,
        deadlineDate: fields.deadlineDate,
        deadlineTime: fields.deadlineTime,
        jobDetailsDocument: fields.jobDocument,
        status: fields.status,
      });
      if (job) {
        var activitiesToLoad = new Array();
        for (var i = 0; i < activities.length; i++) {
          activitiesToLoad.push({ typeOfPost: 'job', postId: job.id, activityId: activities[i] });
        }
        if (activitiesToLoad.length > 0) {
          await db['AudienceForPost'].bulkCreate(activitiesToLoad);
        }
        return res.status(200).send({
          message: "Job post saved"
        });
      } else {
        return res.status(404).send({
          message: "Job posting failed"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Job not posted at this moment" });
    }
  }

  static async approveOrDeclineJobPost(req, res) {
    const decision = req.body.decision;
    await db["Job"].findOne({ where: { id: req.body.jobId, status: { [db.Op.not]: decision } }, attributes: ["id", "title", "description", "companyId"] })
      .then((job) => {
        if (job) {
          const response = job.update({ status: decision });
          if (response) {
            if (decision == "approved") {
              const parameters = { id: req.body.jobId, title: job.title, description: job.description, file_name: "", format: "Job", companyId: job.companyId };
              notification.notify("post approval", parameters, function (resp) {
                return res.status(200).json({ message: resp });
              });
            } else {
              res.status(200).json({ message: "Job " + decision })
            }
          } else {
            res.status(404).json({ message: "Action Failed" });
          }
        } else {
          res.status(404).json({ message: "Job could have been already treated" });
        }
      }).catch((err) => {
        console.log(err)
        return res.status(400).send({ message: "Sorry, Action failed" });
      })
  }

  static async getApprovedJobsList(req, res) {
    try {
      const jobPosts = await db["Job"].findAll({
        where: {
          status: "approved",
        },
        include: [
          {
            model: db["Company"],
            attributes: ["logo", ["coName", "companyName"]]
          },
          {
            model: db["AudienceForPost"],
            attributes: [["activityId", "activity"]],
            on: {
              [db.Op.and]: [
                db.sequelize.where(
                  db.sequelize.col('Job.id'),
                  db.Op.eq,
                  db.sequelize.col('AudienceForPosts.postId')
                ),
                db.sequelize.where(
                  db.sequelize.col('AudienceForPosts.typeOfPost'),
                  db.Op.eq,
                  'job'
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
          },
        ],
        order: [['createdAt', 'DESC']]
      });
      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({
          result: jobPosts,
        });
      }
      return res.status(404).json({
        result: [],
        error: "No job found at this moment",
      });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "No jobs found at this moment" });
    }
  }

  static async getJobsListPerCompany(req, res) {
    try {
      const jobPosts = await db['Job']
        .findAll({
          where: {
            companyId: req.params.companyId,
            status: {
              [db.Op.not]: "deleted"
            },
          },
          include: [
            {
              model: db["Company"],
              attributes: ["logo", ["coName", "companyName"]]
            },
            {
              model: db["AudienceForPost"],
              attributes: [["activityId", "activity"]],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
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
            },
          ],
          order: [['createdAt', 'DESC']]
        });
      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({
          result: jobPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Job Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of jobs not got at this moment" });
    }
  }

  static async getJobsList(req, res) {
    try {
      var jobPosts;
      if (req.params.status == "all") {
        jobPosts = await db['Job']
          .findAll({
            include: [
              {
                model: db["Company"],
                attributes: ["logo", ["coName", "companyName"]]
              },
              {
                model: db["AudienceForPost"],
                attributes: [["activityId", "activity"]],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Job.id'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts.postId')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.typeOfPost'),
                      db.Op.eq,
                      'job'
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
              },
            ],
            order: [['createdAt', 'DESC']]
          });
      } else {
        jobPosts = await db['Job']
          .findAll({
            where: {
              status: req.params.status,
            },
            include: [
              {
                model: db["Company"],
                attributes: ["logo", ["coName", "companyName"]]
              },
              {
                model: db["AudienceForPost"],
                attributes: [["activityId", "activity"]],
                on: {
                  [db.Op.and]: [
                    db.sequelize.where(
                      db.sequelize.col('Job.id'),
                      db.Op.eq,
                      db.sequelize.col('AudienceForPosts.postId')
                    ),
                    db.sequelize.where(
                      db.sequelize.col('AudienceForPosts.typeOfPost'),
                      db.Op.eq,
                      'job'
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
              },
            ],
            order: [['createdAt', 'DESC']]
          });
      }
      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({
          result: jobPosts,
        });
      } else {
        return res.status(404).json({
          result: [],
          error: "No Job Posts found",
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: " List of Jobs not got at this moment" });
    }
  }

  static async getJobInfo(req, res) {
    try {
      const job = await db["Job"]
        .findOne({
          where: {
            id: req.params.jobId,
          },
          include: [
            {
              model: db["Company"],
              attributes: ["logo", ["coName", "companyName"]]
            },
            {
              model: db["AudienceForPost"],
              attributes: [["activityId", "activity"]],
              on: {
                [db.Op.and]: [
                  db.sequelize.where(
                    db.sequelize.col('Job.id'),
                    db.Op.eq,
                    db.sequelize.col('AudienceForPosts.postId')
                  ),
                  db.sequelize.where(
                    db.sequelize.col('AudienceForPosts.typeOfPost'),
                    db.Op.eq,
                    'job'
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
            },
          ]
        });
      return job
        ? res.status(200).json({
          result: job
        })
        : res.status(404).json({
          error: "Sorry, Job not found",
        });
    } catch (err) {
      return res.status(400).send({ message: "Sorry, Job not found" });
    }
  }

  static async editJobInfo(req, res) {
    try {
      const update = await db["Job"]
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
      console.log(err)
      return res.status(400).send({ message: "Sorry, Edit failed" });
    }
  }

  static async deleteJob(req, res) {
    try {
      const response = await db['Job']
        .update(
          { status: "deleted" },
          {
            where: {
              id: req.query.jobId,
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
      console.log(err)
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getJobsFiltered(req, res) {
    try {
      const filterBy = req.query.filterBy;
      const filterValue = req.query.filterValue.trim();
      var jobPosts;

      if (filterBy == "company") {
        jobPosts = await db['Job'].findAll({
          where: { companyId: filterValue, status: "approved" },
          include: [
            { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            },
          ], order: [['deadlineDate', 'DESC']]
        });
      } else if (filterBy == "company-type") {
        var companiesId;
        await generic.getCompaniesIdPerType(filterValue, function (theCompanies) {
          companiesId = theCompanies.map(company => company.id);
        })

        jobPosts = await db['Job'].findAll({
          where: { companyId: { [db.Op.in]: companiesId }, status: "approved" },
          include: [
            { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            },
          ], order: [['deadlineDate', 'DESC']]
        });
      } else if (filterBy == "topic") {
        var postsId;
        await generic.getPostsIdPerActivity("job", filterValue, function (thepostsId) {
          postsId = thepostsId.map(postId => postId.postId);
        })

        jobPosts = await db['Job'].findAll({
          where: { id: { [db.Op.in]: postsId }, status: "approved" },
          include: [
            { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            },
          ], order: [['deadlineDate', 'DESC']]
        });
      } else if (filterBy == "year") {
        jobPosts = await db['Job'].findAll({
          where: { status: "approved", [db.Op.and]: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Job"."deadlineDate")'), filterValue) },
          include: [
            { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
            {
              model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
              on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
              include: [{
                model: db["BusinessActivities"], attributes: ["name"],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
              }]
            },
          ], order: [['updatedAt', 'DESC']]
        });
      }

      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({ result: jobPosts });
      }
      return res.status(404).json({ result: [], error: "No job found at this moment" });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "No jobs found at this moment" });
    }
  }

  static async getJobsSorted(req, res) {
    try {
      const sortBy = req.query.sortBy;
      const sortValue = req.query.sortValue.trim();
      var jobPosts;

      if (sortValue == "desc" || sortValue == "asc") {
        if (sortBy == "date") {
          jobPosts = await db['Job'].findAll({
            where: { status: "approved" },
            include: [
              { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] },
                }]
              },
            ], order: [['deadlineDate', sortValue]]
          });
        } else if (sortBy == "title") {
          jobPosts = await db['Job'].findAll({
            where: { status: "approved" },
            include: [
              { model: db["Company"], attributes: ["logo", ["coName", "companyName"]] },
              {
                model: db["AudienceForPost"], attributes: [["activityId", "activity"]],
                on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('Job.id'), db.Op.eq, db.sequelize.col('AudienceForPosts.postId')), db.sequelize.where(db.sequelize.col('AudienceForPosts.typeOfPost'), db.Op.eq, 'job')] },
                include: [{
                  model: db["BusinessActivities"], attributes: ["name"],
                  on: { [db.Op.and]: [db.sequelize.where(db.sequelize.col('AudienceForPosts.activityId'), db.Op.eq, db.sequelize.col('AudienceForPosts->BusinessActivity.id'))] }
                }]
              }
            ], order: [['title', sortValue]]
          });
        }
      }

      if (jobPosts && jobPosts.length > 0) {
        return res.status(200).json({ result: jobPosts });
      }
      return res.status(404).json({ result: [], error: "No job found at this moment" });
    } catch (err) {
      return res.status(400).send({ message: "No jobs found at this moment" });
    }
  }

  static async searchForJobs(req, res) {
    const searchValue = req.query.searchValue.trim();
    generic.searchForJobs(searchValue, function (result) {
      return res.status(result[0]).send(result[1]);
    })
  }
}
