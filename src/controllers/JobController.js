import db from "../models";

export default class JobController {
  static async jobPost(req, res) {
    try {
      const response = await db['Job'].create(req.body);
      return res.status(200).send({
        message: response,
      });
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Job not posted at this moment" });
    }
  }

  static async approveOrDeclineJobPost(req, res) {
    // To do: Do more here, once approved send notifications right away or?
    try {
      const response = await db['Job']
        .update(
          { status: req.body.decision },
          {
            where: {
              id: req.body.jobId,
            },
          }
        );
      return res.status(200).json({
        message: response
      })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message: "Sorry, Action failed" });
    }
  }

  static async getApprovedJobsList(req, res) {
    try {
      const jobPosts = await db["Job"].findAll({
        where: {
          status: "approved",
        },
        include: [
          {
            model: db["Company"], attributes: ["logo", "coName"]
          }
        ],
        order: [['createdAt', 'DESC']],
        raw: true,
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
          },
          include: [
            { model: db["Company"], attributes: ["logo", "coName"] }
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
              { model: db["Company"], attributes: ["logo", "coName"] }
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
              { model: db["Company"], attributes: ["logo", "coName"] }
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
            { model: db["Company"], attributes: ["logo", "coName"] }
          ],
          raw: true,
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
            id: req.body.jobId
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
              id: req.body.jobId,
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
      const filterBy = req.body.filterBy;
      const filterValue = req.body.filterValue;
      var jobPosts;
      if (filterBy == "company") {
        jobPosts = await db['Job']
          .findAll({
            where: {
              companyId: filterValue,
              status: "approved"
            },
            include: [
              { model: db["Company"], attributes: ["logo", "coName"] }
            ],
            order: [['deadlineDate', 'DESC']]
          });
      } else if (filterBy == "topic") {
        let likeOp = db.Op.like;
        jobPosts = await db['Job']
          .findAll({
            where: {
              status: "approved",
              tags: {
                [likeOp]: "%" + filterValue + "%"
              }
            },
            include: [
              { model: db["Company"], attributes: ["logo", "coName"] }
            ],
            order: [['deadlineDate', 'DESC']]
          });
      } else if (filterBy == "year") {
        let andOp = db.Op.and;
        jobPosts = await db['Job']
          .findAll({
            where: {
              status: "approved",
              [andOp]: db.sequelize.where(db.sequelize.literal('EXTRACT(YEAR FROM "Job"."deadlineDate")'), filterValue)
            },
            include: [
              { model: db["Company"], attributes: ["logo", "coName"] }
            ],
            order: [['updatedAt', 'DESC']]
          });
      }
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

  static async getJobsSorted(req, res) {
    try {
      const sortBy = req.body.sortBy;
      const sortValue = req.body.sortValue;
      var jobPosts;
      if (sortBy == "date") {
        if (sortValue == "desc" || sortValue == "asc") {
          jobPosts = await db['Job']
            .findAll({
              where: {
                status: "approved"
              },
              include: [
                { model: db["Company"], attributes: ["logo", "coName"] }
              ],
              order: [['deadlineDate', sortValue]]
            });
        }
      } else if (sortBy == "title") {
        jobPosts = await db['Job']
          .findAll({
            where: {
              status: "approved"
            },
            include: [
              { model: db["Company"], attributes: ["logo", "coName"] }
            ],
            order: [['title', sortValue]]
          });
      }
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
}
