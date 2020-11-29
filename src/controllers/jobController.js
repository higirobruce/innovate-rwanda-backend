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

  static async getJobsList(req, res) {
    try {
      var jobPosts;
      if (req.params.status == "all") {
        jobPosts = await db['Job']
          .findAll({
            order: [['createdAt', 'DESC']]
          });
      } else {
        jobPosts = await db['Job']
          .findAll({
            where: {
              status: req.params.status,
            },
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
}
